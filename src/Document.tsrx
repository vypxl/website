import { HydrationScript, type JSX } from '@solidjs/web'
import roboto from 'typeface-roboto/files/roboto-latin-400.woff2?url'
import montserrat from 'typeface-montserrat/files/montserrat-latin-300.woff2?url'

export default function Document(props: { children: JSX.Element }) @{
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width" />
      <link rel="preload" href={roboto} as="font" type="font/woff2" crossorigin="anonymous" />
      <link rel="preload" href={montserrat} as="font" type="font/woff2" crossorigin="anonymous" />
      <HydrationScript />
    </head>
    <body>{props.children}</body>
  </html>
}
