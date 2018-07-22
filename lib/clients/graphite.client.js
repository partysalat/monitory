const axios = require('axios');
const _ = require('lodash');
const dateFns = require('date-fns');
const logger = require('./../utils/logger');

module.exports.create = ({
  url,
}) => {
  const getCountFor = (target, from = '2h', until = 'now') => axios({
    method: 'POST',
    url,
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: {
      target,
      from,
      until,
      format: 'json',
    },
  });

  return {
    getCountFor,
  };
};
