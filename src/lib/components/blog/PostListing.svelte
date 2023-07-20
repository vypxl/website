<script lang="ts">
  import PostPreview from '$lib/components/blog/PostPreview.svelte'
  import type { Post } from '$lib/types'

  export let posts: Post[]
</script>

<div class="container">
  <ul>
    {#each posts as post}
      <li>
        <PostPreview meta={post.meta} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .container {
    margin-top: 3em;
    margin-bottom: 3em;
  }

  li {
    margin-bottom: 1em;
  }
</style>
