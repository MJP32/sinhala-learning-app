import React, { useEffect } from 'react';
import { useGamification } from '../../context/GamificationContext';
import confetti from 'canvas-confetti';
import './Gamification.css';

const AchievementUnlocked = () => {
  const { pendingAchievements, dismissPendingAchievement } = useGamification();

  const currentAchievement = pendingAchievements[0];

  useEffect(() => {
    if (currentAchievement) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8d153a', '#ffd700', '#ff6b35']
      });
    }
  }, [currentAchievement]);

  if (!currentAchievement) return null;

  return (
    <div className="achievement-unlocked-overlay" onClick={dismissPendingAchievement}>
      <div className="achievement-unlocked-card" onClick={e => e.stopPropagation()}>
        <div className="achievement-unlocked-header">
          <span className="achievement-unlocked-label">Achievement Unlocked!</span>
          <span className="achievement-unlocked-label-sinhala">ජයග්‍රහණය අගුළු හරින ලදී!</span>
        </div>

        <div className="achievement-unlocked-icon">
          {currentAchievement.icon}
        </div>

        <div className="achievement-unlocked-content">
          <h3 className="achievement-unlocked-name">{currentAchievement.name}</h3>
          <span className="achievement-unlocked-name-sinhala">
            {currentAchievement.nameSinhala}
          </span>
          <p className="achievement-unlocked-description">
            {currentAchievement.description}
          </p>
          {currentAchievement.xpReward && (
            <div className="achievement-unlocked-xp">
              +{currentAchievement.xpReward} XP
            </div>
          )}
        </div>

        <button
          className="achievement-unlocked-dismiss"
          onClick={dismissPendingAchievement}
        >
          Awesome! / නියමයි!
        </button>
      </div>
    </div>
  );
};

export default AchievementUnlocked;
