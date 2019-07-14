import { random } from 'faker';

global.createRandomProps = function createRandomProps() {
  const obj = {};
  const randomNumber = random.number({ max: 10 });
  for (let i = 0; i < randomNumber; i++) {
    obj[random.alphaNumeric()] = random.alphaNumeric();
  }
  return obj;
};
