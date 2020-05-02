<template lang="pug">
    linked-box(:to="'/blog/post/' + data.slug")
        template(#header)
            h1.headline {{ data.title }}
            post-meta(:post="data")
        p.desc(v-html="data.description")
        template(#footer)
            tag-box.lift(:tags="data.tags")
            g-link.lift.button.link-series(
                v-if="data.series"
                :to="'/blog/series/' + data.series.slug"
            ) {{ data.series.name }}
</template>

<script>
import LinkedBox from '~/components/LinkedBox'
import TagBox from '~/components/blog/TagBox'
import PostMeta from '~/components/blog/PostMeta'

export default {
    components: {
        'linked-box': LinkedBox,
        'tag-box': TagBox,
        'post-meta': PostMeta,
    },
    props: ['data'],
}
</script>

<style lang="scss" scoped>.desc {
    margin-top: 0.5em;
}

.link-series {
    color: #eee;
    background: #292f3d;
}

.lift {
    z-index: 1;
}
</style>
