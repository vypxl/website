<template lang="pug">
    Layout
        h1 Projects
        p.
          This page contains a list of my most important hobby projects. Some are quite advanced
          and sophisticated applications or libraries, while others are just small tools
          or experiments I made for fun. All of them, and most of my smaller projects can be found on my
          <a target="_blank" rel="noopener" href="https://github.com/vypxl">GitHub</a>.
          Just click on a box to find the project!

        linked-box(to="https://github.com/vypxl/tx8" external newtab)
            template(#header)
                h1.headline TX8
            p.
                TX8 is a fantasy console I created, inspired by old gaming systems
                like the SNES. I designed a custom instruction set
                and hardware specification, and wrote an emulator for it in C++.
                Currently, you can assemble and run tx8 assembly programs via the cli.
                In the future, I plan to add graphics, sound and music capabilities.

        linked-box(to="https://github.com/vypxl/scar" external newtab)
            template(#header)
                h1.headline Scar
            p.
                Scar is a game engine for the Crystal
                Programming Langue. It is built on top of the SFML library and aims to provide
                a batteries-included approach to building 2D games. I built it because Crystal
                as a more niche-language did not have a good game library available, and I
                wanted to explore how I would build a game library for myself.

        linked-box(to="/blog/post/about-my-website" newtab)
            template(#header)
                h1.headline vypxl.io
            p.
                This website serves as my portfolio and central source of information about me,
                and hosts my blog (at least it would if I actually wrote any posts lol).
                It is built using Gridsome, a vue.js framework for static websites.
                Learn more about it in the blog article by clicking on this box.

        linked-box(to="https://github.com/Das-Quadrumvirat/viscon-22-cocktail-coach" external newtab)
            template(#header)
                h1.headline Cocktail Coach
            p.
                Cocktail Coach is a web app me and my friends built for a hackathon in 48 hours.
                It is a collection of cocktail recipes recipes we sourced from a free database.
                It allows full text searching recipes, saving an ingredient list and filtering by it,
                drink recommendations and more. Check it out using the link on the GitHub page!

        linked-box(to="https://github.com/vypxl/sortviz" external newtab)
            template(#header)
                h1.headline SortViz
            p.
                SortViz is an experiment I conducted to learn about GPU programming. It is a
                visualization tool for various sorting algorithms, written in C++ and OpenGL.
                It runs in a web browser as well using Emscripten (link on GitHub).

        linked-box(to="https://github.com/vypxl/terutil" external newtab)
            template(#header)
                h1.headline Terutil
            p.
                Terutil is a collection of really small cli tools I wrote mostly for personal use.
                Each of them solves a specific problem I had while working on my linux machine.
                I wrote them because it's fun to write small tools like this, and because I wanted
                to improve my workflow.
</template>

<script>
import LinkedBox from '../components/LinkedBox'

export default {
    metaInfo: {
        title: 'Projects',
    },
    components: {
        'linked-box': LinkedBox,
    },
}
</script>

<style lang="scss">
.box {
    margin-bottom: 2em;
}
</style>
