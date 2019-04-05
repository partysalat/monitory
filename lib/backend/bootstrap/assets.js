const fs = require('fs');
const glob = require('glob');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const merge = require('lodash/merge');
const isEmpty = require('lodash/isEmpty');
const last = require('lodash/last');
const fromPairs = require('lodash/fromPairs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');

const logger = require('../utils/logger');

function fileNameFromPath(filePath) {
  return path.basename(filePath);
}

function compileMain(dashboardGlob) {
  const mainTemplate = fs.readFileSync(path.resolve(__dirname, '..', '..', 'frontend', 'main.template.jsx'), 'utf-8');
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
  if (isEmpty(entries)) {
    logger.error(`Glob ${dashboardGlob} does not match any files, exit.`);
    process.exit(1);
  }

  const options = merge({}, webpackConfig, {
    output: {
      path: jsAssetsDir,
    },
    entry: entries,
    plugins,
  });
  const startTime = new Date().getTime();
  logger.info(`Compiling webpack assets to ${jsAssetsDir}: ${JSON.stringify(entries)}`);
  return webpackPromise(options).then((data) => {
    logger.info(`Compiling webpack assets finished! Took ${(new Date().getTime() - startTime) / 1000} seconds`);
    return data;
  });
};

function webpackPromise(options) {
  return new Promise((resolve, reject) => {
    webpack(options, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}
