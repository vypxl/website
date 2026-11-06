import type { JSX } from '@solidjs/web'

export default function LinkedBox(props: {
  to: string
  external?: boolean
  newtab?: boolean
  header: JSX.Element
  children: JSX.Element
  footer?: JSX.Element
}) @{
  <>
    <div class="box">
      <div class="header">{props.header}</div>
      <div class="main">{props.children}</div>
      <a
        href={props.to}
        class="link"
        rel={props.external ? 'noopener' : undefined}
        target={props.external ? (props.newtab ? '_blank' : '_self') : undefined}
        aria-label={props.to}
      />
      <div class="footer">{props.footer}</div>
    </div>
    <style>
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
        & > :global(*) {
          display: inline-block;
        }

        display: flex;
        justify-content: space-between;
      }
    </style>
  </>
}
