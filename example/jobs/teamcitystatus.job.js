module.exports = {
  job() {
    return Promise.resolve({ failedBuilds: [] });
  },
  interval: 1000, // ms
  property: 'teamcity',
};
