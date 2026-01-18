import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { useGamification } from './GamificationContext';
import { generateDailyChallenges, ALL_CHALLENGES_BONUS_XP } from '../config/challengeDefinitions';

const ChallengesContext = createContext();

export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }
  return context;
};

export const ChallengesProvider = ({ children }) => {
  const { user } = useAuth();
  const { addXP } = useGamification();
  const [challenges, setChallenges] = useState([]);
  const [dailyProgress, setDailyProgress] = useState({
    quizzesCompleted: 0,
    highestQuizScore: 0,
    xpEarnedToday: 0,
    flashcardsReviewed: 0,
    sectionsCompleted: 0,
    gamesPlayed: 0,
    streakMaintained: false,
    pronunciationsPracticed: 0,
  });
  const [lastResetDate, setLastResetDate] = useState(null);
  const [allCompletedBonusClaimed, setAllCompletedBonusClaimed] = useState(false);
  const [showChallengeComplete, setShowChallengeComplete] = useState(null);

  const getTodayString = () => new Date().toISOString().split('T')[0];

  // Load challenges from Firebase
  const loadChallenges = useCallback(async () => {
    if (!user) return;

    const today = getTodayString();
    const docRef = doc(db, 'users', user.uid, 'dailyChallenges', today);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setChallenges(data.challenges || []);
        setDailyProgress(data.progress || dailyProgress);
        setAllCompletedBonusClaimed(data.allCompletedBonusClaimed || false);
        setLastResetDate(today);
      } else {
        // Generate new challenges for today
        const newChallenges = generateDailyChallenges(new Date());
        setChallenges(newChallenges);
        setDailyProgress({
          quizzesCompleted: 0,
          highestQuizScore: 0,
          xpEarnedToday: 0,
          flashcardsReviewed: 0,
          sectionsCompleted: 0,
          gamesPlayed: 0,
          streakMaintained: false,
          pronunciationsPracticed: 0,
        });
        setAllCompletedBonusClaimed(false);
        setLastResetDate(today);

        // Save initial challenges
        await setDoc(docRef, {
          challenges: newChallenges,
          progress: dailyProgress,
          allCompletedBonusClaimed: false,
          date: today,
        });
      }
    } catch (error) {
      // Silently handle offline errors - generate challenges locally
      if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
        console.warn('Error loading challenges (using local fallback):', error.code || error.message);
      }
      // Generate challenges locally if Firebase fails
      const newChallenges = generateDailyChallenges(new Date());
      setChallenges(newChallenges);
      setDailyProgress({
        quizzesCompleted: 0,
        highestQuizScore: 0,
        xpEarnedToday: 0,
        flashcardsReviewed: 0,
        sectionsCompleted: 0,
        gamesPlayed: 0,
        streakMaintained: false,
        pronunciationsPracticed: 0,
      });
    }
  }, [user]);

  // Save challenges to Firebase
  const saveChallenges = useCallback(async (updatedChallenges, updatedProgress, bonusClaimed) => {
    if (!user) return;

    const today = getTodayString();
    const docRef = doc(db, 'users', user.uid, 'dailyChallenges', today);

    try {
      await setDoc(docRef, {
        challenges: updatedChallenges,
        progress: updatedProgress,
        allCompletedBonusClaimed: bonusClaimed,
        date: today,
      });
    } catch (error) {
      // Silently handle offline errors
      if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
        console.warn('Error saving challenges:', error.code || error.message);
      }
    }
  }, [user]);

  // Check if it's a new day and reset challenges
  useEffect(() => {
    const today = getTodayString();
    if (lastResetDate && lastResetDate !== today) {
      loadChallenges();
    }
  }, [lastResetDate, loadChallenges]);

  // Load challenges on mount
  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  // Update challenge progress based on tracking key
  const updateProgress = useCallback((trackingKey, value, isIncrement = true) => {
    setDailyProgress(prev => {
      const newProgress = { ...prev };

      if (isIncrement) {
        newProgress[trackingKey] = (prev[trackingKey] || 0) + value;
      } else {
        // For highest score type tracking, only update if new value is higher
        if (trackingKey === 'highestQuizScore') {
          newProgress[trackingKey] = Math.max(prev[trackingKey] || 0, value);
        } else if (trackingKey === 'streakMaintained') {
          newProgress[trackingKey] = value;
        } else {
          newProgress[trackingKey] = value;
        }
      }

      return newProgress;
    });
  }, []);

  // Check and update challenge completion
  useEffect(() => {
    if (challenges.length === 0) return;

    let hasChanges = false;
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.completed) return challenge;

      let progress = 0;
      const currentValue = dailyProgress[challenge.trackingKey] || 0;

      if (challenge.trackingKey === 'streakMaintained') {
        progress = currentValue ? 1 : 0;
      } else if (challenge.trackingKey === 'highestQuizScore') {
        progress = currentValue >= challenge.target ? 1 : 0;
      } else {
        progress = Math.min(currentValue, challenge.target);
      }

      const isCompleted = progress >= challenge.target;

      if (progress !== challenge.progress || isCompleted !== challenge.completed) {
        hasChanges = true;

        // Show completion notification
        if (isCompleted && !challenge.completed) {
          setShowChallengeComplete(challenge);
        }

        return {
          ...challenge,
          progress,
          completed: isCompleted,
        };
      }

      return challenge;
    });

    if (hasChanges) {
      setChallenges(updatedChallenges);
      saveChallenges(updatedChallenges, dailyProgress, allCompletedBonusClaimed);
    }
  }, [dailyProgress, challenges, saveChallenges, allCompletedBonusClaimed]);

  // Claim reward for a completed challenge
  const claimReward = useCallback(async (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || !challenge.completed || challenge.claimed) return false;

    // Award XP
    addXP(challenge.xpReward, `Challenge: ${challenge.title}`);

    // Update challenge as claimed
    const updatedChallenges = challenges.map(c =>
      c.id === challengeId ? { ...c, claimed: true } : c
    );

    setChallenges(updatedChallenges);

    // Update XP earned today
    const newProgress = {
      ...dailyProgress,
      xpEarnedToday: dailyProgress.xpEarnedToday + challenge.xpReward,
    };
    setDailyProgress(newProgress);

    await saveChallenges(updatedChallenges, newProgress, allCompletedBonusClaimed);

    return true;
  }, [challenges, dailyProgress, addXP, saveChallenges, allCompletedBonusClaimed]);

  // Claim all-challenges-completed bonus
  const claimAllCompletedBonus = useCallback(async () => {
    if (allCompletedBonusClaimed) return false;

    const allCompleted = challenges.every(c => c.completed);
    if (!allCompleted) return false;

    // Award bonus XP
    addXP(ALL_CHALLENGES_BONUS_XP, 'All daily challenges completed!');

    setAllCompletedBonusClaimed(true);

    const newProgress = {
      ...dailyProgress,
      xpEarnedToday: dailyProgress.xpEarnedToday + ALL_CHALLENGES_BONUS_XP,
    };
    setDailyProgress(newProgress);

    await saveChallenges(challenges, newProgress, true);

    return true;
  }, [challenges, dailyProgress, addXP, saveChallenges, allCompletedBonusClaimed]);

  // Track quiz completion
  const trackQuizComplete = useCallback((score) => {
    updateProgress('quizzesCompleted', 1);
    updateProgress('highestQuizScore', score, false);
  }, [updateProgress]);

  // Track flashcard review
  const trackFlashcardReview = useCallback((count = 1) => {
    updateProgress('flashcardsReviewed', count);
  }, [updateProgress]);

  // Track section completion
  const trackSectionComplete = useCallback(() => {
    updateProgress('sectionsCompleted', 1);
  }, [updateProgress]);

  // Track game completion
  const trackGameComplete = useCallback(() => {
    updateProgress('gamesPlayed', 1);
  }, [updateProgress]);

  // Track streak maintained
  const trackStreakMaintained = useCallback(() => {
    updateProgress('streakMaintained', true, false);
  }, [updateProgress]);

  // Track pronunciation practice
  const trackPronunciationPractice = useCallback((count = 1) => {
    updateProgress('pronunciationsPracticed', count);
  }, [updateProgress]);

  // Track XP earned (called from GamificationContext)
  const trackXPEarned = useCallback((amount) => {
    updateProgress('xpEarnedToday', amount);
  }, [updateProgress]);

  // Get completion stats
  const getCompletionStats = useCallback(() => {
    const completed = challenges.filter(c => c.completed).length;
    const claimed = challenges.filter(c => c.claimed).length;
    const total = challenges.length;
    const allCompleted = completed === total && total > 0;
    const totalXPAvailable = challenges.reduce((sum, c) => sum + c.xpReward, 0) +
                            (allCompleted ? ALL_CHALLENGES_BONUS_XP : 0);
    const xpClaimed = challenges.filter(c => c.claimed).reduce((sum, c) => sum + c.xpReward, 0) +
                     (allCompletedBonusClaimed ? ALL_CHALLENGES_BONUS_XP : 0);

    return {
      completed,
      claimed,
      total,
      allCompleted,
      allCompletedBonusClaimed,
      totalXPAvailable,
      xpClaimed,
      unclaimed: completed - claimed + (allCompleted && !allCompletedBonusClaimed ? 1 : 0),
    };
  }, [challenges, allCompletedBonusClaimed]);

  // Dismiss challenge complete notification
  const dismissChallengeComplete = useCallback(() => {
    setShowChallengeComplete(null);
  }, []);

  const value = {
    challenges,
    dailyProgress,
    claimReward,
    claimAllCompletedBonus,
    trackQuizComplete,
    trackFlashcardReview,
    trackSectionComplete,
    trackGameComplete,
    trackStreakMaintained,
    trackPronunciationPractice,
    trackXPEarned,
    getCompletionStats,
    showChallengeComplete,
    dismissChallengeComplete,
    ALL_CHALLENGES_BONUS_XP,
  };

  return (
    <ChallengesContext.Provider value={value}>
      {children}
    </ChallengesContext.Provider>
  );
};

export default ChallengesContext;
