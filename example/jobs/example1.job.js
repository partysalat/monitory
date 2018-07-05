
function sharedJobFunction(number) {
  return Promise.resolve({ randomNumber: Math.round(Math.random() * number) });
}

module.exports = [{
  id: 'example1',
  interval: 2500, // ms
  job: sharedJobFunction.bind(null, 20000),
}, {
  id: 'jobId3',
  interval: 4000, // ms
  job: sharedJobFunction.bind(null, 4567897),

}];
