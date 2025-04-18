import React from 'react';
import { translations } from '../translations';
import '../styles/CaptchaTriggerButton.css';
import btnLogo from '../assets/images/btn-logo.png';

function CaptchaTriggerButton({ status = 'neutral', onClick, currentLang, disabled }) {
  const btnText = translations[currentLang]?.notRobot || 'Nejsem robot';
  
  return (
    <button 
      className={`captcha-trigger-button ${status}`}
      onClick={onClick}
      disabled={disabled || status === 'verified'}
    >
      <img
        src={btnLogo}
        alt="Captcha Logo"
        className="captcha-btn-logo"
      />
      <span className="captcha-trigger-button-text">{btnText}</span>
      <span className="captcha-trigger-button-icon">
        {status === 'verified' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.17l-3.88-3.88L4 13.41l5 5 12-12-1.41-1.41z"/>
          </svg>
        ) : status === 'failed' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc3545" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : null}
      </span>
    </button>
  );
}

export default CaptchaTriggerButton;
