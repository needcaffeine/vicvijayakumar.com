---
title: Who's your BFF? Rough notes on the popular BFF architecture pattern
description: Let's talk about the BFF pattern. No, BFF doesn't mean Best Friends Forever, but really it kinda is.
publishDate: "2021-11-27T20:00:00-04:00"
---

import { TwitterTweetEmbed } from "react-twitter-embed";

Let's talk about the BFF pattern. No, BFF doesn't mean Best Friends Forever, but really it kinda is. These are my rough notes as I explore BFFs at work, so this post will continue to evolve for a while.

## In the beginning, we had monoliths

Monoliths were simple. Users came to your website to look at a page, and that page was a _view_ that was part of the codebase in your monolith. Maybe it followed the MVC (Model-View-Controller) pattern or MVW (Model-View-Whatever) pattern. Maybe it was a single php file you used to build a multimillion dollar business, but the point here is that it was tightly coupled to the backend.

<center>
  ![Screenshot of a tweet: Your startup will scale just fine as a single PHP script and a lone mysql server.](./startup-scale-php-mysql.png)
</center>

Your view was rendered by a controller which called a service or depending on where you worked maybe the view contained raw sql and itself made database calls 🙃

This worked just fine generally speaking.

## If it makes you API, it can't be that bad

Let's jump forward a couple iterations. Next up came the concept of thin-client UIs and mobile-apps, and developers came up with the need for a central general-purpose common API backend that both the mobile app and web app could hit.

What often happens when you make a general purpose API is that it ends up being too generalized for any one need. You either bog down the network by asking for too many things, or have to make multiple API calls so that you have all the data you need. You end up with a generalization that is the wrong abstraction.

Our desktop client has completely different needs from our mobile client. They have different bandwidth constraints, different CPU contraints, and oftentimes they display completely different thngs on differently-sized screens and so have different data needs. Sometimes the mobile app may even have completely different usecases that harness your mobile device's ability to get user location or utilize the camera in some way.

So at this point you have an API that has to do different things depending on whether it's handling a mobile API request or a desktop website request, and these needs are so varied that you create a separate team to handle this codebase.

And now this team has become a bottleneck for every API consumer downstream, and needing to stay appraised of every use case of every team in order to be able to serve their needs. You will need to version the API, coordinate release times, etc.

## One backend per client

The Backend For Frontend pattern advocates for one "backend" per user experience / client. In this way of thinking about things, the BFF is tightly coupled to a specific UI (and only that UI), and is maintained by the same team as the UI, allowing for quick adaptations of the API as the UI requires. The API releases always line with the release of the UI.

If you had an iOS and Android app, you may have two different BFFs.

BFFs should be developed by teams aligned with each front end to ensure that each backend properly meets the needs of its client.

BFFs work best when you align them around team concerns, and by proxy, team structure/boundaries.

## What goes in a BFF?

Your backend services and models contain your business logic. Your BFF should contain calls to those backend services.

The BFF decides how to get the data, how to aggregate it, and what API payload the client needs. Sometimes, a BFF may be a bespoke API that calls out to multiple services and then aggregates the data for the UI.

For example, if you were running a train system, you backend services may contain methods like `getAvailableTrainRoutes(location)` and `getScheduleForToday()`.

```json
getAvailableTrainRoutes(location): {
  Blue line,
  Red line
}

getScheduleForToday(): {
  Blue line: [
    0900: Station A
    0905: Station B
    0910: Station C
  ],
  Red line: [],
  Yellow line: [
    0902: Station A
    0904: Station B
    0906: Station C
  ]
}
```

Let's say that your iOS app needs to display relevant routes for a traveler. Your iOS app would get the traveler's current location, pass it to the BFF, and the BFF would make the necessary API calls, transform the returned data, and provide a useful representation to the UI only relevant to them.

```json
{
  Blue line: [
    0905,
    0910
  ]
}
```

I have this visual in my head of a train station and a passenger receiving JSON to their phone and one day I will achieve the artistic skill necessary to draw that. 😂

## Prefer duplication to abstraction

A concern that comes up often when a team is creating their BFF is that this BFF shares a lot of routing and controller logic with another BFF, so we should probably create an AbstractBFF and... let me just stop you right there.

<center>
  <TwitterTweetEmbed tweetId={"442003113910603776"} />
</center>

Creating a general purpose API is what led you here in the first place, so let's not go back to that life.

BFFs can also function as a bespoke layer on your journey away from a monolith or toward a microservice pattern. This is sometimes known as the [strangler pattern](https://martinfowler.com/bliki/StranglerFigApplication.html).

## Shared framework

At some point you will have 5 different frontends that each have their own BFFs. Before you get there, it's important to make sure that you aren't duplicating the truly common things between all your BFFs- like error logging, telemetry, authorization, etc. It is beneficial to have a shared framework that takes care of those things for you. If you are going to abstract anything, it's that.

## Monorepos and BFFs

Another place where BFFs become really useful is microsites that are part of a larger mono repo. Each microsite then is effectively its own user experience and needs data differently. The team that is responsible for the microsite will need to own and run their BFF.

## Takeaways

The biggest take away here is that BFFs allow you to limit the number of customers supported by that API, making them easier to work with and modify, and helps with developer autonomy.

By reducing the number of teams between the backend service and the UI, you empower frontend teams to be able to control their own destiny and move faster.
