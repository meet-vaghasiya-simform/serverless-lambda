const logger = require('./logger');

module.exports.myFunction = async (event) => {
  const failureChance = Math.random();
  logger.info('Received request', { event });

  return new Promise((resolve) => {
    setTimeout(() => {
      if (failureChance < 0.5) {
        const error = new Error('Random failure occurred');
        logger.error('Function failed', { error });
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Function failed' }),
        });
      } else {
        logger.info('Function executed successfully');
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'Function executed successfully' }),
        });
      }
    }, 10000); // 10 seconds delay
  });
};
