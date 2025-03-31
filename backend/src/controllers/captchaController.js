import ApiKey from '../models/ApiKey.js';
import textCaptcha from '../captchaSystems/textCaptcha.js';
import imageCaptcha from '../captchaSystems/imageCaptcha.js';
import audioCaptcha from '../captchaSystems/audioCaptcha.js';
import noCaptcha from '../captchaSystems/noCaptcha.js';
import logger from '../utils/logger.js';
import config from '../config.js';
import apiKeyController from './apiKeyController.js';

class CaptchaController {
  constructor() {
    this.generate = this.generate.bind(this);
    this.verify = this.verify.bind(this);
    this.validateApiKey = this.validateApiKey.bind(this);
  }

 async validateApiKey(req, res, next) {
  try {
    let apiKey = req.headers['x-api-key'] || req.query['x-api-key'];
    if (!apiKey) {
      logger.error('Chybějící API klíč v hlavičce nebo query');
      return res.status(401).json({ error: 'API_KEY_REQUIRED' });
    }
    const encryptedKey = apiKeyController.encryptKey(apiKey);
    const keyDoc = await ApiKey.findOne({ apiKey: encryptedKey });
    if (!keyDoc) {
      logger.error('Neplatný API klíč');
      return res.status(403).json({ error: 'INVALID_API_KEY' });
    }
    next();
  } catch (error) {
    logger.error('Chyba validace API klíče:', error);
    res.status(500).json({ error: 'Interní chyba serveru' });
  }
}

  #captchaHandlers = {
    text: textCaptcha,
    image: imageCaptcha,
    audio: audioCaptcha,
    nocaptcha: noCaptcha
  };

  #validateCaptchaType(type) {
    if (!this.#captchaHandlers[type]) {
      throw new Error('NEVALIDNÍ_TYP_CAPTCHA');
    }
  }

  #validateVerificationInput(type, token, answer) {
    const errors = [];
    
    if (!type) errors.push('Chybějící typ CAPTCHA');
    if (!token) errors.push('Chybějící token');
    if (!answer) errors.push('Chybějící odpověď');
    
    if (errors.length > 0) {
      throw new Error(`NEKOMPLETNÍ_DATA: ${errors.join(', ')}`);
    }
  }

  #handleError(error, res, context) {
    const errorMap = {
      'INVALID_API_KEY': { status: 403, message: 'Neplatný API klíč' },
      'NEVALIDNÍ_TYP_CAPTCHA': { status: 400, message: 'Nepodporovaný typ CAPTCHA' },
      'NEKOMPLETNÍ_DATA': { status: 400, message: error.message.replace('NEKOMPLETNÍ_DATA: ', '') },
      'ERR_MODULE_NOT_FOUND': { status: 500, message: 'Chyba v závislostech' },
      'ENOENT': { status: 500, message: 'Chyba při vytváření souboru' }
    };

    const defaultError = { 
      status: 500, 
      message: 'Interní chyba serveru' 
    };

    const { status, message } = errorMap[error.message.split(':')[0]] || defaultError;

    logger.error(`Chyba CaptchaController (${context})`, {
      error: error.message,
      stack: error.stack
    });

    res.status(status).json({
      success: false,
      error: message,
      ...(config.NODE_ENV === 'development' && { debug: error.message })
    });
  }

  async generate(req, res) {
    try {
      const { type = 'text', lang = 'cs' } = req.query;
      this.#validateCaptchaType(type);
      await apiKeyController.trackUsage(req.headers['x-api-key']);
      const handler = this.#captchaHandlers[type];
      let result;
      if (type === 'audio') {
        result = await handler.generate(lang);
      } else {
        result = await handler.generate();
      }
      const { token, ...captchaData } = result;
      res.json({
        success: true,
        data: { token, ...captchaData, ttl: config.captchaTTL }
      });
    } catch (error) {
      this.#handleError(error, res, 'generate');
    }
  }
  

  async verify(req, res) {
    try {
      const { type, token, answer, interactionData } = req.body;

      this.#validateVerificationInput(type, token, answer || interactionData);

      const handler = this.#captchaHandlers[type];
      const isValid = type === 'nocaptcha' 
        ? await handler.verify(token, interactionData)
        : await handler.verify(token, answer);

      logger.info(`CAPTCHA ověřena`, { type, token, status: isValid ? 'valid' : 'invalid' });

      res.json({
        success: isValid,
        message: isValid ? 'CAPTCHA ověřena' : 'Neplatná odpověď'
      });
    } catch (error) {
      this.#handleError(error, res, 'verify');
    }
  }
}

export default new CaptchaController();