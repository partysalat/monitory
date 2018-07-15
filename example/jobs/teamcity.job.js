const { teamcityClient } = require('./../../index');

const client = teamcityClient.create({ url: 'https://teamcity.jetbrains.com' });
module.exports = {
  id: 'teamcity',
  interval: 60000, // ms
  job() {
    return client.getFailedBuildsFor('OpenSourceProjects_Betaflight');
  },

};
