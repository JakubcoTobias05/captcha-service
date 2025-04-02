import React from 'react';
import ReactDOM from 'react-dom/client';
import CaptchaWidget from './components/CaptchaWidget';

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
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <CaptchaWidget {...config} />
    </React.StrictMode>
  );
});
