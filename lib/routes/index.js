const Joi = require('joi');
const config = require('../config');
const cache = require('../processor/cache');

module.exports = [{
  method: 'GET',
  path: '/dashboard/{name}',
  handler: (request, h) => h.view('dashboard', {
    dashboard: request.params.name,
    assetsPort: config.get('/assetsPort'),
  }),
}, {
  method: 'GET',
  path: '/',
  handler: (request, h) => 'index with links to dashboards',
},
{
  method: 'POST',
  path: '/job-data',
  // config: {
  //   id: 'jobData',
  handler: (request, h) => {
    const jobIds = request.payload.ids;
    return cache.getCachedDataFor(jobIds);
  },
  // },
  options: {
    validate: {
      payload: {
        ids: Joi.array().min(1).items(Joi.string()),
      },
    },
  },
},
];
