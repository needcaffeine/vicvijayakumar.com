import fs from 'fs'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'

export const POSTS_PATH = path.join(process.cwd(), '_content/blog')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((p) => /\.mdx?$/.test(p))

const readStaticFile = (filePath) => fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8')

export const getPostBySlug = async (slug) => {
    const fileName = `${slug}.mdx`
    const fileContents = readStaticFile(fileName)

    const { content, data } = matter(fileContents)

    const mdxSource = await renderToString(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        fileName,
        post: mdxSource,
        data,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
        githubLink: `${process.env.NEXT_PUBLIC_GITHUB_PATH}/_content/blog/${slug}.mdx`,
    }
}

export function getAllPosts() {
    return postFilePaths.map((filePath) => {
        const source = readStaticFile(filePath)
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })
}

export function getAllSlugs() {
    return postFilePaths
        .map((filePath) => filePath.replace(/\.mdx?$/, ''))
        .map((slug) => ({
            params: {
                slug,
            },
        }))
}
