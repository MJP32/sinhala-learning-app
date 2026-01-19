import React, { useState, useEffect } from "react";
import LetterCard from "../shared/LetterCard";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";
import ReadAloudButton from "../shared/ReadAloudButton";
import InteractiveGames from "../interactive/InteractiveGames";
import SEO, { gradeSEOConfig, generateBreadcrumbs } from "../shared/SEO";

const Grade1 = ({ initialSection }) => {
  const [currentSection, setCurrentSection] = useState("letters");

  // Navigate to section when initialSection prop changes
  useEffect(() => {
    if (initialSection) {
      setCurrentSection(initialSection);
    }
  }, [initialSection]);

  // Section definitions moved to GRADE_SECTIONS config

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
    { sinhala: "එක", english: "One (1)", pronunciation: "eh-kuh", image: "1️⃣" },
    { sinhala: "දෙක", english: "Two (2)", pronunciation: "deh-kuh", image: "2️⃣" },
    { sinhala: "තුන", english: "Three (3)", pronunciation: "thoo-nuh", image: "3️⃣" },
    { sinhala: "හතර", english: "Four (4)", pronunciation: "huh-thuh-ruh", image: "4️⃣" },
    { sinhala: "පහ", english: "Five (5)", pronunciation: "puh-huh", image: "5️⃣" },
    { sinhala: "හය", english: "Six (6)", pronunciation: "huh-yuh", image: "6️⃣" },
    { sinhala: "හත", english: "Seven (7)", pronunciation: "huh-thuh", image: "7️⃣" },
    { sinhala: "අට", english: "Eight (8)", pronunciation: "uh-tuh", image: "8️⃣" },
    { sinhala: "නවය", english: "Nine (9)", pronunciation: "nuh-vuh-yuh", image: "9️⃣" },
    { sinhala: "දහය", english: "Ten (10)", pronunciation: "duh-huh-yuh", image: "🔟" },
  ];

  const familyWords = [
    { sinhala: "අම්මා", english: "Mother", pronunciation: "uhm-maa", image: "👩" },
    { sinhala: "තාත්තා", english: "Father", pronunciation: "thaa-thaa", image: "👨" },
    { sinhala: "සීයා", english: "Grandfather", pronunciation: "see-yaa", image: "👴" },
    { sinhala: "ආච්චි", english: "Grandmother", pronunciation: "aah-chee", image: "👵" },
    { sinhala: "පැටිය", english: "Baby", pronunciation: "pah-tee-yuh", image: "👶" },
    { sinhala: "ගෙදර", english: "Home", pronunciation: "geh-duh-ruh", image: "🏠" },
  ];

  const animals = [
    { sinhala: "බල්ලා", english: "Dog", pronunciation: "buhl-laa", image: "🐕" },
    { sinhala: "පූසා", english: "Cat", pronunciation: "poo-saa", image: "🐱" },
    { sinhala: "හාතිය", english: "Elephant", pronunciation: "haa-thee-yuh", image: "🐘" },
    { sinhala: "කුරුල්ලා", english: "Bird", pronunciation: "koo-rool-laa", image: "🐦" },
    { sinhala: "මාළුවා", english: "Fish", pronunciation: "maa-loo-vaa", image: "🐟" },
    { sinhala: "වඳුරා", english: "Monkey", pronunciation: "vuhn-doo-raa", image: "🐒" },
    { sinhala: "සිංහයා", english: "Lion", pronunciation: "sin-huh-yaa", image: "🦁" },
    { sinhala: "ගවයා", english: "Cow", pronunciation: "guh-vuh-yaa", image: "🐄" },
    { sinhala: "කුකුළා", english: "Rooster", pronunciation: "koo-koo-laa", image: "🐓" },
    { sinhala: "හාවා", english: "Rabbit", pronunciation: "haa-vaa", image: "🐰" },
    { sinhala: "ඉබ්බා", english: "Turtle", pronunciation: "ib-baa", image: "🐢" },
    { sinhala: "සර්පයා", english: "Snake", pronunciation: "sur-puh-yaa", image: "🐍" },
  ];

  const fruits = [
    { sinhala: "ඇපල්", english: "Apple", pronunciation: "ah-puhl", image: "🍎" },
    { sinhala: "කෙසෙල්", english: "Banana", pronunciation: "keh-sehl", image: "🍌" },
    { sinhala: "අඹ", english: "Mango", pronunciation: "uhm-buh", image: "🥭" },
    { sinhala: "පේර", english: "Guava", pronunciation: "pay-ruh", image: "🍐" },
    { sinhala: "අන්නාසි", english: "Pineapple", pronunciation: "uhn-naa-see", image: "🍍" },
    { sinhala: "පොල්", english: "Coconut", pronunciation: "pohl", image: "🥥" },
    { sinhala: "දොඩම්", english: "Orange", pronunciation: "doh-duhm", image: "🍊" },
    { sinhala: "පැපොල්", english: "Papaya", pronunciation: "pah-pohl", image: "🍈" },
    { sinhala: "මිදි", english: "Grapes", pronunciation: "mee-dee", image: "🍇" },
    { sinhala: "කොමඩු", english: "Watermelon", pronunciation: "koh-muh-doo", image: "🍉" },
  ];

  const bodyParts = [
    { sinhala: "ඇස", english: "Eye", pronunciation: "ah-suh", image: "👁️" },
    { sinhala: "නාසය", english: "Nose", pronunciation: "naa-suh-yuh", image: "👃" },
    { sinhala: "කන", english: "Ear", pronunciation: "kuh-nuh", image: "👂" },
    { sinhala: "මුව", english: "Mouth", pronunciation: "moo-vuh", image: "👄" },
    { sinhala: "අත", english: "Hand", pronunciation: "uh-thuh", image: "✋" },
    { sinhala: "පාදය", english: "Foot", pronunciation: "paa-duh-yuh", image: "🦶" },
    { sinhala: "හිස", english: "Head", pronunciation: "hee-suh", image: "🗣️" },
    { sinhala: "කෙස්", english: "Hair", pronunciation: "kehs", image: "💇" },
    { sinhala: "දත්", english: "Teeth", pronunciation: "duhth", image: "🦷" },
    { sinhala: "දිව", english: "Tongue", pronunciation: "dee-vuh", image: "👅" },
    { sinhala: "බඩ", english: "Stomach", pronunciation: "buh-duh", image: "🫃" },
    { sinhala: "පිට", english: "Back", pronunciation: "pee-tuh", image: "🔙" },
  ];

  const colors = [
    { sinhala: "රතු", english: "Red", pronunciation: "ruh-thoo", image: "🔴" },
    { sinhala: "නිල්", english: "Blue", pronunciation: "neel", image: "🔵" },
    { sinhala: "කොළ", english: "Green", pronunciation: "koh-luh", image: "🟢" },
    { sinhala: "කහ", english: "Yellow", pronunciation: "kuh-huh", image: "🟡" },
    { sinhala: "සුදු", english: "White", pronunciation: "soo-doo", image: "⚪" },
    { sinhala: "කළු", english: "Black", pronunciation: "kuh-loo", image: "⚫" },
    { sinhala: "දුඹුරු", english: "Brown", pronunciation: "doom-boo-roo", image: "🟤" },
    { sinhala: "රෝස", english: "Pink", pronunciation: "roh-suh", image: "🩷" },
    { sinhala: "තැඹිලි", english: "Orange", pronunciation: "thahm-bee-lee", image: "🟠" },
    { sinhala: "දම්", english: "Purple", pronunciation: "duhm", image: "🟣" },
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
                  image={num.image}
                />
              ))}
            </div>
            <div className="activity-card">
              <h3>Counting Practice</h3>
              <p>Count along in Sinhala!</p>
              <div className="sentence-sinhala">
                එක, දෙක, තුන, හතර, පහ, හය, හත, අට, නවය, දහය
              </div>
              <ReadAloudButton text="එක, දෙක, තුන, හතර, පහ, හය, හත, අට, නවය, දහය" />
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
                  image={word.image}
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
              <ReadAloudButton text="ආයුබෝවන්! ඔබට කොහොමද?" />
              <div className="sentence-english">
                "Hello! How are you?"
              </div>
              <div className="sentence-sinhala" style={{ marginTop: "10px" }}>
                "මට හොඳින්. ස්තූතියි!"
              </div>
              <ReadAloudButton text="මට හොඳින්. ස්තූතියි!" />
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
                  image={animal.image}
                />
              ))}
            </div>
            <div className="story-card">
              <h3>Animal Story</h3>
              <div className="sentence-sinhala">
                හාතිය ලොකු සතෙක්. බල්ලා කුඩා සතෙක්. සිංහයා වනයේ රජු.
              </div>
              <ReadAloudButton text="හාතිය ලොකු සතෙක්. බල්ලා කුඩා සතෙක්. සිංහයා වනයේ රජු." />
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
                  image={fruit.image}
                />
              ))}
            </div>
            <div className="story-card">
              <h3>Fruit Story</h3>
              <div className="sentence-sinhala">
                මම කෙසෙල් කන්න කැමතියි. අඹ රසයි. පොල් ගෙඩි ලොකුයි.
              </div>
              <ReadAloudButton text="මම කෙසෙල් කන්න කැමතියි. අඹ රසයි. පොල් ගෙඩි ලොකුයි." />
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
                  image={part.image}
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
              <ReadAloudButton text="හිස, උරහිස, දණහිස, පාද. දණහිස, පාද! හිස, උරහිස, දණහිස, පාද. දණහිස, පාද!" />
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
                  image={color.image}
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
              <ReadAloudButton text="රතු, තැඹිලි, කහ. කොළ, නිල්, දම්. මේ වර්ණ සියල්ලම දේදුන්නේ තියෙනවා!" />
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
        // Game data for Grade 1
        const grade1FlashcardData = [
          { id: 1, front: "අම්මා", back: "Mother", pronunciation: "uhm-maa" },
          { id: 2, front: "තාත්තා", back: "Father", pronunciation: "thaa-thaa" },
          { id: 3, front: "බල්ලා", back: "Dog", pronunciation: "bul-laa" },
          { id: 4, front: "පූසා", back: "Cat", pronunciation: "poo-saa" },
          { id: 5, front: "අඹ", back: "Mango", pronunciation: "uhm-buh" },
          { id: 6, front: "කෙසෙල්", back: "Banana", pronunciation: "ke-sel" },
          { id: 7, front: "එක", back: "One", pronunciation: "e-ka" },
          { id: 8, front: "දෙක", back: "Two", pronunciation: "de-ka" },
        ];

        const grade1MatchData = [
          { id: 1, sinhala: "අම්මා", english: "Mother" },
          { id: 2, sinhala: "තාත්තා", english: "Father" },
          { id: 3, sinhala: "බල්ලා", english: "Dog" },
          { id: 4, sinhala: "පූසා", english: "Cat" },
          { id: 5, sinhala: "හාතිය", english: "Elephant" },
          { id: 6, sinhala: "කුරුල්ලා", english: "Bird" },
        ];

        const grade1ScrambleData = [
          { sinhala: "බල්ලා", english: "Dog", hint: "A pet that barks" },
          { sinhala: "පූසා", english: "Cat", hint: "A pet that meows" },
          { sinhala: "අම්මා", english: "Mother", hint: "Your mom" },
          { sinhala: "එක", english: "One", hint: "The first number" },
          { sinhala: "දෙක", english: "Two", hint: "Comes after one" },
        ];

        const grade1SentenceData = [
          { sinhala: "මම හොඳයි", english: "I am good", hint: "Common greeting response" },
          { sinhala: "ඔබට කොහොමද", english: "How are you?", hint: "A greeting question" },
          { sinhala: "බල්ලා ලොකුයි", english: "The dog is big", hint: "About size" },
        ];

        const grade1MemoryData = [
          { id: 1, sinhala: "අම්මා", english: "Mother" },
          { id: 2, sinhala: "තාත්තා", english: "Father" },
          { id: 3, sinhala: "බල්ලා", english: "Dog" },
          { id: 4, sinhala: "පූසා", english: "Cat" },
          { id: 5, sinhala: "එක", english: "One" },
          { id: 6, sinhala: "දෙක", english: "Two" },
          { id: 7, sinhala: "අඹ", english: "Mango" },
          { id: 8, sinhala: "රතු", english: "Red" },
        ];

        const grade1SpeedQuizData = [
          { question: "What is 'Mother' in Sinhala?", questionSi: "'අම්මා' යනු කුමක්ද?", options: ["අම්මා", "තාත්තා", "බල්ලා", "පූසා"], correct: 0 },
          { question: "What is 'Dog' in Sinhala?", questionSi: "'බල්ලා' යනු කුමක්ද?", options: ["පූසා", "බල්ලා", "හාතිය", "කුරුල්ලා"], correct: 1 },
          { question: "What number is 'එක'?", questionSi: "'එක' යනු කුමන අංකයද?", options: ["One", "Two", "Three", "Four"], correct: 0 },
          { question: "What animal is 'හාතිය'?", questionSi: "'හාතිය' යනු කුමන සතෙක්ද?", options: ["Dog", "Cat", "Elephant", "Bird"], correct: 2 },
          { question: "What color is 'රතු'?", questionSi: "'රතු' යනු කුමන වර්ණයද?", options: ["Blue", "Green", "Red", "Yellow"], correct: 2 },
          { question: "What fruit is 'අඹ'?", questionSi: "'අඹ' යනු කුමන ඵලයද?", options: ["Apple", "Mango", "Banana", "Orange"], correct: 1 },
          { question: "What is 'Cat' in Sinhala?", questionSi: "'පූසා' යනු කුමක්ද?", options: ["බල්ලා", "පූසා", "හාතිය", "සිංහයා"], correct: 1 },
          { question: "What is 'Father' in Sinhala?", questionSi: "'තාත්තා' යනු කුමක්ද?", options: ["අම්මා", "තාත්තා", "අයියා", "නංගි"], correct: 1 },
        ];

        const grade1ListeningData = [
          { sinhala: "අම්මා", english: "Mother" },
          { sinhala: "තාත්තා", english: "Father" },
          { sinhala: "බල්ලා", english: "Dog" },
          { sinhala: "පූසා", english: "Cat" },
          { sinhala: "හාතිය", english: "Elephant" },
          { sinhala: "එක", english: "One" },
        ];

        const grade1FillBlankData = [
          { sentence: "මගේ ___ හොඳයි", answer: "අම්මා", options: ["අම්මා", "බල්ලා", "එක"], english: "My mother is good", hint: "A family member" },
          { sentence: "___ ලොකු සතෙක්", answer: "හාතිය", options: ["හාතිය", "පූසා", "හාවා"], english: "Elephant is a big animal", hint: "The largest land animal" },
          { sentence: "මට අවුරුදු ___", answer: "හය", options: ["හය", "සිය", "දහය"], english: "I am six years old", hint: "A number" },
        ];

        return (
          <section className="section active">
            <h2>Fun Learning Games - ක්‍රීඩා</h2>
            <InteractiveGames
              gradeKey="grade1"
              flashcardData={grade1FlashcardData}
              matchData={grade1MatchData}
              scrambleData={grade1ScrambleData}
              sentenceData={grade1SentenceData}
              memoryData={grade1MemoryData}
              speedQuizData={grade1SpeedQuizData}
              listeningData={grade1ListeningData}
              fillBlankData={grade1FillBlankData}
            />
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
              <ReadAloudButton text="අ ආ ඇ ඈ. ඉ ඊ උ ඌ. එන්න කියන්න මෙන්න. සිංහල හොඳයි!" />
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
              <ReadAloudButton text="හාතිය ලොකුයි. පූසා කුඩායි. බල්ලා දුවනවා. මම හොඳ ළමයෙක්!" />
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
              <ReadAloudButton text="සුභ උදෑසනක්! අම්මට, තාත්තාට. සුභ උදෑසනක්! සියලුදෙනාට!" />
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
              <ReadAloudButton text="එක දෙක තුන. හතර පහ හය. හත අට නවය. දහය වෙනකන්!" />
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
            <Quiz questions={quizQuestions} gradeKey="g1" gradeNumber={1} />
          </section>
        );

      default:
        return null;
    }
  };

  // Get SEO config for current section
  const seoConfig = gradeSEOConfig[1];
  const sectionSEO = seoConfig.sections[currentSection] || {};

  return (
    <div className="grade-content active">
      <SEO
        title={sectionSEO.title || seoConfig.title}
        description={sectionSEO.description || seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalPath={`/#grade1-${currentSection}`}
        structuredData={generateBreadcrumbs(1, currentSection)}
      />
      <div className="grade-info-compact">
        <h2>Grade 1 - පළමු ශ්‍රේණිය</h2>
      </div>

      {renderSection()}
    </div>
  );
};

export default Grade1;
