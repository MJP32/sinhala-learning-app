import React from "react";
import { useProgress } from "../../context/ProgressContext";

const Navigation = ({ sections, currentSection, onSectionChange, gradeId }) => {
  const { isSectionComplete, toggleSectionComplete } = useProgress();

  return (
    <nav className="navigation">
      {sections.map((section) => {
        const isComplete = isSectionComplete(gradeId, section.id);
        return (
          <div key={section.id} className="nav-item-wrapper">
            <button
              className={`nav-btn ${currentSection === section.id ? "active" : ""} ${isComplete ? "completed" : ""}`}
              onClick={() => onSectionChange(section.id)}
            >
              {isComplete && <span className="check-mark">✓</span>}
              {section.label}
            </button>
            <button
              className={`mark-complete-btn ${isComplete ? "is-complete" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSectionComplete(gradeId, section.id);
              }}
              title={isComplete ? "Mark as incomplete" : "Mark as complete"}
            >
              {isComplete ? "✓" : "○"}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
