<template lang="pug">
    Layout
        h1.headline-underline All Series:
        div.container
            linked-box(v-for="s in series", key="s.slug", :to="'/blog/series/' + s.slug")
                template(#header)
                    div.headerwrap
                        h1.headline {{ s.name }}
                        h6.postcount {{ s.count }} Posts
                p.description(v-html="s.description")
</template>

<page-query>
query Series {
    series: allSeries {
        edges {
            node {
                name
                slug
                description
                parts { slug }
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
        series() {
            return this.$page.series.edges.map(x => ({ count: x.node.parts.length, ...x.node }))
        },
    }
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

.headline-underline {
    margin-bottom: 2em;
}
</style>
