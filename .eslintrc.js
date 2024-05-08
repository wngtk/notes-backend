module.exports = {
    'esinglnv': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true,
        'jest': true
    },
    'plugins': [
        '@stylistic/js'
    ],
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0,
        '@stylistic/js/indent': [ 'error', 4 ],
        '@stylistic/js/linebreak-style': [ 'error', 'unix' ],
        '@stylistic/js/quotes': [ 'error', 'single' ],
        '@stylistic/js/semi': [ 'error', 'never' ]
    }
}
