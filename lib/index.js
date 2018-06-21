const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const merge = require('lodash/merge');
const fromPairs = require('lodash/fromPairs');
const fs = require('fs');
const rootPath = require('app-root-path');
const serve = require('webpack-serve');

const config = require('./webpack.config.js');
const routes = require('./routes');

async function startServer(port) {
  const server = new Hapi.Server({
    port,
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

async function compileAssets(port, dashboardPath) {
  return serve({
    config: merge({}, config, {
      entry: fromPairs(fs.readdirSync(dashboardPath).map(dashboard => [dashboard, `${dashboardPath}/${dashboard}`])),
      serve: { port },
    }),
  });
}
console.log('ROOTPATH', rootPath);
module.exports.start = async function start({
  port = 1337,
  assetsPort = 1338,
  dashboardsPath = `${rootPath}/dashboards`,
}) {
  const server = await startServer(port);
  await compileAssets(assetsPort, dashboardsPath);

  console.log('Monitory started at:', server.info.uri);
};

