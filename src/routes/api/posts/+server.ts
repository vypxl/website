import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'
import { renderPost } from '$lib/markdown'

async function getAllPosts() {
  const paths = import.meta.glob('/content/posts/*.md', { as: 'raw', eager: true }) as Record<string, string>

  const comparePublishDate = (first: Post, second: Post): number =>
    new Date(second.meta.published).getTime() - new Date(first.meta.published).getTime()

  const posts = await Promise.all(Object.values(paths).map(renderPost))
  posts.sort(comparePublishDate)

  return posts
}

export async function GET() {
  const posts = await getAllPosts()
  return json(posts)
}
