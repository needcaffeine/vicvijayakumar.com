import Project from 'components/Project'
import DefaultLayout from 'components/Layout/DefaultLayout'

const Projects = () => {
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
                    <p>This is a collection of some of my projects.</p>

                    <div className="grid max-w-lg gap-5 mt-6 md:grid-cols-3 md:max-w-none">
                        <Project
                            title="Everyoak"
                            description="Everyoak is a preschool management system that helps schools move all
                            their paperwork online. Everyoak saves huge amounts of time for both
                            schools as well as caregivers."
                            url="https://www.everyoak.com/"
                            status="active"
                            image="https://images.unsplash.com/photo-1599986905849-ae1d81c10843?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                        />

                        <Project
                            title="Dog Ears"
                            description="Dog Ears helps Twitter users instantly search their likes and retweets."
                            url="https://dogears.xyz/"
                            status="inactive"
                            image="https://images.unsplash.com/photo-1516726283839-a493d9f167aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        />

                        <Project
                            title="Heimdall"
                            description="Heimdall is a program that allows you to programmatically connect to different AWS EC2 hosts via a Bastion/Jump host."
                            url="https://github.com/needcaffeine/heimdall"
                            status="active"
                            image="https://images.unsplash.com/photo-1564159716326-6f5fcc32ba05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Projects
