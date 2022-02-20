import fs from 'fs/promises'
import path from 'path'

// For loading json files
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import frontmatter from 'front-matter'
import { keyBy } from 'lodash-es'
import yaml from 'js-yaml'
import { validate } from 'jsonschema'

import MarkdownRenderer from './renderMarkdown.mjs'
const markdownRenderer = new MarkdownRenderer()

export const schema = `
type Blogpost implements Node {
  content: String
  description: String
  published(
    format: String
    locale: String
  ): Date
  series: Series
  series_links: SeriesLinks
  slug: String
  title: String
  readTime: Int
  tags(
    sortBy: String
    order: SortOrder = DESC
    skip: Int = 0
    sort: [SortArgument]
    limit: Int
  ): [Tag]
}

type SeriesLinks {
  next: String
  prev: String
}

type Series implements Node {
  description: String
  name: String
  parts(
    sortBy: String
    order: SortOrder = DESC
    skip: Int = 0
    sort: [SortArgument]
    limit: Int
  ): [Blogpost]
  slug: String
}

type Tag implements Node {
  color: String
  description: String
  name: String
  posts(
    sortBy: String
    order: SortOrder = DESC
    skip: Int = 0
    sort: [SortArgument]
    limit: Int
  ): [Blogpost]
  slug: String
}
`

// renders field `which` of every object in `objs` with the `markdownRenderer`
const md2html = (objs, which) =>
    objs.map(obj => (obj[which] = markdownRenderer.render(obj[which])))

const estimateReadingTime = (objs, src, dest) =>
    objs.map(
        obj =>
            (obj[dest] = Math.ceil(
                obj[src].replace(/[^\w\ ]/g, '').split(' ').length / 200
            ))
    )

async function load_content_files(kind, filter=/.*/) {
  const files = await fs.readdir(path.resolve('./content/' + kind))
  return Promise.all(files
    .filter(f => filter.test(f))
    .map(f => fs.readFile(path.resolve(`./content/${kind}/${f}`), 'utf8'))
  )
}

// validates an array of objects against the given schema and throws errors on failure
function validate_meta(kind, data, schema) {
  for (let x of data) {
    let res = validate(x, schema, { allowUnknownAttributes: false, required: true })
    if (!res.valid) {
      console.error(`Error while trying to load ${kind} '${x.slug || x}'`)
      for (let e of res.errors) console.error(e.message)
      process.exit(1)
    }
  }
}

async function getTags() {
    const tags = (await load_content_files("tags", /[a-z\-]\.yaml/))
      .map(yaml.load)

    validate_meta("tag", tags, require('../src/assets/tag.schema.json'))

    md2html(tags, 'description')
    console.log('Loaded tags')

    return {
        typeName: 'Tag',
        documents: tags,
    }
}

async function getSeries() {
    const series = (await load_content_files("series", /[a-z\-]\.yaml/))
        .map(yaml.load)

    validate_meta("series", series, require('../src/assets/series.schema.json'))

    md2html(series, 'description')

    console.log('Loaded series')

    return {
        typeName: 'Series',
        documents: series,
    }
}

async function getPosts() {
    const raw_posts = (await load_content_files("posts", /[a-z\-]+\.md/))
        .map(f => frontmatter(f))

    validate_meta("blogpost", raw_posts.map(p => p.attributes), require('../src/assets/post.schema.json'))

    const posts = raw_posts
        .map(({ body, attributes }) => ({ content: body, ...attributes }))

    estimateReadingTime(posts, 'content', 'readTime')
    md2html(posts, 'content')
    md2html(posts, 'description')

    console.log('Loaded posts')

    return {
        typeName: 'Blogpost',
        documents: posts,
        collectionOptions: { dateField: 'published' },
    }
}

async function getData() {
    const _data = await Promise.all([getTags(), getSeries(), getPosts()])
    const data = keyBy(_data, 'typeName')

    // Link posts to series
    for (let s of data.Series.documents) {
        for (let [i, part] of s.parts.entries()) {
            let post = data.Blogpost.documents.find(
                post => post.slug === part
            )
            if (!post) throw new Error(`Invalid post slug in series ${s.name}: '${part}'`)
            post.series = s.slug
            post.series_links = {
              prev: s.parts[i - 1] || null,
              next: s.parts[i + 1] || null,
            }
        }
    }

    return Object.values(data)
}

function createReferences(actions) {
    const [posts, tags, series] = ['Blogpost', 'Tag', 'Series'].map(t =>
        actions.getCollection(t)
    )

    posts.addReference('tags', 'Tag')
    posts.addReference('series', 'Series')
    tags.addReference('posts', 'Blogpost')
    series.addReference('parts', 'Blogpost')
}

export const source = async actions => {
    actions.addSchemaTypes(schema)

    console.log(`Loading data...`)
    const data = await getData()

    for (let type of data) {
        const { typeName, documents, collectionOptions } = type
        const collection = actions.addCollection({
            typeName,
            ...collectionOptions,
        })

        documents.forEach(doc => {
            collection.addNode({
                id: doc.slug,
                ...doc,
            })
        })
    }

    createReferences(actions)
}
