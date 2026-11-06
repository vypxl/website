import { createMemo } from 'solid-js'
import { useParams } from '@solidjs/router'
import { useHead } from '@solidjs/web'
import { getAllPosts } from '../../../lib/server/content'
import { PostPage } from '../../../lib/components/blog/Blog.tsrx'
import NotFound from '../../[...404].tsrx'

export const route = { preload: () => getAllPosts() }

export default function BlogPost() @{
  const params = useParams()
  const posts = createMemo(() => getAllPosts())
  const post = () => posts().find(post => post.meta.slug === params.slug)
  useHead(() => ({
    tag: 'title',
    props: { children: post() ? `${post()!.meta.title} - vypxl blog` : 'Not Found (404)' },
  }))
  @if (post()) {
    <PostPage post={post()!} />
  } @else {
    <NotFound />
  }
}
