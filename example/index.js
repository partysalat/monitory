const monitory = require('../');

monitory.start({
  port: 1337,
  dashboards: `${__dirname}/dashboards/*`,
  jobs: `${__dirname}/jobs/*`,
  jsAssetsDir: `${__dirname}/dist`,
  additionalAssetsDir: `${__dirname}/assets`,
});

