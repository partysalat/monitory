const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const H2O2 = require('h2o2');
const Nes = require('nes');
const handlebars = require('handlebars');
const config = require('./../config');
const routes = require('./../routes');
const jobProcessor = require('./../processor');
const logger = require('./../utils/logger');

function initViews(server) {
  server.views({
    engines: {
      html: handlebars,
    },
    relativeTo: __dirname,
    path: Path.join('..', 'views'),
  });
}


module.exports.startServer = async function startServer() {
  try {
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
    await server.register(H2O2);

    server.route(routes(server));
    initViews(server);
    jobProcessor.init(server);

    await server.start();
    return server;
  } catch (e) {
    logger.error(e.message, e);
    return process.exit(1);
  }
};
