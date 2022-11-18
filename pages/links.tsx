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
                            <a href="https://www.heytexting.com">Hey Texting</a> - Two way texting
                            for soloists and small businesses. SMS conversations that work without a
                            phone.
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
                            - a weekly engineering leadership podcast
                        </li>
                        <li>
                            <a href="https://vic.substack.com/">Make All The Things</a> - my monthly
                            newsletter about life as a dad, runner, cook, and software engineer.
                        </li>
                    </ul>

                    <h2 className="mt-6 mb-4 text-2xl font-semibold leading-snug">
                        Podcast appearances
                    </h2>
                    <ul>
                        <li>
                            <a
                                href="https://virtualcoffee.io/podcast/0104-vic-vijayakumar/"
                                rel="noreferrer nofollow"
                            >
                                Virtual Coffee podcast ep 0104
                            </a>{' '}
                            - In this episode, Vic talks about Indie Hacking and gives us his take
                            on when to ship, what to focus on, and the value of diverse opinions in
                            your community.
                        </li>
                        <li>
                            <a
                                href="https://softwaresocial.dev/episodes/when-should-you-let-people-pay-you"
                                rel="noreferrer nofollow"
                            >
                                Software Social Podcast ep 104
                            </a>{' '}
                            - Michele chats with longtime listener Vic Vijayakumar about how to get
                            to the point where he feels comfortable letting people pay for his new
                            shared SMS inbox SaaS, HeyTexting.
                        </li>
                        <li>
                            <a
                                href="https://podrocket.logrocket.com/tech-for-social-good"
                                rel="noreferrer nofollow"
                            >
                                PodRocket S2
                            </a>{' '}
                            - Building tech for social good with low-code tools with Vic Vijayakumar
                            - When Vic Vijayakumar saw his daughter’s preschool struggling with an
                            inefficient and non-digital admissions process, he decided to lend a
                            hand by building an admissions system using low-code tools with limited
                            costs. He joins us to talk about this project and how other developers
                            can provide impactful tech while cutting time and costs.
                        </li>
                        <li>
                            <a
                                href="https://anchor.fm/data-and-dev/episodes/Vic-Vijayakumar---Looking-at-the-arc-of-a-Software-Engineering-career-e1nftvn"
                                rel="noreferrer nofollow"
                            >
                                Data &amp; Dev with Jon and Mel ep 0204
                            </a>{' '}
                            - Looking at the arc of a Software Engineering career
                        </li>

                        <h2 className="mt-6 mb-4 text-2xl font-semibold leading-snug">Talks</h2>
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
                            <a
                                href="https://www.youtube.com/watch?v=4_nxvVTNY9s&t=21868s"
                                rel="noreferrer nofollow"
                            >
                                Building tech for social good with low-code tools
                            </a>{' '}
                            - a lightning talk given at Remix Conf 2022
                        </li>
                    </ul>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default LinksPage
