---
title: Convert JSON API responses into CSV with jq
description: It gets tedious if you need to write a script every time you need to parse an API response to do some data analysis on it. This post shows you how to do that from the command line.
publishDate: "2020-11-28T15:01:00-05:00"
---

A week ago I needed to parse the [Snipcart Abandoned Carts API endpoint](https://docs.snipcart.com/v3/api-reference/abandoned-carts) to find all abandoned carts on my store and what products they were, and then stick them in an Excel sheet to provide them to a colleague.

This arrived in front of me as a Jira ticket, and my very first thought was "okay, time to write a one-time script in javabaphpgoscript and get this done" and my second thought was "okay but why tho". My job isn't always necessarily to write code (sometimes it is) but to empower people to be more successful in their jobs. Sometimes helping people succeed is showing them how to do something, not just doing it myself. Teach someone to fish and all of that.

If this is your first time here, it might help you to know that I subscribe to [the Unix philosophy](/blog/basic-data-analysis-unix-linux-tools) when I script things.

## The copy pasta

If you just want the solution, here you go you're done. Adjust as necessary.

```bash
$ curl --silent -H "Accept: application/json" \
    "https://app.snipcart.com/api/carts/abandoned?offset=0&limit=1" -u yourApiKey: \
    | jq -r '. \
    | [.items[].items[].name, .items[].items[].price, .items[].items[].metadata.internalId, .items[].items[].addedOn] \
    | @csv'
    "Red shirt",20,"eo-12345",1605101933
```

If you want to see how to do this with any arbitrary API, go on and read the rest of this post.

## Parsing a JSON response

Perhaps one of the most influential APIs of our time is the [Cat Facts API](https://alexwohlbruck.github.io/cat-facts/). Here's what a default response from this API looks like:

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3"
    [{"used":false,"source":"api","type":"cat","deleted":false,"_id":"591f9858c5cbe314f7a7ad35","__v":0,"text":"In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.","updatedAt":"2020-08-23T20:20:01.611Z","createdAt":"2018-01-04T01:10:54.673Z","status":{"verified":true,"sentCount":1},"user":"5a9ac18c7478810ea6c06381"},{"used":false,"source":"api","type":"cat","deleted":false,"_id":"591f98108dec2e14e3c20b0f","__v":0,"text":"Cats have been domesticated for half as long as dogs have been.","updatedAt":"2020-08-23T20:20:01.611Z","createdAt":"2018-01-04T01:10:54.673Z","status":{"verified":true,"sentCount":1},"user":"5a9ac18c7478810ea6c06381"},{"used":false,"source":"api","type":"cat","deleted":false,"_id":"591f98703b90f7150a19c162","__v":0,"text":"One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.","updatedAt":"2020-08-23T20:20:01.611Z","createdAt":"2018-01-04T01:10:54.673Z","status":{"verified":true,"sentCount":1},"user":"5a9ac18c7478810ea6c06381"}]
```

Woah woah woah that is a mess, we can't read that, and it goes on for forever. So first steps first, let's see if we can make that look pretty.

### Introducing jq

One of my favorite utilities to work with structured JSON data is [jq](https://stedolan.github.io/jq/). You can simply pipe JSON to `jq` with no options and end up with prettified output.

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" | jq
[
    {
        "used": false,
        "source": "api",
        "type": "cat",
        "deleted": false,
        "_id": "591f9858c5cbe314f7a7ad35",
        "__v": 0,
        "text": "In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "createdAt": "2018-01-04T01:10:54.673Z",
        "status": {
            "verified": true,
            "sentCount": 1
        },
        "user": "5a9ac18c7478810ea6c06381"
    },
    {
        "used": false,
        "source": "api",
        "type": "cat",
        "deleted": false,
        "_id": "591f98108dec2e14e3c20b0f",
        "__v": 0,
        "text": "Cats have been domesticated for half as long as dogs have been.",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "createdAt": "2018-01-04T01:10:54.673Z",
        "status": {
            "verified": true,
            "sentCount": 1
        },
        "user": "5a9ac18c7478810ea6c06381"
    },
    {
        "used": false,
        "source": "api",
        "type": "cat",
        "deleted": false,
        "_id": "591f98703b90f7150a19c162",
        "__v": 0,
        "text": "One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "createdAt": "2018-01-04T01:10:54.673Z",
        "status": {
            "verified": true,
            "sentCount": 1
        },
        "user": "5a9ac18c7478810ea6c06381"
    }
]
```

What we want to do is create a spreadsheet with the text of the fact, the type of animal, when this fact was created, and whether the fact is verified. Take a look at our API response. What we got was an array of objects, so we need to tell `jq` to go into the array and extract object properties for us.

### jq filters

The way to do this in `jq` is by adding _filters_ and using the Unix philosophy to pipe them to other filters. For our first filter, we are going to tell `jq` to just give us all the objects inside the array. Notice that we discarded the array, and are just seeing each fact as an object now.

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" | jq '.[]'
{
    "used": false,
    "source": "api",
    "type": "cat",
    "deleted": false,
    "_id": "591f9858c5cbe314f7a7ad35",
    "__v": 0,
    "text": "In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.",
    "updatedAt": "2020-08-23T20:20:01.611Z",
    "createdAt": "2018-01-04T01:10:54.673Z",
    "status": {
        "verified": true,
        "sentCount": 1
    },
    "user": "5a9ac18c7478810ea6c06381"
},
{
    "used": false,
    "source": "api",
    "type": "cat",
    "deleted": false,
    "_id": "591f98108dec2e14e3c20b0f",
    "__v": 0,
    "text": "Cats have been domesticated for half as long as dogs have been.",
    "updatedAt": "2020-08-23T20:20:01.611Z",
    "createdAt": "2018-01-04T01:10:54.673Z",
    "status": {
        "verified": true,
        "sentCount": 1
    },
    "user": "5a9ac18c7478810ea6c06381"
},
{
    "used": false,
    "source": "api",
    "type": "cat",
    "deleted": false,
    "_id": "591f98703b90f7150a19c162",
    "__v": 0,
    "text": "One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.",
    "updatedAt": "2020-08-23T20:20:01.611Z",
    "createdAt": "2018-01-04T01:10:54.673Z",
    "status": {
        "verified": true,
        "sentCount": 1
    },
    "user": "5a9ac18c7478810ea6c06381"
}
```

That's slightly better. Now let's throw away all the information we don't want. As I said above we can pipe the `jq` output into another filter like this:

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" | jq '.[] | .text'
"In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king."
"Cats have been domesticated for half as long as dogs have been."
"One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter."
```

Cool, let's get the rest of the fields we need from this API by asking `jq` for them as part of the filter:

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" | jq '.[] | .text, .type, .createdAt'
"In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king."
"cat"
"2018-01-04T01:10:54.673Z"
"Cats have been domesticated for half as long as dogs have been."
"cat"
"2018-01-04T01:10:54.673Z"
"One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter."
"cat"
"2018-01-04T01:10:54.673Z"
```

Unfortunately this has made this response hard to read, so we are going to ask `jq` to arrange the output as individual rows. `jq` has a [built-in formatter](https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions) called `@csv` which can operate on an input which is provided as an array of elements. Let's convert our output to an array so we can pipe it to `@csv`. This is actually quite easy, you just need to wrap it in square brackets like this.

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" | jq '.[] | [.text, .type, .createdAt]'
[
    "In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.",
    "cat",
    "2018-01-04T01:10:54.673Z"
]
[
    "Cats have been domesticated for half as long as dogs have been.",
    "cat",
    "2018-01-04T01:10:54.673Z"
]
[
    "One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.",
    "cat",
    "2018-01-04T01:10:54.673Z"
]
```

Sweet, now let's send it over to `@csv`.

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" | jq '.[] | [.text, .type, .createdAt] | @csv'
"\"In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.\",\"cat\",\"2018-01-04T01:10:54.673Z\""
"\"Cats have been domesticated for half as long as dogs have been.\",\"cat\",\"2018-01-04T01:10:54.673Z\""
"\"One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.\",\"cat\",\"2018-01-04T01:10:54.673Z\""
```

### One more thing

At this point you can output this to a file and you'd be done. But let's overengineer this just a little bit and learn one more `jq` concept. We also want to know if a cat fact has been verified. The 'verified' property is part of an object inside our object, but getting a hold of it is very similar to getting any other property.

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" \
    | jq '.[] \
    | [.text, .type, .createdAt, .status.verified]'
[
    "In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.",
    "cat",
    "2018-01-04T01:10:54.673Z",
    true
]
[
    "Cats have been domesticated for half as long as dogs have been.",
    "cat",
    "2018-01-04T01:10:54.673Z",
    true
]
[
    "One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.",
    "cat",
    "2018-01-04T01:10:54.673Z",
    true
]
```

I don't like those nulls in the response. We can use an `if-then-else-end` conditional to make that prettier:

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" \
    | jq '.[] \
    | [.text, .type, .createdAt, if .status.verified == true then "verified" else "unverified" end]'
[
    "In Siam, the cat was so revered that one rode in a chariot at the head of a parade celebrating the new king.",
    "cat",
    "2018-01-04T01:10:54.673Z",
    "verified"
]
[
    "Cats have been domesticated for half as long as dogs have been.",
    "cat",
    "2018-01-04T01:10:54.673Z",
    "verified"
]
[
    "One un-neutered female cat can, in five years, be responsible for over 20,000 descendants. Female cats can have their first litter as young as six months and can have up to three litters each year with five or six kittens in each litter.",
    "cat",
    "2018-01-04T01:10:54.673Z",
    "verified"
]
```

And now let's go ahead and output that to a file which you can import into Excel.

```bash
$ curl --silent "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3" \
    | jq '.[] \
    | [.text, .type, .createdAt, if .status.verified == true then "verified" else "unverified" end] | @csv' \
    >> output.csv
```

Hope this has been a good introduction to `jq` but note that this was a very shallow intro. `jq` is SO much more powerful than what I showed here. The `jq` package has a wonderful [tutorial](https://stedolan.github.io/jq/tutorial/) as well as [detailed manual](https://stedolan.github.io/jq/manual/). In addition, there is a [jq playground](https://jqplay.org/) for you to practice various filters.

If this was helpful, let me know.
