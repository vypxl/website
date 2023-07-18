import { renderPost } from '$lib/markdown'
import type { Post } from '$lib/types'

const paths = import.meta.glob('/content/posts/*.md', { as: 'raw', eager: true }) as Record<string, string>

export const posts = await Promise.all(Object.values(paths).map(renderPost)).then(xs =>
  xs.sort((a, b) => new Date(b.meta.published).getTime() - new Date(a.meta.published).getTime())
)

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find(post => post.meta.slug === slug)
}
