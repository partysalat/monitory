const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const config = require('./../config');
const routes = require('./../routes');

module.exports.startServer = async function startServer() {
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
};

