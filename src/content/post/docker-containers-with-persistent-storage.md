---
title: Docker containers with persistent storage
description: Running a Docker container usually does not allow you to persist any configs or other files. Let's look at a few ways to make this more useful.
publishDate: "2021-04-12T22:22:00-04:00"
---

Docker images are a great way to try out new packages without installing anything on your host system. Recently I needed to run PHP 7.4 for a project without actually downgrading my system-installed PHP version. This post will be a brief introduction to how you can share files between your host machine and your Docker container.

## Everything is temporary

If you just want to run an image and not need to make any changes to it, it's fairly straightforward:

```bash
$ docker run -it php:7.4-fpm sh
# php -a
Interactive shell

php >
```

Let's break that down.

- docker: this is the docker cli
- run: this says we want to run commands inside a container
- -it: this is a combination of -i (--interactive) and -t (--tty) which basically connects your local terminal to the terminal inside the container
- php:7.4-fpm: this runs the php image with tag 7.4-fpm, looking for it first on your local machine (`docker images`) and then on Dockerhub.
- sh: the command I want to run inside the container

Ctrl-D (or type `exit`) to exit the shell.

That was our simplest use case. You can also ask for a shell and do something else like creating a file called hello.txt with the contents "hello world":

```bash
$ docker run -it php:7.4-fpm sh
# echo "hello world" > /hello.txt
# cat /hello.txt
hello world
```

Excellent. Exit the shell. Now let's go back into the image and look for the file we just created.

```bash
$ docker run -it php:7.4-fpm sh
# cat /hello.txt
cat: /hello.txt: No such file or directory
```

Whaaaaaat. What is happening here is that by default all files created inside a container are temporary. When the container stops, the data is basically gone.

In fact, when you use `docker run` a temporary container is created from the image and that container isn't even persisted to disk. We can confirm this by running two different copies of the php:7.4-fpm image and seeing that files we create on one container aren't accessible in the other. You can confirm this further with `docker ps`:

```bash
$ docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED              STATUS              PORTS         NAMES
c3e11fbb8a65   php:7.4-fpm          "docker-php-entrypoi…"   51 seconds ago       Up 50 seconds                     thirsty_chebyshev
b22209e71fd7   php:7.4-fpm          "docker-php-entrypoi…"   About a minute ago   Up About a minute                 distracted_shockley
```

## Nevertheless he tried to persist

Okay cool but this isn't really helpful. We know all the reasons this doesn't do what we want. But we want it to do what we want. Let's do that. If you want to work on a set of files that don't disappear when the container exits, there are one of two ways to do so.

### 1. Volume mounts

When you configure a Volume for a container the files are stored in a location on the host system that is managed by Docker. Volumes can be mounted into multiple containers if desired.

Volumes mounts are way more performant than bind mounts, with lower latency and higher throughput because they are stored in the Linux virtual machine, as opposed to your host OS. You should use them for things like databases or key-valu stores that require native file system behavior. **TODO**: This is a good read about the benefits of volume mounts: https://docs.docker.com/storage/volumes/

**Start an image with a volume mount**

```bash
$ docker run -it -v volume1:/site php:7.4-fpm sh
# echo "hello world" > /site/hello.txt
# cat /site/hello.txt
hello world
#
```

Ctrl-D to exit the image and go back in.

```bash
$ docker run -it -v volume1:/site php:7.4-fpm sh
# cat /site/hello.txt
hello world
```

THE DATA PERSISTED! If you want to get fancy with this, you can even run multiple containers and mount the vol1 into each of them and they will each be able to share the filesystem.

To see all the volumes managed by Docker, you can run `docker volume ls`.

```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     volume1
```

While the above was a cool example, the far more practical use case is to mount a local directory (of code?) that you can run inside the container

### 2. Bind mounts

Bind mounted files are user-managed and can be stored anywhere on the host machine. Bind mounts are good for use cases like sharing config files between the host and containers, and for sharing source code and build artifacts. I like them to be in the same directory as my app and then mounted into the container. This is great for code that runs inside a container for example, because you can edit the files in your editor and when you hit save the application can use them.

Bind mounts are _supposed to be_ as performant as volume mounts, but rarely come close on Windows or MacOS because they do not get the benefits of running on the Linux VM that volume mounts get. That being said, you may or may not notice it.

Creating a bind mount is almost the same syntax as a volume mount with one subtle difference, that Docker looks to see if you are providing it with a folder path.

```bash
$ mkdir mycode && echo "hello" > mycode/hello-world.js

$ docker run -it -v "$(pwd)"/mycode:/site php:7.4-fpm sh
# cat /site/hello-world.js
hello
```

From outside the running container in a separate terminal:

```bash
$ echo "console.log('wat')" > mycode/hello-world.js
```

And back in the container:

```bash
# cat /site/hello-world.js
console.log('wat')
```

And now rename the file inside the container, for fun:

```bash
# mv /site/hello-world.js /site/index.php
#
```

Which is reflected outside the container:

```bash
$ ls mycode/
index.php
```

## Now is a good time to talk about Docker Compose

[Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running single or multi-container Docker applications. You define what your application should look like as a YAML file and the Compose application builds your infrastructure for you.

Talking about all the different things Docker Compose can help you do is outside of the scope of this blog post, but let's go through a very small example application using our original PHP 7.4 image.

Create a docker-compose.yml file in your application directory and put the following contents in it.

```yaml
version: "3.9"
services:
web:
  image: php:7.4-fpm
  ports:
    - "9000:9000"
  volumes:
    - .:/site
```

Save the file, then type `docker compose up`. Docker will briefly build this container and keep it running. From a different terminal window find your running container:

```bash
$ docker ps | grep php:7.4-fpm
b165fcb585c7   php:7.4-fpm          "docker-php-entrypoi…"   7 minutes ago   Up 36 seconds   0.0.0.0:9000->9000/tcp   blog_web_1
```

Go into the running container:

```bash
$ docker exec -it b165fcb585c7 sh
# ls -al /site
total 492
drwxr-xr-x  33 root root   1056 Apr 13 02:11 .
drwxr-xr-x   1 root root   4096 Apr 13 02:08 ..
-rw-r--r--   1 root root   6148 Jan 22 02:05 .DS_Store
-rw-r--r--   1 root root    174 May 23  2020 .env
-rw-r--r--   1 root root     85 May 20  2020 .env.example
-rw-r--r--   1 root root     46 Dec  1 15:09 .eslintignore
[...]
```

Your current working directory has been mounted into the /site directory on the container! 🎇
