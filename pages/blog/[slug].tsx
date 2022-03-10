import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import DefaultLayout from 'components/Layout/DefaultLayout'
import PostBody from 'components/blog/PostBody'
import Share from 'components/blog/Share'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allPosts, Post } from 'contentlayer/generated'

const PostPage = ({ post }: { post: Post }) => {
    const Component = useMDXComponent(post.body.code)

    const router = useRouter()
    if (!router.isFallback && !post?.title) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <DefaultLayout title={post.title} description={post.description} url={post.url}>
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <PostBody
                    title={post.title}
                    date={post.updatedAt}
                    githubLink={post.githubLink}
                    readingTime={post.readingTime}
                >
                    <Component />
                </PostBody>

                <Share url={post.url} title={post.title} />
            </div>
        </DefaultLayout>
    )
}

export default PostPage

export const getStaticProps = async ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)

    return {
        props: {
            post,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = allPosts.map(({ slug }) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
