import React, { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import './Interactive.css';

const SentenceBuilder = ({
  sentences, // Array of { sinhala: "word1 word2 word3", english: "...", hint }
  title,
  titleSinhala,
  onComplete,
  gradeKey
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { addXP } = useGamification();
  const { trackGameComplete } = useChallenges();

  const currentSentence = sentences[currentIndex];

  // Initialize words
  useEffect(() => {
    if (currentSentence) {
      const words = currentSentence.sinhala.split(' ');
      const shuffled = words
        .map((word, index) => ({ word, originalIndex: index, id: `${index}-${word}` }))
        .sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
      setIsCorrect(null);
      setShowHint(false);
    }
  }, [currentIndex, currentSentence]);

  // Select a word
  const selectWord = (wordObj) => {
    if (isCorrect !== null) return;

    setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));
    setSelectedWords(prev => [...prev, wordObj]);
  };

  // Deselect a word
  const deselectWord = (wordObj) => {
    if (isCorrect !== null) return;

    setSelectedWords(prev => prev.filter(w => w.id !== wordObj.id));
    setAvailableWords(prev => [...prev, wordObj]);
  };

  // Check answer
  const checkAnswer = () => {
    const answer = selectedWords.map(w => w.word).join(' ');
    const correct = answer === currentSentence.sinhala;

    setIsCorrect(correct);

    if (correct) {
      const points = showHint ? 8 : 10;
      setScore(prev => prev + points);
      addXP(points, 'game');
    }
  };

  // Next sentence
  const nextSentence = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  // Use hint
  const useHint = () => {
    setShowHint(true);
  };

  // Clear selection
  const clearSelection = () => {
    const all = [...availableWords, ...selectedWords];
    setAvailableWords(all.sort(() => Math.random() - 0.5));
    setSelectedWords([]);
  };

  // Finish game
  const finishGame = () => {
    trackGameComplete();
    celebrateGameWin();
    setIsComplete(true);

    if (onComplete) {
      onComplete({
        score,
        totalSentences: sentences.length
      });
    }
  };

  // Restart
  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const maxScore = sentences.length * 10;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="game-complete">
        <h3>Sentence Builder Complete! / වාක්‍ය ගොඩනැගීම අවසන්!</h3>

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
            <span className="result-number">{percentage}%</span>
            <span className="result-label">Score</span>
          </div>
        </div>

        {percentage >= 80 && (
          <p className="game-feedback perfect">Excellent sentence building! / විශිෂ්ට වාක්‍ය ගොඩනැගීම!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  const targetWords = currentSentence.sinhala.split(' ');

  return (
    <div className="sentence-builder">
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

      <div className="sentence-prompt">
        <p className="prompt-label">Build this sentence in Sinhala:</p>
        <p className="prompt-label-si">මෙම වාක්‍යය සිංහලෙන් ගොඩනඟන්න:</p>
        <p className="prompt-english">"{currentSentence.english}"</p>
        {showHint && currentSentence.hint && (
          <p className="prompt-hint">Hint: {currentSentence.hint}</p>
        )}
      </div>

      <div className="sentence-answer">
        <p className="answer-label">Your sentence / ඔබේ වාක්‍යය:</p>
        <div className="word-slots">
          {selectedWords.map((wordObj, index) => (
            <button
              key={wordObj.id}
              className={`word-slot filled ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`}
              onClick={() => deselectWord(wordObj)}
              disabled={isCorrect !== null}
            >
              {wordObj.word}
            </button>
          ))}
          {selectedWords.length === 0 && (
            <span className="empty-prompt">Tap words below to build sentence</span>
          )}
        </div>
      </div>

      <div className="sentence-words">
        <p className="words-label">Available words / ඇති වචන:</p>
        <div className="word-tiles">
          {availableWords.map(wordObj => (
            <button
              key={wordObj.id}
              className="word-tile"
              onClick={() => selectWord(wordObj)}
              disabled={isCorrect !== null}
            >
              {wordObj.word}
            </button>
          ))}
        </div>
      </div>

      {isCorrect === null && (
        <div className="sentence-actions">
          {!showHint && (
            <button className="hint-btn-sentence" onClick={useHint}>
              Hint / ඉඟිය
            </button>
          )}
          <button className="clear-btn" onClick={clearSelection}>
            Clear / මකන්න
          </button>
          <button
            className="check-btn-sentence"
            onClick={checkAnswer}
            disabled={selectedWords.length !== targetWords.length}
          >
            Check / පරීක්ෂා කරන්න
          </button>
        </div>
      )}

      {isCorrect !== null && (
        <div className="sentence-feedback">
          {isCorrect ? (
            <p className="feedback-correct">Correct! / නිවැරදියි! 🎉</p>
          ) : (
            <div className="feedback-incorrect">
              <p>Correct sentence:</p>
              <p className="correct-sentence">{currentSentence.sinhala}</p>
            </div>
          )}
          <button className="next-btn-sentence" onClick={nextSentence}>
            {currentIndex < sentences.length - 1 ? 'Next / ඊළඟ' : 'Finish / අවසන්'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SentenceBuilder;
