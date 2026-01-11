import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import LetterCard from "../shared/LetterCard";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";

const Grade1 = () => {
  const [currentSection, setCurrentSection] = useState("letters");

  const sections = [
    { id: "letters", label: "Letters" },
    { id: "words", label: "Simple Words" },
    { id: "animals", label: "Animals" },
    { id: "body", label: "Body Parts" },
    { id: "games", label: "Fun Games" },
    { id: "songs", label: "Songs & Rhymes" },
    { id: "quiz", label: "Quiz" },
  ];

  const vowels = [
    { sinhala: "අ", roman: "a", sound: "a" },
    { sinhala: "ආ", roman: "ā", sound: "aa" },
    { sinhala: "ඇ", roman: "æ", sound: "ae" },
    { sinhala: "ඈ", roman: "ǣ", sound: "aae" },
    { sinhala: "ඉ", roman: "i", sound: "i" },
    { sinhala: "ඊ", roman: "ī", sound: "ii" },
    { sinhala: "උ", roman: "u", sound: "u" },
    { sinhala: "ඌ", roman: "ū", sound: "uu" },
    { sinhala: "ඍ", roman: "ṛ", sound: "ri" },
    { sinhala: "ඎ", roman: "ṝ", sound: "rii" },
    { sinhala: "ඏ", roman: "ḷ", sound: "li" },
    { sinhala: "ඐ", roman: "ḹ", sound: "lii" },
    { sinhala: "එ", roman: "e", sound: "e" },
    { sinhala: "ඒ", roman: "ē", sound: "ee" },
    { sinhala: "ඓ", roman: "ai", sound: "ai" },
    { sinhala: "ඔ", roman: "o", sound: "o" },
    { sinhala: "ඕ", roman: "ō", sound: "oo" },
    { sinhala: "ඖ", roman: "au", sound: "au" },
  ];

  const consonants = [
    { sinhala: "ක", roman: "ka", sound: "ka" },
    { sinhala: "ඛ", roman: "kha", sound: "kha" },
    { sinhala: "ග", roman: "ga", sound: "ga" },
    { sinhala: "ඝ", roman: "gha", sound: "gha" },
    { sinhala: "ඞ", roman: "ṅa", sound: "nga" },
    { sinhala: "ච", roman: "ca", sound: "ca" },
    { sinhala: "ඡ", roman: "cha", sound: "cha" },
    { sinhala: "ජ", roman: "ja", sound: "ja" },
    { sinhala: "ඣ", roman: "jha", sound: "jha" },
    { sinhala: "ඤ", roman: "ña", sound: "nya" },
    { sinhala: "ට", roman: "ṭa", sound: "tta" },
    { sinhala: "ඨ", roman: "ṭha", sound: "ttha" },
    { sinhala: "ඩ", roman: "ḍa", sound: "dda" },
    { sinhala: "ඪ", roman: "ḍha", sound: "ddha" },
    { sinhala: "ණ", roman: "ṇa", sound: "nna" },
    { sinhala: "ත", roman: "ta", sound: "ta" },
    { sinhala: "ථ", roman: "tha", sound: "tha" },
    { sinhala: "ද", roman: "da", sound: "da" },
    { sinhala: "ධ", roman: "dha", sound: "dha" },
    { sinhala: "න", roman: "na", sound: "na" },
    { sinhala: "ප", roman: "pa", sound: "pa" },
    { sinhala: "ඵ", roman: "pha", sound: "pha" },
    { sinhala: "බ", roman: "ba", sound: "ba" },
    { sinhala: "භ", roman: "bha", sound: "bha" },
    { sinhala: "ම", roman: "ma", sound: "ma" },
    { sinhala: "ය", roman: "ya", sound: "ya" },
    { sinhala: "ර", roman: "ra", sound: "ra" },
    { sinhala: "ල", roman: "la", sound: "la" },
    { sinhala: "ව", roman: "va", sound: "va" },
    { sinhala: "ශ", roman: "śa", sound: "sha" },
    { sinhala: "ෂ", roman: "ṣa", sound: "shha" },
    { sinhala: "ස", roman: "sa", sound: "sa" },
    { sinhala: "හ", roman: "ha", sound: "ha" },
    { sinhala: "ළ", roman: "ḷa", sound: "lla" },
    { sinhala: "ෆ", roman: "fa", sound: "fa" },
  ];

  const familyWords = [
    { sinhala: "අම්මා", english: "Mother", pronunciation: "Amma" },
    { sinhala: "තාත්තා", english: "Father", pronunciation: "Thaththa" },
    { sinhala: "පැටිය", english: "Baby", pronunciation: "Patiya" },
    { sinhala: "ගෙදර", english: "Home", pronunciation: "Gedara" },
  ];

  const animals = [
    { sinhala: "බල්ලා", english: "Dog", pronunciation: "Balla" },
    { sinhala: "පූසා", english: "Cat", pronunciation: "Poosa" },
    { sinhala: "හාතිය", english: "Elephant", pronunciation: "Haathiya" },
    { sinhala: "කුරුල්ලා", english: "Bird", pronunciation: "Kurulla" },
    { sinhala: "මාළුවා", english: "Fish", pronunciation: "Maaluwa" },
    { sinhala: "වඳුරා", english: "Monkey", pronunciation: "Wandura" },
  ];

  const bodyParts = [
    { sinhala: "ඇස", english: "Eye", pronunciation: "Asa" },
    { sinhala: "නාසය", english: "Nose", pronunciation: "Naasaya" },
    { sinhala: "කන", english: "Ear", pronunciation: "Kana" },
    { sinhala: "මුව", english: "Mouth", pronunciation: "Muwa" },
    { sinhala: "අත", english: "Hand", pronunciation: "Atha" },
    { sinhala: "පාදය", english: "Foot", pronunciation: "Paadaya" },
  ];

  const greetings = [
    { sinhala: "ආයුබෝවන්", english: "Hello", pronunciation: "Ayubowan" },
    { sinhala: "ස්තූතියි", english: "Thank you", pronunciation: "Sthoothiyi" },
    { sinhala: "ඔව්", english: "Yes", pronunciation: "Ow" },
    { sinhala: "නෑ", english: "No", pronunciation: "Naa" },
  ];

  const quizQuestions = [
    {
      question: 'What does "අම්මා" mean?',
      options: ["Father", "Mother", "Sister", "Brother"],
      correct: 1,
    },
    {
      question: 'How do you say "Hello" in Sinhala?',
      options: ["ස්තූතියි", "ආයුබෝවන්", "සමාවන්න", "ඔව්"],
      correct: 1,
    },
    {
      question: 'What animal is "බල්ලා"?',
      options: ["Cat", "Dog", "Bird", "Fish"],
      correct: 1,
    },
    {
      question: 'Which body part is "ඇස"?',
      options: ["Nose", "Ear", "Eye", "Mouth"],
      correct: 2,
    },
    {
      question: 'What does "ස්තූතියි" mean?',
      options: ["Hello", "Thank you", "Sorry", "Goodbye"],
      correct: 1,
    },
    {
      question: 'What does "තාත්තා" mean?',
      options: ["Uncle", "Father", "Brother", "Grandfather"],
      correct: 1,
    },
    {
      question: 'Which animal is "පූසා"?',
      options: ["Dog", "Bird", "Cat", "Fish"],
      correct: 2,
    },
    {
      question: 'What body part is "කන"?',
      options: ["Eye", "Nose", "Mouth", "Ear"],
      correct: 3,
    },
    {
      question: 'How do you say "Yes" in Sinhala?',
      options: ["නෑ", "ඔව්", "සමාවන්න", "ස්තූතියි"],
      correct: 1,
    },
    {
      question: 'What does "ගෙදර" mean?',
      options: ["School", "Home", "Shop", "Garden"],
      correct: 1,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "letters":
        return (
          <section className="section active">
            <h2>Complete Sinhala Alphabet - සිංහල අක්ෂරාවලිය</h2>
            <h3
              style={{
                color: "#667eea",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Vowels - ස්වර (18 letters)
            </h3>
            <div className="alphabet-grid">
              {vowels.map((vowel, index) => (
                <LetterCard
                  key={index}
                  sinhalaLetter={vowel.sinhala}
                  romanLetter={vowel.roman}
                  sound={vowel.sound}
                />
              ))}
            </div>
            <h3
              style={{
                color: "#667eea",
                margin: "40px 0 20px 0",
                textAlign: "center",
              }}
            >
              Consonants - ව්‍යඤ්ජන (35 letters)
            </h3>
            <div className="alphabet-grid">
              {consonants.map((consonant, index) => (
                <LetterCard
                  key={index}
                  sinhalaLetter={consonant.sinhala}
                  romanLetter={consonant.roman}
                  sound={consonant.sound}
                />
              ))}
            </div>
            <div className="activity-card">
              <h3>🎯 Letter Recognition Game</h3>
              <p>
                Practice the complete Sinhala alphabet! Click on each letter to
                hear its sound.
              </p>
              <p>
                <strong>Challenge:</strong> Can you find all the letters that
                make the "a" sound? (අ, ආ, ඇ, ඈ)
              </p>
            </div>
          </section>
        );

      case "words":
        return (
          <section className="section active">
            <h2>Simple Words - සරල වචන</h2>
            <h3
              style={{
                color: "#667eea",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Family - පවුල
            </h3>
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
            <h3
              style={{
                color: "#667eea",
                margin: "30px 0 20px 0",
                textAlign: "center",
              }}
            >
              Greetings - ආචාර
            </h3>
            <div className="word-grid">
              {greetings.map((greeting, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={greeting.sinhala}
                  englishWord={greeting.english}
                  pronunciation={greeting.pronunciation}
                />
              ))}
            </div>
          </section>
        );

      case "animals":
        return (
          <section className="section active">
            <h2>Animals - සතුන්</h2>
            <div className="word-grid">
              {animals.map((animal, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={animal.sinhala}
                  englishWord={animal.english}
                  pronunciation={animal.pronunciation}
                />
              ))}
            </div>
            <div className="story-card">
              <h3>🐘 Animal Story</h3>
              <div className="sentence-sinhala">
                හාතිය ලොකු සතෙක්. බල්ලා කුඩා සතෙක්.
              </div>
              <div className="sentence-english">
                The elephant is a big animal. The dog is a small animal.
              </div>
            </div>
          </section>
        );

      case "body":
        return (
          <section className="section active">
            <h2>Body Parts - ශරීර කොටස්</h2>
            <div className="word-grid">
              {bodyParts.map((part, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={part.sinhala}
                  englishWord={part.english}
                  pronunciation={part.pronunciation}
                />
              ))}
            </div>
          </section>
        );

      case "games":
        return (
          <section className="section active">
            <h2>Fun Learning Games - ක්‍රීඩා</h2>
            <div className="game-card">
              <h3>🎲 Letter Matching Game</h3>
              <p>Match the Sinhala letter with its sound! Click to play.</p>
              <div className="activity-card">
                <p>
                  <strong>ක, ම, ස, හ</strong>
                </p>
                <p>Can you match these letters with "ka, ma, sa, ha"?</p>
              </div>
            </div>
            <div className="game-card">
              <h3>🔍 Word Hunt</h3>
              <p>Find and count how many animals you learned today!</p>
              <div className="activity-card">
                <p>බල්ලා, පූසා, හාතිය, කුරුල්ලා</p>
                <p>How many animals did you spot? Count them!</p>
              </div>
            </div>
          </section>
        );

      case "songs":
        return (
          <section className="section active">
            <h2>Songs & Rhymes - ගීත සහ කවි</h2>
            <div className="poem-card">
              <h3>🎵 Alphabet Song</h3>
              <div className="sentence-sinhala">
                අ ආ ඇ ඈ<br />
                එන්න කියන්න මෙන්න
              </div>
              <div className="sentence-english">
                A, Aa, Ae, Aae
                <br />
                Come and say like this
              </div>
            </div>
            <div className="poem-card">
              <h3>🐘 Animal Rhyme</h3>
              <div className="sentence-sinhala">
                හාතිය ලොකුයි
                <br />
                පූසා කුඩායි
                <br />
                මම හොඳ ළමයෙක්
              </div>
              <div className="sentence-english">
                Elephant is big
                <br />
                Cat is small
                <br />I am a good child
              </div>
            </div>
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Grade 1 Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g1" />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grade-content active">
      <div className="grade-info">
        <h2>🌟 Grade 1 - Basic Sinhala Learning</h2>
        <p>
          <strong>Age: 6-7 years</strong> | Learn basic letters, simple words,
          greetings, and fun activities
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <ProgressBar progress={14} />

      {renderSection()}
    </div>
  );
};

export default Grade1;
