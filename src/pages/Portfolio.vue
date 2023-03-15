<template lang="pug">
    Layout
        div.picture
            g-image#me-img(src="~/assets/images/me.webp")
        h1.title Thomas Meyer-Lehnert
        p.text.
            Hello, I am Thomas, aka vypxl. I am a computer science enthusiast, who loves to code and create new things.
            I am currently studying computer science at <strong>ETH Zurich</strong>. Besides my studies, I work on various hobby projects,
            like my <a target="blank" rel="noopener" href="https://github.com/vypxl/tx8">fantasy console</a>. Find a list of
            my most important projects <g-link to="/projects">here</g-link>, or check out my
            <a target="blank" rel="noopener" href="https://github.com/vypxl">GitHub Profile</a>.

        p.text.
            I am particularly interested in systems programming, low-level programming, and embedded systems, but I also do
            full stack web development and some game development. I love designing and implementing software architectures, and
            I am always looking for new challenges.

        p.text.
            Open source is a big part of what I do. Almost every project I created is open source. I love sharing my work with others,
            and contributing to the community. Apart from my work meant for public use, I do some projects for myself, like my never ending
            journey of configuring my editor of choice, the amazing <a target="blank" rel="noopener" href="https://neovim.io/">Neovim</a>,
            self hosting a media and file sharing server, or building my own custom mechanical keyboard. Another thing I enjoy is doing
            challenges, like the 25 day problem solving challenge <a target="blank" rel="noopener" href="https://adventofcode.com/">Advent of Code</a>
            or participating in hackathons.<br>

        p.text
            Learning new things is a lot of fun, so I often experiment with interesting topics I discover. That
            gave me the skill of being able to quickly adapt to and new technologies. Learn about some of the
            technologies I am familiar with in the next section.

        div.divider

        h2.title Technologies
        p.text.
            I have used a variety of libraries, frameworks and programming languages. Here are the ones I like the most.

        h3.subheading Programming Languages
        p.text.
            Languages I am proficient in: C, C++, Javascript/Typescript, Python, Ruby, Haskell and Crystal<br>
            Languages I am familiar with: Java, Kotlin, Scala, C#, Go, Rust, Lua, Bash and Assembly<br>
            My biggest projects are written in C++ and Crystal. My web projects use HTML and CSS as well of course :)

        h3.subheading Frameworks and Libraries
        p.text.
            Web technologies and frameworks I have used: Vue, Nuxt, React, Next, Svelte and SvelteKit<br>
            My favorite framework award goes to SvelteKit, although I use Vue for this website.
            Other than the UI libraries, I've worked with TailwindCSS, DaisyUI and Bootstrap.
        p.text.
            Some libraries I have used for my lower level programming are:
            SDL2, SFML, OpenGL, and GLFW.

        h3.subheading Other Technologies
        p.text.
            I have experience using Docker, Git, and GitHub Actions. My daily driver operating system is Manjaro Linux.
            I operate two linux servers, one at home and one in oracle cloud. I have used Postgres and Meilisearch, Firebase
            and Heroku.

        h3.subheading Miscellaneous Experience
        p.text.
            At some point I delved into how to program the Nintendo Gameboy,
            built a led controller using a Raspberry Pi, built a chrome extension,
            and developed a small quality of life app for fellow school students. Sometimes, I make music using my
            DAW of choice, <a target="blank" rel="noopener" href="https://image-line.com">FL Studio</a>.

        div.divider

        p.text
            div.center Thanks for reading!
            div.center.end If you can't wait to hire me now, be sure to contact me using one of the ways listed below.

</template>

<script>
export default {
    metaInfo: {
        title: 'Portfolio',
    },
}
</script>

<style lang="scss">
.title {
    text-align: center;
    margin-bottom: 1rem;
}

.picture {
    display: flex;
    justify-content: center;
}

#me-img {
    width: 100%;
    max-width: 250px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.text {
    text-align: justify;
}

.divider {
    margin: 4rem 10% 4rem 10%;
    border-bottom: 2px solid #ccc;
}

.center {
    text-align: center;
}

.end {
    margin-bottom: 4rem;
}
</style>
