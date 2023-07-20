import type { PageServerLoad } from './$types'
import { getAllPosts } from '$lib/server/content'

export const load = (async ({ params }) => {
  let posts = await getAllPosts()
  posts = posts.filter(post => post.meta.tags.includes(params.slug))

  return { posts, tag: params.slug }
}) satisfies PageServerLoad
