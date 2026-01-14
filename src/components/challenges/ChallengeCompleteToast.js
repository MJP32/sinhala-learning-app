import React, { useEffect } from 'react';
import { useChallenges } from '../../context/ChallengesContext';
import './Challenges.css';

const ChallengeCompleteToast = () => {
  const { showChallengeComplete, dismissChallengeComplete } = useChallenges();

  useEffect(() => {
    if (showChallengeComplete) {
      const timer = setTimeout(() => {
        dismissChallengeComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showChallengeComplete, dismissChallengeComplete]);

  if (!showChallengeComplete) return null;

  return (
    <div className="challenge-complete-toast">
      <span className="toast-icon">🎯</span>
      <div className="toast-content">
        <h4>Challenge Complete!</h4>
        <p>{showChallengeComplete.title}</p>
      </div>
      <button className="toast-close" onClick={dismissChallengeComplete}>
        ×
      </button>
    </div>
  );
};

export default ChallengeCompleteToast;
