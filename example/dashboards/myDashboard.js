import React from 'react';
import { Box, Flex } from 'grid-styled';
import { Card, Dashboard, ReloadableImg, ReloadableIframe, StatusList, themes } from './../../frontend';
import { Adjust } from 'styled-icons/fa-solid/Adjust';
import { get, has, map } from 'lodash';

const sharedProps = {
  value: (current = {}) => current.randomNumber,
  color: (current = {}) => {
    if (current.randomNumber < 5000) {
      return 'blue';
    } else if (current.randomNumber > 15000) {
      return 'red';
    }
    return 'pink';
  },
};

// extends status config for teamcity status list
const teamCityStatusConfigExtension = {
  failed: {
    default: false,
  },
  adjusted: {
    default: true,
    background: 'statusAdjustedColor',
    icon: Adjust,
  },
};
// extends themes with new status colors
themes.light.statusAdjustedColor = 'grey';
themes.dark.statusAdjustedColor = 'grey';


const transformToStatusListData = listData => map(listData, (item) => {
  const { name } = item;
  const subtitle = `${get(item, 'assignee', 'Nobody')}  assigned`;
  const status = (has(item, 'assignee')) ? 'investigated' : 'failed';
  return { name, subtitle, status };
});

export default function () {
  return (
    <Flex>
      <Box width={1 / 2}>
        <Dashboard cols={3} title="MEIN DASHBOARD">
          <Card alert job="example1" title="Waidmanns Heil! " {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <StatusList job="teamcity" title="Failed Teamcity Jobs" showWhen={(current = {}) => current.length > 5} rows={2} cols={1} value={transformToStatusListData} />
          <StatusList job="teamcityStatus" title="Teamcity Jobs" rows={2} cols={1} statusConfigExt={teamCityStatusConfigExtension} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />
          <Card job="example2" title="Example2" {...sharedProps} />

        </Dashboard>
      </Box>
      <Box width={1 / 2}>
        <Dashboard cols={3}>
          <ReloadableImg src="http://thecatapi.com/api/images/get?size=med" title="The Cat API" cols={2} rows={2} interval={60000} />
          <ReloadableIframe src="http://localhost:1337" title="Dashboards (Iframe Example)" cols={1} rows={2} interval={10000} zoom={1.5} />
          <Card
            job="example1"
            title="Waidmanns Heil! Die Luder festnageln die hanebüchen Das hochnäsig "
            value={(current = {}) => current.randomNumber}
          />
          <Card job="example3" />
        </Dashboard>
      </Box>
    </Flex>
  );
}
