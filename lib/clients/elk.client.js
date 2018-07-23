const axios = require('axios');
const _ = require('lodash');
const dateFns = require('date-fns');
const logger = require('./../utils/logger');

module.exports.create = ({
  url, alias,
}) => {
  const getEsQueryBaseOn = (query, timeSpan) => ({
    query: {
      query_string: {
        query,
        analyze_wildcard: true,
      },
    },
    filter: {
      range: {
        '@timestamp': {
          gte: timeSpan,
          lt: 'now',
        },
      },
    },
  });
  const getIndexForCurrentDate = () => dateFns.format(new Date(), 'YYYY.MM.DD');

  const getCountFor = (query, timeSpan = 'now-1h') => {
    const index = getIndexForCurrentDate();
    const composedUrl = `${url}/${alias}-${index}/_search`;
    return axios({
      method: 'POST',
      url: composedUrl,
      headers: {
        'content-type': 'application/json',
      },
      data: getEsQueryBaseOn(query, timeSpan),
    })
      .then(({ data }) => {
        if (data.hits === undefined) {
          logger.warn('No hits for', composedUrl, query);
        }
        return data.hits ? data.hits.total || 0 : '?';
      });
  };

  return {
    getCountFor,
  };
};
