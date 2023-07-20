---
title: What my Markdown can do
slug: what-my-markdown-can-do
tags: ['webdev']
published: 2023-07-20
description: In this article I showcase the various features my rendering pipeline for markdown can do.
---

# What my Markdown can do

I installed several [Remark](https://github.com/remarkjs/remark) and [Rehype](https://github.com/rehypejs/rehype) plugins, here I document which features
they and my own plugins provide to my blog.

## Table of contents

## Frontmatter

- [Plugin Link frontmatter](https://github.com/remarkjs/remark-frontmatter)
- [Plugin Link extract-frontmatter](https://github.com/mrzmmr/remark-extract-frontmatter)

Allows for defining frontmatter in my markdown files like this:

```md
---
meta: This is frontmatter data
what: Later accessible as an object
---

> Text...
```

## Directives

- [Plugin Link](https://github.com/remarkjs/remark-directive)

Allows to create custom directives to easily create custom items and blocks with my own code.
Currently, I implement:

- **Abbreviations**

:abbr[YAML]{value="YAML Ain't Markup Language"} has a tooltip!

```md
:abbr[YAML]: YAML Ain't Markup Language
```

## Emoji

- [Plugin Link](https://github.com/rhysd/remark-emoji)

Allows for emoji text codes to be replaced with actual emoji (`:thumbsup:` => :thumbsup:).

## GitHub Flavored Markdown (GFM)

- [Plugin Link](https://github.com/remarkjs/remark-gfm)

Allows me to use GitHub Flavored Markdown, enabling features like strikethrough, tables, tasklists, and more.

An example table in GFM:

| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

```md
| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Github links

- [Plugin Link](https://github.com/remarkjs/remark-github)

Allows to easily link to GitHub stuff, for example me (@vypxl), or an issue (vypxl/tx8#1).

```md
@vypxl fixed this in #42
```

## Blockquote Admonitions

- [Plugin Link](https://github.com/myl7/remark-github-beta-blockquote-admonitions)

Allows to create custom blocks via blockquote admonitions, for example info or warning blocks.

> **Warning**
> This is a warning

> **Note**
> This is a note

```md
> **Warning**
> This is a warning

> **Note**
> This is a note
```

## LaTeX Math

- [Plugin Link](https://github.com/remarkjs/remark-math)

Allows math formula rendering.

Inline math: $e=mc^2$

Block math:

$$
f(x) = \frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}x^2}
$$

```md
Inline math: $e=mc^2$

Block math:

$$
f(x) = \frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}x^2}
$$
```

## Reading Time

I wrote this plugin myself.

This plugin estimates the time it takes to read an article. Uses dead simple word counting. Reading time is $\lceil{wordcount / 200}\rceil$.

## Table of Contents (TOC)

- [Plugin Link](https://github.com/remarkjs/remark-toc)

Automatically generates a TOC, when a level 2 heading `## Table of contents` is present as the first subheading.

## Autolinking Headings

- [Plugin Link](https://github.com/rehypejs/rehype-autolink-headings)

This plugin automatically adds links to headings. See the little link icons that appear when you hover over a heading?
Try clicking on one!

## Code Highlighting

- [Plugin Link](https://rehype-pretty-code.netlify.app/)

Uses [shiki](https://github.com/shikijs/shiki) for highlighting code blocks.
Also supports features like linenumbers, titles, captions and highlighting specific lines or words.

I added some more functionality, like showing the language of the code block, and a 'copy code' button.

```rust showLineNumbers {2} /{}/ title="Title for rust code example" caption="This is a demonstration of a caption."
fn helloWorld() {
  println!("Hello, world!")

  println!("Code {} are cool!", "blocks");
}
```

````md
```rust showLineNumbers {2} /{}/ title="Title for rust code example" caption="This is a demonstration of a caption."
fn helloWorld() {
  println!("Hello, world!")

  println!("Code {} are cool!", "blocks");
}
```
````
