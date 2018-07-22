import React from 'react';
import last from 'lodash/last';
import { Card, Dashboard, List } from './../../frontend';

export default function () {
  return (
    <Dashboard cols={5}>
      <List job="teamcity" title="Failed Teamcity Jobs" showWhen={({ current = {} }) => current.length > 0} rows={2} cols={1} />
      <Card job="example3" title="Fooo" />

      <Card job="series1" title="Fooo" value={({ current = [] }) => last(current)} graph={({ current = [] }) => current} cols={3} color="white" />
    </Dashboard>
  );
}
