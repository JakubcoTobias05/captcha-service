// src/captchaSystems/audioCaptcha.js
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import Gtts from 'gtts';
import fs from 'fs/promises';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/logger.js';
import config from '../config.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audioDir = path.join(__dirname, '../../src/temp/audio');
await fs.mkdir(audioDir, { recursive: true });

class AudioCaptcha {
  constructor() {
    this.ttl = 300;
    this.generateText = () => crypto.randomBytes(3).toString('hex').slice(0, 6);
  }
  
  async generate(lang = 'cs') {
    try {
      const text = this.generateText();
      const token = crypto.randomBytes(16).toString('hex');
      const filePath = path.join(audioDir, `${token}.mp3`);

      await new Promise((resolve, reject) => {
        new Gtts(text, lang).save(filePath, (err) => {
          if (err) {
            logger.error('Gtts error:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      await redisClient.set(`captcha:audio:${token}`, JSON.stringify({ text }), { EX: this.ttl });
      
      return { token, fileUrl: `/api/v1/captcha/audio/${token}`, text };
    } catch (error) {
      logger.error('Audio CAPTCHA generation failed:', error);
      throw new Error(`AUDIO_GEN_FAILED: ${error.message}`);
    }
  }

  async verify(token, answer) {
    try {
      const data = await redisClient.get(`captcha:audio:${token}`);
      if (!data) return false;
      const { text } = JSON.parse(data);
      return text.toLowerCase() === answer.toLowerCase();
    } catch (error) {
      logger.error('Audio CAPTCHA verification failed', { token, error });
      return false;
    }
  }
}

export default new AudioCaptcha();
