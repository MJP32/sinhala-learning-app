import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";

const Grade5 = () => {
  const [currentSection, setCurrentSection] = useState("reading");

  const sections = [
    { id: "reading", label: "Advanced Reading" },
    { id: "grammar", label: "Complex Grammar" },
    { id: "writing", label: "Formal Writing" },
    { id: "vocabulary", label: "Academic Words" },
    { id: "idioms", label: "Idioms & Phrases" },
    { id: "literature", label: "Classical Literature" },
    { id: "culture", label: "Heritage & Identity" },
    { id: "formal", label: "Formal Language" },
    { id: "projects", label: "Research Projects" },
    { id: "practice", label: "Speak & Learn" },
    { id: "quiz", label: "Comprehensive Quiz" },
  ];

  const practiceWords = [
    { sinhala: "විද්‍යාව", english: "Science", pronunciation: "vid-yaa-vuh" },
    { sinhala: "ඉතිහාසය", english: "History", pronunciation: "i-thi-haa-suh-yuh" },
    { sinhala: "දළදා මාලිගාව", english: "Temple of the Tooth", pronunciation: "duh-luh-daa maa-li-gaa-vuh" },
    { sinhala: "මහාවංශය", english: "The Mahavamsa", pronunciation: "muh-haa-vuhn-shuh-yuh" },
    { sinhala: "දුටුගැමුණු", english: "King Dutugemunu", pronunciation: "doo-too-geh-moo-noo" },
    { sinhala: "අනාගතය", english: "Future", pronunciation: "uh-naa-guh-thuh-yuh" },
    { sinhala: "උරුමය", english: "Heritage", pronunciation: "oo-roo-muh-yuh" },
    { sinhala: "සම්ප්‍රදාය", english: "Tradition", pronunciation: "sum-pruh-daa-yuh" },
    { sinhala: "ගෞරවය", english: "Respect", pronunciation: "gow-ruh-vuh-yuh" },
    { sinhala: "ප්‍රඥාව", english: "Wisdom", pronunciation: "pruh-gnyaa-vuh" },
  ];

  // Academic vocabulary - expanded
  const academicVocabulary = [
    { sinhala: "විද්‍යාව", english: "Science", pronunciation: "vid-yaa-vuh" },
    { sinhala: "ඉතිහාසය", english: "History", pronunciation: "i-thi-haa-suh-yuh" },
    { sinhala: "භූගෝලය", english: "Geography", pronunciation: "bhoo-goh-luh-yuh" },
    { sinhala: "ගණිතය", english: "Mathematics", pronunciation: "guh-ni-thuh-yuh" },
    { sinhala: "පරිසරය", english: "Environment", pronunciation: "puh-ri-suh-ruh-yuh" },
    { sinhala: "සමාජය", english: "Society", pronunciation: "suh-maa-juh-yuh" },
    { sinhala: "ආර්ථිකය", english: "Economy", pronunciation: "aar-thee-kuh-yuh" },
    { sinhala: "රාජ්‍යයය", english: "Government", pronunciation: "raaj-yuh-yuh" },
    { sinhala: "සෞඛ්‍යය", english: "Health", pronunciation: "sow-khyuh-yuh" },
    { sinhala: "තාක්ෂණය", english: "Technology", pronunciation: "thaak-shuh-nuh-yuh" },
    { sinhala: "කෘෂිකර්මය", english: "Agriculture", pronunciation: "kroo-shee-kur-muh-yuh" },
    { sinhala: "අධ්‍යාපනය", english: "Education", pronunciation: "uhd-yaa-puh-nuh-yuh" },
  ];

  // Advanced culture items - expanded
  const advancedCulture = [
    { sinhala: "දළදා මාලිගාව", english: "Temple of the Tooth", pronunciation: "duh-luh-daa maa-li-gaa-vuh" },
    { sinhala: "ලංකාතිලක", english: "Pride of Lanka", pronunciation: "luhn-kaa-thi-luh-kuh" },
    { sinhala: "රාවණ රජ", english: "King Ravana", pronunciation: "raa-vuh-nuh ruh-juh" },
    { sinhala: "විජය කුමාරයා", english: "Prince Vijaya", pronunciation: "vi-juh-yuh koo-maa-ruh-yaa" },
    { sinhala: "මහාවංශය", english: "The Mahavamsa", pronunciation: "muh-haa-vuhn-shuh-yuh" },
    { sinhala: "සිංහ ධජය", english: "Lion Flag", pronunciation: "sin-huh dhuh-juh-yuh" },
    { sinhala: "දුටුගැමුණු", english: "King Dutugemunu", pronunciation: "doo-too-geh-moo-noo" },
    { sinhala: "පරාක්‍රමබාහු", english: "Parakramabahu", pronunciation: "puh-raak-ruh-muh-baa-hoo" },
    { sinhala: "ශ්‍රී මහා බෝධිය", english: "Sri Maha Bodhi", pronunciation: "shree muh-haa boh-dhee-yuh" },
    { sinhala: "රුවන්වැලිසෑය", english: "Ruwanweliseya", pronunciation: "roo-vuhn-veh-lee-seh-yuh" },
    { sinhala: "ගල් විහාරය", english: "Rock Temple", pronunciation: "guhl vee-haa-ruh-yuh" },
    { sinhala: "පුරාණ ශිලාලේඛන", english: "Ancient Inscriptions", pronunciation: "poo-raa-nuh shee-laa-lay-khuh-nuh" },
  ];

  // Literary terms - expanded
  const literaryTerms = [
    { sinhala: "කවිය", english: "Poetry", pronunciation: "kuh-vi-yuh" },
    { sinhala: "නවකතාව", english: "Novel", pronunciation: "nuh-vuh-kuh-thaa-vuh" },
    { sinhala: "කෙටිකතාව", english: "Short Story", pronunciation: "keh-ti-kuh-thaa-vuh" },
    { sinhala: "නාටකය", english: "Drama", pronunciation: "naa-tuh-kuh-yuh" },
    { sinhala: "අලංකාරය", english: "Metaphor", pronunciation: "uh-luhn-kaa-ruh-yuh" },
    { sinhala: "උපමාව", english: "Simile", pronunciation: "oo-puh-maa-vuh" },
    { sinhala: "රසය", english: "Sentiment/Mood", pronunciation: "ruh-suh-yuh" },
    { sinhala: "ලක්ෂණය", english: "Characteristic", pronunciation: "luhk-shuh-nuh-yuh" },
    { sinhala: "පාඨකයා", english: "Reader", pronunciation: "paa-thuh-kuh-yaa" },
    { sinhala: "කතෘ", english: "Author", pronunciation: "kuh-throo" },
    { sinhala: "ඡන්දස්", english: "Metre/Rhythm", pronunciation: "chun-duhs" },
    { sinhala: "සංකේතය", english: "Symbol", pronunciation: "suhn-kay-thuh-yuh" },
  ];

  // Sinhala idioms
  const idioms = [
    {
      sinhala: "කටට එන කතාව",
      literal: "A story that comes to the mouth",
      meaning: "Speaking without thinking / Blurting out",
    },
    {
      sinhala: "අත පා පෙන්වනවා",
      literal: "Showing hands and feet",
      meaning: "Showing off / Boasting",
    },
    {
      sinhala: "හිස කුරන්නවා",
      literal: "Scratching the head",
      meaning: "Being confused or puzzled",
    },
    {
      sinhala: "ඇස් පියාගන්නවා",
      literal: "Closing the eyes",
      meaning: "Ignoring something deliberately",
    },
    {
      sinhala: "කන් දෙනවා",
      literal: "Giving ears",
      meaning: "Listening carefully",
    },
    {
      sinhala: "අත හිස් වෙනවා",
      literal: "Hand becoming empty",
      meaning: "Losing everything / Becoming poor",
    },
    {
      sinhala: "කට වහගන්නවා",
      literal: "Closing the mouth",
      meaning: "Keeping quiet / Not revealing secrets",
    },
    {
      sinhala: "කකුල් දෙඟිල වෙනවා",
      literal: "Legs becoming two ways",
      meaning: "Being indecisive / In a dilemma",
    },
  ];

  // Formal expressions
  const formalExpressions = [
    { formal: "කරුණාකර", informal: "ප්ලීස්", english: "Please" },
    { formal: "ස්තූතියි", informal: "තෑන්ක්ස්", english: "Thank you" },
    { formal: "සමාවන්න", informal: "සොරි", english: "Sorry" },
    { formal: "ආයුබෝවන්", informal: "හායි", english: "Hello" },
    { formal: "ගරු මහත්මයා", informal: "මහත්තයා", english: "Respected Sir" },
    { formal: "ගරු මහත්මිය", informal: "මැඩම්", english: "Respected Madam" },
    { formal: "අවසර දෙන්න", informal: "ඉඩ දෙන්න", english: "Please permit" },
    { formal: "පහසුකම් සළසන්න", informal: "හදන්න", english: "Please arrange" },
  ];

  // Verb conjugations
  const verbConjugations = [
    {
      verb: "යනවා (to go)",
      present: "යනවා",
      past: "ගියා",
      perfect: "ගිහිල්ලා",
      future: "යන්නම්",
      continuous: "යමින්",
    },
    {
      verb: "කනවා (to eat)",
      present: "කනවා",
      past: "කෑවා",
      perfect: "කාලා",
      future: "කන්නම්",
      continuous: "කමින්",
    },
    {
      verb: "එනවා (to come)",
      present: "එනවා",
      past: "ආවා",
      perfect: "ඇවිල්ලා",
      future: "එන්නම්",
      continuous: "එමින්",
    },
    {
      verb: "බලනවා (to see)",
      present: "බලනවා",
      past: "බැලුවා",
      perfect: "බලලා",
      future: "බලන්නම්",
      continuous: "බලමින්",
    },
    {
      verb: "කරනවා (to do)",
      present: "කරනවා",
      past: "කළා",
      perfect: "කරලා",
      future: "කරන්නම්",
      continuous: "කරමින්",
    },
  ];

  const quizQuestions = [
    {
      question: "What is the Mahavamsa?",
      options: ["A king", "A chronicle/history book", "A temple", "A festival"],
      correct: 1,
    },
    {
      question: 'What does "විද්‍යාව" mean?',
      options: ["History", "Geography", "Science", "Mathematics"],
      correct: 2,
    },
    {
      question: "Who was Prince Vijaya?",
      options: ["A poet", "First king of Sri Lanka", "A warrior", "A priest"],
      correct: 1,
    },
    {
      question: 'What is "දළදා මාලිගාව"?',
      options: ["A palace", "Temple of the Tooth", "A museum", "A library"],
      correct: 1,
    },
    {
      question: 'Which word means "poetry"?',
      options: ["නවකතාව", "කවිය", "නාටකය", "කෙටිකතාව"],
      correct: 1,
    },
    {
      question: "What type of verb ending indicates completed past action?",
      options: ["-නවා", "-න්නම්", "-ලා/-වා", "-මින්"],
      correct: 2,
    },
    {
      question: 'What does "පරිසරය" mean?',
      options: ["Society", "Science", "Environment", "Geography"],
      correct: 2,
    },
    {
      question: "Which ancient text records Sri Lankan history?",
      options: ["Ramayana", "Mahavamsa", "Vedas", "Tripitaka"],
      correct: 1,
    },
    {
      question: 'What is "උපමාව" in literature?',
      options: ["Metaphor", "Simile", "Drama", "Poetry"],
      correct: 1,
    },
    {
      question: "What does the lion on the Sri Lankan flag represent?",
      options: ["Courage and strength", "Peace", "Wisdom", "Prosperity"],
      correct: 0,
    },
    {
      question: 'What does the idiom "කන් දෙනවා" mean?',
      options: ["Speaking loudly", "Listening carefully", "Ignoring", "Forgetting"],
      correct: 1,
    },
    {
      question: 'What is the formal way to say "Thank you"?',
      options: ["තෑන්ක්ස්", "ස්තූතියි", "ගුඩ්", "ඕකේ"],
      correct: 1,
    },
    {
      question: 'What does "ඉතිහාසය" mean?',
      options: ["Science", "History", "Geography", "Literature"],
      correct: 1,
    },
    {
      question: "Which suffix makes a verb continuous?",
      options: ["-ලා", "-නවා", "-මින්", "-ද"],
      correct: 2,
    },
    {
      question: 'What is "අලංකාරය" in literature?',
      options: ["Simile", "Metaphor", "Rhyme", "Rhythm"],
      correct: 1,
    },
    {
      question: "What was Sri Lanka called in ancient times?",
      options: ["Ceylon", "Lanka", "Heladiva", "All of these"],
      correct: 3,
    },
    {
      question: 'What is the past tense of "එනවා" (to come)?',
      options: ["ගියා", "ආවා", "කෑවා", "බැලුවා"],
      correct: 1,
    },
    {
      question: 'What does "තාක්ෂණය" mean?',
      options: ["Agriculture", "Education", "Technology", "Economy"],
      correct: 2,
    },
    {
      question: "Who is mentioned in legends as a powerful king?",
      options: ["Vijaya", "Ravana", "Dutugemunu", "All of these"],
      correct: 3,
    },
    {
      question: 'What does "භූගෝලය" mean?',
      options: ["History", "Science", "Mathematics", "Geography"],
      correct: 3,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "reading":
        return (
          <section className="section active">
            <h2>Advanced Reading - උසස් කියවීම</h2>
            <div className="reading-passage">
              <h3>The History of Sri Lanka - ශ්‍රී ලංකාවේ ඉතිහාසය</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාවට අවුරුදු දෙදහස් පන්සියයකට වඩා පැරණි ලිඛිත ඉතිහාසයක්
                තියෙනවා. මහාවංශය සහ දීපවංශය වැනි පුරාණ ග්‍රන්ථවල අපේ රටේ ඉතිහාසය
                ලියැවී තියෙනවා. විජය කුමාරයා ඉන්දියාවෙන් ශ්‍රී ලංකාවට පැමිණි පළමු
                සිංහල රජු විය. ඔහු සිංහල ජාතියේ ආරම්භකයා ලෙස සැලකෙනවා.
                <br /><br />
                අනුරාධපුරය, පොළොන්නරුව, දඹදෙණිය, යාපනය, කෝට්ටේ සහ කන්ද යන
                රාජධානි පිළිවෙලින් පැවතුණා. එක් එක් කාලයේ විශේෂ ස්ථාපනයන් සහ
                සංස්කෘතික දියුණුවක් ඇති වුණා. බුදු දහම ආගමන වී වසර දෙදහසකට වඩා
                ඉතිහාසයක් තියෙනවා.
              </div>
              <div className="reading-english">
                Sri Lanka has a written history of more than two thousand five
                hundred years. Our country's history is recorded in ancient
                texts like the Mahavamsa and Dipavamsa. Prince Vijaya was the
                first Sinhalese king who came from India to Sri Lanka. He is
                considered the founder of the Sinhalese nation.
                <br /><br />
                The kingdoms of Anuradhapura, Polonnaruwa, Dambadeniya, Yapahuwa,
                Kotte, and Kandy existed in succession. Each era had special
                establishments and cultural development. Buddhism has a history
                of more than two thousand years since its arrival.
              </div>
            </div>

            <div className="reading-passage">
              <h3>Environmental Awareness - පරිසර දැනුවත්භාවය</h3>
              <div className="reading-sinhala">
                අපේ පරිසරය ආරක්ෂා කිරීම අපේ වගකීමකි. වනාන්තර කප්පාදුව, ජල දූෂණය
                සහ වාතය දූෂණය වැනි ගැටලු අපේ පරිසරයට හානි කරනවා. ශ්‍රී ලංකාවේ
                විශේෂ සත්ත්ව හා ශාක විශේෂ බොහොමයක් වෙනත් රටවල නැහැ.
                <br /><br />
                හාතිය, මුවා, තැඹිලි මැසි, ශ්‍රී ලාංකික කුරුළු විශේෂ අපේ රටට
                සුවිශේෂයි. මේ සත්ත්වයින් සහ ශාක ආරක්ෂා කිරීම අපි කාගේම
                වගකීමකි. ජාතික වනෝද්‍යාන සහ රක්ෂිත ප්‍රදේශ මේ සඳහා උපකාර
                කරනවා.
              </div>
              <div className="reading-english">
                Protecting our environment is our responsibility. Problems like
                deforestation, water pollution, and air pollution harm our
                environment. Many special animal and plant species in Sri Lanka
                don't exist in other countries.
                <br /><br />
                The elephant, deer, Ceylon leopard, and Sri Lankan bird species
                are unique to our country. Protecting these animals and plants
                is everyone's responsibility. National parks and protected areas
                help with this.
              </div>
            </div>

            <div className="reading-passage">
              <h3>The Value of Education - අධ්‍යාපනයේ වටිනාකම</h3>
              <div className="reading-sinhala">
                අධ්‍යාපනය මිනිසාගේ ජීවිතයේ ඉතාමත් වැදගත් කොටසකි. එය අපට දැනුම,
                කුසලතා සහ ජීවිතයට අවශ්‍ය හැකියාවන් ලබා දෙනවා. අධ්‍යාපනය තුළින්
                අපට ලෝකය තේරුම් ගන්න පුළුවන්.
                <br /><br />
                ශ්‍රී ලංකාවේ සාමාන්‍ය අධ්‍යාපනය නොමිලේ ලබා දෙනවා. මෙය සෑම
                දරුවෙකුටම අධ්‍යාපනය ලැබීමේ අයිතිය සහතික කරනවා. හොඳ අධ්‍යාපනයක්
                ඇති පුද්ගලයෙකුට රැකියා අවස්ථා වැඩියි. අධ්‍යාපනය රටේ සංවර්ධනයට
                ඉතා වැදගත්.
              </div>
              <div className="reading-english">
                Education is a very important part of human life. It gives us
                knowledge, skills, and abilities needed for life. Through
                education, we can understand the world.
                <br /><br />
                In Sri Lanka, general education is provided free of charge.
                This ensures every child's right to education. A person with
                good education has more job opportunities. Education is very
                important for the country's development.
              </div>
            </div>

            <div className="activity-card">
              <h3>Comprehension Questions</h3>
              <p>1. What are the ancient chronicles that record Sri Lankan history?</p>
              <p>2. Why is Prince Vijaya important in Sinhalese history?</p>
              <p>3. Name at least four ancient capitals of Sri Lanka.</p>
              <p>4. Why is education important according to the passage?</p>
              <p>5. What unique wildlife does Sri Lanka have?</p>
            </div>
          </section>
        );

      case "grammar":
        return (
          <section className="section active">
            <h2>Complex Grammar - සංකීර්ණ ව්‍යාකරණ</h2>

            <div className="grammar-box">
              <h4>Complete Verb Conjugation Table</h4>
              <table className="conjugation-table">
                <thead>
                  <tr>
                    <th>Verb</th>
                    <th>Present</th>
                    <th>Past</th>
                    <th>Perfect</th>
                    <th>Future</th>
                    <th>Continuous</th>
                  </tr>
                </thead>
                <tbody>
                  {verbConjugations.map((verb, index) => (
                    <tr key={index}>
                      <td><strong>{verb.verb}</strong></td>
                      <td>{verb.present}</td>
                      <td>{verb.past}</td>
                      <td>{verb.perfect}</td>
                      <td>{verb.future}</td>
                      <td>{verb.continuous}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Perfect Tense - සම්පූර්ණ කාලය</h4>
              <p>Using -ලා (-laa) for completed actions with ongoing relevance:</p>
              <p><strong>ගිහිල්ලා (has gone), කාලා (has eaten), ඇවිල්ලා (has come)</strong></p>
              <p><strong>Example: මම පොත කියවලා තියෙනවා (I have read the book)</strong></p>
            </div>

            <div className="grammar-box">
              <h4>Passive Voice - කර්මකාරක ක්‍රියා</h4>
              <p>Passive constructions using -උණා (-unaa) or -වුණා (-wunaa):</p>
              <p><strong>ලියැවුණා (was written), කැඩුණා (was broken), හදවුණා (was made)</strong></p>
              <p><strong>Example: මේ පොත 1900 ලියැවුණා (This book was written in 1900)</strong></p>
            </div>

            <div className="grammar-box">
              <h4>Conditional Sentences - කොන්දේසි වාක්‍ය</h4>
              <p>Using නම් (if) and -ත් (-th) for conditions:</p>
              <p><strong>ඔබ ආවොත් (if you come), වැස්ස ආවොත් (if rain comes)</strong></p>
              <p><strong>Example: ඔබ ආවොත් අපි යමු (If you come, we will go)</strong></p>
            </div>

            <div className="grammar-box">
              <h4>Reported Speech - වක්‍ර කථනය</h4>
              <p>Using කියලා (saying that) for indirect speech:</p>
              <p><strong>ඔහු කිව්වා ඔහු යනවා කියලා (He said that he is going)</strong></p>
              <p><strong>ඇය කිව්වා ඇය එන්නේ නෑ කියලා (She said that she is not coming)</strong></p>
            </div>

            <div className="grammar-box">
              <h4>Causative Verbs - හේතුකාරක ක්‍රියා</h4>
              <p>Making someone do something using -වනවා (-wanawa):</p>
              <p><strong>කරවනවා (make do), ලියවනවා (make write), යවනවා (make go)</strong></p>
              <p><strong>Example: ගුරුතුමා ළමයින්ට පොත කියවවනවා (The teacher makes children read)</strong></p>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">මම මේ පොත කියවලා තියෙනවා.</div>
              <div className="sentence-english">I have read this book.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">වැස්ස ආවොත් අපි ගෙදර ඉන්නවා.</div>
              <div className="sentence-english">If it rains, we will stay home.</div>
            </div>

            <div className="sentence-practice">
              <div className="sentence-sinhala">ගුරුවරයා කිව්වා හෙට පරීක්ෂණයක් තියෙනවා කියලා.</div>
              <div className="sentence-english">The teacher said that there is an exam tomorrow.</div>
            </div>
          </section>
        );

      case "writing":
        return (
          <section className="section active">
            <h2>Formal Writing - විධිමත් ලිවීම</h2>

            <div className="activity-card">
              <h3>Formal Letter Writing - විධිමත් ලිපි ලිවීම</h3>
              <p><strong>Structure of a Formal Letter:</strong></p>
              <div className="letter-structure" style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                fontFamily: "monospace"
              }}>
                <p>[යවන්නාගේ ලිපිනය - Sender's Address]</p>
                <p>[දිනය - Date]</p>
                <br />
                <p>ගරු [ලබන්නාගේ නම],</p>
                <p>[තනතුර/ආයතනය]</p>
                <p>[ලිපිනය]</p>
                <br />
                <p>ගරු මහත්මයා/මහත්මිය,</p>
                <br />
                <p><strong>[ලිපියේ මාතෘකාව - Subject]</strong></p>
                <br />
                <p>[ලිපියේ අන්තර්ගතය - Body: 2-3 paragraphs]</p>
                <br />
                <p>ස්තූතියි,</p>
                <p>[ඔබේ නම - Your Name]</p>
              </div>
            </div>

            <div className="activity-card">
              <h3>Sample Formal Letter</h3>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  45/2, මල්වත්ත පාර,<br />
                  කොළඹ 10.<br />
                  2024.01.15<br /><br />
                  ගරු විදුහල්පති මහතා,<br />
                  ආනන්ද විද්‍යාලය,<br />
                  කොළඹ 10.<br /><br />
                  ගරු මහත්මයා,<br /><br />
                  <strong>නිවාඩු ඉල්ලීම පිළිබඳව</strong><br /><br />
                  මා ඔබගේ පාසලේ 10 ශ්‍රේණියේ සිසුවෙක් වන අතර, පවුල් කටයුත්තක් නිසා 2024.01.20 සිට 2024.01.22 දක්වා නිවාඩු අවශ්‍ය වේ.<br /><br />
                  කරුණාකර මට මෙම නිවාඩු ලබාදෙන මෙන් ඉල්ලා සිටිමි.<br /><br />
                  ස්තූතියි,<br />
                  කමල් පෙරේරා
                </div>
              </div>
            </div>

            <div className="activity-card">
              <h3>Essay Structure - රචනා ව්‍යුහය</h3>
              <p><strong>Topic: The Importance of Education (අධ්‍යාපනයේ වැදගත්කම)</strong></p>
              <p>A proper essay should have:</p>
              <p>1. <strong>හැඳින්වීම (Introduction)</strong> - Introduce the topic</p>
              <p>2. <strong>ප්‍රධාන කරුණු (Main points)</strong> - 2-3 paragraphs</p>
              <p>3. <strong>නිගමනය (Conclusion)</strong> - Summarize and conclude</p>
            </div>

            <div className="activity-card">
              <h3>Report Writing - වාර්තා ලිවීම</h3>
              <p><strong>Write a report about a school event:</strong></p>
              <p>Include: Event name, date, location, activities, participants, outcomes</p>
              <p>Use formal language and third-person perspective</p>
            </div>

            <div className="activity-card">
              <h3>Article Writing - ලිපි ලිවීම</h3>
              <p><strong>Topic: Protecting Our Heritage Sites</strong></p>
              <p>Write a 200-word article about why we should protect ancient sites like Sigiriya and Anuradhapura.</p>
            </div>
          </section>
        );

      case "vocabulary":
        return (
          <section className="section active">
            <h2>Academic Vocabulary - අධ්‍යයන වචන</h2>

            <h3 style={{ color: "#667eea", marginBottom: "20px", textAlign: "center" }}>
              School Subjects & Fields - පාසල් විෂයයන් සහ ක්ෂේත්‍ර
            </h3>
            <div className="word-grid">
              {academicVocabulary.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Literary Terms - සාහිත්‍යික පද
            </h3>
            <div className="word-grid">
              {literaryTerms.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>

            <div className="activity-card">
              <h3>Word Families - වචන පවුල්</h3>
              <p><strong>Root: ලිය (write)</strong></p>
              <p>ලියනවා (to write), ලිපිය (letter), ලේඛකයා (writer), ලේඛනය (document)</p>
              <p><strong>Root: කිය (say/read)</strong></p>
              <p>කියවනවා (to read), කියන්නා (speaker), කථාව (story/speech)</p>
              <p><strong>Root: ඉගෙන (learn)</strong></p>
              <p>ඉගෙන ගන්නවා (to learn), ඉගැන්වීම (teaching), ශිෂ්‍යයා (student)</p>
              <p><strong>Root: දැන (know)</strong></p>
              <p>දන්නවා (to know), දැනුම (knowledge), දැනුවත් (aware)</p>
            </div>
          </section>
        );

      case "idioms":
        return (
          <section className="section active">
            <h2>Idioms & Phrases - මුහුණු වැකි සහ වාක්‍ය</h2>
            <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
              Idioms are expressions where the meaning is different from the literal words.
            </p>

            {idioms.map((idiom, index) => (
              <div key={index} className="idiom-card" style={{
                background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <div className="sentence-sinhala" style={{ fontSize: "1.3em", marginBottom: "10px" }}>
                  {idiom.sinhala}
                </div>
                <div style={{ marginBottom: "5px", fontStyle: "italic" }}>
                  <strong>Literal:</strong> {idiom.literal}
                </div>
                <div style={{ color: "#4a4a4a" }}>
                  <strong>Meaning:</strong> {idiom.meaning}
                </div>
              </div>
            ))}

            <div className="activity-card">
              <h3>📝 Idiom Practice</h3>
              <p>Match the idiom with its meaning:</p>
              <p>1. කටට එන කතාව → _____</p>
              <p>2. ඇස් පියාගන්නවා → _____</p>
              <p>3. කන් දෙනවා → _____</p>
              <p><strong>Answers:</strong> 1. Speaking without thinking, 2. Ignoring deliberately, 3. Listening carefully</p>
            </div>

            <div className="activity-card">
              <h3>Create Sentences</h3>
              <p>Write a sentence using each idiom:</p>
              <p>Example: ඔහු පන්තියේදී <strong>කන් දීලා</strong> අහගෙන හිටියා.</p>
              <p>(He was <strong>listening carefully</strong> in class.)</p>
            </div>
          </section>
        );

      case "literature":
        return (
          <section className="section active">
            <h2>Classical Literature - සම්භාව්‍ය සාහිත්‍යය</h2>

            <div className="poem-card">
              <h3>Ancient Sinhala Verse - පැරණි සිංහල පද</h3>
              <div className="sentence-sinhala">
                සිරි ලක සිරි ලකට වඩා<br />
                රනින් රිදීන් බබලන තැන්<br />
                නොමැත නොමැතැයි කීවත්<br />
                අපට අපේ රටමයි ලස්සන
              </div>
              <div className="sentence-english">
                Though places shining with gold and silver<br />
                May be more prosperous than Sri Lanka<br />
                Even if they say there is none like it<br />
                To us, our country is the most beautiful
              </div>
            </div>

            <div className="reading-passage">
              <h3>From the Mahavamsa - මහාවංශයෙන්</h3>
              <div className="reading-sinhala">
                විජය කුමාරයා සිය අනුගාමිකයන් සත්සියයක් සමඟ ලංකාවට පැමිණියේය.
                ඔවුන් ලංකාවේ බටහිර වෙරළේ ගොඩබැස්සෝය. එම දිනයෙහි බුදුරජාණන්
                වහන්සේ පිරිනිවන් පෑහ. මේ ලංකාවේ සිංහල ජාතියේ ආරම්භය විය.
              </div>
              <div className="reading-english">
                Prince Vijaya arrived in Lanka with seven hundred followers.
                They landed on the western coast of Lanka. On that day, Lord
                Buddha attained Parinirvana. This was the beginning of the
                Sinhalese nation in Lanka.
              </div>
            </div>

            <div className="activity-card">
              <h3>Literary Elements - සාහිත්‍යික ලක්ෂණ</h3>
              <p><strong>Simile (උපමාව):</strong> Comparing using "like" or "as"</p>
              <p>Example: ඇය මල වගේ ලස්සනයි (She is beautiful like a flower)</p>
              <p><strong>Metaphor (අලංකාරය):</strong> Direct comparison</p>
              <p>Example: ඔහු සිංහයෙකි (He is a lion)</p>
              <p><strong>Personification:</strong> Giving human qualities to non-human things</p>
              <p>Example: සඳ සිනාසෙයි (The moon smiles)</p>
              <p><strong>Alliteration:</strong> Repeating similar sounds</p>
              <p>Example: මල් මල් මතු මතු (Flowers upon flowers)</p>
            </div>

            <div className="poem-card">
              <h3>Modern Poetry - නූතන කවිය</h3>
              <div className="sentence-sinhala">
                අපේ ගම ලස්සන ගමක්<br />
                එහි වැව් ගං ඇලත් ඇත්<br />
                කුඹුරු කොළ පැහැයෙන් දිලෙයි<br />
                ගොවියෝ සතුටින් වෙසෙයි
              </div>
              <div className="sentence-english">
                Our village is a beautiful village<br />
                It has tanks, rivers, and streams<br />
                Paddy fields shine in green color<br />
                Farmers live happily
              </div>
            </div>

            <div className="poem-card">
              <h3>Patriotic Verse - දේශප්‍රේමී පද</h3>
              <div className="sentence-sinhala">
                නමෝ නමෝ මාතා<br />
                අපේ ශ්‍රී ලංකා<br />
                නමෝ නමෝ නමෝ නමෝ මාතා<br />
                සුන්දර ශ්‍රී බරණී
              </div>
              <div className="sentence-english">
                Salutations, Mother<br />
                Our Sri Lanka<br />
                Salutations Mother<br />
                Beautiful, blessed land
              </div>
            </div>
          </section>
        );

      case "culture":
        return (
          <section className="section active">
            <h2>Heritage & Identity - උරුමය සහ අනන්‍යතාව</h2>

            <div className="culture-card">
              <h3>National Symbols - ජාතික සංකේත</h3>
              <p><strong>ජාතික කොඩිය (National Flag):</strong> The lion holding a sword represents bravery. The four bo leaves represent Buddhism.</p>
              <p><strong>ජාතික මල (National Flower):</strong> නිල් මහනෙල් (Blue Water Lily)</p>
              <p><strong>ජාතික පක්ෂියා (National Bird):</strong> ශ්‍රී ලාංකික ජංගල කුකුළා (Sri Lankan Junglefowl)</p>
              <p><strong>ජාතික සතා (National Animal):</strong> ශ්‍රී ලාංකික ඇතා (Sri Lankan Elephant)</p>
              <p><strong>ජාතික ගස (National Tree):</strong> නා ගස (Mesua ferrea / Ironwood)</p>
            </div>

            <h3 style={{ color: "#667eea", margin: "30px 0 20px 0", textAlign: "center" }}>
              Historical Terms - ඓතිහාසික පද
            </h3>
            <div className="word-grid">
              {advancedCulture.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>

            <div className="culture-card">
              <h3>World Heritage Sites - ලෝක උරුම ස්ථාන</h3>
              <p><strong>1. අනුරාධපුර ශුද්ධ නගරය</strong> - Ancient capital with Buddhist monuments</p>
              <p><strong>2. පොළොන්නරුව ශුද්ධ නගරය</strong> - Medieval capital with giant Buddha statues</p>
              <p><strong>3. සිගිරිය පර්වත කොටුව</strong> - Ancient rock fortress with frescoes</p>
              <p><strong>4. කන්ද ශුද්ධ නගරය</strong> - Last kingdom, Temple of the Tooth</p>
              <p><strong>5. ගාල් කොටුව</strong> - Colonial era Dutch fort</p>
              <p><strong>6. ධම්බුල්ල ගුහා විහාරය</strong> - Cave temple with ancient paintings</p>
              <p><strong>7. සිංහරාජ වනාන්තරය</strong> - Tropical rainforest, biodiversity hotspot</p>
              <p><strong>8. මධ්‍යම කඳුකර</strong> - Central Highlands (Horton Plains, Knuckles)</p>
            </div>

            <div className="culture-card">
              <h3>Traditional Arts - සාම්ප්‍රදායික කලා</h3>
              <p><strong>නර්තනය (Dance):</strong> Kandyan, Low Country, Sabaragamuwa styles</p>
              <p><strong>වාදනය (Music):</strong> Drums (බෙර), flutes (හොරණෑව)</p>
              <p><strong>චිත්‍ර (Painting):</strong> Temple paintings, Kandyan art</p>
              <p><strong>හස්ත කර්මාන්ත (Crafts):</strong> Masks, lacquer work, batik</p>
            </div>
          </section>
        );

      case "formal":
        return (
          <section className="section active">
            <h2>Formal Language - විධිමත් භාෂාව</h2>
            <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
              Learn the difference between formal and informal Sinhala expressions.
            </p>

            <div className="grammar-box">
              <h4>Formal vs Informal Expressions</h4>
              <table className="formal-table">
                <thead>
                  <tr>
                    <th>Formal</th>
                    <th>Informal</th>
                    <th>English</th>
                  </tr>
                </thead>
                <tbody>
                  {formalExpressions.map((expr, index) => (
                    <tr key={index}>
                      <td>{expr.formal}</td>
                      <td>{expr.informal}</td>
                      <td>{expr.english}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Honorific Forms - ගෞරව රූප</h4>
              <p>Use honorific verb forms when addressing elders or formal situations:</p>
              <table className="formal-table">
                <thead>
                  <tr><th>Normal</th><th>Honorific</th><th>English</th></tr>
                </thead>
                <tbody>
                  <tr><td>ඔහු යනවා</td><td>ඔහු වැඩම කරනවා</td><td>He goes</td></tr>
                  <tr><td>ඇය කනවා</td><td>ඇය ආහාර වළඳනවා</td><td>She eats</td></tr>
                  <tr><td>ඔහු නිදාගන්නවා</td><td>ඔහු සැතපෙනවා</td><td>He sleeps</td></tr>
                  <tr><td>ඇය ඉන්නවා</td><td>ඇය වාසය කරනවා</td><td>She lives/stays</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grammar-box">
              <h4>Formal Letter Phrases</h4>
              <p><strong>Opening:</strong></p>
              <p>• ගරු මහත්මයා/මහත්මිය (Respected Sir/Madam)</p>
              <p>• ගරුත්වයෙන් දන්වා සිටිමි (I respectfully inform you)</p>
              <p><strong>Closing:</strong></p>
              <p>• ස්තූතියි (Thank you)</p>
              <p>• ගෞරවයෙන් (Respectfully)</p>
              <p>• ඔබගේ විශ්වාසී (Your faithful)</p>
            </div>

            <div className="activity-card">
              <h3>Practice: Convert to Formal</h3>
              <p>Change these informal sentences to formal:</p>
              <p>1. "මම හෙට එන්නම්" → _____</p>
              <p>2. "එයා කොහෙද ගියේ?" → _____</p>
              <p><strong>Answers:</strong></p>
              <p>1. "මම හෙට පැමිණෙන්නෙමි"</p>
              <p>2. "ඔහු කොහෙද වැඩම කළේ?"</p>
            </div>
          </section>
        );

      case "projects":
        return (
          <section className="section active">
            <h2>Research Projects - පර්යේෂණ ව්‍යාපෘති</h2>

            <div className="activity-card">
              <h3>Heritage Site Research</h3>
              <p><strong>Choose one UNESCO World Heritage Site in Sri Lanka:</strong></p>
              <p>Research and present:</p>
              <p>• History and significance</p>
              <p>• Important features and structures</p>
              <p>• Why it was designated a World Heritage Site</p>
              <p>• Current conservation efforts</p>
              <p>• Your recommendations for protection</p>
              <p><strong>Present in both Sinhala and English (10-15 minutes)</strong></p>
            </div>

            <div className="activity-card">
              <h3>Environmental Project</h3>
              <p><strong>Topic: Wildlife Conservation in Sri Lanka</strong></p>
              <p>Choose an endangered animal and research:</p>
              <p>• Current population and habitat</p>
              <p>• Threats to survival</p>
              <p>• Conservation efforts</p>
              <p>• What we can do to help</p>
              <p>Create a poster with Sinhala and English text</p>
            </div>

            <div className="activity-card">
              <h3>Literary Analysis Project</h3>
              <p><strong>Analyze a Sinhala folk tale or legend:</strong></p>
              <p>• Summarize the story</p>
              <p>• Identify literary elements (similes, metaphors, etc.)</p>
              <p>• Explain the moral or lesson</p>
              <p>• Compare to a similar story from another culture</p>
              <p>Write a 500-word analysis in Sinhala</p>
            </div>

            <div className="activity-card">
              <h3>Interview Project</h3>
              <p><strong>Interview an elder family member about:</strong></p>
              <p>• Life in Sri Lanka in the past</p>
              <p>• Traditional customs and practices</p>
              <p>• Changes they have seen</p>
              <p>• Advice for young people</p>
              <p>Record the interview and write a report in Sinhala</p>
            </div>

            <div className="activity-card">
              <h3>Language Evolution Project</h3>
              <p><strong>Research how Sinhala language has changed:</strong></p>
              <p>• Ancient Sinhala vs Modern Sinhala</p>
              <p>• Words borrowed from other languages</p>
              <p>• New words created for modern concepts</p>
              <p>• Regional variations in Sinhala</p>
              <p>Present your findings with examples</p>
            </div>
          </section>
        );

      case "practice":
        return (
          <section className="section active">
            <h2>Speak & Learn - කතා කරමින් ඉගෙන ගන්න</h2>
            <PronunciationPractice
              words={practiceWords}
              title="Practice Grade 5 Words / පන්ති 5 වචන පුහුණුව"
            />
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Comprehensive Assessment Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g5" />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grade-content active">
      <div className="grade-info">
        <h2>Grade 5 - Intermediate Advanced</h2>
        <p>
          Complex grammar, formal writing, idioms, classical literature, and heritage studies
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        gradeId="g5"
      />

      <ProgressBar progress={71} />

      {renderSection()}

      <style>{`
        .conjugation-table, .formal-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          font-size: 0.9em;
        }
        .conjugation-table th, .conjugation-table td,
        .formal-table th, .formal-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .conjugation-table th, .formal-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .conjugation-table tr:nth-child(even),
        .formal-table tr:nth-child(even) {
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

export default Grade5;
