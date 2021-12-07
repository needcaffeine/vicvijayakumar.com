import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { useMemo } from 'react'
import DefaultLayout from 'components/Layout/DefaultLayout'
import PostBody from 'components/blog/PostBody'
import Share from 'components/blog/Share'
import { getAllPosts, getPostBySlug } from 'utils/mdx'
import { getMDXComponent } from 'mdx-bundler/client'

export type Frontmatter = {
    title: string
    description: string
    readingTime: {
        text: string
    }
    createdAt: Date
    updatedAt: Date
}

const Post = ({
    code,
    frontmatter,
    githubLink,
    url,
}: {
    code: string
    frontmatter: Frontmatter
    githubLink: string
    url: string
}) => {
    const Component = useMemo(() => getMDXComponent(code), [code])

    const router = useRouter()
    if (!router.isFallback && !frontmatter?.title) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <DefaultLayout title={frontmatter.title} description={frontmatter.description} url={url}>
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <PostBody
                    title={frontmatter.title}
                    date={frontmatter.updatedAt}
                    githubLink={githubLink}
                    readingTime={frontmatter.readingTime}
                >
                    <Component />
                </PostBody>

                <Share url={url} title={frontmatter.title} />
            </div>
        </DefaultLayout>
    )
}

export default Post

export const getStaticProps = async ({ params }) => {
    const { code, frontmatter, githubLink, url } = await getPostBySlug(params.slug)

    return {
        props: {
            code,
            frontmatter,
            githubLink,
            url,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
