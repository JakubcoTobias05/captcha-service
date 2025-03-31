import 'dotenv/config';

const requiredEnv = [
  'ENCRYPTION_KEY',
  'ENCRYPTION_IV',
  'EMAIL_USER',
  'EMAIL_PASS',
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_USER',
  'REDIS_PASS'
];

requiredEnv.forEach(env => {
  if (!process.env[env]) throw new Error(`Chybějící ${env} v .env`);
});

export default {
  port: process.env.PORT || 3001,
  captchaTTL: 300,
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
  textCaptchaLength: parseInt(process.env.TEXT_CAPTCHA_LENGTH, 10) || 6,
  
  mongo: {
    uri: process.env.DB_URI,
    options: { 
      authSource: "admin",
      authMechanism: 'SCRAM-SHA-256',
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    user: process.env.REDIS_USER,
    pass: process.env.REDIS_PASS,
    tls: process.env.REDIS_TLS === 'true'
  },
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3002', 'http://localhost:5500',  'http://127.0.0.1:5500', 'https://captcha-spst.netlify.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'], 
    credentials: true
  },

  noCaptcha: {
    minMouseMovements: 5,
    minClicks: 1,
    minInteractionTime: 500
  }  
};