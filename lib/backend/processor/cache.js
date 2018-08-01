const pick = require('lodash/pick');

const cache = {};
module.exports.set = function set(id, data) {
  cache[id] = data;
  return data;
};
module.exports.getCachedDataFor = function getCachedDataFor(jobIds) {
  return pick(cache, jobIds);
};
