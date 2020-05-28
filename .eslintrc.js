module.exports = {
  env: {
    browser: true,
    es6: true,
    es2017: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:promise/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  }
}
