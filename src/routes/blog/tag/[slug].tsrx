import { createMemo } from 'solid-js'
import { useParams } from '@solidjs/router'
import { useHead } from '@solidjs/web'
import { getAllPosts } from '../../../lib/server/content'
import { PostListing } from '../../../lib/components/blog/Blog.tsrx'

export const route = { preload: () => getAllPosts() }

export default function BlogTag() @{
  const params = useParams()
  const posts = createMemo(() => getAllPosts())
  useHead(() => ({ tag: 'title', props: { children: `Blog: Tag ${params.slug}- vypxl` } }))
  <PostListing posts={posts().filter(post => post.meta.tags.includes(params.slug!))} tag={params.slug} />
}
