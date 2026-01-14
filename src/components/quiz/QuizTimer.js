import React, { useState, useEffect, useCallback } from 'react';
import './Quiz.css';

const QuizTimer = ({ seconds, onTimeUp, isPaused = false }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp, timeLeft]);

  const percentage = (timeLeft / seconds) * 100;

  const getTimerColor = () => {
    if (percentage > 50) return '#4CAF50';
    if (percentage > 25) return '#FF9800';
    return '#f44336';
  };

  const getTimerClass = () => {
    if (timeLeft <= 5) return 'timer-critical';
    if (timeLeft <= 10) return 'timer-warning';
    return '';
  };

  return (
    <div className={`quiz-timer ${getTimerClass()}`}>
      <div className="timer-circle">
        <svg viewBox="0 0 36 36" className="timer-svg">
          <path
            className="timer-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="timer-progress"
            strokeDasharray={`${percentage}, 100`}
            style={{ stroke: getTimerColor() }}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="timer-text" style={{ color: getTimerColor() }}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default QuizTimer;
