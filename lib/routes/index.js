module.exports = [{
  method: 'GET',
  path: '/internal/assets/{name}',
  handler: (request, h) => 'Hello, world!',
}, {
  method: 'GET',
  path: '/dashboard/{name}',
  handler: (request, h) => `Hello! ${JSON.stringify(request.params.name)}`,
}, {
  method: 'GET',
  path: '/',
  handler: (request, h) => 'index with links to dashboards',
},
];
