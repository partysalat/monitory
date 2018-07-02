import React, { Component } from 'react';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function () {
  return (
    <Dashboard>
      <Card job="example1" title="Waidmanns Heil! Die Luder festnageln die hanebüchen Das hochnäsig " threshold={200} value={({ current = {} }) => current.randomNumber} />
      <Card job="example2" title="Example2" threshold={200} value={({ current = {} }) => current.randomNumber} />
    </Dashboard>
  );
}
