import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CaptchaTriggerButton from './CaptchaTriggerButton';
import TextCaptcha from './TextCaptcha';
import AudioCaptcha from './AudioCaptcha';
import ImageCaptcha from './ImageCaptcha';
import NoCaptcha from './NoCaptcha';
import '../App.css';
import { translations } from '../translations.js';

function CaptchaWidget({ apiKey, type = 'text', lang = 'cs', theme = 'dark' }) {
  const backendUrl = "http://localhost:3001";
  //eslint-disable-next-line no-unused-vars
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [captchaData, setCaptchaData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');
  const [currentLang, setCurrentLang] = useState(lang);
  const [currentType, setCurrentType] = useState(type);
  const [prevType, setPrevType] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [triggerStatus, setTriggerStatus] = useState("neutral");

  const fetchCaptcha = async () => {
    try {
      setLoading(true);
      setError('');
      setVerifyMessage('');
      const response = await fetch(
        `${backendUrl}/api/v1/captcha/generate?type=${currentType}&lang=${currentLang}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey.trim()
          }
        }
      );
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Error generating CAPTCHA');
      setCaptchaData(data.data);
    } catch (err) {
      setError(translations[currentLang].error + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        headers: { 'Content-Type': 'application/json' },
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

  const handleSubmitNoCaptcha = async (interactionData) => {
    try {
      setLoading(true);
      setVerifyMessage('');
      const response = await fetch(`${backendUrl}/api/v1/captcha/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'nocaptcha',
          token: captchaData.token,
          interactionData: interactionData,
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
      return (
        <TextCaptcha
          captchaData={captchaData}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onReload={handleReload}
          onLanguageChange={handleLanguageChange}
          onSwitchToAudio={handleSwitchToAudio}
          onSubmit={handleSubmit}
          loading={loading}
          currentLang={currentLang}
        />
      );
    } else if (currentType === 'audio') {
      return (
        <AudioCaptcha
          captchaData={captchaData}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onReload={handleReload}
          onLanguageChange={handleLanguageChange}
          onSwitchBack={handleSwitchBackFromAudio}
          onSubmit={handleSubmit}
          loading={loading}
          currentLang={currentLang}
          apiKey={apiKey}
        />
      );
    } else if (currentType === 'image') {
      return (
        <ImageCaptcha
          captchaData={captchaData}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onReload={handleReload}
          onLanguageChange={handleLanguageChange}
          onSwitchToAudio={handleSwitchToAudio}
          onSubmit={handleSubmit}
          loading={loading}
          currentLang={currentLang}
        />
      );
    } else if (currentType === 'nocaptcha') {
      return (
        <NoCaptcha
          onInteractionComplete={handleSubmitNoCaptcha}
          loading={loading}
          currentLang={currentLang}
          status={triggerStatus}
        />
      );
    }
    return null;
  };

  return (
    <div className={`captcha-widget-container ${theme}`}>
      {currentType !== 'nocaptcha' && (
        <>
          <CaptchaTriggerButton
            status={triggerStatus}
            onClick={handleOpenModal}
            currentLang={currentLang}
            disabled={loading}
          />
          {showModal && (
            <Modal>
              {currentType === 'text' && <h3>{translations[currentLang].captchaTitleText}</h3>}
              {currentType === 'audio' && <h3>{translations[currentLang].captchaTitleAudio}</h3>}
              {loading && <div className="loading-message">{translations[currentLang].loading}</div>}
              {error && <div className="error-message">{error}</div>}
              {!loading && captchaData && renderCaptchaContent()}
              {verifyMessage && <div className="verify-message">{verifyMessage}</div>}
            </Modal>
          )}
        </>
      )}
      {currentType === 'nocaptcha' && renderCaptchaContent()}
    </div>
  );
}

export default CaptchaWidget;
