import server from './server.js';
import logger from './utils/logger.js';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 2000;
process.on('unhandledRejection', function (reason) {
  logger.error("Neo\u0161et\u0159en\xE1 promise rejection: ".concat(reason.stack));
});
process.on('uncaughtException', function (error) {
  logger.error("Neo\u0161et\u0159en\xE1 v\xFDjimka: ".concat(error.stack));
  process.exit(1);
});
server.start();