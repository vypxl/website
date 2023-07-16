<script lang="ts">
  export let to: string
  export let external = false
  export let newtab = false
</script>

<div class="box">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="main">
    <slot />
  </div>
  {#if !external}
    <a href={to} class="link" />
  {:else}
    <a href={to} class="link" rel="noopener" target={newtab ? '_blank' : ''} />
  {/if}
  <div class="footer">
    <slot name="footer" />
  </div>
</div>

<style lang="scss">
  .box {
    position: relative;

    padding-bottom: var(--space);

    &:hover {
      transform: translateY(-10px);
      box-shadow: 1px 10px 30px 0 #000000a1;
    }
  }

  .header {
    margin-bottom: calc(var(--space) / 2);
  }

  .link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -99999px;
    z-index: 0;
  }

  .main {
    text-align: justify;
  }

  .footer {
    & > * {
      display: inline-block;
    }

    display: flex;
    justify-content: space-between;
  }
</style>
