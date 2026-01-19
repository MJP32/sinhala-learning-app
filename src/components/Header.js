import React, { useState } from "react";
import { useGamification } from "../context/GamificationContext";
import { useChallenges } from "../context/ChallengesContext";
import SoundControls from "./shared/SoundControls";
import ThemeToggle from "./shared/ThemeToggle";
import ShareButton from "./shared/ShareButton";
import XPDisplay from "./gamification/XPDisplay";
import StreakIndicator from "./gamification/StreakIndicator";
import AchievementsModal from "./gamification/AchievementsModal";
import AnalyticsDashboard from "./analytics/AnalyticsDashboard";
import DailyChallenges from "./challenges/DailyChallenges";
import Leaderboard from "./social/Leaderboard";
import "../components/gamification/Gamification.css";
import "../components/challenges/Challenges.css";

const Header = ({ user, onLogout }) => {
  const { getAllAchievements } = useGamification();
  const { getCompletionStats } = useChallenges();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const achievements = getAllAchievements();
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const challengeStats = getCompletionStats();

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">Learn Sinhala</div>
          <div className="subtitle">Master the Language of Sri Lanka</div>
          <div className="sinhala-title">සිංහල ඉගෙන ගන්න</div>
        </div>
        {user && (
          <div className="header-right">
            {/* Stats Group */}
            <div className="header-stats">
              <XPDisplay compact />
              <StreakIndicator showLabel={false} />
            </div>

            {/* Action Buttons Group */}
            <div className="header-actions">
              <button
                className="header-btn"
                onClick={() => setShowChallenges(true)}
                title="Daily Challenges"
              >
                <span className="btn-icon">🎯</span>
                {challengeStats.unclaimed > 0 && (
                  <span className="btn-badge">{challengeStats.unclaimed}</span>
                )}
              </button>

              <button
                className="header-btn"
                onClick={() => setShowLeaderboard(true)}
                title="Leaderboard"
              >
                <span className="btn-icon">🏅</span>
              </button>

              <button
                className="header-btn"
                onClick={() => setShowAchievements(true)}
                title="Achievements"
              >
                <span className="btn-icon">🏆</span>
                {unlockedCount > 0 && (
                  <span className="btn-badge">{unlockedCount}</span>
                )}
              </button>

              <button
                className="header-btn"
                onClick={() => setShowAnalytics(true)}
                title="Analytics & Progress"
              >
                <span className="btn-icon">📊</span>
              </button>

              <SoundControls />
              <ThemeToggle />
              <ShareButton />
            </div>

            {/* User Section */}
            <div className="header-user">
              <span className={`user-name ${user.isGuest ? 'guest-mode' : ''}`}>
                {user.isGuest ? 'Guest' : user.email.split('@')[0]}
              </span>
              <button onClick={onLogout} className="logout-btn" title={user.isGuest ? "Exit Guest Mode" : "Logout"}>
                <span className="btn-icon">🚪</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />

      <AnalyticsDashboard
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />

      <DailyChallenges
        isOpen={showChallenges}
        onClose={() => setShowChallenges(false)}
      />

      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
    </>
  );
};

export default Header;
