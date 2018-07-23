const axios = require('axios');
const _ = require('lodash');

module.exports.create = ({
  url,
}) => {
  function mapJobs(jobs) {
    return jobs.data.buildType
      .filter(build => build.builds.build[0] && build.builds.build[0].status !== 'SUCCESS')
      .map(build => ({ name: `${build.projectName} / ${build.name}`, assignee: _.get(build, 'investigations.investigation[0].assignee.name') }));
  }

  function getFailedBuilds(project) {
    const jobUrl = `${url}/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:${project})&fields=buildType(id,name,projectName,investigations(investigation(assignee)),builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))`;
    return axios.get(jobUrl, {
      headers: {
        Accept: 'application/json',
      },
    }).then(mapJobs);
  }
  function getFailedBuildsFor(projects = []) {
    return Promise.all(projects.map(getFailedBuilds))
      .then(result => _.flatten(result));
  }
  return {
    getFailedBuildsFor,
  };
};
