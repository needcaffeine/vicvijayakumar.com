---
title: Migrating INNODB, without the self-loathing
date: '2013-04-05T00:00:00-04:00'
aliases:
    - /migrating-large-innodb-tables-without-hating-yourself.html
    - /2013/04/05/migrating-large-innodb-tables-without-hating-yourself/
---

First of all, if you use MySQL anywhere in your stack, you should be using [Percona server](http://www.percona.com/software/percona-server/feature-comparison) which is a drop-in replacement for MySQL with dozens of INNODB enhancements (and thus called Xtradb), bug fixes, and all in all just really awesome.

If you want to do some light reading, here you go:  
[March 15, 2010: Which MySQL Fork/Version to Pick?](http://stackoverflow.com/questions/2450534/which-mysql-fork-version-to-pick)  
[August 20, 2012: Xtradb vs INNODB](http://stackoverflow.com/questions/12037363/xtradb-vs-innodb)

I will add that MariaDB is also looking really nice these days.

Okay, back to the problem at hand. I needed to move a 100gb database (all tables are INNODB) from a server in datacenter A to a different server in datacenter B. For the sake of simplicity, let's assume that availability was not important to me. I just needed a particular database moved between servers. There are a few different ways to solve this problem; let's go through all of them.

### Copy the entire data directory over to the other server: Nope
This is actually a perfectly valid solution if all you are doing is just moving the entire thing. If availability is not important to you, stop mysqld on the source, rsync over the entire data directory to the new server along with the my.cnf file, start mysqld up on the new server, Bob's your uncle. If you don't want to shut down the server, use Percona's <a href="http://www.percona.com/doc/percona-xtrabackup/">Xtrabackup</a>. You'll end up with a nice snapshot to rsync over and you can even ensure that you have no downtime at all. Unfortunately, I'm not replacing the contents of server B with that of server A. I want to keep the databases I already have on B. So this solution doesn't work for me.

### mysqldump: Nope

Yeah, no. First you'd need to lock your tables in order to get a point-in-time consistent dump. For a 100gb database, if you're not using SSDs, it's going to take something like 3 hours for that ~50gb dump (assuming half of it was indices) to be written to disk. Next, you need to rsync it across the country to the new server where it needs to get written to disk. At this point, all you've done is move the data as a single .sql file from server A to server B. Then comes the import. Get ready for a world of pain. No matter how high you increase `max_allowed_packet` and `read_buffer_size`, you're going to get `Lost connection to MySQL server during query` errors. Not to mention that the import is going to take FOREVER. If the import dies a third of the way in, you need to trash everything and restart from scratch. One way to mitigate that is to get mysqldump to give you [one file per table](http://stackoverflow.com/a/134296/115778). This way you at least can just restart the import for the table that failed instead of **everything**. In case you actually want to go down this road, there are a few different ways to speed it up:

1. Pipe mysqldump from Server A to mysql on Server B directly:
    `mysqldump -hServerA myDatabase myTable | mysql -hServerB newDatabase`
2. Turn off the binary log on Server B for the import. Something like this should do it:
    `(echo "set session sql_log_bin=0;" ; mysqldump -hServerA myDatabase myTable) | mysql -hServerB newDatabase`
3. [Relax INNODB's ACID compliance](http://stackoverflow.com/questions/10458095/innodb-bottleneck-relaxing-acid-to-improve-performance). Set `innodb-flush-log-at-trx-commit = 2` until your data import is done.
4. [netcat, -T, etc.](http://stackoverflow.com/questions/131085/whats-the-quickest-way-to-dump-load-a-mysql-innodb-database-using-mysqldump)

But like I said earlier, this just does not work for large tables and is just going to piss you off over and over and there are only so many times you can truncate and reimport the same table.

### Xtrabackup's partial backups feature: Yes!

Requisite reading:  
[June 8, 2009: Impossible – possible, moving InnoDB tables between servers](http://www.mysqlperformanceblog.com/2009/06/08/impossible-possible-moving-innodb-tables-between-servers/)  
[July 31, 2009: Copying InnoDB tables between servers](http://www.mysqlperformanceblog.com/2009/07/31/copying-innodb-tables-between-servers/)

**Note: This will not work for you unless you're running XtraDB on the destination server, and you must have [innodb_import_table_from_xtrabackup](http://www.percona.com/doc/percona-server/5.5/management/innodb_expand_import.html#innodb_import_table_from_xtrabackup) enabled on the destination.**

First, download [Percona's Xtrabackup](http://www.percona.com/doc/percona-xtrabackup/) and put the xtrabackup binary in your path somewhere. Okay, let's back up the table(s) we need. The [Partial Backups](http://www.percona.com/doc/percona-xtrabackup/xtrabackup_bin/partial_backups.html) page tells us the syntax for doing a single table versus an entire database. For the purposes of documentation, I'm only going to show you how to move over a single table, from which you should be able to extrapolate: I'm copying over the `sources` table from the `library` database.

    vic@athena:~ $ mkdir -p /tmp/xtrabackup
    vic@athena:~ $ sudo chown mysql:mysql /tmp/xtrabackup
    vic@athena:~ $ sudo xtrabackup --backup --datadir=/sqlroot/ --target-dir=/tmp/xtrabackup/ --tables="^library[.]sources"
    [...]
    vic@athena:~ $ sudo xtrabackup --prepare --export --target-dir=/tmp/xtrabackup/
    [...]


[Ignore any errors](http://www.percona.com/doc/percona-xtrabackup/xtrabackup_bin/partial_backups.html#preparing-the-backup) about non-existent tables/dictionaries that you may get during the prepare and export process. Now we have our export files and all we need to do is get them over to the new server and import them. You are also going to need a structure dump of the table(s) you are migrating since you will need to create the tables at the destination. You can do this with `mysqldump --no-data -u username -p library sources > sources.sql`. Then get this file over to the destination server so you can use it to create the tables.

On the destination server:

    mysql> create database sources default character set utf8 collate utf8_unicode_ci;
    Query OK, 1 row affected (0.00 sec)

    mysql> use sources;
    Database changed

    mysql> source sources.sql;
    Query OK, 0 rows affected (0.00 sec)

    mysql> alter table sources discard tablespace;
    Query OK, 0 rows affected (0.08 sec)

At this point, you need to copy over the .exp and .ibd files that were produced by the export process on the source server into the database folder of the destination server. Since I was copying the tables into the sources database, I rsynced them over to the folder for this database, which in my case was /sqlroot/library. In your case, this may be something like /var/lib/mysql/library. Now import the tablespace.

    mysql> alter table sources import tablespace;

While this is happening, you can monitor the progress from a different window by tail-ing the mysqld.err file. Common pitfall: make sure you give mysql permissions to the files you just copied over. Otherwise when you do the tablespace import, you'll get an error like this: `ERROR 1030 (HY000): Got error -1 from storage engine`.

    sudo watch tail -n2 /sqlroot/mysqld.err
    InnoDB: Import: 2 indexes have been detected.
    InnoDB: Progress in %: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21

A few minutes later, it's all done. Confirm that your data is there.

    mysql> alter table sources import tablespace;
    Query OK, 0 rows affected (6 min 55.65 sec)

    mysql> select id, name from sources limit 1;
    +----+--------+
    | id | name   |
    +----+--------+
    |  1 | PubMed |
    +----+--------+
    1 row in set (0.00 sec)

You can script this entire thing to make it a heck of a lot faster, now that you know what the basic steps are.
