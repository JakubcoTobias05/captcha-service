import crypto from 'crypto';
import { createCanvas } from 'canvas';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/logger.js';
import config from '../config.js';

const CAPTCHA_TTL = config.captchaTTL;
const CAPTCHA_LENGTH = config.textCaptchaLength || 6;

class TextCaptcha {
  #randomLightColor;
  #randomDarkColor;
  #addNoise;
  #addDistortion;
  #randomFont;
  #randomFontSize;
  #randomFontWeight;

  constructor() {
    this.fonts = ['Arial', 'DejaVu Sans', 'Verdana', 'Sans'];
    this.replacements = {
      S: '$',
      O: '0',
      I: '1',
      B: '8'
    };

    this.#randomLightColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 85%)`;
    };

    this.#randomDarkColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 30%)`;
    };

    this.#addNoise = (ctx, canvas) => {
      for (let i = 0; i < 300; i++) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };


    this.#addDistortion = (ctx, canvas) => {

      const textArea = { minX: 5, maxX: 160, minY: 30, maxY: 60 };

      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        const startX = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const startY = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        const cp1X = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const cp1Y = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        const cp2X = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const cp2Y = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        const endX = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const endY = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        ctx.stroke();
      }

      for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        const startX = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const startY = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        const endX = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const endY = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      for (let i = 0; i < 150; i++) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        const x = textArea.minX + Math.random() * (textArea.maxX - textArea.minX);
        const y = textArea.minY + Math.random() * (textArea.maxY - textArea.minY);
        ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }


      const fullArea = { minX: 5, maxX: canvas.width - 5, minY: 5, maxY: canvas.height - 5 };

      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        const startX = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const startY = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        const cp1X = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const cp1Y = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        const cp2X = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const cp2Y = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        const endX = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const endY = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        ctx.stroke();
      }

      for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        const startX = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const startY = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        const endX = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const endY = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      for (let i = 0; i < 150; i++) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        const x = fullArea.minX + Math.random() * (fullArea.maxX - fullArea.minX);
        const y = fullArea.minY + Math.random() * (fullArea.maxY - fullArea.minY);
        ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    this.#randomFont = () => {
      return this.fonts[Math.floor(Math.random() * this.fonts.length)];
    };

    this.#randomFontSize = () => {
      return 36 + Math.random() * 10 - 5;
    };

    this.#randomFontWeight = () => {
      return Math.random() > 0.5 ? 'bold' : 'normal';
    };
  }

  async generate() {
    try {
      const rawText = crypto.randomBytes(CAPTCHA_LENGTH).toString('hex').slice(0, CAPTCHA_LENGTH);
      const token = crypto.randomBytes(16).toString('hex');

      const canvas = createCanvas(200, 70);
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = this.#randomLightColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.#addNoise(ctx, canvas);

      const scale = 2;
      canvas.width = 200 * scale;
      canvas.height = 70 * scale;
      ctx.scale(scale, scale);

      let displayedText = '';
      rawText.split('').forEach((char, i) => {
        const modifiedChar = Math.random() > 0.7 && this.replacements[char.toUpperCase()]
          ? this.replacements[char.toUpperCase()]
          : (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase());
        displayedText += modifiedChar;
        const x = 10 + i * 20 + (Math.random() * 5 - 2.5);
        const y = 45 + (Math.random() * 10 - 5);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.font = `${this.#randomFontWeight()} ${this.#randomFontSize()}px ${this.#randomFont()}`;
        ctx.fillStyle = this.#randomDarkColor();
        ctx.fillText(modifiedChar, 0, 0);
        ctx.restore();
      });

      this.#addDistortion(ctx, canvas);

      const imageData = canvas.toDataURL('image/png', 1.0);

      await redisClient.set(`captcha:text:${token}`, displayedText, { EX: CAPTCHA_TTL });

      return { token, captchaImage: imageData };
    } catch (error) {
      logger.error('Chyba generování textové CAPTCHA:', error);
      throw error;
    }
  }

  async verify(token, answer) {
    try {
      const storedText = await redisClient.get(`captcha:text:${token}`);
      return storedText?.toLowerCase() === answer?.toLowerCase();
    } catch (error) {
      logger.error('Text CAPTCHA verification failed', { token, error });
      return false;
    }
  }
}

export default new TextCaptcha();
