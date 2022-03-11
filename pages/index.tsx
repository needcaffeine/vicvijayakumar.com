/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import Link from 'next/link'
import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import PostPreview from '@/components/blog/PostPreview'
import DefaultLayout from '@/components/Layout/DefaultLayout'
import NewsletterSignup from '@/components/NewsletterSignup'

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

                <div className="mt-8 text-xl text-left">
                    <p>
                        I&rsquo;m a software engineer in Raleigh, North Carolina. I enjoy running,
                        biking, disc golf, reading, writing, food, dadding, buying plants, playing
                        with dough, playing violin, and raising backyard chickens.
                    </p>

                    <p>
                        I also start a lot of new projects. Some of them are{' '}
                        <Link href="/links">
                            <a>here</a>
                        </Link>
                        .
                    </p>

                    <p>
                        This is my personal website. What you see below are a collection of my
                        thoughts, and sometimes just public documentation. I&rsquo;ve realized that
                        if I try to get my thoughts <b>perfect</b> before hitting publish they will
                        never see the light of day. So strap yourself in and read the things I was
                        happy to put out into the world, freed from expectations.
                    </p>

                    <p>
                        If you want to get in touch with me, you can reply to my newsletter, or via{' '}
                        <a href="https://twitter.com/VicVijayakumar">Twitter</a>.
                    </p>
                </div>

                <div className="mt-12 text-left">
                    <h2 className="mb-6 text-3xl font-semibold">Some personal favorites</h2>

                    {posts.map((post) => (
                        <PostPreview
                            key={post._id}
                            title={post.title}
                            description={post.description}
                            slug={post.slug}
                        />
                    ))}

                    <Link href="/articles">
                        <a className="text-2xl">
                            See all articles{' '}
                            <svg
                                className="inline-block w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>

                <NewsletterSignup />
            </div>
        </DefaultLayout>
    )
}

export default IndexPage

export const getStaticProps = async () => {
    const blogPosts = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))
    })

    // Homepage only shows specific favorite articles.
    const favorites = [
        'basic-data-analysis-unix-linux-tools',
        'the-art-of-writing-good-commit-messages',
        'when-recursion-is-too-slow-fibonacci',
    ]

    const posts = []
    blogPosts.forEach((post: Post) => {
        if (favorites.includes(post.slug)) {
            // This is a lot of data. Let's provide our page only what it needs.
            posts.push({
                _id: post._id,
                title: post.title,
                description: post.description,
                slug: post.slug,
            })
        }
    })

    return { props: { posts } }
}
