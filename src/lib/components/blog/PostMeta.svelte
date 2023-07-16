<script lang="ts">
  import type { Post } from '$lib/types'

  export let post: Post

  let published = new Date(post.published).toDateString()
  let readTime = 0

  import(/* @vite-ignore */ '/content/posts/' + post.slug + '.md?raw').then(
    content => (readTime = Math.ceil(content.default.replace(/[^\w ]/g, '').split(' ').length / 200))
  )
</script>

<div class="meta">
  <span class="date">Published {published}</span>
  <span class="read-time">~{readTime} min read</span>
</div>

<style lang="scss">
  .meta {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    font-weight: 200;

    & > * {
      margin-right: 1em;
    }
  }
</style>
