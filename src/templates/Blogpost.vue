<template lang="pug">
  Layout
    h1.title {{ $page.post.title }}
    post-meta.meta(:post="$page.post")
    series.series.series-1(v-if="$page.post.series" :data="{ part: $page.post.slug, ...$page.post.series }")
    tag-box.tagbox(:tags="$page.post.tags")
    div.box
        div.content(v-html="$page.post.content")
    series.series.series-2(v-if="$page.post.series" :data="{ part: $page.post.slug, ...$page.post.series }")
</template>

<script>
import TagBox from '~/components/blog/TagBox'
import Series from '~/components/blog/Series'
import PostMeta from '~/components/blog/PostMeta'

export default {
    components: {
        'tag-box': TagBox,
        series: Series,
        'post-meta': PostMeta,
    },
    metaInfo() {
        return {
            title: this.$page.post.title,
        }
    },
}
</script>

<page-query>
query Post($id: ID!) {
    post: blogpost(id: $id) {
        title
        slug
        publishedAt
        readTime
        tags { name, slug, color }
        series { name, slug, next, prev }
        content
    }
}
</page-query>

<style lang="scss" scoped>
p {
    text-align: justify;
}
.title {
    text-align: center;
}

.meta {
    width: 80%;
    margin-bottom: 1em;
}

.series-1 {
    margin-bottom: 2em;
}

.series-2 {
    margin-top: 3em;
    margin-bottom: 5em;
}

.tagbox {
    margin: auto;
    margin-bottom: 1em;
}

.tagbox {
    width: 80%;
}

.box {
    margin-bottom: 2.5em;
}
</style>
