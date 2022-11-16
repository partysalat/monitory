const axios = require('axios');
const _ = require('lodash');
const querystring = require('querystring');

module.exports.create = ({ url }) => {
  const getHistogramFor = (target, from = '2h', until = 'now') =>
    axios({
      method: 'POST',
      url: `${url}/render`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: querystring.stringify({
        target,
        from,
        until,
        format: 'json',
        maxDataPoints: 100,
      }),
    }).then(({ data }) => _.get(data, '[0].datapoints'));

  return {
    getHistogramFor,
  };
};
