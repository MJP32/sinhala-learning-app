import React from 'react';
import './Quiz.css';

const QuizHint = ({ onUseHint, hintsUsed, maxHints = 2, disabled }) => {
  const hintsRemaining = maxHints - hintsUsed;

  if (disabled || hintsRemaining <= 0) {
    return null;
  }

  return (
    <div className="quiz-hint-container">
      <div className="hint-info">
        <span className="hint-remaining">
          {hintsRemaining} hint{hintsRemaining !== 1 ? 's' : ''} remaining
        </span>
        <span className="hint-warning">
          (Using hints reduces points earned)
        </span>
      </div>

      <div className="hint-buttons">
        <button
          className="hint-btn eliminate"
          onClick={() => onUseHint('eliminate')}
          disabled={disabled}
          title="Remove one wrong answer"
        >
          <span className="hint-icon">🚫</span>
          <span className="hint-text">
            Eliminate Wrong
            <span className="hint-text-si">වැරදි පිළිතුර ඉවත් කරන්න</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuizHint;
