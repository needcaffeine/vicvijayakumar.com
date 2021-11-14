import PropTypes from 'prop-types'
import React from 'react'

import Footer from './Footer'
import Head from './Head'
import Navbar from './Navbar'

const DefaultLayout = ({ className, children, title, description, url }) => {
    const metaUrl = url || process.env.NEXT_PUBLIC_BASE_URL

    return (
        <>
            <Head title={title} description={description} url={metaUrl} />

            <Navbar />

            <div className={className}>
                <div className="max-w-screen-lg px-4 mx-auto mt-4">{children}</div>
            </div>

            <Footer />
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
}

DefaultLayout.defaultProps = {
    className: '',
    description: 'Hi, I am Vic. I blog about software engineering and indie making.',
    url: '',
}

export default DefaultLayout
