import React from 'react';
import last from 'lodash/last';
import { Card, Dashboard, List } from './../../frontend';
import { ThemeProvider, themes } from '../../lib/frontend/utils/Theme';

export default function () {
  return (
    <ThemeProvider value={themes.dark}>
      <Dashboard cols={7}>
        <List job="teamcity" title="Failed Teamcity Jobs" showWhen={({ current = {} }) => current.length > 0} rows={2} cols={2} />
        <Card job="example3" title="Fooo" />
        <Card
          job="series1"
          title="Fooo"
          value={({ current = [] }) => last(current)}
          graph={({ current = [] }) => current}
          cols={3}

        />
      </Dashboard>
    </ThemeProvider>
  );
}
