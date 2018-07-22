function getRandomNumberUpto(number) {
  return Math.round(Math.random() * number);
}

function sharedJobFunction(number) {
  return Promise.resolve({ randomNumber: getRandomNumberUpto(number) });
}

module.exports = [{
  id: 'example1',
  interval: 5000, // ms
  job: sharedJobFunction.bind(null, 20000),
}, {
  id: 'example2',
  interval: 5000, // ms
  job: sharedJobFunction.bind(null, 20000),

}, {
  id: 'series1',
  interval: 5000, // ms
  job() {
    return [
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
      getRandomNumberUpto(50),
    ];
  },

}];
