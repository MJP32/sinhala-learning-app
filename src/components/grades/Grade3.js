import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";

const Grade3 = () => {
  const [currentSection, setCurrentSection] = useState("grammar");

  const sections = [
    { id: "grammar", label: "Grammar" },
    { id: "conversation", label: "Conversation" },
    { id: "vocabulary", label: "Advanced Words" },
    { id: "reading", label: "Reading Practice" },
    { id: "writing", label: "Writing" },
    { id: "stories", label: "Stories" },
    { id: "quiz", label: "Quiz" },
  ];

  const places = [
    { sinhala: "පාසල", english: "School", pronunciation: "Pasala" },
    { sinhala: "රෝහල", english: "Hospital", pronunciation: "Rohala" },
    { sinhala: "වෙළෙඳසැල", english: "Shop", pronunciation: "Veledasala" },
    { sinhala: "උයන", english: "Garden", pronunciation: "Uyana" },
    {
      sinhala: "පුස්තකාලය",
      english: "Library",
      pronunciation: "Pusthakaalaya",
    },
    { sinhala: "පල්ලිය", english: "Temple", pronunciation: "Palliya" },
  ];

  const actions = [
    { sinhala: "දුවනවා", english: "Running", pronunciation: "Duwanawa" },
    {
      sinhala: "ඉගෙන ගන්නවා",
      english: "Learning",
      pronunciation: "Igena gannawa",
    },
    { sinhala: "ලියනවා", english: "Writing", pronunciation: "Liyanawa" },
    { sinhala: "කියවනවා", english: "Reading", pronunciation: "Kiyawanawa" },
    {
      sinhala: "ගායනා කරනවා",
      english: "Singing",
      pronunciation: "Gayana karanawa",
    },
    {
      sinhala: "නර්තනය කරනවා",
      english: "Dancing",
      pronunciation: "Narthana karanawa",
    },
  ];

  const conversations = [
    {
      sinhala: "ඔබට කොහොමද?",
      english: "How are you?",
      pronunciation: "Obata kohomada?",
    },
    {
      sinhala: "මට හොඳින්.",
      english: "I am fine.",
      pronunciation: "Mata hodin.",
    },
    {
      sinhala: "ඔබේ නම මොකද්ද?",
      english: "What is your name?",
      pronunciation: "Obe nama mokadda?",
    },
    {
      sinhala: "මගේ නම සුනිල්.",
      english: "My name is Sunil.",
      pronunciation: "Mage nama Sunil.",
    },
    {
      sinhala: "කරුණාකර මට උදව් කරන්න.",
      english: "Please help me.",
      pronunciation: "Karunaakara mata udaw karanna.",
    },
    {
      sinhala: "ඔබ කොහෙන්ද එන්නේ?",
      english: "Where are you from?",
      pronunciation: "Oba kohenday enne?",
    },
    {
      sinhala: "මම කොළඹ ඉදන් එනවා.",
      english: "I come from Colombo.",
      pronunciation: "Mama Kolamba idan enawa.",
    },
  ];

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
      question: 'What does "කියවනවා" mean?',
      options: ["Writing", "Reading", "Speaking", "Listening"],
      correct: 1,
    },
    {
      question: 'How do you ask "How are you?"',
      options: [
        "ඔබේ නම මොකද්ද?",
        "ඔබට කොහොමද?",
        "ඔබ කොහේද?",
        "ඔබ මොකද කරන්නේ?",
      ],
      correct: 1,
    },
    {
      question: 'What does "ලියනවා" mean?',
      options: ["Reading", "Writing", "Drawing", "Singing"],
      correct: 1,
    },
    {
      question: 'Which place is "උයන"?',
      options: ["House", "School", "Garden", "Shop"],
      correct: 2,
    },
    {
      question: 'What is the plural of "ළමයා"?',
      options: ["ළමයන්", "ළමයින්", "ළමයලා", "ළමයට"],
      correct: 1,
    },
    {
      question: 'How do you say "Please help me"?',
      options: [
        "මට ආදරේයි",
        "කරුණාකර මට උදව් කරන්න",
        "මම යනවා",
        "ඔබට ස්තූතියි",
      ],
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
              <p>
                <strong>කන (eat) + නවා = කනවා (eating/eat)</strong>
              </p>
              <p>
                <strong>යන (go) + නවා = යනවා (going/go)</strong>
              </p>
              <p>
                <strong>බොන (drink) + නවා = බොනවා (drinking/drink)</strong>
              </p>
            </div>
            <div className="grammar-box">
              <h4>Plural Forms - බහුවචන</h4>
              <p>Add -ලා (-la) or -න් (-n) to make plurals:</p>
              <p>
                <strong>ළමයා (child) → ළමයින් (children)</strong>
              </p>
              <p>
                <strong>පොත (book) → පොත් (books)</strong>
              </p>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">ළමයා පාසලට යනවා.</div>
              <div className="sentence-english">The child goes to school.</div>
              <div className="sentence-pronunciation">
                Lamaya pasalata yanawa.
              </div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">ළමයින් උයනේ සෙල්ලම් කරනවා.</div>
              <div className="sentence-english">
                Children are playing in the garden.
              </div>
              <div className="sentence-pronunciation">
                Lamayiny uyane sellam karanawa.
              </div>
            </div>
          </section>
        );

      case "conversation":
        return (
          <section className="section active">
            <h2>Everyday Conversation - දෛනික සංවාදය</h2>
            <h3
              style={{
                color: "#667eea",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Basic Questions & Answers
            </h3>
            {conversations.map((conv, index) => (
              <div key={index} className="sentence-practice">
                <div className="sentence-sinhala">{conv.sinhala}</div>
                <div className="sentence-english">{conv.english}</div>
                <div className="sentence-pronunciation">
                  {conv.pronunciation}
                </div>
              </div>
            ))}
            <div className="activity-card">
              <h3>💬 Conversation Practice</h3>
              <p>
                Practice these conversations with a friend or family member!
              </p>
              <p>
                <strong>Challenge:</strong> Can you create your own conversation
                using these phrases?
              </p>
            </div>
          </section>
        );

      case "vocabulary":
        return (
          <section className="section active">
            <h2>Advanced Vocabulary - උසස් වචන</h2>
            <h3
              style={{
                color: "#667eea",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
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
            <h3
              style={{
                color: "#667eea",
                margin: "30px 0 20px 0",
                textAlign: "center",
              }}
            >
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
          </section>
        );

      case "reading":
        return (
          <section className="section active">
            <h2>Reading Practice - කියවීමේ අභ්‍යාස</h2>
            <div className="reading-passage">
              <h3>📚 The School Day</h3>
              <div className="reading-sinhala">
                සුනිල් හොඳ ළමයෙක්. ඔහු දවසින් දවස පාසලට යනවා. පාසලේදී ඔහු ගණිතය,
                සිංහල, ඉංග්‍රීසි ඉගෙන ගන්නවා. ගුරුවරුන් ඔහුට ගොඩක් ආදරේයි. ඔහුගේ
                මිතුරන් ද ඔහුව ආදරේ කරනවා.
              </div>
              <div className="reading-english">
                Sunil is a good boy. He goes to school every day. At school he
                learns mathematics, Sinhala, and English. The teachers love him
                very much. His friends also love him.
              </div>
            </div>
            <div className="activity-card">
              <h3>📖 Reading Questions</h3>
              <p>1. What subjects does Sunil learn at school?</p>
              <p>2. How do teachers feel about Sunil?</p>
              <p>3. Does Sunil go to school every day?</p>
            </div>
            <div className="reading-passage">
              <h3>🏡 The Village Market</h3>
              <div className="reading-sinhala">
                සෙනසුරාදා දවසේ අම්මා සහ මම කඩ යනවා. කඩේ ගොඩක් එළවළු, පළතුරු
                තියෙනවා. අම්මා මාළු, බත්, එළවළු ගන්නවා. මම කුකුළු මස් කාන්න ඕනේ.
                අපි සතුටින් ගෙදරට එනවා.
              </div>
              <div className="reading-english">
                On Saturday mother and I go to the shop. There are many
                vegetables and fruits in the shop. Mother buys fish, rice, and
                vegetables. I want to eat chicken. We come home happily.
              </div>
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
                <strong>
                  Example: ළමයා + පොත + කියවනවා = ළමයා පොත කියවනවා
                </strong>
              </p>
            </div>
            <div className="activity-card">
              <h3>✍️ Writing Exercise 1</h3>
              <p>Complete these sentences in Sinhala:</p>
              <p>1. I _____ to school. (go)</p>
              <p>2. Mother _____ rice. (cooks)</p>
              <p>3. Children _____ in the garden. (play)</p>
              <p>
                <strong>Answers:</strong>
              </p>
              <p>1. මම පාසලට යනවා.</p>
              <p>2. අම්මා බත් උයනවා.</p>
              <p>3. ළමයින් උයනේ සෙල්ලම් කරනවා.</p>
            </div>
            <div className="activity-card">
              <h3>✍️ Writing Exercise 2</h3>
              <p>
                Write about your family using at least 3 sentences in Sinhala.
              </p>
              <p>Include: family members, what they do, where you live</p>
              <p>
                <strong>Example:</strong>
              </p>
              <p>
                මගේ පවුලේ හතර දෙනෙක් ඉන්නවා. අපි කොළඹ ජීවත් වෙනවා. තාත්තා වැඩට
                යනවා.
              </p>
            </div>
            <div className="activity-card">
              <h3>✍️ Daily Routine</h3>
              <p>
                Write about your daily routine using present tense verbs ending
                in -නවා:
              </p>
              <p>
                <strong>Useful verbs:</strong> නැගිටිනවා (wake up), නානවා
                (bathe), කනවා (eat), යනවා (go)
              </p>
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
                ගමේ ලොකු ගසක් තිබුණා. ඒ ගස ගොඩක් මිනිස්සුන්ට උදව් කළා. හිරු කරන
                දවස්වල මිනිස්සු ගස යට හිටියා. වර්ෂාකාලයේ ගස ආරක්ෂාව දුන්නා.
                කුරුල්ලන්ට ගහේ කූඩු හදන්න ඉඩ දුන්නා. සියලුදෙනා ගසට ස්තූති කළා.
              </div>
              <div className="reading-english">
                There was a big tree in the village. That tree helped many
                people. On sunny days people stayed under the tree. In rainy
                season the tree gave protection. It let birds build nests on the
                tree. Everyone thanked the tree.
              </div>
            </div>
            <div className="activity-card">
              <h3>🤔 Story Questions</h3>
              <p>1. How did the tree help people on sunny days?</p>
              <p>2. What did birds do on the tree?</p>
              <p>3. How did people feel about the tree?</p>
            </div>
            <div className="story-card">
              <h3>🐰 The Clever Rabbit</h3>
              <div className="reading-sinhala">
                කුඩා හාවෙක් වනයේ ජීවත් වුණා. ඔහු ගොඩක් බුද්ධිමත්. දිනක් ලොකු
                අලියෙක් හාවාගේ ගෙදර කඩන්න ආවා. හාවා කීවා "මම ඔබට මගේ නිධානය
                පෙන්වන්නම්." අලියා නිධානය දැක්කම තෘප්ත වුණා. ඔවුන් මිතුරන් වුණා.
              </div>
              <div className="reading-english">
                A small rabbit lived in the forest. He was very clever. One day
                a big elephant came to break the rabbit's house. The rabbit said
                "I will show you my treasure." When the elephant saw the
                treasure, he was satisfied. They became friends.
              </div>
            </div>
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
          <strong>Age: 8-9 years</strong> | Learn basic grammar, longer
          sentences, everyday conversation, and reading
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <ProgressBar progress={43} />

      {renderSection()}
    </div>
  );
};

export default Grade3;
