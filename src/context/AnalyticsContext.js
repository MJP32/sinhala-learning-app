import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { format, getWeek, getYear } from 'date-fns';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [sessionsCount, setSessionsCount] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState({});
  const [dailyActivity, setDailyActivity] = useState({});
  const [weeklyActivity, setWeeklyActivity] = useState({});
  const [showSessionSummary, setShowSessionSummary] = useState(false);
  const [sessionStats, setSessionStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionStartTime = useRef(null);
  const sessionTimeSpent = useRef(0);
  const saveTimeoutRef = useRef(null);
  const { user } = useAuth();

  // Load analytics data from Firebase
  useEffect(() => {
    const loadAnalytics = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().analytics) {
            const data = docSnap.data().analytics;
            setTotalTimeSpent(data.totalTimeSpent || 0);
            setSessionsCount(data.sessionsCount || 0);
            setQuizHistory(data.quizHistory || []);
            setCategoryPerformance(data.categoryPerformance || {});
            setDailyActivity(data.dailyActivity || {});
            setWeeklyActivity(data.weeklyActivity || {});
          }
        } catch (error) {
          // Silently handle offline errors - fall back to localStorage
          if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
            console.warn('Error loading analytics (using localStorage fallback)');
          }
          const saved = localStorage.getItem(`sinhala-analytics-${user.uid}`);
          if (saved) {
            const data = JSON.parse(saved);
            setTotalTimeSpent(data.totalTimeSpent || 0);
            setSessionsCount(data.sessionsCount || 0);
            setQuizHistory(data.quizHistory || []);
            setCategoryPerformance(data.categoryPerformance || {});
            setDailyActivity(data.dailyActivity || {});
            setWeeklyActivity(data.weeklyActivity || {});
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setTotalTimeSpent(0);
        setSessionsCount(0);
        setQuizHistory([]);
        setCategoryPerformance({});
        setDailyActivity({});
        setWeeklyActivity({});
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [user]);

  // Start session timer
  useEffect(() => {
    if (user && !sessionStartTime.current) {
      sessionStartTime.current = Date.now();
      sessionTimeSpent.current = 0;
      setSessionsCount(prev => prev + 1);
    }

    // Increment time every second
    const interval = setInterval(() => {
      if (sessionStartTime.current) {
        sessionTimeSpent.current = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      }
    }, 1000);

    // Save periodically (every 30 seconds)
    const saveInterval = setInterval(() => {
      if (user && sessionTimeSpent.current > 0) {
        saveAnalytics();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(saveInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Save analytics data
  const saveAnalytics = useCallback(async () => {
    if (!user) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const weekKey = `${getYear(new Date())}-W${String(getWeek(new Date())).padStart(2, '0')}`;

    const updatedDailyActivity = {
      ...dailyActivity,
      [today]: {
        ...(dailyActivity[today] || {}),
        timeSpent: (dailyActivity[today]?.timeSpent || 0) + sessionTimeSpent.current
      }
    };

    const updatedWeeklyActivity = {
      ...weeklyActivity,
      [weekKey]: {
        ...(weeklyActivity[weekKey] || {}),
        timeSpent: (weeklyActivity[weekKey]?.timeSpent || 0) + sessionTimeSpent.current
      }
    };

    const data = {
      totalTimeSpent: totalTimeSpent + sessionTimeSpent.current,
      sessionsCount,
      quizHistory,
      categoryPerformance,
      dailyActivity: updatedDailyActivity,
      weeklyActivity: updatedWeeklyActivity
    };

    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { analytics: data }, { merge: true });
      localStorage.setItem(`sinhala-analytics-${user.uid}`, JSON.stringify(data));
    } catch (error) {
      // Silently handle offline errors - localStorage backup saved anyway
      if (error.code !== 'unavailable' && !error.message?.includes('offline')) {
        console.warn('Error saving analytics (localStorage backup saved)');
      }
      localStorage.setItem(`sinhala-analytics-${user.uid}`, JSON.stringify(data));
    }
  }, [user, totalTimeSpent, sessionsCount, quizHistory, categoryPerformance, dailyActivity, weeklyActivity]);

  // Record quiz result
  const recordQuizResult = useCallback((gradeId, score, difficulty, timeSpent, category = 'general') => {
    const result = {
      gradeId,
      score,
      difficulty,
      timeSpent,
      category,
      timestamp: new Date().toISOString()
    };

    setQuizHistory(prev => [...prev, result]);

    // Update category performance
    setCategoryPerformance(prev => {
      const existing = prev[category] || { correct: 0, total: 0 };
      const correctAnswers = Math.round((score / 100) * 20); // Assuming 20 questions
      return {
        ...prev,
        [category]: {
          correct: existing.correct + correctAnswers,
          total: existing.total + 20
        }
      };
    });

    // Debounce save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(saveAnalytics, 2000);
  }, [saveAnalytics]);

  // Record section completion
  const recordSectionComplete = useCallback((gradeId, sectionId, xpEarned = 0) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const weekKey = `${getYear(new Date())}-W${String(getWeek(new Date())).padStart(2, '0')}`;

    setDailyActivity(prev => ({
      ...prev,
      [today]: {
        ...(prev[today] || {}),
        sectionsCompleted: (prev[today]?.sectionsCompleted || 0) + 1,
        xpEarned: (prev[today]?.xpEarned || 0) + xpEarned
      }
    }));

    setWeeklyActivity(prev => ({
      ...prev,
      [weekKey]: {
        ...(prev[weekKey] || {}),
        sectionsCompleted: (prev[weekKey]?.sectionsCompleted || 0) + 1,
        xpEarned: (prev[weekKey]?.xpEarned || 0) + xpEarned
      }
    }));

    // Debounce save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(saveAnalytics, 2000);
  }, [saveAnalytics]);

  // Get weak areas based on category performance
  const getWeakAreas = useCallback(() => {
    const weakAreas = [];
    Object.entries(categoryPerformance).forEach(([category, data]) => {
      if (data.total > 0) {
        const percentage = (data.correct / data.total) * 100;
        if (percentage < 70) {
          weakAreas.push({
            category,
            percentage: Math.round(percentage),
            correct: data.correct,
            total: data.total
          });
        }
      }
    });
    return weakAreas.sort((a, b) => a.percentage - b.percentage);
  }, [categoryPerformance]);

  // Get learning trends (last 7 days)
  const getLearningTrends = useCallback(() => {
    const trends = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayData = dailyActivity[dateKey] || {};
      trends.push({
        date: dateKey,
        day: format(date, 'EEE'),
        timeSpent: dayData.timeSpent || 0,
        sectionsCompleted: dayData.sectionsCompleted || 0,
        xpEarned: dayData.xpEarned || 0
      });
    }
    return trends;
  }, [dailyActivity]);

  // Get quiz performance trends
  const getQuizTrends = useCallback(() => {
    const recentQuizzes = quizHistory.slice(-10);
    return recentQuizzes.map(quiz => ({
      ...quiz,
      date: format(new Date(quiz.timestamp), 'MMM dd')
    }));
  }, [quizHistory]);

  // Get session time in readable format
  const getSessionTime = useCallback(() => {
    const seconds = sessionTimeSpent.current;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes: mins, seconds: secs, total: seconds };
  }, []);

  // Show session summary
  const showEndSessionSummary = useCallback(() => {
    setSessionStats({
      timeSpent: sessionTimeSpent.current,
      date: new Date().toISOString()
    });
    setShowSessionSummary(true);
  }, []);

  // Dismiss session summary
  const dismissSessionSummary = () => {
    setShowSessionSummary(false);
    setSessionStats(null);
  };

  // Format time for display
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  const value = {
    totalTimeSpent,
    sessionsCount,
    quizHistory,
    categoryPerformance,
    dailyActivity,
    weeklyActivity,
    showSessionSummary,
    sessionStats,
    isLoading,
    recordQuizResult,
    recordSectionComplete,
    getWeakAreas,
    getLearningTrends,
    getQuizTrends,
    getSessionTime,
    showEndSessionSummary,
    dismissSessionSummary,
    formatTime,
    saveAnalytics
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContext;
