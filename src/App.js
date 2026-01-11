import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GradeSelector from "./components/GradeSelector";
import SoundControls from "./components/shared/SoundControls";
import Grade1 from "./components/grades/Grade1";
import Grade2 from "./components/grades/Grade2";
import Grade3 from "./components/grades/Grade3";
import Grade4 from "./components/grades/Grade4";

function App() {
  const [currentGrade, setCurrentGrade] = useState(1);

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
      default:
        return <Grade1 />;
    }
  };

  return (
    <div className="App">
      <SoundControls />
      <div className="container">
        <Header />
        <GradeSelector
          currentGrade={currentGrade}
          onGradeChange={handleGradeChange}
        />
        {renderGradeComponent()}
      </div>
    </div>
  );
}

export default App;
