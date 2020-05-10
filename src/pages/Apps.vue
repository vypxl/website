<template lang="pug">
    Layout
        h1 Apps
        p.
            Here you can find an overview of little standalone applications I created.
            I mostly created them just for fun though, so no guarantees for them operating
            correctly. <br>
            The apps are hosted as static files and can be used from anywhere as their scripts
            come from CDNs.
        
        linked-box(to="/apps/memo/" external)
            template(#header)
                h1.headline Memo
            p.
                This app allows the creation of very simple notes, using the url query parameters.
                To create notes, you have to modify your url like this:<br>
                <code>../memo?Note%20A;Note%20B</code><br>
                The notes are separated by semicolons.
        
        linked-box(to="/apps/timer" external)
            template(#header)
                h1.headline Timer
            p.
                A small but handy timer application, supporting timer and stopwatch mode.
                Modify the time with the scroll wheel. No mobile support.
        linked-box(to="/apps/rainbow-randomizer" external)
            template(#header)
                h1.headline Rainbow 6 Randomizer
            p.
                A tool to randomly pick a Rainbow 6 Siege operator. You can even add nicknames!
                Click on the names on the left to disable certain operators.
</template>

<style lang="scss">
.box {
    margin-bottom: 2em;
}
</style>

<script>
import LinkedBox from '../components/LinkedBox'

export default {
    metaInfo: {
        title: 'Apps',
    },
    components: {
        'linked-box': LinkedBox,
    },
}
</script>
