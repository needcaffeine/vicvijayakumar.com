---
title: The terminal where it happens - basic text analysis using Unix/Linux utilities
description: Unix/Linux utilities are one of my favorite ways to do basic text analysis. This post was originally a Twitter thread but I kept running into the character limit and wanted to write it down in longer form, so here we are.
publishDate: "2020-11-04T15:48:00-05:00"
favorite: true
---

This post was originally a Twitter thread under the hashtag [#7DaysOfUnix](https://twitter.com/search?q=from%3A%40vicvijayakumar%20%237DaysOfUnix&src=typed_query&f=live). I kept running into the character limit and wanted to write it down in longer form, so here we are. Note that I'm using MacOS (Darwin), but all of these should work on Linux or any other flavor of Unix.

Unix/Linux utilities (henceforth referred to only as Unix utilities) are one of my favorite ways to do basic data analysis. When asked for some analysis, if the data is not in an easily queryable database, my first inclination is almost always to crack my knuckles and throw an army of Unix tools at the problem.

## Introduction to some Unix commands

For this particular demonstration, I'm going to be listing out the top 10 words in the song ["My Shot"](https://genius.com/Lin-manuel-miranda-anthony-ramos-daveed-diggs-okieriete-onaodowan-leslie-odom-jr-and-original-broadway-cast-of-hamilton-my-shot-lyrics) from the musical **Hamilton**. Copy them down from genius.com and save it to a text file.

<img
  alt="Scene from the song 'I\'m not throwing away my shot'"
  src="https://media.giphy.com/media/dUqa9cPVAYIKu6xWq6/giphy.gif"
  className="w-full"
/>

Okay, let's look at the directory contents:

```bash
ls
```

Show me the contents of the file:

```bash
cat my-shot.txt
```

Here's something very important about Unix. The Unix philosophy is all about minimalist, modular software development. Unix is full of small composable single-purpose tools which you glue together to build complex workflows. You can send the output of almost any command as the input to any other command using "pipes". Pipes are a way for one process to communicate with another process. If you want to read more about pipes, this [Wikipedia](https://en.wikipedia.org/wiki/Pipeline_%28Unix%29) article has a lot of information.

For example, how many lines, words, and chars are in this song? You can directly use the `wc` utility for that.

```bash
$ wc my-shot.txt
    233    1160    6513 my-shot.txt
```

But you can also `cat` out the contents of the file and pipe them over to `wc`.

```bash
$ cat my-shot.txt | wc
    233    1160    6513
```

What! Okay that's cool but let's do something useful. How often in the song do they say that one line?

```
$ cat my-shot.txt | grep "I am not throwing away my shot"
I am not throwing away my shot!
I am not throwing away my shot!
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
And I am not throwing away my shot
I am not throwing away my shot
```

How many lines is that? Ask our friend `wc` again.

```bash
$ cat my-shot.txt | grep "I am not throwing away my shot" | wc
    10      71     316
```

What about just the word "shot"?

```bash
$ cat my-shot.txt | grep "shot" | wc
    32     221    1028
```

This is a good time to say that if you want to know the details of any command or utility, use the `man` (manual) command. Example-

```bash
man wc
```

**Recap**: So far, we have learned about pipes, how to look up documentation with the `man` command, and how to search through text output with `grep`.

Pull up that `grep` again, you may have noticed that we got a line we didn't want.

```bash
$ cat my-shot.txt | grep "I am not throwing away my shot"
I am not throwing away my shot!
I am not throwing away my shot!
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
And I am not throwing away my shot <---- this one
I am not throwing away my shot
```

Let's quickly clean that up.

```bash
$ cat my-shot.txt | grep -i "^I am not throwing away my shot"
I am not throwing away my shot!
I am not throwing away my shot!
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
I am not throwing away my shot
```

The `^` tells `grep` to search from the beginning of a sentence. The `-i` ensures that the search is case insensitive. Take a quick peek at the examples section of the manual.

```bash
man grep
```

Onward. I want to know how many times the word "shot" appears in the song. You know how to do this! Use the Unix philosophy Luke. Break the problem up into different pieces and glue them together.

What this means is: 1) Read from the file, 2) search for lines with the word "shot", and 3) count them:

```bash
$ cat my-shot.txt | grep -i "shot" | wc
    37     226    1058
```

It appears 226 times in 37 lines!

Quick tangent- let's learn about a new utility. `head` displays the first lines of a file. By default it shows the top 10 lines, but is configurable. You can see what other options it has by looking up the man page for `head`.

```bash
man head
```

## How many different words are in this song?

Back to our regular scheduled programming- what about other words in the song? You know how to figure out the number of instances of one word, but what if I want to know how many different words are in this song?

Let's start by breaking up our sentences into words. The `tr` command is SUPER useful if you want to _translate_ one set of characters into another. Here I'm going to translate spaces into newlines. But to keep our console output manageable I'm going to tell `head` only to show us 10 lines.

```bash
$ tr ' ' '\n' < my-shot.txt | head
[HAMILTON]
I
am
not
throwing
away
my
shot!
I
am
```

Oh that's trippy. Now I want to sort all the words alphabetically to group them together. Sorting is easily accomplished using the...wait for it... `sort` command.

```bash
tr ' ' '\n' < my-shot.txt | sort | head
```

But what on earth, it's just blank. (Spoiler- nope, all the blank lines just sorted up to the top!) Let's do some cleanup and remove the empty lines.

The `sed` command (stream editor) takes patterns and we're going to tell it here to delete anything that has no content between start and end.

```bash
$ tr ' ' '\n' < my-shot.txt | sed '/^$/d' | sort | head
&
&
&
&
&
&
&
'Onarchy?
'anarchy?'
'cause
```

And hey, the empty lines are gone!

How many different words are in this song? The `uniq` command to the rescue! It does what you think it does.

```bash
$ tr ' ' '\n' < my-shot.txt | sed '/^$/d' | sort | uniq | head
&
'Onarchy?
'anarchy?'
'cause
'em
'n
'onarchy?
(And
(He
(Rise
```

And you already know how to count how many unique words we have in this song:

```bash
$ tr ' ' '\n' < my-shot.txt | sed '/^$/d' | sort | uniq | wc
    517     517    356
```

So far we have figured out how to go from a file of song lyrics to being able to tell how many unique words are in that song. Next, let's look through the man pages of `uniq`.

```bash
man uniq
```

Hey that's cool. The man page tells us that the `uniq` command has a `-c` flag which will tell you how many times a word appeared.

```bash
$ tr ' ' '\n' < my-shot.txt | sed '/^$/d' | sort | uniq -c
    7 &
    1 'Onarchy?
    1 'anarchy?'
    1 'cause
    1 'em
    2 'n
    1 'onarchy?
    1 (And
    1 (He
    4 (Rise
```

Kind of useful, but I can think of how we can make it way more useful. Since every line is now prefixed with a number, we can tell sort to them all of these again numerically. And then to make it even more useful, tell it to `sort` them in reverse.

```bash
$ tr ' ' '\n' < my-shot.txt | sed '/^$/d' | sort | uniq -c | sort -nr | head
    45 I
    35 a
    32 my
    28 I'm
    24 to
    24 the
    23 away
    21 throwing
    21 not
    18 shot
```

There you have it. The top 10 most frequently occurring words in the song "My Shot". If parties were a thing, you could totally drop this in conversation to impress bystanders.

If you're a data scientist, Unix tools are invaluable for quickly spotting patterns or to just clean up your data. And honestly SO MUCH of data analysis / data science is cleaning up your data sources. I'd love to know if this post has been of some help to you. Jump over to Twitter and let me know!
