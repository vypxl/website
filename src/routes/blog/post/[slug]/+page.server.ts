import type { PageServerLoad } from './$types'
import { getPostBySlug } from '$lib/server/content'
import { error } from '@sveltejs/kit'

export const load = (async ({ params }) => {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    console.error(`No post with slug "${params.slug}" found.`)
    throw error(404, `No post with slug "${params.slug}" found.`)
  }

  return { post }
}) satisfies PageServerLoad
