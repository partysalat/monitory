import React from 'react';
import { Flex, Box } from 'grid-styled';
import { Dashboard, Card } from './../../frontend';


const sharedProps = {
  value: ({ current = {} }) => current.randomNumber,
  color: ({ current = {} }) => {
    if (current.randomNumber < 5000) {
      return 'blue';
    } else if (current.randomNumber > 15000) {
      return 'red';
    }
    return 'pink';
  },
};
export default function () {
  return (
    <Flex>
      <Box width={1 / 2} >
        <Dashboard>
          <Card alert job="example1" title="Waidmanns Heil! " {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
        </Dashboard>
      </Box>
      <Box width={1 / 2} >
        <Dashboard>
          <Card
            job="example1"
            title="Waidmanns Heil! Die Luder festnageln die hanebüchen Das hochnäsig "
            showWhen={({ current = {} }) => current.randomNumber > 8000}
            value={({ current = {} }) => current.randomNumber}
          />
          <Card job="example3" />
        </Dashboard>
      </Box>
    </Flex>
  );
}
