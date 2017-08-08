module.exports = {
    root: true,
    extends: ['eslint-config-hapi', 'plugin:react/recommended'],
    parserOptions: {
        sourceType: 'module'
    },
    "rules": {
        "no-console": 2,
        "curly": 1
    },
    plugins: ['react']
};
