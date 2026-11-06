import me from '../lib/assets/images/me.webp'
import { useHead } from '@solidjs/web'
import styles from './Portfolio.module.css'

export const title = 'Thomas Meyer-Lehnert Portfolio'
export const description = 'Learn more about me, my projects, and my skills.'

export default function Portfolio() {
  useHead([
    { tag: 'title', props: { children: title } },
    { tag: 'meta', props: { name: 'description', content: description } },
  ])

  return (
    <>
      <div class={styles.picture}>
        <img class={styles.image} src={me} alt="Portrait" />
      </div>
      <h1 class={styles.title}>Thomas Meyer-Lehnert</h1>
      <p class={styles.text}>
        Hello, I am Thomas, aka vypxl. I am a computer science enthusiast, who loves to code and create new things. I am
        currently studying computer science at <strong>ETH Zurich</strong>. Besides my studies, I work on various hobby
        projects, like my{' '}
        <a target="blank" rel="noopener" href="https://github.com/vypxl/tx8">
          fantasy console
        </a>
        . Find a list of my most important projects <a href="/projects">here</a>, or check out my{' '}
        <a target="blank" rel="noopener" href="https://github.com/vypxl">
          GitHub Profile
        </a>
        .
      </p>
      <p class={styles.text}>
        I am particularly interested in systems programming, low-level programming, and embedded systems, but I also do
        full stack web development and some game development. I love designing and implementing software architectures,
        and I am always looking for new challenges.
      </p>
      <p class={styles.text}>
        Open source is a big part of what I do. Almost every project I created is open source. I love sharing my work
        with others, and contributing to the community. Apart from my work meant for public use, I do some projects for
        myself, like my never ending journey of configuring my editor of choice, the amazing{' '}
        <a target="blank" rel="noopener" href="https://neovim.io/">
          Neovim
        </a>
        , self-hosting a media and file sharing server, or building my own custom mechanical keyboard. Another thing I
        enjoy is doing challenges, like the 25-day problem solving challenge{' '}
        <a target="blank" rel="noopener" href="https://adventofcode.com/">
          Advent of Code
        </a>{' '}
        or participating in hackathons.
        <br />
      </p>
      <p class={styles.text}>
        Learning new things is a lot of fun, so I often experiment with interesting topics I discover. That gave me the
        skill of being able to quickly adapt to new technologies. Learn about some of the technologies I am familiar
        with in the next section.
      </p>
      <div class={styles.divider} />
      <h2 class={styles.title}>Technologies</h2>
      <p class={styles.text}>
        I have used a variety of libraries, frameworks, and programming languages. Here are the ones I like the most.
      </p>
      <h3 class="subheading">Programming Languages</h3>
      <p class={styles.text}>
        Languages I am proficient in: C, C++, Javascript/Typescript, Python, Ruby, Haskell, and Crystal
        <br />
        Languages I am familiar with: Java, Kotlin, Scala, C#, Go, Rust, Lua, Bash, and Assembly
        <br />
        My biggest projects are written in C++ and Crystal. My web projects use HTML and CSS as well, of course :)
      </p>
      <h3 class="subheading">Frameworks and Libraries</h3>
      <p class={styles.text}>
        Web technologies and frameworks I have used: Vue, Nuxt, React, Next, Svelte, and SvelteKit
        <br />
        My favorite framework award goes to SvelteKit, although I use Vue for this website. Other than the UI libraries,
        I've worked with TailwindCSS, DaisyUI, and Bootstrap.
      </p>
      <p class={styles.text}>
        Some libraries I have used for my lower-level programming are: SDL2, SFML, OpenGL, and GLFW.
      </p>
      <h3 class="subheading">Other Technologies</h3>
      <p class={styles.text}>
        I have experience using Docker, Git, and GitHub Actions. My daily driver operating system is Manjaro Linux. I
        operate two Linux servers, one at home and one in Oracle Cloud. I have used Postgres and Meilisearch, Firebase,
        and Heroku.
      </p>
      <h3 class="subheading">Miscellaneous Experience</h3>
      <p class={styles.text}>
        At some point, I delved into how to program the Nintendo Gameboy, built an LED controller using a Raspberry Pi,
        built a Chrome extension, and developed a small quality of life app for fellow school students. Sometimes, I
        make music using my DAW of choice,{' '}
        <a target="blank" rel="noopener" href="https://image-line.com">
          FL Studio
        </a>
        .
      </p>
      <div class={styles.divider} />
      <p class={`${styles.text} ${styles.center}`}>Thanks for reading!</p>
      <p class={`${styles.text} ${styles.center} ${styles.end}`}>
        If you can't wait to hire me now, be sure to contact me using one of the ways listed below.
      </p>
    </>
  )
}
