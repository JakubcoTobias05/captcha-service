"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiKeyController = _interopRequireDefault(require("../controllers/apiKeyController.js"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var createLimiter = (0, _expressRateLimit["default"])({
  windowMs: 24 * 60 * 60 * 1000,
  // 24 hodin
  max: 5,
  // maximálně 5 požadavků za den
  message: 'Příliš mnoho žádostí o nové klíče'
});
router.post('/keys', createLimiter, _apiKeyController["default"].create);
router.post('/verify', _apiKeyController["default"].verify);
router.post('/forgot-key', _apiKeyController["default"].forgotKey);
router.post('/reset-key', _apiKeyController["default"].resetKey);
var _default = exports["default"] = router;