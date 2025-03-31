import server from './server.js';
import logger from './utils/logger.js';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 2000; 

process.on('unhandledRejection', (reason) => {
  logger.error(`Neošetřená promise rejection: ${reason.stack}`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Neošetřená výjimka: ${error.stack}`);
  process.exit(1);
});

server.start();