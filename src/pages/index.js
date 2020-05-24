import React from 'react'
import Link from 'next/link'

import DefaultLayout from 'components/Layout/DefaultLayout'

export default function Index() {
    return (
        <DefaultLayout className="homepage" title="Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <img
                    className="object-cover w-24 h-24 mb-4 rounded-full"
                    src="/static/img/vic-portrait.png"
                    alt="Vic portrait"
                />
                <h1 className="mt-1 text-3xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-5xl lg:text-5xl xl:text-6xl">
                    Hello, I&rsquo;m Vic. I am a software engineer and indie maker in Raleigh, NC.
                </h1>

                <div className="mt-8 text-left">
                    <Link href="/about">
                        <a>About</a>
                    </Link>

                    <Link href="/blog">
                        <a>Blog</a>
                    </Link>

                    <Link href="/uses">
                        <a>Uses</a>
                    </Link>
                </div>
            </div>
        </DefaultLayout>
    )
}
