import React, { useState, useEffect } from "react";
import soundService from "../../utils/soundService";

const SoundControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Load initial settings
    updateSettings();
    
    // Load available voices
    const availableVoices = soundService.getAvailableVoices();
    setVoices(availableVoices);
  }, []);

  const updateSettings = () => {
    setSettings(soundService.getSettings());
  };

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    soundService.setVolume(volume);
    updateSettings();
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    soundService.setRate(rate);
    updateSettings();
  };

  const handleVoiceChange = (e) => {
    const voiceName = e.target.value;
    soundService.setVoice(voiceName);
    updateSettings();
  };

  const testSound = () => {
    soundService.speak("Hello! This is a test of the Sinhala learning app sound system.");
  };

  const testSinhalaSound = () => {
    soundService.speakSinhalaLetter("ka");
  };

  if (!soundService.isSupported()) {
    return (
      <div className="sound-controls-warning">
        <span>🔇 Sound not supported in this browser</span>
      </div>
    );
  }

  return (
    <div className="sound-controls">
      <button 
        className="sound-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Sound Settings"
      >
        🔊
      </button>
      
      {isOpen && (
        <div className="sound-panel">
          <h4>🎵 Sound Settings</h4>
          
          <div className="sound-setting">
            <label>Volume: {Math.round(settings.volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume || 0.8}
              onChange={handleVolumeChange}
            />
          </div>

          <div className="sound-setting">
            <label>Speed: {settings.rate}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate || 0.8}
              onChange={handleRateChange}
            />
          </div>

          {voices.length > 0 && (
            <div className="sound-setting">
              <label>Voice:</label>
              <select onChange={handleVoiceChange} value={settings.currentVoice || ''}>
                {voices.map((voice, index) => (
                  <option key={index} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="sound-info">
            <p>📊 Status:</p>
            <p>• Voices available: {settings.voicesAvailable}</p>
            <p>• Sinhala voice: {settings.hasSinhalaVoice ? '✅' : '❌'}</p>
          </div>

          <div className="sound-tests">
            <button onClick={testSound} className="test-btn">
              Test English
            </button>
            <button onClick={testSinhalaSound} className="test-btn">
              Test Sinhala
            </button>
          </div>

          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default SoundControls;
