const functions = require('firebase-functions');

exports.triggerBuild = functions.region('europe-west3').https.onRequest(async (req, res) => {
    const pass = req.query.pass;
    if (pass == functions.config().self.pass) {
        const response = await fetch({
            url: 'https://api.github.com/repos/vypxl/website/dispatches',
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.everest-preview+json',
                'Authorization': `token ${functions.config().github.token}`,
            },
            body: JSON.stringify({
                event_type: 'build',
            })
        });
    }

    res.status(204);
    res.end("");
})
