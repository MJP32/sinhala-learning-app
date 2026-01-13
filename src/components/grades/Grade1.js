import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import LetterCard from "../shared/LetterCard";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";

const Grade1 = () => {
  const [currentSection, setCurrentSection] = useState("letters");

  const sections = [
    { id: "letters", label: "Letters" },
    { id: "numbers", label: "Numbers" },
    { id: "words", label: "Simple Words" },
    { id: "animals", label: "Animals" },
    { id: "fruits", label: "Fruits" },
    { id: "body", label: "Body Parts" },
    { id: "colors", label: "Colors" },
    { id: "games", label: "Fun Games" },
    { id: "songs", label: "Songs & Rhymes" },
    { id: "practice", label: "Speak & Learn" },
    { id: "quiz", label: "Quiz" },
  ];

  const vowels = [
    { sinhala: "අ", roman: "a", sound: "uh" },
    { sinhala: "ආ", roman: "ā", sound: "aah" },
    { sinhala: "ඇ", roman: "æ", sound: "ahh" },
    { sinhala: "ඈ", roman: "ǣ", sound: "ahh" },
    { sinhala: "ඉ", roman: "i", sound: "ih" },
    { sinhala: "ඊ", roman: "ī", sound: "eee" },
    { sinhala: "උ", roman: "u", sound: "oo" },
    { sinhala: "ඌ", roman: "ū", sound: "ooo" },
    { sinhala: "ඍ", roman: "ṛ", sound: "rih" },
    { sinhala: "ඎ", roman: "ṝ", sound: "reee" },
    { sinhala: "ඏ", roman: "ḷ", sound: "lih" },
    { sinhala: "ඐ", roman: "ḹ", sound: "leee" },
    { sinhala: "එ", roman: "e", sound: "eh" },
    { sinhala: "ඒ", roman: "ē", sound: "ayy" },
    { sinhala: "ඓ", roman: "ai", sound: "eye" },
    { sinhala: "ඔ", roman: "o", sound: "oh" },
    { sinhala: "ඕ", roman: "ō", sound: "ohh" },
    { sinhala: "ඖ", roman: "au", sound: "ow" },
  ];

  const consonants = [
    { sinhala: "ක", roman: "ka", sound: "kuh" },
    { sinhala: "ඛ", roman: "kha", sound: "khuh" },
    { sinhala: "ග", roman: "ga", sound: "guh" },
    { sinhala: "ඝ", roman: "gha", sound: "ghuh" },
    { sinhala: "ඞ", roman: "ṅa", sound: "nguh" },
    { sinhala: "ච", roman: "ca", sound: "chuh" },
    { sinhala: "ඡ", roman: "cha", sound: "chhuh" },
    { sinhala: "ජ", roman: "ja", sound: "juh" },
    { sinhala: "ඣ", roman: "jha", sound: "jhuh" },
    { sinhala: "ඤ", roman: "ña", sound: "nyuh" },
    { sinhala: "ට", roman: "ṭa", sound: "tuh" },
    { sinhala: "ඨ", roman: "ṭha", sound: "thuh" },
    { sinhala: "ඩ", roman: "ḍa", sound: "duh" },
    { sinhala: "ඪ", roman: "ḍha", sound: "dhuh" },
    { sinhala: "ණ", roman: "ṇa", sound: "nuh" },
    { sinhala: "ත", roman: "ta", sound: "thuh" },
    { sinhala: "ථ", roman: "tha", sound: "thuh" },
    { sinhala: "ද", roman: "da", sound: "duh" },
    { sinhala: "ධ", roman: "dha", sound: "dhuh" },
    { sinhala: "න", roman: "na", sound: "nuh" },
    { sinhala: "ප", roman: "pa", sound: "puh" },
    { sinhala: "ඵ", roman: "pha", sound: "phuh" },
    { sinhala: "බ", roman: "ba", sound: "buh" },
    { sinhala: "භ", roman: "bha", sound: "bhuh" },
    { sinhala: "ම", roman: "ma", sound: "muh" },
    { sinhala: "ය", roman: "ya", sound: "yuh" },
    { sinhala: "ර", roman: "ra", sound: "ruh" },
    { sinhala: "ල", roman: "la", sound: "luh" },
    { sinhala: "ව", roman: "va", sound: "vuh" },
    { sinhala: "ශ", roman: "śa", sound: "shuh" },
    { sinhala: "ෂ", roman: "ṣa", sound: "shuh" },
    { sinhala: "ස", roman: "sa", sound: "suh" },
    { sinhala: "හ", roman: "ha", sound: "huh" },
    { sinhala: "ළ", roman: "ḷa", sound: "luh" },
    { sinhala: "ෆ", roman: "fa", sound: "fuh" },
  ];

  const numbers = [
    { sinhala: "එක", english: "One (1)", pronunciation: "eh-kuh" },
    { sinhala: "දෙක", english: "Two (2)", pronunciation: "deh-kuh" },
    { sinhala: "තුන", english: "Three (3)", pronunciation: "thoo-nuh" },
    { sinhala: "හතර", english: "Four (4)", pronunciation: "huh-thuh-ruh" },
    { sinhala: "පහ", english: "Five (5)", pronunciation: "puh-huh" },
    { sinhala: "හය", english: "Six (6)", pronunciation: "huh-yuh" },
    { sinhala: "හත", english: "Seven (7)", pronunciation: "huh-thuh" },
    { sinhala: "අට", english: "Eight (8)", pronunciation: "uh-tuh" },
    { sinhala: "නවය", english: "Nine (9)", pronunciation: "nuh-vuh-yuh" },
    { sinhala: "දහය", english: "Ten (10)", pronunciation: "duh-huh-yuh" },
  ];

  const familyWords = [
    { sinhala: "අම්මා", english: "Mother", pronunciation: "uhm-maa" },
    { sinhala: "තාත්තා", english: "Father", pronunciation: "thaa-thaa" },
    { sinhala: "සීයා", english: "Grandfather", pronunciation: "see-yaa" },
    { sinhala: "ආච්චි", english: "Grandmother", pronunciation: "aah-chee" },
    { sinhala: "පැටිය", english: "Baby", pronunciation: "pah-tee-yuh" },
    { sinhala: "ගෙදර", english: "Home", pronunciation: "geh-duh-ruh" },
  ];

  const animals = [
    { sinhala: "බල්ලා", english: "Dog", pronunciation: "buhl-laa" },
    { sinhala: "පූසා", english: "Cat", pronunciation: "poo-saa" },
    { sinhala: "හාතිය", english: "Elephant", pronunciation: "haa-thee-yuh" },
    { sinhala: "කුරුල්ලා", english: "Bird", pronunciation: "koo-rool-laa" },
    { sinhala: "මාළුවා", english: "Fish", pronunciation: "maa-loo-vaa" },
    { sinhala: "වඳුරා", english: "Monkey", pronunciation: "vuhn-doo-raa" },
    { sinhala: "සිංහයා", english: "Lion", pronunciation: "sin-huh-yaa" },
    { sinhala: "ගවයා", english: "Cow", pronunciation: "guh-vuh-yaa" },
    { sinhala: "කුකුළා", english: "Rooster", pronunciation: "koo-koo-laa" },
    { sinhala: "හාවා", english: "Rabbit", pronunciation: "haa-vaa" },
    { sinhala: "ඉබ්බා", english: "Turtle", pronunciation: "ib-baa" },
    { sinhala: "සර්පයා", english: "Snake", pronunciation: "sur-puh-yaa" },
  ];

  const fruits = [
    { sinhala: "ඇපල්", english: "Apple", pronunciation: "ah-puhl" },
    { sinhala: "කෙසෙල්", english: "Banana", pronunciation: "keh-sehl" },
    { sinhala: "අඹ", english: "Mango", pronunciation: "uhm-buh" },
    { sinhala: "පේර", english: "Guava", pronunciation: "pay-ruh" },
    { sinhala: "අන්නාසි", english: "Pineapple", pronunciation: "uhn-naa-see" },
    { sinhala: "පොල්", english: "Coconut", pronunciation: "pohl" },
    { sinhala: "දොඩම්", english: "Orange", pronunciation: "doh-duhm" },
    { sinhala: "පැපොල්", english: "Papaya", pronunciation: "pah-pohl" },
    { sinhala: "මිදි", english: "Grapes", pronunciation: "mee-dee" },
    { sinhala: "කොමඩු", english: "Watermelon", pronunciation: "koh-muh-doo" },
  ];

  const bodyParts = [
    { sinhala: "ඇස", english: "Eye", pronunciation: "ah-suh" },
    { sinhala: "නාසය", english: "Nose", pronunciation: "naa-suh-yuh" },
    { sinhala: "කන", english: "Ear", pronunciation: "kuh-nuh" },
    { sinhala: "මුව", english: "Mouth", pronunciation: "moo-vuh" },
    { sinhala: "අත", english: "Hand", pronunciation: "uh-thuh" },
    { sinhala: "පාදය", english: "Foot", pronunciation: "paa-duh-yuh" },
    { sinhala: "හිස", english: "Head", pronunciation: "hee-suh" },
    { sinhala: "කෙස්", english: "Hair", pronunciation: "kehs" },
    { sinhala: "දත්", english: "Teeth", pronunciation: "duhth" },
    { sinhala: "දිව", english: "Tongue", pronunciation: "dee-vuh" },
    { sinhala: "බඩ", english: "Stomach", pronunciation: "buh-duh" },
    { sinhala: "පිට", english: "Back", pronunciation: "pee-tuh" },
  ];

  const colors = [
    { sinhala: "රතු", english: "Red", pronunciation: "ruh-thoo" },
    { sinhala: "නිල්", english: "Blue", pronunciation: "neel" },
    { sinhala: "කොළ", english: "Green", pronunciation: "koh-luh" },
    { sinhala: "කහ", english: "Yellow", pronunciation: "kuh-huh" },
    { sinhala: "සුදු", english: "White", pronunciation: "soo-doo" },
    { sinhala: "කළු", english: "Black", pronunciation: "kuh-loo" },
    { sinhala: "දුඹුරු", english: "Brown", pronunciation: "doom-boo-roo" },
    { sinhala: "රෝස", english: "Pink", pronunciation: "roh-suh" },
    { sinhala: "තැඹිලි", english: "Orange", pronunciation: "thahm-bee-lee" },
    { sinhala: "දම්", english: "Purple", pronunciation: "duhm" },
  ];

  const greetings = [
    { sinhala: "ආයුබෝවන්", english: "Hello", pronunciation: "aa-yoo-boh-vuhn" },
    { sinhala: "ස්තූතියි", english: "Thank you", pronunciation: "stoo-thee-yee" },
    { sinhala: "ඔව්", english: "Yes", pronunciation: "oh-vuh" },
    { sinhala: "නෑ", english: "No", pronunciation: "nah" },
    { sinhala: "සමාවන්න", english: "Sorry", pronunciation: "suh-maa-vuhn-nuh" },
    { sinhala: "කරුණාකර", english: "Please", pronunciation: "kuh-roo-naa-kuh-ruh" },
    { sinhala: "ගිහින් එන්නම්", english: "Goodbye", pronunciation: "gee-heen ehn-nuhm" },
    { sinhala: "සුභ උදෑසනක්", english: "Good morning", pronunciation: "soo-buh oo-dah-suh-nuhk" },
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
    {
      question: 'What number is "තුන"?',
      options: ["One", "Two", "Three", "Four"],
      correct: 2,
    },
    {
      question: 'What fruit is "කෙසෙල්"?',
      options: ["Apple", "Banana", "Mango", "Orange"],
      correct: 1,
    },
    {
      question: 'What color is "කොළ"?',
      options: ["Red", "Blue", "Green", "Yellow"],
      correct: 2,
    },
    {
      question: 'What animal is "සිංහයා"?',
      options: ["Tiger", "Lion", "Bear", "Wolf"],
      correct: 1,
    },
    {
      question: 'What number is "දහය"?',
      options: ["Five", "Eight", "Nine", "Ten"],
      correct: 3,
    },
    {
      question: 'What fruit is "අඹ"?',
      options: ["Mango", "Apple", "Banana", "Papaya"],
      correct: 0,
    },
    {
      question: 'What color is "සුදු"?',
      options: ["Black", "White", "Red", "Blue"],
      correct: 1,
    },
    {
      question: 'What body part is "හිස"?',
      options: ["Hand", "Foot", "Head", "Stomach"],
      correct: 2,
    },
    {
      question: 'How do you say "Sorry" in Sinhala?',
      options: ["ස්තූතියි", "ආයුබෝවන්", "සමාවන්න", "ඔව්"],
      correct: 2,
    },
    {
      question: 'What animal is "හාවා"?',
      options: ["Turtle", "Rabbit", "Snake", "Fish"],
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
              <h3>Letter Recognition Game</h3>
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

      case "numbers":
        return (
          <section className="section active">
            <h2>Numbers - අංක</h2>
            <div className="word-grid">
              {numbers.map((num, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={num.sinhala}
                  englishWord={num.english}
                  pronunciation={num.pronunciation}
                />
              ))}
            </div>
            <div className="activity-card">
              <h3>Counting Practice</h3>
              <p>Count along in Sinhala!</p>
              <div className="sentence-sinhala">
                එක, දෙක, තුන, හතර, පහ, හය, හත, අට, නවය, දහය
              </div>
              <div className="sentence-english">
                One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten
              </div>
            </div>
            <div className="activity-card">
              <h3>Number Game</h3>
              <p>How many fingers am I holding up?</p>
              <p><strong>Example:</strong> Show 3 fingers and say "තුන" (thoo-nuh)</p>
              <p>Practice counting objects around your room in Sinhala!</p>
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
            <div className="story-card">
              <h3>Simple Conversation</h3>
              <div className="sentence-sinhala">
                "ආයුබෝවන්! ඔබට කොහොමද?"
              </div>
              <div className="sentence-english">
                "Hello! How are you?"
              </div>
              <div className="sentence-sinhala" style={{ marginTop: "10px" }}>
                "මට හොඳින්. ස්තූතියි!"
              </div>
              <div className="sentence-english">
                "I am fine. Thank you!"
              </div>
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
              <h3>Animal Story</h3>
              <div className="sentence-sinhala">
                හාතිය ලොකු සතෙක්. බල්ලා කුඩා සතෙක්. සිංහයා වනයේ රජු.
              </div>
              <div className="sentence-english">
                The elephant is a big animal. The dog is a small animal. The lion is the king of the forest.
              </div>
            </div>
            <div className="activity-card">
              <h3>Animal Sounds Game</h3>
              <p>What sounds do these animals make?</p>
              <p><strong>බල්ලා:</strong> බව් බව්! (bow bow!)</p>
              <p><strong>පූසා:</strong> මියාව්! (meow!)</p>
              <p><strong>කුකුළා:</strong> කොක්කෝ! (cock-a-doodle-doo!)</p>
            </div>
          </section>
        );

      case "fruits":
        return (
          <section className="section active">
            <h2>Fruits - පලතුරු</h2>
            <div className="word-grid">
              {fruits.map((fruit, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={fruit.sinhala}
                  englishWord={fruit.english}
                  pronunciation={fruit.pronunciation}
                />
              ))}
            </div>
            <div className="story-card">
              <h3>Fruit Story</h3>
              <div className="sentence-sinhala">
                මම කෙසෙල් කන්න කැමතියි. අඹ රසයි. පොල් ගෙඩි ලොකුයි.
              </div>
              <div className="sentence-english">
                I like to eat bananas. Mangoes are delicious. Coconuts are big.
              </div>
            </div>
            <div className="activity-card">
              <h3>Fruit Colors Game</h3>
              <p>Match the fruit with its color!</p>
              <p><strong>කෙසෙල්:</strong> කහ (Yellow)</p>
              <p><strong>ඇපල්:</strong> රතු (Red)</p>
              <p><strong>දොඩම්:</strong> තැඹිලි (Orange)</p>
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
            <div className="activity-card">
              <h3>Touch Your Body Game</h3>
              <p>Touch the body part when you hear it!</p>
              <p><strong>හිස:</strong> Touch your head!</p>
              <p><strong>ඇස:</strong> Point to your eyes!</p>
              <p><strong>නාසය:</strong> Touch your nose!</p>
              <p><strong>කන:</strong> Point to your ears!</p>
            </div>
            <div className="poem-card">
              <h3>Body Parts Song</h3>
              <div className="sentence-sinhala">
                හිස, උරහිස, දණහිස, පාද<br />
                දණහිස, පාද!<br />
                හිස, උරහිස, දණහිස, පාද<br />
                දණහිස, පාද!
              </div>
              <div className="sentence-english">
                Head, shoulders, knees, and toes<br />
                Knees and toes!<br />
                Head, shoulders, knees, and toes<br />
                Knees and toes!
              </div>
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
            <div className="activity-card">
              <h3>Color Hunt Game</h3>
              <p>Find things around your room that are:</p>
              <p><strong>රතු (Red):</strong> Apple, fire truck, heart</p>
              <p><strong>නිල් (Blue):</strong> Sky, water, blueberry</p>
              <p><strong>කොළ (Green):</strong> Grass, leaves, frog</p>
              <p><strong>කහ (Yellow):</strong> Sun, banana, lemon</p>
            </div>
            <div className="poem-card">
              <h3>Rainbow Song</h3>
              <div className="sentence-sinhala">
                රතු, තැඹිලි, කහ<br />
                කොළ, නිල්, දම්<br />
                මේ වර්ණ සියල්ලම<br />
                දේදුන්නේ තියෙනවා!
              </div>
              <div className="sentence-english">
                Red, orange, yellow<br />
                Green, blue, purple<br />
                All these colors<br />
                Are in the rainbow!
              </div>
            </div>
          </section>
        );

      case "practice":
        const practiceWords = [
          // Basic greetings
          { sinhala: "ආයුබෝවන්", english: "Hello", pronunciation: "aa-yoo-boh-van" },
          { sinhala: "ස්තූතියි", english: "Thank you", pronunciation: "stoo-thi-yi" },
          { sinhala: "ඔව්", english: "Yes", pronunciation: "ov" },
          { sinhala: "නෑ", english: "No", pronunciation: "nah" },
          // Family words
          { sinhala: "අම්මා", english: "Mother", pronunciation: "am-maa" },
          { sinhala: "තාත්තා", english: "Father", pronunciation: "thaa-thaa" },
          // Animals
          { sinhala: "බල්ලා", english: "Dog", pronunciation: "bal-laa" },
          { sinhala: "පූසා", english: "Cat", pronunciation: "poo-saa" },
          { sinhala: "හාතිය", english: "Elephant", pronunciation: "haa-thi-ya" },
          // Fruits
          { sinhala: "කෙසෙල්", english: "Banana", pronunciation: "ke-sel" },
          { sinhala: "අඹ", english: "Mango", pronunciation: "am-ba" },
          { sinhala: "ඇපල්", english: "Apple", pronunciation: "ae-pal" },
          // Colors
          { sinhala: "රතු", english: "Red", pronunciation: "ra-thu" },
          { sinhala: "නිල්", english: "Blue", pronunciation: "nil" },
          { sinhala: "කොළ", english: "Green", pronunciation: "ko-la" },
          // Numbers
          { sinhala: "එක", english: "One", pronunciation: "e-ka" },
          { sinhala: "දෙක", english: "Two", pronunciation: "de-ka" },
          { sinhala: "තුන", english: "Three", pronunciation: "thu-na" },
          // Body parts
          { sinhala: "ඇස", english: "Eye", pronunciation: "ae-sa" },
          { sinhala: "කන", english: "Ear", pronunciation: "ka-na" },
          { sinhala: "අත", english: "Hand", pronunciation: "a-tha" },
        ];

        return (
          <section className="section active">
            <h2>Speak & Learn - කතා කරමු ඉගෙන ගනිමු</h2>
            <div className="activity-card" style={{ marginBottom: '20px' }}>
              <h3>සිංහලෙන් කතා කරන්න! Practice Speaking Sinhala!</h3>
              <p>Click the <strong>"🎤 කියන්න"</strong> button and say the <strong>Sinhala word</strong> shown.</p>
              <p>The app will listen and check if you said it correctly!</p>
              <p><strong>Important:</strong> Use <strong>Google Chrome</strong> for best Sinhala speech recognition.</p>
            </div>
            <PronunciationPractice
              words={practiceWords}
              title="සිංහලෙන් කතා කරමු!"
            />
          </section>
        );

      case "games":
        return (
          <section className="section active">
            <h2>Fun Learning Games - ක්‍රීඩා</h2>
            <div className="game-card">
              <h3>Letter Matching Game</h3>
              <p>Match the Sinhala letter with its sound! Click to play.</p>
              <div className="activity-card">
                <p>
                  <strong>ක, ම, ස, හ</strong>
                </p>
                <p>Can you match these letters with "ka, ma, sa, ha"?</p>
              </div>
            </div>
            <div className="game-card">
              <h3>Word Hunt</h3>
              <p>Find and count how many animals you learned today!</p>
              <div className="activity-card">
                <p>බල්ලා, පූසා, හාතිය, කුරුල්ලා, සිංහයා, හාවා</p>
                <p>How many animals did you spot? Count them!</p>
              </div>
            </div>
            <div className="game-card">
              <h3>Memory Game</h3>
              <p>Look at these words for 10 seconds, then cover them:</p>
              <div className="activity-card">
                <p><strong>අම්මා, තාත්තා, ගෙදර, බල්ලා, පූසා</strong></p>
                <p>Now write down as many words as you remember!</p>
              </div>
            </div>
            <div className="game-card">
              <h3>Counting Challenge</h3>
              <p>Count the objects in Sinhala:</p>
              <div className="activity-card">
                <p>How many eyes do you have? <strong>දෙක</strong> (Two)</p>
                <p>How many fingers on one hand? <strong>පහ</strong> (Five)</p>
                <p>How many ears do you have? <strong>දෙක</strong> (Two)</p>
              </div>
            </div>
          </section>
        );

      case "songs":
        return (
          <section className="section active">
            <h2>Songs & Rhymes - ගීත සහ කවි</h2>
            <div className="poem-card">
              <h3>Alphabet Song</h3>
              <div className="sentence-sinhala">
                අ ආ ඇ ඈ<br />
                ඉ ඊ උ ඌ<br />
                එන්න කියන්න මෙන්න<br />
                සිංහල හොඳයි!
              </div>
              <div className="sentence-english">
                A, Aa, Ae, Aae<br />
                I, Ii, U, Uu<br />
                Come and say like this<br />
                Sinhala is good!
              </div>
            </div>
            <div className="poem-card">
              <h3>Animal Rhyme</h3>
              <div className="sentence-sinhala">
                හාතිය ලොකුයි<br />
                පූසා කුඩායි<br />
                බල්ලා දුවනවා<br />
                මම හොඳ ළමයෙක්!
              </div>
              <div className="sentence-english">
                Elephant is big<br />
                Cat is small<br />
                Dog is running<br />
                I am a good child!
              </div>
            </div>
            <div className="poem-card">
              <h3>Good Morning Song</h3>
              <div className="sentence-sinhala">
                සුභ උදෑසනක්!<br />
                අම්මට, තාත්තාට<br />
                සුභ උදෑසනක්!<br />
                සියලුදෙනාට!
              </div>
              <div className="sentence-english">
                Good morning!<br />
                To mother, to father<br />
                Good morning!<br />
                To everyone!
              </div>
            </div>
            <div className="poem-card">
              <h3>Counting Rhyme</h3>
              <div className="sentence-sinhala">
                එක දෙක තුන<br />
                හතර පහ හය<br />
                හත අට නවය<br />
                දහය වෙනකන්!
              </div>
              <div className="sentence-english">
                One two three<br />
                Four five six<br />
                Seven eight nine<br />
                Until ten!
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
        <h2>Grade 1 - Basic Sinhala Learning</h2>
        <p>
          Learn letters, numbers, simple words, colors, animals, and fun activities
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        gradeId="g1"
      />

      <ProgressBar progress={14} />

      {renderSection()}
    </div>
  );
};

export default Grade1;
