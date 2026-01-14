import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import LeaderboardEntry from './LeaderboardEntry';
import './Social.css';

const Leaderboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [weeklyData, setWeeklyData] = useState([]);
  const [allTimeData, setAllTimeData] = useState([]);
  const [userRank, setUserRank] = useState({ weekly: null, allTime: null });
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(10);

  const { user } = useAuth();
  const { xp, level, currentStreak } = useGamification();

  // Get Monday of current week
  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString().split('T')[0];
  };

  // Generate display name from email
  const getDisplayName = (email) => {
    if (!email) return 'Anonymous';
    const name = email.split('@')[0];
    // Capitalize first letter and limit length
    return name.charAt(0).toUpperCase() + name.slice(1, 12);
  };

  // Update user's leaderboard entry
  const updateLeaderboardEntry = useCallback(async () => {
    if (!user) return;

    const weekStart = getWeekStart();
    const userRef = doc(db, 'leaderboard', user.uid);

    try {
      const userDoc = await getDoc(userRef);
      const existingData = userDoc.exists() ? userDoc.data() : {};

      // Calculate weekly XP
      let weeklyXP = xp;
      if (existingData.weekStart === weekStart) {
        // Same week, update weekly XP
        weeklyXP = existingData.weeklyXP || 0;
      } else {
        // New week, reset weekly XP
        weeklyXP = 0;
      }

      await setDoc(userRef, {
        odId: user.uid,
        displayName: getDisplayName(user.email),
        totalXP: xp,
        weeklyXP: weeklyXP,
        weekStart: weekStart,
        level: level,
        streak: currentStreak,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  }, [user, xp, level, currentStreak]);

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);

    try {
      const weekStart = getWeekStart();

      // Fetch weekly leaderboard
      const weeklyQuery = query(
        collection(db, 'leaderboard'),
        orderBy('weeklyXP', 'desc'),
        limit(50)
      );
      const weeklySnapshot = await getDocs(weeklyQuery);
      const weeklyEntries = [];
      let weeklyRank = null;

      weeklySnapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        // Only include entries from current week
        if (data.weekStart === weekStart) {
          weeklyEntries.push({
            id: doc.id,
            rank: weeklyEntries.length + 1,
            ...data,
          });
          if (user && doc.id === user.uid) {
            weeklyRank = weeklyEntries.length;
          }
        }
      });
      setWeeklyData(weeklyEntries);

      // Fetch all-time leaderboard
      const allTimeQuery = query(
        collection(db, 'leaderboard'),
        orderBy('totalXP', 'desc'),
        limit(50)
      );
      const allTimeSnapshot = await getDocs(allTimeQuery);
      const allTimeEntries = [];
      let allTimeRank = null;

      allTimeSnapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        allTimeEntries.push({
          id: doc.id,
          rank: index + 1,
          ...data,
        });
        if (user && doc.id === user.uid) {
          allTimeRank = index + 1;
        }
      });
      setAllTimeData(allTimeEntries);

      setUserRank({ weekly: weeklyRank, allTime: allTimeRank });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Update and fetch on open
  useEffect(() => {
    if (isOpen) {
      updateLeaderboardEntry().then(() => {
        fetchLeaderboard();
      });
    }
  }, [isOpen, updateLeaderboardEntry, fetchLeaderboard]);

  if (!isOpen) return null;

  const currentData = activeTab === 'weekly' ? weeklyData : allTimeData;
  const currentUserRank = activeTab === 'weekly' ? userRank.weekly : userRank.allTime;
  const displayData = currentData.slice(0, displayLimit);

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="leaderboard-modal" onClick={e => e.stopPropagation()}>
        <div className="leaderboard-header">
          <div>
            <h2>Leaderboard</h2>
            <span className="header-si">ශ්‍රේණිගත කිරීම්</span>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="leaderboard-tabs">
          <button
            className={`leaderboard-tab ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            <span className="tab-icon">📅</span>
            <span>This Week</span>
            <span className="tab-si">මෙම සතිය</span>
          </button>
          <button
            className={`leaderboard-tab ${activeTab === 'alltime' ? 'active' : ''}`}
            onClick={() => setActiveTab('alltime')}
          >
            <span className="tab-icon">🏆</span>
            <span>All Time</span>
            <span className="tab-si">සියලු කාලය</span>
          </button>
        </div>

        {/* User's Rank Card */}
        {user && currentUserRank && (
          <div className="your-rank-card">
            <span className="your-rank-label">Your Rank</span>
            <div className="your-rank-number">
              {getMedalIcon(currentUserRank) || '#'}
              {!getMedalIcon(currentUserRank) && currentUserRank}
            </div>
            <span className="your-rank-xp">
              {activeTab === 'weekly' ? weeklyData.find(d => d.id === user.uid)?.weeklyXP || 0 : xp} XP
            </span>
          </div>
        )}

        <div className="leaderboard-content">
          {loading ? (
            <div className="leaderboard-loading">
              <div className="spinner"></div>
              <p>Loading rankings...</p>
            </div>
          ) : displayData.length === 0 ? (
            <div className="leaderboard-empty">
              <span className="empty-icon">📊</span>
              <p>No rankings yet for this period.</p>
              <p className="empty-si">මෙම කාල සීමාව සඳහා තවම ශ්‍රේණිගත කිරීම් නැත.</p>
            </div>
          ) : (
            <>
              <div className="leaderboard-list">
                {displayData.map((entry, index) => (
                  <LeaderboardEntry
                    key={entry.id}
                    entry={entry}
                    rank={entry.rank}
                    isCurrentUser={user && entry.id === user.uid}
                    xpField={activeTab === 'weekly' ? 'weeklyXP' : 'totalXP'}
                  />
                ))}
              </div>

              {currentData.length > displayLimit && (
                <button
                  className="load-more-btn"
                  onClick={() => setDisplayLimit(prev => Math.min(prev + 10, 50))}
                >
                  Show More
                </button>
              )}
            </>
          )}
        </div>

        <div className="leaderboard-footer">
          <p>
            {activeTab === 'weekly'
              ? 'Weekly leaderboard resets every Monday at midnight'
              : 'Compete to earn the most XP!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
