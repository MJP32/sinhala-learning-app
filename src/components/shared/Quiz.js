import React, { useState } from "react";
import { useChallenges } from "../../context/ChallengesContext";
import { useProgress } from "../../context/ProgressContext";

const Quiz = ({ questions, gradeKey, gradeNumber }) => {
  const { trackQuizComplete } = useChallenges();
  const { unlockNextGrade } = useProgress();
  const [gradeUnlocked, setGradeUnlocked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex, isCorrect) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Track quiz completion (score already updated in handleAnswerSelect)
      const percentage = Math.round((score / questions.length) * 100);
      trackQuizComplete(percentage);

      // Unlock next grade if score >= 80%
      if (percentage >= 80 && gradeNumber && gradeNumber < 6) {
        const wasUnlocked = unlockNextGrade(gradeNumber);
        setGradeUnlocked(wasUnlocked);
      }

      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let gradeLevel = "";
    if (percentage >= 90) gradeLevel = "Excellent! 🌟";
    else if (percentage >= 80) gradeLevel = "Very Good! 👏";
    else if (percentage >= 70) gradeLevel = "Good! 👍";
    else if (percentage >= 60) gradeLevel = "Keep Practicing! 📚";
    else gradeLevel = "Need More Practice! 💪";

    const passedQuiz = percentage >= 80;

    return (
      <div className="quiz-container">
        <div className="quiz-question">
          Quiz Complete! Your score: {score}/{questions.length} ({percentage}%)
        </div>
        <div
          className="quiz-result correct"
          style={{
            background: passedQuiz
              ? "linear-gradient(135deg, #00534e 0%, #ffbe29 100%)"
              : "linear-gradient(135deg, #666 0%, #444 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          🎊 {gradeLevel} 🎊
          <br />
          {passedQuiz
            ? gradeUnlocked
              ? `🔓 Grade ${gradeNumber + 1} Unlocked! You can now proceed to the next grade!`
              : `Great work! You've mastered this grade!`
            : `You need 80% or higher to unlock the next grade. Keep practicing!`}
        </div>
        {!passedQuiz && (
          <div style={{
            background: "#fff3cd",
            color: "#856404",
            padding: "12px 16px",
            borderRadius: "8px",
            marginTop: "12px",
            fontSize: "0.9rem"
          }}>
            💡 Tip: Review the lessons and try again to unlock Grade {gradeNumber + 1}
          </div>
        )}
        <button
          className="nav-btn"
          onClick={restartQuiz}
          style={{ marginTop: "20px" }}
        >
          {passedQuiz ? "Practice Again" : "Try Again"}
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-question">
        Question {currentQuestion + 1}/{questions.length}: {question.question}
      </div>
      <div className="quiz-options">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`quiz-option ${
              selectedAnswer !== null
                ? index === question.correct
                  ? "correct"
                  : selectedAnswer === index
                  ? "incorrect"
                  : ""
                : ""
            }`}
            onClick={() =>
              selectedAnswer === null &&
              handleAnswerSelect(index, index === question.correct)
            }
            style={{
              pointerEvents: selectedAnswer !== null ? "none" : "auto",
            }}
          >
            {option}
          </div>
        ))}
      </div>
      {showResult && (
        <>
          <div
            className={`quiz-result ${
              selectedAnswer === question.correct ? "correct" : "incorrect"
            }`}
          >
            {selectedAnswer === question.correct
              ? "Correct! Well done! 🎉"
              : "Incorrect. The correct answer is highlighted above. 🤔"}
          </div>
          <button
            className="nav-btn"
            onClick={handleNextQuestion}
            style={{ marginTop: "20px" }}
          >
            {currentQuestion + 1 < questions.length
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
