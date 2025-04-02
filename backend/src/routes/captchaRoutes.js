import express from 'express';
import captchaController from '../controllers/captchaController.js';
import rateLimit from 'express-rate-limit';
import redisClient from '../utils/redisClient.js';
import path from 'path';
import fs from 'fs/promises';
import logger from '../utils/logger.js';

const router = express.Router();

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Příliš mnoho požadavků, zkuste to později.'
});

const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100,
  message: 'Příliš mnoho žádostí o nové CAPTCHA, zkuste to prosím za hodinu.'
});

router.get('/audio/:token', async (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query['x-api-key'];
  if (!apiKey) {
    logger.error('Chybějící API klíč v hlavičce nebo query');
    return res.status(401).json({ error: 'API_KEY_REQUIRED' });
  }
  next();
}, async (req, res) => {
  try {
    const { token } = req.params;
    const exists = await redisClient.exists(`captcha:audio:${token}`);
    if (!exists) {
      logger.error(`Audio token ${token} neexistuje v Redis.`);
      return res.status(404).json({ error: 'Neplatné audio' });
    }
    
    const filePath = path.join(process.cwd(), 'src', 'temp', 'audio', `${token}.mp3`);

    try {
      const stats = await fs.stat(filePath);
      logger.info(`Audio soubor ${token}.mp3 nalezen, velikost: ${stats.size}B`);
    } catch (err) {
      logger.error(`Chyba při získávání informací o souboru ${token}.mp3:`, err);
      return res.status(404).json({ error: 'Soubor nenalezen' });
    }
    
    res.sendFile(filePath, {
      headers: { 
        'Content-Type': 'audio/mpeg',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Access-Control-Allow-Origin': '*',
        'Accept-Ranges': 'bytes'
      }
    }, (err) => {
      if (err) {
        logger.error("Chyba při odesílání audio souboru:", err);
      } else {
        logger.info(`Audio soubor ${token}.mp3 byl úspěšně odeslán`);
      }
    });
    
    res.on('finish', () => {
      setTimeout(async () => {
        try {
          await fs.unlink(filePath);
          logger.info(`Audio soubor ${token}.mp3 byl smazán po uplynutí 1 minuty`);
        } catch (err) {
          logger.error(`Chyba při mazání audio souboru ${token}.mp3:`, err);
        }
      }, 60000);
    });
    
  } catch (error) {
    logger.error("Chyba serveru při obsluze audio CAPTCHA:", error);
    res.status(500).json({ error: 'Chyba serveru' });
  }
});

router.post('/generate', 
  generateLimiter, 
  captchaController.validateApiKey,
  captchaController.generate
);

router.post('/verify', 
  generalLimiter,
  captchaController.verify
);

export default router;
