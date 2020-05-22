import PropTypes from 'prop-types'
import React from 'react'

import Head from './Head'
import Navbar from './Navbar'

function DefaultLayout({ className, children, title, description }) {
    return (
        <>
            <Head title={title} description={description} />

            <Navbar />

            <div className={className}>
                <div className="max-w-screen-lg px-4 mx-auto mt-4 sm:mt-12 sm:px-6 md:mt-16 xl:mt-12">
                    {children}
                </div>
            </div>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
}

DefaultLayout.defaultProps = {
    className: '',
    description: "Hi, I'm Vic Vijayakumar. Stay a while, have some tea.",
    title: 'Home',
}

export default DefaultLayout
