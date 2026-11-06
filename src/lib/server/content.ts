import { query } from '@solidjs/router'
import { prerendered } from '@solidjs/prerender'
import { renderPost } from './markdown'

export const getAllPosts = query(
  prerendered(async () => {
    'use server'
    const paths = import.meta.glob('/content/posts/*.md', {
      query: '?raw',
      import: 'default',
      eager: true,
    }) as Record<string, string>
    const posts = await Promise.all(Object.values(paths).map(renderPost))
    return posts.sort((a, b) => new Date(b.meta.published).getTime() - new Date(a.meta.published).getTime())
  }),
  'posts'
)
