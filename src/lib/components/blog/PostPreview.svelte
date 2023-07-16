<script lang="ts">
  import LinkedBox from '$lib/components/LinkedBox.svelte'
  import TagBox from '$lib/components/blog/TagBox.svelte'
  import PostMeta from '$lib/components/blog/PostMeta.svelte'
  import type { Post } from '$lib/types'

  export let post: Post
</script>

<LinkedBox to={'/blog/post/' + post.slug}>
  <div slot="header">
    <h1 class="headline">{post.title}</h1>
    <PostMeta {post} />
  </div>
  <p class="desc">{@html post.description}</p>
  <div slot="footer">
    <TagBox tags={post.tags} />
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
