module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "import"
  ],
  "parser":'babel-eslint',
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
  },
  rules:{
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [1, {'forbid':[]}]
  }


};