---
title: Automatically set your Slack status
description: Automatically set your Slack status
date: '2018-04-19T00:00:00-04:00'
tags:
    - automation
    - zapier
    - calendar
    - slack
aliases:
    - /2018/automation-series-stop-doing-boring-things/
---

Think about the really mundane stuff you do each and every single day. Now what if those things just automagically happened for you? I'm going to start documenting automating away some really rote stuff I do, one at a time.

Let's start with Slack, the greatest productivity killer of the 21st century. Before/during every meeting, I used to set my Slack status to "In a meeting". How utterly boring. Before I could even think about pulling up the documentation for the Google Calendar API, I discovered [this Zapier page](https://zapier.com/apps/google-calendar/integrations/slack/15914/update-your-slack-status-when-google-calendar-events-begin) where they implement almost exactly what I needed.

The gist of it is that you configure a listener on your Google Calendar and then Zapier automatically updates/clears your Slack status depending on whether an event is starting or has just ended.

One down.
