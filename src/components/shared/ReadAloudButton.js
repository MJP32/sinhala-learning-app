import React, { useState } from 'react';
import soundService from '../../utils/soundService';

const ReadAloudButton = ({ text, label = "Listen", labelSinhala = "අසන්න" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async () => {
    if (isPlaying) {
      soundService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      // Use soundService which prioritizes pre-recorded audio files
      await soundService.speakSinhalaWord(text);
    } catch (error) {
      console.error('Audio playback error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <button
      className={`read-aloud-btn ${isPlaying ? 'playing' : ''}`}
      onClick={handleSpeak}
      title={isPlaying ? 'Stop' : 'Listen to Sinhala text'}
    >
      <span className="read-aloud-icon">{isPlaying ? '⏹️' : '🔊'}</span>
      <span className="read-aloud-text">
        {isPlaying ? 'Stop' : label}
      </span>
      <span className="read-aloud-text-si">
        {isPlaying ? 'නවත්වන්න' : labelSinhala}
      </span>
    </button>
  );
};

export default ReadAloudButton;
