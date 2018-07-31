let counter = 0;
module.exports = {
  id: 'example3',
  interval: 5000, // ms
  job() {
    counter += 1;
    if (counter % 2) {
      // return Promise.reject(new Error('FOOFOFOOF'));
    }
    return Promise.resolve(Math.round(Math.random() * 10000));
  },

};
