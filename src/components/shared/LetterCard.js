import React, { useState } from "react";
import soundService from "../../utils/soundService";

const LetterCard = ({ sinhalaLetter, romanLetter, sound, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    if (onClick) onClick(sound);

    // Play the actual Sinhala letter using Google Translate TTS
    if (soundService.isSupported()) {
      setIsPlaying(true);
      try {
        await soundService.speakSinhalaLetter(sinhalaLetter);
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
      className={`letter-card ${isPlaying ? "playing" : ""}`}
      onClick={handleClick}
      title={`Click to hear the sound: ${sound}`}
    >
      <div className="sinhala-letter">{sinhalaLetter}</div>
      <div className="roman-letter">{romanLetter}</div>
      {isPlaying && <div className="sound-indicator">🔊</div>}
    </div>
  );
};

export default LetterCard;
