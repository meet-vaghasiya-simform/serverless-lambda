const logLevels = ['error', 'warn', 'info', 'debug'];

const log = (level, message, meta = {}) => {
  if (logLevels.indexOf(process.env.LOG_LEVEL) >= logLevels.indexOf(level)) {
    console.log(JSON.stringify({ level, message, meta, timestamp: new Date().toISOString() }));
  }
};

module.exports = {
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  info: (message, meta) => log('info', message, meta),
  debug: (message, meta) => log('debug', message, meta),
};
