import React from "react";
import { useProgress } from "../context/ProgressContext";
import SoundControls from "./shared/SoundControls";

const Header = ({ user, onLogout }) => {
  const { setShowProgressModal, getOverallProgress } = useProgress();
  const overall = getOverallProgress();

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Learn Sinhala</div>
        <div className="subtitle">Master the Language of Sri Lanka</div>
        <div className="sinhala-title">සිංහල ඉගෙන ගන්න</div>
      </div>
      {user && (
        <div className="header-right">
          <SoundControls />
          <button
            className="progress-btn"
            onClick={() => setShowProgressModal(true)}
          >
            <span className="progress-icon">📊</span>
            <span className="progress-label">Progress</span>
            <span className="progress-badge">{overall.percentage}%</span>
          </button>
          <div className="user-info">
            <span className="user-email">{user.email}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
