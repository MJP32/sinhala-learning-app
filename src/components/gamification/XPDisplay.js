import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import './Gamification.css';

const XPDisplay = ({ compact = false }) => {
  const {
    xp,
    level,
    getNextLevelXP,
    getCurrentLevelXP,
    getLevelTitle
  } = useGamification();

  const currentLevelXP = getCurrentLevelXP();
  const nextLevelXP = getNextLevelXP();
  const progressInLevel = xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const progressPercentage = Math.min((progressInLevel / xpNeededForLevel) * 100, 100);
  const levelTitle = getLevelTitle();

  if (compact) {
    return (
      <div className="xp-display-compact" title={`${xp} XP - ${levelTitle.en}`}>
        <span className="xp-level-badge">Lv.{level}</span>
        <div className="xp-mini-bar">
          <div
            className="xp-mini-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="xp-display">
      <div className="xp-header">
        <div className="xp-level">
          <span className="level-number">Level {level}</span>
          <span className="level-title">{levelTitle.en}</span>
          <span className="level-title-sinhala">{levelTitle.si}</span>
        </div>
        <div className="xp-amount">
          <span className="xp-current">{xp.toLocaleString()}</span>
          <span className="xp-label">XP</span>
        </div>
      </div>
      <div className="xp-progress-container">
        <div className="xp-progress-bar">
          <div
            className="xp-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="xp-progress-text">
          <span>{progressInLevel.toLocaleString()} / {xpNeededForLevel.toLocaleString()} XP</span>
          <span>Next: Level {level + 1}</span>
        </div>
      </div>
    </div>
  );
};

export default XPDisplay;
