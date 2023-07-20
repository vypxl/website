<script lang="ts">
  import logo from '$lib/favicon.png'
  import '$lib/assets/style/master.scss'

  import 'typeface-montserrat'
  import 'typeface-roboto'
  import 'typeface-fira-mono'
</script>

<div class="layout">
  <header class="header">
    <div class="nav-l">
      <img src={logo} alt="Logo" width="32" height="32" />
      <a href="/">vypxl</a>
    </div>
    <nav class="nav">
      <a class="nav-link" href="/blog">Blog</a>
      <a class="nav-link" href="/portfolio">Portfolio</a>
    </nav>
  </header>
  <div class="wrap">
    <slot />
  </div>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-misc">
        <a href="/legal">disclaimer / privacy / cookies (legal)</a>
        <div>contact: thomas &lt;at&gt; vypxl.io</div>
      </div>
      <div class="footer-social">
        <a target="_blank" rel="noopener" href="https://github.com/vypxl">GitHub</a>
        <a target="_blank" rel="noopener" href="https://linkedin.com/in/thomas-meyer-lehnert">LinkedIn</a>
      </div>
    </div>
    <div>&copy; 2023 vypxl</div>
  </footer>
</div>

<style lang="scss">
  .layout {
    min-height: 100vh;
    max-width: var(--content-width);
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 80px;
  }

  .nav-l {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 1em;
    }
  }

  .nav-link {
    margin-left: 20px;
  }

  .footer {
    margin-top: auto;
    width: 100%;
    text-align: center;

    &::before {
      content: '';
      width: 60%;
      height: calc(var(--space) / 2);
      border-top: 2px solid #444;
    }

    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
      margin: 1em 0px;
    }
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > * {
      margin: 0px 2em;
    }
  }

  .footer-social {
    & > * {
      display: block;
    }
  }
</style>
