const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const Nes = require('nes');
const config = require('./../config');
const routes = require('./../routes');
const websocketService = require('./../processor/websocketService');
const handlebars = require('handlebars');

function initViews(server) {
  server.views({
    engines: {
      html: handlebars,
    },
    // compileMode: 'sync',
    relativeTo: __dirname,
    path: '../views',
  });
}


module.exports.startServer = async function startServer() {
  const server = new Hapi.Server({
    port: config.get('/port'),
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public'),
      },
    },
  });
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Nes);

  server.route(routes);
  initViews(server);
  websocketService.init(server);

  await server.start();
  return server;
};

