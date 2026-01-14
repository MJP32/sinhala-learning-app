import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { useGamification } from '../../context/GamificationContext';
import { useProgress } from '../../context/ProgressContext';
import PerformanceChart from './PerformanceChart';
import CategoryBreakdown from './CategoryBreakdown';
import WeakAreasCard from './WeakAreasCard';
import StreakCalendar from './StreakCalendar';
import RecommendationsPanel from '../recommendations/RecommendationsPanel';
import './Analytics.css';

const AnalyticsDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const {
    totalTimeSpent,
    sessionsCount,
    quizHistory,
    categoryPerformance,
    dailyActivity,
    getLearningTrends,
    getQuizTrends,
    getWeakAreas,
    formatTime
  } = useAnalytics();

  const { xp, level, currentStreak, longestStreak, getLevelTitle } = useGamification();
  const { getOverallProgress, getDetailedProgress } = useProgress();

  if (!isOpen) return null;

  const overallProgress = getOverallProgress();
  const detailedProgress = getDetailedProgress();
  const learningTrends = getLearningTrends();
  const quizTrends = getQuizTrends();
  const weakAreas = getWeakAreas();
  const levelTitle = getLevelTitle();

  const tabs = [
    { id: 'overview', label: 'Overview', labelSi: 'දළ විශ්ලේෂණය' },
    { id: 'suggested', label: 'Suggested', labelSi: 'නිර්දේශිත' },
    { id: 'performance', label: 'Performance', labelSi: 'කාර්ය සාධනය' },
    { id: 'activity', label: 'Activity', labelSi: 'ක්‍රියාකාරකම්' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="analytics-dashboard" onClick={e => e.stopPropagation()}>
        <div className="dashboard-header">
          <div className="header-content">
            <h2>Learning Analytics</h2>
            <span className="header-sinhala">ඉගෙනුම් විශ්ලේෂණ</span>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="dashboard-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="tab-si">{tab.labelSi}</span>
            </button>
          ))}
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              {/* Summary Cards */}
              <div className="summary-cards">
                <div className="summary-card xp">
                  <span className="card-icon">⭐</span>
                  <div className="card-content">
                    <span className="card-value">{xp.toLocaleString()}</span>
                    <span className="card-label">Total XP</span>
                  </div>
                </div>

                <div className="summary-card level">
                  <span className="card-icon">🏆</span>
                  <div className="card-content">
                    <span className="card-value">Level {level}</span>
                    <span className="card-label">{levelTitle.en}</span>
                  </div>
                </div>

                <div className="summary-card streak">
                  <span className="card-icon">🔥</span>
                  <div className="card-content">
                    <span className="card-value">{currentStreak}</span>
                    <span className="card-label">Day Streak</span>
                  </div>
                </div>

                <div className="summary-card time">
                  <span className="card-icon">⏱️</span>
                  <div className="card-content">
                    <span className="card-value">{formatTime(totalTimeSpent)}</span>
                    <span className="card-label">Total Time</span>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="progress-section">
                <h3>Learning Progress / ඉගෙනුම් ප්‍රගතිය</h3>
                <div className="overall-progress">
                  <div className="progress-circle-large">
                    <svg viewBox="0 0 100 100">
                      <circle
                        className="progress-bg-circle"
                        cx="50" cy="50" r="45"
                      />
                      <circle
                        className="progress-fill-circle"
                        cx="50" cy="50" r="45"
                        strokeDasharray={`${overallProgress.percentage * 2.83} 283`}
                      />
                    </svg>
                    <div className="progress-text-center">
                      <span className="progress-percent">{overallProgress.percentage}%</span>
                      <span className="progress-label">Complete</span>
                    </div>
                  </div>
                  <div className="progress-details">
                    <p>{overallProgress.completed} / {overallProgress.total} sections completed</p>
                  </div>
                </div>

                <div className="grade-progress-list">
                  {detailedProgress.map(grade => (
                    <div key={grade.id} className="grade-progress-item">
                      <span className="grade-name">{grade.name}</span>
                      <div className="grade-bar">
                        <div
                          className="grade-bar-fill"
                          style={{ width: `${grade.percentage}%` }}
                        />
                      </div>
                      <span className="grade-percent">{grade.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-value">{sessionsCount}</span>
                  <span className="stat-name">Sessions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{quizHistory.length}</span>
                  <span className="stat-name">Quizzes Taken</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{longestStreak}</span>
                  <span className="stat-name">Best Streak</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suggested' && (
            <div className="suggested-tab">
              <RecommendationsPanel
                currentGrade={1}
                onNavigateToSection={(section, grade) => {
                  console.log(`Navigate to ${section} in ${grade}`);
                  onClose();
                }}
              />
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="performance-tab">
              <div className="performance-grid">
                <div className="chart-section">
                  <h3>Quiz Performance / ප්‍රශ්නාවලි කාර්ය සාධනය</h3>
                  <PerformanceChart data={quizTrends} />
                </div>

                <div className="category-section">
                  <h3>Performance by Category / කාණ්ඩය අනුව</h3>
                  <CategoryBreakdown data={categoryPerformance} />
                </div>

                <div className="weak-areas-section">
                  <h3>Areas to Improve / වැඩිදියුණු කළ යුතු ක්ෂේත්‍ර</h3>
                  <WeakAreasCard weakAreas={weakAreas} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-tab">
              <div className="activity-grid">
                <div className="trends-section">
                  <h3>Weekly Activity / සතිපතා ක්‍රියාකාරකම්</h3>
                  <div className="trends-chart">
                    {learningTrends.map((day, index) => (
                      <div key={day.date} className="trend-bar-container">
                        <div
                          className="trend-bar"
                          style={{
                            height: `${Math.min((day.timeSpent / 3600) * 100, 100)}%`
                          }}
                          title={`${formatTime(day.timeSpent)}`}
                        />
                        <span className="trend-day">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="calendar-section">
                  <h3>Streak Calendar / ධාරා දින දර්ශනය</h3>
                  <StreakCalendar dailyActivity={dailyActivity} />
                </div>

                <div className="session-stats">
                  <h3>Session Statistics / සැසි සංඛ්‍යාලේඛන</h3>
                  <div className="session-stat-grid">
                    <div className="session-stat">
                      <span className="session-stat-value">{sessionsCount}</span>
                      <span className="session-stat-label">Total Sessions</span>
                    </div>
                    <div className="session-stat">
                      <span className="session-stat-value">
                        {sessionsCount > 0 ? formatTime(Math.floor(totalTimeSpent / sessionsCount)) : '0s'}
                      </span>
                      <span className="session-stat-label">Avg Session Length</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
