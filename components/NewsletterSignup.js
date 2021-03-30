export default function NewsletterSignup() {
    return (
        <div id="newsletter" className="mt-10">
            <div className="px-6 py-6 mx-auto bg-purple-600 rounded-md md:p-8 lg:p-12">
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Want to hear more from me about coding, building things, and just life in
                    general?
                </h2>
                <p className="max-w-3xl mt-3 text-lg leading-6 text-purple-200">
                    I send out emails about once a month talking about any new blog posts, what
                    I&rsquo;m learning, and maybe a dad joke or two. Unsubscribe at any time.
                </p>
                <div className="mt-4 sm:w-full sm:max-w-md">
                    <div id="revue-embed">
                        <form
                            action="https://www.getrevue.co/profile/vicvijayakumar/add_subscriber"
                            method="post"
                            id="revue-form"
                            name="revue-form"
                            className="sm:flex"
                        >
                            <input
                                className="w-full px-5 py-3 text-black placeholder-gray-500 rounded-md"
                                type="email"
                                name="member[email]"
                                id="member_email"
                                placeholder="Enter your email"
                                autoComplete="email"
                            />

                            <input
                                type="submit"
                                value="Subscribe"
                                name="member[subscribe]"
                                id="member_submit"
                                className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow cursor-pointer hover:bg-indigo-400 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                            />
                        </form>
                        <div className="mt-1 text-xs">
                            By subscribing, you agree with Revue’s{' '}
                            <a
                                target="_blank"
                                className="text-white underline hover:no-underline hover:text-black"
                                rel="noreferrer"
                                href="https://www.getrevue.co/terms"
                            >
                                Terms
                            </a>{' '}
                            and{' '}
                            <a
                                target="_blank"
                                className="text-white underline hover:no-underline hover:text-black"
                                rel="noreferrer"
                                href="https://www.getrevue.co/privacy"
                            >
                                Privacy Policy
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
