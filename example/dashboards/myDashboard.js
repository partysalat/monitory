import React from 'react';
import { Box, Flex } from 'grid-styled';
import { Card, Dashboard, List, ReloadableImg, ReloadableIframe } from './../../frontend';


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
        <Dashboard cols={3}>
          <Card alert job="example1" title="Waidmanns Heil! " {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <List job="teamcity" title="Failed Teamcity Jobs" showWhen={({ current = {} }) => current.length > 0} rows={2} cols={1} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />

        </Dashboard>
      </Box>
      <Box width={1 / 2} >
        <Dashboard cols={3}>
          <ReloadableImg src="http://thecatapi.com/api/images/get?size=med" title="The Cat API" cols={2} rows={2} interval={60000} />
          <ReloadableIframe src="http://localhost:1337" title="Dashboards" cols={1} rows={2} interval={10000} />
          <Card
            job="example1"
            title="Waidmanns Heil! Die Luder festnageln die hanebüchen Das hochnäsig "
            value={({ current = {} }) => current.randomNumber}
          />
          <Card job="example3" />
        </Dashboard>
      </Box>
    </Flex>
  );
}
