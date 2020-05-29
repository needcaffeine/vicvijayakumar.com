import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function PostPreview({ post }) {
    return (
        <section className="mb-8">
            <div className="mb-2">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-2xl text-blue-500 border-b border-blue-500 border-dashed hover:text-gray-700 hover:border-none">
                        {post.title}
                    </a>
                </Link>
            </div>
            <div className="text-xl">{post.description}</div>
        </section>
    )
}

PostPreview.propTypes = {
    post: PropTypes.object.isRequired,
}
