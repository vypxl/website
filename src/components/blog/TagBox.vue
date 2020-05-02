<template lang="pug">
    div.tagbox
      tag(v-for="tag in tags" :key="tag.slug" :data="tag")
</template>

<script>
import Tag from '~/components/blog/Tag'

export default {
    components: {
        tag: Tag,
    },
    props: ['tags'],
}
</script>

<style lang="scss" scoped></style>
