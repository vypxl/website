<template lang="pug">
   div.container
    g-link.button.link.link-prev(
        :class="{ disabled: !data.prev }"
        :to="!!data.prev ? ('/blog/post/' + data.prev) : $route.path"
        ) &#8592; Previous
    g-link.button.link.link-series(:to="'/blog/series/' + data.slug") {{ data.name }}
    g-link.button.link.link-next(
        :class="{ disabled: !data.next }"
        :to="!!data.next ? ('/blog/post/' + data.next) : $route.path"
        ) Next &#8594;
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    align-content: space-around;
    justify-content: space-around;
    width: 100%;
}

.link {
    min-width: 6em;
    text-align: center;
    vertical-align: center;
}

.disabled {
    visibility: hidden;
}

.link-series {
    color: #eee;
    background: #292f3d;
}
</style>
