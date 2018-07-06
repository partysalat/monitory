const Joi = require('joi');
const config = require('../config');
const cache = require('../processor/cache');

module.exports = [{
  method: 'GET',
  path: '/dashboards/{name}',
  handler: (request, h) => h.view('dashboard', {
    dashboard: request.params.name,
    assetsPort: config.get('/assetsPort'),
  }),
}, {
  method: 'GET',
  path: '/',
  handler: () => 'index with links to dashboards',
},
{
  method: 'POST',
  path: '/job-data',
  handler: (request) => {
    const jobIds = request.payload.ids;
    return cache.getCachedDataFor(jobIds);
  },
  options: {
    validate: {
      payload: {
        ids: Joi.array().min(1).items(Joi.string()),
      },
    },
  },
},
];
