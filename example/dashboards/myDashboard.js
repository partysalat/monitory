import React, { Component } from 'react';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function () {
  return (
    <Dashboard>
      <Card job="example1" value={({ current = {} }) => current.randomNumber} />
      <Card job="example1" value={({ current = {} }) => current.randomNumber} />
      <Card job="example2" value={({ current = {} }) => current.randomNumber} />

    </Dashboard>
  );
}
