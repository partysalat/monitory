import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function () {
  return (
    <Flex>
      <Box width={1 / 2} >
        <Dashboard>
          <Card
            job="example1"
            title="Waidmanns Heil! "
            showWhen={({ current = {} }) => current.randomNumber > 8000}
            value={({ current = {} }) => current.randomNumber}
          />
          <Card job="example2" title="Example2" value={({ current = {} }) => current.randomNumber} />
          <Card job="jobId3" title="Example3" value={({ current = {} }) => current.randomNumber} />
        </Dashboard>
      </Box>
      <Box width={1 / 2} >
        <Dashboard>
          <Card job="example1" title="Waidmanns Heil! Die Luder festnageln die hanebüchen Das hochnäsig " threshold={200} value={({ current = {} }) => current.randomNumber} />
          <Card job="example2" title="Example2" threshold={200} value={({ current = {} }) => current.randomNumber} />
        </Dashboard>
      </Box>
    </Flex>
  );
}
