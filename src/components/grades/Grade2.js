import React, { useState, useEffect } from "react";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";
import ReadAloudButton from "../shared/ReadAloudButton";
import SEO, { gradeSEOConfig, generateBreadcrumbs } from "../shared/SEO";

const Grade2 = ({ initialSection }) => {
  const [currentSection, setCurrentSection] = useState("family");

  useEffect(() => {
    if (initialSection) {
      setCurrentSection(initialSection);
    }
  }, [initialSection]);

  // Section definitions moved to GRADE_SECTIONS config

  const practiceWords = [
    { sinhala: "අක්කා", english: "Elder Sister", pronunciation: "uhk-kaa" },
    { sinhala: "මාමා", english: "Uncle", pronunciation: "maa-maa" },
    { sinhala: "රතු", english: "Red", pronunciation: "ruh-thoo" },
    { sinhala: "කොළ", english: "Green", pronunciation: "koh-luh" },
    { sinhala: "බත්", english: "Rice", pronunciation: "buhth" },
    { sinhala: "කිරි", english: "Milk", pronunciation: "kee-ree" },
    { sinhala: "හිරු", english: "Sun", pronunciation: "hee-roo" },
    { sinhala: "වැස්ස", english: "Rain", pronunciation: "vahs-suh" },
    { sinhala: "ඉරිදා", english: "Sunday", pronunciation: "ee-ree-daa" },
    { sinhala: "සඳුදා", english: "Monday", pronunciation: "suhn-doo-daa" },
  ];

  const familyWords = [
    { sinhala: "අක්කා", english: "Elder Sister", pronunciation: "uhk-kaa", image: "👧" },
    { sinhala: "අයියා", english: "Elder Brother", pronunciation: "eye-yaa", image: "👦" },
    { sinhala: "නංගි", english: "Younger Sister", pronunciation: "nuhn-gee", image: "👧" },
    { sinhala: "මල්ලි", english: "Younger Brother", pronunciation: "muhl-lee", image: "👦" },
    { sinhala: "මාමා", english: "Uncle", pronunciation: "maa-maa", image: "👨" },
    { sinhala: "නැන්දා", english: "Aunt", pronunciation: "nahn-daa", image: "👩" },
    { sinhala: "මස්සිනා", english: "Cousin (male)", pronunciation: "muhs-see-naa", image: "🧑" },
    { sinhala: "නෑනා", english: "Cousin (female)", pronunciation: "nah-naa", image: "👩" },
    { sinhala: "බාප්පා", english: "Father's Brother", pronunciation: "baap-paa", image: "👨" },
    { sinhala: "පුංචි අම්මා", english: "Mother's Sister", pronunciation: "poon-chee uhm-maa", image: "👩" },
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
    { sinhala: "අළු", english: "Gray", pronunciation: "uh-loo", image: "🩶" },
    { sinhala: "රන්", english: "Gold", pronunciation: "ruhn", image: "🥇" },
  ];

  const numbersAdvanced = [
    { sinhala: "එකොළහ", english: "Eleven (11)", pronunciation: "eh-koh-luh-huh" },
    { sinhala: "දොළහ", english: "Twelve (12)", pronunciation: "doh-luh-huh" },
    { sinhala: "දහතුන", english: "Thirteen (13)", pronunciation: "duh-huh-thoo-nuh" },
    { sinhala: "දහහතර", english: "Fourteen (14)", pronunciation: "duh-huh-huh-thuh-ruh" },
    { sinhala: "පහළොව", english: "Fifteen (15)", pronunciation: "puh-huh-loh-vuh" },
    { sinhala: "දහසය", english: "Sixteen (16)", pronunciation: "duh-huh-suh-yuh" },
    { sinhala: "දහහත", english: "Seventeen (17)", pronunciation: "duh-huh-huh-thuh" },
    { sinhala: "දහඅට", english: "Eighteen (18)", pronunciation: "duh-huh-uh-tuh" },
    { sinhala: "දහනවය", english: "Nineteen (19)", pronunciation: "duh-huh-nuh-vuh-yuh" },
    { sinhala: "විස්ස", english: "Twenty (20)", pronunciation: "vis-suh" },
  ];

  const daysOfWeek = [
    { sinhala: "ඉරිදා", english: "Sunday", pronunciation: "ee-ree-daa" },
    { sinhala: "සඳුදා", english: "Monday", pronunciation: "suhn-doo-daa" },
    { sinhala: "අඟහරුවාදා", english: "Tuesday", pronunciation: "uhn-guh-huh-roo-vaa-daa" },
    { sinhala: "බදාදා", english: "Wednesday", pronunciation: "buh-daa-daa" },
    { sinhala: "බ්‍රහස්පතින්දා", english: "Thursday", pronunciation: "bruh-huhs-puh-theen-daa" },
    { sinhala: "සිකුරාදා", english: "Friday", pronunciation: "see-koo-raa-daa" },
    { sinhala: "සෙනසුරාදා", english: "Saturday", pronunciation: "seh-nuh-soo-raa-daa" },
  ];

  const months = [
    { sinhala: "ජනවාරි", english: "January", pronunciation: "juh-nuh-vaa-ree" },
    { sinhala: "පෙබරවාරි", english: "February", pronunciation: "peh-buh-ruh-vaa-ree" },
    { sinhala: "මාර්තු", english: "March", pronunciation: "maar-thoo" },
    { sinhala: "අප්‍රේල්", english: "April", pronunciation: "uhp-rayl" },
    { sinhala: "මැයි", english: "May", pronunciation: "mah-yee" },
    { sinhala: "ජූනි", english: "June", pronunciation: "joo-nee" },
  ];

  const food = [
    { sinhala: "බත්", english: "Rice", pronunciation: "buhth", image: "🍚" },
    { sinhala: "පාන්", english: "Bread", pronunciation: "paan", image: "🍞" },
    { sinhala: "කිරි", english: "Milk", pronunciation: "kee-ree", image: "🥛" },
    { sinhala: "බිත්තර", english: "Egg", pronunciation: "bith-thuh-ruh", image: "🥚" },
    { sinhala: "මාළු", english: "Fish", pronunciation: "maa-loo", image: "🐟" },
    { sinhala: "මස්", english: "Meat", pronunciation: "muhs", image: "🍖" },
    { sinhala: "එළවළු", english: "Vegetables", pronunciation: "eh-luh-vuh-loo", image: "🥬" },
    { sinhala: "වතුර", english: "Water", pronunciation: "vuh-thoo-ruh", image: "💧" },
    { sinhala: "තේ", english: "Tea", pronunciation: "thay", image: "🍵" },
    { sinhala: "කෝපි", english: "Coffee", pronunciation: "koh-pee", image: "☕" },
    { sinhala: "සීනි", english: "Sugar", pronunciation: "see-nee", image: "🍬" },
    { sinhala: "ලුණු", english: "Salt", pronunciation: "loo-noo", image: "🧂" },
  ];

  const weather = [
    { sinhala: "හිරු", english: "Sun", pronunciation: "hee-roo", image: "☀️" },
    { sinhala: "වැස්ස", english: "Rain", pronunciation: "vahs-suh", image: "🌧️" },
    { sinhala: "වලාකුළු", english: "Clouds", pronunciation: "vuh-laa-koo-loo", image: "☁️" },
    { sinhala: "සුළඟ", english: "Wind", pronunciation: "soo-luhn-guh", image: "💨" },
    { sinhala: "අකුණු", english: "Lightning", pronunciation: "uh-koo-noo", image: "⚡" },
    { sinhala: "ගිගුරුම්", english: "Thunder", pronunciation: "gee-goo-room", image: "🌩️" },
    { sinhala: "උණුසුම්", english: "Hot", pronunciation: "oo-noo-soom", image: "🥵" },
    { sinhala: "සීතල", english: "Cold", pronunciation: "see-thuh-luh", image: "🥶" },
    { sinhala: "දේදුන්න", english: "Rainbow", pronunciation: "day-doon-nuh", image: "🌈" },
    { sinhala: "හිම", english: "Snow", pronunciation: "hee-muh", image: "❄️" },
  ];

  const schoolItems = [
    { sinhala: "පොත", english: "Book", pronunciation: "poh-thuh", image: "📚" },
    { sinhala: "පෑන", english: "Pen", pronunciation: "pah-nuh", image: "🖊️" },
    { sinhala: "පැන්සල", english: "Pencil", pronunciation: "pahn-suh-luh", image: "✏️" },
    { sinhala: "මකනය", english: "Eraser", pronunciation: "muh-kuh-nuh-yuh", image: "🧽" },
    { sinhala: "රූලරය", english: "Ruler", pronunciation: "roo-luh-ruh-yuh", image: "📏" },
    { sinhala: "බෑගය", english: "Bag", pronunciation: "bah-guh-yuh", image: "🎒" },
    { sinhala: "පන්තිය", english: "Class", pronunciation: "puhn-thee-yuh", image: "🏫" },
    { sinhala: "ගුරුවරයා", english: "Teacher (male)", pronunciation: "goo-roo-vuh-ruh-yaa", image: "👨‍🏫" },
    { sinhala: "ගුරුවරිය", english: "Teacher (female)", pronunciation: "goo-roo-vuh-ree-yuh", image: "👩‍🏫" },
    { sinhala: "ශිෂ්‍යයා", english: "Student", pronunciation: "shish-yuh-yaa", image: "👨‍🎓" },
    { sinhala: "පාඩම", english: "Lesson", pronunciation: "paa-duh-muh", image: "📖" },
    { sinhala: "විභාගය", english: "Exam", pronunciation: "vee-bhaa-guh-yuh", image: "📝" },
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
    {
      question: 'What day is "ඉරිදා"?',
      options: ["Monday", "Friday", "Sunday", "Saturday"],
      correct: 2,
    },
    {
      question: 'What is "බත්" in English?',
      options: ["Bread", "Rice", "Milk", "Water"],
      correct: 1,
    },
    {
      question: 'What does "වැස්ස" mean?',
      options: ["Sun", "Wind", "Rain", "Cloud"],
      correct: 2,
    },
    {
      question: 'What number is "පහළොව"?',
      options: ["Thirteen", "Fourteen", "Fifteen", "Sixteen"],
      correct: 2,
    },
    {
      question: 'What does "පොත" mean?',
      options: ["Pen", "Pencil", "Book", "Bag"],
      correct: 2,
    },
    {
      question: 'What family member is "මාමා"?',
      options: ["Father", "Uncle", "Brother", "Cousin"],
      correct: 1,
    },
    {
      question: 'What day is "සෙනසුරාදා"?',
      options: ["Friday", "Saturday", "Sunday", "Monday"],
      correct: 1,
    },
    {
      question: 'What color is "කළු"?',
      options: ["White", "Gray", "Black", "Brown"],
      correct: 2,
    },
    {
      question: 'What is "කිරි" in English?',
      options: ["Water", "Tea", "Milk", "Coffee"],
      correct: 2,
    },
    {
      question: 'What does "හිරු" mean?',
      options: ["Moon", "Star", "Sun", "Sky"],
      correct: 2,
    },
    {
      question: 'What number is "විස්ස"?',
      options: ["Fifteen", "Eighteen", "Nineteen", "Twenty"],
      correct: 3,
    },
    {
      question: 'What does "ගුරුවරයා" mean?',
      options: ["Student", "Teacher", "Principal", "Friend"],
      correct: 1,
    },
    {
      question: 'What is "දේදුන්න" in English?',
      options: ["Lightning", "Thunder", "Rainbow", "Cloud"],
      correct: 2,
    },
    {
      question: 'What food is "බිත්තර"?',
      options: ["Fish", "Meat", "Egg", "Vegetable"],
      correct: 2,
    },
    {
      question: 'What does "නංගි" mean?',
      options: ["Elder Sister", "Younger Sister", "Cousin", "Aunt"],
      correct: 1,
    },
    {
      question: 'What is "පෑන" in English?',
      options: ["Pencil", "Pen", "Eraser", "Ruler"],
      correct: 1,
    },
    {
      question: 'What month is "ජනවාරි"?',
      options: ["February", "March", "January", "April"],
      correct: 2,
    },
    {
      question: 'What does "සීතල" mean?',
      options: ["Hot", "Warm", "Cold", "Cool"],
      correct: 2,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "family":
        return (
          <section className="section active">
            <h2>Extended Family - විස්තාරිත පවුල</h2>
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
            <div className="activity-card">
              <h3>Family Tree Activity</h3>
              <p>Draw your family tree and label each member in Sinhala!</p>
              <p><strong>Example:</strong></p>
              <p>සීයා + ආච්චි (Grandparents)</p>
              <p>↓</p>
              <p>අම්මා + තාත්තා (Parents)</p>
              <p>↓</p>
              <p>මම, අක්කා, මල්ලි (Me, Elder Sister, Younger Brother)</p>
            </div>
            <div className="story-card">
              <h3>My Family</h3>
              <div className="sentence-sinhala">
                මගේ පවුලේ හය දෙනෙක් ඉන්නවා. අම්මා, තාත්තා, අක්කා, මල්ලි, මම සහ ආච්චි.
                අපි සතුටින් ජීවත් වෙනවා.
              </div>
              <ReadAloudButton text="මගේ පවුලේ හය දෙනෙක් ඉන්නවා. අම්මා, තාත්තා, අක්කා, මල්ලි, මම සහ ආච්චි. අපි සතුටින් ජීවත් වෙනවා." />
              <div className="sentence-english">
                There are six people in my family. Mother, father, elder sister, younger brother, me, and grandmother.
                We live happily.
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
              <h3>Color Sentences</h3>
              <p>Practice using colors in sentences:</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">ඇපල් රතු පාටයි.</div>
                <div className="sentence-english">The apple is red.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">අහස නිල් පාටයි.</div>
                <div className="sentence-english">The sky is blue.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">කෙසෙල් කහ පාටයි.</div>
                <div className="sentence-english">Bananas are yellow.</div>
              </div>
            </div>
            <div className="game-card">
              <h3>Color Hunt Game</h3>
              <p>Find objects of each color around you!</p>
              <p><strong>Challenge:</strong> Find 3 things of each color and say them in Sinhala!</p>
            </div>
          </section>
        );

      case "numbers":
        return (
          <section className="section active">
            <h2>Numbers 11-20 - අංක 11-20</h2>
            <div className="word-grid">
              {numbersAdvanced.map((num, index) => (
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
              <p>Count from 11 to 20 in Sinhala:</p>
              <div className="sentence-sinhala">
                එකොළහ, දොළහ, දහතුන, දහහතර, පහළොව, දහසය, දහහත, දහඅට, දහනවය, විස්ස
              </div>
              <ReadAloudButton text="එකොළහ, දොළහ, දහතුන, දහහතර, පහළොව, දහසය, දහහත, දහඅට, දහනවය, විස්ස" />
            </div>
            <div className="activity-card">
              <h3>Math in Sinhala</h3>
              <p>Try these simple additions:</p>
              <p><strong>දහය + එක = ?</strong> (10 + 1 = 11 = එකොළහ)</p>
              <p><strong>දහය + පහ = ?</strong> (10 + 5 = 15 = පහළොව)</p>
              <p><strong>දහය + දහය = ?</strong> (10 + 10 = 20 = විස්ස)</p>
            </div>
          </section>
        );

      case "days":
        return (
          <section className="section active">
            <h2>Days & Months - දින සහ මාස</h2>
            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Days of the Week - සතියේ දින
            </h3>
            <div className="word-grid">
              {daysOfWeek.map((day, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={day.sinhala}
                  englishWord={day.english}
                  pronunciation={day.pronunciation}
                />
              ))}
            </div>
            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Months - මාස
            </h3>
            <div className="word-grid">
              {months.map((month, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={month.sinhala}
                  englishWord={month.english}
                  pronunciation={month.pronunciation}
                />
              ))}
            </div>
            <div className="activity-card">
              <h3>Today's Date</h3>
              <p>Practice saying today's date in Sinhala:</p>
              <div className="sentence-sinhala">අද ඉරිදා. මාසය ජනවාරි.</div>
              <ReadAloudButton text="අද ඉරිදා. මාසය ජනවාරි." />
              <div className="sentence-english">Today is Sunday. The month is January.</div>
            </div>
            <div className="poem-card">
              <h3>Days of the Week Song</h3>
              <div className="sentence-sinhala">
                ඉරිදා, සඳුදා<br />
                අඟහරුවාදා, බදාදා<br />
                බ්‍රහස්පතින්දා, සිකුරාදා<br />
                සෙනසුරාදා!
              </div>
              <ReadAloudButton text="ඉරිදා, සඳුදා. අඟහරුවාදා, බදාදා. බ්‍රහස්පතින්දා, සිකුරාදා. සෙනසුරාදා!" />
              <div className="sentence-english">
                Sunday, Monday<br />
                Tuesday, Wednesday<br />
                Thursday, Friday<br />
                Saturday!
              </div>
            </div>
          </section>
        );

      case "food":
        return (
          <section className="section active">
            <h2>Food & Drinks - ආහාර සහ පාන</h2>
            <div className="word-grid">
              {food.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                  image={item.image}
                />
              ))}
            </div>
            <div className="story-card">
              <h3>Breakfast Time</h3>
              <div className="sentence-sinhala">
                උදේ මම පාන් කනවා. කිරි බොනවා. අම්මා තේ බොනවා. තාත්තා බිත්තර කනවා.
              </div>
              <ReadAloudButton text="උදේ මම පාන් කනවා. කිරි බොනවා. අම්මා තේ බොනවා. තාත්තා බිත්තර කනවා." />
              <div className="sentence-english">
                In the morning I eat bread. I drink milk. Mother drinks tea. Father eats eggs.
              </div>
            </div>
            <div className="activity-card">
              <h3>Menu Activity</h3>
              <p>Create your own menu in Sinhala!</p>
              <p><strong>උදේ ආහාරය (Breakfast):</strong> පාන්, බිත්තර, කිරි</p>
              <p><strong>දහවල් ආහාරය (Lunch):</strong> බත්, මාළු, එළවළු</p>
              <p><strong>රාත්‍රී ආහාරය (Dinner):</strong> බත්, මස්, එළවළු</p>
            </div>
            <div className="activity-card">
              <h3>Food Sentences</h3>
              <p>Practice these sentences:</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">මට බත් කන්න ඕනේ.</div>
                <div className="sentence-english">I want to eat rice.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">මට වතුර බොන්න ඕනේ.</div>
                <div className="sentence-english">I want to drink water.</div>
              </div>
            </div>
          </section>
        );

      case "weather":
        return (
          <section className="section active">
            <h2>Weather - කාලගුණය</h2>
            <div className="word-grid">
              {weather.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                  image={item.image}
                />
              ))}
            </div>
            <div className="activity-card">
              <h3>Weather Sentences</h3>
              <div className="sentence-practice">
                <div className="sentence-sinhala">අද හිරු එළියයි.</div>
                <div className="sentence-english">Today is sunny.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">වැස්ස එනවා.</div>
                <div className="sentence-english">It is raining.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">සුළඟ හමනවා.</div>
                <div className="sentence-english">The wind is blowing.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">අද සීතලයි.</div>
                <div className="sentence-english">Today is cold.</div>
              </div>
            </div>
            <div className="poem-card">
              <h3>Weather Poem</h3>
              <div className="sentence-sinhala">
                හිරු එළිය ලස්සනයි<br />
                වැස්ස ගසට හොඳයි<br />
                සුළඟ සිසිලයි<br />
                දේදුන්න ලස්සනයි!
              </div>
              <ReadAloudButton text="හිරු එළිය ලස්සනයි. වැස්ස ගසට හොඳයි. සුළඟ සිසිලයි. දේදුන්න ලස්සනයි!" />
              <div className="sentence-english">
                Sunshine is beautiful<br />
                Rain is good for trees<br />
                Wind is cool<br />
                Rainbow is beautiful!
              </div>
            </div>
          </section>
        );

      case "school":
        return (
          <section className="section active">
            <h2>School - පාසල</h2>
            <div className="word-grid">
              {schoolItems.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                  image={item.image}
                />
              ))}
            </div>
            <div className="story-card">
              <h3>My School Day</h3>
              <div className="sentence-sinhala">
                මම උදේ පාසලට යනවා. මගේ බෑගයේ පොත්, පෑන, පැන්සල තියෙනවා.
                ගුරුතුමිය පාඩම් කියා දෙනවා. මම හොඳින් ඉගෙන ගන්නවා.
              </div>
              <ReadAloudButton text="මම උදේ පාසලට යනවා. මගේ බෑගයේ පොත්, පෑන, පැන්සල තියෙනවා. ගුරුතුමිය පාඩම් කියා දෙනවා. මම හොඳින් ඉගෙන ගන්නවා." />
              <div className="sentence-english">
                I go to school in the morning. In my bag there are books, pen, and pencil.
                The teacher teaches lessons. I learn well.
              </div>
            </div>
            <div className="activity-card">
              <h3>School Dialogue</h3>
              <div className="sentence-practice">
                <div className="sentence-sinhala">ගුරුතුමනි, මට පෑන දෙන්න.</div>
                <div className="sentence-english">Teacher, please give me a pen.</div>
              </div>
              <div className="sentence-practice">
                <div className="sentence-sinhala">ස්තූතියි ගුරුතුමනි.</div>
                <div className="sentence-english">Thank you, teacher.</div>
              </div>
            </div>
          </section>
        );

      case "sentences":
        return (
          <section className="section active">
            <h2>Simple Sentences - සරල වාක්‍ය</h2>
            <div className="grammar-box">
              <h4>Basic Sentence Structure</h4>
              <p>Subject + Object + Verb</p>
              <p><strong>මම + පොත + කියවනවා = මම පොත කියවනවා</strong></p>
              <p>(I + book + read = I read a book)</p>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">මම පාසලට යනවා.</div>
              <div className="sentence-english">I go to school.</div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">අම්මා බත් උයනවා.</div>
              <div className="sentence-english">Mother cooks rice.</div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">බල්ලා දුවනවා.</div>
              <div className="sentence-english">The dog runs.</div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">ළමයා සෙල්ලම් කරනවා.</div>
              <div className="sentence-english">The child plays.</div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">තාත්තා වැඩ කරනවා.</div>
              <div className="sentence-english">Father works.</div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">මම වතුර බොනවා.</div>
              <div className="sentence-english">I drink water.</div>
            </div>
            <div className="activity-card">
              <h3>Make Your Own Sentences</h3>
              <p>Use these words to make sentences:</p>
              <p><strong>Subject:</strong> මම, අම්මා, තාත්තා, බල්ලා, ළමයා</p>
              <p><strong>Verb:</strong> කනවා (eat), බොනවා (drink), යනවා (go), නිදනවා (sleep)</p>
            </div>
          </section>
        );

      case "stories":
        return (
          <section className="section active">
            <h2>Short Stories - කෙටි කතා</h2>
            <div className="story-card">
              <h3>The Friendly Dog</h3>
              <div className="reading-sinhala">
                ටොමි කුඩා බල්ලෙක්. ඔහු ගොඩක් හොඳයි. ටොමි ළමයින් සමඟ සෙල්ලම් කරනවා.
                ඔහු වලිගය සොලවනවා. සියලුදෙනා ටොමිට ආදරේ කරනවා.
              </div>
              <ReadAloudButton text="ටොමි කුඩා බල්ලෙක්. ඔහු ගොඩක් හොඳයි. ටොමි ළමයින් සමඟ සෙල්ලම් කරනවා. ඔහු වලිගය සොලවනවා. සියලුදෙනා ටොමිට ආදරේ කරනවා." />
              <div className="reading-english">
                Tommy is a small dog. He is very good. Tommy plays with children.
                He wags his tail. Everyone loves Tommy.
              </div>
            </div>
            <div className="story-card">
              <h3>The Big Elephant</h3>
              <div className="reading-sinhala">
                හාතිය ලොකු සතෙක්. ඔහුට දිග නාසයක් තියෙනවා. හාතිය පාර දෙපස ඇවිදිනවා.
                ඔහු වතුර බොනවා. ඔහු ගස් කොළ කනවා.
              </div>
              <ReadAloudButton text="හාතිය ලොකු සතෙක්. ඔහුට දිග නාසයක් තියෙනවා. හාතිය පාර දෙපස ඇවිදිනවා. ඔහු වතුර බොනවා. ඔහු ගස් කොළ කනවා." />
              <div className="reading-english">
                The elephant is a big animal. He has a long nose. The elephant walks on both sides of the road.
                He drinks water. He eats tree leaves.
              </div>
            </div>
            <div className="story-card">
              <h3>My Best Friend</h3>
              <div className="reading-sinhala">
                මගේ හොඳම යාළුවා කමල්. අපි එකට පාසලට යනවා. අපි එකට සෙල්ලම් කරනවා.
                කමල් හොඳ ළමයෙක්. මම කමල්ට ආදරේ කරනවා.
              </div>
              <ReadAloudButton text="මගේ හොඳම යාළුවා කමල්. අපි එකට පාසලට යනවා. අපි එකට සෙල්ලම් කරනවා. කමල් හොඳ ළමයෙක්. මම කමල්ට ආදරේ කරනවා." />
              <div className="reading-english">
                My best friend is Kamal. We go to school together. We play together.
                Kamal is a good boy. I love Kamal.
              </div>
            </div>
            <div className="activity-card">
              <h3>Story Questions</h3>
              <p>Answer these questions about the stories:</p>
              <p>1. What is the dog's name?</p>
              <p>2. What does the elephant eat?</p>
              <p>3. What is the best friend's name?</p>
            </div>
          </section>
        );

      case "practice":
        return (
          <section className="section active">
            <h2>Speak & Learn - කතා කරමින් ඉගෙන ගන්න</h2>
            <PronunciationPractice
              words={practiceWords}
              title="Practice Grade 2 Words / පන්ති 2 වචන පුහුණුව"
            />
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Grade 2 Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g2" gradeNumber={2} />
          </section>
        );

      default:
        return null;
    }
  };

  // Get SEO config for current section
  const seoConfig = gradeSEOConfig[2];
  const sectionSEO = seoConfig.sections[currentSection] || {};

  return (
    <div className="grade-content active">
      <SEO
        title={sectionSEO.title || seoConfig.title}
        description={sectionSEO.description || seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalPath={`/#grade2-${currentSection}`}
        structuredData={generateBreadcrumbs(2, currentSection)}
      />
      <div className="grade-info-compact">
        <h2>Grade 2 - දෙවන ශ්‍රේණිය</h2>
      </div>

      {renderSection()}
    </div>
  );
};

export default Grade2;
