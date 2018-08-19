import React from 'react';
import last from 'lodash/last';
import { ThemeProvider, themes, Card, Dashboard, List, helpers } from './../../frontend';

const movingAverage = helpers.movingAverage(5);
const colorRange = helpers.colorRange([
  'red', 3000, 'blue', 6000, 'white', 9000, 'yellow',
]);
const EXPLOSION = '/assets/explosion.mp3';
export default function () {
  return (
    <ThemeProvider value={themes.dark}>
      <Dashboard cols={7} title="MEIN Dashboard">
        <List job="teamcity" title="Failed Teamcity Jobs" rows={1} cols={2} />
        <Card
          job="example3"
          title="Fooo"
          playAudioWhen={(current, viewValue) => (viewValue > 2000 ? EXPLOSION : null)}
          withTendency={(current, viewValue, last) => `${0.5 * Math.PI * (last - current) / (last + current)}rad`}
          color={colorRange}
        />
        <Card
          job="example3"
          title="Moving Window"
          withTendency={movingAverage}
        />
        <Card
          job="series1"
          title="Fooo"
          value={(current = []) => last(current)}
          graph={(current = []) => current}
          cols={3}
          withTendency
        />
      </Dashboard>
      <Dashboard cols={6} title="MEIN zweites Dashboard">
        <Card job="example1" title="Fooo" value={(current = {}) => current.randomNumber} />
        <Card job="example2" title="Fooo" value={(current = {}) => current.randomNumber} />
      </Dashboard>
    </ThemeProvider>
  );
}
