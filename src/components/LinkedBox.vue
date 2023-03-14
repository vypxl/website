<template lang="pug">
    div.box
        div.header
            slot(name="header")
        div.main
            slot
        g-link.link(:to="to" v-if="!external" internal)
        a.link(:href="to" v-if="external" rel="noopener" :target="newtab ? '_blank' : ''")
        div.footer
            slot(name="footer")
</template>

<script>
export default {
    props: {
        to: String,
        external: Boolean,
        newtab: Boolean,
    },
}
</script>

<style lang="scss" scoped>
.box {
    position: relative;

    padding-bottom: calc(var(--space / 2));

    &:hover {
        transform: translateY(-10px);
        box-shadow: 1px 10px 30px 0 #000000a1;
    }
}

.header {
    margin-bottom: calc(var(--space) / 2);
}

.link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -99999px;
    z-index: 0;
}

.main {
    text-align: justify;
}

.footer {
    & > * {
        display: inline-block;
    }

    display: flex;
    justify-content: space-between;
}
</style>
