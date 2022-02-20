<template lang="pug">
  Layout
    h1.title {{ $page.series.name }}
    div.box
        blockquote.description(v-html="$page.series.description")
    h1.headline-underline Posts in this Series:
    post-listing(:posts="$page.series.parts")
</template>

<script>
import PostListing from '~/components/blog/PostListing'

export default {
    components: {
        'post-listing': PostListing,
    },
    metaInfo() {
        return {
            title: this.$page.series.name,
        }
    },
}
</script>

<page-query>
query Tag($id: ID!) {
    series: series(id: $id) {
        name
        slug
        description
        parts {
            title
            slug
            description
            published
            readTime
            tags { name, slug, color }
            series { name, slug }
        }
    }
}
</page-query>

<style lang="scss" scoped>
.title {
    text-align: center;
    border-radius: 5px;
    width: 40%;
}

.description {
    text-align: center;
}

.headline-underline {
    margin-top: 1em;
}
</style>
