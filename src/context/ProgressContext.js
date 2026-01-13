import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Initialize from localStorage or default
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('sinhala-learning-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [showProgressModal, setShowProgressModal] = useState(false);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('sinhala-learning-progress', JSON.stringify(completedSections));
  }, [completedSections]);

  // Mark a section as complete/incomplete
  const toggleSectionComplete = (gradeId, sectionId) => {
    setCompletedSections(prev => {
      const key = `${gradeId}-${sectionId}`;
      const newState = { ...prev };
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = true;
      }
      return newState;
    });
  };

  // Check if a section is complete
  const isSectionComplete = (gradeId, sectionId) => {
    return !!completedSections[`${gradeId}-${sectionId}`];
  };

  // Get progress for a specific grade
  const getGradeProgress = (gradeId, totalSections) => {
    const completedCount = Object.keys(completedSections)
      .filter(key => key.startsWith(`${gradeId}-`))
      .length;
    return Math.round((completedCount / totalSections) * 100);
  };

  // Get overall progress
  const getOverallProgress = () => {
    const gradeData = {
      g1: 11, // Grade 1 has 11 sections
      g2: 11, // Grade 2 has 11 sections
      g3: 11, // Grade 3 has 11 sections
      g4: 11, // Grade 4 has 11 sections
      g5: 11, // Grade 5 has 11 sections
      g6: 11, // Grade 6 has 11 sections
    };

    const totalSections = Object.values(gradeData).reduce((a, b) => a + b, 0);
    const completedCount = Object.keys(completedSections).length;

    return {
      completed: completedCount,
      total: totalSections,
      percentage: Math.round((completedCount / totalSections) * 100)
    };
  };

  // Get detailed progress by grade
  const getDetailedProgress = () => {
    const grades = [
      { id: 'g1', name: 'Grade 1', sections: 11 },
      { id: 'g2', name: 'Grade 2', sections: 11 },
      { id: 'g3', name: 'Grade 3', sections: 11 },
      { id: 'g4', name: 'Grade 4', sections: 11 },
      { id: 'g5', name: 'Grade 5', sections: 11 },
      { id: 'g6', name: 'Grade 6', sections: 11 },
    ];

    return grades.map(grade => ({
      ...grade,
      completed: Object.keys(completedSections)
        .filter(key => key.startsWith(`${grade.id}-`))
        .length,
      percentage: getGradeProgress(grade.id, grade.sections)
    }));
  };

  // Reset all progress
  const resetProgress = () => {
    setCompletedSections({});
    localStorage.removeItem('sinhala-learning-progress');
  };

  const value = {
    completedSections,
    toggleSectionComplete,
    isSectionComplete,
    getGradeProgress,
    getOverallProgress,
    getDetailedProgress,
    resetProgress,
    showProgressModal,
    setShowProgressModal
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
