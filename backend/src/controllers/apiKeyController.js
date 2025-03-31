import crypto from 'crypto';
import ApiKey from '../models/ApiKey.js';
import logger from '../utils/logger.js';
import nodemailer from 'nodemailer';

class ApiKeyController {
  #encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
  #iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

  constructor() {
    this.create = this.create.bind(this);
    this.verify = this.verify.bind(this);
    this.resetKey = this.resetKey.bind(this); 
    this.trackUsage = this.trackUsage.bind(this);
    this.forgotKey = this.forgotKey.bind(this);
  }

  encryptKey(text) {
    try {
      return this.#encrypt(text); 
    } catch (error) {
      logger.error('Šifrování klíče selhalo', { error });
      throw new Error('ENCRYPTION_ERROR');
    }
  }

  #encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.#encryptionKey, this.#iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  #decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.#encryptionKey, this.#iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async create(req, res) {
    try {
      const { clientName, clientEmail, websiteUrl } = req.body;
      const normalizedEmail = clientEmail.trim().toLowerCase();

      const errors = {};
      if (!clientName?.trim()) errors.clientName = 'Vyplňte jméno klienta';
      if (!normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.clientEmail = 'Neplatný formát emailu';
      
      let normalizedUrl = websiteUrl.trim();
      if (!normalizedUrl.match(/^(https?:\/\/)/i)) {
        normalizedUrl = `https://${normalizedUrl}`;
      }
      if (!normalizedUrl.match(/^(https?:\/\/)?([\w-]+\.?)+(:\d+)?(\/[\w-~%@&+?:#=]*)*$/i)) {
        errors.websiteUrl = 'Neplatný formát URL';
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          error: 'NEVALIDNÍ_VSTUP',
          details: errors
        });
      }

      const existing = await ApiKey.findOne({ clientEmail: normalizedEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: 'DUPLICITNÍ_ZÁZNAM',
          details: 'Tento email je již registrován'
        });
      }

      const apiKey = crypto.randomBytes(32).toString('hex');
      const encryptedKey = this.#encrypt(apiKey);

      const newKey = new ApiKey({
        clientName: clientName.trim(),
        clientEmail: normalizedEmail,
        websiteUrl: normalizedUrl,
        apiKey: encryptedKey
      });

      await newKey.save();

      res.status(201).json({
        success: true,
        data: {
          key: apiKey,
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        }
      });

    } catch (error) {
      logger.error('Chyba při vytváření klíče:', error);
      this.#handleError(error, res, 'create');
    }
  }

