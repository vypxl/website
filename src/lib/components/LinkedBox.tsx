import type { JSX } from '@solidjs/web'
import styles from './LinkedBox.module.css'

export default function LinkedBox(props: {
  to: string
  external?: boolean
  newtab?: boolean
  header: JSX.Element
  children: JSX.Element
  footer?: JSX.Element
}) {
  return (
    <div class={`box ${styles.box}`}>
      <div class={styles.header}>{props.header}</div>
      <div class={styles.main}>{props.children}</div>
      <a
        href={props.to}
        class={styles.link}
        rel={props.external ? 'noopener' : undefined}
        target={props.external ? (props.newtab ? '_blank' : '_self') : undefined}
        aria-label={props.to}
      />
      <div class={styles.footer}>{props.footer}</div>
    </div>
  )
}
