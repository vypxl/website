import { useHead } from '@solidjs/web'

export const title = 'Hello, World!'
export const description = "Welcome to vypxl's personal website."

export default function Home() @{
  useHead([
    { tag: 'title', props: { children: title } },
    { tag: 'meta', props: { name: 'description', content: description } },
  ])

  <>
    <style>
      .links a {
        margin-right: 1rem;
        margin-left: 1rem;
      }

      .center {
        text-align: center;
      }

      .sections {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 1rem;
        margin-bottom: 2rem;
      }

      .sections li {
        margin-bottom: 1rem;
      }
    </style>
    <div class="center">
      <h1 class="title">Hello!</h1>
      <p>Welcome to my personal website.</p>
      <p class="links">
        <a href="/blog">Blog</a>
        <a href="/portfolio">My portfolio</a>
      </p>
      <p class="links">
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
      <ul class="sections">
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
  </>
}
