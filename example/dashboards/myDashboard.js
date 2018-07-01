import React, { Component } from 'react';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function (props) {
  return (
    <Dashboard>
      <Card job="myId" />
      <Card job="myId2" />
      <Card job="myId2" />

    </Dashboard>
  );
}
