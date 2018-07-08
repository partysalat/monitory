const apiServer = require('./lib/bootstrap/server');
const assetsServer = require('./lib/bootstrap/assets');
const logger = require('./lib/utils/logger');
const config = require('./lib/config');


module.exports.start = async function start(options) {
  config.load(options);
  await assetsServer.compileAssetsAndStartServer();
  const server = await apiServer.startServer();

  logger.info('Monitory started at:', server.info.uri);
};

