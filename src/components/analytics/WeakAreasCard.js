import React from 'react';
import './Analytics.css';

const WeakAreasCard = ({ weakAreas }) => {
  const categoryNames = {
    vocabulary: { en: 'Vocabulary', si: 'වචන මාලාව', tip: 'Practice with flashcards' },
    grammar: { en: 'Grammar', si: 'ව්‍යාකරණ', tip: 'Review grammar rules' },
    reading: { en: 'Reading', si: 'කියවීම', tip: 'Read more stories' },
    writing: { en: 'Writing', si: 'ලිවීම', tip: 'Practice sentence building' },
    culture: { en: 'Culture', si: 'සංස්කෘතිය', tip: 'Explore cultural content' },
    general: { en: 'General', si: 'සාමාන්‍ය', tip: 'Keep practicing!' }
  };

  if (!weakAreas || weakAreas.length === 0) {
    return (
      <div className="weak-areas-card success">
        <div className="success-icon">🎉</div>
        <h4>Great job!</h4>
        <p className="success-text">You're performing well in all categories!</p>
        <p className="success-si">ඔබ සියලු කාණ්ඩවල හොඳින් ඉදිරියට යනවා!</p>
      </div>
    );
  }

  return (
    <div className="weak-areas-card">
      <div className="weak-areas-intro">
        <p>Focus on these areas to improve:</p>
        <p className="intro-si">වැඩිදියුණු කිරීමට මෙම ක්ෂේත්‍ර කෙරෙහි අවධානය යොමු කරන්න:</p>
      </div>

      <div className="weak-areas-list">
        {weakAreas.map((area, index) => {
          const catInfo = categoryNames[area.category] || categoryNames.general;

          return (
            <div key={area.category} className="weak-area-item">
              <div className="weak-area-header">
                <span className="weak-area-name">{catInfo.en}</span>
                <span className="weak-area-name-si">{catInfo.si}</span>
              </div>

              <div className="weak-area-progress">
                <div className="weak-area-bar">
                  <div
                    className="weak-area-bar-fill"
                    style={{
                      width: `${area.percentage}%`,
                      backgroundColor: area.percentage < 50 ? '#f44336' : '#FF9800'
                    }}
                  />
                </div>
                <span className="weak-area-percent">{area.percentage}%</span>
              </div>

              <div className="weak-area-stats">
                <span>{area.correct} / {area.total} correct</span>
              </div>

              <div className="weak-area-tip">
                <span className="tip-icon">💡</span>
                <span>{catInfo.tip}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeakAreasCard;
