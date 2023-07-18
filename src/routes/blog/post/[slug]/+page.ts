import type { PageLoad } from './$types'
import { getPostBySlug } from '$lib/content'
import { error } from '@sveltejs/kit'

export const load = (async ({ params }) => {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    console.error(`No post with slug "${params.slug}" found.`)
    throw error(404, `No post with slug "${params.slug}" found.`)
  }

  return { post }
}) satisfies PageLoad
