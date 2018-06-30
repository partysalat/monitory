module.exports = {
  id: 'myId',
  interval: 10000, // ms
  job() {
    return Promise.resolve({ failedBuilds: [] });
  },

};
