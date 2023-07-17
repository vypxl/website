---
title: About my Website
slug: about-my-website
tags: ['webdev']
published: 2022-02-20
description: This article covers the technologies used to build this website and blog, and my journey building it.
---

# About my Website

Hey! Welcome and thank you for visiting my personal website. In this first blogpost of mine, I want to talk about all the things that went into developing it.

What you see is actually my fourth(!!) attempt on creating a website and blog for myself, the first three attempts remain unfinished though. Also, I won't talk about the _great_ programming practices I used back then. But now I can proudly say that I have a personal website, one thing I always wanted to have since I started programming. Now then, how did I accomplish what you can see here?

## Tech Stack

This website is built on top of a so-called JAMstack.
JAM stands for **J**avascript, **A**PIs and **M**arkup. JAMstack websites are static, generated pages that are hosted on a static website hosting service.
I'm using the static site generator [**Gridsome**](https://gridsome.org). It uses the Javascript framework [**VueJS**](https://vuejs.org) under the hood, which makes it easy for me to extend the site with additional content.
For the API part, I'm using local markdown files that are loaded by my [custom load script](https://github.com/vypxl/website/blob/main/util/sourceContent.mjs).
The markup part has two sides. First, there is the obvious HTML Markup. I write most of the Markup in [**Pug**](https://pugjs.org) (an HTML preprocessor) though, as it is more enjoyable to me than writing raw HTML. The second part is what I write my blogposts in. This would be **Markdown**. I use markdown because it is easy to write in and easy to convert into beautiful HTML. In addition to that, my custom Markdown renderer I made with the library [Unified](https://unifiedjs.com) makes fancy adjustments like

```js
rendering('Code').snippets
```

or automatically linking headings.
For writing styles, I use **Sass** or, more specifically, SCSS. It allows for some niceties when writing styles I don't want to miss by relying on standard CSS.

## Development and Deployment

I used Visual Studio Code for developing my website. In my opinion, it is the best code editor currently available. Gridsome, my static site generator, relies on [NodeJS](https://nodejs.org) and [Yarn](https://yarnpkg.org), so I used both these tools. For hosting, I use [**Firebase**](https://firebase.google.com) Hosting. I chose it over other hosting providers because it gave me the most freedom in configuring my website and the most value for a free plan.

Instead of manually rebuilding and deploying the website every time I change something, a Github action takes care of the redeployment. When I push a commit to my main branch, Github actions rebuilds the website and deploys it to firebase.

## TL;DR

NodeJS, Gridsome, VueJS, Pug, Sass, Markdown, Unified, Firebase. You can find the source code of the website over on [Github](https://github.com/vypxl/website)

## Thoughts

I am satisfied with my website. As I said, it was always something I wanted to have at some point in my career as a programmer. Now that I finally released it, many more ideas come to my mind on how to extend it.
I want to do an RSS feed, a `/uses` page, host my old projects here, and much more. When I find the time, I might implement all those things, but maybe I won't. It was a fun journey learning new tech and developing good practices while creating this website. 10/10 would recommend.

If you have questions regarding my website or anything really, just ask me via my email.

Thank you for reading :relaxed:
