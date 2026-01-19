import React, { useState, useEffect } from "react";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";
import ReadAloudButton from "../shared/ReadAloudButton";
import SEO, { gradeSEOConfig, generateBreadcrumbs } from "../shared/SEO";

const Grade4 = ({ initialSection }) => {
  const [currentSection, setCurrentSection] = useState("reading");

  useEffect(() => {
    if (initialSection) {
      setCurrentSection(initialSection);
    }
  }, [initialSection]);

  // Section definitions moved to GRADE_SECTIONS config

  const practiceWords = [
    { sinhala: "අනුරාධපුරය", english: "Anuradhapura", pronunciation: "uh-noo-raa-duh-poo-ruh-yuh" },
    { sinhala: "සිගිරිය", english: "Sigiriya", pronunciation: "see-gee-ree-yuh" },
    { sinhala: "සතුට", english: "Happiness", pronunciation: "suh-thoo-tuh" },
    { sinhala: "දුක", english: "Sadness", pronunciation: "doo-kuh" },
    { sinhala: "කඳු", english: "Mountains", pronunciation: "kuhn-doo" },
    { sinhala: "ගංගා", english: "Rivers", pronunciation: "guhn-gaa" },
    { sinhala: "කිරි බත්", english: "Milk Rice", pronunciation: "kee-ree buht" },
    { sinhala: "පෙරහර", english: "Procession", pronunciation: "peh-ruh-huh-ruh" },
    { sinhala: "අත්දැකීම", english: "Experience", pronunciation: "uhth-deh-kee-muh" },
    { sinhala: "සාර්ථකත්වය", english: "Success", pronunciation: "saar-thuh-kuh-thvuh-yuh" },
  ];

  // Cultural items - expanded
  const culturalItems = [
    { sinhala: "කිරි බත්", english: "Milk Rice", pronunciation: "kee-ree buht", image: "🍚" },
    { sinhala: "කොකිස්", english: "Oil Cakes", pronunciation: "koh-kis", image: "🍪" },
    { sinhala: "වෙසක් කුඩු", english: "Vesak Lantern", pronunciation: "veh-suhk koo-doo", image: "🏮" },
    { sinhala: "පෙරහර", english: "Procession", pronunciation: "peh-ruh-huh-ruh", image: "🎭" },
    { sinhala: "කන්දියන් නර්තනය", english: "Kandyan Dance", pronunciation: "kuhn-dee-yuhn nur-thuh-nuh-yuh", image: "💃" },
    { sinhala: "ඇලවතුර", english: "Traditional Sweet", pronunciation: "ah-luh-vuh-thoo-ruh", image: "🍬" },
    { sinhala: "අවුරුදු කුමාරි", english: "New Year Queen", pronunciation: "uh-voo-roo-doo koo-maa-ree", image: "👸" },
    { sinhala: "ගෙදර ඔලුව", english: "Coconut Splashing", pronunciation: "geh-duh-ruh oh-loo-vuh", image: "🥥" },
    { sinhala: "බණ", english: "Buddhist Sermon", pronunciation: "buh-nuh", image: "🙏" },
    { sinhala: "පිරිත්", english: "Pirith Chanting", pronunciation: "pee-rith", image: "📿" },
    { sinhala: "සිල්", english: "Religious Observance", pronunciation: "seel", image: "🧘" },
    { sinhala: "දන්සල", english: "Free Food Stall", pronunciation: "duhn-suh-luh", image: "🍽️" },
  ];

  // Historical places - expanded
  const historicalPlaces = [
    { sinhala: "අනුරාධපුරය", english: "Anuradhapura", pronunciation: "uh-noo-raa-duh-poo-ruh-yuh", image: "🏛️" },
    { sinhala: "පොළොන්නරුව", english: "Polonnaruwa", pronunciation: "poh-lohn-nuh-roo-vuh", image: "🏯" },
    { sinhala: "සිගිරිය", english: "Sigiriya", pronunciation: "see-gee-ree-yuh", image: "🗿" },
    { sinhala: "මිහින්තලේ", english: "Mihintale", pronunciation: "mee-heen-thuh-lay", image: "⛰️" },
    { sinhala: "දළදා මාලිගාව", english: "Temple of Tooth", pronunciation: "duh-luh-daa maa-lee-gaa-vuh", image: "🛕" },
    { sinhala: "ගාල්ල කොටුව", english: "Galle Fort", pronunciation: "gaal-luh koh-too-vuh", image: "🏰" },
    { sinhala: "යාපනය", english: "Jaffna", pronunciation: "yaa-puh-nuh-yuh", image: "🌴" },
    { sinhala: "නුවර", english: "Kandy", pronunciation: "noo-vuh-ruh", image: "🏔️" },
    { sinhala: "කොළඹ", english: "Colombo", pronunciation: "koh-luhm-buh", image: "🏙️" },
    { sinhala: "ත්‍රිකුණාමලය", english: "Trincomalee", pronunciation: "tree-koo-naa-muh-luh-yuh", image: "⚓" },
    { sinhala: "මාතර", english: "Matara", pronunciation: "maa-thuh-ruh", image: "🌊" },
    { sinhala: "රත්නපුරය", english: "Ratnapura", pronunciation: "ruht-nuh-poo-ruh-yuh", image: "💎" },
  ];

  // Emotions vocabulary
  const emotions = [
    { sinhala: "සතුට", english: "Happiness", pronunciation: "suh-thoo-tuh", image: "😊" },
    { sinhala: "දුක", english: "Sadness", pronunciation: "doo-kuh", image: "😢" },
    { sinhala: "කෝපය", english: "Anger", pronunciation: "koh-puh-yuh", image: "😠" },
    { sinhala: "බය", english: "Fear", pronunciation: "buh-yuh", image: "😨" },
    { sinhala: "ආදරය", english: "Love", pronunciation: "aa-duh-ruh-yuh", image: "❤️" },
    { sinhala: "පුදුම", english: "Surprise", pronunciation: "poo-doo-muh", image: "😲" },
    { sinhala: "ලැජ්ජාව", english: "Shame/Shyness", pronunciation: "lej-jaa-vuh", image: "😳" },
    { sinhala: "ඊර්ෂ්‍යාව", english: "Jealousy", pronunciation: "eer-shyaa-vuh", image: "😒" },
    { sinhala: "කම්මැලි", english: "Laziness", pronunciation: "kuhm-meh-lee", image: "😴" },
    { sinhala: "විස්මය", english: "Wonder", pronunciation: "vis-muh-yuh", image: "🤩" },
    { sinhala: "සැනසීම", english: "Relief", pronunciation: "seh-nuh-see-muh", image: "😌" },
    { sinhala: "අසරණ", english: "Helpless", pronunciation: "uh-suh-ruh-nuh", image: "😞" },
  ];

  // Nature vocabulary
  const nature = [
    { sinhala: "කඳු", english: "Mountains", pronunciation: "kuhn-doo", image: "⛰️" },
    { sinhala: "ගඟ", english: "River", pronunciation: "guh-nguh", image: "🏞️" },
    { sinhala: "මුහුද", english: "Ocean/Sea", pronunciation: "moo-hoo-duh", image: "🌊" },
    { sinhala: "වනාන්තරය", english: "Forest", pronunciation: "vuh-naan-thuh-ruh-yuh", image: "🌳" },
    { sinhala: "අහස", english: "Sky", pronunciation: "uh-huh-suh", image: "🌤️" },
    { sinhala: "වළාකුළු", english: "Clouds", pronunciation: "vuh-laa-koo-loo", image: "☁️" },
    { sinhala: "තාරකා", english: "Stars", pronunciation: "thaa-ruh-kaa", image: "⭐" },
    { sinhala: "සඳ", english: "Moon", pronunciation: "suhn-duh", image: "🌙" },
    { sinhala: "හිරු", english: "Sun", pronunciation: "hee-roo", image: "☀️" },
    { sinhala: "වැසි", english: "Rain", pronunciation: "veh-see", image: "🌧️" },
    { sinhala: "සුළඟ", english: "Wind", pronunciation: "soo-luh-nguh", image: "💨" },
    { sinhala: "දිය ඇල්ල", english: "Waterfall", pronunciation: "dee-yuh ehl-luh", image: "🏔️" },
  ];

  // Spices and products
  const spicesProducts = [
    { sinhala: "ගම්මිරිස්", english: "Cinnamon", pronunciation: "guhm-mee-ris", image: "🪵" },
    { sinhala: "කරපිංචා", english: "Curry Leaves", pronunciation: "kuh-ruh-peen-chaa", image: "🌿" },
    { sinhala: "කහ", english: "Turmeric", pronunciation: "kuh-huh", image: "🟡" },
    { sinhala: "සුදු ළූණු", english: "Garlic", pronunciation: "soo-doo loo-noo", image: "🧄" },
    { sinhala: "රතු ළූණු", english: "Red Onion", pronunciation: "ruh-thoo loo-noo", image: "🧅" },
    { sinhala: "ඉඟුරු", english: "Ginger", pronunciation: "in-goo-roo", image: "🫚" },
    { sinhala: "තේ", english: "Tea", pronunciation: "thay", image: "🍵" },
    { sinhala: "පොල්", english: "Coconut", pronunciation: "pohl", image: "🥥" },
    { sinhala: "වී", english: "Paddy/Rice", pronunciation: "vee", image: "🌾" },
    { sinhala: "මිරිස්", english: "Chilli", pronunciation: "mee-ris", image: "🌶️" },
    { sinhala: "සාදික්කා", english: "Nutmeg", pronunciation: "saa-dik-kaa", image: "🫛" },
    { sinhala: "එනසාල්", english: "Cardamom", pronunciation: "eh-nuh-saal", image: "🌱" },
  ];

  // Sinhala proverbs
  const proverbs = [
    {
      sinhala: "ඉගෙන ගන්නට වයස නෑ",
      english: "There is no age limit for learning",
      meaning: "You can learn at any age",
    },
    {
      sinhala: "ගිනි නැති තැන දුම නෑ",
      english: "There is no smoke without fire",
      meaning: "Every rumor has some truth",
    },
    {
      sinhala: "අත්තනෝමතිකමට සීමාවක් නෑ",
      english: "Pride has no limit",
      meaning: "Warn against excessive pride",
    },
    {
      sinhala: "කෙළින් ඇවිදින්නට බය නෑ",
      english: "Those who walk straight have no fear",
      meaning: "Honest people have nothing to fear",
    },
    {
      sinhala: "දහම් වැඩක් කළොත් පුණ්‍ය ලැබෙනවා",
      english: "Good deeds bring merit",
      meaning: "Good actions bring good results",
    },
    {
      sinhala: "පෙර බලන්නේ කප් පිරෙන්නට",
      english: "Look before you leap",
      meaning: "Think before you act",
    },
    {
      sinhala: "උගතෙක් හැම තැනම පිළිගන්නවා",
      english: "An educated person is welcome everywhere",
      meaning: "Education opens doors",
    },
    {
      sinhala: "හොඳ මිතුරෙකු සොයාගන්න අමාරුයි",
      english: "A good friend is hard to find",
      meaning: "True friendship is rare and valuable",
    },
  ];

  // Connecting words
  const connectingWords = [
    { sinhala: "සහ", english: "and", pronunciation: "suh-huh" },
    { sinhala: "නමුත්", english: "but", pronunciation: "nuh-mooth" },
    { sinhala: "නිසා", english: "because", pronunciation: "nee-saa" },
    { sinhala: "නම්", english: "if", pronunciation: "nuhm" },
    { sinhala: "එහෙත්", english: "however", pronunciation: "eh-heth" },
    { sinhala: "එබැවින්", english: "therefore", pronunciation: "eh-beh-vin" },
    { sinhala: "හෝ", english: "or", pronunciation: "hoh" },
    { sinhala: "ඊට පස්සේ", english: "after that", pronunciation: "ee-tuh puhs-say" },
    { sinhala: "පළමුව", english: "first", pronunciation: "puh-luh-moo-vuh" },
    { sinhala: "අවසානයේ", english: "finally", pronunciation: "uh-vuh-saa-nuh-yay" },
  ];

  const quizQuestions = [
    {
      question: "When is Sinhala New Year celebrated?",
      options: ["January", "April", "July", "December"],
      correct: 1,
    },
    {
      question: 'What tense marker is "-ුවා"?',
      options: ["Present", "Past", "Future", "Continuous"],
      correct: 1,
    },
    {
      question: "Which ancient capital is mentioned in the text?",
      options: ["Colombo", "Anuradhapura", "Galle", "Jaffna"],
      correct: 1,
    },
    {
      question: 'What does "කිරි බත්" refer to?',
      options: ["White rice", "Milk rice", "Fried rice", "Coconut rice"],
      correct: 1,
    },
    {
      question: 'How do you say "will go" in Sinhala?',
      options: ["ගියා", "යනවා", "යන්නම්", "ගිහින්"],
      correct: 2,
    },
    {
      question: "What festival uses lanterns?",
      options: ["New Year", "Vesak", "Poson", "Christmas"],
      correct: 1,
    },
    {
      question: 'What does "සතුට" mean?',
      options: ["Sadness", "Anger", "Happiness", "Fear"],
      correct: 2,
    },
    {
      question: 'Which word means "mountains"?',
      options: ["ගඟ", "කඳු", "මුහුද", "අහස"],
      correct: 1,
    },
    {
      question: 'How do you say "went" in Sinhala?',
      options: ["යනවා", "ගියා", "යන්නම්", "යමින්"],
      correct: 1,
    },
    {
      question: 'What does "කොකිස්" mean?',
      options: ["Curry", "Oil cakes", "Rice", "Fish"],
      correct: 1,
    },
    {
      question: "Which festival is celebrated in April?",
      options: ["Vesak", "Poson", "Sinhala New Year", "Deepavali"],
      correct: 2,
    },
    {
      question: 'What does "ආදරය" mean?',
      options: ["Anger", "Fear", "Love", "Sadness"],
      correct: 2,
    },
    {
      question: 'What does "පෙරහර" mean?',
      options: ["Festival", "Procession", "Dance", "Song"],
      correct: 1,
    },
    {
      question: 'What is "ගම්මිරිස්" in English?',
      options: ["Tea", "Cinnamon", "Rice", "Curry"],
      correct: 1,
    },
    {
      question: 'What does "වෙසක් කුඩු" mean?',
      options: ["New Year cake", "Vesak lantern", "Traditional dance", "Temple"],
      correct: 1,
    },
    {
      question: 'What does "නමුත්" mean?',
      options: ["And", "But", "Because", "If"],
      correct: 1,
    },
    {
      question: 'Which word means "ocean"?',
      options: ["ගඟ", "කඳු", "මුහුද", "වනාන්තරය"],
      correct: 2,
    },
    {
      question: 'What does "බය" mean?',
      options: ["Happiness", "Sadness", "Anger", "Fear"],
      correct: 3,
    },
    {
      question: 'What does "මිහින්තලේ" refer to?',
      options: ["A festival", "A sacred place", "A food", "A dance"],
      correct: 1,
    },
    {
      question: 'What is "කහ" in English?',
      options: ["Ginger", "Garlic", "Turmeric", "Chilli"],
      correct: 2,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "reading":
        return (
          <section className="section active">
            <h2>Reading Comprehension - කියවීමේ හැකියාව</h2>
            <div className="reading-passage">
              <h3>🏝️ Beautiful Sri Lanka</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාව ඉන්දියන් සාගරයේ ලස්සන දිවයිනක්. එහි පර්වත, වනාන්තර, රාජධානි සහ වෙරළ තීරණ තියෙනවා.
                බොහෝ සංස්කෘතීන් එකට ජීවත් වෙනවා. සිංහල, දමිළ, මුස්ලිම් ජනතාව සාමයෙන් ජීවත් වෙනවා.
                ශ්‍රී ලංකාවේ තේ, ගම්මිරිස්, කරපිංචා ලෝකයේ ප්‍රසිද්ධයි. අපේ රට ගැන අපිට ආඩම්බරයි.
              </div>
              <ReadAloudButton
                text="ශ්‍රී ලංකාව ඉන්දියන් සාගරයේ ලස්සන දිවයිනක්. එහි පර්වත, වනාන්තර, රාජධානි සහ වෙරළ තීරණ තියෙනවා. බොහෝ සංස්කෘතීන් එකට ජීවත් වෙනවා. සිංහල, දමිළ, මුස්ලිම් ජනතාව සාමයෙන් ජීවත් වෙනවා. ශ්‍රී ලංකාවේ තේ, ගම්මිරිස්, කරපිංචා ලෝකයේ ප්‍රසිද්ධයි. අපේ රට ගැන අපිට ආඩම්බරයි."
                label="Listen in Sinhala"
                labelSinhala="සිංහලෙන් අසන්න"
              />
              <div className="reading-english">
                Sri Lanka is a beautiful island in the Indian Ocean. It has mountains, forests, capitals and beaches.
                Many cultures live together. Sinhala, Tamil, Muslim people live peacefully.
                Sri Lanka's tea, cinnamon, curry leaves are world famous. We are proud of our country.
              </div>
            </div>

            <div className="reading-passage">
              <h3>🎭 Traditional Festivals</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාවේ බොහෝ සම්ප්‍රදායික උත්සව තියෙනවා. සිංහල අලුත් අවුරුද්ද අප්‍රේල් මාසයේ සමරනවා.
                ගම්මිරිස් කිරි, කොකිස්, කැවුම් හදනවා. වෙසක් පෝය දවසේ ලන්ටර්න් දාලනවා. දන්සල් තියනවා.
                පොසොන් පෝය දවසේ මිහින්තලේට බොහෝ දෙනෙක් යනවා. මේ උත්සව අපේ සංස්කෘතිය රැක ගන්නවා.
              </div>
              <ReadAloudButton
                text="ශ්‍රී ලංකාවේ බොහෝ සම්ප්‍රදායික උත්සව තියෙනවා. සිංහල අලුත් අවුරුද්ද අප්‍රේල් මාසයේ සමරනවා. ගම්මිරිස් කිරි, කොකිස්, කැවුම් හදනවා. වෙසක් පෝය දවසේ ලන්ටර්න් දාලනවා. දන්සල් තියනවා. පොසොන් පෝය දවසේ මිහින්තලේට බොහෝ දෙනෙක් යනවා. මේ උත්සව අපේ සංස්කෘතිය රැක ගන්නවා."
                label="Listen in Sinhala"
                labelSinhala="සිංහලෙන් අසන්න"
              />
              <div className="reading-english">
                Sri Lanka has many traditional festivals. Sinhala New Year is celebrated in April.
                They make coconut milk rice, kokis, and sweets. On Vesak day lanterns are lit. There are dansals (free food stalls).
                On Poson day many people go to Mihintale. These festivals preserve our culture.
              </div>
            </div>

            <div className="reading-passage">
              <h3>🏛️ Ancient Heritage</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාවට අවුරුදු දෙදහස් හතරකට වඩා පැරණි ඉතිහාසයක් තියෙනවා.
                අනුරාධපුරය, පොළොන්නරුව, කන්දය වගේ පුරාණ රාජධානිවල නටබුන් අදටත් තියෙනවා.
                සිගිරිය කොටුව ලෝකයේ අටවන පුදුමය කියලා කියනවා. මේ ස්ථාන අපේ පරම්පරාගත කලාව සහ ගිනිකෙළ පෙන්වනවා.
              </div>
              <ReadAloudButton
                text="ශ්‍රී ලංකාවට අවුරුදු දෙදහස් හතරකට වඩා පැරණි ඉතිහාසයක් තියෙනවා. අනුරාධපුරය, පොළොන්නරුව, කන්දය වගේ පුරාණ රාජධානිවල නටබුන් අදටත් තියෙනවා. සිගිරිය කොටුව ලෝකයේ අටවන පුදුමය කියලා කියනවා. මේ ස්ථාන අපේ පරම්පරාගත කලාව සහ ගිනිකෙළ පෙන්වනවා."
                label="Listen in Sinhala"
                labelSinhala="සිංහලෙන් අසන්න"
              />
              <div className="reading-english">
                Sri Lanka has a history of more than two thousand four hundred years.
                Ruins of ancient kingdoms like Anuradhapura, Polonnaruwa, and Kandy still exist today.
                Sigiriya fortress is called the eighth wonder of the world. These places show our traditional art and architecture.
              </div>
            </div>

            <div className="reading-passage">
              <h3>🐘 Wildlife of Sri Lanka</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාවේ විවිධ වන්‍ය සත්ත්ව තියෙනවා. යාල, විල්පත්තු, උදාවළාවේ ජාතික වනෝද්‍යාන තියෙනවා.
                අලි, දිවියා, වලස්, මුවන් මේ වනෝද්‍යානවල ජීවත් වෙනවා. ශ්‍රී ලංකා අලියා ඉතා ප්‍රසිද්ධයි.
                අපි මේ සත්ත්වයන් ආරක්ෂා කරන්න ඕනේ.
              </div>
              <ReadAloudButton
                text="ශ්‍රී ලංකාවේ විවිධ වන්‍ය සත්ත්ව තියෙනවා. යාල, විල්පත්තු, උදාවළාවේ ජාතික වනෝද්‍යාන තියෙනවා. අලි, දිවියා, වලස්, මුවන් මේ වනෝද්‍යානවල ජීවත් වෙනවා. ශ්‍රී ලංකා අලියා ඉතා ප්‍රසිද්ධයි. අපි මේ සත්ත්වයන් ආරක්ෂා කරන්න ඕනේ."
                label="Listen in Sinhala"
                labelSinhala="සිංහලෙන් අසන්න"
              />
              <div className="reading-english">
                Sri Lanka has diverse wildlife. There are national parks at Yala, Wilpattu, and Udawalawe.
                Elephants, leopards, bears, and deer live in these parks. The Sri Lankan elephant is very famous.
                We need to protect these animals.
              </div>
            </div>

            <div className="activity-card">
              <h3>📖 Comprehension Questions</h3>
              <p>1. Where is Sri Lanka located?</p>
              <p>2. What communities live in Sri Lanka?</p>
              <p>3. What products is Sri Lanka famous for?</p>
              <p>4. Name three national parks mentioned in the text.</p>
              <p>5. Why is Sigiriya famous?</p>
            </div>
          </section>
        );

      case "grammar":
        return (
          <section className="section active">
            <h2>Advanced Grammar - උසස් ව්‍යාකරණ</h2>

            <div className="grammar-box">
              <h4>Past Tense - අතීත කාලය</h4>
              <p>Add -ුවා (-uwa) or -ා (-aa) for past actions:</p>
              <table className="grammar-table">
                <thead>
                  <tr><th>Present</th><th>Past</th><th>English</th></tr>
                </thead>
                <tbody>
                  <tr><td>යනවා</td><td>ගියා</td><td>go → went</td></tr>
                  <tr><td>කනවා</td><td>කෑවා</td><td>eat → ate</td></tr>
                  <tr><td>එනවා</td><td>ආවා</td><td>come → came</td></tr>
                  <tr><td>ලියනවා</td><td>ලිව්වා</td><td>write → wrote</td></tr>
                  <tr><td>කියවනවා</td><td>කියැව්වා</td><td>read → read</td></tr>
                  <tr><td>බොනවා</td><td>බිව්වා</td><td>drink → drank</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Future Tense - අනාගත කාලය</h4>
              <p>Add -න්නම් (-nnam) or -යි (-yi) for future actions:</p>
              <table className="grammar-table">
                <thead>
                  <tr><th>Present</th><th>Future</th><th>English</th></tr>
                </thead>
                <tbody>
                  <tr><td>යනවා</td><td>යන්නම්</td><td>go → will go</td></tr>
                  <tr><td>කනවා</td><td>කන්නම්</td><td>eat → will eat</td></tr>
                  <tr><td>එනවා</td><td>එන්නම්</td><td>come → will come</td></tr>
                  <tr><td>ලියනවා</td><td>ලියන්නම්</td><td>write → will write</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Connecting Words - සම්බන්ධ වචන</h4>
              <div className="word-grid" style={{ marginTop: "15px" }}>
                {connectingWords.map((word, index) => (
                  <WordCard
                    key={index}
                    sinhalaWord={word.sinhala}
                    englishWord={word.english}
                    pronunciation={word.pronunciation}
                  />
                ))}
              </div>
            </div>

            <div className="grammar-box">
              <h4>Complex Sentences - සංකීර්ණ වාක්‍ය</h4>
              <p>Combine sentences using connecting words:</p>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">මම පාසලට ගියා <strong>සහ</strong> මිතුරන් මුණගැසුණා.</div>
              <div className="sentence-english">I went to school <strong>and</strong> met friends.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">ඔහු ඉගෙන ගත්තා <strong>නමුත්</strong> විභාගය සමත් වුණේ නෑ.</div>
              <div className="sentence-english">He studied <strong>but</strong> didn't pass the exam.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">මම ගෙදර හිටියා <strong>නිසා</strong> වැස්ස ඇවිත්.</div>
              <div className="sentence-english">I stayed home <strong>because</strong> it rained.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">වැස්ස නතර වුණා <strong>නම්</strong> අපි පිටත යන්නම්.</div>
              <div className="sentence-english"><strong>If</strong> the rain stops, we will go outside.</div>
            </div>

            <div className="activity-card">
              <h3>📝 Grammar Exercise</h3>
              <p>Connect these sentences using appropriate connecting words:</p>
              <p>1. මම කනවා. මම නිදාගන්නවා. (I eat. I sleep.) → Using "ඊට පස්සේ"</p>
              <p>2. ඇය ලස්සනයි. ඇය බුද්ධිමත්. (She is beautiful. She is intelligent.) → Using "සහ"</p>
              <p>3. මම පාසලට ගියා. මට අසනීපයි. (I went to school. I am sick.) → Using "නමුත්"</p>
            </div>
          </section>
        );

      case "vocabulary":
        return (
          <section className="section active">
            <h2>Advanced Vocabulary - උසස් වචන</h2>

            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Historical Places - ඓතිහාසික ස්ථාන
            </h3>
            <div className="word-grid">
              {historicalPlaces.map((place, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={place.sinhala}
                  englishWord={place.english}
                  pronunciation={place.pronunciation}
                  image={place.image}
                />
              ))}
            </div>

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Spices & Products - කුළු බඩු සහ නිෂ්පාදන
            </h3>
            <div className="word-grid">
              {spicesProducts.map((item, index) => (
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
              <h3>🎯 Vocabulary Challenge</h3>
              <p>Match the Sinhala word with the English meaning:</p>
              <p>1. සිගිරිය → _____</p>
              <p>2. ගම්මිරිස් → _____</p>
              <p>3. දළදා මාලිගාව → _____</p>
              <p>4. කහ → _____</p>
              <p><strong>Answers:</strong> 1. Sigiriya, 2. Cinnamon, 3. Temple of Tooth, 4. Turmeric</p>
            </div>
          </section>
        );

      case "emotions":
        return (
          <section className="section active">
            <h2>Emotions & Feelings - හැඟීම්</h2>

            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              How do you feel? - ඔබට කොහොමද දැනෙන්නේ?
            </h3>
            <div className="word-grid">
              {emotions.map((emotion, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={emotion.sinhala}
                  englishWord={emotion.english}
                  pronunciation={emotion.pronunciation}
                  image={emotion.image}
                />
              ))}
            </div>

            <div className="grammar-box" style={{ marginTop: "30px" }}>
              <h4>Expressing Emotions</h4>
              <p>Use "මට ___ දැනෙනවා" (I feel ___) or "මම ___ " (I am ___):</p>
              <p><strong>මට සතුටක් දැනෙනවා.</strong> (I feel happy.)</p>
              <p><strong>මට දුකක් දැනෙනවා.</strong> (I feel sad.)</p>
              <p><strong>මට බයයි.</strong> (I am scared.)</p>
              <p><strong>මම කෝපයෙන්.</strong> (I am angry.)</p>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">ඔහුට ඉතා සතුටුයි විභාගය සමත් වුණු නිසා.</div>
              <div className="sentence-english">He is very happy because he passed the exam.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">ඇය ලැජ්ජයි නිසා ඇය කතා කරන්නේ නෑ.</div>
              <div className="sentence-english">She doesn't speak because she is shy.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">ළමයින්ට විස්මයයි අලියා දැක්කම.</div>
              <div className="sentence-english">The children are amazed when they see the elephant.</div>
            </div>

            <div className="activity-card">
              <h3>📝 Emotion Exercise</h3>
              <p>Write sentences using these emotions:</p>
              <p>1. Describe a time you felt happy (සතුට).</p>
              <p>2. What makes you feel scared (බය)?</p>
              <p>3. Write about something surprising (පුදුම).</p>
            </div>
          </section>
        );

      case "nature":
        return (
          <section className="section active">
            <h2>Nature & Environment - ස්වභාව ධර්මය</h2>

            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Natural Features - ස්වාභාවික ලක්ෂණ
            </h3>
            <div className="word-grid">
              {nature.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                  image={item.image}
                />
              ))}
            </div>

            <div className="reading-passage" style={{ marginTop: "30px" }}>
              <h3>🌳 The Environment</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාව ස්වභාව සෞන්දර්යයෙන් පිරුණු රටක්. මෙහි උස් කඳුකර, ගලායන ගංගා, සුන්දර දිය ඇලි තියෙනවා.
                වනාන්තරවල විවිධ සත්ත්ව සහ ශාක ජීවත් වෙනවා. අහසේ තාරකා දිලිසෙනවා.
                හිරු උදාව සහ හිරු බැසීම ඉතා ලස්සනයි. අපි මේ ස්වභාවය ආරක්ෂා කරන්න ඕනේ.
              </div>
              <div className="reading-english">
                Sri Lanka is a country full of natural beauty. It has high mountains, flowing rivers, and beautiful waterfalls.
                Various animals and plants live in the forests. Stars twinkle in the sky.
                The sunrise and sunset are very beautiful. We need to protect this nature.
              </div>
            </div>

            <div className="activity-card">
              <h3>🌿 Environment Vocabulary Exercise</h3>
              <p>Fill in the blanks with the correct Sinhala word:</p>
              <p>1. The _____ shines during the day. (Sun - හිරු)</p>
              <p>2. _____ falls from the clouds. (Rain - වැසි)</p>
              <p>3. Birds fly in the _____. (Sky - අහස)</p>
              <p>4. The _____ is full of water. (River - ගඟ)</p>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">හිරු නැගෙනකොට අහස රතු පැහැයෙන් බබලනවා.</div>
              <div className="sentence-english">When the sun rises, the sky shines red.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">වළාකුළු එකතු වෙනවා වැසි වහින්න කලින්.</div>
              <div className="sentence-english">Clouds gather before it rains.</div>
            </div>
          </section>
        );

      case "writing":
        return (
          <section className="section active">
            <h2>Creative Writing - නිර්මාණාත්මක ලිවීම</h2>

            <div className="activity-card">
              <h3>✍️ Essay Writing</h3>
              <p><strong>Topic: "My Favorite Festival" (මගේ ප්‍රියතම උත්සවය)</strong></p>
              <p>Write a 5-sentence essay about your favorite Sri Lankan festival. Include:</p>
              <p>• When it is celebrated</p>
              <p>• What activities happen</p>
              <p>• Why you like it</p>
              <p>• How your family celebrates</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  <strong>Sample Essay:</strong><br />
                  මගේ ප්‍රියතම උත්සවය වෙසක් පෝය. මේ උත්සවය මැයි මාසයේ සමරනවා.
                  අපි ලන්ටර්න් හදනවා සහ දන්සල් පිහිටුවනවා. මම මේ උත්සවයට ආදරේ කරනවා
                  කරුණාව සහ සැමට ආදරය ගැන ඉගෙන ගන්න පුළුවන් නිසා. අපේ පවුල එකට ලන්ටර්න් හදනවා සහ පිරිත් අහනවා.
                </div>
              </div>
            </div>

            <div className="activity-card">
              <h3>📖 Story Writing</h3>
              <p><strong>Topic: "Adventure in the Village" (ගමේ ත්‍රාසකතාව)</strong></p>
              <p>Write a short story about a child's adventure in a Sri Lankan village. Use past tense verbs.</p>
              <p><strong>Story starters:</strong></p>
              <p>• ගිය නිවාඩුවේ මම සීයාගේ ගමට ගියා... (Last holiday I went to grandfather's village...)</p>
              <p>• ගමේ ජීවිතය නගරයට වඩා වෙනස්... (Village life is different from the city...)</p>
            </div>

            <div className="activity-card">
              <h3>💌 Letter Writing</h3>
              <p><strong>Write a letter to your friend describing your school</strong></p>
              <p>Include: greeting, your school name, favorite subjects, favorite teacher, closing</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  <strong>Sample Letter Structure:</strong><br />
                  ප්‍රිය මිතුරා,<br />
                  කොහොමද? මගේ පාසල ගැන කියන්නම්...<br />
                  ආදරණීය,<br />
                  [ඔබේ නම]
                </div>
              </div>
            </div>

            <div className="activity-card">
              <h3>🎭 Dialogue Writing</h3>
              <p><strong>Create a conversation between two friends meeting after a long time</strong></p>
              <p>Use question words and proper greetings. Make it at least 6 exchanges.</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  <strong>Sample:</strong><br />
                  A: ආයුබෝවන්! කොහොමද?<br />
                  B: හොඳින්! ඔබ කොහෙන්ද එන්නේ?<br />
                  A: මම පාසලෙන් එනවා. ඔබ මොකද කරන්නේ?<br />
                  B: මම ගෙදර යනවා...
                </div>
              </div>
            </div>

            <div className="activity-card">
              <h3>📰 News Report Writing</h3>
              <p><strong>Write a short news report about a school event</strong></p>
              <p>Include: what happened, when, where, who was involved</p>
            </div>
          </section>
        );

      case "culture":
        return (
          <section className="section active">
            <h2>Culture & History - සංස්කෘතිය සහ ඉතිහාසය</h2>

            <div className="culture-card">
              <h3>🏛️ Ancient Kingdoms</h3>
              <p>ශ්‍රී ලංකාවේ පුරාණ රාජධානි - අනුරාධපුරය, පොළොන්නරුව, කන්දි. මේ නගර අපේ ඉතිහාසයේ වැදගත්.</p>
              <p>Ancient capitals of Sri Lanka - Anuradhapura, Polonnaruwa, Kandy. These cities are important in our history.</p>
            </div>

            <div className="culture-card">
              <h3>🎨 Traditional Arts</h3>
              <p>කන්දියන් නර්තනය, මුඛවාඩ, බතික්, පොල් කැටයම් අපේ සම්ප්‍රදායික කලා.</p>
              <p>Kandyan dancing, mask carving, batik, coconut carving are our traditional arts.</p>
            </div>

            <div className="culture-card">
              <h3>🌾 Agriculture & Spices</h3>
              <p>ශ්‍රී ලංකාව "ඉන්දියන් සාගරයේ මුතු" කියලා කියනවා. අපේ තේ, ගම්මිරිස්, ගම්මිරිස්, කරපිංචා ලොව පුරා ප්‍රසිද්ධයි.</p>
              <p>Sri Lanka is called the "Pearl of the Indian Ocean". Our tea, cinnamon, cardamom, curry leaves are famous worldwide.</p>
            </div>

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Cultural Items - සංස්කෘතික දෑ
            </h3>
            <div className="word-grid">
              {culturalItems.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                  image={item.image}
                />
              ))}
            </div>

            <div className="culture-card" style={{ marginTop: "30px" }}>
              <h3>🎭 Festivals Throughout the Year</h3>
              <p><strong>අප්‍රේල්:</strong> සිංහල හින්දු අලුත් අවුරුද්ද - Sinhala Hindu New Year</p>
              <p><strong>මැයි:</strong> වෙසක් පෝය - Vesak Poya (Buddha's Birthday)</p>
              <p><strong>ජුනි:</strong> පොසොන් පෝය - Poson Poya (Buddhism came to Sri Lanka)</p>
              <p><strong>ජූලි/අගෝස්තු:</strong> ඇසළ පෙරහර - Esala Perahera in Kandy</p>
              <p><strong>ඔක්තෝබර්:</strong> දීපාවලි - Deepavali (Festival of Lights)</p>
              <p><strong>දෙසැම්බර්:</strong> නත්තල් - Christmas</p>
            </div>
          </section>
        );

      case "proverbs":
        return (
          <section className="section active">
            <h2>Sinhala Proverbs - සිංහල පහරුස</h2>
            <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
              Proverbs teach us wisdom through short, memorable sayings.
            </p>

            {proverbs.map((proverb, index) => (
              <div key={index} className="proverb-card" style={{
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <div className="sentence-sinhala" style={{ fontSize: "1.3em", marginBottom: "10px" }}>
                  "{proverb.sinhala}"
                </div>
                <div className="sentence-english" style={{ fontStyle: "italic", marginBottom: "5px" }}>
                  "{proverb.english}"
                </div>
                <div style={{ color: "#667eea", fontSize: "0.9em" }}>
                  <strong>Meaning:</strong> {proverb.meaning}
                </div>
              </div>
            ))}

            <div className="activity-card">
              <h3>📝 Proverb Activity</h3>
              <p>1. Choose your favorite proverb and explain why you like it.</p>
              <p>2. Can you think of a situation where this proverb would apply?</p>
              <p>3. Try to write your own proverb about friendship or learning!</p>
            </div>
          </section>
        );

      case "literature":
        return (
          <section className="section active">
            <h2>Literature - සාහිත්‍යය</h2>

            <div className="poem-card">
              <h3>🌸 Famous Sinhala Poem</h3>
              <div className="sentence-sinhala">
                මල් පිපෙන්නේ සුවද සුවදට<br />
                මල් වැරදෙන්නේ සීත සීතට<br />
                ජීවිතේ එහෙම තමයි<br />
                සුවද දුකද එකට එනවා
              </div>
              <div className="sentence-english">
                Flowers bloom in fragrant waves<br />
                Flowers wither in the cold<br />
                Life is just like that<br />
                Joy and sorrow come together
              </div>
            </div>

            <div className="reading-passage">
              <h3>📚 Classic Story Extract - The Little Prince</h3>
              <div className="reading-sinhala">
                පුංචි ප්‍රින්ස් කුමරු අහස බලාගෙන හිටියා. තාරකාවන් දිලිසෙනවා දැක්කා.
                ඔහුගේ ලොකු සුන්දර ඇස්වලට කදුළු පිරිලා. "මම කොහේ ගිහින්ද?" ඔහු හිතුවා.
                "මගේ ගෝලයට ආපසු යන්න පුළුවන්ද?"
              </div>
              <div className="reading-english">
                The little prince was looking at the sky. He saw the stars shining.
                His big beautiful eyes filled with tears. "Where am I going?" he thought.
                "Can I go back to my planet?"
              </div>
            </div>

            <div className="poem-card">
              <h3>🦋 Nature Poem</h3>
              <div className="sentence-sinhala">
                කඳුළු ගඟ වගේ ගලනවා<br />
                මල් මල් මතු පාවෙනවා<br />
                සමනලයෝ නටනවා<br />
                අපේ ලස්සන ශ්‍රී ලංකාවේ
              </div>
              <div className="reading-english">
                Rivers flow like tears<br />
                Flowers float on the surface<br />
                Butterflies dance<br />
                In our beautiful Sri Lanka
              </div>
            </div>

            <div className="poem-card">
              <h3>🏠 Poem about Home</h3>
              <div className="sentence-sinhala">
                ගෙදර එකයි මගෙ හිත<br />
                අම්මා තාත්තා එකට<br />
                ආදරයෙන් ගත කරන<br />
                සතුටු ජීවිතය මගේ
              </div>
              <div className="reading-english">
                My home is my heart<br />
                With mother and father together<br />
                Spending time in love<br />
                My happy life
              </div>
            </div>

            <div className="activity-card">
              <h3>📝 Literary Analysis</h3>
              <p><strong>Questions about the poems:</strong></p>
              <p>1. What do the flowers represent in the first poem?</p>
              <p>2. What emotions does the Little Prince feel?</p>
              <p>3. How does the nature poem describe Sri Lanka?</p>
              <p>4. Can you write your own 4-line poem about your family?</p>
            </div>
          </section>
        );

      case "practice":
        return (
          <section className="section active">
            <h2>Speak & Learn - කතා කරමින් ඉගෙන ගන්න</h2>
            <PronunciationPractice
              words={practiceWords}
              title="Practice Grade 4 Words / පන්ති 4 වචන පුහුණුව"
            />
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Final Assessment Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g4" gradeNumber={4} />
          </section>
        );

      default:
        return null;
    }
  };

  // Get SEO config for current section
  const seoConfig = gradeSEOConfig[4];

  return (
    <div className="grade-content active">
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalPath={`/#grade4-${currentSection}`}
        structuredData={generateBreadcrumbs(4, currentSection)}
      />
      <div className="grade-info-compact">
        <h2>Grade 4 - හතරවන ශ්‍රේණිය</h2>
      </div>

      {renderSection()}

      <style>{`
        .grammar-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        .grammar-table th, .grammar-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .grammar-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .grammar-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .culture-card {
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 15px;
        }
        .poem-card {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default Grade4;
