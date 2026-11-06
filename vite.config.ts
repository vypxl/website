import solid from '@solidjs/vite-plugin'
import { serverFunctions } from '@solidjs/prerender/integration'
import { prerender } from 'prerender-crawler/vite'
import { fileRoutes } from 'filesystem-routing/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    solid({
      start: { renderMode: 'async', clientSetup: './src/client.ts' },
      ssr: true,
      serverFunctions: true,
    }),
    fileRoutes(),
    prerender({
      mode: 'static',
      pages: ['/', { path: '/404', filename: '404.html' }],
      filter: path => !path.startsWith('/apps/'),
      integrations: [serverFunctions()],
    }),
  ],
  publicDir: 'static',
})
