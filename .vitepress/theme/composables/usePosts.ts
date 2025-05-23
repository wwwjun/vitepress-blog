// composables/usePosts.ts
export function usePosts() {
  const pages = import.meta.glob('../../posts/*.md', { eager: true })

  const posts = Object.entries(pages).map(([path, mod]: any) => {
    const frontmatter = mod.frontmatter
    return {
      ...frontmatter,
      path: path
        .replace('../../posts/', '/posts/')
        .replace(/\.md$/, ''),
    }
  })

  // 按时间倒序排列
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}
