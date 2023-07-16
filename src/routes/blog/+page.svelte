<script lang="ts">
  import PostListing from '$lib/components/blog/PostListing.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1 class="title">Blog</h1>
<!-- <div class="info"> -->
<!--   <a href="/blog/series" class="button">Series</a> -->
<!--   <a href="/blog/tags" class="button">Tags</a> -->
<!-- </div> -->
<h1 class="headline-underline">All Posts:</h1>
<PostListing posts={data.posts} />

<style lang="scss">
  .title {
    text-align: center;
  }

  /*
  .info {
    width: 70%;
    margin: auto;
    display: flex;
    justify-content: space-around;

    & > * {
      width: 30%;
      text-align: center;
    }
  }
  */

  .headline-underline {
    margin-top: 2.5em;
    text-align: center;
  }
</style>
