const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const path = require('path')
const prettier = require('prettier')
const RSS = require('rss')

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const POSTS_PATH = path.join(process.cwd(), '_content/blog')
const POST_AUTHOR = 'Vic Vijayakumar'

async function generateSitemap() {
    const files = await globby([
        'pages/**/*.js',
        '_content/blog/*.mdx',
        '!pages/_*.js',
        '!pages/blog/[slug].js',
    ])

    const routes = files.map((file) => {
        const path = file
            .replace('pages', '')
            .replace('_content', '')
            .replace('.js', '')
            .replace('.mdx', '')

        return (route = path === '/index' ? '/' : path)
    })

    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${routes
                .map((route) => {
                    return `<url>
                        <loc>${BASE_URL}${route}</loc>
                    </url>
                    `
                })
                .join('')}
        </urlset>
    `
}

async function generateRSSFeed() {
    const feed = new RSS({
        title: "Hello, I'm Vic.",
        site_url: BASE_URL,
        feed_url: `${BASE_URL}/rss.xml`,
    })

    // get the list of all mdx files inside the POSTS_PATH directory
    const postFilePaths = fs.readdirSync(POSTS_PATH).filter((p) => /\.mdx?$/.test(p))

    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8')
        const { data } = matter(source)

        return {
            data,
            filePath: filePath.replace('.mdx', ''),
        }
    })

    posts
        .sort((a, b) => (a.data.updatedAt > b.data.updatedAt ? -1 : 1))
        .map((post) => {
            feed.item({
                title: post.data.title,
                description: post.data.description,
                date: post.data.updatedAt,
                guid: post.filePath,
                url: `${BASE_URL}/blog/${post.filePath}`,
                author: POST_AUTHOR,
            })
        })

    return feed
}

;(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc')

    const sitemap = await generateSitemap()
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html',
    })
    fs.writeFileSync('public/sitemap.xml', formatted)

    const rss = await generateRSSFeed()
    const xml = rss.xml({ indent: true })
    fs.writeFileSync('public/rss.xml', xml)
})()
