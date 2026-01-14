import React, { useState, useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import './Interactive.css';

const DragDropMatch = ({
  pairs, // Array of { sinhala, english, id }
  title,
  titleSinhala,
  onComplete,
  gradeKey
}) => {
  const [sinhalaItems, setSinhalaItems] = useState([]);
  const [englishItems, setEnglishItems] = useState([]);
  const [matches, setMatches] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const { addXP } = useGamification();
  const { trackGameComplete } = useChallenges();

  // Initialize and shuffle items
  useEffect(() => {
    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    setSinhalaItems(shuffled.map(p => ({ ...p, type: 'sinhala' })));
    setEnglishItems([...pairs].sort(() => Math.random() - 0.5).map(p => ({ ...p, type: 'english' })));
    setStartTime(Date.now());
  }, [pairs]);

  // Handle drag start
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e, targetItem) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.type === targetItem.type) return;

    setAttempts(prev => prev + 1);

    // Check if match is correct
    const sinhalaItem = draggedItem.type === 'sinhala' ? draggedItem : targetItem;
    const englishItem = draggedItem.type === 'english' ? draggedItem : targetItem;

    if (sinhalaItem.id === englishItem.id) {
      // Correct match
      const newMatches = {
        ...matches,
        [sinhalaItem.id]: true
      };
      setMatches(newMatches);
      setScore(prev => prev + 1);

      // Check if all matched
      if (Object.keys(newMatches).length === pairs.length) {
        finishGame(newMatches);
      }
    }

    setDraggedItem(null);
  };

  // Handle touch events for mobile
  const handleTouchStart = (item) => {
    setDraggedItem(item);
  };

  const handleTouchEnd = (targetItem) => {
    if (!draggedItem || draggedItem.type === targetItem.type) {
      setDraggedItem(null);
      return;
    }

    setAttempts(prev => prev + 1);

    const sinhalaItem = draggedItem.type === 'sinhala' ? draggedItem : targetItem;
    const englishItem = draggedItem.type === 'english' ? draggedItem : targetItem;

    if (sinhalaItem.id === englishItem.id) {
      const newMatches = {
        ...matches,
        [sinhalaItem.id]: true
      };
      setMatches(newMatches);
      setScore(prev => prev + 1);

      if (Object.keys(newMatches).length === pairs.length) {
        finishGame(newMatches);
      }
    }

    setDraggedItem(null);
  };

  const finishGame = (finalMatches) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const accuracy = Math.round((Object.keys(finalMatches).length / attempts) * 100);

    // Award XP based on performance
    let xpEarned = 30; // Base XP
    if (accuracy === 100) xpEarned += 20; // Perfect bonus
    if (timeSpent < 30) xpEarned += 10; // Speed bonus

    addXP(xpEarned, 'game');
    trackGameComplete();
    celebrateGameWin();
    setIsComplete(true);

    if (onComplete) {
      onComplete({
        score,
        attempts,
        accuracy,
        timeSpent,
        xpEarned
      });
    }
  };

  const restartGame = () => {
    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    setSinhalaItems(shuffled.map(p => ({ ...p, type: 'sinhala' })));
    setEnglishItems([...pairs].sort(() => Math.random() - 0.5).map(p => ({ ...p, type: 'english' })));
    setMatches({});
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
    setStartTime(Date.now());
  };

  if (isComplete) {
    const accuracy = Math.round((pairs.length / attempts) * 100);

    return (
      <div className="game-complete">
        <h3>Matching Complete! / ගැලපීම අවසන්!</h3>

        <div className="game-results">
          <div className="result-item">
            <span className="result-number">{pairs.length}/{pairs.length}</span>
            <span className="result-label">Matched</span>
          </div>
          <div className="result-item">
            <span className="result-number">{attempts}</span>
            <span className="result-label">Attempts</span>
          </div>
          <div className="result-item">
            <span className="result-number">{accuracy}%</span>
            <span className="result-label">Accuracy</span>
          </div>
        </div>

        {accuracy === 100 && (
          <p className="game-feedback perfect">Perfect matching! / පරිපූර්ණ ගැලපීම!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  return (
    <div className="drag-drop-match">
      <div className="game-header">
        <div className="game-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="game-title-si">{titleSinhala}</span>}
        </div>
        <div className="game-score">
          <span>{score} / {pairs.length}</span>
        </div>
      </div>

      <p className="game-instructions">
        Drag Sinhala words to match with English / සිංහල වචන ඉංග්‍රීසි සමඟ ගැලපෙන්න
      </p>

      <div className="match-columns">
        <div className="match-column sinhala-column">
          <h4>Sinhala / සිංහල</h4>
          {sinhalaItems.map(item => (
            <div
              key={`si-${item.id}`}
              className={`match-item sinhala ${matches[item.id] ? 'matched' : ''} ${draggedItem?.id === item.id && draggedItem?.type === 'sinhala' ? 'dragging' : ''}`}
              draggable={!matches[item.id]}
              onDragStart={(e) => !matches[item.id] && handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => !matches[item.id] && handleDrop(e, item)}
              onTouchStart={() => !matches[item.id] && handleTouchStart(item)}
              onTouchEnd={() => !matches[item.id] && draggedItem && handleTouchEnd(item)}
            >
              {item.sinhala}
              {matches[item.id] && <span className="match-check">✓</span>}
            </div>
          ))}
        </div>

        <div className="match-column english-column">
          <h4>English / ඉංග්‍රීසි</h4>
          {englishItems.map(item => (
            <div
              key={`en-${item.id}`}
              className={`match-item english ${matches[item.id] ? 'matched' : ''} ${draggedItem?.id === item.id && draggedItem?.type === 'english' ? 'dragging' : ''}`}
              draggable={!matches[item.id]}
              onDragStart={(e) => !matches[item.id] && handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => !matches[item.id] && handleDrop(e, item)}
              onTouchStart={() => !matches[item.id] && handleTouchStart(item)}
              onTouchEnd={() => !matches[item.id] && draggedItem && handleTouchEnd(item)}
            >
              {item.english}
              {matches[item.id] && <span className="match-check">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragDropMatch;
