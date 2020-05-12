const LEVELS = {
  DEBUG: ['debug', 0],
  LOG: ['log', 1],
  INFO: ['info', 2],
  WARN: ['warn', 3],
  ERROR: ['error', 4],
};
const DEFAULT_LOG_FORMATTER = (level, first, ...rest) => [`${new Date().toISOString()} - Monitory - ${first}`, ...rest];

let LOG_LEVEL = LEVELS.INFO;
let LOG_FORMATTER = DEFAULT_LOG_FORMATTER;

const log = (level) => (...params) => {
  const [method, prio] = level;
  const enabledPrio = LOG_LEVEL[1];
  if (prio < enabledPrio) {
    return;
  }

  // eslint-disable-next-line no-console
  console[method].apply(console, LOG_FORMATTER(method, ...params));
};


module.exports = {
  debug: log(LEVELS.DEBUG),
  log: log(LEVELS.LOG),
  info: log(LEVELS.INFO),
  warn: log(LEVELS.WARN),
  error: log(LEVELS.ERROR),
  LEVELS,
  DEFAULT_LOG_FORMATTER,
  setLogLevel: (logLevel) => {
    LOG_LEVEL = logLevel;
  },
  setFormatter: (formatter) => {
    LOG_FORMATTER = formatter;
  },
};
