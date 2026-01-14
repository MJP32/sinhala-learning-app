import React, { useState } from 'react';

const ReadAloudButton = ({ text, label = "Listen", labelSinhala = "අසන්න" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();

      if (isPlaying) {
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7; // Slower for clearer pronunciation
      utterance.pitch = 1;

      // Try to find a Sinhala voice
      const voices = speechSynthesis.getVoices();
      const sinhalaVoice = voices.find(v =>
        v.lang.includes('si') ||
        v.lang.includes('sin') ||
        v.name.toLowerCase().includes('sinhala')
      );

      if (sinhalaVoice) {
        utterance.voice = sinhalaVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
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
