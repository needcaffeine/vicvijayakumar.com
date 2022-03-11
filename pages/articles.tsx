/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import PostPreview from '@/components/blog/PostPreview'
import DefaultLayout from '@/components/Layout/DefaultLayout'

const ArticlesPage = ({ posts }: { posts: Post[] }) => {
    return (
        <DefaultLayout className="homepage" title="Home">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    All articles
                </h1>

                <div className="mt-12 text-left">
                    {posts.map((post) => (
                        <PostPreview
                            key={post._id}
                            title={post.title}
                            description={post.description}
                            slug={post.slug}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}

export default ArticlesPage

export const getStaticProps = async () => {
    const blogPosts = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))
    })

    // This is a lot of data. Let's provide our page only what it needs.
    const posts = []
    blogPosts.forEach((post: Post) =>
        posts.push({
            _id: post._id,
            title: post.title,
            description: post.description,
            slug: post.slug,
        })
    )

    return { props: { posts } }
}
