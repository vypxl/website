<template lang="pug">
    div.layout
        header.header
            div.nav-l
                g-image(src="../favicon.png")
                g-link(to="/") {{ $static.metadata.siteName }}
            nav.nav
                g-link.nav-link(to="/blog") Blog
                g-link.nav-link(to="/about") About
        div.wrap
            slot
        footer.footer
            div.footer-content
                div.footer-misc
                    g-link(to="/legal") disclaimer / privacy / cookies (legal)
                    div contact: thomas &lt;at&gt; vypxl.io
                div.footer-social
                    a(target="_blank" rel="noopener" href="https://dev.to/vypxl") DEV
                    a(target="_blank" rel="noopener" href="https://github.com/vypxl") GitHub
            div &copy; 2020 vypxl
</template>

<static-query>
    query {
        metadata {
            siteName
        }
    }
</static-query>

<style lang="scss" scoped>
.layout {
    min-height: 100vh;
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 80px;
}

.nav-l {
    display: flex;
    align-items: center;
    
    & > * {
        margin-right: 1em;
    }
}

.nav-link {
    margin-left: 20px;
}

.footer {
    margin-top: auto;
    width: 100%;

    &::before {
        content: '';
        width: 60%;
        height: calc(var(--space) / 2);
        border-top: 2px solid #444;
    }

    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
        margin: 1em 0px;
    }
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > * {
        margin: 0px 2em;
    }
}

.footer-social {
    & > * {
        display: block;
    }
}
</style>
