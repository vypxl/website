const { keyBy } = require('lodash')
const markdownRenderer = new (require('./renderMarkdown.js'))()
const sanity = require('@sanity/client')({
    projectId: 'dfjtbic3',
    dataset: 'production',
    token: process.env.sanityToken,
    useCdn: false,
})

const schema = `
type Blogpost implements Node {
  content: String
  description: String
  publishedAt(
    format: String
    locale: String
  ): Date
  series: Blogpost_Series
  slug: String
  tags: [Blogpost_Tags]
  title: String
  readTime: Int
  tags_ref(
    sortBy: String
    order: SortOrder = DESC
    skip: Int = 0
    sort: [SortArgument]
    limit: Int
  ): [Tag]
  series_ref: Series
}

type Blogpost_Series {
  name: String
  slug: String
  next: String
  prev: String
}

type Blogpost_Tags {
  color: String
  name: String
  slug: String
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

const ref = (objs, which) =>
    objs.map(obj => {
        if (obj[which]) obj[which + '_ref'] = obj[which].slug
    })

const refs = (objs, which) =>
    objs.map(obj => (obj[which + '_ref'] = obj[which].map(x => x.slug)))

async function getTags() {
    const query = `*[_type == "tag" && !(_id in path('drafts.**'))] { 
    "slug": slug.current,
    name,
    description,
    color,
    "posts": *[_type == "post" && references(^._id)].slug.current
}`
    const tags = await sanity.fetch(query)

    md2html(tags, 'description')
    console.log('fetched tags')

    return {
        typeName: 'Tag',
        documents: tags,
    }
}

async function getSeries() {
    const query = `*[_type == "series" && !(_id in path('drafts.**'))]
{ 
    "slug": slug.current, 
    name, 
    description,
    "parts": parts[]->slug.current 
}`
    const series = await sanity.fetch(query)

    md2html(series, 'description')

    console.log('fetched series')

    return {
        typeName: 'Series',
        documents: series,
    }
}

async function getPosts() {
    const query = `*[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt asc) 
{ 
    title, 
    "slug": slug.current, 
    "series": *[_type == "series" && references(^._id)][0] { name, "slug": slug.current },
	tags[]->{name, "slug": slug.current, color},
    publishedAt,
    content,
    description
}`
    const posts = (await sanity.fetch(query)).filter(
        post => new Date(post.publishedAt) < new Date()
    )

    estimateReadingTime(posts, 'content', 'readTime')
    md2html(posts, 'content')
    md2html(posts, 'description')
    refs(posts, 'tags')
    ref(posts, 'series')

    console.log('fetched posts')

    return {
        typeName: 'Blogpost',
        documents: posts,
        collectionOptions: { dateField: 'publishedAt' },
    }
}

const all = [getTags, getSeries, getPosts]

function linkPostToSeries(data) {
    for (s of data.Series.documents) {
        for (const [i, part] of s.parts.entries()) {
            const post = data.Blogpost.documents.find(
                post => post.slug === part
            )
            post.series.prev = s.parts[i - 1] || null
            post.series.next = s.parts[i + 1] || null
        }
    }
}

async function getData() {
    const _data = await Promise.all(all.map(x => x()))
    const data = keyBy(_data, 'typeName')

    linkPostToSeries(data)

    return Object.values(data)
}

function createReferences(actions) {
    const [posts, tags, series] = ['Blogpost', 'Tag', 'Series'].map(t =>
        actions.getCollection(t)
    )

    posts.addReference('tags_ref', 'Tag')
    posts.addReference('series_ref', 'Series')
    tags.addReference('posts', 'Blogpost')
    series.addReference('parts', 'Blogpost')
}

module.exports = api => {
    api.loadSource(async actions => {

        actions.addSchemaTypes(schema)

        console.log(`Fetching data from Sanity...`)
        const data = await getData()

        for (type of data) {
            const { typeName, documents, idField, collectionOptions } = type
            const collection = actions.addCollection({
                typeName,
                ...collectionOptions,
            })

            documents.forEach(doc => {
                collection.addNode({
                    id: doc[idField || 'slug'],
                    ...doc,
                })
            })
        }

        createReferences(actions)
    })
}
