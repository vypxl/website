export interface Post {
  meta: PostMeta
  content: string
}
export interface PostMeta {
  slug: string
  title: string
  description: string
  tags: string[]
  published: string
  readingTime: number
}
