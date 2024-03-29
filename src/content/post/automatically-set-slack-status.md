---
title: Automatically set your Slack status using your Calendar
description: Automate the process of updating your Slack status using information in your calendar.
publishDate: "2018-04-19T00:00:00-04:00"
updatedDate: "2020-12-30T22:00:00-04:00"
---

If you are anything like me, you belong to nine different Slack teams and when a meeting starts on your calendar, yon need to set yourself as "in a meeting" in several of them. Ideally you also need to set yourself to Do Not Disturb. First of all, doing this manually is really inane. Secondly, I used to keep forgetting to actually update the status, and then...

- people message you when you're in a meeting
- you get distracted and look at the message
- people in your meeting realize you're distracted
- you hit up a search engine looking for this post

There are several ways to automatically update your Slack status based on your calendar.

## Update your status from the Slack side

Since the original version of this post, Slack has created several calendar integrations on their side. How this works is that you connect your calendar to Slack (Outlook Calendar and Google Calendar are supported at this time), then you tell the calendar app to change your Slack status for you. [Slack has an article about this on their site](https://slack.com/slack-tips/sync-your-slack-status-with-your-calendar).

The thing to note about this method is that your Slack status will get set to "In a meeting" and that is the extent of how much you can customize it. If that's all you need, boom you're done. If you need more customizability, read on.

## Update your status from an external service

There are several automation services out there that will glue various services together, like [IFTTT](https://ifttt.com), [Zapier](https://www.zapier.com), and [Integromat](https://www.integromat.com). The one that I use is Zapier.

Here are two popular integrations on Zapier's site:

- [Slack + Google Calendar](https://zapier.com/apps/slack/integrations/google-calendar)
- [Slack + Outlook](https://zapier.com/apps/slack/integrations/microsoft-outlook)

These integrations work similarly. When an event starts on your calendar (or is about to start; this is configurable), Zapier updates your Slack status with whatever text you want (some people pick the name of the event, but... do you really want it to update the event with the title of private events in the middle of the day like "Call mom"?). When the event ends, Zapier clears out the calendar status again.

Let me know how you're using these integrations to save time throughout your day!
