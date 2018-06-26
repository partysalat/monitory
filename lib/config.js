const Confidence = require('confidence');
const rootPath = require('app-root-path');

const store = new Confidence.Store();
const DEFAULT_CONFIG = {
  port: 1337,
  assetsPort: 1338,
  dashboardsPath: `${rootPath}/dashboards`,
};
// Todo: Add joi Validation
module.exports.load = (providedConfig) => {
  store.load(Object.assign({}, DEFAULT_CONFIG, providedConfig));
};


module.exports.get = key => store.get(key, {});
