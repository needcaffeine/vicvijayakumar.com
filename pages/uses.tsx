import DefaultLayout from 'components/Layout/DefaultLayout'

const Uses = () => {
    return (
        <DefaultLayout className="uses" title="Uses | Vic Vijayakumar">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Uses
                </h1>

                <div className="mt-8 text-lg text-left">
                    <p>
                        This is a list of my hardware, software, and other things I use regularly.
                    </p>

                    <h3 id="hardware">Hardware</h3>
                    <p>
                        When I first started coding professionally in 2004, I did all my work on a
                        Dell Inspiron. I think I first switched to a MacBook Pro in 2010, and have
                        not looked back.
                    </p>

                    <h4>My office</h4>
                    <ul>
                        <li>
                            <a
                                href="https://www.upliftdesk.com"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Uplift Standing Desk V2
                            </a>{' '}
                            +{' '}
                            <a
                                href="https://www.ikea.com/us/en/p/gerton-tabletop-beech-50106773/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                IKEA Gerton beech tabletop
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.amazon.com/gp/product/B009S750LA"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                2 x VIVO Dual Monitor desk mount
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.costco.com/office-star-worksmart-breathable-mesh-seat-and-back-managers-chair.product.100311431.html"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Office Star WorkSmart Breathable Mesh chair
                            </a>
                        </li>
                        <li>Apple MacBook Pro (16&rdquo;, 2019)</li>
                        <li>
                            <a
                                href="https://www.yubico.com/product/yubikey-5c-nano"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                YubiKey 5C Nano
                            </a>
                        </li>
                        <li>ASUS 26&rdquo; LCD monitor x 2</li>
                        <li>
                            <a
                                href="https://www.amazon.com/Dell-P2719HC-Monitor-Full-1080p/dp/B07GDR6TJJ"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Dell 27&rdquo; P2719HC LED monitor x 1
                            </a>
                        </li>
                        <li>
                            Beats Studio<sup>3</sup> headphones
                        </li>
                    </ul>

                    <h4>On the go</h4>
                    <ul>
                        <li>Powerbeats Pro wireless headphones</li>
                        <li>Kindle Paperwhite</li>
                        <li>Apple Watch Series 4</li>
                        <li>Garmin Forerunner 235</li>
                    </ul>

                    <h3 id="software">Software</h3>
                    <p>
                        Every few months, I wipe my laptop and set it up from scratch using my{' '}
                        <a
                            href="https://github.com/needcaffeine/dotfiles.git"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            dotfiles
                        </a>
                        . My dotfiles repo contains scripts that uses Homebrew to set up most to all
                        the applications I use.
                    </p>

                    <h4>Coding environment</h4>
                    <ul>
                        <li>
                            <a
                                href="https://code.visualstudio.com"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Visual Studio Code
                            </a>{' '}
                            +{' '}
                            <a
                                href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Night Owl
                            </a>{' '}
                            theme
                        </li>
                    </ul>

                    <h4>Other applications that are always open</h4>
                    <ul>
                        <li>Apple Music</li>
                        <li>Discord</li>
                        <li>Docker</li>
                        <li>Fig</li>
                        <li>Firefox - my daily browser</li>
                        <li>iTerm2</li>
                        <li>
                            KeepingYouAwake - prevents my Mac from going to sleep when I&rsquo;m
                            making lunch
                        </li>
                        <li>Notion</li>
                        <li>Otter.ai</li>
                        <li>Postman</li>
                        <li>Sequel Ace</li>
                        <li>Slack</li>
                        <li>Spectacle - window management</li>
                    </ul>

                    <h3 id="shoes">My shoes</h3>
                    <ul>
                        <li>Hoka One One Clifton 7</li>
                        <li>Nike Downshifter 11</li>
                        <li>Mizuno Wave Rider 24</li>
                        <li>New Balance 680 V6</li>
                        <li>Altra Torin 4</li>
                    </ul>

                    <p>
                        For more lists like this one, check out{' '}
                        <a href="https://uses.tech" rel="noopener noreferrer" target="_blank">
                            uses.tech
                        </a>
                        .
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Uses
