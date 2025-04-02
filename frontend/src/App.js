import React from 'react';
import CaptchaWidget from './components/CaptchaWidget';

function App() {
  return (
    <div>
      <CaptchaWidget
        apiKey="f918feaea1668ba3d760d9924e2d527f4bc65e221a08012f9fc13e5103ec672c"
        lang="cs"
        type="audio" 
      />
    </div>
  );
}

export default App;
