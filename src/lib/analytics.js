/* eslint-disable */
// @ts-nocheck

export function initAnalytics() {
  const dntSupported =
    window.doNotTrack ||
    navigator.doNotTrack ||
    navigator.msDoNotTrack ||
    'msTrackingProtectionEnabled' in window.external
  const dnt =
    dntSupported &&
    (window.doNotTrack == '1' ||
      navigator.doNotTrack == 'yes' ||
      navigator.doNotTrack == '1' ||
      navigator.msDoNotTrack == '1' ||
      (window.external.msTrackingProtectionEnabled && window.external.msTrackingProtectionEnabled()))
  if (status === 'allow' && !dnt) {
    // Google Tag Manager
    ; (function(w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', 'GTM-PDW366V')
  }
}
