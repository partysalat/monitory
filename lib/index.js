const apiServer = require('./bootstrap/server');
const assetsServer = require('./bootstrap/assets');

const config = require('./config');


module.exports.start = async function start(options) {
  config.load(options);
  await assetsServer.compileAssetsAndStartServer();
  const server = await apiServer.startServer();

  console.log('Monitory started at:', server.info.uri);
};

