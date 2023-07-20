<script lang="ts">
  import LinkedBox from '$lib/components/LinkedBox.svelte'
  import TagBox from '$lib/components/blog/TagBox.svelte'
  import PostInfo from '$lib/components/blog/PostInfo.svelte'
  import type { PostMeta } from '$lib/types'

  export let meta: PostMeta
</script>

<LinkedBox to={'/blog/post/' + meta.slug}>
  <div slot="header">
    <h1 class="headline">{meta.title}</h1>
    <PostInfo {meta} />
  </div>
  <p class="desc">{@html meta.description}</p>
  <div slot="footer">
    <TagBox tags={meta.tags} />
  </div>
</LinkedBox>

<style lang="scss">
  .desc {
    margin-top: 0.5em;
  }

  /*
  .link-series {
    color: #eee;
    background: #292f3d;
  }

  .lift {
    z-index: 1;
  }
  */
</style>
