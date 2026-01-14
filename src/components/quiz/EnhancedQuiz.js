import React, { useState, useEffect, useCallback } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useAnalytics } from '../../context/AnalyticsContext';
import { useProgress } from '../../context/ProgressContext';
import { celebrateQuizComplete } from '../gamification/ConfettiCelebration';
import QuizTimer from './QuizTimer';
import QuizHint from './QuizHint';
import QuizExplanation from './QuizExplanation';
import QuizDifficultySelector from './QuizDifficultySelector';
import './Quiz.css';

const EnhancedQuiz = ({
  questions,
  gradeKey,
  onComplete,
  sectionId = 'quiz'
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);

  // Settings
  const [showSettings, setShowSettings] = useState(true);
  const [difficulty, setDifficulty] = useState('all');
  const [timedMode, setTimedMode] = useState(false);
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

  // Hint state
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  // Filtered questions
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const { addXP, checkAchievements, getStats } = useGamification();
  const { recordQuizResult } = useAnalytics();
  const { completedSections } = useProgress();

  // Filter questions by difficulty
  useEffect(() => {
    if (difficulty === 'all') {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(q => q.difficulty === difficulty);
      setFilteredQuestions(filtered.length > 0 ? filtered : questions);
    }
  }, [questions, difficulty]);

  // Start quiz
  const startQuiz = () => {
    setShowSettings(false);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
  };

  // Handle time up for current question
  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null) {
      // Auto-select wrong answer when time runs out
      handleAnswer(-1); // -1 indicates timeout
    }
  }, [selectedAnswer]);

  // Handle answer selection
  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    const question = filteredQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    const timeSpent = Date.now() - questionStartTime;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Calculate points with hint penalty
    let pointsEarned = 0;
    if (isCorrect) {
      pointsEarned = 5; // Base points per correct answer
      if (currentHintLevel > 0) {
        pointsEarned = Math.max(1, pointsEarned - currentHintLevel); // Reduce points for hints
      }
      setScore(prev => prev + pointsEarned);
    }

    setAnswers(prev => [...prev, {
      questionIndex: currentQuestion,
      selected: answerIndex,
      correct: question.correct,
      isCorrect,
      timeSpent,
      hintsUsed: currentHintLevel
    }]);
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentHintLevel(0);
      setEliminatedOptions([]);
      setQuestionStartTime(Date.now());
    } else {
      finishQuiz();
    }
  };

  // Finish quiz
  const finishQuiz = () => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const correctAnswers = answers.filter(a => a.isCorrect).length + (selectedAnswer === filteredQuestions[currentQuestion]?.correct ? 1 : 0);
    const finalScore = Math.round((correctAnswers / filteredQuestions.length) * 100);

    // Award XP based on score
    let xpEarned = 0;
    if (finalScore === 100) {
      xpEarned = 100;
    } else if (finalScore >= 80) {
      xpEarned = 50;
    } else if (finalScore >= 60) {
      xpEarned = 25;
    } else {
      xpEarned = 10;
    }

    // Bonus XP for timed mode
    if (timedMode && finalScore >= 70) {
      xpEarned += 20;
    }

    // Bonus XP for no hints
    if (hintsUsed === 0 && finalScore >= 70) {
      xpEarned += 15;
    }

    addXP(xpEarned, 'quiz');

    // Record analytics
    recordQuizResult(gradeKey, finalScore, difficulty, totalTime);

    // Check achievements
    const stats = getStats(completedSections, [{ score: finalScore }]);
    checkAchievements({
      ...stats,
      quizzesCompleted: stats.quizzesCompleted + 1,
      perfectQuizzes: finalScore === 100 ? stats.perfectQuizzes + 1 : stats.perfectQuizzes
    });

    // Celebrate
    celebrateQuizComplete(finalScore);

    setQuizComplete(true);

    if (onComplete) {
      onComplete({
        score: finalScore,
        totalTime,
        correctAnswers,
        totalQuestions: filteredQuestions.length,
        xpEarned,
        hintsUsed,
        difficulty,
        timedMode
      });
    }
  };

  // Use hint
  const useHint = (hintType) => {
    if (currentHintLevel >= 2) return;

    setHintsUsed(prev => prev + 1);
    setCurrentHintLevel(prev => prev + 1);

    const question = filteredQuestions[currentQuestion];

    if (hintType === 'eliminate') {
      // Eliminate one wrong option
      const wrongOptions = question.options
        .map((_, i) => i)
        .filter(i => i !== question.correct && !eliminatedOptions.includes(i));

      if (wrongOptions.length > 0) {
        const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        setEliminatedOptions(prev => [...prev, randomWrong]);
      }
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
    setHintsUsed(0);
    setCurrentHintLevel(0);
    setEliminatedOptions([]);
    setShowSettings(true);
  };

  // Settings screen
  if (showSettings) {
    return (
      <div className="enhanced-quiz-settings">
        <h3>Quiz Settings / ප්‍රශ්නාවලි සැකසුම්</h3>

        <QuizDifficultySelector
          difficulty={difficulty}
          onChange={setDifficulty}
          questionCounts={{
            easy: questions.filter(q => q.difficulty === 'easy').length,
            medium: questions.filter(q => q.difficulty === 'medium').length,
            hard: questions.filter(q => q.difficulty === 'hard').length,
            all: questions.length
          }}
        />

        <div className="quiz-setting">
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={timedMode}
              onChange={(e) => setTimedMode(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">
              Timed Mode (+20 XP bonus)
              <span className="toggle-label-si">කාල සීමාව</span>
            </span>
          </label>
          {timedMode && (
            <div className="time-selector">
              <label>Seconds per question:</label>
              <select value={timePerQuestion} onChange={(e) => setTimePerQuestion(Number(e.target.value))}>
                <option value={15}>15s (Hard)</option>
                <option value={30}>30s (Normal)</option>
                <option value={45}>45s (Easy)</option>
                <option value={60}>60s (Relaxed)</option>
              </select>
            </div>
          )}
        </div>

        <div className="quiz-setting">
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={hintsEnabled}
              onChange={(e) => setHintsEnabled(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">
              Enable Hints
              <span className="toggle-label-si">ඉඟි සබල කරන්න</span>
            </span>
          </label>
        </div>

        <div className="quiz-setting">
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={showExplanations}
              onChange={(e) => setShowExplanations(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">
              Show Explanations
              <span className="toggle-label-si">පැහැදිලි කිරීම් පෙන්වන්න</span>
            </span>
          </label>
        </div>

        <div className="quiz-info">
          <p>{filteredQuestions.length} questions</p>
          {!hintsEnabled && <p className="bonus-info">+15 XP bonus for no hints!</p>}
        </div>

        <button className="start-quiz-btn" onClick={startQuiz}>
          Start Quiz / ප්‍රශ්නාවලිය ආරම්භ කරන්න
        </button>
      </div>
    );
  }

  // Quiz complete screen
  if (quizComplete) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const finalScore = Math.round((correctAnswers / filteredQuestions.length) * 100);

    return (
      <div className="quiz-complete">
        <div className="quiz-complete-header">
          <h3>Quiz Complete! / ප්‍රශ්නාවලිය අවසන්!</h3>
        </div>

        <div className="quiz-score-display">
          <div className="score-circle">
            <span className="score-number">{finalScore}%</span>
          </div>
          <p className="score-text">
            {correctAnswers} / {filteredQuestions.length} correct
          </p>
        </div>

        <div className="quiz-feedback">
          {finalScore === 100 && (
            <p className="feedback perfect">Perfect Score! Excellent! / පරිපූර්ණ ලකුණු! විශිෂ්ටයි!</p>
          )}
          {finalScore >= 80 && finalScore < 100 && (
            <p className="feedback great">Great job! / හොඳ වැඩක්!</p>
          )}
          {finalScore >= 60 && finalScore < 80 && (
            <p className="feedback good">Good effort! Keep practicing! / හොඳ උත්සාහයක්!</p>
          )}
          {finalScore < 60 && (
            <p className="feedback retry">Keep learning! You'll improve! / ඉගෙනීම දිගටම කරන්න!</p>
          )}
        </div>

        <div className="quiz-stats">
          {timedMode && <span className="stat-badge">Timed Mode</span>}
          {hintsUsed === 0 && <span className="stat-badge">No Hints Used!</span>}
          <span className="stat-badge">{difficulty} difficulty</span>
        </div>

        <button className="restart-btn" onClick={restartQuiz}>
          Try Again / නැවත උත්සාහ කරන්න
        </button>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];

  return (
    <div className="enhanced-quiz">
      <div className="quiz-header">
        <span className="quiz-progress">
          Question {currentQuestion + 1} / {filteredQuestions.length}
        </span>
        <span className="quiz-score">Score: {score}</span>
        {timedMode && !showResult && (
          <QuizTimer
            seconds={timePerQuestion}
            onTimeUp={handleTimeUp}
            isPaused={showResult}
            key={currentQuestion}
          />
        )}
      </div>

      <div className="quiz-question">
        <h4>{question.question}</h4>
        {question.questionSinhala && (
          <p className="question-sinhala">{question.questionSinhala}</p>
        )}
      </div>

      <div className="quiz-options">
        {question.options.map((option, index) => {
          const isEliminated = eliminatedOptions.includes(index);
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correct;

          let optionClass = 'quiz-option';
          if (showResult) {
            if (isCorrect) optionClass += ' correct';
            else if (isSelected && !isCorrect) optionClass += ' incorrect';
          }
          if (isEliminated) optionClass += ' eliminated';

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => !isEliminated && handleAnswer(index)}
              disabled={showResult || isEliminated}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {showResult && isCorrect && <span className="option-icon">✓</span>}
              {showResult && isSelected && !isCorrect && <span className="option-icon">✗</span>}
            </button>
          );
        })}
      </div>

      {hintsEnabled && !showResult && (
        <QuizHint
          onUseHint={useHint}
          hintsUsed={currentHintLevel}
          maxHints={2}
          disabled={showResult}
        />
      )}

      {showResult && showExplanations && question.explanation && (
        <QuizExplanation
          explanation={question.explanation}
          explanationSinhala={question.explanationSinhala}
          isCorrect={selectedAnswer === question.correct}
        />
      )}

      {showResult && (
        <button className="next-btn" onClick={nextQuestion}>
          {currentQuestion < filteredQuestions.length - 1
            ? 'Next Question / ඊළඟ ප්‍රශ්නය'
            : 'See Results / ප්‍රතිඵල බලන්න'}
        </button>
      )}
    </div>
  );
};

export default EnhancedQuiz;
