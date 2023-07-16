<script lang="ts">
  export let tags: string[]
</script>

{#each tags as tag}
  <a href="/blog/tag/{tag}" class="link">#{tag}</a>
{/each}

<style lang="scss">
  .link {
    user-select: none;
    display: inline-block;
    background: #1c805b;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 0.8em;
    text-decoration: none;
    background-blend-mode: darken;
    color: white;
  }
</style>
