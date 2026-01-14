import React from 'react';
import './Gamification.css';

const AchievementBadge = ({ achievement, size = 'medium', showDetails = false, onClick }) => {
  const { unlocked, icon, name, nameSinhala, description, xpReward } = achievement;

  const sizeClasses = {
    small: 'badge-small',
    medium: 'badge-medium',
    large: 'badge-large'
  };

  return (
    <div
      className={`achievement-badge ${sizeClasses[size]} ${unlocked ? 'unlocked' : 'locked'}`}
      onClick={onClick}
      title={unlocked ? `${name} - ${description}` : 'Locked achievement'}
    >
      <div className="badge-icon">
        {unlocked ? icon : '🔒'}
      </div>
      {showDetails && (
        <div className="badge-details">
          <span className="badge-name">{unlocked ? name : '???'}</span>
          {unlocked && <span className="badge-name-sinhala">{nameSinhala}</span>}
          {unlocked && (
            <span className="badge-description">{description}</span>
          )}
          {unlocked && xpReward && (
            <span className="badge-xp">+{xpReward} XP</span>
          )}
        </div>
      )}
      {!unlocked && showDetails && (
        <div className="badge-locked-text">
          <span>Keep learning to unlock!</span>
          <span className="badge-locked-sinhala">ඉගෙනීම දිගටම කරන්න!</span>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
