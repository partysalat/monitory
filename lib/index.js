const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const fs = require('fs');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const merge = require('lodash/merge');
const mapValues = require('lodash/mapValues');
const fromPairs = require('lodash/fromPairs');

const serve = require('webpack-serve');

const config = require('./config');
const webpackConfig = require('./webpack.config.js');
const routes = require('./routes');

async function startServer() {
  const server = new Hapi.Server({
    port: config.get('/port'),
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public'),
      },
    },
  });
  server.route(routes);
  await server.register(Inert);
  await server.start();
  return server;
}


function compileMain(entries) {
  const mainTemplate = fs.readFileSync(`${__dirname}/frontend/main.template.jsx`, 'utf-8');
  return mapValues(entries, (item, key) => ({
    key,
    path: `./tmp/${key}`,
    plugin: new VirtualModulePlugin({
      moduleName: `./tmp/${key}`,
      contents: mainTemplate.replace('<%PATH_TO_DASHBOARD%>', item),
    }),
  }));
}

async function compileAssets() {
  const dashboardPath = config.get('/dashboardsPath');
  const dashboards = fromPairs(fs.readdirSync(dashboardPath).map(dashboard => [dashboard, `${dashboardPath}/${dashboard}`]));
  const tmp = compileMain(dashboards);

  const plugins = Object.values(tmp).map(item => item.plugin);
  const entries = mapValues(tmp, item => item.path);
  return serve({
    config: merge({}, webpackConfig, {
      entry: entries,
      plugins,
      serve: { port: config.get('/assetsPort') },
    }),
  });
}

module.exports.start = async function start(options) {
  config.load(options);
  await compileAssets();
  const server = await startServer();

  console.log('Monitory started at:', server.info.uri);
};

