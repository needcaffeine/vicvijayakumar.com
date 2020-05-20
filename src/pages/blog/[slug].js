import React from 'react'
import PropTypes from 'prop-types'

import ErrorPage from 'next/error'
import NextHead from 'next/head'
import { useRouter } from 'next/router'

import DefaultLayout from 'components/Layout/DefaultLayout'
import PostBody from 'components/blog/PostBody'
import { getAllPosts, getPostBySlug, markdownToHtml } from 'utils/blog'

export default function Post({ post }) {
    const router = useRouter()
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <>
            <NextHead>
                <link rel="canonical" href={post.url} />
            </NextHead>
            <DefaultLayout title={post.title} description={post.excerpt}>
                <div className="md:mx-auto lg:col-span-12 lg:text-left">
                    {router.isFallback ? <h1>Loading...</h1> : <PostBody post={post} />}
                </div>
            </DefaultLayout>
        </>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content'])

    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}
