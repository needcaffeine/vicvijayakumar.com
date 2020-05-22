import React from 'react'

import DefaultLayout from 'components/Layout/DefaultLayout'

export default function About() {
    return (
        <DefaultLayout className="about" title="About">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    About
                </h1>

                <div className="mt-8 text-left">
                    <p className="pb-2 leading-relaxed">
                        Hello, I'm Vic.{' '}
                        <span role="img" aria-label="wave">
                            👋🏾
                        </span>{' '}
                    </p>

                    <p className="py-2 leading-relaxed">
                        I am a software engineer working as a full-stack developer on a preprint
                        server. I do frontend work, backend work, SRE work, architecture work, and I
                        enjoy mentoring engineers.
                    </p>

                    <p className="py-2 leading-relaxed">
                        As an indie maker, I also help preschools with my project{' '}
                        <a
                            href="https://www.everyoak.com/"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            Everyoak
                        </a>
                        , and I have a few other small B2C projects.
                    </p>

                    <p className="py-2 leading-relaxed">
                        I enjoy running, biking, disc golf, reading, cooking, making pizza, and I
                        raise backyard chickens and children. I've also recently started learning to
                        play violin at the same time as one of my kids.
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}
