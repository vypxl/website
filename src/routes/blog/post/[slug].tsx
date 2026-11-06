import { createMemo, Show } from 'solid-js'
import { useParams } from '@solidjs/router'
import { useHead } from '@solidjs/web'
import { getAllPosts } from '../../../lib/server/content'
import { PostPage } from '../../../lib/components/blog/Blog'
import NotFound from '../../[...404]'

export const route = { preload: () => getAllPosts() }

export default function BlogPost() {
  const params = useParams()
  const posts = createMemo(() => getAllPosts())
  const post = () => posts().find(post => post.meta.slug === params.slug)
  useHead(() => ({
    tag: 'title',
    props: { children: post() ? `${post()!.meta.title} - vypxl blog` : 'Not Found (404)' },
  }))
  return (
    <Show when={post()} fallback={<NotFound />} keyed>
      {post => <PostPage post={post} />}
    </Show>
  )
}
