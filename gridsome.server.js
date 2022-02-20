const content = './util/sourceContent.mjs'

module.exports = api => {
    api.loadSource(actions => import(content).then(async plugin => {
        await plugin.source(actions)
    }))
}

