/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import React from 'react'

import 'styles/main.css'

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
