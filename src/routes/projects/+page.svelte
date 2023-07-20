<script lang="ts">
  import LinkedBox from '$lib/components/LinkedBox.svelte'
</script>

<h1 class="headline">Projects</h1>
<p class="justify">
  This page contains a list of my most important hobby projects. Some are quite advanced and sophisticated applications
  or libraries, while others are just small tools or experiments I made for fun. All of them, and most of my smaller
  projects can be found on my
  <a target="_blank" rel="noopener" href="https://github.com/vypxl">GitHub</a>. Just click on a box to find the project!
</p>

<ul>
  <li>
    <LinkedBox to="https://github.com/vypxl/tx8" external newtab>
      <h1 slot="header" class="headline">TX8</h1>
      <p>
        TX8 is a fantasy console I created, inspired by old gaming systems like the SNES. I designed a custom
        instruction set and hardware specification, and wrote an emulator for it in C++. Currently, you can assemble and
        run tx8 assembly programs via the cli. In the future, I plan to add graphics, sound and music capabilities.
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="https://github.com/vypxl/scar" external newtab>
      <h1 slot="header" class="headline">Scar</h1>
      <p>
        Scar is a game engine for the Crystal Programming Language. It is built on top of the SFML library and aims to
        provide a batteries-included approach to building 2D games. I built it because Crystal as a more niche-language
        did not have a good game library available, and I wanted to explore how I would build a game library for myself.
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="/blog/post/about-my-website" newtab>
      <h1 slot="header" class="headline">vypxl.io</h1>
      <p>
        This website serves as my portfolio and central source of information about me, and hosts my blog (at least it
        contains the very few posts I wrote haha). It is built using SvelteKit.
        Learn more about it in the blog article by clicking on this box.
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="https://github.com/Das-Quadrumvirat/viscon-22-cocktail-coach" external newtab>
      <h1 slot="header" class="headline">Cocktail Coach</h1>
      <p>
        Cocktail Coach is a web app me and my friends built for a hackathon in 48 hours. It is a collection of cocktail
        recipes recipes we sourced from a free database. It allows full text searching recipes, saving an ingredient
        list and filtering by it, drink recommendations and more. Check it out using the link on the GitHub page!
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="https://github.com/vypxl/sortviz" external newtab>
      <h1 slot="header" class="headline">SortViz</h1>
      <p>
        SortViz is an experiment I conducted to learn about GPU programming. It is a visualization tool for various
        sorting algorithms, written in C++ and OpenGL. It runs in a web browser as well using Emscripten (link on
        GitHub).
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="https://github.com/vypxl/terutil" external newtab>
      <h1 slot="header" class="headline">Terutil</h1>
      <p>
        Terutil is a collection of really small cli tools I wrote mostly for personal use. Each of them solves a
        specific problem I had while working on my Linux machine. I wrote them because it's fun to write small tools
        like this, and because I wanted to improve my workflow.
      </p>
    </LinkedBox>
  </li>
</ul>

<svelte:head>
  <title>Projects - vypxl</title>
  <meta name="description" content="A list of my most important hobby projects." />
</svelte:head>

<style lang="scss">
  li {
    margin-bottom: 2em;
  }

  .headline {
    text-align: center;
  }

  .justify {
    text-align: justify;
  }
</style>
