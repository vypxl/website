import { createMemo } from 'solid-js'
import { useHead } from '@solidjs/web'
import { getAllPosts } from '../../lib/server/content'
import { PostListing } from '../../lib/components/blog/Blog'

export const route = { preload: () => getAllPosts() }

export default function BlogIndex() {
  const posts = createMemo(() => getAllPosts())
  useHead({ tag: 'title', props: { children: 'Blog - vypxl' } })
  return <PostListing posts={posts()} />
}
