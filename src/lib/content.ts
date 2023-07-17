import { renderPost } from '$lib/markdown'
import type { Post } from '$lib/types'

export async function loadPost(slug: string): Promise<Post> {
  const content = await import(/* @vite-ignore */ `/content/posts/${slug}.md?raw`)
  return renderPost(content.default)
}
