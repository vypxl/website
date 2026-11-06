import { useIsRouting } from '@solidjs/router'
import type { JSX } from '@solidjs/web'
import logo from './lib/favicon.png'
import styles from './Layout.module.css'

export default function Layout(props: { children: JSX.Element }) {
  const isRouting = useIsRouting()
  return (
    <div class={styles.layout}>
      <header class={styles.header}>
        <div class={styles['nav-l']}>
          <img src={logo} alt="Logo" width="32" height="32" />
          <a href="/">vypxl</a>
        </div>
        <nav>
          <a class={styles['nav-link']} href="/blog">
            Blog
          </a>
          <a class={styles['nav-link']} href="/portfolio">
            Portfolio
          </a>
        </nav>
      </header>
      <main aria-busy={isRouting() ? 'true' : 'false'}>{props.children}</main>
      <footer class={styles.footer}>
        <div class={styles['footer-content']}>
          <div>
            <a href="/legal">disclaimer / privacy / cookies (legal)</a>
            <div>contact: thomas &lt;at&gt; vypxl.io</div>
          </div>
          <div class={styles['footer-social']}>
            <a target="_blank" rel="noopener" href="https://github.com/vypxl">
              GitHub
            </a>
            <a target="_blank" rel="noopener" href="https://linkedin.com/in/thomas-meyer-lehnert">
              LinkedIn
            </a>
          </div>
        </div>
        <div>&copy; 2020-2026 vypxl</div>
      </footer>
    </div>
  )
}
