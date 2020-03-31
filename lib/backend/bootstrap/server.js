const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const H2O2 = require('@hapi/h2o2');
const Nes = require('@hapi/nes');
const Joi = require('@hapi/joi');
const handlebars = require('handlebars');
const config = require('../config');
const routes = require('../routes');
const jobProcessor = require('../processor');
const logger = require('../utils/logger');

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

    server.validator(Joi);
    await server.register(Inert);
    await server.register(Vision);
    await server.register(Nes);
    await server.register(H2O2);

    server.route(routes());
    initViews(server);
    jobProcessor.init(server);

    await config.get('/onInit')(server);

    await server.start();
    return server;
  } catch (e) {
    logger.error(e.message, e);
    return process.exit(1);
  }
};
