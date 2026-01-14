import React from 'react';

const ChallengeCard = ({ challenge, onClaim }) => {
  const progressPercent = challenge.target > 0
    ? Math.min((challenge.progress / challenge.target) * 100, 100)
    : 0;

  const getStatusClass = () => {
    if (challenge.claimed) return 'claimed';
    if (challenge.completed) return 'completed';
    return 'in-progress';
  };

  return (
    <div className={`challenge-card ${getStatusClass()}`}>
      <div className="challenge-icon">
        {challenge.icon}
      </div>

      <div className="challenge-content">
        <div className="challenge-header">
          <h4 className="challenge-title">{challenge.title}</h4>
          <span className="challenge-title-si">{challenge.titleSi}</span>
        </div>

        <p className="challenge-description">{challenge.description}</p>

        <div className="challenge-progress-container">
          <div className="challenge-progress-bar">
            <div
              className="challenge-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="challenge-progress-text">
            {challenge.trackingKey === 'streakMaintained' || challenge.trackingKey === 'highestQuizScore'
              ? (challenge.completed ? '✓' : `${challenge.progress}/${challenge.target}`)
              : `${challenge.progress}/${challenge.target}`
            }
          </span>
        </div>
      </div>

      <div className="challenge-reward">
        {challenge.claimed ? (
          <div className="reward-claimed">
            <span className="claimed-check">✓</span>
            <span className="claimed-text">Claimed</span>
          </div>
        ) : challenge.completed ? (
          <button
            className="claim-button"
            onClick={() => onClaim(challenge.id)}
          >
            <span className="xp-amount">+{challenge.xpReward} XP</span>
            <span className="claim-text">Claim</span>
          </button>
        ) : (
          <div className="reward-pending">
            <span className="xp-icon">⭐</span>
            <span className="xp-amount">{challenge.xpReward} XP</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
