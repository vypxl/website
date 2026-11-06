import { HydrationScript, type JSX } from '@solidjs/web'

export default function Document(props: { children: JSX.Element }) @{
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width" />
      <HydrationScript />
    </head>
    <body>{props.children}</body>
  </html>
}
