<script lang="ts">
  import type { PostMeta } from '$lib/types'

  export let meta: PostMeta

  let published = new Date(meta.published).toDateString()
</script>

<div class="meta">
  <span class="date">Published {published}</span>
  <span class="read-time">~{meta.readingTime} min read</span>
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
