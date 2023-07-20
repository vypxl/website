---
tags: ['webdev']
published: 2023-07-20
description: This article covers the technologies used to build this website and blog, and my journey building it.
---

# About my Website

Hey! Welcome and thank you for visiting my personal website. In this first blogpost of mine, I want to talk about all the things that went into developing it.

> **Note**
> This is an old article I wrote back in 2022, but I updated it to reflect the current state of the website.

What you see is actually my fifth(!!) attempt on creating a website and blog for myself, the first three attempts remained unfinished, this version is a remake of the fourth one. Also, I won't talk about the _amazing_ programming practices I used when building the first three versions. But now I can proudly say that I have a personal website, one thing I always wanted to have since I started programming. Now then, how did I accomplish what you can see here?

## Tech Stack

This website is built on top of a so-called JAMstack.
JAM stands for **J**avascript, **A**PIs and **M**arkup. JAMstack websites are static, generated pages that are hosted on a static website hosting service.
I'm using the Framework [**SvelteKit**](https://kit.svelte.dev) for building apps with the UI library [**Svelte**](https://svelte.dev), the (according to StackOverflow developer surveys) most loved Javascript Framework.
For the API part, I'm using local markdown files that are loaded by my own logic and turned into routes.
The markup part has two sides. First, there is the obvious HTML Markup. The second part is what I write my blogposts in. This would be **Markdown**. I use markdown because it is easy to write in and easy to convert into beautiful HTML. In addition to that, the custom Markdown renderer I made with the library [Unified](https://unifiedjs.com) enables fancy features like

```js
rendering('Code').snippets
```

or automatically linking headings.
For writing styles, I use **Sass** or, more specifically, SCSS. It allows for some niceties when writing styles I don't want to miss by relying on standard CSS.

Everything is then rendered to static files.

## Development and Deployment

I used Neovim for developing my website. Yes I like my customization. For hosting, I use [**Cloudflare Pages**](https://pages.cloudflare.com/). I chose it over other hosting providers because it is easy to setup, and I had my domain managed by cloudflare anyways. They also allow for easy to setup analytics without user tracking or the need for cookies! They also automatically build my site when I push a commit to GitHub, and even give me preview deployments for pullrequests.

## TL;DR

NodeJS, SvelteKit, Svelte, Sass, Markdown, Unified, Cloudflare Pages. You can find the source code of the website over on [Github](https://github.com/vypxl/website)

## Thoughts

I am satisfied with my website. As I said, it was always something I wanted to have at some point in my career as a programmer. Now that I finally released it, many more ideas come to my mind on how to extend it.
I want to do an RSS feed, a `/uses` page, host my old projects here, and much more. When I find the time, I might implement all those things, but maybe I won't. It was a fun journey learning new tech and developing good practices while creating this website. 10/10 would recommend.

If you have questions regarding my website or anything really, just ask me via my email.

Thank you for reading :relaxed:
