const Confidence = require('confidence');
const rootPath = require('app-root-path');
const path = require('path');
// Todo: is confidence the right choice?
const store = new Confidence.Store();
const DEFAULT_CONFIG = {
  port: 1337,
  dashboards: `${rootPath}/dashboards/*.js`,
  jobs: `${rootPath}/jobs/*.js`,
  jobsParallelism: Number.MAX_SAFE_INTEGER,
  jsAssetsDir: path.resolve(rootPath.toString(), 'dist'),
  additionalAssetsDir: path.resolve(rootPath.toString(), 'assets'),
  compileAssets: true,
  startServer: true,
};
// Todo: Add joi Validation for providedConfig
module.exports.load = (providedConfig) => {
  store.load(Object.assign({}, DEFAULT_CONFIG, providedConfig));
};


module.exports.get = key => store.get(key, {});
