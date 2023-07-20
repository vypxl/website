<script lang="ts">
  import PostListing from '$lib/components/blog/PostListing.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  const { posts } = data
</script>

<h1 class="title">Blog</h1>
<h1 class="headline-underline">All Posts:</h1>
<PostListing {posts} />

<svelte:head>
  <title>Blog - vypxl</title>
</svelte:head>

<style lang="scss">
  .title {
    text-align: center;
  }

  .headline-underline {
    margin-top: 2.5em;
    text-align: center;
  }
</style>
