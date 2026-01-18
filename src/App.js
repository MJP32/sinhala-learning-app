import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import { GamificationProvider } from "./context/GamificationContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { ChallengesProvider } from "./context/ChallengesContext";
import Header from "./components/Header";
import GradeSelector from "./components/GradeSelector";
import ProgressModal from "./components/shared/ProgressModal";
import AchievementUnlocked from "./components/gamification/AchievementUnlocked";
import LevelUpModal from "./components/gamification/LevelUpModal";
import ChallengeCompleteToast from "./components/challenges/ChallengeCompleteToast";
import Grade1 from "./components/grades/Grade1";
import Grade2 from "./components/grades/Grade2";
import Grade3 from "./components/grades/Grade3";
import Grade4 from "./components/grades/Grade4";
import Grade5 from "./components/grades/Grade5";
import Grade6 from "./components/grades/Grade6";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function AppContent() {
  const [currentGrade, setCurrentGrade] = useState(1);
  const [initialSection, setInitialSection] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const { user, loading, logout } = useAuth();

  const handleGradeChange = (grade) => {
    setCurrentGrade(grade);
    setInitialSection(null); // Reset section when changing grade directly
  };

  const handleSectionChange = (gradeNumber, sectionId) => {
    setCurrentGrade(gradeNumber);
    setInitialSection(sectionId);
  };

  const renderGradeComponent = () => {
    switch (currentGrade) {
      case 1:
        return <Grade1 initialSection={initialSection} />;
      case 2:
        return <Grade2 initialSection={initialSection} />;
      case 3:
        return <Grade3 initialSection={initialSection} />;
      case 4:
        return <Grade4 initialSection={initialSection} />;
      case 5:
        return <Grade5 initialSection={initialSection} />;
      case 6:
        return <Grade6 initialSection={initialSection} />;
      default:
        return <Grade1 initialSection={initialSection} />;
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    if (authPage === "login") {
      return <LoginPage onSwitchToSignup={() => setAuthPage("signup")} />;
    }
    return <SignupPage onSwitchToLogin={() => setAuthPage("login")} />;
  }

  return (
    <div className="App">
      <Header user={user} onLogout={logout} currentGrade={currentGrade} />
      <ProgressModal />
      <AchievementUnlocked />
      <LevelUpModal />
      <ChallengeCompleteToast />
      <div className="main-layout">
        <GradeSelector
          currentGrade={currentGrade}
          onGradeChange={handleGradeChange}
          onSectionChange={handleSectionChange}
        />
        <div className="content">
          {renderGradeComponent()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <GamificationProvider>
            <AnalyticsProvider>
              <ChallengesProvider>
                <AppContent />
              </ChallengesProvider>
            </AnalyticsProvider>
          </GamificationProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
