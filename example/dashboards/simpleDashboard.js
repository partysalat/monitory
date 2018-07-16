import React from 'react';
import { Dashboard, List, Card } from './../../frontend';


export default function () {
  return (
    <Dashboard cols={5}>
      <List job="teamcity" title="Failed Teamcity Jobs" showWhen={({ current = {} }) => current.length > 0} rows={2} cols={1} />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
      <Card job="example3" title="Fooo" />
    </Dashboard>
  );
}
