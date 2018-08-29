const MockDate = require('mockdate');
const logger = require('./logger');

describe('logger', () => {
  const currentDateIsoString = '2018-08-29T19:23:04.491Z';
  function mockDate() {
    MockDate.set(new Date(currentDateIsoString));
  }

  beforeEach(() => {
    mockDate();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    MockDate.reset();
  });

  describe.each([
    ['info'],
    ['warn'],
    ['error'],
    ['debug'],
    ['log'],
  ])(
    'when calling logger.%s',
    (method) => {
      const TEST_MESSAGE = 'logging message';
      beforeEach(() => {
        jest.spyOn(global.console, method);
        logger[method](TEST_MESSAGE);
      });

      it('logs message via console with date', () => {
        expect(console[method]).toHaveBeenCalledWith(`${currentDateIsoString} - ${TEST_MESSAGE}`);
      });
    },
  );
});
