import React, { useState } from "react";

const Quiz = ({ questions, gradeKey }) => {
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

    return (
      <div className="quiz-container">
        <div className="quiz-question">
          Quiz Complete! Your score: {score}/{questions.length} ({percentage}%)
        </div>
        <div
          className="quiz-result correct"
          style={{
            background: "linear-gradient(135deg, #00534e 0%, #ffbe29 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          🎊 {gradeLevel} 🎊
          <br />
          {percentage >= 70
            ? `Great work! You're ready for the next challenge!`
            : `Keep practicing to improve your Sinhala skills!`}
        </div>
        <button
          className="nav-btn"
          onClick={restartQuiz}
          style={{ marginTop: "20px" }}
        >
          Restart Quiz
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
