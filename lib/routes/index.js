const config = require('../config');

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
];
