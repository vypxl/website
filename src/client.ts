document.addEventListener('click', async event => {
  if (!(event.target instanceof Element)) return
  const copy = event.target.closest<HTMLButtonElement>('[data-copy-code-button]')
  if (copy) {
    const code = copy.parentElement?.querySelector('code')?.textContent
    if (code === undefined || code === null) return
    try {
      await navigator.clipboard.writeText(code)
      copy.setAttribute('aria-label', 'Code copied')
    } catch {
      copy.setAttribute('aria-label', 'Could not copy code')
    }
  }
  if (event.target.closest('[data-reset-cookies]')) {
    document.cookie = "vypxl-gdpr=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    window.location.reload()
  }
})
