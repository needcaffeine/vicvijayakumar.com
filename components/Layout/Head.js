/* eslint react/no-danger: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import NextHead from 'next/head'
import { DefaultSeo, NextSeo } from 'next-seo'

import SEO from 'next-seo.config'

const tagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

const Head = ({ description, title, url }) => {
    return (
        <>
            <DefaultSeo {...SEO} />
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description,
                }}
            />
            <NextHead>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <meta name="apple-mobile-web-app-title" content="Vic Vijayakumar" />
                <meta name="application-name" content="Vic Vijayakumar" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="Vic Vijayakumar"
                    href="https://vicvijayakumar.com/rss.xml"
                />
                <link
                    rel="preconnect"
                    href="https://www.googletagmanager.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://www.google-analytics.com"
                    crossOrigin="anonymous"
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tagManagerId}');`,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tagManagerId}" height="0" width="0" style="display:none;visibility:hidden" />`,
                    }}
                />
            </NextHead>
        </>
    )
}

Head.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
}

Head.defaultProps = {
    url: null,
}

export default Head
