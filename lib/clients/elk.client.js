const axios = require('axios');
const _ = require('lodash');
const dateFns = require('date-fns');
const logger = require('./../utils/logger');

module.exports.create = ({
  url,
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
          gte: timeSpan || 'now-1h',
          lt: 'now',
        },
      },
    },
  });
  const getIndexForCurrentDate = () => dateFns.format(new Date(), 'YYYY.MM.DD');

  const getCountFor = (query) => {
    const index = getIndexForCurrentDate();
    const composedUrl = url;
    return axios({
      method: 'POST',
      url: composedUrl,
      data: getEsQueryBaseOn(query),
    })
      .then((result) => {
        if (result.hits === undefined) {
          logger.warn('No hits for', url, query);
        }
        return result.hits ? result.hits.total || 0 : '?';
      });
  };

  return {
    getCountFor,
  };
};
