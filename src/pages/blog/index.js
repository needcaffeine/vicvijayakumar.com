/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { format, utcToZonedTime } from 'date-fns-tz'
import Link from 'next/link'

import DefaultLayout from 'components/Layout/DefaultLayout'
import { getAllPosts } from 'utils/blog'

export default function Index({ allPosts }) {
    return (
        <DefaultLayout title="Blog">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Blog
                </h1>

                <div className="mt-8">
                    {allPosts.map((post, i) => (
                        <section key={i} className="justify-between py-1 md:flex md:text-2xl">
                            <div className="max-w-80">
                                <Link href={`/blog/${post.slug}`}>
                                    <a className="hover:text-gray-700 hover:underline">
                                        {post.title}
                                    </a>
                                </Link>
                            </div>
                            <span className="mt-1 mb-6 font-mono text-gray-400 sm:m-0">
                                {format(
                                    utcToZonedTime(post.date, 'America/New_York'),
                                    'yyyy-MM-dd'
                                )}
                            </span>
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
    const allPosts = await getAllPosts(['title', 'date', 'slug'])

    allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))

    return {
        props: { allPosts },
    }
}
