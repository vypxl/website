import { useHead } from '@solidjs/web'
import styles from './Home.module.css'

export const title = 'Hello, World!'
export const description = "Welcome to vypxl's personal website."

export default function Home() {
  useHead([
    { tag: 'title', props: { children: title } },
    { tag: 'meta', props: { name: 'description', content: description } },
  ])

  return (
    <div class={styles.center}>
      <h1 class="title">Hello!</h1>
      <p>Welcome to my personal website.</p>
      <p class={styles.links}>
        <a href="/blog">Blog</a>
        <a href="/portfolio">My portfolio</a>
      </p>
      <p class={styles.links}>
        <a target="_blank" rel="noopener" href="https://github.com/vypxl">
          GitHub
        </a>
        <a target="_blank" rel="noopener" href="https://soundcloud.com/vypxl">
          Soundcloud
        </a>
        <a target="_blank" rel="noopener" href="https://dev.to/vypxl">
          DEV
        </a>
        <a target="_blank" rel="noopener" href="https://vypxl.itch.io">
          itch.io
        </a>
        <a target="_blank" rel="noopener" href="https://linkedin.com/in/thomas-meyer-lehnert">
          LinkedIn
        </a>
      </p>
      <h2>On this website</h2>
      <ul class={styles.sections}>
        <li>
          <a href="/projects">Projects</a>
          <span>&nbsp;- a non-exhaustive list of my programming projects</span>
        </li>
        <li>
          <a href="/apps">Apps</a>
          <span>&nbsp;- a collection of small self-contained web apps I made</span>
        </li>
      </ul>
    </div>
  )
}
