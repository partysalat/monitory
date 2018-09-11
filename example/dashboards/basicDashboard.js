import React from 'react';
import { Card, Dashboard } from './../../frontend';


export default function () {
  return (
    <Dashboard cols={3} title="Basic Dashboard">
      <Card
        job="example3"
        title="Basic Tile"
      />

    </Dashboard>
  );
}
