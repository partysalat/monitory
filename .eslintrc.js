module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'import', 'jest', 'prettier'],
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    document: true,
    window: true,
    'jest/globals': true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [1, { forbid: [] }],
    'react/require-default-props': [0],
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [0],
    'react/no-unused-prop-types': [0],
    'no-use-before-define': [0],
    'template-curly-spacing': 'off',
    indent: 'off',
  },
};
