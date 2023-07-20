<script lang="ts">
  import PostListing from '$lib/components/blog/PostListing.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  const { posts, tag } = data
</script>

<h1 class="title">Posts tagged <code>{tag}</code></h1>
<PostListing {posts} />

<svelte:head>
  <title>Blog: Tag {tag}- vypxl</title>
</svelte:head>

<style lang="scss">
  .title {
    text-align: center;
  }
</style>
