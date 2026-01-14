import React from 'react';
import { useChallenges } from '../../context/ChallengesContext';
import ChallengeCard from './ChallengeCard';
import './Challenges.css';

const DailyChallenges = ({ isOpen, onClose }) => {
  const {
    challenges,
    claimReward,
    claimAllCompletedBonus,
    getCompletionStats,
    ALL_CHALLENGES_BONUS_XP,
  } = useChallenges();

  const stats = getCompletionStats();

  if (!isOpen) return null;

  const handleClaimAll = async () => {
    // Claim individual rewards first
    for (const challenge of challenges) {
      if (challenge.completed && !challenge.claimed) {
        await claimReward(challenge.id);
      }
    }
    // Then claim bonus if all completed
    if (stats.allCompleted && !stats.allCompletedBonusClaimed) {
      await claimAllCompletedBonus();
    }
  };

  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="modal-overlay challenges-modal-overlay" onClick={onClose}>
      <div className="challenges-modal" onClick={e => e.stopPropagation()}>
        <div className="challenges-header">
          <div className="challenges-title-section">
            <h2>Daily Challenges</h2>
            <span className="challenges-title-si">දෛනික අභියෝග</span>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="challenges-timer">
          <span className="timer-icon">⏰</span>
          <span className="timer-text">Resets in {getTimeUntilReset()}</span>
        </div>

        <div className="challenges-progress-summary">
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-progress"
                strokeDasharray={`${(stats.completed / stats.total) * 100}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="progress-text">
              <span className="progress-number">{stats.completed}/{stats.total}</span>
            </div>
          </div>
          <div className="progress-info">
            <p className="progress-label">Challenges Completed</p>
            <p className="progress-sublabel">සම්පූර්ණ කළ අභියෝග</p>
          </div>
        </div>

        <div className="challenges-list">
          {challenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClaim={claimReward}
            />
          ))}
        </div>

        {stats.allCompleted && (
          <div className={`bonus-section ${stats.allCompletedBonusClaimed ? 'claimed' : ''}`}>
            <div className="bonus-content">
              <span className="bonus-icon">🎉</span>
              <div className="bonus-text">
                <h4>All Challenges Complete!</h4>
                <p>සියලුම අභියෝග සම්පූර්ණයි!</p>
              </div>
              <div className="bonus-reward">
                {stats.allCompletedBonusClaimed ? (
                  <span className="bonus-claimed">✓ +{ALL_CHALLENGES_BONUS_XP} XP Claimed</span>
                ) : (
                  <button
                    className="claim-bonus-button"
                    onClick={claimAllCompletedBonus}
                  >
                    +{ALL_CHALLENGES_BONUS_XP} XP Bonus
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {stats.unclaimed > 0 && (
          <div className="challenges-footer">
            <button className="claim-all-button" onClick={handleClaimAll}>
              Claim All Rewards ({stats.unclaimed} available)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenges;
