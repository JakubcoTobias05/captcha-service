import { createClient } from 'redis';
import logger from './logger.js';

class RedisClient {
  constructor() {
    this.client = createClient({
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        ...(process.env.REDIS_TLS === 'true' ? { tls: {} } : {})
      }
    });

    this.client.on('error', (err) => {
      logger.error('Redis error:', err);
    });

    this.client.connect();

    this.client.on('connect', () => logger.info('🟡 Připojuji se k Redis...'));
    this.client.on('ready', () => logger.info('✅ Redis připojeno'));
    this.client.on('end', () => logger.warn('🔴 Odpojeno od Redis'));
  }

  async set(key, value, options) {
    return this.client.set(key, value, options);
  }

  async get(key) {
    return this.client.get(key);
  }

  async exists(key) {
    return this.client.exists(key);
  }
}

export default new RedisClient();
