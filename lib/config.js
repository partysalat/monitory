const Confidence = require('confidence');
const rootPath = require('app-root-path');

// Todo: is confidence the right choice?
const store = new Confidence.Store();
const DEFAULT_CONFIG = {
  port: 1337,
  assetsPort: 1338,
  dashboards: `${rootPath}/dashboards/*.js`,
  jobs: `${rootPath}/jobs/*.js`,
};
// Todo: Add joi Validation for providedConfig
module.exports.load = (providedConfig) => {
  store.load(Object.assign({}, DEFAULT_CONFIG, providedConfig));
};


module.exports.get = key => store.get(key, {});
