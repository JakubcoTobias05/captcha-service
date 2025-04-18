function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["token"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
import ApiKey from '../models/ApiKey.js';
import textCaptcha from '../captchaSystems/textCaptcha.js';
import imageCaptcha from '../captchaSystems/imageCaptcha.js';
import audioCaptcha from '../captchaSystems/audioCaptcha.js';
import noCaptcha from '../captchaSystems/noCaptcha.js';
import logger from '../utils/logger.js';
import config from '../config.js';
import apiKeyController from './apiKeyController.js';
var _captchaHandlers = /*#__PURE__*/new WeakMap();
var _CaptchaController_brand = /*#__PURE__*/new WeakSet();
var CaptchaController = /*#__PURE__*/function () {
  function CaptchaController() {
    _classCallCheck(this, CaptchaController);
    _classPrivateMethodInitSpec(this, _CaptchaController_brand);
    _classPrivateFieldInitSpec(this, _captchaHandlers, {
      text: textCaptcha,
      image: imageCaptcha,
      audio: audioCaptcha,
      nocaptcha: noCaptcha
    });
    this.generate = this.generate.bind(this);
    this.verify = this.verify.bind(this);
    this.validateApiKey = this.validateApiKey.bind(this);
  }
  return _createClass(CaptchaController, [{
    key: "validateApiKey",
    value: function () {
      var _validateApiKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
        var apiKey, encryptedKey, keyDoc;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              apiKey = req.headers['x-api-key'] || req.query['x-api-key'];
              if (apiKey) {
                _context.next = 5;
                break;
              }
              logger.error('Chybějící API klíč v hlavičce nebo query');
              return _context.abrupt("return", res.status(401).json({
                error: 'API_KEY_REQUIRED'
              }));
            case 5:
              encryptedKey = apiKeyController.encryptKey(apiKey);
              _context.next = 8;
              return ApiKey.findOne({
                apiKey: encryptedKey
              });
            case 8:
              keyDoc = _context.sent;
              if (keyDoc) {
                _context.next = 12;
                break;
              }
              logger.error('Neplatný API klíč');
              return _context.abrupt("return", res.status(403).json({
                error: 'INVALID_API_KEY'
              }));
            case 12:
              next();
              _context.next = 19;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              logger.error('Chyba validace API klíče:', _context.t0);
              res.status(500).json({
                error: 'Interní chyba serveru'
              });
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 15]]);
      }));
      function validateApiKey(_x, _x2, _x3) {
        return _validateApiKey.apply(this, arguments);
      }
      return validateApiKey;
    }()
  }, {
    key: "generate",
    value: function () {
      var _generate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var _req$query, _req$query$type, type, _req$query$lang, lang, handler, result, _result, token, captchaData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$query = req.query, _req$query$type = _req$query.type, type = _req$query$type === void 0 ? 'text' : _req$query$type, _req$query$lang = _req$query.lang, lang = _req$query$lang === void 0 ? 'cs' : _req$query$lang;
              _assertClassBrand(_CaptchaController_brand, this, _validateCaptchaType).call(this, type);
              _context2.next = 5;
              return apiKeyController.trackUsage(req.headers['x-api-key']);
            case 5:
              handler = _classPrivateFieldGet(_captchaHandlers, this)[type];
              if (!(type === 'audio')) {
                _context2.next = 12;
                break;
              }
              _context2.next = 9;
              return handler.generate(lang);
            case 9:
              result = _context2.sent;
              _context2.next = 15;
              break;
            case 12:
              _context2.next = 14;
              return handler.generate();
            case 14:
              result = _context2.sent;
            case 15:
              _result = result, token = _result.token, captchaData = _objectWithoutProperties(_result, _excluded);
              res.json({
                success: true,
                data: _objectSpread(_objectSpread({
                  token: token
                }, captchaData), {}, {
                  ttl: config.captchaTTL
                })
              });
              _context2.next = 22;
              break;
            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              _assertClassBrand(_CaptchaController_brand, this, _handleError).call(this, _context2.t0, res, 'generate');
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 19]]);
      }));
      function generate(_x4, _x5) {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var _req$body, type, token, answer, interactionData, handler, isValid;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              logger.debug("NoCaptcha verify request body:", req.body);
              _req$body = req.body, type = _req$body.type, token = _req$body.token, answer = _req$body.answer, interactionData = _req$body.interactionData;
              _assertClassBrand(_CaptchaController_brand, this, _validateVerificationInput).call(this, type, token, answer || interactionData);
              handler = _classPrivateFieldGet(_captchaHandlers, this)[type];
              if (!(type === 'nocaptcha')) {
                _context3.next = 11;
                break;
              }
              _context3.next = 8;
              return handler.verify(token, interactionData);
            case 8:
              _context3.t0 = _context3.sent;
              _context3.next = 14;
              break;
            case 11:
              _context3.next = 13;
              return handler.verify(token, answer);
            case 13:
              _context3.t0 = _context3.sent;
            case 14:
              isValid = _context3.t0;
              logger.info("CAPTCHA ov\u011B\u0159ena", {
                type: type,
                token: token,
                status: isValid ? 'valid' : 'invalid'
              });
              res.json({
                success: isValid,
                message: isValid ? 'CAPTCHA ověřena' : 'Neplatná odpověď'
              });
              _context3.next = 22;
              break;
            case 19:
              _context3.prev = 19;
              _context3.t1 = _context3["catch"](0);
              _assertClassBrand(_CaptchaController_brand, this, _handleError).call(this, _context3.t1, res, 'verify');
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 19]]);
      }));
      function verify(_x6, _x7) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }]);
}();
function _validateCaptchaType(type) {
  if (!_classPrivateFieldGet(_captchaHandlers, this)[type]) {
    throw new Error('NEVALIDNÍ_TYP_CAPTCHA');
  }
}
function _validateVerificationInput(type, token, answer) {
  var errors = [];
  if (!type) errors.push('Chybějící typ CAPTCHA');
  if (!token) errors.push('Chybějící token');
  if (!answer) errors.push('Chybějící odpověď');
  if (errors.length > 0) {
    throw new Error("NEKOMPLETN\xCD_DATA: ".concat(errors.join(', ')));
  }
}
function _handleError(error, res, context) {
  var errorMap = {
    'INVALID_API_KEY': {
      status: 403,
      message: 'Neplatný API klíč'
    },
    'NEVALIDNÍ_TYP_CAPTCHA': {
      status: 400,
      message: 'Nepodporovaný typ CAPTCHA'
    },
    'NEKOMPLETNÍ_DATA': {
      status: 400,
      message: error.message.replace('NEKOMPLETNÍ_DATA: ', '')
    },
    'ERR_MODULE_NOT_FOUND': {
      status: 500,
      message: 'Chyba v závislostech'
    },
    'ENOENT': {
      status: 500,
      message: 'Chyba při vytváření souboru'
    }
  };
  var defaultError = {
    status: 500,
    message: 'Interní chyba serveru'
  };
  var _ref = errorMap[error.message.split(':')[0]] || defaultError,
    status = _ref.status,
    message = _ref.message;
  logger.error("Chyba CaptchaController (".concat(context, ")"), {
    error: error.message,
    stack: error.stack
  });
  res.status(status).json(_objectSpread({
    success: false,
    error: message
  }, config.NODE_ENV === 'development' && {
    debug: error.message
  }));
}
export default new CaptchaController();