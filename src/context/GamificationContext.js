import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { ACHIEVEMENTS, checkAchievementCondition } from '../config/achievements';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// XP thresholds for each level
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];
const LEVEL_TITLES = [
  { en: 'Beginner', si: 'ආරම්භකයා' },
  { en: 'Learner', si: 'ඉගෙන්නා' },
  { en: 'Student', si: 'ශිෂ්‍යයා' },
  { en: 'Scholar', si: 'විද්වතා' },
  { en: 'Expert', si: 'විශේෂඥයා' },
  { en: 'Master', si: 'ගුරුවරයා' },
  { en: 'Grand Master', si: 'මහා ගුරුවරයා' },
  { en: 'Champion', si: 'ශූරයා' },
  { en: 'Legend', si: 'පුරාවෘත්තය' },
  { en: 'Sage', si: 'මුනිවරයා' },
];

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastActivityDate, setLastActivityDate] = useState(null);
  const [achievements, setAchievements] = useState({});
  const [pendingAchievements, setPendingAchievements] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Calculate level from XP
  const calculateLevel = (totalXp) => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (totalXp >= LEVEL_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  // Get XP needed for next level
  const getNextLevelXP = () => {
    if (level >= LEVEL_THRESHOLDS.length) {
      return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length + 1) * 1000;
    }
    return LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  };

  // Get current level XP threshold
  const getCurrentLevelXP = () => {
    return LEVEL_THRESHOLDS[level - 1] || 0;
  };

  // Get level title
  const getLevelTitle = (lvl = level) => {
    const index = Math.min(lvl - 1, LEVEL_TITLES.length - 1);
    return LEVEL_TITLES[index] || LEVEL_TITLES[LEVEL_TITLES.length - 1];
  };

  // Load gamification data from Firebase
  useEffect(() => {
    const loadGamification = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().gamification) {
            const data = docSnap.data().gamification;
            setXp(data.xp || 0);
            setLevel(calculateLevel(data.xp || 0));
            setCurrentStreak(data.currentStreak || 0);
            setLongestStreak(data.longestStreak || 0);
            setLastActivityDate(data.lastActivityDate || null);
            setAchievements(data.achievements || {});
          }
        } catch (error) {
          console.error('Error loading gamification:', error);
          // Fall back to localStorage
          const saved = localStorage.getItem(`sinhala-gamification-${user.uid}`);
          if (saved) {
            const data = JSON.parse(saved);
            setXp(data.xp || 0);
            setLevel(calculateLevel(data.xp || 0));
            setCurrentStreak(data.currentStreak || 0);
            setLongestStreak(data.longestStreak || 0);
            setLastActivityDate(data.lastActivityDate || null);
            setAchievements(data.achievements || {});
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setXp(0);
        setLevel(1);
        setCurrentStreak(0);
        setLongestStreak(0);
        setLastActivityDate(null);
        setAchievements({});
        setIsLoading(false);
      }
    };

    loadGamification();
  }, [user]);

  // Save gamification data to Firebase
  const saveGamification = useCallback(async (data) => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { gamification: data }, { merge: true });
        localStorage.setItem(`sinhala-gamification-${user.uid}`, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving gamification:', error);
        localStorage.setItem(`sinhala-gamification-${user.uid}`, JSON.stringify(data));
      }
    }
  }, [user]);

  // Update streak based on last activity
  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];

    if (!lastActivityDate) {
      // First activity ever
      setCurrentStreak(1);
      setLastActivityDate(today);
      return 1;
    }

    const lastDate = new Date(lastActivityDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, no change
      return currentStreak;
    } else if (diffDays === 1) {
      // Consecutive day, increment streak
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setLastActivityDate(today);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
      return newStreak;
    } else {
      // Streak broken, reset to 1
      setCurrentStreak(1);
      setLastActivityDate(today);
      return 1;
    }
  }, [currentStreak, lastActivityDate, longestStreak]);

  // Add XP and handle level up
  const addXP = useCallback((amount, reason = '') => {
    const newXp = xp + amount;
    const newLevel = calculateLevel(newXp);

    setXp(newXp);

    if (newLevel > level) {
      setLevel(newLevel);
      setNewLevel(newLevel);
      setShowLevelUp(true);
    }

    // Update streak
    const streak = updateStreak();

    // Save to Firebase
    const data = {
      xp: newXp,
      level: newLevel,
      currentStreak: streak,
      longestStreak: Math.max(streak, longestStreak),
      lastActivityDate: new Date().toISOString().split('T')[0],
      achievements
    };
    saveGamification(data);

    return { xp: newXp, level: newLevel, xpGained: amount };
  }, [xp, level, longestStreak, achievements, updateStreak, saveGamification]);

  // Check and unlock achievements
  const checkAchievements = useCallback((stats) => {
    const newAchievements = [];

    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (!achievements[achievement.id]) {
        if (checkAchievementCondition(achievement, stats)) {
          newAchievements.push(achievement);
        }
      }
    });

    if (newAchievements.length > 0) {
      const updatedAchievements = { ...achievements };
      newAchievements.forEach(ach => {
        updatedAchievements[ach.id] = {
          unlockedAt: new Date().toISOString(),
          viewed: false
        };
      });

      setAchievements(updatedAchievements);
      setPendingAchievements(prev => [...prev, ...newAchievements]);

      // Award XP for achievements
      const totalAchievementXP = newAchievements.reduce((sum, ach) => sum + (ach.xpReward || 0), 0);
      if (totalAchievementXP > 0) {
        addXP(totalAchievementXP, 'achievement');
      }

      // Save updated achievements
      const data = {
        xp: xp + totalAchievementXP,
        level,
        currentStreak,
        longestStreak,
        lastActivityDate,
        achievements: updatedAchievements
      };
      saveGamification(data);
    }

    return newAchievements;
  }, [achievements, xp, level, currentStreak, longestStreak, lastActivityDate, addXP, saveGamification]);

  // Mark achievement as viewed
  const viewAchievement = (achievementId) => {
    if (achievements[achievementId]) {
      const updated = {
        ...achievements,
        [achievementId]: { ...achievements[achievementId], viewed: true }
      };
      setAchievements(updated);
      saveGamification({
        xp, level, currentStreak, longestStreak, lastActivityDate,
        achievements: updated
      });
    }
  };

  // Dismiss pending achievement
  const dismissPendingAchievement = () => {
    setPendingAchievements(prev => prev.slice(1));
  };

  // Dismiss level up modal
  const dismissLevelUp = () => {
    setShowLevelUp(false);
    setNewLevel(null);
  };

  // Get all achievements with unlock status
  const getAllAchievements = () => {
    return Object.values(ACHIEVEMENTS).map(ach => ({
      ...ach,
      unlocked: !!achievements[ach.id],
      unlockedAt: achievements[ach.id]?.unlockedAt,
      viewed: achievements[ach.id]?.viewed
    }));
  };

  // Get stats for achievement checking
  const getStats = useCallback((completedSections = {}, quizHistory = []) => {
    const completedKeys = Object.keys(completedSections);
    return {
      totalSectionsCompleted: completedKeys.length,
      grade1Completed: completedKeys.filter(k => k.startsWith('g1-')).length >= 11,
      grade2Completed: completedKeys.filter(k => k.startsWith('g2-')).length >= 11,
      grade3Completed: completedKeys.filter(k => k.startsWith('g3-')).length >= 11,
      grade4Completed: completedKeys.filter(k => k.startsWith('g4-')).length >= 11,
      grade5Completed: completedKeys.filter(k => k.startsWith('g5-')).length >= 11,
      grade6Completed: completedKeys.filter(k => k.startsWith('g6-')).length >= 11,
      allGradesCompleted: completedKeys.length >= 66,
      currentStreak,
      longestStreak,
      quizzesCompleted: quizHistory.length,
      perfectQuizzes: quizHistory.filter(q => q.score === 100).length,
      xp,
      level
    };
  }, [currentStreak, longestStreak, xp, level]);

  const value = {
    xp,
    level,
    currentStreak,
    longestStreak,
    achievements,
    pendingAchievements,
    showLevelUp,
    newLevel,
    isLoading,
    addXP,
    checkAchievements,
    viewAchievement,
    dismissPendingAchievement,
    dismissLevelUp,
    getAllAchievements,
    getStats,
    getNextLevelXP,
    getCurrentLevelXP,
    getLevelTitle,
    updateStreak
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

export default GamificationContext;
