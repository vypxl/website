const sourceSanity = require('./util/sourceSanity.js')

module.exports = api => {
    sourceSanity(api)

    // api.onCreateNode(options => {})

    api.configureWebpack({
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-plain-loader',
                },
            ],
        },
    })
}
