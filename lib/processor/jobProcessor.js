const glob = require('glob');
const forEach = require('lodash/forEach');
const config = require('../config');
const websocketService = require('./websocketService');

const jobs = [];
const cache = {};

function startJob({ id, job, interval }) {
  // TODO: validate input with joi

  setInterval(() => {
    Promise.resolve(job())
      .then((result) => {
        cache[id] = result;
        websocketService.publishResults(id, result);
      });
  }, interval);
}

module.exports.start = function start() {
  const jobsGlob = config.get('/jobs');
  const files = glob.sync(jobsGlob, { absolute: true });
  forEach(files, (file) => {
    jobs.push(require(file));// eslint-disable-line
  });

  forEach(jobs, startJob);
};

