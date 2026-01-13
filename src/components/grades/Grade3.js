import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";

const Grade3 = () => {
  const [currentSection, setCurrentSection] = useState("grammar");

  const sections = [
    { id: "grammar", label: "Grammar" },
    { id: "tenses", label: "Tenses" },
    { id: "conversation", label: "Conversation" },
    { id: "vocabulary", label: "Vocabulary" },
    { id: "professions", label: "Professions" },
    { id: "clothing", label: "Clothing" },
    { id: "reading", label: "Reading" },
    { id: "writing", label: "Writing" },
    { id: "stories", label: "Stories" },
    { id: "practice", label: "Speak & Learn" },
    { id: "quiz", label: "Quiz" },
  ];

  const practiceWords = [
    { sinhala: "පාසල", english: "School", pronunciation: "paa-suh-luh" },
    { sinhala: "රෝහල", english: "Hospital", pronunciation: "roh-huh-luh" },
    { sinhala: "දුවනවා", english: "Running", pronunciation: "doo-vuh-nuh-vaa" },
    { sinhala: "ලියනවා", english: "Writing", pronunciation: "lee-yuh-nuh-vaa" },
    { sinhala: "ගුරුවරයා", english: "Teacher (male)", pronunciation: "goo-roo-vuh-ruh-yaa" },
    { sinhala: "වෛද්‍යවරයා", english: "Doctor", pronunciation: "vaid-yuh-vuh-ruh-yaa" },
    { sinhala: "සාරිය", english: "Saree", pronunciation: "saa-ree-yuh" },
    { sinhala: "කමිසය", english: "Shirt", pronunciation: "kuh-mee-suh-yuh" },
    { sinhala: "සත්තු වත්ත", english: "Zoo", pronunciation: "suhth-thoo vuhth-thuh" },
    { sinhala: "වෙරළ", english: "Beach", pronunciation: "veh-ruh-luh" },
  ];

  // Places vocabulary - expanded
  const places = [
    { sinhala: "පාසල", english: "School", pronunciation: "paa-suh-luh" },
    { sinhala: "රෝහල", english: "Hospital", pronunciation: "roh-huh-luh" },
    { sinhala: "වෙළෙඳසැල", english: "Shop", pronunciation: "veh-leh-duh-seh-luh" },
    { sinhala: "උයන", english: "Garden", pronunciation: "oo-yuh-nuh" },
    { sinhala: "පුස්තකාලය", english: "Library", pronunciation: "poos-thuh-kaa-luh-yuh" },
    { sinhala: "පන්සල", english: "Temple", pronunciation: "puhn-suh-luh" },
    { sinhala: "බැංකුව", english: "Bank", pronunciation: "ben-koo-vuh" },
    { sinhala: "තැපැල් කාර්යාලය", english: "Post Office", pronunciation: "theh-pehl kaar-yaa-luh-yuh" },
    { sinhala: "පොලිස් ස්ථානය", english: "Police Station", pronunciation: "poh-lis sthaa-nuh-yuh" },
    { sinhala: "දුම්රිය ස්ථානය", english: "Railway Station", pronunciation: "doom-ree-yuh sthaa-nuh-yuh" },
    { sinhala: "ගුවන් තොටුපළ", english: "Airport", pronunciation: "goo-vuhn thoh-too-puh-luh" },
    { sinhala: "වෙරළ", english: "Beach", pronunciation: "veh-ruh-luh" },
  ];

  // Actions/Verbs - expanded
  const actions = [
    { sinhala: "දුවනවා", english: "Running", pronunciation: "doo-vuh-nuh-vaa" },
    { sinhala: "ඉගෙන ගන්නවා", english: "Learning", pronunciation: "ee-geh-nuh guhn-nuh-vaa" },
    { sinhala: "ලියනවා", english: "Writing", pronunciation: "lee-yuh-nuh-vaa" },
    { sinhala: "කියවනවා", english: "Reading", pronunciation: "kee-yuh-vuh-nuh-vaa" },
    { sinhala: "ගායනා කරනවා", english: "Singing", pronunciation: "gaa-yuh-naa kuh-ruh-nuh-vaa" },
    { sinhala: "නර්තනය කරනවා", english: "Dancing", pronunciation: "nur-thuh-nuh-yuh kuh-ruh-nuh-vaa" },
    { sinhala: "පිහිනනවා", english: "Swimming", pronunciation: "pee-hee-nuh-nuh-vaa" },
    { sinhala: "ඇදගන්නවා", english: "Drawing", pronunciation: "eh-duh-guhn-nuh-vaa" },
    { sinhala: "සෙල්ලම් කරනවා", english: "Playing", pronunciation: "sehl-luhm kuh-ruh-nuh-vaa" },
    { sinhala: "උයනවා", english: "Cooking", pronunciation: "oo-yuh-nuh-vaa" },
    { sinhala: "සෝදනවා", english: "Washing", pronunciation: "soh-duh-nuh-vaa" },
    { sinhala: "අදිනවා", english: "Wearing", pronunciation: "uh-dee-nuh-vaa" },
  ];

  // Professions
  const professions = [
    { sinhala: "ගුරුවරයා", english: "Teacher (male)", pronunciation: "goo-roo-vuh-ruh-yaa" },
    { sinhala: "ගුරුවරිය", english: "Teacher (female)", pronunciation: "goo-roo-vuh-ree-yuh" },
    { sinhala: "වෛද්‍යවරයා", english: "Doctor", pronunciation: "vai-dhyuh-vuh-ruh-yaa" },
    { sinhala: "හෙදිය", english: "Nurse", pronunciation: "heh-dee-yuh" },
    { sinhala: "ඉංජිනේරු", english: "Engineer", pronunciation: "in-ji-nay-roo" },
    { sinhala: "නීතිඥ", english: "Lawyer", pronunciation: "nee-thig-nyuh" },
    { sinhala: "ගොවියා", english: "Farmer", pronunciation: "goh-vee-yaa" },
    { sinhala: "ධීවරයා", english: "Fisherman", pronunciation: "dhee-vuh-ruh-yaa" },
    { sinhala: "පොලිස් නිලධාරී", english: "Police Officer", pronunciation: "poh-lis nee-luh-dhaa-ree" },
    { sinhala: "ගුවන් සේවිකාව", english: "Flight Attendant", pronunciation: "goo-vuhn say-vee-kaa-vuh" },
    { sinhala: "රියදුරා", english: "Driver", pronunciation: "ree-yuh-doo-raa" },
    { sinhala: "බේකරු", english: "Baker", pronunciation: "bay-kuh-roo" },
  ];

  // Clothing
  const clothing = [
    { sinhala: "කමිසය", english: "Shirt", pronunciation: "kuh-mee-suh-yuh" },
    { sinhala: "කලිසම", english: "Trousers", pronunciation: "kuh-lee-suh-muh" },
    { sinhala: "සාය", english: "Skirt", pronunciation: "saa-yuh" },
    { sinhala: "ගවුම", english: "Dress", pronunciation: "gow-muh" },
    { sinhala: "ඇඳුම", english: "Clothes", pronunciation: "ehn-doo-muh" },
    { sinhala: "සපත්තු", english: "Shoes", pronunciation: "suh-puht-too" },
    { sinhala: "හිස් වැස්ම", english: "Hat", pronunciation: "his vehs-muh" },
    { sinhala: "පටිය", english: "Belt", pronunciation: "puh-tee-yuh" },
    { sinhala: "ජැකට්ටුව", english: "Jacket", pronunciation: "jeh-kuht-too-vuh" },
    { sinhala: "රෙදිපිළි", english: "Garments", pronunciation: "reh-dee-pee-lee" },
    { sinhala: "ටී-ෂර්ට්", english: "T-shirt", pronunciation: "tee-shuht" },
    { sinhala: "සරම", english: "Sarong", pronunciation: "suh-ruh-muh" },
  ];

  // Question words
  const questionWords = [
    { sinhala: "කවුද?", english: "Who?", pronunciation: "kow-duh" },
    { sinhala: "මොකද්ද?", english: "What?", pronunciation: "moh-kuhd-duh" },
    { sinhala: "කොහේද?", english: "Where?", pronunciation: "koh-hay-duh" },
    { sinhala: "කවදාද?", english: "When?", pronunciation: "kuh-vuh-daa-duh" },
    { sinhala: "ඇයි?", english: "Why?", pronunciation: "eh-yee" },
    { sinhala: "කොහොමද?", english: "How?", pronunciation: "koh-hoh-muh-duh" },
    { sinhala: "කීයද?", english: "How much?", pronunciation: "kee-yuh-duh" },
    { sinhala: "කී දෙනෙක්ද?", english: "How many?", pronunciation: "kee deh-neh-kuh-duh" },
  ];

  // Time expressions
  const timeExpressions = [
    { sinhala: "අද", english: "Today", pronunciation: "uh-duh" },
    { sinhala: "හෙට", english: "Tomorrow", pronunciation: "heh-tuh" },
    { sinhala: "ඊයේ", english: "Yesterday", pronunciation: "ee-yay" },
    { sinhala: "දැන්", english: "Now", pronunciation: "dehn" },
    { sinhala: "පසුව", english: "Later", pronunciation: "puh-soo-vuh" },
    { sinhala: "කලින්", english: "Before/Earlier", pronunciation: "kuh-lin" },
    { sinhala: "උදේ", english: "Morning", pronunciation: "oo-day" },
    { sinhala: "දවල්", english: "Afternoon", pronunciation: "duh-vuhl" },
    { sinhala: "හවස", english: "Evening", pronunciation: "huh-vuh-suh" },
    { sinhala: "රාත්‍රිය", english: "Night", pronunciation: "raath-ree-yuh" },
  ];

  // Basic conversations
  const conversations = [
    { sinhala: "ඔබට කොහොමද?", english: "How are you?", pronunciation: "oh-buh-tuh koh-hoh-muh-duh" },
    { sinhala: "මට හොඳින්.", english: "I am fine.", pronunciation: "muh-tuh hohn-deen" },
    { sinhala: "ඔබේ නම මොකද්ද?", english: "What is your name?", pronunciation: "oh-bay nuh-muh moh-kuhd-duh" },
    { sinhala: "මගේ නම සුනිල්.", english: "My name is Sunil.", pronunciation: "muh-gay nuh-muh soo-neel" },
    { sinhala: "කරුණාකර මට උදව් කරන්න.", english: "Please help me.", pronunciation: "kuh-roo-naa-kuh-ruh muh-tuh oo-duhv kuh-ruhn-nuh" },
    { sinhala: "ඔබ කොහෙන්ද එන්නේ?", english: "Where are you from?", pronunciation: "oh-buh koh-hehn-duh ehn-nay" },
    { sinhala: "මම කොළඹ ඉදන් එනවා.", english: "I come from Colombo.", pronunciation: "muh-muh koh-luhm-buh ee-duhn eh-nuh-vaa" },
  ];

  // Advanced conversations
  const advancedConversations = [
    {
      title: "At the Shop - වෙළෙඳසැලේදී",
      dialogue: [
        { speaker: "Customer", sinhala: "මේකේ ගාන කීයද?", english: "How much is this?", pronunciation: "may-kay gaa-nuh kee-yuh-duh" },
        { speaker: "Shopkeeper", sinhala: "එකේ ගාන රුපියල් සියයි.", english: "It's one hundred rupees.", pronunciation: "eh-kay gaa-nuh roo-pee-yuhl see-yuh-yee" },
        { speaker: "Customer", sinhala: "හරි, මම මේක ගන්නම්.", english: "Okay, I'll take this.", pronunciation: "huh-ree, muh-muh may-kuh guhn-nuhm" },
        { speaker: "Shopkeeper", sinhala: "ස්තූතියි, ආයෙත් එන්න.", english: "Thank you, come again.", pronunciation: "sthoo-thee-yee, aa-yeth ehn-nuh" },
      ]
    },
    {
      title: "Asking Directions - මාර්ගය අහනවා",
      dialogue: [
        { speaker: "Person A", sinhala: "සමාවන්න, බැංකුව කොහේද?", english: "Excuse me, where is the bank?", pronunciation: "suh-maa-vuhn-nuh, ben-koo-vuh koh-hay-duh" },
        { speaker: "Person B", sinhala: "මේ පාරේ කෙලින් යන්න.", english: "Go straight on this road.", pronunciation: "may paa-ray keh-lin yuhn-nuh" },
        { speaker: "Person B", sinhala: "ඊළඟ හන්දියේ වමට හැරෙන්න.", english: "Turn left at the next junction.", pronunciation: "ee-luh-nguh huhn-dee-yay vuh-muh-tuh heh-rehn-nuh" },
        { speaker: "Person A", sinhala: "ගොඩක් ස්තූතියි!", english: "Thank you very much!", pronunciation: "goh-duhk sthoo-thee-yee" },
      ]
    },
    {
      title: "At School - පාසලේදී",
      dialogue: [
        { speaker: "Teacher", sinhala: "හොඳ උදේක් ළමයි!", english: "Good morning children!", pronunciation: "hohn-duh oo-dayk luh-muh-yee" },
        { speaker: "Students", sinhala: "හොඳ උදේක් මහත්මිය!", english: "Good morning madam!", pronunciation: "hohn-duh oo-dayk muh-huht-mee-yuh" },
        { speaker: "Teacher", sinhala: "අද අපි ගණිතය ඉගෙන ගන්නවා.", english: "Today we will learn mathematics.", pronunciation: "uh-duh uh-pee guh-nee-thuh-yuh ee-geh-nuh guhn-nuh-vaa" },
        { speaker: "Student", sinhala: "මහත්මිය, මට ප්‍රශ්නයක් තියෙනවා.", english: "Madam, I have a question.", pronunciation: "muh-huht-mee-yuh, muh-tuh pruhsh-nuh-yuhk thee-yeh-nuh-vaa" },
      ]
    },
  ];

  // Quiz questions - expanded to 20
  const quizQuestions = [
    {
      question: "What is the word order in Sinhala?",
      options: ["SVO", "SOV", "VSO", "OSV"],
      correct: 1,
    },
    {
      question: 'What does "පාසල" mean?',
      options: ["Hospital", "Home", "School", "Shop"],
      correct: 2,
    },
    {
      question: "Which suffix makes present tense?",
      options: ["-ුවා", "-නවා", "-ා", "-ම්"],
      correct: 1,
    },
    {
      question: 'What does "ඉගෙන ගන්නවා" mean?',
      options: ["Teaching", "Learning", "Playing", "Working"],
      correct: 1,
    },
    {
      question: 'How do you ask "What is your name?"',
      options: ["ඔබට කොහොමද?", "ඔබේ නම මොකද්ද?", "ඔබ කොහේද?", "ඔබ කවුද?"],
      correct: 1,
    },
    {
      question: 'What place is "පුස්තකාලය"?',
      options: ["Temple", "Library", "Hospital", "Garden"],
      correct: 1,
    },
    {
      question: 'What does "රෝහල" mean?',
      options: ["School", "Hospital", "Shop", "Temple"],
      correct: 1,
    },
    {
      question: 'How do you say "I am fine" in Sinhala?',
      options: ["මම යනවා", "මට හොඳින්", "මම කනවා", "මම ඉන්නවා"],
      correct: 1,
    },
    {
      question: 'What does "දුවනවා" mean?',
      options: ["Walking", "Running", "Sitting", "Standing"],
      correct: 1,
    },
    {
      question: 'Which place is "වෙළෙඳසැල"?',
      options: ["School", "Hospital", "Shop", "Garden"],
      correct: 2,
    },
    {
      question: 'What does "ගුරුවරයා" mean?',
      options: ["Doctor", "Teacher", "Farmer", "Engineer"],
      correct: 1,
    },
    {
      question: 'How do you say "yesterday" in Sinhala?',
      options: ["අද", "හෙට", "ඊයේ", "දැන්"],
      correct: 2,
    },
    {
      question: 'What is "කමිසය" in English?',
      options: ["Trousers", "Shirt", "Hat", "Shoes"],
      correct: 1,
    },
    {
      question: 'Which question word means "Where?"',
      options: ["කවුද?", "මොකද්ද?", "කොහේද?", "ඇයි?"],
      correct: 2,
    },
    {
      question: 'What does "වෛද්‍යවරයා" mean?',
      options: ["Teacher", "Nurse", "Doctor", "Lawyer"],
      correct: 2,
    },
    {
      question: 'How do you say "tomorrow" in Sinhala?',
      options: ["ඊයේ", "අද", "හෙට", "පසුව"],
      correct: 2,
    },
    {
      question: "Which suffix makes past tense?",
      options: ["-නවා", "-වා / -ුවා", "-යි", "-න්න"],
      correct: 1,
    },
    {
      question: 'What is "සපත්තු" in English?',
      options: ["Hat", "Belt", "Shoes", "Jacket"],
      correct: 2,
    },
    {
      question: 'What does "ගොවියා" mean?',
      options: ["Fisherman", "Driver", "Baker", "Farmer"],
      correct: 3,
    },
    {
      question: 'How do you ask "How much?" in Sinhala?',
      options: ["කවුද?", "කීයද?", "ඇයි?", "කොහොමද?"],
      correct: 1,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "grammar":
        return (
          <section className="section active">
            <h2>Basic Grammar - මූලික ව්‍යාකරණ</h2>
            <div className="grammar-box">
              <h4>Word Order - වචන පිළිවෙල</h4>
              <p>Sinhala follows Subject-Object-Verb (SOV) word order:</p>
              <p>
                <strong>
                  මම (I) + බත් (rice) + කනවා (eat) = මම බත් කනවා (I eat rice)
                </strong>
              </p>
            </div>
            <div className="grammar-box">
              <h4>Present Tense - වර්තමාන කාලය</h4>
              <p>Add -නවා (-nawa) to the verb stem:</p>
              <p><strong>කන (eat) + නවා = කනවා (eating/eat)</strong></p>
              <p><strong>යන (go) + නවා = යනවා (going/go)</strong></p>
              <p><strong>බොන (drink) + නවා = බොනවා (drinking/drink)</strong></p>
            </div>
            <div className="grammar-box">
              <h4>Plural Forms - බහුවචන</h4>
              <p>Add -ලා (-la) or -න් (-n) to make plurals:</p>
              <p><strong>ළමයා (child) → ළමයින් (children)</strong></p>
              <p><strong>පොත (book) → පොත් (books)</strong></p>
              <p><strong>ගස (tree) → ගස් (trees)</strong></p>
              <p><strong>කුරුල්ලා (bird) → කුරුල්ලන් (birds)</strong></p>
            </div>

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Question Words - ප්‍රශ්න වචන
            </h3>
            <div className="word-grid">
              {questionWords.map((word, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={word.sinhala}
                  englishWord={word.english}
                  pronunciation={word.pronunciation}
                />
              ))}
            </div>

            <div className="activity-card">
              <h3>📝 Practice Exercise</h3>
              <p>Form questions using these question words:</p>
              <p><strong>1. ඔබේ නම ___? (What is your name?)</strong> → ඔබේ නම මොකද්ද?</p>
              <p><strong>2. ඔබ ___ යනවා? (Where are you going?)</strong> → ඔබ කොහේද යනවා?</p>
              <p><strong>3. ඔබ ___ එන්නේ? (When are you coming?)</strong> → ඔබ කවදාද එන්නේ?</p>
            </div>
          </section>
        );

      case "tenses":
        return (
          <section className="section active">
            <h2>Verb Tenses - ක්‍රියා පද කාල</h2>

            <div className="grammar-box">
              <h4>Present Tense - වර්තමාන කාලය</h4>
              <p>Use -නවා (-nawa) ending:</p>
              <table className="tense-table">
                <thead>
                  <tr>
                    <th>Sinhala</th>
                    <th>English</th>
                    <th>Pronunciation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>මම කනවා</td><td>I eat</td><td>muh-muh kuh-nuh-vaa</td></tr>
                  <tr><td>ඔහු යනවා</td><td>He goes</td><td>oh-hoo yuh-nuh-vaa</td></tr>
                  <tr><td>ඇය ලියනවා</td><td>She writes</td><td>eh-yuh lee-yuh-nuh-vaa</td></tr>
                  <tr><td>අපි ඉගෙන ගන්නවා</td><td>We learn</td><td>uh-pee ee-geh-nuh guhn-nuh-vaa</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Past Tense - අතීත කාලය</h4>
              <p>Use -වා (-wa) or -ුවා (-uwa) ending:</p>
              <table className="tense-table">
                <thead>
                  <tr>
                    <th>Sinhala</th>
                    <th>English</th>
                    <th>Pronunciation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>මම කෑවා</td><td>I ate</td><td>muh-muh keh-vaa</td></tr>
                  <tr><td>ඔහු ගියා</td><td>He went</td><td>oh-hoo gee-yaa</td></tr>
                  <tr><td>ඇය ලිව්වා</td><td>She wrote</td><td>eh-yuh liv-vaa</td></tr>
                  <tr><td>අපි ඉගෙන ගත්තා</td><td>We learned</td><td>uh-pee ee-geh-nuh guht-taa</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Future Tense - අනාගත කාලය</h4>
              <p>Use -න්නම් (-nnam), -යි (-yi), or -වි (-wi) ending:</p>
              <table className="tense-table">
                <thead>
                  <tr>
                    <th>Sinhala</th>
                    <th>English</th>
                    <th>Pronunciation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>මම කන්නම්</td><td>I will eat</td><td>muh-muh kuhn-nuhm</td></tr>
                  <tr><td>ඔහු යනවා</td><td>He will go</td><td>oh-hoo yuh-nuh-vaa</td></tr>
                  <tr><td>ඇය ලියන්නම්</td><td>She will write</td><td>eh-yuh lee-yuhn-nuhm</td></tr>
                  <tr><td>අපි එන්නම්</td><td>We will come</td><td>uh-pee ehn-nuhm</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Negation - නිෂේධය</h4>
              <p>Add "නෑ" (neh) at the end or use negative verb forms:</p>
              <table className="tense-table">
                <thead>
                  <tr>
                    <th>Positive</th>
                    <th>Negative</th>
                    <th>English</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>මම කනවා</td><td>මම කන්නේ නෑ</td><td>I don't eat</td></tr>
                  <tr><td>ඔහු යනවා</td><td>ඔහු යන්නේ නෑ</td><td>He doesn't go</td></tr>
                  <tr><td>මම කෑවා</td><td>මම කෑවේ නෑ</td><td>I didn't eat</td></tr>
                  <tr><td>ඔහු ගියා</td><td>ඔහු ගියේ නෑ</td><td>He didn't go</td></tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Time Expressions - කාල ප්‍රකාශන
            </h3>
            <div className="word-grid">
              {timeExpressions.map((word, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={word.sinhala}
                  englishWord={word.english}
                  pronunciation={word.pronunciation}
                />
              ))}
            </div>

            <div className="activity-card">
              <h3>📝 Tense Practice</h3>
              <p>Fill in the correct tense:</p>
              <p><strong>1. ඊයේ මම පාසලට ___ (go - past)</strong> → ගියා</p>
              <p><strong>2. හෙට මම ක්‍රිකට් ___ (play - future)</strong> → ගහන්නම්</p>
              <p><strong>3. දැන් මම TV ___ (watch - present)</strong> → බලනවා</p>
            </div>
          </section>
        );

      case "conversation":
        return (
          <section className="section active">
            <h2>Everyday Conversation - දෛනික සංවාදය</h2>
            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Basic Questions & Answers
            </h3>
            {conversations.map((conv, index) => (
              <div key={index} className="sentence-practice">
                <div className="sentence-sinhala">{conv.sinhala}</div>
                <div className="sentence-english">{conv.english}</div>
                <div className="sentence-pronunciation">{conv.pronunciation}</div>
              </div>
            ))}

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Situational Dialogues - තත්ත්ව සංවාද
            </h3>
            {advancedConversations.map((conv, index) => (
              <div key={index} className="story-card" style={{ marginBottom: "20px" }}>
                <h3>💬 {conv.title}</h3>
                {conv.dialogue.map((line, lineIndex) => (
                  <div key={lineIndex} className="dialogue-line" style={{
                    padding: "10px",
                    margin: "10px 0",
                    backgroundColor: lineIndex % 2 === 0 ? "#f0f4ff" : "#fff0f5",
                    borderRadius: "8px"
                  }}>
                    <strong>{line.speaker}:</strong>
                    <div className="sentence-sinhala" style={{ fontSize: "1.1em" }}>{line.sinhala}</div>
                    <div className="sentence-english">{line.english}</div>
                    <div className="sentence-pronunciation" style={{ fontSize: "0.9em", color: "#888" }}>
                      {line.pronunciation}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="activity-card">
              <h3>💬 Conversation Practice</h3>
              <p>Practice these conversations with a friend or family member!</p>
              <p><strong>Challenge:</strong> Can you create your own conversation using these phrases?</p>
            </div>
          </section>
        );

      case "vocabulary":
        return (
          <section className="section active">
            <h2>Advanced Vocabulary - උසස් වචන</h2>
            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Places - ස්ථාන
            </h3>
            <div className="word-grid">
              {places.map((place, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={place.sinhala}
                  englishWord={place.english}
                  pronunciation={place.pronunciation}
                />
              ))}
            </div>
            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Actions - ක්‍රියා
            </h3>
            <div className="word-grid">
              {actions.map((action, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={action.sinhala}
                  englishWord={action.english}
                  pronunciation={action.pronunciation}
                />
              ))}
            </div>

            <div className="activity-card">
              <h3>🎯 Vocabulary Exercise</h3>
              <p>Make sentences using places and actions:</p>
              <p><strong>Example:</strong> මම පුස්තකාලයේ කියවනවා. (I am reading at the library.)</p>
              <p>1. I swim at the beach. → _____</p>
              <p>2. Children play at school. → _____</p>
              <p><strong>Answers:</strong></p>
              <p>1. මම වෙරළේ පිහිනනවා.</p>
              <p>2. ළමයින් පාසලේ සෙල්ලම් කරනවා.</p>
            </div>
          </section>
        );

      case "professions":
        return (
          <section className="section active">
            <h2>Professions - වෘත්තීන්</h2>
            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Jobs & Occupations - රැකියා
            </h3>
            <div className="word-grid">
              {professions.map((prof, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={prof.sinhala}
                  englishWord={prof.english}
                  pronunciation={prof.pronunciation}
                />
              ))}
            </div>

            <div className="grammar-box" style={{ marginTop: "30px" }}>
              <h4>Talking About Professions</h4>
              <p>Use "වෙනවා" (venawa) to say what someone is/becomes:</p>
              <p><strong>මම ගුරුවරයෙක් වෙනවා.</strong> (I am becoming a teacher.)</p>
              <p><strong>ඔහු වෛද්‍යවරයෙක්.</strong> (He is a doctor.)</p>
              <p><strong>ඇය හෙදියක්.</strong> (She is a nurse.)</p>
            </div>

            <div className="activity-card">
              <h3>💼 Career Talk</h3>
              <p>Answer these questions:</p>
              <p><strong>ඔබ මොනවාද වෙන්න කැමති?</strong> (What do you want to become?)</p>
              <p>Example answer: <strong>මම ඉංජිනේරුවෙක් වෙන්න කැමතියි.</strong></p>
              <p>(I want to become an engineer.)</p>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">මගේ තාත්තා ගොවියෙක්. ඔහු ගොවිතැනේ වැඩ කරනවා.</div>
              <div className="sentence-english">My father is a farmer. He works in the farm.</div>
              <div className="sentence-pronunciation">Mage thaththa goviyek. Ohu govithane veda karanawa.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">මගේ අම්මා ගුරුවරියක්. ඇය පාසලේ ඉගැන්වනවා.</div>
              <div className="sentence-english">My mother is a teacher. She teaches at school.</div>
              <div className="sentence-pronunciation">Mage amma guruvariyak. Eya pasale igenvnawa.</div>
            </div>
          </section>
        );

      case "clothing":
        return (
          <section className="section active">
            <h2>Clothing - ඇඳුම් පැළඳුම්</h2>
            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              Clothes & Accessories
            </h3>
            <div className="word-grid">
              {clothing.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>

            <div className="grammar-box" style={{ marginTop: "30px" }}>
              <h4>Talking About Clothes</h4>
              <p>Use "අදිනවා" (adinawa) to say wearing:</p>
              <p><strong>මම නිල් කමිසයක් අදිනවා.</strong> (I am wearing a blue shirt.)</p>
              <p><strong>ඇය ලස්සන ගවුමක් අඳිනවා.</strong> (She is wearing a beautiful dress.)</p>
            </div>

            <div className="activity-card">
              <h3>👕 What are you wearing?</h3>
              <p><strong>ඔබ මොනවද අඳින්නේ?</strong> (What are you wearing?)</p>
              <p>Practice describing what you and others are wearing:</p>
              <p>Example: <strong>මම සුදු ටී-ෂර්ට් එකක් සහ නිල් කලිසමක් අඳිනවා.</strong></p>
              <p>(I am wearing a white T-shirt and blue trousers.)</p>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">පාසල් යන්න මම නිල ඇඳුම අඳිනවා.</div>
              <div className="sentence-english">I wear the school uniform to go to school.</div>
              <div className="sentence-pronunciation">Pasal yanna mama nila enduma adinawa.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">අද හිරු කරනවා. මම හිස් වැස්මක් අඳිනවා.</div>
              <div className="sentence-english">It's sunny today. I am wearing a hat.</div>
              <div className="sentence-pronunciation">Ada hiru karanawa. Mama his vesmak adinawa.</div>
            </div>
          </section>
        );

      case "reading":
        return (
          <section className="section active">
            <h2>Reading Practice - කියවීමේ අභ්‍යාස</h2>
            <div className="reading-passage">
              <h3>📚 The School Day</h3>
              <div className="reading-sinhala">
                සුනිල් හොඳ ළමයෙක්. ඔහු දවසින් දවස පාසලට යනවා. පාසලේදී ඔහු ගණිතය, සිංහල, ඉංග්‍රීසි ඉගෙන ගන්නවා.
                ගුරුවරුන් ඔහුට ගොඩක් ආදරේයි. ඔහුගේ මිතුරන් ද ඔහුව ආදරේ කරනවා.
              </div>
              <div className="reading-english">
                Sunil is a good boy. He goes to school every day. At school he learns mathematics, Sinhala, and English.
                The teachers love him very much. His friends also love him.
              </div>
            </div>

            <div className="reading-passage">
              <h3>🏡 The Village Market</h3>
              <div className="reading-sinhala">
                සෙනසුරාදා දවසේ අම්මා සහ මම කඩ යනවා. කඩේ ගොඩක් එළවළු, පළතුරු තියෙනවා.
                අම්මා මාළු, බත්, එළවළු ගන්නවා. මම කුකුළු මස් කාන්න ඕනේ. අපි සතුටින් ගෙදරට එනවා.
              </div>
              <div className="reading-english">
                On Saturday mother and I go to the shop. There are many vegetables and fruits in the shop.
                Mother buys fish, rice, and vegetables. I want to eat chicken. We come home happily.
              </div>
            </div>

            <div className="reading-passage">
              <h3>🚌 The School Trip</h3>
              <div className="reading-sinhala">
                අපේ පාසලෙන් ඊයේ චාරිකාවකට ගියා. අපි සත්ව උද්‍යානයට ගියා. එහි අපි අලි, සිංහ, වඳුරන් දැක්කා.
                අලි ගොඩක් ලොකු! වඳුරන් ගස්වල පැන්නා. සිංහයා නිදාගෙන හිටියා. අපි ගොඩක් සතුටු වුණා.
                සන්දේ වෙලාවට අපි ආපසු ගෙදර ආවා.
              </div>
              <div className="reading-english">
                Our school went on a trip yesterday. We went to the zoo. There we saw elephants, lions, and monkeys.
                The elephants were very big! Monkeys jumped on trees. The lion was sleeping. We were very happy.
                In the evening we came back home.
              </div>
            </div>

            <div className="activity-card">
              <h3>📖 Reading Questions</h3>
              <p>Answer these questions about "The School Trip":</p>
              <p>1. Where did the school go?</p>
              <p>2. What animals did they see?</p>
              <p>3. What was the lion doing?</p>
              <p>4. How did the children feel?</p>
            </div>
          </section>
        );

      case "writing":
        return (
          <section className="section active">
            <h2>Writing Practice - ලිවීමේ අභ්‍යාස</h2>
            <div className="grammar-box">
              <h4>Sentence Building - වාක්‍ය සෑදීම</h4>
              <p>Practice writing sentences with Subject + Object + Verb:</p>
              <p>
                <strong>Example: ළමයා + පොත + කියවනවා = ළමයා පොත කියවනවා</strong>
              </p>
            </div>

            <div className="activity-card">
              <h3>✍️ Writing Exercise 1</h3>
              <p>Complete these sentences in Sinhala:</p>
              <p>1. I _____ to school. (go)</p>
              <p>2. Mother _____ rice. (cooks)</p>
              <p>3. Children _____ in the garden. (play)</p>
              <p><strong>Answers:</strong></p>
              <p>1. මම පාසලට යනවා.</p>
              <p>2. අම්මා බත් උයනවා.</p>
              <p>3. ළමයින් උයනේ සෙල්ලම් කරනවා.</p>
            </div>

            <div className="activity-card">
              <h3>✍️ Writing Exercise 2 - Past Tense</h3>
              <p>Convert these present tense sentences to past tense:</p>
              <p>1. මම කනවා → _____ (I ate)</p>
              <p>2. ඔහු යනවා → _____ (He went)</p>
              <p>3. ඇය ලියනවා → _____ (She wrote)</p>
              <p><strong>Answers:</strong></p>
              <p>1. මම කෑවා</p>
              <p>2. ඔහු ගියා</p>
              <p>3. ඇය ලිව්වා</p>
            </div>

            <div className="activity-card">
              <h3>✍️ Writing Exercise 3 - My Day</h3>
              <p>Write about your typical day using at least 5 sentences in Sinhala.</p>
              <p>Include: waking up, eating, going to school, activities, sleeping</p>
              <p><strong>Example:</strong></p>
              <div className="reading-sinhala" style={{ background: "#f5f5f5", padding: "10px", borderRadius: "8px" }}>
                මම උදේ 6 ට නැගිටිනවා. මුණ හෝදලා, උදේ ආහාර කනවා.
                7.30 ට පාසලට යනවා. පාසලේදී ඉගෙන ගන්නවා.
                දවල් ආහාර කනවා. හවසට ගෙදර එනවා.
                ගෙදර ඇවිත් සෙල්ලම් කරනවා. රාත්‍රි 9 ට නිදාගන්නවා.
              </div>
            </div>

            <div className="activity-card">
              <h3>✍️ Writing Exercise 4 - My Family</h3>
              <p>Write about your family using at least 3 sentences in Sinhala.</p>
              <p>Include: family members, what they do, where you live</p>
              <p><strong>Example:</strong></p>
              <p>මගේ පවුලේ හතර දෙනෙක් ඉන්නවා. අපි කොළඹ ජීවත් වෙනවා. තාත්තා වැඩට යනවා.</p>
            </div>
          </section>
        );

      case "stories":
        return (
          <section className="section active">
            <h2>Stories - කතා</h2>
            <div className="story-card">
              <h3>🌳 The Kind Tree</h3>
              <div className="reading-sinhala">
                ගමේ ලොකු ගසක් තිබුණා. ඒ ගස ගොඩක් මිනිස්සුන්ට උදව් කළා. හිරු කරන දවස්වල මිනිස්සු ගස යට හිටියා.
                වර්ෂාකාලයේ ගස ආරක්ෂාව දුන්නා. කුරුල්ලන්ට ගහේ කූඩු හදන්න ඉඩ දුන්නා. සියලුදෙනා ගසට ස්තූති කළා.
              </div>
              <div className="reading-english">
                There was a big tree in the village. That tree helped many people. On sunny days people stayed under the tree.
                In rainy season the tree gave protection. It let birds build nests on the tree. Everyone thanked the tree.
              </div>
            </div>

            <div className="story-card">
              <h3>🐰 The Clever Rabbit</h3>
              <div className="reading-sinhala">
                කුඩා හාවෙක් වනයේ ජීවත් වුණා. ඔහු ගොඩක් බුද්ධිමත්. දිනක් ලොකු අලියෙක් හාවාගේ ගෙදර කඩන්න ආවා.
                හාවා කීවා "මම ඔබට මගේ නිධානය පෙන්වන්නම්." අලියා නිධානය දැක්කම තෘප්ත වුණා. ඔවුන් මිතුරන් වුණා.
              </div>
              <div className="reading-english">
                A small rabbit lived in the forest. He was very clever. One day a big elephant came to break the rabbit's house.
                The rabbit said "I will show you my treasure." When the elephant saw the treasure, he was satisfied. They became friends.
              </div>
            </div>

            <div className="story-card">
              <h3>🦁 The Lion and the Mouse</h3>
              <div className="reading-sinhala">
                දිනක් ලොකු සිංහයෙක් නිදාගෙන හිටියා. කුඩා මීයෙක් සිංහයාගේ මුහුණ උඩින් දිව්වා. සිංහයා අවදි වුණා.
                ඔහු මීයා අල්ලගත්තා. මීයා කීවා "කරුණාකර මාව යන්න දෙන්න. මම ඔබට උදව් කරන්නම්."
                සිංහයා මීයාට යන්න දුන්නා.

                දවසක් දැලක් සිංහයාව අල්ලගත්තා. සිංහයාට යන්න බැරි වුණා. මීයා ආවා.
                මීයා දැල කපලා සිංහයාව බේරගත්තා. සිංහයා මීයාට ස්තූති කළා.
              </div>
              <div className="reading-english">
                One day a big lion was sleeping. A small mouse ran over the lion's face. The lion woke up.
                He caught the mouse. The mouse said "Please let me go. I will help you."
                The lion let the mouse go.

                One day a net caught the lion. The lion couldn't escape. The mouse came.
                The mouse cut the net and saved the lion. The lion thanked the mouse.
              </div>
            </div>

            <div className="activity-card">
              <h3>🤔 Story Questions - The Lion and the Mouse</h3>
              <p>1. What did the mouse do when the lion was sleeping?</p>
              <p>2. What did the mouse promise the lion?</p>
              <p>3. How did the mouse save the lion?</p>
              <p>4. What is the moral of this story?</p>
            </div>

            <div className="story-card">
              <h3>🌟 The Honest Woodcutter</h3>
              <div className="reading-sinhala">
                දිනක් දරු කපන්නෙක් ගඟ අසලට ගියා. ඔහුගේ පොරව ගඟට වැටුණා. ඔහු ඉතා දුකට පත් වුණා.

                දෙවියන්ගේ පණිවිඩකාරයෙක් ආවා. ඔහු රන් පොරවක් ගෙනැවිත් "මේ ඔබේ පොරවද?" කියා ඇහුවා.
                දරු කපන්නා "නෑ" කීවා. ඊට පසු රිදී පොරවක් ගෙනැවිත් ඇහුවා. දරු කපන්නා "නෑ" කීවා.

                අවසානයේ ඔහුගේම යකඩ පොරව ගෙනැවිත් දුන්නා. දරු කපන්නා "ඔව්, මේ මගේ පොරව" කීවා.
                පණිවිඩකාරයා ඔහුගේ අවංකභාවයට සතුටු වී තුන්ම පොරව ඔහුට දුන්නා.
              </div>
              <div className="reading-english">
                One day a woodcutter went near the river. His axe fell into the river. He became very sad.

                A messenger from the gods came. He brought a golden axe and asked "Is this your axe?"
                The woodcutter said "No." Then he brought a silver axe and asked. The woodcutter said "No."

                Finally he brought his own iron axe and gave it. The woodcutter said "Yes, this is my axe."
                The messenger was pleased with his honesty and gave him all three axes.
              </div>
            </div>
          </section>
        );

      case "practice":
        return (
          <section className="section active">
            <h2>Speak & Learn - කතා කරමින් ඉගෙන ගන්න</h2>
            <PronunciationPractice
              words={practiceWords}
              title="Practice Grade 3 Words / පන්ති 3 වචන පුහුණුව"
            />
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Grade 3 Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g3" />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grade-content active">
      <div className="grade-info">
        <h2>🎓 Grade 3 - Grammar & Conversation</h2>
        <p>
          Learn basic grammar, tenses, longer sentences, everyday conversation, professions, clothing, and reading
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        gradeId="g3"
      />

      <ProgressBar progress={43} />

      {renderSection()}

      <style>{`
        .tense-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        .tense-table th, .tense-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .tense-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .tense-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .tense-table tr:hover {
          background-color: #f0f4ff;
        }
      `}</style>
    </div>
  );
};

export default Grade3;
