import adapter from '@sveltejs/adapter-auto'
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexConfig = {
  extensions: ['.md'],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [sveltePreprocess(), mdsvex(mdsvexConfig)],

  kit: {
    adapter: adapter(),
  },

  alias: {
    $content: 'src/content',
  },
}

export default config
