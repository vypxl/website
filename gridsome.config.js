module.exports = {
    siteName: 'vypxl',
    siteUrl: 'https://vypxl.io',
    siteDescription: 'vypxl personal website, home for my projects and blog',

    templates: {
        Blogpost: '/blog/post/:slug',
        Tag: '/blog/tag/:slug',
        Series: '/blog/series/:slug',
    },

    plugins: [
        {
            use: '@gridsome/plugin-sitemap',
            options: {
                cacheTime: 600000,
                exclude: [],
                config: {
                    '/blog': {
                        changefreq: 'weekly',
                        priority: 0.8,
                    },
                },
            },
        },
    ],

    transformers: {},
}
