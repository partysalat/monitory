const apiServer = require('./lib/backend/bootstrap/server');
const assetsServer = require('./lib/backend/bootstrap/assets');
const logger = require('./lib/backend/utils/logger');
const config = require('./lib/backend/config');


module.exports.start = async function start(options) {
  config.load(options);
  if (config.get('/compileAssets')) {
    await assetsServer.compileAssets(
      config.get('/dashboards'),
      config.get('/jsAssetsDir'),
    );
  }
  if (config.get('/startServer')) {
    const server = await apiServer.startServer();
    logger.info('Monitory started at:', server.info.uri);
  }
};

module.exports.teamcityClient = require('./lib/backend/clients/teamcity.client');
module.exports.elkClient = require('./lib/backend/clients/elk.client');
module.exports.graphiteClient = require('./lib/backend/clients/graphite.client');
