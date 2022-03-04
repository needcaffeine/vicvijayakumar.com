import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html className="bg-white dark:bg-gray-900" lang="en">
                <Head>
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                </Head>

                <body className="font-sans antialiased leading-normal text-gray-900 dark:text-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
