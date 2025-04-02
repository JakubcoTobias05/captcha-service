import React from 'react';
import { translations } from '../translations';
import '../styles/AudioCaptcha.css';

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

  const handleAudioError = (e) => {
    console.error("AudioCaptcha: chyba při načítání audia", e);
    if (e.target && e.target.error) {
      console.error("Audio error code:", e.target.error.code);
    }
  };

  const handleAudioLoaded = (e) => {
    console.info("AudioCaptcha: audio načteno úspěšně", e);
  };

  console.debug("AudioCaptcha: audioSrc =", audioSrc);

  return (
    <div className="audio-captcha">
      <div className="captcha-audio-wrapper">
        <audio
          controls
          crossOrigin="anonymous"
          preload="auto"
          src={audioSrc}
          onError={handleAudioError}
          onLoadedData={handleAudioLoaded}
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="captcha-input-wrapper">
        <input
          type="text"
          placeholder={translations[currentLang].enterAudio || 'Zadej text ze zvukového záznamu'}
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="captcha-input"
        />
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

          <button
            className="control-button switch-button"
            onClick={onSwitchBack}
            aria-label="Switch back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="switch-icon"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 4h14a2 2 0 0 1 2 2v3H3V6a2 2 0 0 1 2-2z" />
              <path d="M3 13h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" />
              <path d="M8 9v.01" />
              <path d="M12 9v.01" />
              <path d="M16 9v.01" />
            </svg>
          </button>
        </div>

        <div className="right-controls">
          <button
            onClick={onSubmit}
            className="submit-button"
            disabled={loading || !userAnswer}
          >
            {translations[currentLang].submit || 'Odeslat'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AudioCaptcha;
