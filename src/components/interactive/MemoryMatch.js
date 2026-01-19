import React, { useState, useEffect, useCallback } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import './Interactive.css';

const MemoryMatch = ({
  pairs, // Array of { sinhala, english, id }
  title,
  titleSinhala,
  onComplete,
  gradeKey,
  difficulty = 'easy' // 'easy' (4x4) or 'hard' (6x6)
}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const { addXP } = useGamification();
  const { trackGameComplete } = useChallenges();

  const gridSize = difficulty === 'hard' ? 18 : 8; // 18 pairs for 6x6, 8 pairs for 4x4

  // Initialize cards
  useEffect(() => {
    const selectedPairs = pairs.slice(0, gridSize);
    const cardSet = [];

    selectedPairs.forEach((pair, idx) => {
      cardSet.push({
        id: `si-${pair.id || idx}`,
        pairId: pair.id || idx,
        content: pair.sinhala,
        type: 'sinhala'
      });
      cardSet.push({
        id: `en-${pair.id || idx}`,
        pairId: pair.id || idx,
        content: pair.english,
        type: 'english'
      });
    });

    // Shuffle cards
    const shuffled = cardSet.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setStartTime(Date.now());
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsComplete(false);
  }, [pairs, gridSize]);

  // Timer
  useEffect(() => {
    if (!startTime || isComplete) return;

    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, isComplete]);

  // Check for match
  useEffect(() => {
    if (flippedCards.length !== 2) return;

    setIsChecking(true);
    const [first, second] = flippedCards;

    if (first.pairId === second.pairId && first.type !== second.type) {
      // Match found
      setTimeout(() => {
        setMatchedPairs(prev => [...prev, first.pairId]);
        setFlippedCards([]);
        setIsChecking(false);
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedCards]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === cards.length / 2) {
      finishGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedPairs, cards.length]);

  const handleCardClick = useCallback((card) => {
    if (isChecking) return;
    if (flippedCards.length >= 2) return;
    if (flippedCards.find(c => c.id === card.id)) return;
    if (matchedPairs.includes(card.pairId)) return;

    setMoves(prev => prev + 1);
    setFlippedCards(prev => [...prev, card]);
  }, [flippedCards, matchedPairs, isChecking]);

  const finishGame = () => {
    const totalPairs = cards.length / 2;
    const perfectMoves = totalPairs * 2;
    const efficiency = Math.round((perfectMoves / moves) * 100);

    // Calculate XP
    let xpEarned = 40; // Base XP
    if (efficiency >= 90) xpEarned += 30; // Near-perfect bonus
    else if (efficiency >= 70) xpEarned += 15;
    if (timeElapsed < 60) xpEarned += 10; // Speed bonus for easy
    if (difficulty === 'hard') xpEarned += 20; // Hard mode bonus

    addXP(xpEarned, 'game');
    trackGameComplete();
    celebrateGameWin();
    setIsComplete(true);

    if (onComplete) {
      onComplete({
        moves,
        timeElapsed,
        efficiency,
        xpEarned,
        difficulty
      });
    }
  };

  const restartGame = () => {
    const selectedPairs = pairs.slice(0, gridSize);
    const cardSet = [];

    selectedPairs.forEach((pair, idx) => {
      cardSet.push({
        id: `si-${pair.id || idx}`,
        pairId: pair.id || idx,
        content: pair.sinhala,
        type: 'sinhala'
      });
      cardSet.push({
        id: `en-${pair.id || idx}`,
        pairId: pair.id || idx,
        content: pair.english,
        type: 'english'
      });
    });

    setCards(cardSet.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setIsComplete(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCardFlipped = (card) => {
    return flippedCards.find(c => c.id === card.id) || matchedPairs.includes(card.pairId);
  };

  const isCardMatched = (card) => {
    return matchedPairs.includes(card.pairId);
  };

  if (isComplete) {
    const totalPairs = cards.length / 2;
    const perfectMoves = totalPairs * 2;
    const efficiency = Math.round((perfectMoves / moves) * 100);

    return (
      <div className="game-complete">
        <h3>Memory Match Complete! / මතක ගැලපීම අවසන්!</h3>

        <div className="game-results">
          <div className="result-item">
            <span className="result-number">{totalPairs}</span>
            <span className="result-label">Pairs Matched</span>
          </div>
          <div className="result-item">
            <span className="result-number">{moves}</span>
            <span className="result-label">Moves</span>
          </div>
          <div className="result-item">
            <span className="result-number">{formatTime(timeElapsed)}</span>
            <span className="result-label">Time</span>
          </div>
          <div className="result-item">
            <span className="result-number">{efficiency}%</span>
            <span className="result-label">Efficiency</span>
          </div>
        </div>

        {efficiency >= 90 && (
          <p className="game-feedback perfect">Amazing memory! / විශිෂ්ට මතකය!</p>
        )}
        {efficiency >= 70 && efficiency < 90 && (
          <p className="game-feedback good">Great job! / හොඳයි!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  const gridClass = difficulty === 'hard' ? 'memory-grid hard' : 'memory-grid easy';

  return (
    <div className="memory-match">
      <div className="game-header">
        <div className="game-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="game-title-si">{titleSinhala}</span>}
        </div>
        <div className="game-stats">
          <span className="stat-moves">Moves: {moves}</span>
          <span className="stat-time">Time: {formatTime(timeElapsed)}</span>
          <span className="stat-matched">{matchedPairs.length}/{cards.length / 2}</span>
        </div>
      </div>

      <p className="game-instructions">
        Match Sinhala words with their English translations / සිංහල වචන ඉංග්‍රීසි පරිවර්තන සමඟ ගලපන්න
      </p>

      <div className={gridClass}>
        {cards.map(card => (
          <button
            key={card.id}
            className={`memory-card ${isCardFlipped(card) ? 'flipped' : ''} ${isCardMatched(card) ? 'matched' : ''} ${card.type}`}
            onClick={() => handleCardClick(card)}
            disabled={isCardMatched(card) || isChecking}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.content}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;
