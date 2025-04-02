"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var apiKeySchema = new _mongoose["default"].Schema({
  clientName: {
    type: String,
    required: [true, 'Jméno klienta je povinné'],
    trim: true
  },
  clientEmail: {
    type: String,
    required: [true, 'Email je povinný'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Zadejte platný email'],
    unique: [true, 'Tento email je již registrován']
  },
  websiteUrl: {
    type: String,
    required: [true, 'URL webu je povinná'],
    trim: true
  },
  apiKey: {
    type: String,
    required: true,
    unique: true
  },
  usageCount: {
    type: Number,
    "default": 0
  },
  resetToken: {
    type: String,
    select: false
  },
  resetTokenExpiry: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    expires: '365d'
  }
});
var _default = exports["default"] = _mongoose["default"].model('ApiKey', apiKeySchema);