<script lang="ts">
  import TagBox from '$lib/components/blog/TagBox.svelte'
  import PostInfo from '$lib/components/blog/PostInfo.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  let { content, meta } = data.post
</script>

<svelte:head>
  <title>{meta.title} - vypxl blog</title>
</svelte:head>

<div class="header">
  <h1 class="title">{meta.title}</h1>
  <PostInfo {meta} />
  <div class="tagbox">
    <TagBox tags={meta.tags} />
  </div>
</div>
<div class="box">
  <article class="content blogpost">
    {@html content}
  </article>
</div>

<style lang="scss">
  .content {
    text-align: justify;
  }

  .header {
    width: 80%;
    margin: auto;
  }

  .title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .tagbox {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
    margin-top: 1em;
  }

  .box {
    margin-bottom: 2.5em;
  }
</style>
