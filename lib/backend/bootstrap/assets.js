const fs = require('fs');
const glob = require('glob');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const merge = require('lodash/merge');
const last = require('lodash/last');
const fromPairs = require('lodash/fromPairs');

const serve = require('webpack-serve');

const webpackConfig = require('./../webpack.config.js');

function fileNameFromPath(filePath) {
  return last(filePath.split('/'));
}

function compileMain(dashboardGlob) {
  const mainTemplate = fs.readFileSync(`${__dirname}/../../frontend/main.template.jsx`, 'utf-8');
  let files = glob.sync(dashboardGlob, { absolute: true });

  files = files.map(path => [fileNameFromPath(path), path]);

  return {
    plugins: files.map(([fileName, path]) => new VirtualModulePlugin({
      moduleName: `./${fileName}`,
      contents: mainTemplate.replace('<%PATH_TO_DASHBOARD%>', path),
    })),
    entries: fromPairs(files.map(([fileName]) => [fileName, `./${fileName}`])),
  };
}

module.exports.compileAssetsAndStartServer = (dashboardGlob, assetsServerPort) => {
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
