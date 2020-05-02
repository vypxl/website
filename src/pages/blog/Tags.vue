<template lang="pug">
    Layout
        h1.headline-underline All Tags:
        div.container
            linked-box(v-for="t in tags", key="t.slug", :to="'/blog/tag/' + t.slug")
                template(#header)
                    div.headerwrap
                        h1.headline(:style="'background: #' + t.color") \#{{ t.name }}
                        h6.postcount {{ t.count }} Posts
                p.description(v-html="t.description")
</template>

<page-query>
query Tags {
    tags: allTag {
        edges {
            node {
                name
                slug
                description
                color
                posts { slug }
            }
        }
    }
}
</page-query>

<script>
import LinkedBox from '~/components/LinkedBox'

export default {
    components: {
        'linked-box': LinkedBox,
    },
    computed: {
        tags() {
            return this.$page.tags.edges.map(x => ({ count: x.node.posts.length, ...x.node }))
        },
    },
}
</script>

<style lang="scss" scoped>
.headerwrap {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > * {
        display: inline-block;
    }
}

.headline {
    border-radius: 5px;
    padding: 0.1em 0.5em;
}

.headline-underline {
    margin-bottom: 2em;
}
</style>


