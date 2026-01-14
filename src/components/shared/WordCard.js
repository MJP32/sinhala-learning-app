import React, { useState } from "react";
import soundService from "../../utils/soundService";

const WordCard = ({ sinhalaWord, englishWord, pronunciation, image, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    if (onClick) onClick(pronunciation);

    // Play the actual Sinhala word using Google Translate TTS
    if (soundService.isSupported()) {
      setIsPlaying(true);
      try {
        await soundService.speakSinhalaWord(sinhalaWord, pronunciation);
      } catch (error) {
        console.error("Error playing sound:", error);
      }
      setIsPlaying(false);
    } else {
      console.warn("Audio not supported in this browser");
      alert("Sound not supported in this browser.");
    }
  };

  return (
    <div
      className={`word-card ${isPlaying ? "playing" : ""} ${image ? "has-image" : ""}`}
      onClick={handleClick}
      title={`Click to hear: ${sinhalaWord} (${pronunciation})`}
    >
      {image && <div className="word-image">{image}</div>}
      <div className="word-sinhala">{sinhalaWord}</div>
      <div className="word-english">{englishWord}</div>
      <div className="word-pronunciation">{pronunciation}</div>
      {isPlaying && <div className="sound-indicator">🔊</div>}
    </div>
  );
};

export default WordCard;
