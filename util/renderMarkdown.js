const unified = require('unified')

const parse_markdown = require('remark-parse')
const slug = require('remark-slug')
const abbr = require('remark-abbr')
const attr = require('remark-attr')
const containers = require('remark-containers')
const emoji = require('remark-emoji')
const fixGuill = require('remark-fix-guillemets')
const extLinks = require('remark-external-links')
const kbd = require('remark-kbd')
const sectionize = require('remark-sectionize')

const md2rehype = require('remark-rehype')

const raw = require('rehype-raw')
const linkHeadings = require('rehype-autolink-headings')
const format = require('rehype-format')
const katex = require('rehype-katex')
const prism = require('rehype-prism')

const toHTML = require('rehype-stringify')

class MarkdownRenderer {
    constructor() {
        this.processor = this.createProcessor()
    }

    createProcessor() {
        return unified()
            .use(parse_markdown)
            .use(containers)
            .use(fixGuill)
            .use(extLinks)
            .use(slug)
            .use(abbr, { expandFirst: true })
            .use(attr)
            .use(emoji, { padSpaceAfter: true })
            .use(kbd)
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
        return this.processor.processSync(str).contents
    }
}

module.exports = MarkdownRenderer
