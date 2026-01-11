import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";

const Grade2 = () => {
  const [currentSection, setCurrentSection] = useState("family");

  const sections = [
    { id: "family", label: "Family" },
    { id: "colors", label: "Colors & Numbers" },
    { id: "quiz", label: "Quiz" },
  ];

  const familyWords = [
    { sinhala: "අක්කා", english: "Elder Sister", pronunciation: "Akka" },
    { sinhala: "අයියා", english: "Elder Brother", pronunciation: "Aiyya" },
    { sinhala: "නංගි", english: "Younger Sister", pronunciation: "Nangi" },
    { sinhala: "මල්ලි", english: "Younger Brother", pronunciation: "Malli" },
  ];

  const colors = [
    { sinhala: "රතු", english: "Red", pronunciation: "Rathu" },
    { sinhala: "නිල්", english: "Blue", pronunciation: "Nil" },
    { sinhala: "කොළ", english: "Green", pronunciation: "Kola" },
    { sinhala: "කහ", english: "Yellow", pronunciation: "Kaha" },
  ];

  const quizQuestions = [
    {
      question: 'What color is "රතු"?',
      options: ["Blue", "Green", "Red", "Yellow"],
      correct: 2,
    },
    {
      question: 'What does "අක්කා" mean?',
      options: ["Mother", "Elder Sister", "Younger Sister", "Grandmother"],
      correct: 1,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "family":
        return (
          <section className="section active">
            <h2>Family Members - පවුලේ සාමාජිකයන්</h2>
            <div className="word-grid">
              {familyWords.map((word, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={word.sinhala}
                  englishWord={word.english}
                  pronunciation={word.pronunciation}
                />
              ))}
            </div>
          </section>
        );
      case "colors":
        return (
          <section className="section active">
            <h2>Colors - වර්ණ</h2>
            <div className="word-grid">
              {colors.map((color, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={color.sinhala}
                  englishWord={color.english}
                  pronunciation={color.pronunciation}
                />
              ))}
            </div>
          </section>
        );
      case "quiz":
        return (
          <section className="section active">
            <h2>Grade 2 Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g2" />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grade-content active">
      <div className="grade-info">
        <h2>📚 Grade 2 - Building Vocabulary</h2>
        <p>
          <strong>Age: 7-8 years</strong> | Learn family terms, colors, numbers,
          and simple sentences
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <ProgressBar progress={29} />

      {renderSection()}
    </div>
  );
};

export default Grade2;
