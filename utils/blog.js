import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import remark from 'remark'
import html from 'remark-html'

const blogPostsDirectory = '_content/blog'

const staticFilesPath = join(join(process.cwd(), blogPostsDirectory))
const readStaticFile = (filePath) => fs.readFileSync(join(staticFilesPath, filePath), 'utf8')

export function getPostSlugs() {
    return fs.readdirSync(blogPostsDirectory).filter((file) => file.indexOf('.') !== 0)
}

export function getPostBySlug(slug, fields = []) {
    // Sometimes we call this function with the extension, so chop it off.
    const realSlug = slug.replace(/\.md$/, '')
    const fileContents = readStaticFile(`${realSlug}.md`)

    const { data, content } = matter(fileContents)

    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }

        if (data[field]) {
            items[field] = data[field]
        }

        items.url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${realSlug}`

        items.githubLink = `${process.env.NEXT_PUBLIC_GITHUB_PATH}/_content/blog/${realSlug}.md`
    })

    return items
}

export function getAllPosts(fields = []) {
    const slugs = getPostSlugs()

    return slugs.map((slug) => getPostBySlug(slug, fields))
}

export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown)

    return result.toString()
}
