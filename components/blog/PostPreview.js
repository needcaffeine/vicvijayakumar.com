import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function PostPreview({ post }) {
    return (
        <section className="mb-8 postPreview">
            <div className="mb-2">
                <Link as={`/blog/${post.filePath.replace(/\.mdx?$/, '')}`} href="/blog/[slug]">
                    <a className="text-2xl leading-normal text-blue-500 dark:hover:text-blue-400 hover:text-gray-700 hover:border-none">
                        {post.data.title}
                    </a>
                </Link>
            </div>
            <div className="text-xl">{post.data.description}</div>
        </section>
    )
}

PostPreview.propTypes = {
    post: PropTypes.object.isRequired,
}
