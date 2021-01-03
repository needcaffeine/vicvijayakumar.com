/* eslint-disable react/no-array-index-key */
import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

import DefaultLayout from 'components/Layout/DefaultLayout'
import PostPreview from 'components/blog/PostPreview'
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

                <div className="px-6 py-6 mx-auto bg-purple-600 rounded-md md:p-8 lg:p-12">
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        Want to hear more from me about coding, building things, and just life in
                        general?
                    </h2>
                    <p className="max-w-3xl mt-3 text-lg leading-6 text-purple-200">
                        I send out emails about once a month talking about any new blog posts, what
                        I&rsquo;m learning, and maybe a dad joke or two. Unsubscribe at any time.
                    </p>

                    <div className="mt-4 sm:w-full sm:max-w-md">
                        <div id="mc_embed_signup">
                            <form
                                action="https://vicvijayakumar.us7.list-manage.com/subscribe/post?u=9ad3311be3bf1c7f63f2eca24&amp;id=713a5b95a4"
                                method="post"
                                id="mc-embedded-subscribe-form"
                                name="mc-embedded-subscribe-form"
                                className="sm:flex"
                                target="_blank"
                                noValidate={true}
                            >
                                <label htmlFor="mce-EMAIL" className="sr-only">
                                    Email address
                                    <div
                                        style={{ position: 'absolute', left: '-5000px' }}
                                        aria-hidden="true"
                                    >
                                        <input
                                            type="text"
                                            name="b_9ad3311be3bf1c7f63f2eca24_713a5b95a4"
                                            tabIndex="-1"
                                            defaultValue=""
                                        />
                                    </div>
                                </label>

                                <input
                                    id="mce-EMAIL"
                                    type="email"
                                    name="EMAIL"
                                    defaultValue=""
                                    autoComplete="email"
                                    className="w-full px-5 py-3 text-black placeholder-gray-500 rounded-md"
                                    placeholder="Enter your email"
                                    required={true}
                                />

                                <input
                                    type="submit"
                                    value="Subscribe"
                                    name="subscribe"
                                    id="mc-embedded-subscribe"
                                    className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow cursor-pointer hover:bg-indigo-400 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                                />
                            </form>
                        </div>
                    </div>
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
