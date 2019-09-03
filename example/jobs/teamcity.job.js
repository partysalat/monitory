const _ = require('lodash');

const teamcityJob = {
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

const teamcityStatusJob = {
  id: 'teamcityStatus',
  interval: 6000, // ms
  async job() {
    const data = [
      { name: 'Assigned', assignee: 'Bernd' },
      { name: 'Assigned', assignee: 'Bettina' },
      { name: 'Not Assigned but random status' },
      { name: 'Not Assigned but random status again' },
    ];
    await timeout(2000);
    const otherData = [
      { name: 'Adjusted', status: 'adjusted', subtitle: 'changed that to be awesome' },
      { name: 'Failed', status: 'failed', subtitle: 'failed but still awesome' },
    ];
    return _.union(convertToStatusItem(_.take(data, Math.round(Math.random() * 10))), otherData);
  },
};

const convertToStatusItem = tcBuildStatus => _.map(tcBuildStatus, (buildStatus) => {
    const { name } = buildStatus;
    const subtitle = `${_.get(buildStatus, 'assignee', 'Nobody')}  assigned`;
    const randomCheckOrFailed = (Math.round(Math.random()) === 1) ? 'adjusted' : 'failed';
    const status = (_.has(buildStatus, 'assignee')) ? 'investigated' : randomCheckOrFailed;
    return { name, subtitle, status };
  });

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

module.exports = [teamcityJob, teamcityStatusJob];
