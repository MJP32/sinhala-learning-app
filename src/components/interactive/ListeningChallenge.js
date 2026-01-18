import React, { useState, useEffect, useCallback } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import soundService from '../../utils/soundService';
import './Interactive.css';

const ListeningChallenge = ({
  items, // Array of { sinhala, english, options: [array of 4 english options] }
  title,
  titleSinhala,
  onComplete,
  gradeKey
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [replaysUsed, setReplaysUsed] = useState(0);
  const [totalReplays, setTotalReplays] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const maxReplays = 2; // Per question

  const { addXP } = useGamification();
  const { trackGameComplete, trackPronunciationPractice } = useChallenges();

  const currentItem = items[currentIndex];

  // Generate options if not provided
  const getOptions = useCallback(() => {
    if (currentItem.options && currentItem.options.length === 4) {
      return currentItem.options.sort(() => Math.random() - 0.5);
    }

    // Generate options from other items
    const correctAnswer = currentItem.english;
    const otherAnswers = items
      .filter(item => item.english !== correctAnswer)
      .map(item => item.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [correctAnswer, ...otherAnswers].sort(() => Math.random() - 0.5);
  }, [currentItem, items]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(getOptions());
    setSelectedAnswer(null);
    setShowResult(false);
    setReplaysUsed(0);
    setHasPlayed(false);
  }, [currentIndex, getOptions]);

  const playAudio = useCallback(async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    setHasPlayed(true);

    // Use soundService which prioritizes pre-recorded audio files
    try {
      await soundService.speakSinhalaWord(currentItem.sinhala, currentItem.pronunciation);
    } catch (error) {
      console.error('Audio playback error:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [currentItem, isPlaying]);

  const handleReplay = () => {
    if (replaysUsed >= maxReplays) return;
    setReplaysUsed(prev => prev + 1);
    setTotalReplays(prev => prev + 1);
    playAudio();
  };

  const handleAnswer = (answer) => {
    if (showResult || !hasPlayed) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentItem.english;

    if (isCorrect) {
      // More points for no replays
      const basePoints = 10;
      const replayPenalty = replaysUsed * 2;
      const points = Math.max(basePoints - replayPenalty, 5);
      setScore(prev => prev + points);
    }

    // Track pronunciation practice
    trackPronunciationPractice(1);
  };

  const nextQuestion = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    // Calculate XP
    const accuracy = Math.round((score / (items.length * 10)) * 100);
    let xpEarned = Math.round(score * 1.5);

    if (totalReplays === 0) {
      xpEarned += 25; // No replay bonus
    }

    if (accuracy >= 80) {
      xpEarned += 15;
    }

    addXP(xpEarned, 'game');
    trackGameComplete();
    celebrateGameWin();
    setIsComplete(true);

    if (onComplete) {
      onComplete({
        score,
        totalQuestions: items.length,
        replaysUsed: totalReplays,
        accuracy
      });
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setTotalReplays(0);
    setIsComplete(false);
    setHasPlayed(false);
  };

  if (isComplete) {
    const maxScore = items.length * 10;
    const accuracy = Math.round((score / maxScore) * 100);

    return (
      <div className="game-complete">
        <h3>Listening Challenge Complete! / සවන්දීමේ අභියෝගය අවසන්!</h3>

        <div className="game-results">
          <div className="result-item">
            <span className="result-number">{score}</span>
            <span className="result-label">Points</span>
          </div>
          <div className="result-item">
            <span className="result-number">{items.length}</span>
            <span className="result-label">Questions</span>
          </div>
          <div className="result-item">
            <span className="result-number">{totalReplays}</span>
            <span className="result-label">Replays Used</span>
          </div>
          <div className="result-item">
            <span className="result-number">{accuracy}%</span>
            <span className="result-label">Accuracy</span>
          </div>
        </div>

        {totalReplays === 0 && (
          <p className="game-feedback perfect">No replays needed! Great listening! / නැවත අවශ්‍ය නැත!</p>
        )}
        {accuracy >= 80 && (
          <p className="game-feedback good">Excellent listening skills! / විශිෂ්ට සවන්දීමේ කුසලතා!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  return (
    <div className="listening-challenge">
      <div className="game-header">
        <div className="game-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="game-title-si">{titleSinhala}</span>}
        </div>
        <div className="game-progress">
          <span>{currentIndex + 1} / {items.length}</span>
          <span className="game-score-mini">Score: {score}</span>
        </div>
      </div>

      <div className="listening-prompt">
        <p className="prompt-label">Listen to the Sinhala word and select its English meaning</p>
        <p className="prompt-label-si">සිංහල වචනය අසා එහි ඉංග්‍රීසි තේරුම තෝරන්න</p>
      </div>

      <div className="audio-controls">
        <button
          className={`play-audio-btn ${isPlaying ? 'playing' : ''}`}
          onClick={playAudio}
          disabled={showResult}
        >
          <span className="play-icon">{isPlaying ? '...' : hasPlayed ? 'Play Again' : 'Play'}</span>
          <span className="play-icon-si">{isPlaying ? '...' : hasPlayed ? 'නැවත' : 'අසන්න'}</span>
        </button>

        {hasPlayed && !showResult && (
          <button
            className="replay-btn"
            onClick={handleReplay}
            disabled={replaysUsed >= maxReplays}
          >
            <span>Replay ({maxReplays - replaysUsed} left)</span>
          </button>
        )}
      </div>

      {!hasPlayed && (
        <p className="listen-first-prompt">
          Click play to hear the word / වචනය ඇසීමට play ක්ලික් කරන්න
        </p>
      )}

      {hasPlayed && (
        <div className="listening-options">
          <p className="options-label">Select the correct meaning:</p>
          {options.map((option, index) => (
            <button
              key={index}
              className={`listening-option ${
                showResult
                  ? option === currentItem.english
                    ? 'correct'
                    : selectedAnswer === option
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswer(option)}
              disabled={showResult || !hasPlayed}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {showResult && (
        <div className="listening-feedback">
          {selectedAnswer === currentItem.english ? (
            <p className="feedback-correct">Correct! / නිවැරදියි!</p>
          ) : (
            <div className="feedback-incorrect">
              <p>The word was: <strong>{currentItem.sinhala}</strong></p>
              <p>Meaning: <strong>{currentItem.english}</strong></p>
            </div>
          )}
          <button className="next-btn-listening" onClick={nextQuestion}>
            {currentIndex < items.length - 1 ? 'Next / ඊළඟ' : 'Finish / අවසන්'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListeningChallenge;
