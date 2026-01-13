import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const ProgressModal = () => {
  const {
    showProgressModal,
    setShowProgressModal,
    getOverallProgress,
    getDetailedProgress,
    resetProgress
  } = useProgress();

  if (!showProgressModal) return null;

  const overall = getOverallProgress();
  const detailed = getDetailedProgress();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className="progress-modal-overlay" onClick={() => setShowProgressModal(false)}>
      <div className="progress-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={() => setShowProgressModal(false)}>
          &times;
        </button>

        <h2>Your Learning Progress</h2>

        <div className="overall-progress">
          <div className="progress-circle">
            <svg viewBox="0 0 100 100">
              <circle
                className="progress-bg"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="10"
              />
              <circle
                className="progress-fill"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${overall.percentage * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-text">
              <span className="percentage">{overall.percentage}%</span>
              <span className="label">Complete</span>
            </div>
          </div>
          <p className="progress-summary">
            {overall.completed} of {overall.total} sections completed
          </p>
        </div>

        <div className="grade-progress-list">
          <h3>Progress by Grade</h3>
          {detailed.map(grade => (
            <div key={grade.id} className="grade-progress-item">
              <div className="grade-info">
                <span className="grade-name">{grade.name}</span>
                <span className="grade-stats">{grade.completed}/{grade.sections}</span>
              </div>
              <div className="grade-bar">
                <div
                  className="grade-bar-fill"
                  style={{ width: `${grade.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="progress-actions">
          <button className="reset-btn" onClick={handleReset}>
            Reset All Progress
          </button>
        </div>

        <style>{`
          .progress-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .progress-modal {
            background: white;
            border-radius: 16px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease;
          }

          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #666;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
          }

          .close-modal:hover {
            background: #f0f0f0;
            color: #333;
          }

          .progress-modal h2 {
            text-align: center;
            color: #333;
            margin-bottom: 25px;
          }

          .overall-progress {
            text-align: center;
            margin-bottom: 30px;
          }

          .progress-circle {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto 15px;
          }

          .progress-circle svg {
            width: 100%;
            height: 100%;
          }

          .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }

          .progress-text .percentage {
            display: block;
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .progress-text .label {
            display: block;
            font-size: 14px;
            color: #666;
          }

          .progress-summary {
            color: #666;
            font-size: 16px;
          }

          .grade-progress-list h3 {
            color: #444;
            font-size: 18px;
            margin-bottom: 15px;
          }

          .grade-progress-item {
            margin-bottom: 12px;
          }

          .grade-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }

          .grade-name {
            font-weight: 500;
            color: #333;
          }

          .grade-stats {
            color: #666;
            font-size: 14px;
          }

          .grade-bar {
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
          }

          .grade-bar-fill {
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px;
            transition: width 0.3s ease;
          }

          .progress-actions {
            margin-top: 25px;
            text-align: center;
          }

          .reset-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          }

          .reset-btn:hover {
            background: #ee5a5a;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProgressModal;
