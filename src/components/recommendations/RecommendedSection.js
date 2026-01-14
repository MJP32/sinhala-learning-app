import React from 'react';
import './Recommendations.css';

const RecommendedSection = ({ recommendation, index, onNavigate }) => {
  const { sectionName, sectionNameSi, currentScore, gap, reason, reasonSi, actionType, section, grade } = recommendation;

  const getActionIcon = () => {
    switch (actionType) {
      case 'review': return '📖';
      case 'practice': return '✏️';
      case 'strengthen': return '💪';
      case 'maintain': return '🌟';
      default: return '📚';
    }
  };

  const getActionLabel = () => {
    switch (actionType) {
      case 'review': return 'Review Basics';
      case 'practice': return 'Practice More';
      case 'strengthen': return 'Almost There!';
      case 'maintain': return 'Keep It Up';
      default: return 'Study';
    }
  };

  const getProgressColor = () => {
    if (currentScore === undefined) return '#9e9e9e';
    if (currentScore < 50) return '#f44336';
    if (currentScore < 70) return '#FF9800';
    return '#4CAF50';
  };

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(section, grade);
    }
  };

  return (
    <div className={`recommended-section priority-${index + 1}`}>
      <div className="section-left">
        <span className="action-icon">{getActionIcon()}</span>
        <div className="section-info">
          <h4 className="section-title">{sectionName}</h4>
          <span className="section-title-si">{sectionNameSi}</span>
          <p className="section-reason">{reason}</p>
        </div>
      </div>

      <div className="section-right">
        {currentScore !== undefined && (
          <div className="score-indicator">
            <div
              className="score-circle"
              style={{
                background: `conic-gradient(${getProgressColor()} ${currentScore}%, #e0e0e0 ${currentScore}%)`
              }}
            >
              <span className="score-value">{currentScore}%</span>
            </div>
            {gap > 0 && (
              <span className="gap-label">+{gap}% to go</span>
            )}
          </div>
        )}

        <button
          className={`action-btn ${actionType}`}
          onClick={handleNavigate}
        >
          <span className="btn-label">{getActionLabel()}</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default RecommendedSection;
