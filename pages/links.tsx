import DefaultLayout from 'components/Layout/DefaultLayout'

const LinksPage = () => {
    return (
        <DefaultLayout className="links" title="Links | Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Links
                </h1>

                <div className="mt-8 text-lg text-left">
                    <p>Super important links to things.</p>

                    <h2 className="mt-6 mb-4 text-2xl font-semibold leading-snug">
                        Featured projects
                    </h2>
                    <ul>
                        <li>
                            <a href="https://www.everyoak.com">Everyoak</a> - a preschool management
                            system that helps schools move their paperwork online
                        </li>
                        <li>
                            <a href="https://github.com/needcaffeine/heimdall">Heimdall</a> - a
                            program that allows you to programmatically connect to AWS EC2 hosts via
                            a Bastion
                        </li>
                        <li>
                            <a href="https://meetsweats.com/">Meetsweats</a> - the phenomenon that
                            is taking the internet by storm
                        </li>
                        <li>
                            <a href="https://engineeringadvice.dev/">
                                Engineering Advice You Didn&rsquo;t Ask For
                            </a>{' '}
                            - a weekly engineering leadership podcast.
                        </li>
                    </ul>

                    <h2 className="mt-6 mb-4 text-2xl font-semibold leading-snug">Other</h2>
                    <ul>
                        <li>
                            <a
                                href="https://virtualcoffee.io/podcast/0104-vic-vijayakumar/"
                                rel="noreferrer nofollow"
                            >
                                Virtual Coffee podcast ep 0104
                            </a>{' '}
                            - I spoke about Indie Hacking, and my take on when to ship, what to
                            focus on, etc.
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/watch?v=yVacRISm0t4"
                                rel="noreferrer nofollow"
                            >
                                Building minimum viable products with low-code tools
                            </a>{' '}
                            - part of Virtual Coffee Lightning Talks 2021
                        </li>
                        <li>
                            <a href="https://dogears.xyz">Dog Ears</a> (inactive) - helps Twitter
                            users instantly search their likes and retweets
                        </li>
                    </ul>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default LinksPage
