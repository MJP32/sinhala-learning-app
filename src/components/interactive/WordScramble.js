import React, { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import './Interactive.css';

const WordScramble = ({
  words, // Array of { sinhala, english, hint }
  title,
  titleSinhala,
  onComplete,
  gradeKey
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { addXP } = useGamification();
  const { trackGameComplete } = useChallenges();

  const currentWord = words[currentIndex];

  // Scramble the letters
  useEffect(() => {
    if (currentWord) {
      const letters = currentWord.sinhala.split('');
      const scrambled = [...letters]
        .map((letter, index) => ({ letter, originalIndex: index, id: `${index}-${letter}` }))
        .sort(() => Math.random() - 0.5);
      setScrambledLetters(scrambled);
      setSelectedLetters([]);
      setIsCorrect(null);
      setShowHint(false);
    }
  }, [currentIndex, currentWord]);

  // Select a letter
  const selectLetter = (letterObj) => {
    if (isCorrect !== null) return;

    setScrambledLetters(prev => prev.filter(l => l.id !== letterObj.id));
    setSelectedLetters(prev => [...prev, letterObj]);
  };

  // Deselect a letter
  const deselectLetter = (letterObj) => {
    if (isCorrect !== null) return;

    setSelectedLetters(prev => prev.filter(l => l.id !== letterObj.id));
    setScrambledLetters(prev => {
      const newArr = [...prev, letterObj];
      return newArr.sort((a, b) => a.originalIndex - b.originalIndex);
    });
  };

  // Check answer
  const checkAnswer = () => {
    const answer = selectedLetters.map(l => l.letter).join('');
    const correct = answer === currentWord.sinhala;

    setIsCorrect(correct);

    if (correct) {
      const points = showHint ? 3 : 5;
      setScore(prev => prev + points);
      addXP(points, 'game');
    }
  };

  // Next word
  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  // Use hint
  const useHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  // Finish game
  const finishGame = () => {
    const xpEarned = score + (hintsUsed === 0 ? 10 : 0);
    addXP(xpEarned, 'game');
    trackGameComplete();
    celebrateGameWin();
    setIsComplete(true);

    if (onComplete) {
      onComplete({
        score,
        totalWords: words.length,
        hintsUsed
      });
    }
  };

  // Restart
  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setHintsUsed(0);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="game-complete">
        <h3>Word Scramble Complete! / වචන පැටලිලි අවසන්!</h3>

        <div className="game-results">
          <div className="result-item">
            <span className="result-number">{score}</span>
            <span className="result-label">Points</span>
          </div>
          <div className="result-item">
            <span className="result-number">{words.length}</span>
            <span className="result-label">Words</span>
          </div>
          <div className="result-item">
            <span className="result-number">{hintsUsed}</span>
            <span className="result-label">Hints Used</span>
          </div>
        </div>

        {hintsUsed === 0 && (
          <p className="game-feedback perfect">No hints used! Great job! / ඉඟි භාවිතා කළේ නැහැ!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  return (
    <div className="word-scramble">
      <div className="game-header">
        <div className="game-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="game-title-si">{titleSinhala}</span>}
        </div>
        <div className="game-progress">
          <span>{currentIndex + 1} / {words.length}</span>
          <span className="game-score-mini">Score: {score}</span>
        </div>
      </div>

      <div className="scramble-clue">
        <p className="clue-label">English meaning / ඉංග්‍රීසි තේරුම:</p>
        <p className="clue-word">{currentWord.english}</p>
        {showHint && currentWord.hint && (
          <p className="clue-hint">Hint: {currentWord.hint}</p>
        )}
      </div>

      <div className="scramble-answer">
        <p className="answer-label">Your answer / ඔබේ පිළිතුර:</p>
        <div className="answer-slots">
          {selectedLetters.map((letterObj, index) => (
            <button
              key={letterObj.id}
              className={`letter-slot filled ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`}
              onClick={() => deselectLetter(letterObj)}
              disabled={isCorrect !== null}
            >
              {letterObj.letter}
            </button>
          ))}
          {Array(currentWord.sinhala.length - selectedLetters.length).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="letter-slot empty"></div>
          ))}
        </div>
      </div>

      <div className="scramble-letters">
        <p className="letters-label">Available letters / ඇති අකුරු:</p>
        <div className="letter-tiles">
          {scrambledLetters.map(letterObj => (
            <button
              key={letterObj.id}
              className="letter-tile"
              onClick={() => selectLetter(letterObj)}
              disabled={isCorrect !== null}
            >
              {letterObj.letter}
            </button>
          ))}
        </div>
      </div>

      {isCorrect === null && (
        <div className="scramble-actions">
          {!showHint && (
            <button className="hint-btn-scramble" onClick={useHint}>
              Show Hint / ඉඟිය පෙන්වන්න
            </button>
          )}
          <button
            className="check-btn"
            onClick={checkAnswer}
            disabled={selectedLetters.length !== currentWord.sinhala.length}
          >
            Check / පරීක්ෂා කරන්න
          </button>
        </div>
      )}

      {isCorrect !== null && (
        <div className="scramble-feedback">
          {isCorrect ? (
            <p className="feedback-correct">Correct! / නිවැරදියි! 🎉</p>
          ) : (
            <p className="feedback-incorrect">
              The answer was: {currentWord.sinhala}
              <span className="feedback-si">පිළිතුර: {currentWord.sinhala}</span>
            </p>
          )}
          <button className="next-btn-scramble" onClick={nextWord}>
            {currentIndex < words.length - 1 ? 'Next Word / ඊළඟ වචනය' : 'Finish / අවසන් කරන්න'}
          </button>
        </div>
      )}
    </div>
  );
};

export default WordScramble;
