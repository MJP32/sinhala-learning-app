import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import './Gamification.css';

const StreakIndicator = ({ showLabel = true }) => {
  const { currentStreak, longestStreak } = useGamification();

  const getStreakColor = () => {
    if (currentStreak >= 30) return '#ff4500'; // Red-orange for month+
    if (currentStreak >= 14) return '#ff6b35'; // Orange for 2 weeks+
    if (currentStreak >= 7) return '#ff8c00'; // Dark orange for week+
    if (currentStreak >= 3) return '#ffa500'; // Orange for 3+ days
    return '#ffcc00'; // Yellow for starting
  };

  const getStreakEmoji = () => {
    if (currentStreak >= 30) return '🔥🔥🔥';
    if (currentStreak >= 14) return '🔥🔥';
    if (currentStreak >= 7) return '🔥';
    if (currentStreak >= 3) return '✨';
    return '💫';
  };

  return (
    <div
      className="streak-indicator"
      title={`Current streak: ${currentStreak} days | Best: ${longestStreak} days`}
    >
      <div className="streak-icon" style={{ color: getStreakColor() }}>
        {getStreakEmoji()}
      </div>
      <div className="streak-content">
        <span className="streak-count" style={{ color: getStreakColor() }}>
          {currentStreak}
        </span>
        {showLabel && (
          <span className="streak-label">
            day{currentStreak !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      {currentStreak > 0 && currentStreak === longestStreak && (
        <span className="streak-best" title="Personal best!">
          ⭐
        </span>
      )}
    </div>
  );
};

export default StreakIndicator;
