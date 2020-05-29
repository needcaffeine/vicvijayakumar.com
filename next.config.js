module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // eslint-disable-next-line global-require
            require('./scripts/generate-sitemap')
        }

        return config
    },
}
