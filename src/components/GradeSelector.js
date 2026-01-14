import React, { useState, useEffect, useRef, useCallback } from "react";
import { useProgress } from "../context/ProgressContext";
import { GRADE_SECTIONS } from "../config/gradeSections";

const GradeSelector = ({ currentGrade, onGradeChange, onSectionChange }) => {
  const { isGradeUnlocked, isSectionComplete, toggleSectionComplete } = useProgress();
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [lockedMessage, setLockedMessage] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dropdownRef = useRef(null);
  const itemRefs = useRef([]);
  const grades = [1, 2, 3, 4, 5, 6];

  // Build flat list of all navigable items
  const getNavigableItems = useCallback(() => {
    const items = [];
    grades.forEach((grade) => {
      const unlocked = isGradeUnlocked(grade);
      items.push({ type: 'grade', grade, unlocked });

      if (expandedGrade === grade && unlocked) {
        const gradeInfo = GRADE_SECTIONS[grade];
        if (gradeInfo) {
          gradeInfo.sections.forEach((section) => {
            items.push({ type: 'section', grade, section, gradeId: gradeInfo.id });
          });
        }
      }
    });
    return items;
  }, [expandedGrade, isGradeUnlocked]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpandedGrade(null);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the index of a grade in the navigable items
  const findGradeIndex = useCallback((gradeNumber) => {
    const items = getNavigableItems();
    return items.findIndex(item => item.type === 'grade' && item.grade === gradeNumber);
  }, [getNavigableItems]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    const items = getNavigableItems();
    const maxIndex = items.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (focusedIndex < 0) {
          // Start from first item if nothing focused
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => {
            const next = prev < maxIndex ? prev + 1 : 0;
            return next;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (focusedIndex < 0) {
          // Start from last item if nothing focused
          setFocusedIndex(maxIndex);
        } else {
          setFocusedIndex((prev) => {
            const next = prev > 0 ? prev - 1 : maxIndex;
            return next;
          });
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          const item = items[focusedIndex];
          if (item.type === 'grade') {
            handleGradeClick(item.grade);
          } else if (item.type === 'section') {
            handleSectionClick(item.grade, item.section.id);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (expandedGrade !== null) {
          // Find the index of the expanded grade and focus it
          const gradeIndex = findGradeIndex(expandedGrade);
          setExpandedGrade(null);
          // After closing, focus will be on the grade header
          if (gradeIndex >= 0) {
            setFocusedIndex(gradeIndex);
          }
        } else if (focusedIndex >= 0) {
          // If sections already closed, focus first grade
          setFocusedIndex(0);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          const item = items[focusedIndex];
          if (item.type === 'grade' && item.unlocked && expandedGrade !== item.grade) {
            handleGradeClick(item.grade);
          }
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (expandedGrade !== null) {
          const gradeIndex = findGradeIndex(expandedGrade);
          setExpandedGrade(null);
          if (gradeIndex >= 0) {
            setFocusedIndex(gradeIndex);
          }
        }
        break;
      default:
        break;
    }
  }, [focusedIndex, getNavigableItems, expandedGrade, findGradeIndex]);

  // Focus the current item when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleGradeClick = (grade) => {
    if (isGradeUnlocked(grade)) {
      // Toggle dropdown for this grade
      if (expandedGrade === grade) {
        setExpandedGrade(null);
      } else {
        setExpandedGrade(grade);
        // Also set this as the current grade
        if (currentGrade !== grade) {
          onGradeChange(grade);
        }
      }
      setLockedMessage(null);
    } else {
      // Show locked message
      setLockedMessage({
        grade,
        prevGrade: grade - 1
      });
      setTimeout(() => setLockedMessage(null), 4000);
    }
  };

  const handleSectionClick = (gradeNumber, sectionId) => {
    // Navigate to the section
    if (onSectionChange) {
      onSectionChange(gradeNumber, sectionId);
    }
    // Keep menu open after selection
  };

  const handleCheckboxClick = (e, gradeId, sectionId) => {
    e.stopPropagation(); // Prevent triggering section navigation
    toggleSectionComplete(gradeId, sectionId);
  };

  const getCompletedCount = (gradeNumber) => {
    const gradeInfo = GRADE_SECTIONS[gradeNumber];
    if (!gradeInfo) return 0;
    return gradeInfo.sections.filter(s =>
      isSectionComplete(gradeInfo.id, s.id)
    ).length;
  };

  // Track ref index for keyboard navigation
  let refIndex = 0;

  return (
    <div
      className={`grade-selector ${isCollapsed ? 'collapsed' : ''}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="navigation"
      aria-label="Grade selector"
    >
      <button
        className="grade-collapse-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? "Expand grade selector" : "Collapse grade selector"}
      >
        <span className="collapse-icon">{isCollapsed ? '▼' : '▲'}</span>
        <span className="collapse-label">
          {isCollapsed ? `Grade ${currentGrade}` : 'Grades'}
        </span>
      </button>
      <div className="grade-list" role="tree">
        {grades.map((grade) => {
          const unlocked = isGradeUnlocked(grade);
          const gradeInfo = GRADE_SECTIONS[grade];
          const completedCount = unlocked ? getCompletedCount(grade) : 0;
          const totalSections = gradeInfo?.sections?.length || 11;
          const isExpanded = expandedGrade === grade;
          const gradeRefIndex = refIndex++;

          return (
            <div key={grade} className="grade-item" role="treeitem" aria-expanded={isExpanded}>
              {/* Grade Header */}
              <button
                ref={(el) => (itemRefs.current[gradeRefIndex] = el)}
                className={`grade-header ${currentGrade === grade ? "active" : ""} ${!unlocked ? "locked" : ""} ${isExpanded ? "expanded" : ""} ${focusedIndex === gradeRefIndex ? "focused" : ""}`}
                onClick={() => handleGradeClick(grade)}
                onFocus={() => setFocusedIndex(gradeRefIndex)}
                title={unlocked ? `Grade ${grade} - ${completedCount}/${totalSections} completed` : `Complete Grade ${grade - 1} quiz with 80%+ to unlock`}
                aria-label={`Grade ${grade}${unlocked ? `, ${completedCount} of ${totalSections} completed` : ', locked'}`}
                tabIndex={0}
              >
                <span className="grade-number">
                  {unlocked ? grade : "🔒"}
                </span>
                <span className="grade-label">Grade {grade}</span>
                {unlocked && (
                  <span className="grade-progress">{completedCount}/{totalSections}</span>
                )}
                {unlocked && (
                  <span className="grade-expand-icon">{isExpanded ? "▼" : "▶"}</span>
                )}
              </button>

              {/* Sections (inline accordion) */}
              {isExpanded && unlocked && gradeInfo && (
                <div className="grade-sections" role="group">
                  {gradeInfo.sections.map((section) => {
                    const gradeId = gradeInfo.id;
                    const isComplete = isSectionComplete(gradeId, section.id);
                    const sectionRefIndex = refIndex++;

                    return (
                      <div
                        key={section.id}
                        ref={(el) => (itemRefs.current[sectionRefIndex] = el)}
                        className={`section-item ${isComplete ? "completed" : ""} ${focusedIndex === sectionRefIndex ? "focused" : ""}`}
                        onClick={() => handleSectionClick(grade, section.id)}
                        onFocus={() => setFocusedIndex(sectionRefIndex)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSectionClick(grade, section.id);
                          }
                        }}
                        tabIndex={0}
                        role="treeitem"
                        aria-label={`${section.label}, ${isComplete ? 'completed' : 'not completed'}`}
                      >
                        <button
                          className={`section-checkbox ${isComplete ? "checked" : ""}`}
                          onClick={(e) => handleCheckboxClick(e, gradeId, section.id)}
                          title={isComplete ? "Mark as incomplete" : "Mark as complete"}
                          tabIndex={-1}
                          aria-label={isComplete ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {isComplete ? "✓" : ""}
                        </button>
                        <div className="section-info">
                          <span className="section-label">{section.label}</span>
                          <span className="section-label-si">{section.labelSi}</span>
                        </div>
                        <span className="section-arrow">→</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Locked Grade Message */}
      {lockedMessage && (
        <div className="locked-message" role="alert">
          <div className="locked-message-content">
            <span className="locked-icon">🔒</span>
            <div className="locked-text">
              <strong>Grade {lockedMessage.grade} is Locked</strong>
              <p>Complete the Grade {lockedMessage.prevGrade} quiz with 80% or higher to unlock this grade.</p>
            </div>
            <button
              className="locked-close"
              onClick={() => setLockedMessage(null)}
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeSelector;
