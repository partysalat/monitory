module.exports = {
  id: 'example2',
  interval: 2000, // ms
  async job() {
    return await Promise.resolve({ randomNumber: Math.random() });
  },

};
