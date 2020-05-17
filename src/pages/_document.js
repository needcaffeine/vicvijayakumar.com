/* eslint react/no-danger: 0 */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

const tagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export default class MyDocument extends Document {
    render() {
        return (
            <Html className="bg-white" lang="en">
                <Head>
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
                </Head>

                <body className="font-sans antialiased leading-normal text-gray-900">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
