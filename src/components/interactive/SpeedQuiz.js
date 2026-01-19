import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useChallenges } from '../../context/ChallengesContext';
import { celebrateGameWin } from '../gamification/ConfettiCelebration';
import './Interactive.css';

const SpeedQuiz = ({
  questions, // Array of { question, options: [], correct: number, questionSi }
  title,
  titleSinhala,
  onComplete,
  gradeKey,
  timeLimit = 60 // Total time in seconds
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(3);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

  const timerRef = useRef(null);
  const questionTimerRef = useRef(null);

  const { addXP } = useGamification();
  const { trackGameComplete, trackQuizComplete } = useChallenges();

  // Shuffle questions
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
  }, [questions]);

  // Main game timer
  useEffect(() => {
    if (!isStarted || isComplete) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted, isComplete]);

  // Per-question timer
  useEffect(() => {
    if (!isStarted || isComplete || showResult) return;

    setQuestionTimeLeft(3);

    questionTimerRef.current = setInterval(() => {
      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(questionTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, isStarted, isComplete, showResult]);

  const handleTimeout = useCallback(() => {
    clearInterval(questionTimerRef.current);
    setStreak(0);
    setMultiplier(1);
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);

    setTimeout(() => {
      nextQuestion();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = useCallback((answerIndex) => {
    if (showResult) return;

    clearInterval(questionTimerRef.current);
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);

    const question = shuffledQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
      const basePoints = 10;
      const timeBonus = questionTimeLeft;
      const streakBonus = streak >= 3 ? streak : 0;
      const pointsEarned = Math.round((basePoints + timeBonus + streakBonus) * multiplier);

      setScore(prev => prev + pointsEarned);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });

      // Increase multiplier at certain streak thresholds
      if ((streak + 1) % 5 === 0) {
        setMultiplier(prev => Math.min(prev + 0.5, 3));
      }
    } else {
      setStreak(0);
      setMultiplier(1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult, currentQuestion, shuffledQuestions, questionTimeLeft, streak, multiplier]);

  const nextQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setShowResult(false);

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Loop back to beginning if time remains
      setCurrentQuestion(0);
      setShuffledQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion, shuffledQuestions.length]);

  const startGame = () => {
    setIsStarted(true);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(timeLimit);
    setCurrentQuestion(0);
    setQuestionsAnswered(0);
    setMultiplier(1);
  };

  const finishGame = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(questionTimerRef.current);

    // Calculate XP
    let xpEarned = Math.round(score / 5);
    if (maxStreak >= 10) xpEarned += 30; // Long streak bonus
    else if (maxStreak >= 5) xpEarned += 15;

    addXP(xpEarned, 'game');
    trackGameComplete();

    // Also track as quiz if enough questions answered
    if (questionsAnswered >= 5) {
      const accuracy = Math.round((score / (questionsAnswered * 10)) * 100);
      trackQuizComplete(Math.min(accuracy, 100));
    }

    celebrateGameWin();
    setIsComplete(true);
  }, [score, maxStreak, questionsAnswered, addXP, trackGameComplete, trackQuizComplete]);

  const restartGame = () => {
    setIsComplete(false);
    setIsStarted(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(timeLimit);
    setCurrentQuestion(0);
    setQuestionsAnswered(0);
    setMultiplier(1);
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
  };

  if (!isStarted) {
    return (
      <div className="speed-quiz-start">
        <div className="game-title">
          <h3>{title}</h3>
          {titleSinhala && <span className="game-title-si">{titleSinhala}</span>}
        </div>

        <div className="speed-quiz-intro">
          <div className="intro-icon">
            <span>&#9201;</span>
          </div>
          <h4>Speed Quiz Challenge!</h4>
          <p className="intro-text">Answer as many questions as possible in {timeLimit} seconds!</p>
          <p className="intro-text-si">{timeLimit} තත්පර තුළ හැකි තරම් ප්‍රශ්නවලට පිළිතුරු දෙන්න!</p>

          <div className="speed-rules">
            <div className="rule">
              <span className="rule-icon">&#9889;</span>
              <span>3 seconds per question</span>
            </div>
            <div className="rule">
              <span className="rule-icon">&#128293;</span>
              <span>Build streaks for multipliers</span>
            </div>
            <div className="rule">
              <span className="rule-icon">&#9733;</span>
              <span>Fast answers = bonus points</span>
            </div>
          </div>

          <button className="start-speed-btn" onClick={startGame}>
            Start! / පටන් ගන්න!
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="game-complete">
        <h3>Speed Quiz Complete! / වේග ප්‍රශ්නාවලිය අවසන්!</h3>

        <div className="game-results">
          <div className="result-item highlight">
            <span className="result-number">{score}</span>
            <span className="result-label">Final Score</span>
          </div>
          <div className="result-item">
            <span className="result-number">{questionsAnswered}</span>
            <span className="result-label">Questions</span>
          </div>
          <div className="result-item">
            <span className="result-number">{maxStreak}</span>
            <span className="result-label">Best Streak</span>
          </div>
        </div>

        {maxStreak >= 10 && (
          <p className="game-feedback perfect">Incredible streak! / අදහාගත නොහැකි ධාරාව!</p>
        )}
        {score >= 200 && (
          <p className="game-feedback perfect">Speed master! / වේග ස්වාමියා!</p>
        )}

        <button className="restart-game-btn" onClick={restartGame}>
          Play Again / නැවත සෙල්ලම් කරන්න
        </button>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  if (!question) return null;

  return (
    <div className="speed-quiz">
      <div className="speed-header">
        <div className="speed-timer">
          <div className="timer-circle" style={{ '--progress': (timeLeft / timeLimit) * 100 }}>
            <span>{timeLeft}</span>
          </div>
        </div>
        <div className="speed-score">
          <span className="score-value">{score}</span>
          <span className="score-label">Score</span>
        </div>
        <div className="speed-streak">
          {streak > 0 && (
            <>
              <span className="streak-fire">&#128293;</span>
              <span className="streak-value">{streak}</span>
            </>
          )}
          {multiplier > 1 && (
            <span className="multiplier">x{multiplier}</span>
          )}
        </div>
      </div>

      <div className="question-timer-bar">
        <div
          className="question-timer-fill"
          style={{ width: `${(questionTimeLeft / 3) * 100}%` }}
        />
      </div>

      <div className="speed-question">
        <p className="question-text">{question.question}</p>
        {question.questionSi && (
          <p className="question-text-si">{question.questionSi}</p>
        )}
      </div>

      <div className="speed-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`speed-option ${
              showResult
                ? index === question.correct
                  ? 'correct'
                  : selectedAnswer === index
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedQuiz;
