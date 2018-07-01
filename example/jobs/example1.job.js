module.exports = {
  id: 'example1',
  interval: 10000, // ms
  job() {
    return Promise.resolve({ randomNumber: Math.random() });
  },

};
