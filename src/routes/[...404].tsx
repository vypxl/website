import { useLocation } from '@solidjs/router'
import { httpStatus, useHead } from '@solidjs/web'

export default function NotFound() {
  if (useLocation().pathname !== '/404') httpStatus(404)
  useHead({ tag: 'title', props: { children: 'Not Found (404)' } })
  return (
    <>
      <h1 class="title">404 - Not found</h1>
      <div class="box" style="text-align: center">
        <h2>
          Sorry, the page you requested does not exist <br /> or has been removed.
        </h2>
        <br />
        <a class="button" href="/">
          Home
        </a>
      </div>
    </>
  )
}
