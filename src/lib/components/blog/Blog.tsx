import type { Post, PostMeta } from '../../types'
import LinkedBox from '../LinkedBox'
import styles from './Blog.module.css'

function PostInfo(props: { meta: PostMeta }) {
  return (
    <div class={styles.meta}>
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
  )
}

function Tags(props: { tags: string[] }) {
  return (
    <>
      {props.tags.map(tag => (
        <a href={`/blog/tag/${encodeURIComponent(tag)}`} class={styles.tag}>
          #{tag}
        </a>
      ))}
    </>
  )
}

export function PostListing(props: { posts: Post[]; tag?: string }) {
  return (
    <>
      <h1 class={`title ${styles.title}`}>
        {props.tag === undefined ? (
          'Blog'
        ) : (
          <>
            Posts tagged <code>{props.tag}</code>
          </>
        )}
      </h1>
      {props.tag === undefined && <h1 class={`headline-underline ${styles.heading}`}>All Posts:</h1>}
      <div class={styles.listing}>
        <ul>
          {props.posts.map(post => (
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
                <p class={styles.description} innerHTML={post.meta.description} />
              </LinkedBox>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function PostPage(props: { post: Post }) {
  return (
    <>
      <div class={styles.header}>
        <h1 class={`title ${styles.title}`}>{props.post.meta.title}</h1>
        <PostInfo meta={props.post.meta} />
        <div class={styles.tagbox}>
          <Tags tags={props.post.meta.tags} />
        </div>
      </div>
      <article class="content blogpost" innerHTML={props.post.content} />
    </>
  )
}
