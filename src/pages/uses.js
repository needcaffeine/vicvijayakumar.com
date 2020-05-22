import React from 'react'

import DefaultLayout from 'components/Layout/DefaultLayout'

export default function Uses() {
    return (
        <DefaultLayout className="uses" title="Uses">
            <div className="md:mx-auto lg:col-span-12 lg:text-left">
                <h1 className="mt-1 text-4xl font-medium leading-10 tracking-tight text-left text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Uses
                </h1>

                <div className="mt-6 font-light">Last updated: May 20, 2020</div>

                <div className="mt-8 text-left">
                    <p>This is a list of my hardware, software, and other tools I use regularly.</p>
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
                                VIVO Dual Monitor desk mount
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
                        <li>Apple MacBook Pro (15", 2019)</li>
                        <li>
                            <a
                                href="https://www.yubico.com/product/yubikey-5c-nano"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                YubiKey 5C Nano
                            </a>
                        </li>
                        <li>ASUS 26" LCD monitor x 2</li>
                        <li>
                            Beats Studio<sup>3</sup> headphones
                        </li>
                    </ul>
                    <h4>On the go</h4>
                    <ul>
                        <li>Powerbeats Pro wireless headphones</li>
                        <li>Kindle Paperwhite</li>
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
                            </a>
                        </li>
                        <li>
                            Night Owl by{' '}
                            <a
                                href="https://twitter.com/sarah_edo"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Sarah Drasner
                            </a>
                        </li>
                    </ul>
                    <h4>Other applications that are always open</h4>
                    <ul>
                        <li>Docker</li>
                        <li>Firefox - my daily browser</li>
                        <li>iTerm2</li>
                        <li>
                            KeepingYouAwake - prevents my Mac from going to sleep when I'm making
                            lunch
                        </li>
                        <li>Notion</li>
                        <li>Slack</li>
                        <li>Spectacle - window management</li>
                        <li>Spotify</li>
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
