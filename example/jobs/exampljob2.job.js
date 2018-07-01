module.exports = {
  id: 'myId2',
  interval: 10000, // ms
  job() {
    return Promise.resolve({ randomNumber: Math.random() });
  },

};
