import React from 'react';
import './Quiz.css';

const QuizDifficultySelector = ({ difficulty, onChange, questionCounts }) => {
  const difficulties = [
    {
      id: 'all',
      label: 'All Questions',
      labelSi: 'සියලු ප්‍රශ්න',
      color: '#8d153a',
      description: 'Mix of all difficulties'
    },
    {
      id: 'easy',
      label: 'Easy',
      labelSi: 'පහසු',
      color: '#4CAF50',
      description: 'Basic recall questions'
    },
    {
      id: 'medium',
      label: 'Medium',
      labelSi: 'මධ්‍යම',
      color: '#FF9800',
      description: 'Application questions'
    },
    {
      id: 'hard',
      label: 'Hard',
      labelSi: 'අමාරු',
      color: '#f44336',
      description: 'Complex understanding'
    }
  ];

  return (
    <div className="difficulty-selector">
      <h4 className="difficulty-title">
        Select Difficulty
        <span className="difficulty-title-si">අමාරු තත්ත්වය තෝරන්න</span>
      </h4>

      <div className="difficulty-options">
        {difficulties.map(diff => {
          const count = questionCounts[diff.id] || 0;
          const isDisabled = count === 0 && diff.id !== 'all';

          return (
            <button
              key={diff.id}
              className={`difficulty-option ${difficulty === diff.id ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onChange(diff.id)}
              disabled={isDisabled}
              style={{
                '--diff-color': diff.color
              }}
            >
              <div className="diff-header">
                <span className="diff-label">{diff.label}</span>
                <span className="diff-label-si">{diff.labelSi}</span>
              </div>
              <span className="diff-count">{count} questions</span>
              <span className="diff-description">{diff.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizDifficultySelector;
