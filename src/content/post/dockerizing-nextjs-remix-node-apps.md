---
title: Containerizing a Next.js, Remix, or other Node.js app with Docker
description: This is an example of how to run a node.js app in a Docker container.
publishDate: "2023-09-04T00:00:00-04:00"
---

There are many reasons why you may want to run your app in a Docker container. This blog post assumes that you have already decided to go down this path, and will not try to educate you on the benefits of containerization.

I used to run my applications on Amazon Elastic Container Service (ECS), and now on AWS Fargate, both of which need Docker images.

## Overview

When you want to run a containered application, you need to build a Docker image. This image is a snapshot of your application at a specific point in time. You can then deploy this image to a container registry, and use it to run your application.

The Docker image is built from a Dockerfile. This file contains instructions on how to build your image. You can think of it as a recipe for your image.

In general, what you need to do are:

1. Start from an operating system
2. Install the tools you need to run your application
3. Copy your working application into the image
4. Tell Docker how to start your application
5. Tell Docker what port to expose to the host operating system
6. Package all this up into an image
7. Push the image to a container registry
8. Tell the service that will run your application where to find your application image

Once you get the basic version of this working, you can hyperoptimize this, but as the mantra goes: _Make it work, make it right, make it fast._

## The basic version

This is the most basic version of a Dockerfile that will run a Node.js application. It will install Node.js, copy your application into the image, install your dependencies, and start your application.

```plaintext:Dockerfile showLineNumbers
FROM node:18-alpine3.18
WORKDIR /site

# Install latest security upgrades, and crucial runtimes.
RUN apk update \
    && apk upgrade \
    && apk --no-cache add \
        tini \
    && rm -rf /var/cache/apk/* \
    && npm --global install npm pm2 \
    && rm -rf /opt/yarn* \
    && rm -rf /root/.npm \
    && rm -rf /tmp/*

COPY . /site
RUN npm install --production

# Invoke tini (A tiny but valid init for containers)
ENTRYPOINT ["/sbin/tini", "--"]

# PM2 Runtime is a Production Process Manager for Node.js applications
# with a built-in Load Balancer. It allows you to keep applications alive forever
# and to reload them without downtime
CMD ["/usr/local/bin/pm2-runtime", "start", ".pm2.config.js"]

# Expose port 80.
EXPOSE 80
```

I also commit a .pm2.config.js file to my repository. This file tells PM2 how to start my application. You can read more about PM2 here: <https://pm2.io/docs/runtime/integration/docker/>

```plaintext:.pm2.config.js showLineNumbers
module.exports = {
  apps: [
    {
      name: "example-app",
      script: "PORT=80 npm run start",
      env: {
        NODE_ENV: "production",
      },
      cwd: ".",
    },
  ],
};
```

That's pretty much it. The exercise of figuring out how to provide this Dockerfile to your CI/CD is left up to you.

Note that pm2-runtime is optional. I use it for my apps, but you can probably use `npm run start` directly. See how other people are doing this.

One immediate optimization you can make is that every time you run `docker build .` your entire local directory is going to get copied into the container, which is wildly unnecessary and is slow. You can use a `.dockerignore` file to tell Docker what files to ignore when copying your application into the image.

```plaintext:.dockerignore showLineNumbers
.git
node_modules
```

Yes this means `node_modules` doesn't get copied, but notice that our Dockerfile does a `npm install --production` which will install all of our dependencies in the container.

You can totally stop here and be happy with your Dockerfile. But there are a few things you can do to make your life easier.

## The intermediate version

I maintain a base image that I use for all of my applications. This base image is a Node.js 18 image on Alpine 3 with some additional tools installed. I then use this base image to build my application image.

I keep the base image updated and deployed to Amazon Elastic Container Registry (ECR). The benefits of having your own base image are:

- You don't have to install the same tools over and over again.
- You aren't hitting Dockerhub rate limits with your free account if you need to rebuild your image multiple times.
- Your builds are faster because you start with a pre-built image.

The disadvantages are:

- You have to maintain your own base image.
- Your base image may not be up to date if you don't update it regularly. (this is automatable, but out of scope of this blog post)

## The base image

```plaintext:Dockerfile showLineNumbers
FROM node:18-alpine3.18 AS base
WORKDIR /site

# Install latest security upgrades, and crucial runtimes.
RUN apk update \
    && apk upgrade \
    && apk --no-cache add \
        tini \
    && rm -rf /var/cache/apk/* \
    && npm --global install npm pm2 \
    && rm -rf /opt/yarn* \
    && rm -rf /root/.npm \
    && rm -rf /tmp/*

# Invoke tini (A tiny but valid init for containers)
ENTRYPOINT ["/sbin/tini", "--"]
```

I push this image to ECR from my CI/CD pipeline. I use AWS CodeBuild, so I'm providing my example buildspec file.

```plaintext:buildspec.yml showLineNumbers
version: 0.2

env:
  variables:
    REPOSITORY_NAME: "example/alpine-node"

phases:
    pre_build:
      commands:
        - AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
        - REPOSITORY_URI=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPOSITORY_NAME
        - echo Logging in to Amazon ECR...
        - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI
        - echo Logging in to Docker Hub...
        - echo $DOCKERHUB_PASSWORD | docker login --username $DOCKERHUB_USERNAME --password-stdin
    build:
      commands:
        - echo Build started on `date`
        - echo Building the node 18 base image...
        - docker build --target "base" --tag "$REPOSITORY_NAME:18-base" 16
        - docker tag "$REPOSITORY_NAME:18-base" $REPOSITORY_URI:18-base
        - docker push $REPOSITORY_URI:18-base
        - echo Building the node 16 build image...
        - docker build --target "build" --tag "$REPOSITORY_NAME:18-build" 16
        - docker tag "$REPOSITORY_NAME:18-build" $REPOSITORY_URI:18-build
        - docker push $REPOSITORY_URI:18-build
    post_build:
      commands:
        - echo Build completed on `date`
```

You can of course use Dockerhub or any other container registry. Or you can even choose to keep your base image and application image in the same Dockerfile as shown in the basic version at the top.

## The application image

This Dockerfile would be in the root of your application, and your CI/CD solution would use it to build your app.

```plaintext:Dockerfile showLineNumbers
FROM $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/example/alpine-node:18-base
WORKDIR /site

COPY . /site

# Invoke tini (A tiny but valid init for containers)
ENTRYPOINT ["/sbin/tini", "--"]

# PM2 Runtime is a Production Process Manager for Node.js applications
# with a built-in Load Balancer. It allows you to keep applications alive forever
# and to reload them without downtime
CMD ["/usr/local/bin/pm2-runtime", "start", ".pm2.config.js"]

# Expose port 80.
EXPOSE 80
```

My CI/CD pipeline would then build this image and push it to ECR. I'm providing the rough commands it uses:

```plaintext
# install npm
npm i -g npm

# install all node dependencies
npm install

# build the application
npm run build

# get rid of production-only dependencies
npm prune --production

# build the application image
docker build .
```

One common pitfall to avoid here is that when these commands are running on your CI/CD server, they are running in the root of your repository. So you need to make sure that your Dockerfile is in the root of your repository, and that you delete the .dockerignore file before you run `docker build .` otherwise your node_modules will not get copied.
