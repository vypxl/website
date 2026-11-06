# vypxl's personal website

Online at [vypxl.io](https://vypxl.io/)

Built with

- SvelteKit
- Markdown
- Cloudflare Pages

Development uses Bun 1.4.4 (`nix develop` or `direnv allow` with Nix installed).

```sh
bun install --frozen-lockfile
bun run dev
bun run lint
bun run format:check
bun run format
bun run check
bun run build
bun run preview
```

Bun runs the JavaScript tools as well as installing dependencies. Oxlint checks
JavaScript/TypeScript, including Svelte script blocks; Oxfmt handles formatting.
The archived standalone apps in `static/apps` are excluded from both tools.
Vite 8 already uses Rolldown and Oxc for builds. SCSS uses `sass-embedded` through
`vitePreprocess`.

The Svelte migration is deferred: SvelteKit 3 rejects the existing
`svelte.config.js`, and the current `svelte-check` requires TypeScript 6's API
while this project keeps TypeScript 7. Build and check remain blocked until that
migration is completed. Oxlint does not lint Svelte templates.
