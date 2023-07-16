import { json } from '@sveltejs/kit'
import type { SvelteComponent } from 'svelte'
import type { Post } from '$lib/types'

async function getAllPosts() {
  const paths = import.meta.glob('/content/posts/*.md', { eager: true }) as Record<string, SvelteComponent>

  const extractSlug = (path: string): string | undefined => path.split('/').at(-1)?.replace('.md', '')
  const isValid = (file: SvelteComponent): boolean => 'metadata' in file
  const makePost = (slug: string, file: SvelteComponent): Post =>
    ({ ...file.metadata, published: new Date(file.metadata.published), slug } satisfies Post)
  const comparePublishDate = (first: Post, second: Post): number =>
    second.published.getTime() - first.published.getTime()

  const posts: Post[] = Object.entries(paths)
    .map(([path, file]): [string | undefined, SvelteComponent] => [extractSlug(path), file])
    .filter(([slug, file]) => slug && isValid(file))
    .map(([slug, file]) => makePost(slug!, file))
    .sort((a, b) => comparePublishDate(a, b))

  return posts
}

export async function GET() {
  const posts = await getAllPosts()
  return json(posts)
}
