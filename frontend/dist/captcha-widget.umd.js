(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom/client')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom/client'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.React, global.ReactDOM));
})(this, (function (React, ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$6 = ".modal-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(0, 0, 0, 0.6);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 9999;\r\n}\r\n\r\n.modal-content {\r\n  background-color: var(--bg-color);\r\n  color: var(--text-color);\r\n  padding: 20px;\r\n  border: 2px solid #888;\r\n  border-radius: 25px;\r\n  max-width: 450px;\r\n  width: 90%;\r\n  text-align: center;\r\n  animation: fadeIn 0.3s ease;\r\n  font-family: 'Arial', sans-serif;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n    transform: scale(0.9);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n.language-button,\r\n.switch-button {\r\n  background-color: transparent;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px;\r\n}\r\n\r\n.language-button:hover,\r\n.switch-button:hover {\r\n  background-color: #ccc; \r\n}\r\n\r\n.loading-placeholder {\r\n  width: 450px;           \r\n  max-width: 90%;\r\n  min-height: 300px;       \r\n  margin: 20px auto;\r\n  background-color: #1f1f1f;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.spinner {\r\n  border: 8px solid #f3f3f3;    \r\n  border-top: 8px solid #007bff; \r\n  border-radius: 50%;\r\n  width: 60px;                  \r\n  height: 60px;\r\n  animation: spin 1s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  0% { transform: rotate(0deg); }\r\n  100% { transform: rotate(360deg); }\r\n}\r\n\r\n";
  styleInject(css_248z$6);

  function Modal({
    children
  }) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "modal-overlay"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "modal-content"
    }, children));
  }

  const translations = {
    cs: {
      notRobot: 'Nejsem robot',
      verified: 'Ověřeno ✔',
      loadCaptcha: 'Načíst CAPTCHA',
      enterText: 'Zadej text z obrázku',
      enterAudio: 'Zadej odpověď z audio',
      reload: 'Reload',
      changeLanguage: 'Změnit jazyk',
      submit: 'Odeslat',
      captchaTitleText: 'Textová CAPTCHA',
      captchaTitleAudio: 'Audio CAPTCHA',
      loading: 'Načítám...',
      error: 'Chyba: ',
      incorrect: 'Neplatná odpověď, zkuste to znovu.'
    },
    en: {
      notRobot: "I'm not a robot",
      verified: 'Verified ✔',
      loadCaptcha: 'Load CAPTCHA',
      enterText: 'Enter the text from the image',
      enterAudio: 'Enter the audio response',
      reload: 'Reload',
      changeLanguage: 'Change Language',
      submit: 'Submit',
      captchaTitleText: 'Text CAPTCHA',
      captchaTitleAudio: 'Audio CAPTCHA',
      loading: 'Loading...',
      error: 'Error: ',
      incorrect: 'Incorrect answer, please try again.'
    }
  };

  var css_248z$5 = "/* CaptchaTriggerButton.css */\r\n.captcha-trigger-button {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  background-color: var(--bg-color);\r\n  color: var(--text-color);\r\n  border: 2px solid #888;\r\n  border-radius: 25px;\r\n  padding: 10px 20px;\r\n  font-size: 16px;\r\n  font-family: 'Arial', sans-serif;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease, border-color 0.3s ease;\r\n  width: 100%;\r\n  max-width: 300px;\r\n}\r\n\r\n/* Pro light theme explicitně nastavíme bílé pozadí a černý text */\r\n.captcha-widget-container.light .captcha-trigger-button {\r\n  background-color: #ffffff;\r\n  color: #000000;\r\n}\r\n\r\n.captcha-trigger-button .captcha-trigger-button-text {\r\n  flex-grow: 1;\r\n  text-align: left;\r\n}\r\n\r\n.captcha-trigger-button-icon {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 24px;\r\n  height: 24px;\r\n  margin-left: 10px;\r\n  background-color: transparent;\r\n  border: 2px solid #888;\r\n  border-radius: 2px;\r\n}\r\n\r\n.captcha-btn-logo {\r\n  width: 40px;\r\n  height: 40px;\r\n  margin-right: 10px;\r\n}\r\n\r\n.captcha-trigger-button:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@media (max-width: 600px) {\r\n  .captcha-trigger-button {\r\n    max-width: 60%;\r\n    font-size: 14px;\r\n    padding: 8px 16px;\r\n  }\r\n\r\n  .captcha-btn-logo {\r\n    width: 35px;\r\n    height: 35px;\r\n    margin-right: 8px;\r\n  }\r\n\r\n  .captcha-trigger-button-icon {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-left: 8px;\r\n  }\r\n}\r\n";
  styleInject(css_248z$5);

  var btnLogo = "images/92552c2f5b79b850.png";

  function CaptchaTriggerButton({
    status = 'neutral',
    onClick,
    currentLang,
    disabled
  }) {
    const btnText = translations[currentLang]?.notRobot || 'Nejsem robot';
    return /*#__PURE__*/React__default["default"].createElement("button", {
      className: `captcha-trigger-button ${status}`,
      onClick: onClick,
      disabled: disabled || status === 'verified'
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: btnLogo,
      alt: "Captcha Logo",
      className: "captcha-btn-logo"
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "captcha-trigger-button-text"
    }, btnText), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "captcha-trigger-button-icon"
    }, status === 'verified' ? /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "#28a745",
      width: "24px",
      height: "24px"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M9 16.17l-3.88-3.88L4 13.41l5 5 12-12-1.41-1.41z"
    })) : status === 'failed' ? /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "#dc3545",
      width: "24px",
      height: "24px"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    })) : null));
  }

  var css_248z$4 = ".text-captcha {\r\n  background-color: #1f1f1f;\r\n  color: #fff;\r\n  width: 450px;\r\n  max-width: 90%;\r\n  margin: 20px auto;\r\n  padding: 20px;\r\n  border-radius: 8px;\r\n  text-align: center;\r\n  font-family: Arial, sans-serif;\r\n  box-shadow: 0 0 10px rgba(0,0,0,0.8);\r\n}\r\n\r\n.captcha-media-wrapper {\r\n  max-width: 400px;\r\n  margin: 0 auto 10px;\r\n  background-color: #fff; \r\n  padding: 5px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.captcha-image {\r\n  width: 100%;\r\n  display: block;\r\n  border: 1px solid #444;\r\n  border-radius: 4px;\r\n}\r\n\r\n.captcha-input-wrapper {\r\n  max-width: 400px;\r\n  margin: 0 auto 15px;\r\n}\r\n\r\n.captcha-input {\r\n  width: 100%;\r\n  padding: 10px;\r\n  font-size: 16px;\r\n  color: #fff;\r\n  background-color: #2b2b2b;\r\n  border: 1px solid #444;\r\n  border-radius: 4px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.captcha-controls {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.left-controls {\r\n  display: flex;\r\n  gap: 8px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.control-button {\r\n  background-color: transparent;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px;\r\n  color: #fff;\r\n  transition: background-color 0.2s ease, transform 0.2s ease;\r\n}\r\n\r\n.reload-icon,\r\n.planet-icon,\r\n.switch-icon,\r\n.headphones-icon {\r\n  width: 24px;\r\n  height: 24px;\r\n  border: none;\r\n  border-radius: 0;\r\n}\r\n\r\n.right-controls {\r\n  margin-top: 10px;\r\n}\r\n\r\n.submit-button {\r\n  padding: 10px 16px;\r\n  font-size: 16px;\r\n  background-color: #007bff;\r\n  border: none;\r\n  color: #fff;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  transition: background-color 0.2s ease;\r\n}\r\n\r\n.submit-button:hover {\r\n  background-color: #0056b3;\r\n}\r\n\r\n.submit-button:disabled {\r\n  background-color: #555;\r\n  cursor: not-allowed;\r\n}\r\n\r\n@media (max-width: 600px) {\r\n  .text-captcha {\r\n    width: 95%;\r\n  }\r\n  .captcha-input {\r\n    font-size: 14px;\r\n  }\r\n  .left-controls,\r\n  .right-controls {\r\n    width: 100%;\r\n    text-align: center;\r\n    margin-top: 10px;\r\n  }\r\n}\r\n";
  styleInject(css_248z$4);

  function TextCaptcha({
    captchaData,
    userAnswer,
    onAnswerChange,
    onReload,
    onLanguageChange,
    onSwitchToAudio,
    onSubmit,
    loading,
    currentLang
  }) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "text-captcha"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-media-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: captchaData.captchaImage,
      alt: "CAPTCHA",
      className: "captcha-image"
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-input-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      placeholder: translations[currentLang].enterText || 'Zadej text z obrázku',
      value: userAnswer,
      onChange: e => onAnswerChange(e.target.value),
      className: "captcha-input"
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-controls"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "left-controls"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button reload-button",
      onClick: onReload,
      "aria-label": "Reload"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "reload-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default["default"].createElement("polyline", {
      points: "23 4 23 10 17 10"
    }), /*#__PURE__*/React__default["default"].createElement("polyline", {
      points: "1 20 1 14 7 14"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M3.51 9a9 9 0 0114.36-3.36L23 10"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M20.49 15a9 9 0 01-14.36 3.36L1 14"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: onLanguageChange,
      className: "control-button language-button",
      "aria-label": "Switch Language"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "planet-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React__default["default"].createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M2 12h20"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M12 2a15.3 15.3 0 0 1 0 20"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: onSwitchToAudio,
      className: "control-button switch-button",
      "aria-label": "Switch to Audio"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "volume-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M3 9v6h4l5 5V4L7 9H3z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M14.5 12c0-1.77-.77-3.29-2-4.3v8.6c1.23-1.01 2-2.53 2-4.3z"
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "right-controls"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: onSubmit,
      className: "submit-button",
      disabled: loading || !userAnswer
    }, translations[currentLang].submit || 'Odeslat'))));
  }

  var css_248z$3 = ".audio-captcha {\r\n  background-color: #1f1f1f;\r\n  color: #fff;\r\n  width: 450px;\r\n  max-width: 90%;\r\n  margin: 20px auto;\r\n  padding: 20px;\r\n  border-radius: 8px;\r\n  text-align: center;\r\n  font-family: Arial, sans-serif;\r\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.captcha-audio-wrapper {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.captcha-audio-wrapper audio {\r\n  width: 100%;\r\n  border-radius: 4px;\r\n  outline: none;\r\n}\r\n\r\n.captcha-input-wrapper {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.captcha-input {\r\n  width: 100%;\r\n  max-width: 400px;\r\n  margin: 0 auto;\r\n  padding: 10px;\r\n  font-size: 16px;\r\n  background-color: #2b2b2b;\r\n  color: #fff;\r\n  border: 1px solid #444;\r\n  border-radius: 4px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.captcha-controls {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.left-controls {\r\n  display: flex;\r\n  gap: 8px;\r\n  flex-wrap: nowrap;\r\n}\r\n\r\n.control-button {\r\n  background-color: transparent;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px;\r\n  color: #fff;\r\n  transition: background-color 0.2s ease, transform 0.2s ease;\r\n}\r\n\r\n.right-controls {\r\n  margin-top: 10px;\r\n}\r\n\r\n.submit-button {\r\n  padding: 10px 16px;\r\n  font-size: 16px;\r\n  background-color: #007bff;\r\n  border: none;\r\n  color: #fff;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  transition: background-color 0.2s ease;\r\n}\r\n\r\n.submit-button:hover {\r\n  background-color: #0056b3;\r\n}\r\n\r\n.submit-button:disabled {\r\n  background-color: #555;\r\n  cursor: not-allowed;\r\n}\r\n\r\n@media (max-width: 600px) {\r\n  .audio-captcha {\r\n    width: 95%;\r\n  }\r\n  .captcha-input {\r\n    max-width: 100%;\r\n  }\r\n  .left-controls,\r\n  .right-controls {\r\n    width: 100%;\r\n    text-align: center;\r\n    margin-top: 10px;\r\n  }\r\n}\r\n";
  styleInject(css_248z$3);

  function AudioCaptcha({
    captchaData,
    userAnswer,
    onAnswerChange,
    onReload,
    onLanguageChange,
    onSwitchBack,
    onSubmit,
    loading,
    currentLang,
    backendUrl,
    apiKey
  }) {
    const audioSrc = `${backendUrl}/api/v1/captcha/audio/${captchaData.token}?x-api-key=${encodeURIComponent(apiKey.trim())}`;
    const handleAudioError = e => {
      console.error("AudioCaptcha: chyba při načítání audia", e);
      if (e.target && e.target.error) {
        console.error("Audio error code:", e.target.error.code);
      }
    };
    const handleAudioLoaded = e => {
      console.info("AudioCaptcha: audio načteno úspěšně", e);
    };
    console.debug("AudioCaptcha: audioSrc =", audioSrc);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "audio-captcha"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-audio-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("audio", {
      controls: true,
      crossOrigin: "anonymous",
      preload: "auto",
      src: audioSrc,
      onError: handleAudioError,
      onLoadedData: handleAudioLoaded
    }, "Your browser does not support the audio element.")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-input-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      placeholder: translations[currentLang].enterAudio || 'Zadej text ze zvukového záznamu',
      value: userAnswer,
      onChange: e => onAnswerChange(e.target.value),
      className: "captcha-input"
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-controls"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "left-controls"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button reload-button",
      onClick: onReload,
      "aria-label": "Reload"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "reload-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default["default"].createElement("polyline", {
      points: "23 4 23 10 17 10"
    }), /*#__PURE__*/React__default["default"].createElement("polyline", {
      points: "1 20 1 14 7 14"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M3.51 9a9 9 0 0114.36-3.36L23 10"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M20.49 15a9 9 0 01-14.36 3.36L1 14"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button language-button",
      onClick: onLanguageChange,
      "aria-label": "Switch Language"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "planet-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React__default["default"].createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M2 12h20"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M12 2a15.3 15.3 0 0 1 0 20"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button switch-button",
      onClick: onSwitchBack,
      "aria-label": "Switch back"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "switch-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M5 4h14a2 2 0 0 1 2 2v3H3V6a2 2 0 0 1 2-2z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M3 13h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M8 9v.01"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M12 9v.01"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M16 9v.01"
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "right-controls"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: onSubmit,
      className: "submit-button",
      disabled: loading || !userAnswer
    }, translations[currentLang].submit || 'Odeslat'))));
  }

  var css_248z$2 = ".image-captcha {\r\n  background-color: #1f1f1f;\r\n  color: #fff;\r\n  width: 450px;\r\n  max-width: 90%;\r\n  margin: 20px auto;\r\n  padding: 20px;\r\n  border-radius: 8px;\r\n  text-align: center;\r\n  font-family: Arial, sans-serif;\r\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.captcha-title {\r\n  margin-bottom: 10px;\r\n  font-size: 18px;\r\n}\r\n\r\n.captcha-question {\r\n  font-size: 16px;\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.captcha-images-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\r\n  gap: 8px;\r\n  margin-bottom: 15px;\r\n  background-color: #2b2b2b;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.captcha-image-tile {\r\n  border: 2px solid transparent;\r\n  cursor: pointer;\r\n  transition: border-color 0.3s ease;\r\n}\r\n\r\n.captcha-image-tile img {\r\n  width: 100%;\r\n  height: 100px;\r\n  object-fit: cover;\r\n  display: block;\r\n  border-radius: 4px;\r\n}\r\n\r\n.captcha-image-tile.selected {\r\n  border-color: #007bff;\r\n}\r\n\r\n.captcha-controls {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  flex-wrap: nowrap;\r\n  margin-top: 10px;\r\n}\r\n\r\n.left-controls {\r\n  display: flex;\r\n  gap: 8px;\r\n  flex-wrap: nowrap;\r\n}\r\n\r\n.control-button {\r\n  background-color: transparent;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px;\r\n  color: #fff;\r\n  transition: background-color 0.2s ease, transform 0.2s ease;\r\n}\r\n\r\n.right-controls {\r\n  margin-top: 0;\r\n}\r\n\r\n.submit-button {\r\n  padding: 10px 16px;\r\n  font-size: 16px;\r\n  background-color: #007bff;\r\n  border: none;\r\n  color: #fff;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  transition: background-color 0.2s ease;\r\n}\r\n\r\n.submit-button:hover {\r\n  background-color: #0056b3;\r\n}\r\n\r\n.submit-button:disabled {\r\n  background-color: #555;\r\n  cursor: not-allowed;\r\n}\r\n\r\n@media (max-width: 600px) {\r\n  .image-captcha {\r\n    width: 95%;\r\n  }\r\n  .captcha-images-grid {\r\n    grid-template-columns: repeat(3, 1fr);\r\n  }\r\n  .left-controls, .right-controls {\r\n    justify-content: center;\r\n  }\r\n}\r\n";
  styleInject(css_248z$2);

  function ImageCaptcha({
    captchaData,
    userAnswer,
    onAnswerChange,
    onReload,
    onLanguageChange,
    onSwitchToAudio,
    onSubmit,
    loading,
    currentLang
  }) {
    const images = captchaData?.images || [];
    const handleTileClick = index => {
      if (Array.isArray(userAnswer)) {
        if (userAnswer.includes(index)) {
          onAnswerChange(userAnswer.filter(i => i !== index));
        } else {
          onAnswerChange([...userAnswer, index]);
        }
      } else {
        onAnswerChange([index]);
      }
    };
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "image-captcha"
    }, /*#__PURE__*/React__default["default"].createElement("h3", {
      className: "captcha-title"
    }, translations[currentLang].captchaTitleImage || 'Obrázková CAPTCHA'), captchaData?.question && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-question"
    }, captchaData.question), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-images-grid"
    }, images.map((imgUrl, index) => /*#__PURE__*/React__default["default"].createElement("div", {
      key: index,
      className: `captcha-image-tile ${Array.isArray(userAnswer) && userAnswer.includes(index) ? 'selected' : ''}`,
      onClick: () => handleTileClick(index)
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: imgUrl,
      alt: `tile ${index}`
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "captcha-controls"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "left-controls"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button reload-button",
      onClick: onReload,
      "aria-label": "Reload"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "reload-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default["default"].createElement("polyline", {
      points: "23 4 23 10 17 10"
    }), /*#__PURE__*/React__default["default"].createElement("polyline", {
      points: "1 20 1 14 7 14"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M3.51 9a9 9 0 0114.36-3.36L23 10"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M20.49 15a9 9 0 01-14.36 3.36L1 14"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button language-button",
      onClick: onLanguageChange,
      "aria-label": "Switch Language"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "planet-icon",
      width: "24",
      height: "24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React__default["default"].createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M2 12h20"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M12 2a15.3 15.3 0 0 1 0 20"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      className: "control-button switch-button",
      onClick: onSwitchToAudio,
      "aria-label": "Switch to Audio"
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "volume-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M3 9v6h4l5 5V4L7 9H3z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M14.5 12c0-1.77-.77-3.29-2-4.3v8.6c1.23-1.01 2-2.53 2-4.3z"
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "right-controls"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: onSubmit,
      className: "submit-button",
      disabled: loading || !Array.isArray(userAnswer) || userAnswer.length === 0
    }, translations[currentLang].submit || 'Odeslat'))));
  }

  var css_248z$1 = ".no-captcha-container {\r\n  max-width: 100%;\r\n  padding: 10px;\r\n  margin: 0 auto;\r\n  text-align: center;\r\n  position: relative;\r\n}\r\n\r\n.full-screen-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  pointer-events: none;\r\n  z-index: 9999;\r\n}\r\n\r\n.no-captcha-message {\r\n  margin-bottom: 10px;\r\n  font-size: 18px;\r\n}\r\n\r\n.no-captcha-controls {\r\n  display: flex;\r\n  gap: 10px;\r\n  justify-content: center;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.no-captcha-debug {\r\n  position: fixed;\r\n  bottom: 10px;\r\n  right: 10px;\r\n  background: rgba(0, 0, 0, 0.8);\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  font-size: 14px;\r\n  color: #fff;\r\n  z-index: 10000;\r\n}\r\n\r\n.no-captcha-submit-button {\r\n  padding: 10px 20px;\r\n  font-size: 16px;\r\n  border: none;\r\n  border-radius: 4px;\r\n  color: #fff;\r\n  background-color: #28a745;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease;\r\n}\r\n\r\n.no-captcha-submit-button.verified {\r\n  background-color: #28a745; \r\n}\r\n\r\n.no-captcha-submit-button.failed {\r\n  background-color: #dc3545;\r\n}\r\n\r\n.no-captcha-reload-button {\r\n  padding: 10px 20px;\r\n  font-size: 16px;\r\n  border: none;\r\n  border-radius: 4px;\r\n  color: #fff;\r\n  background-color: #007bff;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s ease;\r\n}\r\n\r\n.no-captcha-submit-button:disabled,\r\n.no-captcha-reload-button:disabled {\r\n  background-color: #94d3a2;\r\n  cursor: not-allowed;\r\n}\r\n\r\n@media (max-width: 600px) {\r\n  .no-captcha-submit-button,\r\n  .no-captcha-reload-button {\r\n    width: 90%;\r\n    font-size: 14px;\r\n  }\r\n  .no-captcha-container {\r\n    max-width: 90%;\r\n  }\r\n}\r\n";
  styleInject(css_248z$1);

  function NoCaptcha({
    onInteractionComplete,
    loading,
    currentLang,
    status,
    debug = true
  }) {
    const [mouseTrail, setMouseTrail] = React.useState([]);
    const [clickTimestamps, setClickTimestamps] = React.useState([]);
    const [startTime, setStartTime] = React.useState(Date.now());
    React.useEffect(() => {
      setStartTime(Date.now());
      const handleMouseMove = e => {
        const newPoint = {
          x: e.clientX,
          y: e.clientY
        };
        setMouseTrail(prev => [...prev, newPoint]);
        if (debug) console.debug('Global mouse move:', newPoint, 'Trail length:', mouseTrail.length + 1);
      };
      const handleClick = e => {
        const timestamp = Date.now();
        setClickTimestamps(prev => [...prev, timestamp]);
        if (debug) console.debug('Global click:', timestamp, 'Total clicks:', clickTimestamps.length + 1);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      };
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debug]);
    const handleComplete = () => {
      const endTime = Date.now();
      const interactionData = {
        mouseTrail,
        clickTimestamps,
        startTime,
        endTime
      };
      if (debug) console.debug('Interaction complete:', interactionData);
      onInteractionComplete(interactionData);
    };
    const debugInfo = {
      "Počet pohybů": mouseTrail.length,
      "Počet kliknutí": clickTimestamps.length,
      "Čas interakce (ms)": Date.now() - startTime
    };
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "no-captcha-container"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "full-screen-overlay"
    }), /*#__PURE__*/React__default["default"].createElement(CaptchaTriggerButton, {
      status: status,
      onClick: handleComplete,
      currentLang: currentLang,
      disabled: loading,
      animate: false
    }), debug && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "no-captcha-debug"
    }, /*#__PURE__*/React__default["default"].createElement("h4", null, "Debug Info"), /*#__PURE__*/React__default["default"].createElement("ul", null, Object.entries(debugInfo).map(([key, value]) => /*#__PURE__*/React__default["default"].createElement("li", {
      key: key
    }, key, ": ", value)))));
  }

  var css_248z = ".captcha-widget-container {\r\n    max-width: 500px; \r\n    margin: 20px auto;\r\n    text-align: center;\r\n    font-family: Arial, sans-serif;\r\n  }\r\n  \r\n  .captcha-controls .control-button:hover {\r\n    background-color: #333 !important;\r\n  }\r\n  \r\n  .captcha-controls .control-button:hover svg {\r\n    stroke: #fff !important;\r\n  }\r\n  \r\n  .captcha-widget-container.dark {\r\n    --bg-color: #1F1F1F;\r\n    --text-color: #ffffff;\r\n    --submit-disabled-bg: #47719f;\r\n    --submit-blue: #007bff;\r\n    --button-bg: #2d2d2d;\r\n  }\r\n  ";
  styleInject(css_248z);

  // src/components/CaptchaWidget.js
  function CaptchaWidget({
    apiKey,
    type = 'text',
    lang = 'cs',
    theme = 'dark',
    backendUrl
  }) {
    // backendUrl nyní přichází jako prop, není zde hardcodováno
    const [isVerified, setIsVerified] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [captchaData, setCaptchaData] = React.useState(null);
    const [userAnswer, setUserAnswer] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [verifyMessage, setVerifyMessage] = React.useState('');
    const [currentLang, setCurrentLang] = React.useState(lang);
    const [currentType, setCurrentType] = React.useState(type);
    const [prevType, setPrevType] = React.useState(null);
    const [attemptCount, setAttemptCount] = React.useState(0);
    const [triggerStatus, setTriggerStatus] = React.useState("neutral");
    const fetchCaptcha = async () => {
      try {
        setLoading(true);
        setError('');
        setVerifyMessage('');
        const response = await fetch(`${backendUrl}/api/v1/captcha/generate?type=${currentType}&lang=${currentLang}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey.trim()
          }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Error generating CAPTCHA');
        setCaptchaData(data.data);
      } catch (err) {
        setError(translations[currentLang].error + err.message);
      } finally {
        setLoading(false);
      }
    };
    React.useEffect(() => {
      if (currentType === 'nocaptcha') {
        fetchCaptcha();
      } else if (showModal) {
        fetchCaptcha();
      }
      // eslint-disable-next-line
    }, [currentType, currentLang, showModal]);
    const handleOpenModal = () => {
      setShowModal(true);
      setIsVerified(false);
      setUserAnswer('');
      fetchCaptcha();
    };
    const handleReload = () => {
      fetchCaptcha();
      setUserAnswer('');
      setTriggerStatus("neutral");
    };
    const handleLanguageChange = () => {
      const newLang = currentLang === 'cs' ? 'en' : 'cs';
      setCurrentLang(newLang);
      setUserAnswer('');
    };
    const handleSwitchToAudio = () => {
      setPrevType(currentType);
      setCurrentType('audio');
      setUserAnswer('');
    };
    const handleSwitchBackFromAudio = () => {
      if (prevType === 'text' || !prevType) {
        setCurrentType('text');
      } else {
        setCurrentType('image');
      }
      setUserAnswer('');
    };
    const handleSubmit = async () => {
      try {
        setLoading(true);
        setVerifyMessage('');
        const response = await fetch(`${backendUrl}/api/v1/captcha/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: currentType,
            token: captchaData.token,
            answer: userAnswer
          })
        });
        const result = await response.json();
        if (result.success) {
          setVerifyMessage(translations[currentLang].verified);
          setIsVerified(true);
          setTriggerStatus("verified");
          setAttemptCount(0);
          if (currentType !== 'nocaptcha') {
            setTimeout(() => setShowModal(false), 1000);
          }
        } else {
          setTriggerStatus("failed");
          const newAttemptCount = attemptCount + 1;
          setAttemptCount(newAttemptCount);
          if (newAttemptCount >= 3) {
            setVerifyMessage(translations[currentLang].incorrect + ' Too many failed attempts. Reloading new CAPTCHA...');
            setAttemptCount(0);
            fetchCaptcha();
            setUserAnswer('');
          } else {
            setVerifyMessage(translations[currentLang].incorrect);
          }
        }
      } catch (err) {
        setVerifyMessage(translations[currentLang].error + err.message);
      } finally {
        setLoading(false);
      }
    };
    const handleSubmitNoCaptcha = async interactionData => {
      try {
        setLoading(true);
        setVerifyMessage('');
        const response = await fetch(`${backendUrl}/api/v1/captcha/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'nocaptcha',
            token: captchaData.token,
            interactionData: interactionData
          })
        });
        const result = await response.json();
        if (result.success) {
          setVerifyMessage(translations[currentLang].verified);
          setIsVerified(true);
          setTriggerStatus("verified");
          setAttemptCount(0);
        } else {
          setTriggerStatus("failed");
          const newAttemptCount = attemptCount + 1;
          setAttemptCount(newAttemptCount);
          if (newAttemptCount >= 3) {
            setVerifyMessage(translations[currentLang].incorrect + ' Too many failed attempts. Reloading new CAPTCHA...');
            setAttemptCount(0);
            fetchCaptcha();
          } else {
            setVerifyMessage(translations[currentLang].incorrect);
          }
        }
      } catch (err) {
        setVerifyMessage(translations[currentLang].error + err.message);
      } finally {
        setLoading(false);
      }
    };
    const renderCaptchaContent = () => {
      if (!captchaData) return null;
      if (currentType === 'text') {
        return /*#__PURE__*/React__default["default"].createElement(TextCaptcha, {
          captchaData: captchaData,
          userAnswer: userAnswer,
          onAnswerChange: setUserAnswer,
          onReload: handleReload,
          onLanguageChange: handleLanguageChange,
          onSwitchToAudio: handleSwitchToAudio,
          onSubmit: handleSubmit,
          loading: loading,
          currentLang: currentLang
        });
      } else if (currentType === 'audio') {
        return /*#__PURE__*/React__default["default"].createElement(AudioCaptcha, {
          captchaData: captchaData,
          userAnswer: userAnswer,
          onAnswerChange: setUserAnswer,
          onReload: handleReload,
          onLanguageChange: handleLanguageChange,
          onSwitchBack: handleSwitchBackFromAudio,
          onSubmit: handleSubmit,
          loading: loading,
          currentLang: currentLang,
          apiKey: apiKey,
          backendUrl: backendUrl
        });
      } else if (currentType === 'image') {
        return /*#__PURE__*/React__default["default"].createElement(ImageCaptcha, {
          captchaData: captchaData,
          userAnswer: userAnswer,
          onAnswerChange: setUserAnswer,
          onReload: handleReload,
          onLanguageChange: handleLanguageChange,
          onSwitchToAudio: handleSwitchToAudio,
          onSubmit: handleSubmit,
          loading: loading,
          currentLang: currentLang
        });
      } else if (currentType === 'nocaptcha') {
        return /*#__PURE__*/React__default["default"].createElement(NoCaptcha, {
          onInteractionComplete: handleSubmitNoCaptcha,
          loading: loading,
          currentLang: currentLang,
          status: triggerStatus
        });
      }
      return null;
    };
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: `captcha-widget-container ${theme}`
    }, currentType !== 'nocaptcha' && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(CaptchaTriggerButton, {
      status: triggerStatus,
      onClick: handleOpenModal,
      currentLang: currentLang,
      disabled: loading
    }), showModal && /*#__PURE__*/React__default["default"].createElement(Modal, null, currentType === 'text' && /*#__PURE__*/React__default["default"].createElement("h3", null, translations[currentLang].captchaTitleText), currentType === 'audio' && /*#__PURE__*/React__default["default"].createElement("h3", null, translations[currentLang].captchaTitleAudio), loading ? /*#__PURE__*/React__default["default"].createElement("div", {
      className: "loading-placeholder"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "spinner"
    })) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, error && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "error-message"
    }, error), captchaData && renderCaptchaContent(), verifyMessage && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "verify-message"
    }, verifyMessage)))), currentType === 'nocaptcha' && renderCaptchaContent());
  }

  function getConfigFromElement(el) {
    return {
      apiKey: el.getAttribute('data-api-key'),
      lang: el.getAttribute('data-lang') || 'cs',
      type: el.getAttribute('data-type') || 'text',
      backendUrl: 'https://captcha-service-rjty.onrender.com'
    };
  }
  const captchaElements = document.querySelectorAll('[data-captcha-widget]');
  captchaElements.forEach(el => {
    const config = getConfigFromElement(el);
    const root = ReactDOM__default["default"].createRoot(el);
    root.render(/*#__PURE__*/React__default["default"].createElement(React__default["default"].StrictMode, null, /*#__PURE__*/React__default["default"].createElement(CaptchaWidget, config)));
  });

}));
//# sourceMappingURL=captcha-widget.umd.js.map
