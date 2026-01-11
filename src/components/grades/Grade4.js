import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";

const Grade4 = () => {
  const [currentSection, setCurrentSection] = useState("reading");

  const sections = [
    { id: "reading", label: "Reading" },
    { id: "grammar", label: "Advanced Grammar" },
    { id: "writing", label: "Creative Writing" },
    { id: "culture", label: "Culture & History" },
    { id: "literature", label: "Literature" },
    { id: "projects", label: "Projects" },
    { id: "quiz", label: "Final Quiz" },
  ];

  const culturalItems = [
    { sinhala: "කිරි බත්", english: "Milk Rice", pronunciation: "Kiri Bath" },
    { sinhala: "කොකිස්", english: "Oil Cakes", pronunciation: "Kokis" },
    {
      sinhala: "වෙසක් කුඩු",
      english: "Vesak Lantern",
      pronunciation: "Vesak Kudu",
    },
    { sinhala: "පෙරහර", english: "Procession", pronunciation: "Perahara" },
    {
      sinhala: "කන්දියන් නර්තනය",
      english: "Kandyan Dance",
      pronunciation: "Kandiyan Narthanaya",
    },
    {
      sinhala: "ඇලවතුර",
      english: "Traditional Sweet",
      pronunciation: "Aelawathura",
    },
  ];

  const advancedVocabulary = [
    { sinhala: "ගම්මිරිස්", english: "Cinnamon", pronunciation: "Gammiris" },
    {
      sinhala: "කරපිංචා",
      english: "Curry Leaves",
      pronunciation: "Karapincha",
    },
    {
      sinhala: "අනුරාධපුරය",
      english: "Anuradhapura",
      pronunciation: "Anuradhapuraya",
    },
    {
      sinhala: "පොළොන්නරුව",
      english: "Polonnaruwa",
      pronunciation: "Polonnnaruwa",
    },
    { sinhala: "සිගිරිය", english: "Sigiriya", pronunciation: "Sigiriya" },
    { sinhala: "මිහින්තලේ", english: "Mihintale", pronunciation: "Mihinthale" },
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
      question: 'Which question word means "when"?',
      options: ["මොකද්ද", "කවුද", "කවදාද", "කොහේද"],
      correct: 2,
    },
    {
      question: 'What does "අනුරාධපුරය" refer to?',
      options: ["A festival", "An ancient capital", "A food", "A dance"],
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
      question: 'What question word means "what"?',
      options: ["කවුද", "මොකද්ද", "කොහේද", "කවදාද"],
      correct: 1,
    },
    {
      question: 'What does "පෙරහර" mean?',
      options: ["Festival", "Procession", "Dance", "Song"],
      correct: 1,
    },
    {
      question: 'How do you say "will eat" in Sinhala?',
      options: ["කාව", "කනවා", "කන්නම්", "කමින්"],
      correct: 2,
    },
    {
      question: 'What does "වෙසක් කුඩු" mean?',
      options: [
        "New Year cake",
        "Vesak lantern",
        "Traditional dance",
        "Temple",
      ],
      correct: 1,
    },
    {
      question: 'Which ancient capital is "පොළොන්නරුව"?',
      options: ["Modern city", "Ancient capital", "Village", "Port city"],
      correct: 1,
    },
    {
      question: 'What does "ගම්මිරිස්" refer to?',
      options: ["Tea", "Cinnamon", "Rice", "Curry"],
      correct: 1,
    },
    {
      question: 'How do you ask "Where are you from?"',
      options: [
        "ඔබේ නම මොකද්ද?",
        "ඔබ කොහෙන්ද එන්නේ?",
        "ඔබට කොහොමද?",
        "ඔබ මොකද කරන්නේ?",
      ],
      correct: 1,
    },
    {
      question: 'What does "මිහින්තලේ" refer to?',
      options: ["A festival", "A sacred place", "A food", "A dance"],
      correct: 1,
    },
    {
      question: 'Which tense uses "-නවා"?',
      options: ["Past", "Present", "Future", "Perfect"],
      correct: 1,
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
                ශ්‍රී ලංකාව ඉන්දියන් සාගරයේ ලස්සන දිවයිනක්. එහි පර්වත, වනාන්තර,
                රාජධානි සහ වෙරළ තීරණ තියෙනවා. බොහෝ සංස්කෘතීන් එකට ජීවත් වෙනවා.
                සිංහල, දමිළ, මුස්ලිම් ජනතාව සාමයෙන් ජීවත් වෙනවා. ශ්‍රී ලංකාවේ
                තේ, ගම්මිරිස්, කරපිංචා ලෝකයේ ප්‍රසිද්ධයි. අපේ රට ගැන අපිට
                ආඩම්බරයි.
              </div>
              <div className="reading-english">
                Sri Lanka is a beautiful island in the Indian Ocean. It has
                mountains, forests, capitals and beaches. Many cultures live
                together. Sinhala, Tamil, Muslim people live peacefully. Sri
                Lanka's tea, cinnamon, curry leaves are world famous. We are
                proud of our country.
              </div>
            </div>
            <div className="activity-card">
              <h3>📖 Comprehension Questions</h3>
              <p>1. Where is Sri Lanka located?</p>
              <p>2. What communities live in Sri Lanka?</p>
              <p>3. What products is Sri Lanka famous for?</p>
              <p>4. How do different communities live together?</p>
            </div>
            <div className="reading-passage">
              <h3>🎭 Traditional Festivals</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාවේ බොහෝ සම්ප්‍රදායික උත්සව තියෙනවා. සිංහල අලුත්
                අවුරුද්ද අප්‍රේල් මාසයේ සමරනවා. ගම්මිරිස් කිරි, කොකිස්, කැවුම්
                හදනවා. වෙසක් පෝය දවසේ ලන්ටර්න් දාලනවා. දන්සල් තියනවා. පොසොන් පෝය
                දවසේ මිහින්තලේට බොහෝ දෙනෙක් යනවා. මේ උත්සව අපේ සංස්කෘතිය රැක
                ගන්නවා.
              </div>
              <div className="reading-english">
                Sri Lanka has many traditional festivals. Sinhala New Year is
                celebrated in April. They make coconut milk rice, kokis, and
                sweets. On Vesak day lanterns are lit. There are dansals (free
                food stalls). On Poson day many people go to Mihintale. These
                festivals preserve our culture.
              </div>
            </div>
            <div className="reading-passage">
              <h3>🏛️ Ancient Heritage</h3>
              <div className="reading-sinhala">
                ශ්‍රී ලංකාවට අවුරුදු දෙදහස් හතරකට වඩා පැරණි ඉතිහාසයක් තියෙනවා.
                අනුරාධපුරය, පොළොන්නරුව, කන්දය වගේ පුරාණ රාජධානිවල නටබුන් අදටත්
                තියෙනවා. සිගිරිය කොටුව ලෝකයේ අටවන පුදුමය කියලා කියනවා. මේ ස්ථාන
                අපේ පරම්පරාගත කලාව සහ ගිනිකෙළ පෙන්වනවා.
              </div>
              <div className="reading-english">
                Sri Lanka has a history of more than two thousand four hundred
                years. Ruins of ancient kingdoms like Anuradhapura, Polonnaruwa,
                and Kandy still exist today. Sigiriya fortress is called the
                eighth wonder of the world. These places show our traditional
                art and architecture.
              </div>
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
              <p>
                <strong>
                  ගිය (went), කාව (ate), ආව (came), ලිව්වා (wrote)
                </strong>
              </p>
              <p>
                <strong>Example: ඔහු ගෙදරට ගියා (He went home)</strong>
              </p>
            </div>
            <div className="grammar-box">
              <h4>Future Tense - අනාගත කාලය</h4>
              <p>Add -යි (-yi) or use ගන්නවා/කරනවා for future actions:</p>
              <p>
                <strong>
                  යන්නම් (will go), කන්නම් (will eat), ලියන්නම් (will write)
                </strong>
              </p>
              <p>
                <strong>
                  Example: ඔහු හෙට පාසලට යන්නම් (He will go to school tomorrow)
                </strong>
              </p>
            </div>
            <div className="grammar-box">
              <h4>Question Formation - ප්‍රශ්න සෑදීම</h4>
              <p>
                Use question words: මොකද්ද (what), කවුද (who), කොහේද (where),
                කවදාද (when)
              </p>
              <p>
                <strong>ඔබ මොකද්ද කරනවා? (What are you doing?)</strong>
              </p>
              <p>
                <strong>ඔහු කවුද? (Who is he?)</strong>
              </p>
            </div>
            <div className="grammar-box">
              <h4>Complex Sentences - සංකීර්ණ වාක්‍ය</h4>
              <p>Combine sentences using connecting words:</p>
              <p>
                <strong>සහ (and), නමුත් (but), නිසා (because), නම් (if)</strong>
              </p>
              <p>
                <strong>
                  Example: මම පාසලට ගියා සහ මිතුරන් මුණගැසුණා (I went to school
                  and met friends)
                </strong>
              </p>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">
                ගිය සතියේ අපි මිහින්තලේට ගියා.
              </div>
              <div className="sentence-english">
                Last week we went to Mihintale.
              </div>
              <div className="sentence-pronunciation">
                Giya sathiye api Mihinthaleta giya.
              </div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">හෙට අපි පුස්තකාලයට යන්නම්.</div>
              <div className="sentence-english">
                Tomorrow we will go to the library.
              </div>
              <div className="sentence-pronunciation">
                Heta api pusthakaalayata yannam.
              </div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">
                ළමයා පොත කියැව්වා නමුත් අවබෝධ කරගත්තේ නෑ.
              </div>
              <div className="sentence-english">
                The child read the book but didn't understand it.
              </div>
              <div className="sentence-pronunciation">
                Lamaya potha kiyawwa namuth awabodha karagatte naa.
              </div>
            </div>
          </section>
        );

      case "writing":
        return (
          <section className="section active">
            <h2>Creative Writing - නිර්මාණාත්මක ලිවීම</h2>
            <div className="activity-card">
              <h3>✍️ Essay Writing</h3>
              <p>
                <strong>
                  Topic: "My Favorite Festival" (මගේ ප්‍රියතම උත්සවය)
                </strong>
              </p>
              <p>
                Write a 5-sentence essay about your favorite Sri Lankan
                festival. Include:
              </p>
              <p>• When it is celebrated</p>
              <p>• What activities happen</p>
              <p>• Why you like it</p>
              <p>• How your family celebrates</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  <strong>Sample Essay:</strong>
                  <br />
                  මගේ ප්‍රියතම උත්සවය වෙසක් පෝය. මේ උත්සවය මැයි මාසයේ සමරනවා.
                  අපි ලන්ටර්න් හදනවා සහ දන්සල් පිහිටුවනවා. මම මේ උත්සවයට ආදරේ
                  කරනවා කරුණාව සහ සැමට ආදරය ගැන ඉගෙන ගන්න පුළුවන් නිසා. අපේ පවුල
                  එකට ලන්ටර්න් හදනවා සහ පිරිත් අහනවා.
                </div>
              </div>
            </div>
            <div className="activity-card">
              <h3>📖 Story Writing</h3>
              <p>
                <strong>
                  Topic: "Adventure in the Village" (ගමේ ත්‍රාසකතාව)
                </strong>
              </p>
              <p>
                Write a short story about a child's adventure in a Sri Lankan
                village. Use past tense verbs.
              </p>
              <p>
                <strong>Story starters:</strong>
              </p>
              <p>
                • ගිය නිවාඩුවේ මම සීයාගේ ගමට ගියා... (Last holiday I went to
                grandfather's village...)
              </p>
              <p>
                • ගමේ ජීවිතය නගරයට වඩා වෙනස්... (Village life is different from
                the city...)
              </p>
            </div>
            <div className="activity-card">
              <h3>💌 Letter Writing</h3>
              <p>
                <strong>
                  Write a letter to your friend describing your school
                </strong>
              </p>
              <p>
                Include: greeting, your school name, favorite subjects, favorite
                teacher, closing
              </p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  <strong>Sample Letter Structure:</strong>
                  <br />
                  ප්‍රිය මිතුරා,
                  <br />
                  කොහොමද? මගේ පාසල ගැන කියන්නම්...
                  <br />
                  ආදරණීය,
                  <br />
                  [ඔබේ නම]
                </div>
              </div>
            </div>
            <div className="activity-card">
              <h3>🎭 Dialogue Writing</h3>
              <p>
                <strong>
                  Create a conversation between two friends meeting after a long
                  time
                </strong>
              </p>
              <p>
                Use question words and proper greetings. Make it at least 6
                exchanges.
              </p>
            </div>
          </section>
        );

      case "culture":
        return (
          <section className="section active">
            <h2>Culture & History - සංස්කෘතිය සහ ඉතිහාසය</h2>
            <div className="culture-card">
              <h3>🏛️ Ancient Kingdoms</h3>
              <p>
                ශ්‍රී ලංකාවේ පුරාණ රාජධානි - අනුරාධපුරය, පොළොන්නරුව, කන්දි. මේ
                නගර අපේ ඉතිහාසයේ වැදගත්.
              </p>
              <p>
                Ancient capitals of Sri Lanka - Anuradhapura, Polonnaruwa,
                Kandy. These cities are important in our history.
              </p>
            </div>
            <div className="culture-card">
              <h3>🎨 Traditional Arts</h3>
              <p>
                කන්දියන් නර්තනය, මුඛවාඩ, බතික්, පොල් කැටයම් අපේ සම්ප්‍රදායික
                කලා.
              </p>
              <p>
                Kandyan dancing, mask carving, batik, coconut carving are our
                traditional arts.
              </p>
            </div>
            <div className="culture-card">
              <h3>🌾 Agriculture & Spices</h3>
              <p>
                ශ්‍රී ලංකාව "ඉන්දියන් සාගරයේ මුතු" කියලා කියනවා. අපේ තේ,
                ගම්මිරිස්, ගම්මිරිස්, කරපිංචා ලොව පුරා ප්‍රසිද්ධයි. ධාන්‍ය වගාව
                අපේ ප්‍රධාන ආර්ථිකය.
              </p>
              <p>
                Sri Lanka is called the "Pearl of the Indian Ocean". Our tea,
                cinnamon, cardamom, curry leaves are famous worldwide. Rice
                cultivation is our main economy.
              </p>
            </div>
            <div className="word-grid">
              {culturalItems.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>
            <div className="culture-card">
              <h3>🎭 Festivals Throughout the Year</h3>
              <p>
                <strong>අප්‍රේල්:</strong> සිංහල හින්දු අලුත් අවුරුද්ද
              </p>
              <p>
                <strong>මැයි:</strong> වෙසක් පෝය - බුදුගුණ අනුස්මරණය
              </p>
              <p>
                <strong>ජුනි:</strong> පොසොන් පෝය - ධර්මය ශ්‍රී ලංකාවට ගෙන්වීම
              </p>
              <p>
                <strong>ඔක්තෝබර්:</strong> දීපාවලි - ආලෝකයේ උත්සවය
              </p>
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
                මල් පිපෙන්නේ සුවද සුවදට
                <br />
                මල් වැරදෙන්නේ සීත සීතට
                <br />
                ජීවිතේ එහෙම තමයි
                <br />
                සුවද දුකද එකට එනවා
              </div>
              <div className="sentence-english">
                Flowers bloom in fragrant waves
                <br />
                Flowers wither in the cold
                <br />
                Life is just like that
                <br />
                Joy and sorrow come together
              </div>
            </div>
            <div className="reading-passage">
              <h3>📚 Classic Story Extract</h3>
              <div className="reading-sinhala">
                පුංචි ප්‍රින්ස් කුමරු අහස බලාගෙන හිටියා. තාරකාවන් දිලිසෙනවා
                දැක්කා. ඔහුගේ ලොකු සුන්දර ඇස්වලට කදුළු පිරිලා. "මම කොහේ
                ගිහින්ද?" ඔහු හිතුවා. "මගේ ගෝලයට ආපසු යන්න පුළුවන්ද?"
              </div>
              <div className="reading-english">
                The little prince was looking at the sky. He saw the stars
                shining. His big beautiful eyes filled with tears. "Where am I
                going?" he thought. "Can I go back to my planet?"
              </div>
            </div>
            <div className="poem-card">
              <h3>🦋 Nature Poem</h3>
              <div className="sentence-sinhala">
                කඳුළු ගඟ වගේ ගලනවා
                <br />
                මල් මල් මතු පාවෙනවා
                <br />
                සමනලයෝ නටනවා
                <br />
                අපේ ලස්සන ශ්‍රී ලංකාවේ
              </div>
              <div className="reading-english">
                Rivers flow like tears
                <br />
                Flowers float on the surface
                <br />
                Butterflies dance
                <br />
                In our beautiful Sri Lanka
              </div>
            </div>
            <div className="activity-card">
              <h3>📝 Literary Analysis</h3>
              <p>
                <strong>Questions about the poems:</strong>
              </p>
              <p>1. What do the flowers represent in the first poem?</p>
              <p>2. What emotions does the Little Prince feel?</p>
              <p>3. How does the nature poem describe Sri Lanka?</p>
              <p>4. Can you write your own 4-line poem about your family?</p>
            </div>
          </section>
        );

      case "projects":
        return (
          <section className="section active">
            <h2>Final Projects - අවසාන ව්‍යාපෘති</h2>
            <div className="activity-card">
              <h3>🎭 Cultural Presentation</h3>
              <p>
                <strong>
                  Project: Create a presentation about a Sri Lankan festival
                </strong>
              </p>
              <p>Research and present information about:</p>
              <p>• History of the festival</p>
              <p>• Traditional foods</p>
              <p>• Customs and traditions</p>
              <p>• How it's celebrated today</p>
              <p>
                <strong>
                  Presentation should be 5 minutes and include visual aids
                </strong>
              </p>
            </div>
            <div className="activity-card">
              <h3>📝 Language Portfolio</h3>
              <p>
                <strong>
                  Create a personal Sinhala language portfolio including:
                </strong>
              </p>
              <p>• Your favorite Sinhala words (20 words)</p>
              <p>• A short autobiography in Sinhala</p>
              <p>• Family tree with Sinhala labels</p>
              <p>• Drawing with Sinhala descriptions</p>
              <p>• Collection of Sinhala proverbs with meanings</p>
            </div>
            <div className="activity-card">
              <h3>🗺️ Sri Lanka Guide</h3>
              <p>
                <strong>Create a mini guidebook about Sri Lanka</strong>
              </p>
              <p>
                Include: famous places, traditional foods, animals, cultural
                sites
              </p>
              <p>Write descriptions in both Sinhala and English</p>
              <p>
                <strong>Must include:</strong> Map, photos/drawings, at least 10
                pages
              </p>
            </div>
            <div className="activity-card">
              <h3>🎬 Digital Story</h3>
              <p>
                <strong>Create a digital story about Sri Lankan culture</strong>
              </p>
              <p>• Record yourself telling a traditional story in Sinhala</p>
              <p>• Include background music and images</p>
              <p>• Should be 3-5 minutes long</p>
              <p>• Add subtitles in English for non-Sinhala speakers</p>
            </div>
            <div className="activity-card">
              <h3>📚 Vocabulary Dictionary</h3>
              <p>
                <strong>
                  Create your own illustrated Sinhala-English dictionary
                </strong>
              </p>
              <p>• Include at least 100 words learned this year</p>
              <p>• Add drawings or pictures for each word</p>
              <p>• Organize by categories (animals, food, family, etc.)</p>
              <p>• Include pronunciation guide</p>
            </div>
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Final Assessment Quiz</h2>
            <Quiz questions={quizQuestions} gradeKey="g4" />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grade-content active">
      <div className="grade-info">
        <h2>🏆 Grade 4 - Advanced Learning</h2>
        <p>
          <strong>Age: 9-10 years</strong> | Reading comprehension, complex
          grammar, cultural studies, and creative writing
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <ProgressBar progress={57} />

      {renderSection()}
    </div>
  );
};

export default Grade4;
