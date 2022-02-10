import { unified } from 'unified'

import parse_markdown from 'remark-parse'
import slug from 'remark-slug'
import directive from 'remark-directive'
import emoji from 'remark-emoji'
import fixGuill from 'remark-fix-guillemets'
import extLinks from 'remark-external-links'
import sectionize from 'remark-sectionize'

import md2rehype from 'remark-rehype'

import raw from 'rehype-raw'
import linkHeadings from 'rehype-autolink-headings'
import format from 'rehype-format'
import katex from 'rehype-katex'
import prism from '@mapbox/rehype-prism'

import toHTML from 'rehype-stringify'

class MarkdownRenderer {
    constructor() {
        this.processor = this.createProcessor()
    }

    createProcessor() {
        return unified()
            .use(parse_markdown)
            .use(directive)
            .use(fixGuill)
            .use(extLinks)
            .use(slug)
            .use(emoji, { padSpaceAfter: true })
            .use(sectionize)
            .use(md2rehype)
            .use(raw)
            .use(linkHeadings)
            .use(format)
            .use(katex)
            .use(prism)
            .use(toHTML)
    }

    render(str) {
        let rendered = this.processor.processSync(str).toString()
        console.log(`rendering ${str} to ${rendered}`)
        return rendered
        // return this.processor.processSync(str).contents
    }
}

export default MarkdownRenderer
