const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const fs = require('fs');
const merge = require('lodash/merge');
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

async function compileAssets() {
  const dashboardPath = config.get('/dashboardsPath');
  return serve({
    config: merge({}, webpackConfig, {
      entry: fromPairs(fs.readdirSync(dashboardPath).map(dashboard => [dashboard, `${dashboardPath}/${dashboard}`])),
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

