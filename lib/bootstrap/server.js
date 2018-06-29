const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const config = require('./../config');
const routes = require('./../routes');
const handlebars = require('handlebars');

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

  server.route(routes);
  server.views({
    engines: {
      html: handlebars,
    },
    // compileMode: 'sync',
    relativeTo: __dirname,
    path: '../views',
  });

  server.events.on('log', (event) => {
    console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
  });
  await server.start();
  return server;
};

