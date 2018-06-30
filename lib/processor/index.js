const websocketService = require('./websocketService');

module.exports.init = function init(server) {
  websocketService.init(server);
};
