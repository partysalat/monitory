const Bcrypt = require('bcrypt');
const monitory = require('..');

const users = {
  teammonitor: {
    username: 'teammonitor',
    // password hash can be created by const password = await Bcrypt.hash('mySuperSecretPW', 10);
    password: '$2b$10$vCqEEeK5HPbKSk2KJVwmZ.u0JNWutFqE1bcM300f10DzJ0xmpbMpO', // === alligator3
  },
};
const validate = async (request, username, password) => {
  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };

  return { isValid, credentials };
};

monitory.start({
  port: 1337,
  dashboards: `${__dirname}/dashboards/*`,
  jobs: `${__dirname}/jobs/*`,
  jobsParallelism: 2,
  jsAssetsDir: `${__dirname}/dist`,
  additionalAssetsDir: `${__dirname}/assets`,
  startServer: true,
  compileAssets: true,
  onInit: async (server) => {
    await server.register(require('@hapi/basic'));
    server.auth.strategy('simple', 'basic', { validate });
    server.auth.default('simple');
  },
});
