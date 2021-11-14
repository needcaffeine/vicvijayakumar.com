/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'

import type { AppProps } from 'next/app'

import 'styles/main.css'
import 'styles/postbody.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
