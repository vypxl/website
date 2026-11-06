import type { Post, PostMeta } from '../../types'
import LinkedBox from '../LinkedBox.tsrx'

function PostInfo(props: { meta: PostMeta }) @{
  <>
    <div class="meta">
      <span>
        Published{' '}
        {new Date(props.meta.published)
          .toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            timeZone: 'UTC',
          })
          .replaceAll(',', '')}
      </span>
      <span>~{props.meta.readingTime} min read</span>
    </div>
    <style>
      .meta {
        height: auto;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: space-between;
        font-weight: 200;
        > * {
          margin-right: 1em;
        }
      }
    </style>
  </>
}

function Tags(props: { tags: string[] }) @{
  <>
    @for (const tag of props.tags) {
      <a href={`/blog/tag/${encodeURIComponent(tag)}`} class="tag">
        #{tag}
      </a>
    }
    <style>
      .tag {
        position: relative;
        user-select: none;
        display: inline-block;
        background: #1c805b;
        border-radius: 4px;
        padding: 2px 5px;
        font-size: 0.8em;
        text-decoration: none;
        background-blend-mode: darken;
        &:link,
        &:visited {
          color: white;
        }
      }
    </style>
  </>
}

export function PostListing(props: { posts: Post[]; tag?: string }) @{
  <>
    <h1 class="title blog-title">
      @if (props.tag === undefined) {
        <>Blog</>
      } @else {
        <>
          Posts tagged <code>{props.tag}</code>
        </>
      }
    </h1>
    @if (props.tag === undefined) {
      <h1 class="headline-underline heading">All Posts:</h1>
    }
    <div class="listing">
      <ul>
        @for (const post of props.posts) {
          <li>
            <LinkedBox
              to={`/blog/post/${post.meta.slug}`}
              header={
                <>
                  <h1 class="headline">{post.meta.title}</h1>
                  <PostInfo meta={post.meta} />
                </>
              }
              footer={
                <div>
                  <Tags tags={post.meta.tags} />
                </div>
              }
            >
              <p class="description" innerHTML={post.meta.description} />
            </LinkedBox>
          </li>
        }
      </ul>
    </div>
    <style>
      .blog-title {
        text-align: center;
      }
      .heading {
        margin-top: 2.5em;
        text-align: center;
      }
      .listing {
        margin: 3em 0;
      }
      .listing li {
        margin-bottom: 1em;
      }
      .description {
        margin-top: 0.5em;
      }
    </style>
  </>
}

