import sum from 'lodash/sum';
import isNumber from 'lodash/isNumber';

export const movingAverage = (windowSize = 5) => {
  const values = [];
  return (current, viewValue) => {
    values.unshift(viewValue);
    values.length = values.length > windowSize ? windowSize : values.length;
    const average = sum(values) / values.length;
    return `${0.5 * Math.PI * (average - viewValue) / (average + viewValue)}rad`;
  };
};


export const colorRange = colors => (current, viewValue) => {
  let color;
  const item = colors.find((colorOrNumber) => {
    if (isNumber(colorOrNumber)) {
      return viewValue <= colorOrNumber;
    }
    color = colorOrNumber;
  });
  return item ? color : null;
};
