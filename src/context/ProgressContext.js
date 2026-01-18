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
  const [unlockedGrades, setUnlockedGrades] = useState([1]); // Grade 1 is always unlocked
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load progress from Firebase when user logs in
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        // Guest users - load from localStorage
        if (user.isGuest) {
          const savedProgress = localStorage.getItem('sinhala-progress-guest');
          const savedGrades = localStorage.getItem('sinhala-unlocked-guest');
          console.log('Loading guest progress from localStorage:', savedProgress);

          if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            console.log('Parsed progress:', parsed);
            setCompletedSections(parsed);
          } else {
            console.log('No saved progress found for guest');
            setCompletedSections({});
          }

          if (savedGrades) {
            setUnlockedGrades(JSON.parse(savedGrades));
          } else {
            setUnlockedGrades([1, 2, 3, 4, 5, 6]); // Guest users have all grades unlocked by default
          }

          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        // Always try localStorage first for immediate loading
        const localProgress = localStorage.getItem(`sinhala-progress-${user.uid}`);
        const localGrades = localStorage.getItem(`sinhala-unlocked-${user.uid}`);

        if (localProgress) {
          console.log('Loading from localStorage:', localProgress);
          setCompletedSections(JSON.parse(localProgress));
        }
        if (localGrades) {
          setUnlockedGrades(JSON.parse(localGrades));
        }

        // Then try Firebase to sync (will update if newer data exists)
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.progress && Object.keys(data.progress).length > 0) {
              console.log('Loading from Firebase:', data.progress);
              setCompletedSections(data.progress);
              // Also update localStorage with Firebase data
              localStorage.setItem(`sinhala-progress-${user.uid}`, JSON.stringify(data.progress));
            }
            if (data.unlockedGrades && data.unlockedGrades.length > 0) {
              setUnlockedGrades(data.unlockedGrades);
              localStorage.setItem(`sinhala-unlocked-${user.uid}`, JSON.stringify(data.unlockedGrades));
            }
          } else if (!localProgress) {
            // No saved progress anywhere, start fresh
            setCompletedSections({});
            setUnlockedGrades([1]);
          }
        } catch (error) {
          // Silently handle offline errors - already loaded from localStorage above
          if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
            console.warn('Error loading from Firebase (using localStorage fallback)');
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // User logged out, clear progress
        setCompletedSections({});
        setUnlockedGrades([1]);
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save progress to Firebase whenever it changes
  const saveProgress = useCallback(async (newProgress) => {
    console.log('saveProgress called, user:', user, 'newProgress:', newProgress);
    if (user) {
      // Guest users - save to localStorage only
      if (user.isGuest) {
        console.log('Saving guest progress to localStorage:', newProgress);
        localStorage.setItem('sinhala-progress-guest', JSON.stringify(newProgress));
        return;
      }

      // Registered users - save to localStorage first (always works), then try Firebase
      localStorage.setItem(`sinhala-progress-${user.uid}`, JSON.stringify(newProgress));
      console.log('Saved to localStorage for user:', user.uid);

      // Then try Firebase (non-blocking)
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { progress: newProgress }, { merge: true });
        console.log('Saved to Firebase successfully');
      } catch (error) {
        // Silently handle offline errors - localStorage backup already saved
        if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
          console.warn('Error saving to Firebase (localStorage backup exists)');
        }
      }
    }
  }, [user]);

  // Save unlocked grades to Firebase
  const saveUnlockedGrades = useCallback(async (grades) => {
    if (user) {
      // Guest users - save to localStorage only
      if (user.isGuest) {
        localStorage.setItem('sinhala-unlocked-guest', JSON.stringify(grades));
        return;
      }

      // Registered users - save to localStorage first (always works), then try Firebase
      localStorage.setItem(`sinhala-unlocked-${user.uid}`, JSON.stringify(grades));

      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { unlockedGrades: grades }, { merge: true });
      } catch (error) {
        // Silently handle offline errors - localStorage backup already saved
        if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
          console.warn('Error saving unlocked grades to Firebase (localStorage backup exists)');
        }
      }
    }
  }, [user]);

  // Check if a grade is unlocked
  const isGradeUnlocked = (gradeNumber) => {
    return unlockedGrades.includes(gradeNumber);
  };

  // Unlock the next grade (called when quiz score >= 80%)
  const unlockNextGrade = useCallback((currentGrade) => {
    const nextGrade = currentGrade + 1;
    if (nextGrade <= 6 && !unlockedGrades.includes(nextGrade)) {
      const newUnlockedGrades = [...unlockedGrades, nextGrade].sort((a, b) => a - b);
      setUnlockedGrades(newUnlockedGrades);
      saveUnlockedGrades(newUnlockedGrades);
      return true; // Successfully unlocked
    }
    return false; // Already unlocked or no next grade
  }, [unlockedGrades, saveUnlockedGrades]);

  // Mark a section as complete/incomplete
  const toggleSectionComplete = (gradeId, sectionId) => {
    console.log('toggleSectionComplete called:', gradeId, sectionId);
    setCompletedSections(prev => {
      const key = `${gradeId}-${sectionId}`;
      const newState = { ...prev };
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = true;
      }
      console.log('New state after toggle:', newState);
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
      if (user.isGuest) {
        // Guest users - reset localStorage and keep all grades unlocked
        setUnlockedGrades([1, 2, 3, 4, 5, 6]);
        localStorage.removeItem('sinhala-progress-guest');
        localStorage.setItem('sinhala-unlocked-guest', JSON.stringify([1, 2, 3, 4, 5, 6]));
      } else {
        // Registered users - reset Firebase and localStorage
        setUnlockedGrades([1]);
        try {
          const docRef = doc(db, 'users', user.uid);
          await setDoc(docRef, { progress: {}, unlockedGrades: [1] }, { merge: true });
          localStorage.removeItem(`sinhala-progress-${user.uid}`);
          localStorage.removeItem(`sinhala-unlocked-${user.uid}`);
        } catch (error) {
          // Silently handle offline errors
          if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
            console.warn('Error resetting progress in Firebase');
          }
          // Still clear localStorage
          localStorage.removeItem(`sinhala-progress-${user.uid}`);
          localStorage.removeItem(`sinhala-unlocked-${user.uid}`);
        }
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
    isLoading,
    unlockedGrades,
    isGradeUnlocked,
    unlockNextGrade
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
