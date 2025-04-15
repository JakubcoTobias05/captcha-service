import React from 'react';
import { translations } from '../translations';
import '../styles/ImageCaptcha.css';

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

  const handleTileClick = (index) => {
    if (Array.isArray(userAnswer)) {
      if (userAnswer.includes(index)) {
        onAnswerChange(userAnswer.filter((i) => i !== index));
      } else {
        onAnswerChange([...userAnswer, index]);
      }
    } else {
      onAnswerChange([index]);
    }
  };

  return (
    <div className="image-captcha">
      <h3 className="captcha-title">
        {translations[currentLang].captchaTitleImage || 'Obrázková CAPTCHA'}
      </h3>
      {captchaData?.question && (
        <div className="captcha-question">
          {currentLang === 'en' && captchaData.question_en
            ? captchaData.question_en
            : captchaData.question}
        </div>
      )}

      <div className="captcha-images-grid">
        {images.map((imgUrl, index) => (
          <div
            key={index}
            className={`captcha-image-tile ${
              Array.isArray(userAnswer) && userAnswer.includes(index) ? 'selected' : ''
            }`}
            onClick={() => handleTileClick(index)}
          >
            <img src={imgUrl} alt={`tile ${index}`} />
          </div>
        ))}
      </div>

      <div className="captcha-controls">
        <div className="left-controls">
          <button className="control-button reload-button" onClick={onReload} aria-label="Reload">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="reload-icon"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.36-3.36L23 10" />
              <path d="M20.49 15a9 9 0 01-14.36 3.36L1 14" />
            </svg>
          </button>
          <button className="control-button language-button" onClick={onLanguageChange} aria-label="Switch Language">
            <svg
              className="planet-icon"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 0 20" />
            </svg>
          </button>
          <button className="control-button switch-button" onClick={onSwitchToAudio} aria-label="Switch to Audio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="volume-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M14.5 12c0-1.77-.77-3.29-2-4.3v8.6c1.23-1.01 2-2.53 2-4.3z" />
            </svg>
          </button>
        </div>
        <div className="right-controls">
          <button
            onClick={onSubmit}
            className="submit-button"
            disabled={loading || !Array.isArray(userAnswer) || userAnswer.length === 0}
          >
            {translations[currentLang].submit || 'Odeslat'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCaptcha;
