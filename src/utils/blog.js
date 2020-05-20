import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import remark from 'remark'
import html from 'remark-html'

const contentDirectory = 'src/_content'

const staticFilesPath = join(join(process.cwd(), contentDirectory))
const readStaticFile = (filePath) => fs.readFileSync(join(staticFilesPath, filePath), 'utf8')

export function getPostSlugs() {
    return fs.readdirSync(`${contentDirectory}/blog`).filter((file) => file.indexOf('.') !== 0)
}

export function getPostBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fileContents = readStaticFile(`blog/${realSlug}.md`)

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
