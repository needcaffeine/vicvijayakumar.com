import React from 'react'
import NextHead from 'next/head'
import PropTypes from 'prop-types'

const Head = ({ description, title }) => (
    <NextHead>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Vic Vijayakumar" />
        <meta name="application-name" content="Vic Vijayakumar" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        <meta property="og:title" content="Vic Vijayakumar" />
        <meta property="og:site_name" content="Vic Vijayakumar" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_BASE_URL}/static/img/share.png`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Hello, I'm Vic." />

        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
    </NextHead>
)

Head.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Head
