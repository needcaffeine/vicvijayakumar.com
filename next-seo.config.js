const title = 'Vic Vijayakumar'
const description = 'Hi, I am Vic. I blog about software engineering and indie making.'

const SEO = {
    title,
    description,
    canonical: 'https://vicvijayakumar.com',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://vicvijayakumar.com',
        title,
        description,
        images: [
            {
                url: 'https://vicvijayakumar.com/static/img/share.jpg',
                alt: title,
                width: 1280,
                height: 720,
            },
        ],
    },
    twitter: {
        handle: '@VicVijayakumar',
        site: '@VicVijayakumar',
        cardType: 'summary_large_image',
    },
}

export default SEO
