module.exports = {
  id: 'teamcity',
  job() {
    return Promise.resolve({ failedBuilds: [] });
  },
  interval: 1000, // ms
};
