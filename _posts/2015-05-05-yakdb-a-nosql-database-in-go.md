---
layout: post
title: "yakdb: a NoSQL database in Go"
categories:
  - databases
  - NoSQL
  - programming
  - yakdb
  - yak
  - Go
  - Golang
---

The very first programming language I ever used was BASIC. I remember that the room where the computers were stored was air conditioned. It was the only room in my school that was air conditioned. Heck, it was the only room in my school with lockable doors that sealed tight. I wish that I knew then that I would someday love programming, because I'd have paid better attention to what my first program did. I remember there were a lot of **GOTO**s, that's about it.

Many years later, when I was 13 or so, I had a summer internship with a small software development shop in Nairobi. I helped write a point-of-sale system in Visual Basic that saved and retrieved records from an MS-Access database. This POS (in so many ways) system was to be implemented at the Kenya duty-free shopping network at the Jomo Kenyatta International airport. This was the very first time that I wrote code that was then used by people other than me, and the very first time I wrote something that persisted data to disk. For my efforts, I was paid with a US Robotics 56k modem at the end of my internship.

My third and fourth programming languages were PHP and JavaScript (high school lab web pages woo!). My fifth was C. My sixth was C++. My seventh was Java. My eighth was MIPS Assembly. My ninth was C#.

Then I graduated college, got a full-time job, and no longer had much time for language tourism. Even when I did, I would write a couple hello world-ish programs and solved some [Project Euler][1] problems, then just shelf the language away for a day when I'd be able to say that it was the right tool for some job.

I discovered Go a few years ago and immediately fell in love with it. Systems programming! In the future! I should write a POS system! I immediately proceeded to write several Hello Worlds with it, [solved some Project Euler problems][2], and then I got to use it for one of our monthly hackathon projects at [Research Square][3] to create a µ-API that talked to [Elasticsearch][4]. And then I ran out of stuff to do and stopped working with this gorgeous language.

Until today! Today, I present to you **yakdb** (**y**et **a**nother **k**ey-value **d**ata**b**ase), a highly-performant in-memory key-value store written in Go. My purpose is to learn to write proper Go and use that to improve a publicly visible project. I hope to learn a lot about the proper way to build a database, and perhaps even convince enough people to use yakdb in production. This is also supposed to help me with a different goal I have in mind, which is to make regular public commits to my Github account.

yakdb is very simple. You can get data, put data, delete data. That's it. Any and all other operations must be handled on the application side. No MapReduce, no sorting, no ordering, no namespaces, no bulk anything.

## How does it perform?
This isn't a very scientific test, but let's do some basic benchmarks on read performance.

    $ curl -H 'Content-Type: application/json' -XPUT http://localhost:9532/items \
      -d '{
        "id": "Firefly",
        "value": "{\"Name\": \"Firefly\", \"Genre\": [\"Space Western\", \"Drama\", \"Science fiction\"]}"
      }'
    {"status":"OK"}

    $ wrk -c 100 -d10 -t10 "http://localhost:9532/items/Firefly"
    Running 10s test @ http://localhost:9532/items/Firefly
      10 threads and 100 connections
      Thread Stats   Avg      Stdev     Max   +/- Stdev
        Latency     5.12ms    1.37ms  24.84ms   71.51%
        Req/Sec     1.97k   186.35     3.99k    89.25%
      196638 requests in 10.10s, 46.69MB read
    Requests/sec:  19463.31
    Transfer/sec:      4.62MB

Running this two more times and averaging it gives us **19564.206 requests per second**! Except...that's not entirely surprising given that this is running on localhost with minimum network latency on an SSD.

That's enough for a weekend. Over the next several days/weeks/months, I'll be improving yakdb considerably, both in features and in stability. To keep up with the project, fork it on [Github][6].

[1]: https://projecteuler.net/
[2]: https://github.com/needcaffeine/project-euler
[3]: https://www.researchsquare.com
[4]: https://www.elastic.co/products/elasticsearch
[5]: http://redis.io/
[6]: https://github.com/needcaffeine/yakdb
