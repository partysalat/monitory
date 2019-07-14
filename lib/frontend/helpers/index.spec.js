const { colorRange } = require('./index');

describe('helpers', () => {
  describe('colorRange', () => {
    const testCases = [
      [['red', 10, 'yellow', 12, 'green'], 13, 'green'],
      [['red', 10, 'yellow'], 11, 'yellow'],
      [['red', 10, 'yellow'], 9, 'red'],
      [['red', 10], 9, 'red'],
      [['red', 10], 11, null],
      [[10, 'red'], 11, 'red'],
      [[10, 'red'], 9, null],
      [[10, 'red', 11, 'yellow'], 11, 'red'],
      [[10, 'red', 11, 'yellow'], 12, 'yellow'],
    ];
    testCases.forEach(([colorRangeDefinition, viewValue, expectedOutcome]) => {
      it(`when ${colorRangeDefinition} and viewValue ${viewValue} expect color to be ${expectedOutcome}]`, () => {
        const method = colorRange(colorRangeDefinition);
        const res = method(null, viewValue);
        expect(res).toBe(expectedOutcome);
      });
    });
  });
});
