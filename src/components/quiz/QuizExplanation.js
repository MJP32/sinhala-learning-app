import React from 'react';
import './Quiz.css';

const QuizExplanation = ({ explanation, explanationSinhala, isCorrect }) => {
  return (
    <div className={`quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
      <div className="explanation-header">
        <span className="explanation-icon">
          {isCorrect ? '✓' : 'ℹ️'}
        </span>
        <span className="explanation-title">
          {isCorrect ? 'Correct!' : 'Explanation'}
        </span>
        <span className="explanation-title-si">
          {isCorrect ? 'නිවැරදියි!' : 'පැහැදිලි කිරීම'}
        </span>
      </div>

      <div className="explanation-content">
        <p className="explanation-text">{explanation}</p>
        {explanationSinhala && (
          <p className="explanation-text-si">{explanationSinhala}</p>
        )}
      </div>
    </div>
  );
};

export default QuizExplanation;
