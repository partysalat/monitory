const Joi = require('@hapi/joi');
const { promisify } = require('util');
const glob = require('glob');
const last = require('lodash/last');
const config = require('../config');
const cache = require('../processor/cache');

const globPromise = promisify(glob);
module.exports = () => [
  {
    method: 'GET',
    path: '/dashboards/{name}',
    handler: (request, h) =>
      h.view('dashboard', {
        dashboard: request.params.name,
      }),
  },
  {
    method: 'GET',
    path: '/',
    async handler(request, h) {
      const dashboardGlob = config.get('/dashboards');
      const paths = await globPromise(dashboardGlob, {});
      const files = paths.map((path) => ({
        file: last(path.split('/')).replace('.js', ''),
      }));
      return h.view('index', {
        dashboards: files,
      });
    },
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
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: config.get('/additionalAssetsDir'),
        redirectToSlash: true,
        listing: true,
      },
    },
  },
  {
    method: 'GET',
    path: '/js/{file}',
    handler: {
      directory: {
        path: config.get('/jsAssetsDir'),
        redirectToSlash: true,
        listing: true,
      },
    },
  },
];
