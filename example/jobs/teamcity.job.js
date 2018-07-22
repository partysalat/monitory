const { teamcityClient } = require('./../../index');
const _ = require('lodash');

const client = teamcityClient.create({ url: 'https://teamcity.jetbrains.com' });
module.exports = {
  id: 'teamcity',
  interval: 1000, // ms
  job() {
    // return client.getFailedBuildsFor('OpenSourceProjects_Betaflight');
    // return _.take([1, 2, 3, 4, 5, 1, 23, 12, 312, 3, 23, 12, 312, 3, 23, 12, 312, 3], Math.round(Math.random() * 40));
    const data = [
      { name: 'DeployTUVAndProAndDevJob', assignee: 'Peter' },
      { name: 'DeployTUVAndProAndDevJob', assignee: 'Peter' },
      { name: 'DeployTUVAndProAndDevJob' },
      { name: 'DeployTUVAndProAndDevJob' },
      { name: 'DeployTUVAndProAndDevJob' },
      { name: 'DeployTUVAndProAndDevJob' },
      { name: 'DeployTUVAndProAndDevJob', assignee: 'Peter' },
    ];

    return _.take(data, Math.round(Math.random() * 10));
  },

};
