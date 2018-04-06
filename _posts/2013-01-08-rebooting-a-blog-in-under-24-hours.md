---
layout: post
title: Rebooting a blog in under 24 hours
categories:
  - blogging
  - jekyll
  - hyde
  - disqus
redirect_from:
  - /rebooting-a-blog-in-under-24-hours.html
  - /2013/01/08/rebooting-a-blog-in-under-24-hours/
---

Once upon a time, I really enjoyed writing in my blog. I documented lots of little bits and pieces of my life. Hey check out how to automate Word document creation with headless Open Office. Hey look at this beautiful roast chicken and root vegetables I just made. Hey read my rant about Python vs PHP. While I enjoyed blogging, the website/server maintenance part of it sucked because I had to keep Wordpress updated and run `yum update` semi-religiously to ensure that my server didn't get taken over by a bunch of script kiddies, all to protect a few dozen blog entries.

The sensible thing would have been to move my blog over to Wordpress.com or Blogspot or something, but instead I ended up shutting my doors. School was stressful, my job was demanding, and I was more than likely trying to impress a girl. I wanted to continue writing about software and software development, but the barrier for continuation was just [too damn high](https://www.google.com/search?num=10&site=imghp&tbm=isch&q=too+damn+high).

## Dr. Jekyll and Mr. Hyde
A couple years ago, I was reading through the blog of Tom Preston-Werner, co-founder of Github. In a post titled [blogging like a hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html), Tom wrote about the annoyance of complicated blogging engines and being "stuck in a cycle of quitting and starting over" when he created [Jekyll](https://github.com/mojombo/jekyll). <b>Dude, I totally feel you.</b> I realized that having my site be just a bunch of static HTML meant:

* New tool to play with.
* No database.
* I could use Vim to write my posts.
* Revision control.
* Markdown.
* Other cool things I could do with Bash.

Even though I didn't set out to do anything about it right away, I made a mental note to go back to it some day.

Come New Year's Eve 2012, I decided that my one single resolution would be to pick up writing again. But how to proceed? Ah, there's that crusty old mental note I accidentally washed with my jeans. I didn't want to enter a cycle of spending forever on the selection and setup process again though. That thing that sabotaged me time and again. This time, I'd do it in...<b>24 hours or less</b>.

In the true fashion of not hurriedly picking the first tool I encountered, I spent some time playing with [Hyde](https://github.com/lakshmivyas/hyde) and with [Middleman](https://github.com/middleman/middleman). At the end of the day (hour) however, Jekyll was the winner for me. YMMV. If you want to take the quickest route possible, just fork the source for [Tom's site](https://github.com/mojombo/mojombo.github.com) and push it to your own Github repo. Bam, the magic of [Github Pages](http://pages.github.com/). If your situation is special, articles about how to set up Jekyll are [all](http://jekyllbootstrap.com/) [over](http://net.tutsplus.com/tutorials/other/building-static-sites-with-jekyll/) [the](http://danielmcgraw.com/2011/04/14/The-Ultimate-Guide-To-Getting-Started-With-Jekyll-Part-1/) [place](http://paulstamatiou.com/how-to-wordpress-to-jekyll). In either case, here's a really quick guide to how I set up this site.

## The Setup

Pre-requisites: You need Git and Ruby, so if you're on a Mac, just go ahead and [follow this tutorial](http://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/) and get those taken care of. All done? Okay, now let's move onto the actual Jekyll setup. I should start off by saying that my development environment at home is Mac OS X (10.8) and I spend the majority of my day otherwise at a Linux console. I'm not really going to list out each console command here, since if you've decided to go down the Jekyll route, you better be comfortable with Googling for answers.

1. `git init` inside of an empty folder. This is pretty much how I start every project.
2. [Install Jekyll](https://github.com/mojombo/jekyll/wiki/install).
3. I could have used one of several Jekyll starters like [Jekyll Bootstrap](http://jekyllbootstrap.com/) to generate a basic site structure, but I opted to clone [one of the sites](https://github.com/mojombo/jekyll/wiki/sites) from the Jekyll Github page. Then I trimmed away at the site, deleting things like old posts, images, etc.
4. I downloaded a HTML5 template from [Initializr](http://www.initializr.com/) bundled with [Twitter Bootstrap](http://twitter.github.com/bootstrap/) and replaced the Jekyll default and post templates.
5. Some CSS styling so the site didn't look like every other Twitter Bootstrap site in the world. The fonts are [Lato](http://www.google.com/webfonts/specimen/Lato) and [GoudyBookletter 1911](http://www.google.com/webfonts/specimen/Goudy+Bookletter+1911) from Google Web Fonts.
6. Set up Disqus [per their instructions](http://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions).
7. Set up [Jekyll asset pipeline](https://github.com/matthodan/jekyll-asset-pipeline) to combine and compress css/js. Super easy and totally worth it.
8. And finally -- set up analytics. I did Google Analytics and Mixpanel.

Source available at <a href="http://github.com/needcaffeine/vicvijayakumar.com"><i class="icon-github"></i> needcaffeine/vicvijayakumar.com</a>.

My under 24 hours [MVP](http://en.wikipedia.org/wiki/Minimum_viable_product) meant that I wasn't going to bother with something to help me auto-deploy to Amazon S3, especially because I already use the very powerful and amazing [s3cmd](http://s3tools.org/s3cmd) to do my backups et al. When I need to push my site up to S3, all I do is `s3cmd sync --acl-public _site/* s3://vicvijayakumar.com/`.

## Epilogue
So that's where we are. You are currently reading this on a site produced with the help of Jekyll in **under 24 hours**. While only time will tell whether I find the whole process awesome enough to continue writing, all signs point to a strong yes at present. Let's revisit this post in 6 months.
