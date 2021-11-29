/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

import 'styles/main.css'
import 'styles/postbody.css'
import 'styles/prism-material-dark.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <PlausibleProvider domain="vicvijayakumar.com">
            <Component {...pageProps} />
        </PlausibleProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
