module.exports = {
  id: 'example3',
  interval: 5000, // ms
  job() {
    return Promise.resolve(Math.round(Math.random() * 20000));
  },

};
