const { withPlausibleProxy } = require('next-plausible')
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer()(
    withPlausibleProxy()({
        swcMinify: true,
        webpack: (config, { isServer }) => {
            if (isServer) {
                // eslint-disable-next-line global-require
                require('./scripts/postbuild')
            }

            return config
        },
    })
)
