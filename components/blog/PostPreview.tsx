import Link from 'next/link'

export type Frontmatter = {
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

const PostPreview = ({ frontmatter, slug }: { frontmatter: Frontmatter; slug: string }) => {
    return (
        <section className="mb-8 postPreview">
            <div className="mb-2">
                <Link as={`/blog/${slug}`} href="/blog/[slug]">
                    <a className="text-2xl leading-normal text-blue-500 dark:hover:text-blue-400 hover:text-gray-700 hover:border-none">
                        {frontmatter.title}
                    </a>
                </Link>
            </div>
            <div className="text-xl">{frontmatter.description}</div>
        </section>
    )
}

export default PostPreview
