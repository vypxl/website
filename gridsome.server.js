const sanity = './util/sourceSanity.mjs'

module.exports = api => {
    api.loadSource(actions => import(sanity).then(async plugin => {
        await plugin.sourceSanity(actions)
    }))
}

