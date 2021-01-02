import Link from 'next/link'
import React from 'react'

import DefaultLayout from 'components/Layout/DefaultLayout'

export default function About() {
    return (
        <DefaultLayout className="about" title="About Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Hello, I&rsquo;m Vic{' '}
                    <span role="img" aria-label="wave">
                        👋🏾
                    </span>
                </h1>

                <div className="mt-8 text-lg text-left">
                    <p>
                        I&rsquo;m a principal software engineer working in scientific publishing. I
                        find joy in having a breadth of knowledge across the stack and I really
                        really enjoy mentoring engineers and clearing roadblocks.
                    </p>

                    <p>
                        I live in Raleigh, North Carolina and have spent most of my life here, but I
                        grew up in India, Somalia, and Kenya. I have a Bachelor&rsquo;s degree in
                        Computer Engineering from Iowa State University.
                    </p>

                    <p>
                        I enjoy running, biking, disc golf, reading, food, dadding, growing plants,
                        and I have backyard chickens. I&rsquo;ve also recently started playing
                        violin.
                    </p>

                    <p>
                        I am also an indie maker. You can see my projects{' '}
                        <Link href="/projects">
                            <a>here</a>
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}
