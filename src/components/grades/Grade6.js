import React, { useState } from "react";
import Navigation from "../shared/Navigation";
import ProgressBar from "../shared/ProgressBar";
import WordCard from "../shared/WordCard";
import Quiz from "../shared/Quiz";
import PronunciationPractice from "../shared/PronunciationPractice";

const Grade6 = () => {
  const [currentSection, setCurrentSection] = useState("reading");

  const sections = [
    { id: "reading", label: "Critical Reading" },
    { id: "grammar", label: "Advanced Grammar" },
    { id: "writing", label: "Academic Writing" },
    { id: "vocabulary", label: "Advanced Vocabulary" },
    { id: "literature", label: "Literary Analysis" },
    { id: "culture", label: "Contemporary Issues" },
    { id: "media", label: "Media Literacy" },
    { id: "speaking", label: "Public Speaking" },
    { id: "projects", label: "Capstone Project" },
    { id: "practice", label: "Speak & Learn" },
    { id: "quiz", label: "Final Examination" },
  ];

  const practiceWords = [
    { sinhala: "ප්‍රජාතන්ත්‍රවාදය", english: "Democracy", pronunciation: "pruh-jaa-thun-thruh-vaa-duh-yuh" },
    { sinhala: "නිදහස", english: "Independence", pronunciation: "ni-duh-huh-suh" },
    { sinhala: "සාමය", english: "Peace", pronunciation: "saa-muh-yuh" },
    { sinhala: "යුක්තිය", english: "Justice", pronunciation: "yuk-thi-yuh" },
    { sinhala: "අන්තර්ජාලය", english: "Internet", pronunciation: "un-thur-jaa-luh-yuh" },
    { sinhala: "ගෝලීයකරණය", english: "Globalization", pronunciation: "goh-lee-yuh-kuh-ruh-nuh-yuh" },
    { sinhala: "තිරසාර සංවර්ධනය", english: "Sustainable Development", pronunciation: "thi-ruh-saa-ruh sun-var-dhuh-nuh-yuh" },
    { sinhala: "නවෝත්පාදනය", english: "Innovation", pronunciation: "nuh-voh-thpaa-duh-nuh-yuh" },
    { sinhala: "ව්‍යවසායකත්වය", english: "Entrepreneurship", pronunciation: "vyuh-vuh-saa-yuh-kuh-thvuh-yuh" },
    { sinhala: "සංස්කෘතික උරුමය", english: "Cultural Heritage", pronunciation: "sun-skroo-thi-kuh oo-roo-muh-yuh" },
  ];

  const advancedVocabulary = [
    { sinhala: "ප්‍රජාතන්ත්‍රවාදය", english: "Democracy", pronunciation: "pruh-jaa-thun-thruh-vaa-duh-yuh" },
    { sinhala: "ආර්ථිකය", english: "Economy", pronunciation: "aar-thi-kuh-yuh" },
    { sinhala: "තාක්ෂණය", english: "Technology", pronunciation: "thaak-shuh-nuh-yuh" },
    { sinhala: "සංවර්ධනය", english: "Development", pronunciation: "sun-var-dhuh-nuh-yuh" },
    { sinhala: "නිදහස", english: "Independence", pronunciation: "ni-duh-huh-suh" },
    { sinhala: "සාමය", english: "Peace", pronunciation: "saa-muh-yuh" },
    { sinhala: "යුක්තිය", english: "Justice", pronunciation: "yuk-thi-yuh" },
    { sinhala: "සමානාත්මතාව", english: "Equality", pronunciation: "suh-maa-naa-thuh-muh-thaa-vuh" },
    { sinhala: "පරිසරය", english: "Environment", pronunciation: "puh-ri-suh-ruh-yuh" },
    { sinhala: "අධිකාරය", english: "Authority", pronunciation: "uh-dhi-kaa-ruh-yuh" },
    { sinhala: "ව්‍යවස්ථාව", english: "Constitution", pronunciation: "vyuh-vus-thaa-vuh" },
    { sinhala: "පුරවැසි භාවය", english: "Citizenship", pronunciation: "poo-ruh-vae-si bhaa-vuh-yuh" },
  ];

  const modernTerms = [
    { sinhala: "අන්තර්ජාලය", english: "Internet", pronunciation: "un-thur-jaa-luh-yuh" },
    { sinhala: "ගෝලීයකරණය", english: "Globalization", pronunciation: "goh-lee-yuh-kuh-ruh-nuh-yuh" },
    { sinhala: "දේශගුණ විපර්යාසය", english: "Climate Change", pronunciation: "day-shuh-goo-nuh vi-pur-yaa-suh-yuh" },
    { sinhala: "සමාජ මාධ්‍ය", english: "Social Media", pronunciation: "suh-maa-juh maa-dhyuh" },
    { sinhala: "කෘත්‍රිම බුද්ධිය", english: "Artificial Intelligence", pronunciation: "krith-ri-muh bud-dhi-yuh" },
    { sinhala: "තිරසාර සංවර්ධනය", english: "Sustainable Development", pronunciation: "thi-ruh-saa-ruh sun-var-dhuh-nuh-yuh" },
    { sinhala: "සයිබර් ආරක්ෂාව", english: "Cyber Security", pronunciation: "sy-bur aa-ruk-shaa-vuh" },
    { sinhala: "ඩිජිටල් සාක්ෂරතාව", english: "Digital Literacy", pronunciation: "di-ji-tul saak-shuh-ruh-thaa-vuh" },
    { sinhala: "දුරස්ථ අධ්‍යාපනය", english: "Distance Learning", pronunciation: "doo-rus-thuh uh-dhyaa-puh-nuh-yuh" },
    { sinhala: "නවෝත්පාදනය", english: "Innovation", pronunciation: "nuh-voh-thpaa-duh-nuh-yuh" },
    { sinhala: "ආයෝජනය", english: "Investment", pronunciation: "aa-yoh-juh-nuh-yuh" },
    { sinhala: "ව්‍යවසායකත්වය", english: "Entrepreneurship", pronunciation: "vyuh-vuh-saa-yuh-kuh-thvuh-yuh" },
  ];

  const literaryVocabulary = [
    { sinhala: "විචාරය", english: "Criticism/Review", pronunciation: "vi-chaa-ruh-yuh" },
    { sinhala: "රූපකය", english: "Allegory", pronunciation: "roo-puh-kuh-yuh" },
    { sinhala: "ව්‍යංගය", english: "Irony", pronunciation: "vyun-guh-yuh" },
    { sinhala: "ප්‍රහසනය", english: "Satire", pronunciation: "pruh-huh-suh-nuh-yuh" },
    { sinhala: "සංකේතය", english: "Symbol", pronunciation: "sun-kay-thuh-yuh" },
    { sinhala: "තේමාව", english: "Theme", pronunciation: "thay-maa-vuh" },
    { sinhala: "උපමාව", english: "Simile", pronunciation: "oo-puh-maa-vuh" },
    { sinhala: "රූපකාලංකාරය", english: "Metaphor", pronunciation: "roo-puh-kaa-lun-kaa-ruh-yuh" },
    { sinhala: "අතිශයෝක්තිය", english: "Hyperbole", pronunciation: "uh-thi-shuh-yohk-thi-yuh" },
    { sinhala: "පුද්ගලීකරණය", english: "Personification", pronunciation: "pud-guh-lee-kuh-ruh-nuh-yuh" },
    { sinhala: "අනුප්‍රාසය", english: "Alliteration", pronunciation: "uh-noo-praa-suh-yuh" },
    { sinhala: "ප්‍රතිරූපකය", english: "Imagery", pronunciation: "pruh-thi-roo-puh-kuh-yuh" },
  ];

  // Academic and formal vocabulary
  const academicVocabulary = [
    { sinhala: "පර්යේෂණය", english: "Research", pronunciation: "pur-yay-shuh-nuh-yuh" },
    { sinhala: "විශ්ලේෂණය", english: "Analysis", pronunciation: "vish-lay-shuh-nuh-yuh" },
    { sinhala: "නිගමනය", english: "Conclusion", pronunciation: "ni-guh-muh-nuh-yuh" },
    { sinhala: "උපකල්පනය", english: "Hypothesis", pronunciation: "oo-puh-kul-puh-nuh-yuh" },
    { sinhala: "සාක්ෂි", english: "Evidence", pronunciation: "saak-shi" },
    { sinhala: "තර්කය", english: "Argument", pronunciation: "thur-kuh-yuh" },
    { sinhala: "මූලාශ්‍රය", english: "Source", pronunciation: "moo-laash-ruh-yuh" },
    { sinhala: "සාරාංශය", english: "Summary", pronunciation: "saa-raan-shuh-yuh" },
    { sinhala: "ප්‍රශ්නාවලිය", english: "Questionnaire", pronunciation: "prush-naa-vuh-lee-yuh" },
    { sinhala: "සමීක්ෂණය", english: "Survey", pronunciation: "suh-meek-shuh-nuh-yuh" },
    { sinhala: "දත්ත", english: "Data", pronunciation: "duth-thuh" },
    { sinhala: "ප්‍රතිඵල", english: "Results", pronunciation: "pruh-thi-phuh-luh" },
  ];

  // Famous Sri Lankan figures
  const famousPersonalities = [
    { sinhala: "මහාත්මා ගාන්ධි", english: "Mahatma Gandhi (Influence)", pronunciation: "muh-haath-maa gaan-dhee" },
    { sinhala: "ඩී.එස්. සේනානායක", english: "D.S. Senanayake (First PM)", pronunciation: "dee es say-naa-naa-yuh-kuh" },
    { sinhala: "සිරිමාවෝ බණ්ඩාරනායක", english: "Sirimavo Bandaranaike (First Female PM)", pronunciation: "si-ri-maa-voh bun-daa-ruh-naa-yuh-kuh" },
    { sinhala: "මාටින් වික්‍රමසිංහ", english: "Martin Wickramasinghe (Author)", pronunciation: "maar-tin vik-ruh-muh-sin-huh" },
    { sinhala: "අනගාරික ධර්මපාල", english: "Anagarika Dharmapala (Buddhist Revivalist)", pronunciation: "uh-nuh-gaa-ri-kuh dhur-muh-paa-luh" },
    { sinhala: "ආතර් සී. ක්ලාක්", english: "Arthur C. Clarke (Sci-Fi Author)", pronunciation: "aa-thur see klaak" },
  ];

  const quizQuestions = [
    {
      question: 'What does "ප්‍රජාතන්ත්‍රවාදය" mean?',
      options: ["Monarchy", "Democracy", "Dictatorship", "Republic"],
      correct: 1,
    },
    {
      question: "When did Sri Lanka gain independence?",
      options: ["1945", "1948", "1950", "1956"],
      correct: 1,
    },
    {
      question: 'What is "ගෝලීයකරණය"?',
      options: ["Localization", "Modernization", "Globalization", "Industrialization"],
      correct: 2,
    },
    {
      question: "What literary device uses objects to represent ideas?",
      options: ["Simile", "Metaphor", "Symbol", "Irony"],
      correct: 2,
    },
    {
      question: 'What does "තිරසාර සංවර්ධනය" mean?',
      options: ["Rapid development", "Sustainable development", "Economic growth", "Urban development"],
      correct: 1,
    },
    {
      question: "Which structure is used for formal requests?",
      options: ["කරනවා", "කරන්න", "කරන මෙන් කාරුණිකව ඉල්ලා සිටිමි", "කළා"],
      correct: 2,
    },
    {
      question: 'What is "විචාරය" in literature?',
      options: ["Story", "Poem", "Criticism/Review", "Drama"],
      correct: 2,
    },
    {
      question: "What type of writing uses evidence to support claims?",
      options: ["Creative writing", "Argumentative writing", "Narrative writing", "Descriptive writing"],
      correct: 1,
    },
    {
      question: 'What does "දේශගුණ විපර්යාසය" refer to?',
      options: ["Weather", "Climate change", "Seasons", "Temperature"],
      correct: 1,
    },
    {
      question: "Which is an example of reported speech marker?",
      options: ["සහ", "නමුත්", "කියලා", "නිසා"],
      correct: 2,
    },
    {
      question: 'What is "ව්‍යංගය" in literature?',
      options: ["Rhyme", "Irony", "Rhythm", "Alliteration"],
      correct: 1,
    },
    {
      question: "What is the main export crop of Sri Lanka?",
      options: ["Coffee", "Rubber", "Tea", "Coconut"],
      correct: 2,
    },
    {
      question: 'What does "නිදහස" mean?',
      options: ["Freedom/Independence", "Peace", "Justice", "Equality"],
      correct: 0,
    },
    {
      question: "Which honorific is used for teachers?",
      options: ["මහත්මයා", "ගුරුතුමා/ගුරුතුමිය", "සාමිවරයා", "හාමුදුරුවෝ"],
      correct: 1,
    },
    {
      question: 'What is "ප්‍රහසනය"?',
      options: ["Comedy", "Tragedy", "Satire", "Drama"],
      correct: 2,
    },
    {
      question: "What makes a good argumentative essay?",
      options: ["Long sentences", "Evidence and logic", "Emotional appeal only", "Personal stories"],
      correct: 1,
    },
    {
      question: 'What does "කෘත්‍රිම බුද්ධිය" mean?',
      options: ["Natural intelligence", "Artificial intelligence", "Emotional intelligence", "Human intelligence"],
      correct: 1,
    },
    {
      question: "Which is NOT a World Heritage Site in Sri Lanka?",
      options: ["Sigiriya", "Anuradhapura", "Nuwara Eliya", "Galle Fort"],
      correct: 2,
    },
    {
      question: 'What is the purpose of "රූපකය" (allegory)?',
      options: ["Entertainment only", "Hidden meaning through story", "Describe nature", "Record history"],
      correct: 1,
    },
    {
      question: "What should a conclusion in an essay include?",
      options: ["New arguments", "Summary and final thoughts", "More examples", "Questions only"],
      correct: 1,
    },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "reading":
        return (
          <section className="section active">
            <h2>Critical Reading - විවේචනාත්මක කියවීම</h2>
            <div className="reading-passage">
              <h3>Sri Lanka's Independence - ශ්‍රී ලංකාවේ නිදහස</h3>
              <div className="reading-sinhala">
                1948 පෙබරවාරි 4 වැනි දා ශ්‍රී ලංකාවට බ්‍රිතාන්‍ය පාලනයෙන් නිදහස
                ලැබුණා. මේ නිදහස ලබා ගැනීමට ඩී.එස්. සේනානායක, එස්.ඩබ්ලිව්.ආර්.ඩී.
                බණ්ඩාරනායක වැනි නායකයන් මහත් කැපවීමක් කළා. නිදහසින් පසු ශ්‍රී
                ලංකාව ප්‍රජාතන්ත්‍රික රටක් බවට පත් වුණා.
                <br /><br />
                නිදහසින් පසු ශ්‍රී ලංකාව බොහෝ අභියෝගවලට මුහුණ දුන්නා. ආර්ථික
                දුෂ්කරතා, ජාතිවාදය සහ සංවර්ධන අභියෝග ඒ අතර විය. නමුත් ශ්‍රී ලාංකිකයෝ
                මේ අභියෝගවලට මුහුණ දී ඉදිරියට පැමිණියා. අද ශ්‍රී ලංකාව සංවර්ධනය
                වෙමින් පවතින රටකි.
              </div>
              <div className="reading-english">
                Sri Lanka gained independence from British rule on February 4,
                1948. Leaders like D.S. Senanayake and S.W.R.D. Bandaranaike made
                great sacrifices to achieve this independence. After independence,
                Sri Lanka became a democratic country.
                <br /><br />
                After independence, Sri Lanka faced many challenges. Economic
                difficulties, ethnic conflicts, and development challenges were
                among them. However, Sri Lankans faced these challenges and moved
                forward. Today Sri Lanka is a developing country.
              </div>
            </div>
            <div className="activity-card">
              <h3>Critical Analysis Questions</h3>
              <p>1. Why was gaining independence significant for Sri Lanka?</p>
              <p>2. What challenges did the country face after independence?</p>
              <p>3. How did leaders contribute to the independence movement?</p>
              <p>4. What does "democracy" mean in the context of Sri Lanka?</p>
              <p>5. What lessons can we learn from this period of history?</p>
            </div>
            <div className="reading-passage">
              <h3>Technology and Society - තාක්ෂණය සහ සමාජය</h3>
              <div className="reading-sinhala">
                වර්තමානයේ තාක්ෂණය අපේ ජීවිතයේ වැදගත් කොටසක් බවට පත්ව තිබෙනවා.
                අන්තර්ජාලය, ස්මාර්ට් දුරකථන සහ සමාජ මාධ්‍ය අපේ සන්නිවේදනය සහ
                ජීවන රටාව වෙනස් කළා. මේ වෙනස්කම් හොඳ ප්‍රතිඵල මෙන්ම අභියෝගද
                ගෙන එනවා.
                <br /><br />
                තාක්ෂණය හරහා අපට ලෝකයේ ඕනෑම තැනක සිට තොරතුරු ලබා ගත හැකියි.
                අධ්‍යාපනය, සෞඛ්‍යය සහ ව්‍යාපාර ක්ෂේත්‍රවල තාක්ෂණය විශාල
                වෙනසක් කළා. නමුත් පෞද්ගලිකත්වය, සයිබර් ආරක්ෂාව සහ තොරතුරු
                විශ්වසනීයත්වය වැනි ගැටලුද ඇති වී තිබෙනවා.
              </div>
              <div className="reading-english">
                Today, technology has become an important part of our lives. The
                internet, smartphones, and social media have changed our
                communication and lifestyle. These changes bring both good results
                and challenges.
                <br /><br />
                Through technology, we can access information from anywhere in
                the world. Technology has made a big difference in education,
                health, and business sectors. However, issues like privacy, cyber
                security, and information reliability have also emerged.
              </div>
            </div>
            <div className="activity-card">
              <h3>Discussion Points</h3>
              <p>1. How has technology changed education in Sri Lanka?</p>
              <p>2. What are the benefits and risks of social media?</p>
              <p>3. How can we use technology responsibly?</p>
              <p>4. What role should technology play in preserving our culture?</p>
            </div>
          </section>
        );

      case "grammar":
        return (
          <section className="section active">
            <h2>Advanced Grammar - උසස් ව්‍යාකරණ</h2>
            <div className="grammar-box">
              <h4>Honorific Language - ගෞරව භාෂාව</h4>
              <p>Using respectful forms for elders and formal situations:</p>
              <p><strong>ඔබ/ඔබතුමා (you - respectful), උන්නැහේ/නුඹ (you - formal)</strong></p>
              <p><strong>වහන්සේ (honorific for monks), තුමා/තුමිය (Mr./Ms.)</strong></p>
              <p><strong>Example: ගුරුතුමා පැමිණියා (The teacher arrived - respectful)</strong></p>
            </div>
            <div className="grammar-box">
              <h4>Formal Request Structures</h4>
              <p>Polite ways to make requests:</p>
              <p><strong>...කරන මෙන් කාරුණිකව ඉල්ලා සිටිමි (I kindly request that...)</strong></p>
              <p><strong>...කළ හැකි නම් කෘතවේදී වෙමි (I would be grateful if...)</strong></p>
              <p><strong>ඔබගේ සහයෝගය අපේක්ෂා කරමි (I look forward to your cooperation)</strong></p>
            </div>
            <div className="grammar-box">
              <h4>Complex Sentence Structures</h4>
              <p>Subordinate clauses and complex constructions:</p>
              <p><strong>...වුවද (even though), ...බැවින් (since/because)</strong></p>
              <p><strong>...වන තෙක් (until), ...සේම (just as)</strong></p>
              <p><strong>Example: වැස්ස ආවද අපි ගියා (Even though it rained, we went)</strong></p>
            </div>
            <div className="grammar-box">
              <h4>Causative Constructions</h4>
              <p>Expressing that someone causes an action:</p>
              <p><strong>කරවනවා (make someone do), ලියවනවා (make someone write)</strong></p>
              <p><strong>Example: ගුරුතුමා ශිෂ්‍යයාට පොත කියවවුවා (The teacher made the student read the book)</strong></p>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">මෙම ලිපියට ඔබගේ ප්‍රතිචාරයක් ලබා දෙන මෙන් කාරුණිකව ඉල්ලා සිටිමි.</div>
              <div className="sentence-english">I kindly request that you provide a response to this letter.</div>
              <div className="sentence-pronunciation">Mema lipiyata obagay prathichaarayak laba dena men kaarunikawa illa sitimi.</div>
            </div>
            <div className="sentence-practice">
              <div className="sentence-sinhala">වැස්ස ආවද, ක්‍රීඩා තරඟය පැවැත්වුණා.</div>
              <div className="sentence-english">Even though it rained, the sports event was held.</div>
              <div className="sentence-pronunciation">Wessa aawada, kreeda tharangaya pawaththunaa.</div>
            </div>
          </section>
        );

      case "writing":
        return (
          <section className="section active">
            <h2>Academic Writing - අධ්‍යයන ලිවීම</h2>
            <div className="activity-card">
              <h3>Argumentative Essay - තර්කාත්මක රචනාව</h3>
              <p><strong>Structure:</strong></p>
              <p>1. <strong>හැඳින්වීම (Introduction):</strong> State your thesis/position</p>
              <p>2. <strong>තර්ක 1 (Argument 1):</strong> First supporting point with evidence</p>
              <p>3. <strong>තර්ක 2 (Argument 2):</strong> Second supporting point with evidence</p>
              <p>4. <strong>ප්‍රතිවාදය (Counter-argument):</strong> Address opposing views</p>
              <p>5. <strong>නිගමනය (Conclusion):</strong> Restate position and call to action</p>
              <div className="sentence-practice">
                <div className="sentence-sinhala">
                  <strong>Sample Topic:</strong> තාක්ෂණය අධ්‍යාපනයට හිතකරද?<br />
                  <strong>Thesis:</strong> තාක්ෂණය නිසි ලෙස භාවිතා කළහොත් අධ්‍යාපනයට
                  ඉතා හිතකර වේ.
                </div>
              </div>
            </div>
            <div className="activity-card">
              <h3>Research Report - පර්යේෂණ වාර්තාව</h3>
              <p><strong>Components:</strong></p>
              <p>1. මාතෘකාව (Title)</p>
              <p>2. සාරාංශය (Abstract/Summary)</p>
              <p>3. හැඳින්වීම (Introduction)</p>
              <p>4. ක්‍රමවේදය (Methodology)</p>
              <p>5. සොයාගැනීම් (Findings)</p>
              <p>6. විශ්ලේෂණය (Analysis)</p>
              <p>7. නිගමනය (Conclusion)</p>
              <p>8. මූලාශ්‍ර (References)</p>
            </div>
            <div className="activity-card">
              <h3>Persuasive Speech Writing</h3>
              <p><strong>Topic: පරිසරය ආරක්ෂා කිරීමේ වැදගත්කම</strong></p>
              <p>Write a 3-minute speech that:</p>
              <p>• Opens with a powerful statement or question</p>
              <p>• Presents 3 main reasons</p>
              <p>• Uses emotional and logical appeals</p>
              <p>• Ends with a call to action</p>
            </div>
            <div className="activity-card">
              <h3>Critical Review - විචාර ලිවීම</h3>
              <p><strong>Write a review of a book, film, or event:</strong></p>
              <p>• Brief summary (without spoilers)</p>
              <p>• Analysis of strengths and weaknesses</p>
              <p>• Your evaluation and recommendation</p>
              <p>• Supporting evidence from the work</p>
            </div>
          </section>
        );

      case "vocabulary":
        return (
          <section className="section active">
            <h2>Advanced Vocabulary - උසස් වචන මාලාව</h2>
            <h3>Social and Political Terms - සමාජ සහ දේශපාලන පද</h3>
            <div className="word-grid">
              {advancedVocabulary.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>
            <h3>Modern Technology Terms - නූතන තාක්ෂණ පද</h3>
            <div className="word-grid">
              {modernTerms.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>
            <h3>Academic Research Terms - අධ්‍යයන පර්යේෂණ පද</h3>
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
            <h3>Literary Analysis Terms - සාහිත්‍ය විශ්ලේෂණ පද</h3>
            <div className="word-grid">
              {literaryVocabulary.map((item, index) => (
                <WordCard
                  key={index}
                  sinhalaWord={item.sinhala}
                  englishWord={item.english}
                  pronunciation={item.pronunciation}
                />
              ))}
            </div>
            <div className="activity-card">
              <h3>Famous Sri Lankan Personalities</h3>
              <div className="word-grid">
                {famousPersonalities.map((item, index) => (
                  <WordCard
                    key={index}
                    sinhalaWord={item.sinhala}
                    englishWord={item.english}
                    pronunciation={item.pronunciation}
                  />
                ))}
              </div>
            </div>
            <div className="activity-card">
              <h3>Academic Word Families</h3>
              <p><strong>Root: සංවර්ධන (development)</strong></p>
              <p>සංවර්ධනය (development), සංවර්ධිත (developed), සංවර්ධනය කරනවා (to develop)</p>
              <p><strong>Root: විශ්ලේෂණ (analysis)</strong></p>
              <p>විශ්ලේෂණය (analysis), විශ්ලේෂකයා (analyst), විශ්ලේෂණය කරනවා (to analyze)</p>
              <p><strong>Root: පර්යේෂණ (research)</strong></p>
              <p>පර්යේෂණය (research), පර්යේෂකයා (researcher), පර්යේෂණ කරනවා (to research)</p>
              <p><strong>Root: ආර්ථික (economic)</strong></p>
              <p>ආර්ථිකය (economy), ආර්ථික විද්‍යාඥයා (economist), ආර්ථික (economic)</p>
            </div>
          </section>
        );

      case "literature":
        return (
          <section className="section active">
            <h2>Literary Analysis - සාහිත්‍ය විශ්ලේෂණය</h2>
            <div className="reading-passage">
              <h3>Classical Sinhala Literature</h3>
              <div className="reading-sinhala">
                සිංහල සාහිත්‍යයට වසර දෙදහසකට වඩා පැරණි ඉතිහාසයක් තියෙනවා.
                මහාවංශය, දීපවංශය වැනි ග්‍රන්ථ අපේ ඉතිහාසය සහ සාහිත්‍යය සංරක්ෂණය
                කර තියෙනවා. සීගිරි ගීත් ලෝකයේ පැරණිතම කවි අතර වෙනවා. මේ කවිවල
                ප්‍රේමය, ස්වභාවය සහ සෞන්දර්යය ගැන කතා කරනවා.
              </div>
              <div className="reading-english">
                Sinhala literature has a history of more than two thousand years.
                Works like Mahavamsa and Dipavamsa have preserved our history and
                literature. Sigiri graffiti poems are among the oldest poems in
                the world. These poems speak about love, nature, and beauty.
              </div>
            </div>
            <div className="poem-card">
              <h3>Sigiri Graffiti Poetry - සීගිරි ගී</h3>
              <div className="sentence-sinhala">
                සිත් සෙනෙහෙ ගත් මියුරු බස්<br />
                අසා ගියෙමි සිහින් කත<br />
                නුඹෙ නමින් මා සිත<br />
                රිදවූයෙ කෙසේදැයි නොදනිමි
              </div>
              <div className="sentence-english">
                Hearing the sweet words that captured my heart<br />
                I went in a dream-like state<br />
                How my heart was hurt<br />
                By your name, I do not know
              </div>
            </div>
            <div className="activity-card">
              <h3>Literary Devices - සාහිත්‍යික උපක්‍රම</h3>
              <p><strong>රූපකය (Allegory):</strong> A story with hidden meaning</p>
              <p><strong>ව්‍යංගය (Irony):</strong> Saying opposite of what is meant</p>
              <p><strong>ප්‍රහසනය (Satire):</strong> Criticism through humor</p>
              <p><strong>සංකේතය (Symbol):</strong> Object representing an idea</p>
              <p><strong>තේමාව (Theme):</strong> Central message of the work</p>
            </div>
            <div className="activity-card">
              <h3>Analysis Exercise</h3>
              <p><strong>Analyze the following verse:</strong></p>
              <div className="sentence-sinhala">
                දුක සැපත එක සේ බලා<br />
                හිමට මහතෙක් මෙන් විඳ<br />
                ලොව සැමට සැප සදා<br />
                ඉසුරු දෙන මිනිසා වේවා
              </div>
              <p>Questions:</p>
              <p>1. What is the main message of this verse?</p>
              <p>2. What literary devices are used?</p>
              <p>3. How does the poet convey wisdom?</p>
            </div>
          </section>
        );

      case "culture":
        return (
          <section className="section active">
            <h2>Contemporary Issues - සමකාලීන ගැටලු</h2>
            <div className="culture-card">
              <h3>Unity in Diversity - විවිධත්වයේ සමගිය</h3>
              <p>
                ශ්‍රී ලංකාව බහුජාතික, බහුආගමික සමාජයකි. සිංහල, දෙමළ, මුස්ලිම්,
                බර්ගර් සහ වෙනත් ජනවර්ග එකට ජීවත් වෙනවා. බෞද්ධ, හින්දු, ඉස්ලාම්,
                කතෝලික ආගම් අදහන අය සාමයෙන් එකට ජීවත් වීම අපේ ශක්තියයි.
              </p>
              <p>
                Sri Lanka is a multi-ethnic, multi-religious society. Sinhala,
                Tamil, Muslim, Burgher, and other communities live together.
                People of Buddhist, Hindu, Islamic, and Catholic faiths living
                peacefully together is our strength.
              </p>
            </div>
            <div className="culture-card">
              <h3>Environmental Challenges - පරිසර අභියෝග</h3>
              <p><strong>දේශගුණ විපර්යාසය:</strong> Rising temperatures, changing rainfall patterns</p>
              <p><strong>පොළව ඛාදනය:</strong> Soil erosion from deforestation</p>
              <p><strong>ජල දූෂණය:</strong> Water pollution from industry and waste</p>
              <p><strong>වනාන්තර හානිය:</strong> Loss of forest cover</p>
            </div>
            <div className="culture-card">
              <h3>Youth and the Future - තරුණයන් සහ අනාගතය</h3>
              <p>
                තරුණ පරම්පරාව ශ්‍රී ලංකාවේ අනාගතයයි. හොඳ අධ්‍යාපනයක්, තාක්ෂණික
                දැනුමක් සහ සදාචාර වටිනාකම් සමඟ තරුණයන් රට ගොඩනඟන්න පුළුවන්.
                ගෝලීයකරණයේ අභියෝගවලට මුහුණ දෙමින් අපේ සංස්කෘතිය රැක ගැනීම
                වැදගත්.
              </p>
              <p>
                The young generation is Sri Lanka's future. With good education,
                technological knowledge, and moral values, youth can build the
                nation. Protecting our culture while facing globalization
                challenges is important.
              </p>
            </div>
            <div className="activity-card">
              <h3>Discussion Topics</h3>
              <p>1. How can we promote unity among different communities?</p>
              <p>2. What can young people do to protect the environment?</p>
              <p>3. How do we balance modernization with cultural preservation?</p>
              <p>4. What are the responsibilities of citizens in a democracy?</p>
            </div>
          </section>
        );

      case "media":
        return (
          <section className="section active">
            <h2>Media Literacy - මාධ්‍ය සාක්ෂරතාව</h2>
            <div className="culture-card">
              <h3>Understanding Media - මාධ්‍ය අවබෝධය</h3>
              <p>
                <strong>මාධ්‍ය සාක්ෂරතාව</strong> යනු මාධ්‍ය පණිවිඩ විශ්ලේෂණය කිරීමේ,
                ඇගයීමේ සහ නිර්මාණය කිරීමේ හැකියාවයි. වර්තමාන ඩිජිටල් යුගයේ මෙම
                කුසලතාව ඉතා වැදගත්.
              </p>
              <p>
                <strong>Media literacy</strong> is the ability to analyze, evaluate,
                and create media messages. This skill is very important in today's
                digital age.
              </p>
            </div>
            <div className="activity-card">
              <h3>Types of Media - මාධ්‍ය වර්ග</h3>
              <p><strong>මුද්‍රිත මාධ්‍ය (Print Media):</strong> පුවත්පත්, සඟරා, පොත්</p>
              <p><strong>විකාශන මාධ්‍ය (Broadcast Media):</strong> රේඩියෝ, ටෙලිවිෂන්</p>
              <p><strong>ඩිජිටල් මාධ්‍ය (Digital Media):</strong> වෙබ් අඩවි, යෙදුම්, සමාජ මාධ්‍ය</p>
              <p><strong>සමාජ මාධ්‍ය (Social Media):</strong> Facebook, YouTube, TikTok, Twitter</p>
            </div>
            <div className="grammar-box">
              <h4>Identifying Fake News - ව්‍යාජ පුවත් හඳුනා ගැනීම</h4>
              <p><strong>1. මූලාශ්‍රය පරීක්ෂා කරන්න:</strong> Who created this content?</p>
              <p><strong>2. සාක්ෂි සොයන්න:</strong> Is there evidence to support claims?</p>
              <p><strong>3. වෙනත් මූලාශ්‍ර සමඟ සසඳන්න:</strong> Do other reliable sources report the same?</p>
              <p><strong>4. දිනය පරීක්ෂා කරන්න:</strong> Is this current or outdated information?</p>
              <p><strong>5. ඔබේ පක්ෂග්‍රාහීත්වය පරීක්ෂා කරන්න:</strong> Am I believing this because I want to?</p>
            </div>
            <div className="activity-card">
              <h3>Digital Citizenship - ඩිජිටල් පුරවැසිභාවය</h3>
              <p><strong>ගෞරවය (Respect):</strong> Treat others online as you would in person</p>
              <p><strong>වගකීම (Responsibility):</strong> Think before you post or share</p>
              <p><strong>ආරක්ෂාව (Safety):</strong> Protect your personal information</p>
              <p><strong>සත්‍යතාව (Integrity):</strong> Don't spread false information</p>
            </div>
            <div className="reading-passage">
              <h3>Critical Analysis of Advertisements</h3>
              <div className="reading-sinhala">
                දැන්වීම් බලගතු මාධ්‍ය ආකාරයකි. ඒවා අපව නිශ්චිත නිෂ්පාදන මිලදී ගැනීමට
                හෝ යම් ආකාරයකින් සිතීමට පොළඹවයි. දැන්වීම් විශ්ලේෂණය කරන විට, ඔවුන්
                භාවිතා කරන උපක්‍රම හඳුනා ගැනීම වැදගත්:
                <br /><br />
                • <strong>හැඟීම්වලට ආයාචනය:</strong> සතුට, බය, ආදරය භාවිතා කිරීම
                <br />
                • <strong>ප්‍රසිද්ධ පුද්ගලයන්:</strong> නළුවන්, ක්‍රීඩකයන් භාවිතය
                <br />
                • <strong>පුනරාවර්තනය:</strong> එකම පණිවිඩය නැවත නැවත පෙන්වීම
                <br />
                • <strong>සීමිත කාල පිරිනැමීම්:</strong> "අද පමණි!" වැනි පණිවිඩ
              </div>
              <div className="reading-english">
                Advertisements are a powerful form of media. They persuade us to buy
                certain products or think in certain ways. When analyzing ads, it's
                important to identify the techniques they use:
                <br /><br />
                • <strong>Emotional appeal:</strong> Using happiness, fear, love
                <br />
                • <strong>Celebrity endorsement:</strong> Using actors, athletes
                <br />
                • <strong>Repetition:</strong> Showing the same message repeatedly
                <br />
                • <strong>Limited time offers:</strong> "Today only!" messages
              </div>
            </div>
            <div className="activity-card">
              <h3>Media Analysis Exercise</h3>
              <p><strong>Choose a news article or advertisement and analyze:</strong></p>
              <p>1. Who created this? What is their purpose?</p>
              <p>2. What techniques are used to attract attention?</p>
              <p>3. What is being promoted or sold (product, idea, or behavior)?</p>
              <p>4. What information is missing or hidden?</p>
              <p>5. How might different people interpret this message?</p>
            </div>
            <div className="culture-card">
              <h3>Online Safety - අන්තර්ජාල ආරක්ෂාව</h3>
              <p><strong>මුරපද ආරක්ෂාව:</strong> Use strong, unique passwords</p>
              <p><strong>පෞද්ගලික තොරතුරු:</strong> Don't share personal details online</p>
              <p><strong>සයිබර් හිරිහැර:</strong> Report and block cyberbullying</p>
              <p><strong>තතු මාර්ග (Phishing):</strong> Don't click suspicious links</p>
              <p><strong>තිර කාලය:</strong> Balance online and offline activities</p>
            </div>
          </section>
        );

      case "speaking":
        return (
          <section className="section active">
            <h2>Public Speaking - ප්‍රසිද්ධ කථනය</h2>
            <div className="activity-card">
              <h3>Speech Structure - කථා ව්‍යුහය</h3>
              <p><strong>ආරම්භය (Opening):</strong></p>
              <p>• Greeting: ගරු සභාපතිතුමා, ගෞරවනීය අමුත්තන්, මිත්‍රවරුනි...</p>
              <p>• Hook: Question, story, or surprising fact</p>
              <p><strong>මැද කොටස (Body):</strong></p>
              <p>• 3 main points with supporting evidence</p>
              <p>• Transition phrases: පළමුව, දෙවනුව, අවසානයේ</p>
              <p><strong>අවසානය (Closing):</strong></p>
              <p>• Summary of key points</p>
              <p>• Call to action or memorable closing</p>
              <p>• ස්තූතියි (Thank you)</p>
            </div>
            <div className="activity-card">
              <h3>Speech Topics for Practice</h3>
              <p><strong>Informative:</strong></p>
              <p>• ශ්‍රී ලංකාවේ ලෝක උරුම ස්ථාන (World Heritage Sites of Sri Lanka)</p>
              <p>• තාක්ෂණයේ වර්ධනය සහ අපේ ජීවිත (Growth of Technology and Our Lives)</p>
              <p><strong>Persuasive:</strong></p>
              <p>• පරිසරය ආරක්ෂා කිරීමේ වැදගත්කම (Importance of Environmental Protection)</p>
              <p>• අධ්‍යාපනයේ වැදගත්කම (Importance of Education)</p>
              <p><strong>Ceremonial:</strong></p>
              <p>• ජාතික දිනයක් (National Day speech)</p>
              <p>• පාසල් උත්සවය (School event speech)</p>
            </div>
            <div className="activity-card">
              <h3>Debate Format - විවාද ආකෘතිය</h3>
              <p><strong>Topic: තාක්ෂණය අධ්‍යාපනයට හිතකරද?</strong></p>
              <p>For (පක්ෂව):</p>
              <p>• Access to information</p>
              <p>• Interactive learning</p>
              <p>• Global connectivity</p>
              <p>Against (විපක්ෂව):</p>
              <p>• Distraction</p>
              <p>• Screen time concerns</p>
              <p>• Digital divide</p>
            </div>
            <div className="activity-card">
              <h3>Presentation Skills</h3>
              <p><strong>Body Language:</strong> Eye contact, posture, gestures</p>
              <p><strong>Voice:</strong> Clear, varied pace, appropriate volume</p>
              <p><strong>Content:</strong> Organized, relevant, engaging</p>
              <p><strong>Visual Aids:</strong> Simple, clear, supportive</p>
            </div>
          </section>
        );

      case "projects":
        return (
          <section className="section active">
            <h2>Capstone Project - අවසාන ව්‍යාපෘතිය</h2>
            <div className="activity-card">
              <h3>Research and Presentation Project</h3>
              <p><strong>Choose ONE of the following topics:</strong></p>
              <p>1. <strong>Sri Lanka's Path to Independence</strong> - Research the independence movement and present findings</p>
              <p>2. <strong>Environmental Conservation in Sri Lanka</strong> - Study an endangered species or ecosystem</p>
              <p>3. <strong>Technology and Traditional Culture</strong> - How can technology preserve our heritage?</p>
              <p>4. <strong>Youth Leadership</strong> - Research young leaders who made a difference</p>
            </div>
            <div className="activity-card">
              <h3>Project Requirements</h3>
              <p><strong>Written Component (1500+ words in Sinhala):</strong></p>
              <p>• Introduction with thesis statement</p>
              <p>• At least 3 main sections with evidence</p>
              <p>• Conclusion with recommendations</p>
              <p>• Bibliography with at least 5 sources</p>
              <p><strong>Oral Presentation (10-15 minutes):</strong></p>
              <p>• Visual aids (poster or slides)</p>
              <p>• Clear structure and delivery</p>
              <p>• Q&A session</p>
            </div>
            <div className="activity-card">
              <h3>Language Portfolio</h3>
              <p><strong>Compile your best work from the year:</strong></p>
              <p>• 3 best essays with self-reflection</p>
              <p>• Vocabulary journal (100+ new words)</p>
              <p>• Creative writing piece</p>
              <p>• Recording of a speech or reading</p>
              <p>• Self-assessment of language growth</p>
            </div>
            <div className="activity-card">
              <h3>Community Service Project</h3>
              <p><strong>Plan and document a service project:</strong></p>
              <p>• Identify a community need</p>
              <p>• Plan activities to address it</p>
              <p>• Document with photos and writing</p>
              <p>• Reflect on what you learned</p>
              <p>Write a 500-word reflection in Sinhala</p>
            </div>
          </section>
        );

      case "practice":
        return (
          <section className="section active">
            <h2>Speak & Learn - කතා කරමින් ඉගෙන ගන්න</h2>
            <PronunciationPractice
              words={practiceWords}
              title="Practice Grade 6 Words / පන්ති 6 වචන පුහුණුව"
            />
          </section>
        );

      case "quiz":
        return (
          <section className="section active">
            <h2>Final Examination</h2>
            <Quiz questions={quizQuestions} gradeKey="g6" />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grade-content active">
      <div className="grade-info">
        <h2>Grade 6 - Advanced Mastery</h2>
        <p>
          Critical thinking, academic writing, literary analysis, and contemporary issues
        </p>
      </div>

      <Navigation
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        gradeId="g6"
      />

      <ProgressBar progress={86} />

      {renderSection()}
    </div>
  );
};

export default Grade6;
