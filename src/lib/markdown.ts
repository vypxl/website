import { unified, type Transformer } from 'unified'

import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'

import remarkCodeTitle from 'remark-code-title'
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
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import rehypeSectionize from '@hbsnow/rehype-sectionize'
import rehypeSlug from 'rehype-slug'

import rehypeStringify from 'rehype-stringify'

import type { Root, Text, Code, InlineCode } from 'mdast'
import type { TextDirective } from 'mdast-util-directive'
import yaml from 'yaml'
import { visit } from 'unist-util-visit'

import type { Post, PostMeta } from './types'

function readingTimePlugin(): Transformer<Root, Root> {
  return (tree, file) => {
    let text = ''
    visit(tree, ['text', 'code', 'inlineCode'], node => {
      text += (node as Text | Code | InlineCode).value + ' '
    })
    file.data.readingTime = Math.ceil(text.split(/\s+/).length / 200)
  }
}

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

const processor = unified()
  // Remark plugins
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkExtractFrontmatter, { yaml: yaml.parse })

  .use(remarkCodeTitle)
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
  .use(rehypeRaw)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(rehypeExternalLinks, { rel: ['nofollow'] })
  .use(rehypeKatex)
  .use(rehypePrism)
  .use(rehypeSlug)
  .use(rehypeSectionize) // after slug!
  .use(rehypeStringify)

export async function renderPost(markdown: string): Promise<Post> {
  const rendered = await processor.process(markdown)
  // TODO validate meta
  const meta = rendered.data as unknown as PostMeta
  return { content: rendered.toString(), meta }
}
