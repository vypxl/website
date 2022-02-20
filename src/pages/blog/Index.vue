<template lang="pug">
    Layout
        h1.title Blog
        div.info
            g-link.button(to="/blog/series") Series
            g-link.button(to="/blog/tags") Tags
        h1.headline-underline All Posts:
        post-listing.listing(:posts="posts")
</template>

<page-query>
query Posts {
    posts: allBlogpost(sortBy: "date") {
        edges {
            node {
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
}
</page-query>

<script>
import PostListing from '~/components/blog/PostListing'

export default {
    components: {
        'post-listing': PostListing,
    },
    computed: {
        posts() {
            return this.$page.posts.edges.map(x => x.node)
        },
    },
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
}

.info {
    width: 70%;
    margin: auto;
    display: flex;
    // justify-content: center;
    justify-content: space-around;

    & > * {
        // flex-grow: 1;
        width: 30%;
        text-align: center;
    }
}

.headline-underline {
    margin-top: 2.5em;
}
</style>
