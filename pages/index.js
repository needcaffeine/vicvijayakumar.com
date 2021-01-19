/* eslint-disable react/no-array-index-key */
import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

import PostPreview from 'components/blog/PostPreview'
import DefaultLayout from 'components/Layout/DefaultLayout'
import NewsletterSignup from 'components/NewsletterSignup'
import { getAllPosts } from 'utils/blog'

export default function Index({ allPosts }) {
    return (
        <DefaultLayout className="homepage" title="Vic Vijayakumar">
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
                    <p>
                        <Link href="/about">
                            <a>More about me →</a>
                        </Link>
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

                    {allPosts.map((post) => (
                        <PostPreview key={post.filePath} post={post} />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}

Index.propTypes = {
    allPosts: PropTypes.array.isRequired,
}

export async function getStaticProps() {
    const allPosts = await getAllPosts()

    allPosts.sort((a, b) => (a.data.updatedAt > b.data.updatedAt ? -1 : 1))

    return { props: { allPosts } }
}
