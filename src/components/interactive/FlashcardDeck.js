import React, { useState, useEffect, useCallback } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { calculateNextReview, calculateQuality, getFlashcardStats } from '../../utils/spacedRepetition';
import { celebrateFlashcardMastery } from '../gamification/ConfettiCelebration';
import Flashcard from './Flashcard';
import './Interactive.css';

const FlashcardDeck = ({
  cards, // Array of { id, front, back, pronunciation }
  title,
  titleSinhala,
  onComplete,
  gradeKey
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardData, setCardData] = useState({});
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    incorrect: 0
  });
  const [showComplete, setShowComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const { addXP } = useGamification();
  const { trackFlashcardReview } = useChallenges();

  useEffect(() => {
    setStartTime(Date.now());
    // Load saved card data from localStorage
    const saved = localStorage.getItem(`flashcards-${gradeKey}`);
    if (saved) {
      setCardData(JSON.parse(saved));
    }
  }, [gradeKey]);

  // Save card data
  const saveCardData = useCallback((data) => {
    localStorage.setItem(`flashcards-${gradeKey}`, JSON.stringify(data));
  }, [gradeKey]);

  const currentCard = cards[currentIndex];

  const handleFlip = (flipped) => {
    setIsFlipped(flipped);
  };

  const handleResponse = (quality) => {
    // quality: 1 = wrong, 3 = hard, 4 = good, 5 = easy
    const cardId = currentCard.id;
    const existingData = cardData[cardId] || {};
    const responseTime = Date.now() - startTime;

    const newData = calculateNextReview(existingData, quality);

    const updatedCardData = {
      ...cardData,
      [cardId]: newData
    };

    setCardData(updatedCardData);
    saveCardData(updatedCardData);

    // Update session stats
    const isCorrect = quality >= 3;
    setSessionStats(prev => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));

    // Track flashcard review for daily challenges
    trackFlashcardReview(1);

    // Award XP
    if (isCorrect) {
      addXP(quality >= 4 ? 5 : 3, 'flashcard');
    }

    // Move to next card
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setStartTime(Date.now());
    } else {
      finishDeck();
    }
  };

  const finishDeck = () => {
    const accuracy = sessionStats.correct / sessionStats.reviewed;
    if (accuracy >= 0.8) {
      celebrateFlashcardMastery();
    }
    setShowComplete(true);

    if (onComplete) {
      onComplete({
        ...sessionStats,
        accuracy: Math.round(accuracy * 100)
      });
    }
  };

  const restartDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ reviewed: 0, correct: 0, incorrect: 0 });
    setShowComplete(false);
    setStartTime(Date.now());
  };

  const stats = getFlashcardStats(cardData);

  if (showComplete) {
    const accuracy = sessionStats.reviewed > 0
      ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100)
      : 0;

    return (
      <div className="flashcard-complete">
        <h3>Session Complete! / සැසිය අවසන්!</h3>

        <div className="flashcard-results">
          <div className="result-stat">
            <span className="stat-number">{sessionStats.reviewed}</span>
            <span className="stat-label">Cards Reviewed</span>
          </div>
          <div className="result-stat correct">
            <span className="stat-number">{sessionStats.correct}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="result-stat incorrect">
            <span className="stat-number">{sessionStats.incorrect}</span>
            <span className="stat-label">Need Practice</span>
          </div>
        </div>

        <div className="accuracy-display">
          <span className="accuracy-number">{accuracy}%</span>
          <span className="accuracy-label">Accuracy</span>
        </div>

        {accuracy >= 80 && (
          <p className="flashcard-feedback success">
            Excellent memory! / විශිෂ්ට මතකය!
          </p>
        )}
        {accuracy >= 60 && accuracy < 80 && (
          <p className="flashcard-feedback good">
            Good progress! Keep practicing! / හොඳ ප්‍රගතියක්!
          </p>
        )}
        {accuracy < 60 && (
          <p className="flashcard-feedback retry">
            Keep reviewing! You'll improve! / දිගටම පුහුණු වන්න!
          </p>
        )}

        <button className="restart-deck-btn" onClick={restartDeck}>
          Review Again / නැවත සමාලෝචනය කරන්න
        </button>
      </div>
    );
  }

  return (
    <div className="flashcard-deck">
      <div className="deck-header">
        <div className="deck-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="deck-title-si">{titleSinhala}</span>}
        </div>
        <div className="deck-progress">
          <span>{currentIndex + 1} / {cards.length}</span>
          <div className="deck-progress-bar">
            <div
              className="deck-progress-fill"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="deck-stats-mini">
        <span className="stat-mini mastered">Mastered: {stats.mastered}</span>
        <span className="stat-mini learning">Learning: {stats.learning}</span>
      </div>

      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        pronunciation={currentCard.pronunciation}
        onFlip={handleFlip}
      />

      {isFlipped && (
        <div className="response-buttons">
          <p className="response-prompt">How well did you know this?</p>
          <p className="response-prompt-si">ඔබට මෙය කොතරම් මතකද?</p>
          <div className="response-options">
            <button
              className="response-btn wrong"
              onClick={() => handleResponse(1)}
            >
              <span className="response-emoji">😕</span>
              <span className="response-text">Didn't know</span>
              <span className="response-text-si">මතක නෑ</span>
            </button>
            <button
              className="response-btn hard"
              onClick={() => handleResponse(3)}
            >
              <span className="response-emoji">🤔</span>
              <span className="response-text">Hard</span>
              <span className="response-text-si">අමාරුයි</span>
            </button>
            <button
              className="response-btn good"
              onClick={() => handleResponse(4)}
            >
              <span className="response-emoji">😊</span>
              <span className="response-text">Good</span>
              <span className="response-text-si">හොඳයි</span>
            </button>
            <button
              className="response-btn easy"
              onClick={() => handleResponse(5)}
            >
              <span className="response-emoji">😄</span>
              <span className="response-text">Easy</span>
              <span className="response-text-si">පහසුයි</span>
            </button>
          </div>
        </div>
      )}

      {!isFlipped && (
        <p className="flip-prompt">
          Tap the card to see the answer / පිළිතුර බැලීමට කාඩ්පත ස්පර්ශ කරන්න
        </p>
      )}
    </div>
  );
};

export default FlashcardDeck;
