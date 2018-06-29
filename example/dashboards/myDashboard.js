import React, { Component } from 'react';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function (props) {
  return (
    <Dashboard>
      <Card job="id" />
      <Card job="id2" />
      <Card job="id3" />

    </Dashboard>
  );
}
