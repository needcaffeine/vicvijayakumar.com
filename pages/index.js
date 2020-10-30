/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import DefaultLayout from 'components/Layout/DefaultLayout'
import PostPreview from 'components/blog/PostPreview'
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
                    <h2 className="mb-5 text-2xl font-semibold">Blog</h2>

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

    allPosts.sort((a, b) => (a.data.date > b.data.date ? -1 : 1))

    return { props: { allPosts } }
}
