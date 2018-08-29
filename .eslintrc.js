module.exports = {
  "extends": ["airbnb", "plugin:jest/recommended"],
  "plugins": [
    "react",
    "import",
    "jest"
  ],
  "parser": 'babel-eslint',
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "document": true,
    "window": true,
    "jest/globals": true
  },
  rules: {
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "react/forbid-prop-types": [1, {'forbid': []}],
    "react/require-default-props": [0],
    "react/prop-types": [0],
    "react/no-unused-prop-types": [0]
  }


};