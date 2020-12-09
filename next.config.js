module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // eslint-disable-next-line global-require
            require('./scripts/postbuild')
        }

        return config
    },
}
