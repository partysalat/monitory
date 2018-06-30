const monitory = require('../lib');

monitory.start({
  port: 1337,
  assetsPort: 1338,
  dashboards: `${__dirname}/dashboards/*`,
  jobs: `${__dirname}/jobs/*`,
});

