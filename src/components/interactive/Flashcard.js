import React, { useState } from 'react';
import './Interactive.css';

const Flashcard = ({
  front,
  back,
  frontLabel = 'Sinhala',
  backLabel = 'English',
  pronunciation,
  onFlip,
  showPronunciation = true
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) {
      onFlip(!isFlipped);
    }
  };

  const handleSpeak = (e, text) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      // Try to find a Sinhala voice
      const voices = speechSynthesis.getVoices();
      const sinhalaVoice = voices.find(v => v.lang.includes('si'));
      if (sinhalaVoice) {
        utterance.voice = sinhalaVoice;
      }
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-label">{frontLabel}</span>
          <span className="flashcard-content">{front}</span>
          {showPronunciation && pronunciation && (
            <span className="flashcard-pronunciation">{pronunciation}</span>
          )}
          <button
            className="flashcard-speak"
            onClick={(e) => handleSpeak(e, front)}
            title="Listen"
          >
            🔊
          </button>
          <span className="flashcard-hint">Tap to flip / අනෙක් පැත්ත බලන්න</span>
        </div>
        <div className="flashcard-face flashcard-back">
          <span className="flashcard-label">{backLabel}</span>
          <span className="flashcard-content">{back}</span>
          <span className="flashcard-hint">Tap to flip back</span>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
