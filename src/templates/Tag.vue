<template lang="pug">
  Layout
    div.title-holder
        h1.title(:style="'background: #' + $page.tag.color") \#{{ $page.tag.name }}
    div.box
        blockquote.description(v-html="$page.tag.description")
    h1.headline-underline Posts under this Tag:
    post-listing(:posts="$page.tag.posts")
</template>

<script>
import PostListing from '~/components/blog/PostListing'

export default {
    components: {
        'post-listing': PostListing,
    },
    metaInfo() {
        return {
            title: this.$page.tag.name,
        }
    },
}
</script>

<page-query>
query Tag($id: ID!) {
    tag: tag(id: $id) {
        name
        slug
        color
        description
        posts(sortBy: "date") {
            title
            slug
            description
            publishedAt
            readTime
            tags { name, slug, color }
            series { name, slug }
        }
    }
}
</page-query>

<style lang="scss" scoped>
.title-holder {
    display: flex;
    width: 100%;
    justify-content: center;
}

.title {
    text-align: center;
    border-radius: 5px;
    padding: 0.2em 1em;
    min-width: 40%;
}

.headline-underline {
    margin-top: 1em;
}
</style>
