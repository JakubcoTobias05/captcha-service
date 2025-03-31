import React, { useState, useEffect } from 'react';
import CaptchaTriggerButton from './CaptchaTriggerButton';
import '../styles/NoCaptcha.css';

function NoCaptcha({ onInteractionComplete, loading, currentLang, status, debug = true }) {
  const [mouseTrail, setMouseTrail] = useState([]);
  const [clickTimestamps, setClickTimestamps] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY };
      setMouseTrail(prev => [...prev, newPoint]);
      if (debug) console.debug('Global mouse move:', newPoint, 'Trail length:', mouseTrail.length + 1);
    };

    const handleClick = (e) => {
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

  return (
    <div className="no-captcha-container">
      <div className="full-screen-overlay" />
      <CaptchaTriggerButton
        status={status}
        onClick={handleComplete}
        currentLang={currentLang}
        disabled={loading}
        animate={false}
      />
      {debug && (
        <div className="no-captcha-debug">
          <h4>Debug Info</h4>
          <ul>
            {Object.entries(debugInfo).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NoCaptcha;
