const monitory = require('../lib');

monitory.start({
  port: 1337,
  assetsPort: 1338,
  dashboardsPath: `${__dirname}/dashboards`,
});

