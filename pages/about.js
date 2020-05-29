import React from 'react'

import DefaultLayout from 'components/Layout/DefaultLayout'

export default function About() {
    return (
        <DefaultLayout className="about" title="About Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Hello, I'm Vic{' '}
                    <span role="img" aria-label="wave">
                        👋🏾
                    </span>
                </h1>

                <div className="mt-8 text-left">
                    <p>
                        I'm a software engineer in Raleigh, North Carolina, currently working as a
                        full-stack developer in scientific publishing. I am comfortable with
                        frontend work, backend work, SRE, architecture, and I really enjoy mentoring
                        engineers and clearing roadblocks.
                    </p>

                    <p>
                        I consider Raleigh my home, but I grew up in India, Somalia, and Kenya. I
                        have a Bachelor's degree in Computer Engineering from Iowa State University.
                    </p>

                    <p>
                        I am also an indie maker, helping preschools with my project{' '}
                        <a
                            href="https://www.everyoak.com/"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            Everyoak
                        </a>
                        , and in addition, I also have a few other small B2C projects.
                    </p>

                    <p>
                        I enjoy running, biking, disc golf, reading, cooking, making pizza, and I
                        raise backyard chickens and children. I've also recently started learning to
                        play violin at the same time as one of my kids.
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}
