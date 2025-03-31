import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/logger.js';
import config from '../config.js';

class ImageCaptcha {
  constructor() {
    this.ttl = config.captchaTTL;
    this.imagesDir = path.join(process.cwd(), 'src', 'assets', 'captcha_images');
    this.backendUrl = config.backendUrl || 'http://localhost:3001';
  }

  async generate() {
    try {
      const categories = await fs.readdir(this.imagesDir);
      if (!categories || categories.length === 0) {
        throw new Error('No image captcha categories found');
      }
      const category = categories[Math.floor(Math.random() * categories.length)];
      const categoryPath = path.join(this.imagesDir, category);

      const metadataPath = path.join(categoryPath, 'metadata.json');
      const metadataRaw = await fs.readFile(metadataPath, 'utf8');
      const metadata = JSON.parse(metadataRaw);

      const tiles = [];
      for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        tiles.push(`${this.backendUrl}/assets/captcha_images/${category}/tile_${row}_${col}.png`);
      }
      const orderedTiles = tiles;

      const token = crypto.randomBytes(16).toString('hex');

      await redisClient.set(
        `captcha:image:${token}`,
        JSON.stringify({ correctTiles: metadata.correct_tiles }),
        { EX: this.ttl }
      );

      return {
        token,
        images: orderedTiles,
        question: metadata.question,
        question_en: metadata.question_en
      };
    } catch (error) {
      logger.error('Image CAPTCHA generation failed', { error });
      throw new Error('IMAGE_CAPTCHA_GENERATION_FAILED');
    }
  }

  async verify(token, selectedTiles) {
    try {
      const data = await redisClient.get(`captcha:image:${token}`);
      if (!data) return false;
      const { correctTiles } = JSON.parse(data);
      const sortArray = (arr) => arr.slice().sort((a, b) => a - b);
      return JSON.stringify(sortArray(selectedTiles)) === JSON.stringify(sortArray(correctTiles));
    } catch (error) {
      logger.error('Image CAPTCHA verification failed', { token, error });
      return false;
    }
  }
}

export default new ImageCaptcha();
