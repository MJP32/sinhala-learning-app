import React, { useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';
import confetti from 'canvas-confetti';
import './Gamification.css';

const LevelUpModal = () => {
  const { showLevelUp, newLevel, dismissLevelUp, getLevelTitle } = useGamification();

  useEffect(() => {
    if (showLevelUp && newLevel) {
      // Bigger celebration for level up
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8d153a', '#ffd700', '#ff6b35', '#4CAF50']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8d153a', '#ffd700', '#ff6b35', '#4CAF50']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [showLevelUp, newLevel]);

  if (!showLevelUp || !newLevel) return null;

  const levelTitle = getLevelTitle(newLevel);

  return (
    <div className="level-up-overlay" onClick={dismissLevelUp}>
      <div className="level-up-card" onClick={e => e.stopPropagation()}>
        <div className="level-up-stars">
          ⭐ ⭐ ⭐
        </div>

        <div className="level-up-header">
          <span className="level-up-label">LEVEL UP!</span>
          <span className="level-up-label-sinhala">මට්ටම ඉහළට!</span>
        </div>

        <div className="level-up-number">
          <span className="level-up-new">{newLevel}</span>
        </div>

        <div className="level-up-title">
          <span className="level-up-title-en">{levelTitle.en}</span>
          <span className="level-up-title-si">{levelTitle.si}</span>
        </div>

        <div className="level-up-message">
          <p>Congratulations on reaching Level {newLevel}!</p>
          <p className="level-up-message-sinhala">
            {newLevel} වන මට්ටමට ළඟා වීම ගැන සුභ පැතුම්!
          </p>
        </div>

        <button className="level-up-dismiss" onClick={dismissLevelUp}>
          Continue Learning / ඉගෙනීම දිගටම කරන්න
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
