import React, { useState } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import Header from "./components/Header";
import GradeSelector from "./components/GradeSelector";
import ProgressModal from "./components/shared/ProgressModal";
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
  const [authPage, setAuthPage] = useState("login");
  const { user, loading, logout } = useAuth();

  const handleGradeChange = (grade) => {
    setCurrentGrade(grade);
  };

  const renderGradeComponent = () => {
    switch (currentGrade) {
      case 1:
        return <Grade1 />;
      case 2:
        return <Grade2 />;
      case 3:
        return <Grade3 />;
      case 4:
        return <Grade4 />;
      case 5:
        return <Grade5 />;
      case 6:
        return <Grade6 />;
      default:
        return <Grade1 />;
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
      <div className="main-layout">
        <GradeSelector
          currentGrade={currentGrade}
          onGradeChange={handleGradeChange}
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
    <AuthProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
