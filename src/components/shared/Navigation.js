import React from "react";

const Navigation = ({ sections, currentSection, onSectionChange }) => {
  return (
    <nav className="navigation">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`nav-btn ${currentSection === section.id ? "active" : ""}`}
          onClick={() => onSectionChange(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
