import React, { useState } from "react";
import soundService from "../../utils/soundService";

const WordCard = ({ sinhalaWord, englishWord, pronunciation, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(pronunciation);

    // Play the word using our sound service
    if (soundService.isSupported()) {
      setIsPlaying(true);
      soundService.speakSinhalaWord(sinhalaWord, pronunciation);

      // Reset playing state after a delay (longer for words)
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    } else {
      console.warn("Speech synthesis not supported in this browser");
      alert(
        "Sound not supported in this browser. Please try Chrome, Firefox, or Safari."
      );
    }
  };

  return (
    <div
      className={`word-card ${isPlaying ? "playing" : ""}`}
      onClick={handleClick}
      title={`Click to hear: ${sinhalaWord} (${pronunciation})`}
    >
      <div className="word-sinhala">{sinhalaWord}</div>
      <div className="word-english">{englishWord}</div>
      <div className="word-pronunciation">{pronunciation}</div>
      {isPlaying && <div className="sound-indicator">🔊</div>}
    </div>
  );
};

export default WordCard;
