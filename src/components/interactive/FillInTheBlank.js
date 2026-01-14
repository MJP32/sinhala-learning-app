import React, { useState, useEffect, useCallback } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import './Interactive.css';

const FillInTheBlank = ({
  sentences, // Array of { sentence: "... ___ ...", answer, options: [], hint, english }
  title,
  titleSinhala,
  onComplete,
  gradeKey
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { addXP } = useGamification();
  const { trackGameComplete } = useChallenges();

  const currentSentence = sentences[currentIndex];

  // Generate or shuffle options
  const [options, setOptions] = useState([]);

  const generateOptions = useCallback(() => {
    if (currentSentence.options && currentSentence.options.length >= 3) {
      // Use provided options and ensure answer is included
      const opts = [...currentSentence.options];
      if (!opts.includes(currentSentence.answer)) {
        opts[0] = currentSentence.answer;
      }
      return opts.sort(() => Math.random() - 0.5);
    }

    // Generate from other sentences
    const correctAnswer = currentSentence.answer;
    const otherAnswers = sentences
      .filter(s => s.answer !== correctAnswer)
      .map(s => s.answer)
      .filter((v, i, a) => a.indexOf(v) === i) // Unique
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [correctAnswer, ...otherAnswers].sort(() => Math.random() - 0.5);
  }, [currentSentence, sentences]);

  useEffect(() => {
    setOptions(generateOptions());
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  }, [currentIndex, generateOptions]);

  // Parse sentence to show blank
  const renderSentence = () => {
    const parts = currentSentence.sentence.split('___');
    return (
      <span className="fill-sentence">
        {parts[0]}
        <span className={`fill-blank ${showResult ? (selectedAnswer === currentSentence.answer ? 'correct' : 'incorrect') : ''}`}>
          {showResult ? currentSentence.answer : (selectedAnswer || '______')}
        </span>
        {parts[1] || ''}
      </span>
    );
  };

  const handleAnswer = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentSentence.answer;

    if (isCorrect) {
      const basePoints = 10;
      const hintPenalty = showHint ? 3 : 0;
      const points = basePoints - hintPenalty;
      setScore(prev => prev + points);
    }
  };

  const useHint = () => {
    if (showHint) return;
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    const maxScore = sentences.length * 10;
    const accuracy = Math.round((score / maxScore) * 100);

    // Calculate XP
    let xpEarned = Math.round(score * 1.5);

    if (hintsUsed === 0) {
      xpEarned += 20; // No hints bonus
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
        totalSentences: sentences.length,
        hintsUsed,
        accuracy
      });
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setHintsUsed(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const maxScore = sentences.length * 10;
    const accuracy = Math.round((score / maxScore) * 100);

    return (
      <div className="game-complete">
        <h3>Fill in the Blank Complete! / හිස්තැන් පිරවීම අවසන්!</h3>

        <div className="game-results">
          <div className="result-item">
            <span className="result-number">{score}</span>
            <span className="result-label">Points</span>
          </div>
          <div className="result-item">
            <span className="result-number">{sentences.length}</span>
            <span className="result-label">Sentences</span>
          </div>
          <div className="result-item">
            <span className="result-number">{hintsUsed}</span>
            <span className="result-label">Hints Used</span>
          </div>
          <div className="result-item">
            <span className="result-number">{accuracy}%</span>
            <span className="result-label">Accuracy</span>
          </div>
        </div>

        {hintsUsed === 0 && (
          <p className="game-feedback perfect">No hints needed! / ඉඟි අවශ්‍ය නැත!</p>
        )}
        {accuracy >= 80 && (
          <p className="game-feedback good">Great grammar skills! / විශිෂ්ට ව්‍යාකරණ කුසලතා!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  return (
    <div className="fill-in-blank">
      <div className="game-header">
        <div className="game-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="game-title-si">{titleSinhala}</span>}
        </div>
        <div className="game-progress">
          <span>{currentIndex + 1} / {sentences.length}</span>
          <span className="game-score-mini">Score: {score}</span>
        </div>
      </div>

      <div className="fill-prompt">
        <p className="prompt-label">Fill in the blank with the correct word</p>
        <p className="prompt-label-si">නිවැරදි වචනයෙන් හිස්තැන පුරවන්න</p>
      </div>

      <div className="fill-sentence-container">
        {renderSentence()}
      </div>

      {currentSentence.english && (
        <p className="fill-english">English: "{currentSentence.english}"</p>
      )}

      {showHint && currentSentence.hint && (
        <p className="fill-hint">Hint: {currentSentence.hint}</p>
      )}

      <div className="fill-word-bank">
        <p className="word-bank-label">Word Bank / වචන බැංකුව:</p>
        <div className="word-bank-options">
          {options.map((option, index) => (
            <button
              key={index}
              className={`word-bank-option ${
                selectedAnswer === option ? 'selected' : ''
              } ${
                showResult
                  ? option === currentSentence.answer
                    ? 'correct'
                    : selectedAnswer === option
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {!showResult && !showHint && currentSentence.hint && (
        <button className="hint-btn-fill" onClick={useHint}>
          Show Hint (-3 points) / ඉඟිය පෙන්වන්න
        </button>
      )}

      {showResult && (
        <div className="fill-feedback">
          {selectedAnswer === currentSentence.answer ? (
            <p className="feedback-correct">Correct! / නිවැරදියි!</p>
          ) : (
            <div className="feedback-incorrect">
              <p>The correct answer was: <strong>{currentSentence.answer}</strong></p>
            </div>
          )}
          <button className="next-btn-fill" onClick={nextQuestion}>
            {currentIndex < sentences.length - 1 ? 'Next / ඊළඟ' : 'Finish / අවසන්'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FillInTheBlank;
