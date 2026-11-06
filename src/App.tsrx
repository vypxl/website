import { pageRoutes } from 'virtual:file-routes'
import { fileRoutes } from '@solidjs/router/fs'
import { createRouter, intentPreload, pendingLinks } from '@solidjs/router'
import { announceRoutes } from '@solidjs/prerender'
import Layout from './Layout.tsrx'
import './lib/assets/style/master.css'
import 'typeface-montserrat/index.css'
import 'typeface-roboto/index.css'
import 'typeface-fira-mono/index.css'

const Router = createRouter({
  links: pendingLinks,
  preloadLinks: intentPreload(),
  routes: fileRoutes(pageRoutes),
})

export default function App() @{
  announceRoutes(Router)
  <Router>
    {props => @{
        <Layout>
          @try {
            <>{props.children}</>
          } @pending {
            <></>
          }
        </Layout>
      }}
  </Router>
}
