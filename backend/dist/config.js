"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var requiredEnv = ['ENCRYPTION_KEY', 'ENCRYPTION_IV', 'EMAIL_USER', 'EMAIL_PASS', 'REDIS_HOST', 'REDIS_PORT', 'REDIS_USER', 'REDIS_PASS'];
requiredEnv.forEach(function (env) {
  if (!process.env[env]) throw new Error("Chyb\u011Bj\xEDc\xED ".concat(env, " v .env"));
});
var _default = exports["default"] = {
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
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: false
  },
  noCaptcha: {
    minMouseMovements: 1,
    minClicks: 0,
    minInteractionTime: 0
  }
};