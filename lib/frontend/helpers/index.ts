import sum from 'lodash/sum';
import { isNumber, last } from 'lodash';

export const movingAverage = <C>(windowSize = 5) => {
  const values: number[] = [];
  return (current: C, viewValue: number) => {
    values.unshift(viewValue);
    values.length = values.length > windowSize ? windowSize : values.length;
    const average = sum(values) / values.length;
    const tendency = (average - viewValue) / (average + viewValue);
    return `${0.5 * Math.PI * tendency}rad`;
  };
};

export const colorRange =
  (colors: (string | number)[]) =>
  <C, V>(current: C, viewValue: V): string | null => {
    let color = null;
    const item = colors.find((colorOrNumber) => {
      if (isNumber(colorOrNumber)) {
        return viewValue <= colorOrNumber;
      }
      color = colorOrNumber;
      return false;
    });
    const lastItemIsNumber = isNumber(last(colors));

    return item || !lastItemIsNumber ? color : null;
  };