  async resetKey(req, res) {
    try {
      const { token } = req.body;
      
      const user = await ApiKey.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
      }).select('+resetToken +resetTokenExpiry'); 
  
      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_TOKEN'
        });
      }
  
      const newApiKey = crypto.randomBytes(32).toString('hex');
      const encryptedKey = this.#encrypt(newApiKey);
  
      user.apiKey = encryptedKey;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      await this.#sendNewKeyEmail(user.clientEmail, newApiKey);
  
      res.json({ 
        success: true,
        data: { key: newApiKey }
      });  
  
    } catch (error) {
      logger.error('Chyba v resetKey', { error: error.stack });
      this.#handleError(error, res, 'resetKey');
    }
  }

  async forgotKey(req, res) {
    try {
      const { clientEmail } = req.body;
      
      const user = await ApiKey.findOne({ clientEmail });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'EMAIL_NOT_FOUND'
        });
      }
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; 
  
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
  
      const resetLink = `http://localhost:3002/reset-api-key?token=${resetToken}`;
      await this.#sendResetEmail(clientEmail, resetLink);
      
      res.json({
        success: true,
        message: 'Resetovací odkaz byl odeslán na váš e-mail.'
      });
    } catch (error) {
      logger.error('Chyba v forgotKey', { error: error.stack });
      this.#handleError(error, res, 'forgotKey');
    }
  }

  async #sendResetEmail(clientEmail, resetLink) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
    const mailOptions = {
      from: `"CAPTCHA Systém" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: 'Resetování API klíče',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: #f8f9fa; padding: 30px; border-radius: 15px 15px 0 0;">
            <h1 style="margin: 0; color: #2196F3; font-size: 24px;">CAPTCHA API Systém</h1>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #444; margin-top: 0;">Resetování API klíče</h2>
            <p style="font-size: 16px;">Pro resetování vašeho API klíče klikněte na následující odkaz:</p>
    
            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetLink}" 
                 style="display: inline-block; background: #2196F3; color: white; padding: 12px 20px; 
                        text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">
                Resetovat API klíč
              </a>
            </div>
    
            <p style="font-size: 14px; color: #666;">Pokud jste o reset nežádali, tento e-mail ignorujte.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 15px 15px;">
            <p>Tento e-mail byl automaticky vygenerován systémem CAPTCHA</p>
            <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} CAPTCHA Systém</p>
          </div>
        </div>
      `
    };
  
    await transporter.sendMail(mailOptions);
  }

  async #sendNewKeyEmail(email, apiKey) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
    const mailOptions = {
      from: `"CAPTCHA Systém" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Váš nový API klíč',
      html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px 15px 0 0;">
          <h1 style="margin: 0; color: #2196F3; font-size: 24px;">CAPTCHA API Systém</h1>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #444; margin-top: 0;">Nový API klíč</h2>
          <p style="font-size: 16px;">Váš nový API klíč:</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <code style="font-size: 18px; font-weight: bold; color: #2196F3;">${apiKey}</code>
          </div>
          
          <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #e65100; margin: 0;">
              ⚠️ Uložte si klíč na bezpečné místo.
            </p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 15px 15px;">
          <p>Tento e-mail byl automaticky vygenerován systémem CAPTCHA</p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} CAPTCHA Systém</p>
        </div>
      </div>
      `
    };
  
    await transporter.sendMail(mailOptions);
  }

  async verify(req, res) {
    try {
      const { apiKey } = req.body;
      console.log('Received API Key:', apiKey); 
      const encryptedKey = this.#encrypt(apiKey);
      console.log('Encrypted Key:', encryptedKey); 

      if (!apiKey?.trim()) {
        logger.warn('Chybějící API klíč v požadavku');
        return res.status(400).json({
          success: false,
          error: 'API_KEY_REQUIRED'
        });
      }

      const exists = await ApiKey.findOne({ apiKey: encryptedKey });

      if (!exists) {
        logger.warn('Pokus o ověření neplatného klíče', { apiKey });
        return res.status(403).json({
          success: false,
          error: 'INVALID_API_KEY'
        });
      }

      logger.debug('API klíč ověřen', { apiKey });
      res.json({ success: true });
    } catch (error) {
      logger.error('Chyba při ověřování API klíče', { error: error.stack });
      this.#handleError(error, res, 'verify');
    }
  }

  async trackUsage(apiKey) {
    try {
      const encryptedKey = this.#encrypt(apiKey);
      await ApiKey.updateOne(
        { apiKey: encryptedKey },
        { $inc: { usageCount: 1 } } // Zvýšení počítadla použití
      );
      logger.debug('Sledování použití API klíče', { apiKey });
    } catch (error) {
      logger.error('Chyba při sledování použití API klíče', { error: error.stack });
    }
  }

  #handleError(error, res, context) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    const response = {
      success: false,
      error: 'INTERNÍ_CHYBA_SERVERU'
    };

    if (process.env.NODE_ENV === 'development') {
      response.details = error.message;
    }

    logger.error(`Chyba API Key Controller (${context})`, {
      error: error.message,
      stack: error.stack
    });

    res.status(statusCode).json(response);
  }
}

const apiKeyControllerInstance = new ApiKeyController();
export default apiKeyControllerInstance;