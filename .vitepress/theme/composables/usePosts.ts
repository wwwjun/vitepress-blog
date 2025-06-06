// composables/usePosts.ts
export function usePosts() {
    const pages = import.meta.glob('/posts/*.md', { eager: true })
    console.log('pages------', pages)
    const posts = Object.entries(pages).map(([path, mod]: any) => {
        console.log('path------', path)

        const frontmatter = mod.__pageData.frontmatter

        return {
            ...frontmatter,
            path: path
                .replace('../../posts/', '/posts/')
                .replace(/\.md$/, ''),
        }
    })
    console.log('posts------', posts)
    // 按时间倒序排列
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
}
