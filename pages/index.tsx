/* eslint-disable react/no-array-index-key */

import { getAllPosts } from '@/utils/mdx'
import PostPreview from '@/components/blog/PostPreview'
import DefaultLayout from '@/components/Layout/DefaultLayout'
import NewsletterSignup from '@/components/NewsletterSignup'

export type Frontmatter = {
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

type Post = {
    slug: string
    frontmatter: Frontmatter
}

const IndexPage = ({ posts }: { posts: Post[] }) => {
    return (
        <DefaultLayout className="homepage" title="Home">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Hello, I&rsquo;m Vic{' '}
                    <span role="img" aria-label="wave">
                        👋🏾
                    </span>
                </h1>

                <div className="mt-8 text-2xl text-left">
                    <p>
                        I&rsquo;m a software engineer, runner, dad, and indie maker currently living
                        in Raleigh, NC.
                    </p>
                </div>

                <NewsletterSignup />

                <div className="mt-12 text-left">
                    <h2 className="mb-3 text-2xl font-semibold">Writing</h2>
                    <p className="mb-8 text-xl leading-normal">
                        This is my personal website. What you see below are a collection of my
                        thoughts, insights, and sometimes just public documentation. I&rsquo;ve
                        realized that if I try to get my thoughts <b>perfect</b> before hitting
                        publish they will never see the light of day. So strap yourself in and read
                        the things I was happy to put out into the world, freed from expectations.
                    </p>

                    {posts.map((post) => (
                        <PostPreview
                            key={post.slug}
                            slug={post.slug}
                            frontmatter={post.frontmatter}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}

export default IndexPage

export const getStaticProps = async () => {
    const posts = getAllPosts()
    posts.sort((a, b) => (a.frontmatter.updatedAt > b.frontmatter.updatedAt ? -1 : 1))

    return { props: { posts } }
}