export function PostPage(props: { post: Post }) @{
  <>
    <div class="header">
      <h1 class="title blog-title">{props.post.meta.title}</h1>
      <PostInfo meta={props.post.meta} />
      <div class="tagbox">
        <Tags tags={props.post.meta.tags} />
      </div>
    </div>
    <article class="content blogpost" innerHTML={props.post.content} />
    <style>
      .header {
        width: 80%;
        margin: auto;
      }
      .blog-title {
        text-align: center;
        margin-bottom: 1rem;
      }
      .tagbox {
        display: flex;
        justify-content: center;
        margin: 1em 0;
      }
      .blogpost {
        :global {
          p {
            text-align: justify;
          }

          ul {
            list-style: disc;
          }

          ol {
            list-style: decimal;
          }

          ol,
          ul {
            margin: 0 0 1.5em 1.5em;
            padding: 0;
          }

          .heading-link {
            > span {
              margin-right: 0;
              padding-right: 0px;
            }
            opacity: 0;

            &:hover {
              opacity: 1;
            }
          }

          h1:hover .heading-link,
          h2:hover .heading-link,
          h3:hover .heading-link,
          h4:hover .heading-link,
          h5:hover .heading-link,
          h6:hover .heading-link {
            opacity: 1;
          }

          .admonition {
            position: relative;

            &::before {
              content: ' ';
              width: 32px;
              height: 32px;
              padding: 16px;
              background-size: auto;
              background-repeat: no-repeat;

              position: absolute;
              top: 16px;
              left: 24px;
            }

            .admonition-title {
              display: block;
            }

            padding-left: 96px;
          }

          .admonition-warning {
            &::before {
              background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmNWU2NjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWFsZXJ0LXRyaWFuZ2xlIj48cGF0aCBkPSJNMTAuMjkgMy44NkwxLjgyIDE4YTIgMiAwIDAgMCAxLjcxIDNoMTYuOTRhMiAyIDAgMCAwIDEuNzEtM0wxMy43MSAzLjg2YTIgMiAwIDAgMC0zLjQyIDB6Ii8+PGxpbmUgeDE9IjEyIiB5MT0iOSIgeDI9IjEyIiB5Mj0iMTMiLz48bGluZSB4MT0iMTIiIHkxPSIxNyIgeDI9IjEyLjAxIiB5Mj0iMTciLz48L3N2Zz4=);
            }
            border-color: #f5e663;
          }

          .admonition-note {
            &::before {
              background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4YmU5ZmQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWluZm8iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PGxpbmUgeDE9IjEyIiB5MT0iMTYiIHgyPSIxMiIgeTI9IjEyIi8+PGxpbmUgeDE9IjEyIiB5MT0iOCIgeDI9IjEyLjAxIiB5Mj0iOCIvPjwvc3ZnPg==);
            }
            border-color: #8be9fd;
          }

          [data-rehype-pretty-code-figure] {
            font-size: 0.8em;
            background: #282a36;
            border-radius: 8px;
            padding: 1em;
            margin: 1.5em 0 1.5em 0;

            [data-rehype-pretty-code-title] {
              font-size: 1.5em;
              padding-bottom: 0.5rem;
              margin-bottom: 1rem;
              border-bottom: 1px solid #bbb;
            }

            [data-rehype-pretty-code-caption] {
              margin-top: 0.5rem;
              border-top: 1px solid #bbb;
              padding-top: 1rem;
            }

            pre {
              position: relative;
              padding-top: 1.8em;

              &::after {
                content: attr(data-language);
                position: absolute;
                top: 0em;
                left: 0em;
                text-transform: capitalize;
                font-family: 'Fira Code', monospace;
                padding-right: 2em;
              }

              [data-copy-code-button] {
                &::after {
                  content: ' ';
                }
                position: absolute;
                top: -1em;
                right: -1em;
                background: none;
                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNvcHkiPjxyZWN0IHg9IjkiIHk9IjkiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjIiIHJ5PSIyIi8+PHBhdGggZD0iTTUgMTVINGEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg5YTIgMiAwIDAgMSAyIDJ2MSIvPjwvc3ZnPg==');
                background-repeat: no-repeat;
                background-position: center;
                background-size: auto;
                box-shadow: none;

                border: none;

                margin: auto;
                cursor: pointer;

                border-radius: 4px;
                padding: 1.25em 2em;
              }

              code {
                counter-reset: line;
                width: 100%;
                display: grid;
                overflow-x: auto;
                padding-bottom: 1em;
              }

              code[data-line-numbers] > [data-line]::before {
                counter-increment: line;
                content: counter(line);

                /* Other styling */
                display: inline-block;
                width: 1rem;
                margin-right: 2rem;
                text-align: right;
                color: gray;
              }

              code[data-line-numbers-max-digits='2'] > [data-line]::before {
                width: 2rem;
              }

              code[data-line-numbers-max-digits='3'] > [data-line]::before {
                width: 3rem;
              }

              span[data-line] {
                border-left-width: 2px;
                border-left-color: #0000;
                border-left-style: solid;
                padding-left: 1rem;
                padding-right: 1.5rem;
              }

              code[data-line-numbers] > [data-line] {
                padding-left: 0px;
              }

              span[data-highlighted-line] {
                border-radius: 2px;
                background: #c8c8ff1a;
                border-left-color: rgb(96, 165, 250);
                border-left-style: solid;
              }

              span[data-highlighted-chars] {
                background: #c8c8ff3a;
                border-radius: 3px;
                padding: 0.2em 0.2em;
              }
            }
          }
        }
      }
    </style>
  </>
}
