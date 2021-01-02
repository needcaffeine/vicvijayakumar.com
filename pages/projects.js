import React from 'react'

import DefaultLayout from 'components/Layout/DefaultLayout'

export default function Projects() {
    return (
        <DefaultLayout className="projets" title="Projects | Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    My personal projects{' '}
                    <span role="img" aria-label="tools">
                        🛠
                    </span>
                </h1>

                <div className="mt-8 text-lg text-left">
                    <p>
                        This is a collection of some of the projects I&rsquo;ve worked on in my own
                        time.
                    </p>

                    <div className="grid max-w-lg gap-5 mt-6 lg:grid-cols-3 lg:max-w-none">
                        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                            <div className="flex-shrink-0">
                                <img
                                    className="object-cover w-full h-48"
                                    src="https://images.unsplash.com/photo-1599986905849-ae1d81c10843?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col justify-between flex-1 p-6 dark:bg-gray-800">
                                <div className="flex-1">
                                    <a
                                        href="https://www.everyoak.com"
                                        rel="nofollow noreferrer"
                                        className="text-xl font-semibold text-blue-500 hover:text-blue-400"
                                    >
                                        Everyoak
                                    </a>
                                    <p className="mt-3 text-base">
                                        Everyoak is a preschool management system that helps schools
                                        move all their paperwork online. Everyoak saves huge amounts
                                        of time for both schools as well as caregivers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
