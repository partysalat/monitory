const glob = require('glob');
const forEach = require('lodash/forEach');
const flatten = require('lodash/flatten');
const Joi = require('joi');
const config = require('../config');
const logger = require('../utils/logger');
const websocketService = require('./websocketService');
const cache = require('./cache');

const jobs = [];
function executeJob(id, job) {
  logger.info(`Executing Job with id ${id}`);
  return Promise.resolve(job(cache.getCachedDataFor(id)))
    .then((result) => {
      logger.info(`Retrieved data for Job with id ${id}`);
      cache.set(id, result);
      websocketService.publishResults(id, result);
    })
    .catch((error) => {
      websocketService.publishError(id, error);
      logger.error(`Error while processing ${id}`, error);
    });
}
function startJob(jobDefinition) {
  const validation = Joi.validate(jobDefinition, JOB_SCHEMA);
  if (validation.error) {
    throw validation.error;
  }
  const { id, job, interval } = jobDefinition;
  setTimeout(() => executeJob(id, job), 0);

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


const JOB_SCHEMA = Joi.object().keys({
  id: Joi.string().required(),
  interval: Joi.number(),
  cron: Joi.string(),
  job: Joi.func().required(),
}).xor('interval', 'cron');
