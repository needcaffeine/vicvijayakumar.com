import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const ROOT = process.cwd()
export const POSTS_PATH = path.join(ROOT, 'data/blog')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((p) => /\.mdx?$/.test(p))

const getFileContent = (filePath: string) =>
    fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8')

const getCompiledMDX = async (mdxSource: string) => {
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }

    // Add your remark and rehype plugins here
    const remarkPlugins = [remarkGfm]
    const rehypePlugins = [
        rehypePrism,
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'append',
                properties: { class: 'headingLink' },
                content: {
                    type: 'text',
                    value: '#',
                },
            },
        ],
    ]

    try {
        return await bundleMDX({
            source: mdxSource,
            xdmOptions(options: any) {
                // this is the recommended way to add custom remark/rehype plugins:
                // The syntax might look weird, but it protects you in case we add/remove
                // plugins in the future.
                options.remarkPlugins = [...(options.remarkPlugins ?? []), ...remarkPlugins]
                options.rehypePlugins = [...(options.rehypePlugins ?? []), ...rehypePlugins]

                return options
            },
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const getPostBySlug = async (slug: string) => {
    const mdxSource = getFileContent(`${slug}.mdx`)
    const { code, frontmatter } = await getCompiledMDX(mdxSource)

    return {
        code,
        frontmatter,
        githubLink: `${process.env.NEXT_PUBLIC_GITHUB_PATH}/data/blog/${slug}.mdx`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
    }
}

export const getAllPosts = () => {
    return postFilePaths.map((filePath) => {
        const slug = filePath.replace(/\.mdx?$/, '')
        const source = getFileContent(filePath)

        // Grey matter does provide us the content as well, but we want compiled mdx.
        const { data } = matter(source)

        return {
            frontmatter: data,
            slug,
        }
    })
}
