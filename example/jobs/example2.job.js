module.exports = {
  id: 'example2',
  interval: 10000, // ms
  async job() {
    return await Promise.resolve({ randomNumber: Math.random() });
  },

};
