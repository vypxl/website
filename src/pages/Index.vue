<template lang="pug">
    Layout.wrap
        h1.title Hello!
        p.
            Welcome to my personal website.
        p.links
            g-link(to="/blog") Blog
            g-link(to="/portfolio") My portfolio
        p.links
            a(target="_blank", rel="noopener" href="https://github.com/vypxl") GitHub
            a(target="_blank", rel="noopener" href="https://soundcloud.com/vypxl") Soundcloud
            a(target="_blank", rel="noopener" href="https://dev.to/vypxl") DEV
            a(target="_blank", rel="noopener" href="https://vypxl.itch.io") itch.io
            a(target="_blank", rel="noopener" href="https://linkedin.com/in/thomas-meyer-lehnert") LinkedIn
        h2 On this website
        ul.sections
            li
                g-link(to="/projects") Projects
                span &nbsp;- a non-exhaustive list of my programming projects
            li
                g-link(to="/apps") Apps
                span &nbsp;- a collection of small self contained web apps I made
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

.wrap {
    text-align: center;
}

.sections {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 2rem;
}

.sections li {
    margin-bottom: 1rem;
}
</style>
