import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import Dashboard from '../../lib/frontend/Dashboard';
import Card from '../../lib/frontend/widgets/Card';


export default function () {
  return (
    <Flex>
      <Box width={1 / 2} >
        <Dashboard>
          <Card job="example1" title="Waidmanns Heil! " threshold={200} value={({ current = {} }) => current.randomNumber} />
          <Card job="example2" title="Example2" threshold={200} value={({ current = {} }) => current.randomNumber} />
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
