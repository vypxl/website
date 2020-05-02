<template lang="pug">
    Layout
        h1.title 404 - Not found
        div.box
            h2 Sorry, the page you requested does not exist <br> or has been removed.
            br
            g-link.button(to="/") Home
</template>

<script>
export default {
    metaInfo: {
        title: 'Not Found (404)',
    },
}
</script>

<style lang="scss" scoped>
.box {
    text-align: center;
}
</style>
