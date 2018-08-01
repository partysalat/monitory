const websocketService = require('./websocketService');
const jobProcessor = require('./jobProcessor');

module.exports.init = function init(server) {
  websocketService.init(server);
  jobProcessor.start();
};
