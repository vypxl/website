module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:gridsome/recommended'
  ],
  plugins: [
    'prettier',
    'gridsome',
  ],
  rules: {
    "vue/no-unused-components": 0,
  }
}
