module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "import"
  ],
  "globals": {
    "document": true
  },
  rules:{
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [1, {'forbid':[]}]
  }


};