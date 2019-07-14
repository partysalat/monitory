const glob = require('glob');
const _ = require('lodash');
const Joi = require('joi');
const { CronJob } = require('cron');
const config = require('../config');
const jobQueue = require('./jobQueue');

const JOB_SCHEMA = Joi.object().keys({
  id: Joi.string().required(),
  interval: Joi.number(),
  cron: Joi.string(),
  job: Joi.func().required(),
}).xor('interval', 'cron');


function executeJob(id, job) {
  jobQueue.queue(id, job);
}

function startJob(jobDefinition) {
  const validation = Joi.validate(jobDefinition, JOB_SCHEMA);
  if (validation.error) {
    throw validation.error;
  }
  const {
    id, job, interval, cron,
  } = jobDefinition;

  executeJob(id, job);

  if (interval) {
    setInterval(() => {
      executeJob(id, job);
    }, interval);
  } else {
    // eslint-disable-next-line
    new CronJob(
      cron, (() => {
        executeJob(id, job);
      }), (() => { }),
      true, /* Start the job right now */
      'Europe/Berlin', /* Time zone of this job. */
    );
  }
}

module.exports.start = function start() {
  const jobsGlob = config.get('/jobs');
  const files = glob.sync(jobsGlob, { absolute: true });
  jobQueue.start(config.get('/jobsParallelism'));

  return _.chain(files)
    .map(file => require(file)) // eslint-disable-line
    .flatten()
    .forEach(startJob)
    .value();
};
