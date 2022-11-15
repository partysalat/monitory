const monitory = require('..');

monitory.start({
  port: 1337,
  dashboards: `${__dirname}/dashboards/*`,
  jobs: `${__dirname}/jobs/*`,
  jobsParallelism: 2,
  jsAssetsDir: `${__dirname}/dist`,
  additionalAssetsDir: `${__dirname}/assets`,
  startServer: true,
  logFormatter: (level, message, ...rest) => [
    JSON.stringify({
      date: new Date().toISOString(),
      message,
      additionalData: level === 'error' ? rest[0].message : [],
    }),
  ],
  compileAssets: true,
  onInit: async () => {},
});
