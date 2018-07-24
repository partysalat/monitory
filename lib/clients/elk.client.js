const axios = require('axios');
const _ = require('lodash');
const dateFns = require('date-fns');
const logger = require('./../utils/logger');

module.exports.create = ({
  url, alias,
}) => {
  const getEsResultQueryBaseOn = (query, timeSpan) => ({
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
  const getEsFacetQueryBaseOn = (query, timeSpan, interval) => ({
    facets: {
      0: {
        date_histogram: {
          field: '@timestamp',
          interval,
        },
        facet_filter: {
          fquery: {
            query: {
              filtered: getEsResultQueryBaseOn(query, timeSpan),
            },
          },

        },
        global: true,
      },
    },
    size: 0,

  });
  const getIndexForCurrentDate = () => dateFns.format(new Date(), 'YYYY.MM.DD');
  const queryEs = (composedUrl, data) => axios({
    method: 'POST',
    url: composedUrl,
    headers: {
      'content-type': 'application/json',
    },
    data,
  });
  const getCountFor = (query, timeSpan = 'now-1h') => {
    const index = getIndexForCurrentDate();
    const composedUrl = `${url}/${alias}-${index}/_search`;
    return queryEs(composedUrl, getEsResultQueryBaseOn(query, timeSpan))
      .then(({ data }) => {
        if (data.hits === undefined) {
          logger.warn('No hits for', composedUrl, query);
        }
        return data.hits ? data.hits.total || 0 : '?';
      });
  };
  const getHistogramFor = (query, timeSpan = 'now-1h', interval = '30s') => {
    const index = getIndexForCurrentDate();
    const composedUrl = `${url}/${alias}-${index}/_search?search_type=count`;
    return queryEs(composedUrl, getEsFacetQueryBaseOn(query, timeSpan, interval))
      .then(({ data }) => {
        const facets = _.get(data, 'facets[0].entries');
        if (!facets) {
          logger.warn('No facets for', composedUrl, query);
        }
        return facets || [];
      })
      .then(list => list.map(({ time, count }) => ({ x: time, y: count })));
  };
  return {
    getCountFor,
    getHistogramFor,
  };
};
