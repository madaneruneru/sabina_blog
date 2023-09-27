import { createContentLoader } from 'vitepress'

interface Post {
  url: string
  excerpt: string | undefined
  author: string
  date: {
    time: number
    string: string
  }
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/posts/*.md', {
  excerpt: '<!-- end -->',
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        url: `/sabina_blog${url}`,
        excerpt,
        author: frontmatter.author,
        date: {
          time: +new Date(frontmatter.date),
          string: frontmatter.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})