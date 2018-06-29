const fs = require('fs');
const glob = require('glob');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const merge = require('lodash/merge');
const last = require('lodash/last');
const fromPairs = require('lodash/fromPairs');

const serve = require('webpack-serve');

const config = require('./../config');
const webpackConfig = require('./../webpack.config.js');

function compileMain(dashboardGlob) {
  const files = glob.sync(dashboardGlob, { absolute: true }).map(file => [last(file.split('/')), file]);

  const mainTemplate = fs.readFileSync(`${__dirname}/../frontend/main.template.jsx`, 'utf-8');
  return {
    plugins: files.map(([fileName, path]) => new VirtualModulePlugin({
      moduleName: `./tmp/${fileName}`,
      contents: mainTemplate.replace('<%PATH_TO_DASHBOARD%>', path),
    })),
    entries: fromPairs(files.map(([fileName]) => [fileName, `./tmp/${fileName}`])),
  };
}

module.exports.compileAssetsAndStartServer = async function compileAssets() {
  const dashboardGlob = config.get('/dashboards');
  const { plugins, entries } = compileMain(dashboardGlob);
  return serve({
    config: merge({}, webpackConfig, {
      entry: entries,
      plugins,
      serve: {
        port: config.get('/assetsPort'),
      },
    }),
  });
};

