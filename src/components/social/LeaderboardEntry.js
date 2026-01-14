import React from 'react';
import './Social.css';

const LeaderboardEntry = ({ entry, rank, isCurrentUser, xpField }) => {
  const { displayName, level, streak } = entry;
  const xp = entry[xpField] || 0;

  const getMedalIcon = () => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankClass = () => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
  };

  return (
    <div className={`leaderboard-entry ${isCurrentUser ? 'current-user' : ''} ${getRankClass()}`}>
      <div className="entry-rank">
        {getMedalIcon() ? (
          <span className="medal">{getMedalIcon()}</span>
        ) : (
          <span className="rank-number">#{rank}</span>
        )}
      </div>

      <div className="entry-avatar">
        <span className="avatar-letter">{displayName.charAt(0).toUpperCase()}</span>
      </div>

      <div className="entry-info">
        <span className="entry-name">
          {displayName}
          {isCurrentUser && <span className="you-badge">You</span>}
        </span>
        <div className="entry-stats">
          <span className="entry-level">Lv. {level}</span>
          {streak > 0 && (
            <span className="entry-streak">
              <span className="streak-fire">🔥</span>
              {streak}
            </span>
          )}
        </div>
      </div>

      <div className="entry-xp">
        <span className="xp-value">{xp.toLocaleString()}</span>
        <span className="xp-label">XP</span>
      </div>
    </div>
  );
};

export default LeaderboardEntry;
