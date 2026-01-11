import React from "react";

const GradeSelector = ({ currentGrade, onGradeChange }) => {
  const grades = [1, 2, 3, 4];

  return (
    <div className="grade-selector">
      {grades.map((grade) => (
        <button
          key={grade}
          className={`grade-btn ${currentGrade === grade ? "active" : ""}`}
          onClick={() => onGradeChange(grade)}
        >
          Grade {grade}
        </button>
      ))}
    </div>
  );
};

export default GradeSelector;
