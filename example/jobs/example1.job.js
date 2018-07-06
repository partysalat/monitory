
function sharedJobFunction(number) {
  return Promise.resolve({ randomNumber: Math.round(Math.random() * number) });
}

module.exports = [{
  id: 'example1',
  interval: 5000, // ms
  job: sharedJobFunction.bind(null, 20000),
}, {
  id: 'jobId3',
  interval: 5000, // ms
  job: sharedJobFunction.bind(null, 20000),

}];
