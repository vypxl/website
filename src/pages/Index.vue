<template lang="pug">
    Layout.wrap
        h1.title Hello!
        p.
            Welcome to my personal website.
        p.links
            g-link(to="/blog") Blog
            g-link(to="/about") About
        p.links
            a(target="_blank", rel="noopener" href="https://github.com/vypxl") GitHub
            a(target="_blank", rel="noopener" href="https://soundcloud.com/vypxl") Soundcloud
</template>

<script>
export default {
    metaInfo: {
        title: 'Hello, world!',
    },
}
</script>

<style lang="scss">
.links a {
    margin-right: 1rem;
    margin-left: 1rem;
}

.wrap * {
    text-align: center;
}
</style>
