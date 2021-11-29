const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
    swcMinify: true,
    webpack: (config, { isServer }) => {
        if (isServer) {
            // eslint-disable-next-line global-require
            require('./scripts/postbuild')
        }

        return config
    },
})
