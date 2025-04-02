import winston from 'winston';
import config from '../config.js';
import fs from 'fs/promises';

async function initializeLogger() {
  await fs.mkdir('src/temp/logs', { recursive: true });
  console.log('Logger initialized');
}

initializeLogger();

const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    config.NODE_ENV === 'development' ? colorize() : winston.format.simple(),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: 'src/temp/logs/error.log',
      level: 'error'
    })
  ]
});

process.on('warning', warning => {
  logger.warn(`Process warning: ${warning.name}`, {
    message: warning.message,
    stack: warning.stack
  });
});

export default logger;