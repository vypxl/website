import { unified, type Transformer } from 'unified'

import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'

import remarkDirective from 'remark-directive'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkGithub from 'remark-github'
import remarkGithubBetaBlockquoteAdmonitions from 'remark-github-beta-blockquote-admonitions'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

import md2rehype from 'remark-rehype'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeMathjax from 'rehype-mathjax'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import rehypeSectionize from '@hbsnow/rehype-sectionize'
import rehypeSlug from 'rehype-slug'

import rehypeStringify from 'rehype-stringify'

import type { Root, Text, Code, InlineCode, Heading } from 'mdast'
import type { Element } from 'hast'
import type { TextDirective } from 'mdast-util-directive'
import yaml from 'yaml'
import { visit } from 'unist-util-visit'
import slugify from 'slugify'

import type { Post, PostMeta } from '$lib/types'

// Extracts the first level 1 heading from the tree and adds it as a `title` property to the file's metadata
function extractTitlePlugin(): Transformer<Root, Root> {
  return (tree, file) => {
    const heading = tree.children.find(node => node.type === 'heading' && node.depth === 1) as Heading | undefined
    if (!heading || heading.children.length !== 1 || heading.children[0].type !== 'text') return
    const title = (heading.children[0] as Text).value
    file.data.title = title
    file.data.slug = slugify(title, { lower: true })
  }
}

// Adds a `readingTime` property to the file's metadata
function readingTimePlugin(): Transformer<Root, Root> {
  return (tree, file) => {
    let text = ''
    visit(tree, ['text', 'code', 'inlineCode'], node => {
      text += (node as Text | Code | InlineCode).value + ' '
    })
    file.data.readingTime = Math.ceil(text.split(/\s+/).length / 200)
  }
}

// Allows for a directive like `:abbr[short]{value="long"}` to be turned into an abbr element
function abbrPlugin(): Transformer<Root, Root> {
  interface AbbrDirective extends TextDirective {
    data: {
      hName?: string
      hProperties?: { title: string }
    }
  }

  return (tree, file) => {
    // Transform abbr directives into abbr elements
    visit(tree, ['textDirective'], _node => {
      const node = _node as unknown as AbbrDirective
      if (node.name !== 'abbr') return

      if (!node.children || node.children.length !== 1 || node.children[0].type !== 'text')
        file.fail('Abbr directive must have exactly one text child.' + JSON.stringify(node))

      if (!node.attributes || !('value' in node.attributes))
        file.fail('Abbr directive must have a `value` attribute.' + JSON.stringify(node))

      const title = node.attributes!.value!

      const data = node.data || (node.data = {})
      data.hName = 'abbr'
      data.hProperties = { title }
    })
  }
}

// Adds a button to copy code blocks
function insertCopyCodeButtonPlugin(): Transformer<Root, Root> {
  const makeButton = (): Element => ({
    type: 'element',
    tagName: 'button',
    properties: {
      'data-copy-code-button': '',
      onclick: 'navigator.clipboard.writeText(this.parentElement.querySelector("code").textContent)',
    },
    children: [],
  })

  return tree => {
    visit(tree, ['element'], _node => {
      const node = _node as unknown as Element
      if (!node.properties || !('data-rehype-pretty-code-fragment' in node.properties)) return
      const pre = node.children.find(child => (child as Element).tagName === 'pre') as Element

      // prepend a button to the children list
      pre.children.unshift(makeButton())
    })
  }
}

// Expands code block language short names
function expandCodeBlockLanguagePlugin(): Transformer<Root, Root> {
  const transform = (lang: string): string => {
    const mappings: Record<string, string> = {
      ts: 'typescript',
      js: 'javascript',
      py: 'python',
      sh: 'bash',
      md: 'markdown',
      yml: 'YAML',
      yaml: 'YAML',
      json: 'JSON',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      toml: 'TOML',
      cpp: 'C++',
      cs: 'C#',
      asm: 'assembly',
    }
    return mappings[lang] || lang
  }

  return tree => {
    visit(tree, ['element'], _node => {
      const node = _node as unknown as Element
      if (!node.properties || !('data-language' in node.properties)) return
      node.properties['data-language'] = transform(node.properties['data-language'] as string)
    })
  }
}

const processor = unified()
  // Remark plugins
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkExtractFrontmatter, { yaml: yaml.parse })
  .use(extractTitlePlugin)

  .use(remarkDirective)
  .use(abbrPlugin)
  .use(remarkEmoji, { accessible: true, padSpaceAfter: true })
  .use(remarkGfm)
  .use(remarkGithub, { repository: 'vypxl/website' })
  .use(remarkGithubBetaBlockquoteAdmonitions)
  .use(remarkMath)
  .use(readingTimePlugin)
  .use(remarkToc, { maxDepth: 2 })

  // Rehype plugins
  .use(md2rehype, { allowDangerousHtml: true })
  .use(rehypeExternalLinks, { rel: ['nofollow'] })
  .use(rehypeMathjax)
  .use(rehypePrettyCode, { theme: 'dracula' })
  .use(insertCopyCodeButtonPlugin)
  .use(expandCodeBlockLanguagePlugin)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: 'prepend', properties: { class: 'heading-link' } }) // after slug!
  .use(rehypeSectionize) // after slug!
  .use(rehypeRaw) // last one!
  .use(rehypeStringify)

function validatePostMeta(meta: PostMeta): boolean {
  const requiredKeys: (keyof PostMeta)[] = ['slug', 'title', 'description', 'tags', 'published', 'readingTime']
  return requiredKeys.every(key => key in meta)
}

export async function renderPost(markdown: string): Promise<Post> {
  const rendered = await processor.process(markdown)
  const meta = rendered.data as unknown as PostMeta
  if (!validatePostMeta(meta)) throw new Error('Post meta incomplete! ' + JSON.stringify(meta))
  return { content: rendered.toString(), meta }
}
