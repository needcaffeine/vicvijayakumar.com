/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import DefaultLayout from 'components/Layout/DefaultLayout'
import { getAllPosts } from 'utils/blog'

export default function Index({ allPosts }) {
    return (
        <DefaultLayout className="homepage" title="Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <img
                    className="object-cover w-24 h-24 mb-4 rounded-full"
                    src="/static/img/vic-portrait.png"
                    alt="Vic portrait"
                />
                <h1 className="mt-1 text-3xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-5xl lg:text-5xl xl:text-6xl">
                    Hello, I&rsquo;m Vic. I am a software engineer and indie maker.
                </h1>

                <div className="mt-12 text-left">
                    <h2 className="mb-5 text-2xl font-semibold">All my writings</h2>

                    {allPosts.map((post, i) => (
                        <section key={i} className="justify-between py-1 md:flex md:text-2xl">
                            <div className="mb-8 max-w-80">
                                <div className="mb-2">
                                    <Link href={`/blog/${post.slug}`}>
                                        <a className="text-2xl hover:text-gray-700 hover:underline">
                                            {post.title}
                                        </a>
                                    </Link>
                                </div>
                                <div className="text-xl">{post.excerpt}</div>
                            </div>
                        </section>
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
    const allPosts = await getAllPosts(['title', 'date', 'excerpt', 'slug'])

    allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))

    return {
        props: { allPosts },
    }
}
