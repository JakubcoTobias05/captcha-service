import express from 'express';
import apiKeyController from '../controllers/apiKeyController.js';
import rateLimit from 'express-rate-limit';
var router = express.Router();
var createLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  // 24 hodin
  max: 5,
  // maximálně 5 požadavků za den
  message: 'Příliš mnoho žádostí o nové klíče'
});
router.post('/keys', createLimiter, apiKeyController.create);
router.post('/verify', apiKeyController.verify);
router.post('/forgot-key', apiKeyController.forgotKey);
router.post('/reset-key', apiKeyController.resetKey);
export default router;