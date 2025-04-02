import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import logger from './utils/logger.js';
import apiKeyRoutes from './routes/apiKeyRoutes.js';
import captchaRoutes from './routes/captchaRoutes.js';
import redisClient from './utils/redisClient.js'; 
import path from 'path';

class Server {
  constructor() {
    this.app = express();
    this.app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')));
    this.app.set('trust proxy', true);
    this.app.use((req, res, next) => {
      logger.info(`[${req.method}] ${req.url}`);
      next();
    });

    this.app.use(helmet());
    this.app.use(cors(config.cors));
    this.app.use(express.json({ limit: '100000000kb' }));
    
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Headers', 'x-api-key, Content-Type'); 
      next();
    });
    
    this.port = config.port;
    this.#initializeDatabase();
    this.#initializeRoutes();
  }

  async #initializeDatabase() {
    await mongoose.connect(config.mongo.uri)
      .then(() => logger.info('✅ MongoDB připojeno'))
      .catch(err => {
        logger.error('❌ MongoDB error:', err);
        process.exit(1);
      });
  }

  #initializeRoutes() {
    this.app.use('/api/v1/auth', apiKeyRoutes);
    this.app.use('/api/v1/captcha', captchaRoutes);
    this.app.get('/health', (req, res) => res.json({ status: 'ok' }));
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server běží na portu ${this.port}`);
    });
  }
}

export default new Server();
