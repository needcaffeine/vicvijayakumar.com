import React from 'react'
import PropTypes from 'prop-types'
import hydrate from 'next-mdx-remote/hydrate'

import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import DefaultLayout from 'components/Layout/DefaultLayout'
import PostBody from 'components/blog/PostBody'
import Share from 'components/blog/Share'
import { getAllSlugs, getPostBySlug } from 'utils/blog'

export default function Post({ githubLink, post, data, url }) {
    const router = useRouter()
    if (!router.isFallback && !data?.title) {
        return <ErrorPage statusCode={404} />
    }

    const content = hydrate(post)

    return (
        <>
            <DefaultLayout title={data.title} description={data.description} url={url}>
                <div className="md:mx-auto lg:col-span-12 lg:text-left">
                    <PostBody
                        title={data.title}
                        date={data.updatedAt}
                        content={content}
                        githubLink={githubLink}
                    />

                    <Share url={url} title={data.title} />
                </div>
            </DefaultLayout>
        </>
    )
}

Post.propTypes = {
    githubLink: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
}

export async function getStaticProps({ params }) {
    const { githubLink, post, data, url } = await getPostBySlug(params.slug)

    return {
        props: {
            githubLink,
            post,
            data,
            url,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: getAllSlugs(),
        fallback: false,
    }
}
