import type { PageLoad } from './$types'
import { loadPost } from '$lib/content'

export const load = (async ({ params }) => {
  const post = await loadPost(params.slug)

  return { post }
}) satisfies PageLoad
