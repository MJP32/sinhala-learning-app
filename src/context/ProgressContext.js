import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [completedSections, setCompletedSections] = useState({});
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load progress from Firebase when user logs in
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().progress) {
            setCompletedSections(docSnap.data().progress);
          } else {
            // No saved progress, start fresh
            setCompletedSections({});
          }
        } catch (error) {
          console.error('Error loading progress:', error);
          // Fall back to localStorage if Firebase fails
          const saved = localStorage.getItem(`sinhala-progress-${user.uid}`);
          if (saved) {
            setCompletedSections(JSON.parse(saved));
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // User logged out, clear progress
        setCompletedSections({});
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save progress to Firebase whenever it changes
  const saveProgress = useCallback(async (newProgress) => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { progress: newProgress }, { merge: true });
        // Also save to localStorage as backup
        localStorage.setItem(`sinhala-progress-${user.uid}`, JSON.stringify(newProgress));
      } catch (error) {
        console.error('Error saving progress:', error);
        // Save to localStorage if Firebase fails
        localStorage.setItem(`sinhala-progress-${user.uid}`, JSON.stringify(newProgress));
      }
    }
  }, [user]);

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
      // Save to Firebase
      saveProgress(newState);
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
  const resetProgress = async () => {
    setCompletedSections({});
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { progress: {} }, { merge: true });
        localStorage.removeItem(`sinhala-progress-${user.uid}`);
      } catch (error) {
        console.error('Error resetting progress:', error);
      }
    }
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
    setShowProgressModal,
    isLoading
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
