/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import { format, utcToZonedTime } from 'date-fns-tz'

import styles from './PostBody.module.css'

export default function PostBody({ post }) {
    return (
        <div className={styles.postBody}>
            <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                {post.title}
            </h1>

            <div className="justify-between py-1 mt-6 font-light md:flex">
                <div className="max-w-80">
                    {format(utcToZonedTime(post.date, 'America/New_York'), 'MMMM dd, yyyy')}
                </div>
                <span className="">
                    <a href={post.githubLink} rel="noreferrer nofollow">
                        edit this post
                    </a>
                </span>
            </div>

            <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}

PostBody.propTypes = {
    post: PropTypes.object.isRequired,
}
