import type { PageServerLoad } from './$types'
import { getAllPosts } from '$lib/server/content'

export const load = (async () => {
  const posts = await getAllPosts()

  return { posts }
}) satisfies PageServerLoad
