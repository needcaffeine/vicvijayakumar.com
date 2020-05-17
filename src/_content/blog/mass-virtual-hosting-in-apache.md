---
title: Mass virtual hosting with Apache
date: '2013-01-16T00:00:00-04:00'
tags:
    - apache
    - nginx
aliases:
    - /mass-virtual-hosting-in-apache.html
    - /2013/01/16/mass-virtual-hosting-in-apache
---

I'm going to start off by saying that if the situation permits, you should use [nginx](http://nginx.org/) instead, or at least in front, of Apache. Our setup at work is actually nginx as a reverse proxy to Apache. I'll put up that configuration soon.

Apache prefork is a memory hog that will become a major sore spot in your architecture as you try to scale. **You will hate yourself and everything when your server starts to die because fifty 100MB Apache processes are trying to serve a bunch of 50KB cat memes.** WikiVS does a pretty good job of [comparing Apache and nginx](http://www.wikivs.com/wiki/Apache_vs_nginx) so I won't rehash all of that just to fill the page. All of that being said, your particular situation may not permit you to switch from Apache to nginx, so this bit of documentation is for you lot.

## Assumptions
* You run Apache.
* You have a bunch of users who want to be able to create as many sandbox sites as they want in order to send out to different clients.

Example list of sites:
design1.example.com
vic.design2.example.com
i.like.pancakes.example.com

None of the users really want to muck around with httpd.conf creating virtual hosts for each site that they need. That adds a lot of overhead for what should really be a fairly simple operation. So what's the solution? For Apache, it's **Mass Virtual Hosting**. I'm going to assume that the dns for *.example.com points to your server. Let's get to the configs. Your httpd.conf file needs to include this file (or you can put this at the bottom of your httpd.conf).

### /etc/httpd/conf/vhosts.d/example.conf:

	<VirtualHost *:80>
		ServerAlias *.example.com
		VirtualDocumentRoot /var/www/vhosts/%0/

		<Directory "/var/www/vhosts/">
			Options FollowSymlinks
			AllowOverride All
		</Directory>
	</VirtualHost>


What this does is set the virtual document root to whatever the hostname is, as long as it ends in example.com. So if you want to serve vic.design1.example.com, all you need to do is create /var/www/vhosts/vic.design1.example.com and going to that site (assuming that DNS points to this server) will serve whatever is inside that directory. That's all you need to do for basic HTTP. HTTPS is a little more complicated. Let's look at that configuration.

### /etc/httpd/conf.d/ssl.conf:

    <VirtualHost 1.2.3.4:443>
		[...]

		RewriteEngine on

		#   1. define two maps: one for fixing the URL and one which defines
		#   the available virtual hosts with their corresponding
		#   DocumentRoot.
		RewriteMap    lowercase    int:tolower

		#   2. make sure we have a Host header
		RewriteCond   %{HTTP_HOST}  !^$

		#   3. lowercase the hostname
		RewriteCond   ${lowercase:%{HTTP_HOST}|NONE}  ^(.+)$

		#   5. finally we can map the URL to its docroot location
		#      and remember the virtual host for logging puposes
		RewriteRule ^/(.*)$ /var/www/vhosts/%{HTTP_HOST}/$1 [E=VHOST:${lowercase:%{HTTP_HOST}}]

		<Directory "/var/www/vhosts/">
			Options FollowSymLinks
			AllowOverride All
		</Directory>
    </VirtualHost>

Restart Apache and bam, you got it.
