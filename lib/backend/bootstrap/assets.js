const fs = require('fs');
const glob = require('glob');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const merge = require('lodash/merge');
const last = require('lodash/last');
const fromPairs = require('lodash/fromPairs');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');

const logger = require('../utils/logger');

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

module.exports.compileAssets = (dashboardGlob, jsAssetsDir) => {
  const { plugins, entries } = compileMain(dashboardGlob);
  const options = merge({}, webpackConfig, {
    output: {
      path: jsAssetsDir,
    },
    entry: entries,
    plugins,
  });
  logger.info('Compiling webpack assets ...');
  return webpackPromise(options);
};

function webpackPromise(options) {
  return new Promise((resolve, reject) => {
    webpack(options, (err, data) => {
      if (err) {
        return reject(err);
      }
      logger.info('Compiling webpack assets finished!');
      resolve(data);
    });
  });
}
