import Link from 'next/link'

export type Frontmatter = {
    title: string
    description: string
    slug: string
}

const PostPreview = ({ title, description, slug }: Frontmatter) => {
    return (
        <section className="mb-8 postPreview">
            <div className="mb-2">
                <Link as={`/blog/${slug}`} href="/blog/[slug]">
                    <a className="text-2xl leading-normal text-blue-500 dark:hover:text-blue-400 hover:text-gray-700 hover:border-none">
                        {title}
                    </a>
                </Link>
            </div>
            <div className="text-xl">{description}</div>
        </section>
    )
}

export default PostPreview
