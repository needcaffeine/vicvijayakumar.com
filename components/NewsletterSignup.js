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
                    <div id="mc_embed_signup">
                        <form
                            action="https://vicvijayakumar.us7.list-manage.com/subscribe/post?u=9ad3311be3bf1c7f63f2eca24&amp;id=713a5b95a4"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="sm:flex"
                            target="_blank"
                            noValidate={true}
                        >
                            <label htmlFor="mce-EMAIL" className="sr-only">
                                Email address
                                <div
                                    style={{ position: 'absolute', left: '-5000px' }}
                                    aria-hidden="true"
                                >
                                    <input
                                        type="text"
                                        name="b_9ad3311be3bf1c7f63f2eca24_713a5b95a4"
                                        tabIndex="-1"
                                        defaultValue=""
                                    />
                                </div>
                            </label>

                            <input
                                id="mce-EMAIL"
                                type="email"
                                name="EMAIL"
                                defaultValue=""
                                autoComplete="email"
                                className="w-full px-5 py-3 text-black placeholder-gray-500 rounded-md"
                                placeholder="Enter your email"
                                required={true}
                            />

                            <input
                                type="submit"
                                value="Subscribe"
                                name="subscribe"
                                id="mc-embedded-subscribe"
                                className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow cursor-pointer hover:bg-indigo-400 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
