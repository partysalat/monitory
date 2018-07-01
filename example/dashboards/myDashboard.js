import React, { Component } from 'react';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function (props) {
  return (
    <Dashboard>
      <Card job="example1" value={data => data.randomNumber} />
      <Card job="example1" value={data => data.randomNumber} />
      <Card job="example2" value={data => data.randomNumber} />

    </Dashboard>
  );
}
