import React, { useState } from "react";
import soundService from "../../utils/soundService";

const SoundControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundService.setVolume(newVolume);
  };

  const testSinhalaSound = () => {
    // Play audio directly
    const audio = new Audio('/audio/words/4LaF4La44LeK4La44LeP.mp3');
    audio.volume = volume;
    audio.play();
  };

  const testEnglishSound = () => {
    soundService.speakEnglishWord("Hello, welcome to the Sinhala learning app!");
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
            <label>Volume: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>

          <div className="sound-info">
            <p>🔊 Using pre-recorded native Sinhala pronunciation</p>
          </div>

          <div className="sound-tests">
            <button onClick={testEnglishSound} className="test-btn">
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
