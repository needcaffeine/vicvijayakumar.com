import PropTypes from 'prop-types'
import React from 'react'

import Footer from './Footer'
import Head from './Head'
import Navbar from './Navbar'

function DefaultLayout({ className, children, title, description, url }) {
    return (
        <>
            <Head title={title} description={description} url={url} />

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
    title: PropTypes.string,
    url: PropTypes.string,
}

DefaultLayout.defaultProps = {
    className: '',
    description: 'Hi, I am Vic. I blog about software engineering and indie making.',
    title: 'Home',
    url: '',
}

export default DefaultLayout
