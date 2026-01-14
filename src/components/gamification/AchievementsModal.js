import React, { useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { ACHIEVEMENT_CATEGORIES } from '../../config/achievements';
import AchievementBadge from './AchievementBadge';
import './Gamification.css';

const AchievementsModal = ({ isOpen, onClose }) => {
  const { getAllAchievements } = useGamification();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const allAchievements = getAllAchievements();
  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalCount = allAchievements.length;

  const filteredAchievements = selectedCategory === 'all'
    ? allAchievements
    : allAchievements.filter(a => a.category === selectedCategory);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="achievements-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Achievements</h2>
          <span className="achievements-sinhala">ජයග්‍රහණ</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="achievements-summary">
          <div className="summary-stat">
            <span className="stat-number">{unlockedCount}</span>
            <span className="stat-label">/ {totalCount} Unlocked</span>
          </div>
          <div className="summary-progress">
            <div
              className="summary-progress-fill"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        <div className="category-tabs">
          <button
            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          {ACHIEVEMENT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map(achievement => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              size="large"
              showDetails
            />
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="no-achievements">
            <p>No achievements in this category yet.</p>
            <p className="no-achievements-sinhala">මෙම කාණ්ඩයේ ජයග්‍රහණ නැත.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsModal;
