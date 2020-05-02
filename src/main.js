require('typeface-montserrat')
require('typeface-roboto')
require('typeface-fira-mono')

import 'cookieconsent/build/cookieconsent.min.css'
import 'cookieconsent/build/cookieconsent.min.js'

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/master.scss'

export default function(Vue, { router, head, isClient }) {
    Vue.component('Layout', DefaultLayout)

    head.meta.push({
        name: 'keywords',
        content: 'homepage,blog,programming,coding',
    })

    head.noscript.push({
        innerHTML: 'This website requires JavaScript.',
    })

    // cookie consent dialog
    head.script.push({
        defer: true,
        innerHTML: `
function startAnalytics(status) {
    const dntSupported = window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external
    const dnt = dntSupported && (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.external.msTrackingProtectionEnabled())
    if (status === 'allow' && !dnt) {
        // Google Tag Manager
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PDW366V');
    }
}

window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#3c404d",
      "text": "#d6d6d6"
    },
    "button": {
      "background": "var(--link-color)"
    }
  },
  "content": {
      "message": "This website uses cookies to improve your browsing experience. To achieve that, we collect usage data and share it with analytics partners such as Google."
  },
  "theme": "classic",
  "position": "bottom-right",
  "type": "opt-in",
  "onStatusChange": startAnalytics,
  "onInitialise": startAnalytics,
});`
    })
}
