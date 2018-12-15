const { teamcityClient } = require('./../../index');
const _ = require('lodash');

const client = teamcityClient.create({ url: 'https://teamcity.jetbrains.com' });
module.exports = {
  id: 'teamcity',
  interval: 6000, // ms
  async job() {
    // return client.getFailedBuildsFor(['OpenSourceProjects_Betaflight']);
    // return _.take([1, 2, 3, 4, 5, 1, 23, 12, 312, 3, 23, 12, 312, 3, 23, 12, 312, 3], Math.round(Math.random() * 40));
    const data = [
      { name: 'DeployTUVAndProAndDevJob1', assignee: 'Peter' },
      { name: 'DeployTUVAndProAndDevJob2', assignee: 'Peter' },
      { name: 'DeployTUVAndProAndDevJob3' },
      { name: 'DeployTUVAndProAndDevJob4' },
      { name: 'DeployTUVAndProAndDevJob5' },
      { name: 'DeployTUVAndProAndDevJob6' },
      { name: 'DeployTUVAndProAndDevJob7', assignee: 'Peter' },
    ];
    await timeout(2000);
    return _.take(data, Math.round(Math.random() * 10));
  },

};
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
