// const config = require('../infra/configs/global_config'); //set timeout
const logger = require('all-in-one');

const shutdown = async (server) => {
  server.close(() => {
    logger.log('Server closed. No longer accepting connections.');

    // Perform cleanup tasks
    // For example, close database connections, release resources, etc.
    process.exit(0);
  });
};

const init = async (server) => {
  process.on('exit', () => {
    logger.log('on exit');
    shutdown(server);
  });
  process.on('SIGINT', () => {
    logger.log('on SIGINT');
    shutdown(server);
  });
  process.on('SIGTERM', () => {
    logger.log('on SIGTERM');
    shutdown(server);
  });
};

module.exports = {
  init
};
