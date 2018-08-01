const log = level => (first, ...rest) => {
  console[level].apply(this, [// eslint-disable-line
    `${new Date().toISOString()} - ${first}`, ...rest]);
};

module.exports = {
  info: log('info'),
  warn: log('warn'),
  error: log('error'),
  debug: log('debug'),
  log: log('log'),
};