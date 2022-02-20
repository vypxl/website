<template lang="pug">
    div.meta
        span.date Published {{ new Date(post.published).toDateString() }}
        span.read-time ~{{ post.readTime }} Minute read
</template>

<script>
export default {
    props: ['post'],
}
</script>

<style lang="scss" scoped>
.meta {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    font-weight: 200;

    & > * {
        margin-right: 1em;
    }
}
</style>
