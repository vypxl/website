<template lang="pug">
   g-link.link(
       :to="'/blog/tag/' + data.slug" 
       :style="'background: #' + data.color"
       ) \#{{ data.name }}
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style lang="scss" scoped>
.link {
    user-select: none;
    display: inline-block;
    background: #bbb;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 0.8em;
    text-decoration: none;
    background-blend-mode: darken;
    color: white;
}
</style>
