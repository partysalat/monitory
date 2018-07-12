const { teamcityClient } = require('./../../index');

const client = teamcityClient.create({ url: 'https://teamcity.jetbrains.com' });
module.exports = {
  id: 'teamcity',
  interval: 5000, // ms
  job() {
    // return client.getFailedBuildsFor('ApacheAnt');
  },

};
