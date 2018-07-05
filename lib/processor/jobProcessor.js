const glob = require('glob');
const forEach = require('lodash/forEach');
const flatten = require('lodash/flatten');
const config = require('../config');
const websocketService = require('./websocketService');
const cache = require('./cache');

const jobs = [];
function executeJob(id, job) {
  return Promise.resolve(job())
    .then((result) => {
      cache.set(id, result);
      websocketService.publishResults(id, result);
    });
}
function startJob({ id, job, interval }) {
  // TODO: validate input with joi
  executeJob(id, job);
  setInterval(() => {
    executeJob(id, job);
  }, interval);
}

module.exports.start = function start() {
  const jobsGlob = config.get('/jobs');
  const files = glob.sync(jobsGlob, { absolute: true });
  forEach(files, (file) => {
    jobs.push(require(file));// eslint-disable-line
  });

  forEach(flatten(jobs), startJob);
};
