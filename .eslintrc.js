module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        parser: '@babel/eslint-parser',
    },
    extends: [
        'prettier',
        'plugin:prettier/recommended',
        'plugin:vue/recommended',
    ],
    plugins: ['prettier'],
    rules: {
        'vue/no-unused-components': 0,
    },
}
