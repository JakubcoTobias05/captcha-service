function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
import crypto from 'crypto';
import ApiKey from '../models/ApiKey.js';
import logger from '../utils/logger.js';
import nodemailer from 'nodemailer';
var _encryptionKey = /*#__PURE__*/new WeakMap();
var _iv = /*#__PURE__*/new WeakMap();
var _ApiKeyController_brand = /*#__PURE__*/new WeakSet();
var ApiKeyController = /*#__PURE__*/function () {
  function ApiKeyController() {
    _classCallCheck(this, ApiKeyController);
    _classPrivateMethodInitSpec(this, _ApiKeyController_brand);
    _classPrivateFieldInitSpec(this, _encryptionKey, Buffer.from(process.env.ENCRYPTION_KEY, 'hex'));
    _classPrivateFieldInitSpec(this, _iv, Buffer.from(process.env.ENCRYPTION_IV, 'hex'));
    this.create = this.create.bind(this);
    this.verify = this.verify.bind(this);
    this.resetKey = this.resetKey.bind(this);
    this.trackUsage = this.trackUsage.bind(this);
    this.forgotKey = this.forgotKey.bind(this);
  }
  return _createClass(ApiKeyController, [{
    key: "encryptKey",
    value: function encryptKey(text) {
      try {
        return _assertClassBrand(_ApiKeyController_brand, this, _encrypt).call(this, text);
      } catch (error) {
        logger.error('Šifrování klíče selhalo', {
          error: error
        });
        throw new Error('ENCRYPTION_ERROR');
      }
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var _req$body, clientName, clientEmail, websiteUrl, normalizedEmail, errors, normalizedUrl, existing, apiKey, encryptedKey, newKey;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, clientName = _req$body.clientName, clientEmail = _req$body.clientEmail, websiteUrl = _req$body.websiteUrl;
              normalizedEmail = clientEmail.trim().toLowerCase();
              errors = {};
              if (!(clientName !== null && clientName !== void 0 && clientName.trim())) errors.clientName = 'Vyplňte jméno klienta';
              if (!normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.clientEmail = 'Neplatný formát emailu';
              normalizedUrl = websiteUrl.trim();
              if (!normalizedUrl.match(/^(https?:\/\/)/i)) {
                normalizedUrl = "https://".concat(normalizedUrl);
              }
              if (!normalizedUrl.match(/^(https?:\/\/)?([\w-]+\.?)+(:\d+)?(\/[\w-~%@&+?:#=]*)*$/i)) {
                errors.websiteUrl = 'Neplatný formát URL';
              }
              if (!(Object.keys(errors).length > 0)) {
                _context.next = 11;
                break;
              }
              return _context.abrupt("return", res.status(400).json({
                success: false,
                error: 'NEVALIDNÍ_VSTUP',
                details: errors
              }));
            case 11:
              _context.next = 13;
              return ApiKey.findOne({
                clientEmail: normalizedEmail
              });
            case 13:
              existing = _context.sent;
              if (!existing) {
                _context.next = 16;
                break;
              }
              return _context.abrupt("return", res.status(409).json({
                success: false,
                error: 'DUPLICITNÍ_ZÁZNAM',
                details: 'Tento email je již registrován'
              }));
            case 16:
              apiKey = crypto.randomBytes(32).toString('hex');
              encryptedKey = _assertClassBrand(_ApiKeyController_brand, this, _encrypt).call(this, apiKey);
              newKey = new ApiKey({
                clientName: clientName.trim(),
                clientEmail: normalizedEmail,
                websiteUrl: normalizedUrl,
                apiKey: encryptedKey
              });
              _context.next = 21;
              return newKey.save();
            case 21:
              _context.next = 23;
              return _assertClassBrand(_ApiKeyController_brand, this, _sendNewKeyEmail).call(this, normalizedEmail, apiKey);
            case 23:
              res.status(201).json({
                success: true,
                data: {
                  key: apiKey,
                  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                }
              });
              _context.next = 30;
              break;
            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](0);
              logger.error('Chyba při vytváření klíče:', _context.t0);
              _assertClassBrand(_ApiKeyController_brand, this, _handleError).call(this, _context.t0, res, 'create');
            case 30:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 26]]);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "resetKey",
    value: function () {
      var _resetKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var token, user, newApiKey, encryptedKey;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              token = req.body.token;
              _context2.next = 4;
              return ApiKey.findOne({
                resetToken: token,
                resetTokenExpiry: {
                  $gt: Date.now()
                }
              }).select('+resetToken +resetTokenExpiry');
            case 4:
              user = _context2.sent;
              if (user) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", res.status(400).json({
                success: false,
                error: 'INVALID_TOKEN'
              }));
            case 7:
              newApiKey = crypto.randomBytes(32).toString('hex');
              encryptedKey = _assertClassBrand(_ApiKeyController_brand, this, _encrypt).call(this, newApiKey);
              user.apiKey = encryptedKey;
              user.resetToken = undefined;
              user.resetTokenExpiry = undefined;
              _context2.next = 14;
              return user.save();
            case 14:
              _context2.next = 16;
              return _assertClassBrand(_ApiKeyController_brand, this, _sendNewKeyEmail).call(this, user.clientEmail, newApiKey);
            case 16:
              res.json({
                success: true,
                data: {
                  key: newApiKey
                }
              });
              _context2.next = 23;
              break;
            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              logger.error('Chyba v resetKey', {
                error: _context2.t0.stack
              });
              _assertClassBrand(_ApiKeyController_brand, this, _handleError).call(this, _context2.t0, res, 'resetKey');
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 19]]);
      }));
      function resetKey(_x3, _x4) {
        return _resetKey.apply(this, arguments);
      }
      return resetKey;
    }()
  }, {
    key: "forgotKey",
    value: function () {
      var _forgotKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var clientEmail, user, resetToken, resetTokenExpiry, resetLink;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              clientEmail = req.body.clientEmail;
              _context3.next = 4;
              return ApiKey.findOne({
                clientEmail: clientEmail
              });
            case 4:
              user = _context3.sent;
              if (user) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", res.status(404).json({
                success: false,
                error: 'EMAIL_NOT_FOUND'
              }));
            case 7:
              resetToken = crypto.randomBytes(32).toString('hex');
              resetTokenExpiry = Date.now() + 3600000;
              user.resetToken = resetToken;
              user.resetTokenExpiry = resetTokenExpiry;
              _context3.next = 13;
              return user.save();
            case 13:
              resetLink = "https://captcha-spst.netlify.app/reset-api-key?token=".concat(resetToken);
              _context3.next = 16;
              return _assertClassBrand(_ApiKeyController_brand, this, _sendResetEmail).call(this, clientEmail, resetLink);
            case 16:
              res.json({
                success: true,
                message: 'Resetovací odkaz byl odeslán na váš e-mail.'
              });
              _context3.next = 23;
              break;
            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              logger.error('Chyba v forgotKey', {
                error: _context3.t0.stack
              });
              _assertClassBrand(_ApiKeyController_brand, this, _handleError).call(this, _context3.t0, res, 'forgotKey');
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 19]]);
      }));
      function forgotKey(_x5, _x6) {
        return _forgotKey.apply(this, arguments);
      }
      return forgotKey;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var apiKey, encryptedKey, exists;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              apiKey = req.body.apiKey;
              console.log('Received API Key:', apiKey);
              encryptedKey = _assertClassBrand(_ApiKeyController_brand, this, _encrypt).call(this, apiKey);
              console.log('Encrypted Key:', encryptedKey);
              if (apiKey !== null && apiKey !== void 0 && apiKey.trim()) {
                _context4.next = 8;
                break;
              }
              logger.warn('Chybějící API klíč v požadavku');
              return _context4.abrupt("return", res.status(400).json({
                success: false,
                error: 'API_KEY_REQUIRED'
              }));
            case 8:
              _context4.next = 10;
              return ApiKey.findOne({
                apiKey: encryptedKey
              });
            case 10:
              exists = _context4.sent;
              if (exists) {
                _context4.next = 14;
                break;
              }
              logger.warn('Pokus o ověření neplatného klíče', {
                apiKey: apiKey
              });
              return _context4.abrupt("return", res.status(403).json({
                success: false,
                error: 'INVALID_API_KEY'
              }));
            case 14:
              logger.debug('API klíč ověřen', {
                apiKey: apiKey
              });
              res.json({
                success: true
              });
              _context4.next = 22;
              break;
            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](0);
              logger.error('Chyba při ověřování API klíče', {
                error: _context4.t0.stack
              });
              _assertClassBrand(_ApiKeyController_brand, this, _handleError).call(this, _context4.t0, res, 'verify');
            case 22:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 18]]);
      }));
      function verify(_x7, _x8) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "trackUsage",
    value: function () {
      var _trackUsage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(apiKey) {
        var encryptedKey;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              encryptedKey = _assertClassBrand(_ApiKeyController_brand, this, _encrypt).call(this, apiKey);
              _context5.next = 4;
              return ApiKey.updateOne({
                apiKey: encryptedKey
              }, {
                $inc: {
                  usageCount: 1
                }
              });
            case 4:
              logger.debug('Sledování použití API klíče', {
                apiKey: apiKey
              });
              _context5.next = 10;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              logger.error('Chyba při sledování použití API klíče', {
                error: _context5.t0.stack
              });
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function trackUsage(_x9) {
        return _trackUsage.apply(this, arguments);
      }
      return trackUsage;
    }()
  }]);
}();
function _encrypt(text) {
  var cipher = crypto.createCipheriv('aes-256-cbc', _classPrivateFieldGet(_encryptionKey, this), _classPrivateFieldGet(_iv, this));
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher["final"]('hex');
  return encrypted;
}
function _decrypt(encryptedText) {
  var decipher = crypto.createDecipheriv('aes-256-cbc', _classPrivateFieldGet(_encryptionKey, this), _classPrivateFieldGet(_iv, this));
  var decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher["final"]('utf8');
  return decrypted;
}
function _sendResetEmail(_x10, _x11) {
  return _sendResetEmail2.apply(this, arguments);
}
function _sendResetEmail2() {
  _sendResetEmail2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(clientEmail, resetLink) {
    var transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          mailOptions = {
            from: "\"CAPTCHA Syst\xE9m\" <".concat(process.env.EMAIL_USER, ">"),
            to: clientEmail,
            subject: 'Resetování API klíče',
            html: "\n        <div style=\"font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;\">\n          <div style=\"background: #f8f9fa; padding: 30px; border-radius: 15px 15px 0 0;\">\n            <h1 style=\"margin: 0; color: #2196F3; font-size: 24px;\">CAPTCHA API Syst\xE9m</h1>\n          </div>\n          \n          <div style=\"padding: 30px; background: white;\">\n            <h2 style=\"color: #444; margin-top: 0;\">Resetov\xE1n\xED API kl\xED\u010De</h2>\n            <p style=\"font-size: 16px;\">Pro resetov\xE1n\xED va\u0161eho API kl\xED\u010De klikn\u011Bte na n\xE1sleduj\xEDc\xED odkaz:</p>\n    \n            <div style=\"text-align: center; margin: 20px 0;\">\n              <a href=\"".concat(resetLink, "\" \n                 style=\"display: inline-block; background: #2196F3; color: white; padding: 12px 20px; \n                        text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;\">\n                Resetovat API kl\xED\u010D\n              </a>\n            </div>\n    \n            <p style=\"font-size: 14px; color: #666;\">Pokud jste o reset ne\u017E\xE1dali, tento e-mail ignorujte.</p>\n          </div>\n          \n          <div style=\"background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 15px 15px;\">\n            <p>Tento e-mail byl automaticky vygenerov\xE1n syst\xE9mem CAPTCHA</p>\n            <p style=\"margin: 5px 0 0;\">\xA9 ").concat(new Date().getFullYear(), " CAPTCHA Syst\xE9m</p>\n          </div>\n        </div>\n      ")
          };
          _context6.next = 4;
          return transporter.sendMail(mailOptions);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _sendResetEmail2.apply(this, arguments);
}
function _sendNewKeyEmail(_x12, _x13) {
  return _sendNewKeyEmail2.apply(this, arguments);
}
function _sendNewKeyEmail2() {
  _sendNewKeyEmail2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(email, apiKey) {
    var transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          mailOptions = {
            from: "\"CAPTCHA Syst\xE9m\" <".concat(process.env.EMAIL_USER, ">"),
            to: email,
            subject: 'Váš nový API klíč',
            html: "\n      <div style=\"font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;\">\n        <div style=\"background: #f8f9fa; padding: 30px; border-radius: 15px 15px 0 0;\">\n          <h1 style=\"margin: 0; color: #2196F3; font-size: 24px;\">CAPTCHA API Syst\xE9m</h1>\n        </div>\n        \n        <div style=\"padding: 30px; background: white;\">\n          <h2 style=\"color: #444; margin-top: 0;\">Nov\xFD API kl\xED\u010D</h2>\n          <p style=\"font-size: 16px;\">V\xE1\u0161 nov\xFD API kl\xED\u010D:</p>\n          \n          <div style=\"background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;\">\n            <code style=\"font-size: 18px; font-weight: bold; color: #2196F3;\">".concat(apiKey, "</code>\n          </div>\n          \n          <div style=\"background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;\">\n            <p style=\"color: #e65100; margin: 0;\">\n              \u26A0\uFE0F Ulo\u017Ete si kl\xED\u010D na bezpe\u010Dn\xE9 m\xEDsto.\n            </p>\n          </div>\n        </div>\n        \n        <div style=\"background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 15px 15px;\">\n          <p>Tento e-mail byl automaticky vygenerov\xE1n syst\xE9mem CAPTCHA</p>\n          <p style=\"margin: 5px 0 0;\">\xA9 ").concat(new Date().getFullYear(), " CAPTCHA Syst\xE9m</p>\n        </div>\n      </div>\n      ")
          };
          _context7.next = 4;
          return transporter.sendMail(mailOptions);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _sendNewKeyEmail2.apply(this, arguments);
}
function _handleError(error, res, context) {
  var statusCode = error.name === 'ValidationError' ? 400 : 500;
  var response = {
    success: false,
    error: 'INTERNÍ_CHYBA_SERVERU'
  };
  if (process.env.NODE_ENV === 'development') {
    response.details = error.message;
  }
  logger.error("Chyba API Key Controller (".concat(context, ")"), {
    error: error.message,
    stack: error.stack
  });
  res.status(statusCode).json(response);
}
var apiKeyControllerInstance = new ApiKeyController();
export default apiKeyControllerInstance;