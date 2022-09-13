import React, { useState } from 'react';
import CountUp from 'react-countup';
import { isNumber, isObjectLike } from 'lodash';

interface CountUptoProps {
  value: Record<string, unknown> | string | number;
  duration: number;
}

export default function CountUpto({ value, duration }: CountUptoProps) {
  const [lastValue, setLastValue] = useState<
    Record<string, unknown> | string | number
  >(0);

  if (isObjectLike(lastValue) || isObjectLike(value)) {
    return <span>{JSON.stringify(value)}</span>;
  }
  if (!isNumber(lastValue) || !isNumber(value)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <span>{value}</span>;
  }
  return (
    <CountUp
      start={lastValue}
      end={value}
      duration={duration}
      {...this.props}
      onEnd={() => setLastValue(value)}
    />
  );
}
