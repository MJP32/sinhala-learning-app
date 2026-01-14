import React, { useState, useMemo } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { analyzeWeakAreas, generateRecommendations, calculateLearningHealth } from '../../utils/recommendationEngine';
import RecommendedSection from './RecommendedSection';
import './Recommendations.css';

const RecommendationsPanel = ({ currentGrade, onNavigateToSection }) => {
  const { analytics } = useAnalytics();
  const [showAll, setShowAll] = useState(false);

  // Calculate recommendations
  const { recommendations, health, weakAreas } = useMemo(() => {
    const gradeKey = `grade${currentGrade}`;
    const weak = analyzeWeakAreas(analytics, gradeKey);
    const recs = generateRecommendations(weak, gradeKey, showAll ? 10 : 3);
    const healthScore = calculateLearningHealth(analytics);

    return {
      recommendations: recs,
      health: healthScore,
      weakAreas: weak,
    };
  }, [analytics, currentGrade, showAll]);

  const getHealthColor = () => {
    switch (health.status) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#8BC34A';
      case 'improving': return '#FF9800';
      case 'needs-attention': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getHealthIcon = () => {
    switch (health.status) {
      case 'excellent': return '🌟';
      case 'good': return '👍';
      case 'improving': return '📈';
      case 'needs-attention': return '💪';
      case 'new': return '🎯';
      default: return '📚';
    }
  };

  if (!analytics || analytics.quizHistory?.length === 0) {
    return (
      <div className="recommendations-panel empty">
        <div className="recommendations-header">
          <h3>Suggested for You</h3>
          <span className="header-si">ඔබට යෝජිත</span>
        </div>
        <div className="no-recommendations">
          <span className="empty-icon">🎯</span>
          <p>Take some quizzes to get personalized recommendations!</p>
          <p className="empty-si">පුද්ගලික නිර්දේශ ලබා ගැනීමට ප්‍රශ්නාවලි කිහිපයක් කරන්න!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-panel">
      <div className="recommendations-header">
        <div>
          <h3>Suggested for You</h3>
          <span className="header-si">ඔබට යෝජිත</span>
        </div>
        {weakAreas.length > 3 && (
          <button
            className="show-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All (${weakAreas.length})`}
          </button>
        )}
      </div>

      {/* Learning Health Score */}
      <div className="health-score-card" style={{ borderColor: getHealthColor() }}>
        <div className="health-icon">{getHealthIcon()}</div>
        <div className="health-info">
          <div className="health-status" style={{ color: getHealthColor() }}>
            {health.status === 'new' ? 'Getting Started' : health.statusSi}
          </div>
          <div className="health-message">{health.message}</div>
          {health.score > 0 && (
            <div className="health-score">
              <span>Recent Average: </span>
              <strong style={{ color: getHealthColor() }}>{health.score}%</strong>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations List */}
      <div className="recommendations-list">
        {recommendations.map((rec, index) => (
          <RecommendedSection
            key={rec.id}
            recommendation={rec}
            index={index}
            onNavigate={onNavigateToSection}
          />
        ))}
      </div>

      {/* Quick Stats */}
      {weakAreas.length > 0 && (
        <div className="weak-areas-summary">
          <span className="summary-label">Areas to focus:</span>
          <div className="area-tags">
            {weakAreas.slice(0, 5).map(area => (
              <span
                key={area.category}
                className="area-tag"
                style={{
                  background: area.recentAvgScore < 50 ? '#ffebee' : '#fff3e0',
                  color: area.recentAvgScore < 50 ? '#c62828' : '#ef6c00'
                }}
              >
                {area.category} ({area.recentAvgScore}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;
