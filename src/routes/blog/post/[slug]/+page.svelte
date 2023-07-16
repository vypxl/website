<script lang="ts">
    import TagBox from '$lib/components/blog/TagBox.svelte'
    import PostMeta from '$lib/components/blog/PostMeta.svelte'
    import type { PageData } from './$types'

    export let data: PageData
    let Content = data.content
</script>

<svelte:head>
    <title>{data.meta.title} - vypxl blog</title>
</svelte:head>

<div class="header">
    <h1 class="title">{data.meta.title}</h1>
    <PostMeta post={data.meta} />
    <div class="tagbox">
        <TagBox tags={data.meta.tags} />
    </div>
</div>
<div class="box">
    <article class="content blogpost">
        <Content />
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
