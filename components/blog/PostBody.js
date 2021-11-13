/* eslint-disable react/no-danger */
import PropTypes from 'prop-types'
import { format, utcToZonedTime } from 'date-fns-tz'

const PostBody = ({ content, date, githubLink, title }) => {
    return (
        <div className="postBody">
            <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                {title}
            </h1>

            <div className="justify-between py-1 mt-6 font-light md:flex">
                <div className="max-w-80">
                    {format(utcToZonedTime(date, 'America/New_York'), 'MMMM dd, yyyy')}
                </div>
                <span className="">
                    <a href={githubLink} rel="noreferrer nofollow">
                        edit this post
                    </a>
                </span>
            </div>

            <div className="mt-8">{content}</div>
        </div>
    )
}

PostBody.propTypes = {
    content: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default PostBody
