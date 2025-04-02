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
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
import crypto from 'crypto';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/logger.js';
import config from '../config.js';
var _NoCaptcha_brand = /*#__PURE__*/new WeakSet();
var NoCaptcha = /*#__PURE__*/function () {
  function NoCaptcha() {
    var _config$noCaptcha, _config$noCaptcha2, _config$noCaptcha3;
    _classCallCheck(this, NoCaptcha);
    _classPrivateMethodInitSpec(this, _NoCaptcha_brand);
    this.CAPTCHA_TTL = config.captchaTTL;
    this.MIN_MOVEMENTS = ((_config$noCaptcha = config.noCaptcha) === null || _config$noCaptcha === void 0 ? void 0 : _config$noCaptcha.minMouseMovements) || 5;
    this.MIN_CLICKS = ((_config$noCaptcha2 = config.noCaptcha) === null || _config$noCaptcha2 === void 0 ? void 0 : _config$noCaptcha2.minClicks) || 1;
    this.MIN_TIME = ((_config$noCaptcha3 = config.noCaptcha) === null || _config$noCaptcha3 === void 0 ? void 0 : _config$noCaptcha3.minInteractionTime) || 500;
  }
  return _createClass(NoCaptcha, [{
    key: "generate",
    value: function () {
      var _generate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var token, challenge;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              token = crypto.randomBytes(32).toString('hex');
              challenge = {
                createdAt: Date.now(),
                secret: crypto.randomBytes(16).toString('hex')
              };
              _context.next = 5;
              return redisClient.set("captcha:nocaptcha:".concat(token), JSON.stringify(challenge), {
                EX: this.CAPTCHA_TTL
              });
            case 5:
              return _context.abrupt("return", {
                token: token,
                interactionConfig: {
                  requiredMovements: this.MIN_MOVEMENTS,
                  requiredClicks: this.MIN_CLICKS,
                  requiredTime: this.MIN_TIME
                },
                instructions: 'Proveďte přirozenou interakci s prvkem'
              });
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              logger.error('NoCAPTCHA generation failed', {
                error: _context.t0.stack
              });
              throw new Error('CAPTCHA_GENERATION_FAILED');
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 8]]);
      }));
      function generate() {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token, interactionData) {
        var storedData, _JSON$parse, secret, _interactionData$mous, mouseTrail, _interactionData$clic, clickTimestamps, startTime, endTime, verificationResult;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              if (interactionData) {
                logger.debug("NoCAPTCHA - Přijatá interakční data:", JSON.stringify(interactionData, null, 2));
              } else {
                logger.debug("NoCAPTCHA - žádná interakční data přijata");
              }
              _context2.next = 4;
              return redisClient.get("captcha:nocaptcha:".concat(token));
            case 4:
              storedData = _context2.sent;
              if (storedData) {
                _context2.next = 8;
                break;
              }
              logger.warn('Neplatný nebo expirovaný token', {
                token: token
              });
              return _context2.abrupt("return", false);
            case 8:
              _JSON$parse = JSON.parse(storedData), secret = _JSON$parse.secret;
              _interactionData$mous = interactionData.mouseTrail, mouseTrail = _interactionData$mous === void 0 ? [] : _interactionData$mous, _interactionData$clic = interactionData.clickTimestamps, clickTimestamps = _interactionData$clic === void 0 ? [] : _interactionData$clic, startTime = interactionData.startTime, endTime = interactionData.endTime;
              if (_assertClassBrand(_NoCaptcha_brand, this, _validateInput).call(this, mouseTrail, clickTimestamps, startTime, endTime)) {
                _context2.next = 13;
                break;
              }
              logger.debug('NoCAPTCHA - Validation input check failed');
              return _context2.abrupt("return", false);
            case 13:
              verificationResult = _assertClassBrand(_NoCaptcha_brand, this, _analyzeBehavior).call(this, mouseTrail, clickTimestamps, startTime, endTime, secret);
              _context2.next = 16;
              return redisClient.del("captcha:nocaptcha:".concat(token));
            case 16:
              logger.info('NoCAPTCHA verification', {
                token: token,
                result: verificationResult ? 'valid' : 'invalid',
                interactionSummary: {
                  totalMovement: mouseTrail.length,
                  totalClicks: clickTimestamps.length,
                  totalTime: endTime - startTime
                }
              });
              return _context2.abrupt("return", verificationResult);
            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](0);
              logger.error('NoCAPTCHA verification failed', {
                token: token,
                error: _context2.t0.stack
              });
              return _context2.abrupt("return", false);
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 20]]);
      }));
      function verify(_x, _x2) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }]);
}();
function _validateInput(mouseTrail, clicks, startTime, endTime) {
  return Array.isArray(mouseTrail) && Array.isArray(clicks) && typeof startTime === 'number' && typeof endTime === 'number' && endTime > startTime;
}
function _analyzeBehavior(mouseTrail, clickTimestamps, startTime, endTime, secret) {
  var totalTime = endTime - startTime;
  if (totalTime < this.MIN_TIME) {
    logger.debug("NoCAPTCHA - totalTime ".concat(totalTime, "ms < MIN_TIME ").concat(this.MIN_TIME, "ms"));
    return false;
  }
  var movementScore = _assertClassBrand(_NoCaptcha_brand, this, _calculateMovementScore).call(this, mouseTrail);
  var clickScore = _assertClassBrand(_NoCaptcha_brand, this, _calculateClickScore).call(this, clickTimestamps, startTime, endTime);
  var movementThreshold = 0.01;
  var clickThreshold = 0.01;
  var isHumanPattern = movementScore > movementThreshold && clickScore > clickThreshold;
  logger.debug('NoCAPTCHA - analyzeBehavior results:', {
    totalTime: totalTime,
    movementScore: movementScore,
    clickScore: clickScore,
    movementThreshold: movementThreshold,
    clickThreshold: clickThreshold,
    isHumanPattern: isHumanPattern
  });
  return isHumanPattern;
}
function _calculateMovementScore(mouseTrail) {
  if (mouseTrail.length < 3) return 0;
  var distance = 0;
  var directionChanges = 0;
  var lastDirection = null;
  for (var i = 1; i < mouseTrail.length; i++) {
    var dx = mouseTrail[i].x - mouseTrail[i - 1].x;
    var dy = mouseTrail[i].y - mouseTrail[i - 1].y;
    distance += Math.sqrt(dx * dx + dy * dy);
    var currentDirection = Math.atan2(dy, dx);
    if (lastDirection !== null) {
      var angleDiff = Math.abs(currentDirection - lastDirection);
      if (angleDiff > Math.PI / 4) directionChanges++;
    }
    lastDirection = currentDirection;
  }
  var rawScore = directionChanges / 10 + distance / 1000;
  var finalScore = Math.min(1, rawScore);
  logger.debug('NoCAPTCHA - movementScore calculation:', {
    distance: distance,
    directionChanges: directionChanges,
    rawScore: rawScore,
    finalScore: finalScore
  });
  return finalScore;
}
function _calculateClickScore(clickTimestamps, startTime, endTime) {
  var clickIntervals = [];
  for (var i = 1; i < clickTimestamps.length; i++) {
    clickIntervals.push(clickTimestamps[i] - clickTimestamps[i - 1]);
  }
  var avgInterval = clickIntervals.length > 0 ? clickIntervals.reduce(function (a, b) {
    return a + b;
  }) / clickIntervals.length : 0;
  var irregularityScore = 1 - Math.abs(avgInterval - 500) / 500;
  var baseScore = clickTimestamps.length / this.MIN_CLICKS * irregularityScore;
  var finalScore = Math.min(1, baseScore);
  logger.debug('NoCAPTCHA - clickScore calculation:', {
    clickTimestamps: clickTimestamps,
    avgInterval: avgInterval,
    irregularityScore: irregularityScore,
    baseScore: baseScore,
    finalScore: finalScore
  });
  return finalScore;
}
export default new NoCaptcha();