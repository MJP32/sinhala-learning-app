import React, { useState } from "react";
import soundService from "../../utils/soundService";

const LetterCard = ({ sinhalaLetter, romanLetter, sound, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(sound);

    // Play the sound using our sound service
    if (soundService.isSupported()) {
      setIsPlaying(true);
      soundService.speakSinhalaLetter(sound);

      // Reset playing state after a delay
      setTimeout(() => {
        setIsPlaying(false);
      }, 1500);
    } else {
      console.warn("Speech synthesis not supported in this browser");
      alert(
        "Sound not supported in this browser. Please try Chrome, Firefox, or Safari."
      );
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
