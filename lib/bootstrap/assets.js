const fs = require('fs');
const glob = require('glob');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const merge = require('lodash/merge');
const last = require('lodash/last');
const fromPairs = require('lodash/fromPairs');

const serve = require('webpack-serve');

const config = require('./../config');
const webpackConfig = require('./../webpack.config.js');

function fileNameFromPath(filePath) {
  return last(filePath.split('/'));
}

function compileMain(dashboardGlob) {
  const files = glob.sync(dashboardGlob, { absolute: true })
    .map(path => [fileNameFromPath(path), path]);

  const mainTemplate = fs.readFileSync(`${__dirname}/../frontend/main.template.jsx`, 'utf-8');
  return {
    plugins: files.map(([fileName, path]) => new VirtualModulePlugin({
      moduleName: `./${fileName}`,
      contents: mainTemplate.replace('<%PATH_TO_DASHBOARD%>', path),
    })),
    entries: fromPairs(files.map(([fileName]) => [fileName, `./${fileName}`])),
  };
}

module.exports.compileAssetsAndStartServer = function compileAssets() {
  const dashboardGlob = config.get('/dashboards');
  const assetsServerPort = config.get('/assetsPort');
  const { plugins, entries } = compileMain(dashboardGlob);
  return serve({}, {
    config: merge({}, webpackConfig, {
      entry: entries,
      plugins,
      serve: {
        port: assetsServerPort,
      },
    }),
  });
};

