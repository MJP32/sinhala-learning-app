// Centralized configuration for all grade sections
// Used by GradeSelector dropdown and Navigation components

export const GRADE_SECTIONS = {
  1: {
    id: "g1",
    name: "Grade 1",
    nameSi: "පළමු ශ්‍රේණිය",
    sections: [
      { id: "letters", label: "Letters", labelSi: "අකුරු" },
      { id: "numbers", label: "Numbers", labelSi: "අංක" },
      { id: "words", label: "Simple Words", labelSi: "සරල වචන" },
      { id: "animals", label: "Animals", labelSi: "සතුන්" },
      { id: "fruits", label: "Fruits", labelSi: "පලතුරු" },
      { id: "body", label: "Body Parts", labelSi: "ශරීර කොටස්" },
      { id: "colors", label: "Colors", labelSi: "වර්ණ" },
      { id: "games", label: "Fun Games", labelSi: "විනෝද ක්‍රීඩා" },
      { id: "songs", label: "Songs & Rhymes", labelSi: "ගීත සහ රිද්ම" },
      { id: "practice", label: "Speak & Learn", labelSi: "කතා කර ඉගෙන ගන්න" },
      { id: "quiz", label: "Quiz", labelSi: "ප්‍රශ්නාවලිය" },
    ],
  },
  2: {
    id: "g2",
    name: "Grade 2",
    nameSi: "දෙවන ශ්‍රේණිය",
    sections: [
      { id: "family", label: "Family", labelSi: "පවුල" },
      { id: "colors", label: "Colors", labelSi: "වර්ණ" },
      { id: "numbers", label: "Numbers 11-20", labelSi: "අංක 11-20" },
      { id: "days", label: "Days & Months", labelSi: "දින සහ මාස" },
      { id: "food", label: "Food", labelSi: "ආහාර" },
      { id: "weather", label: "Weather", labelSi: "කාලගුණය" },
      { id: "school", label: "School", labelSi: "පාසල" },
      { id: "sentences", label: "Simple Sentences", labelSi: "සරල වාක්‍ය" },
      { id: "stories", label: "Short Stories", labelSi: "කෙටි කතා" },
      { id: "practice", label: "Speak & Learn", labelSi: "කතා කර ඉගෙන ගන්න" },
      { id: "quiz", label: "Quiz", labelSi: "ප්‍රශ්නාවලිය" },
    ],
  },
  3: {
    id: "g3",
    name: "Grade 3",
    nameSi: "තෙවන ශ්‍රේණිය",
    sections: [
      { id: "grammar", label: "Grammar", labelSi: "ව්‍යාකරණ" },
      { id: "tenses", label: "Tenses", labelSi: "කාල" },
      { id: "conversation", label: "Conversation", labelSi: "සංවාද" },
      { id: "vocabulary", label: "Vocabulary", labelSi: "වචන මාලාව" },
      { id: "professions", label: "Professions", labelSi: "වෘත්තීන්" },
      { id: "clothing", label: "Clothing", labelSi: "ඇඳුම්" },
      { id: "reading", label: "Reading", labelSi: "කියවීම" },
      { id: "writing", label: "Writing", labelSi: "ලිවීම" },
      { id: "stories", label: "Stories", labelSi: "කතා" },
      { id: "practice", label: "Speak & Learn", labelSi: "කතා කර ඉගෙන ගන්න" },
      { id: "quiz", label: "Quiz", labelSi: "ප්‍රශ්නාවලිය" },
    ],
  },
  4: {
    id: "g4",
    name: "Grade 4",
    nameSi: "සිව්වන ශ්‍රේණිය",
    sections: [
      { id: "reading", label: "Reading", labelSi: "කියවීම" },
      { id: "grammar", label: "Advanced Grammar", labelSi: "උසස් ව්‍යාකරණ" },
      { id: "vocabulary", label: "Vocabulary", labelSi: "වචන මාලාව" },
      { id: "emotions", label: "Emotions", labelSi: "හැඟීම්" },
      { id: "nature", label: "Nature", labelSi: "ස්වභාවය" },
      { id: "writing", label: "Creative Writing", labelSi: "නිර්මාණාත්මක ලිවීම" },
      { id: "culture", label: "Culture & History", labelSi: "සංස්කෘතිය සහ ඉතිහාසය" },
      { id: "proverbs", label: "Proverbs", labelSi: "පරිභාෂා" },
      { id: "literature", label: "Literature", labelSi: "සාහිත්‍යය" },
      { id: "practice", label: "Speak & Learn", labelSi: "කතා කර ඉගෙන ගන්න" },
      { id: "quiz", label: "Final Quiz", labelSi: "අවසන් ප්‍රශ්නාවලිය" },
    ],
  },
  5: {
    id: "g5",
    name: "Grade 5",
    nameSi: "පස්වන ශ්‍රේණිය",
    sections: [
      { id: "reading", label: "Advanced Reading", labelSi: "උසස් කියවීම" },
      { id: "grammar", label: "Complex Grammar", labelSi: "සංකීර්ණ ව්‍යාකරණ" },
      { id: "writing", label: "Formal Writing", labelSi: "විධිමත් ලිවීම" },
      { id: "vocabulary", label: "Academic Words", labelSi: "අධ්‍යයන වචන" },
      { id: "idioms", label: "Idioms & Phrases", labelSi: "මුහුණුවර සහ වාක්‍ය ඛණ්ඩ" },
      { id: "literature", label: "Classical Literature", labelSi: "සම්භාව්‍ය සාහිත්‍යය" },
      { id: "culture", label: "Heritage & Identity", labelSi: "උරුමය සහ අනන්‍යතාවය" },
      { id: "formal", label: "Formal Language", labelSi: "විධිමත් භාෂාව" },
      { id: "projects", label: "Research Projects", labelSi: "පර්යේෂණ ව්‍යාපෘති" },
      { id: "practice", label: "Speak & Learn", labelSi: "කතා කර ඉගෙන ගන්න" },
      { id: "quiz", label: "Comprehensive Quiz", labelSi: "සවිස්තරාත්මක ප්‍රශ්නාවලිය" },
    ],
  },
  6: {
    id: "g6",
    name: "Grade 6",
    nameSi: "හයවන ශ්‍රේණිය",
    sections: [
      { id: "reading", label: "Critical Reading", labelSi: "විවේචනාත්මක කියවීම" },
      { id: "grammar", label: "Advanced Grammar", labelSi: "උසස් ව්‍යාකරණ" },
      { id: "writing", label: "Academic Writing", labelSi: "අධ්‍යයන ලිවීම" },
      { id: "vocabulary", label: "Advanced Vocabulary", labelSi: "උසස් වචන මාලාව" },
      { id: "literature", label: "Literary Analysis", labelSi: "සාහිත්‍ය විශ්ලේෂණය" },
      { id: "culture", label: "Contemporary Issues", labelSi: "සමකාලීන ගැටලු" },
      { id: "media", label: "Media Literacy", labelSi: "මාධ්‍ය සාක්ෂරතාව" },
      { id: "speaking", label: "Public Speaking", labelSi: "මහජන කථනය" },
      { id: "projects", label: "Capstone Project", labelSi: "අවසන් ව්‍යාපෘතිය" },
      { id: "practice", label: "Speak & Learn", labelSi: "කතා කර ඉගෙන ගන්න" },
      { id: "quiz", label: "Final Examination", labelSi: "අවසන් විභාගය" },
    ],
  },
};

// Helper function to get sections for a grade
export const getGradeSections = (gradeNumber) => {
  return GRADE_SECTIONS[gradeNumber]?.sections || [];
};

// Helper function to get grade info
export const getGradeInfo = (gradeNumber) => {
  return GRADE_SECTIONS[gradeNumber] || null;
};

export default GRADE_SECTIONS;
