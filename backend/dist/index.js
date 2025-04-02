"use strict";

var _server = _interopRequireDefault(require("./server.js"));
var _logger = _interopRequireDefault(require("./utils/logger.js"));
var _events = require("events");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_events.EventEmitter.defaultMaxListeners = 2000;
process.on('unhandledRejection', function (reason) {
  _logger["default"].error("Neo\u0161et\u0159en\xE1 promise rejection: ".concat(reason.stack));
});
process.on('uncaughtException', function (error) {
  _logger["default"].error("Neo\u0161et\u0159en\xE1 v\xFDjimka: ".concat(error.stack));
  process.exit(1);
});
_server["default"].start();