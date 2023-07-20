<div class="center">
  <h1 class="title">Hello!</h1>
  <p>Welcome to my personal website.</p>
  <p class="links">
    <a href="/blog">Blog</a>
    <a href="/portfolio">My portfolio</a>
  </p>
  <p class="links">
    <a target="_blank" rel="noopener" href="https://github.com/vypxl">GitHub</a>
    <a target="_blank" rel="noopener" href="https://soundcloud.com/vypxl">Soundcloud</a>
    <a target="_blank" rel="noopener" href="https://dev.to/vypxl">DEV</a>
    <a target="_blank" rel="noopener" href="https://vypxl.itch.io">itch.io</a>
    <a target="_blank" rel="noopener" href="https://linkedin.com/in/thomas-meyer-lehnert">LinkedIn</a>
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

<svelte:head>
  <title>Hello, World!</title>
  <meta name="description" content="Welcome to vypxl's personal website." />
</svelte:head>

<style lang="scss">
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
