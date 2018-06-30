module.exports = {
  id: 'teamcity',
  interval: 1000, // ms
  job() {
    return Promise.resolve({ failedBuilds: [] });
  },

};
