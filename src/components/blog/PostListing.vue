<template lang="pug">
    div.container
        post-preview.item(v-for="post in posts" :key="post.slug" :data="post")
</template>

<script>
import PostPreview from '~/components/blog/PostPreview'

export default {
    components: {
        'post-preview': PostPreview,
    },
    props: ['posts'],
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 3em;
    margin-bottom: 3em;
}

.item {
    margin: 1em;
}
</style>
