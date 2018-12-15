const logger = require('../utils/logger');
const websocketService = require('./websocketService');
const cache = require('./cache');
const EventEmitter = require('events');
const _ = require('highland');

const EVENT_NAME = 'execJob';
const eventEmitter = new EventEmitter();
module.exports.start = (parallelism) => {
  _(EVENT_NAME, eventEmitter)
    .map(({ id, job }) => _(executeJob(id, job))).parallel(parallelism)
    .done(() => {
      // necessary to trigger execution
    });
};

module.exports.queue = (id, job) => {
  eventEmitter.emit(EVENT_NAME, { id, job });
};


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
