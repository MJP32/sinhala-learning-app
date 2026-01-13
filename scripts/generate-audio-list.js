// Script to generate list of required audio files
// Run with: node scripts/generate-audio-list.js

const vowels = [
  { sinhala: "අ", roman: "a" },
  { sinhala: "ආ", roman: "aa" },
  { sinhala: "ඇ", roman: "ae" },
  { sinhala: "ඈ", roman: "aae" },
  { sinhala: "ඉ", roman: "i" },
  { sinhala: "ඊ", roman: "ii" },
  { sinhala: "උ", roman: "u" },
  { sinhala: "ඌ", roman: "uu" },
  { sinhala: "ඍ", roman: "ri" },
  { sinhala: "ඎ", roman: "rii" },
  { sinhala: "ඏ", roman: "li" },
  { sinhala: "ඐ", roman: "lii" },
  { sinhala: "එ", roman: "e" },
  { sinhala: "ඒ", roman: "ee" },
  { sinhala: "ඓ", roman: "ai" },
  { sinhala: "ඔ", roman: "o" },
  { sinhala: "ඕ", roman: "oo" },
  { sinhala: "ඖ", roman: "au" },
];

const consonants = [
  { sinhala: "ක", roman: "ka" },
  { sinhala: "ඛ", roman: "kha" },
  { sinhala: "ග", roman: "ga" },
  { sinhala: "ඝ", roman: "gha" },
  { sinhala: "ඞ", roman: "nga" },
  { sinhala: "ච", roman: "ca" },
  { sinhala: "ඡ", roman: "cha" },
  { sinhala: "ජ", roman: "ja" },
  { sinhala: "ඣ", roman: "jha" },
  { sinhala: "ඤ", roman: "nya" },
  { sinhala: "ට", roman: "ta" },
  { sinhala: "ඨ", roman: "tha" },
  { sinhala: "ඩ", roman: "da" },
  { sinhala: "ඪ", roman: "dha" },
  { sinhala: "ණ", roman: "na" },
  { sinhala: "ත", roman: "tha" },
  { sinhala: "ථ", roman: "thha" },
  { sinhala: "ද", roman: "dha" },
  { sinhala: "ධ", roman: "dhha" },
  { sinhala: "න", roman: "nha" },
  { sinhala: "ප", roman: "pa" },
  { sinhala: "ඵ", roman: "pha" },
  { sinhala: "බ", roman: "ba" },
  { sinhala: "භ", roman: "bha" },
  { sinhala: "ම", roman: "ma" },
  { sinhala: "ය", roman: "ya" },
  { sinhala: "ර", roman: "ra" },
  { sinhala: "ල", roman: "la" },
  { sinhala: "ව", roman: "va" },
  { sinhala: "ශ", roman: "sha" },
  { sinhala: "ෂ", roman: "shha" },
  { sinhala: "ස", roman: "sa" },
  { sinhala: "හ", roman: "ha" },
  { sinhala: "ළ", roman: "lla" },
  { sinhala: "ෆ", roman: "fa" },
];

const words = [
  { sinhala: "අම්මා", english: "Mother" },
  { sinhala: "තාත්තා", english: "Father" },
  { sinhala: "පැටිය", english: "Baby" },
  { sinhala: "ගෙදර", english: "Home" },
  { sinhala: "බල්ලා", english: "Dog" },
  { sinhala: "පූසා", english: "Cat" },
  { sinhala: "හාතිය", english: "Elephant" },
  { sinhala: "කුරුල්ලා", english: "Bird" },
  { sinhala: "මාළුවා", english: "Fish" },
  { sinhala: "වඳුරා", english: "Monkey" },
  { sinhala: "ඇස", english: "Eye" },
  { sinhala: "නාසය", english: "Nose" },
  { sinhala: "කන", english: "Ear" },
  { sinhala: "මුව", english: "Mouth" },
  { sinhala: "අත", english: "Hand" },
  { sinhala: "පාදය", english: "Foot" },
  { sinhala: "ආයුබෝවන්", english: "Hello" },
  { sinhala: "ස්තූතියි", english: "Thank you" },
  { sinhala: "ඔව්", english: "Yes" },
  { sinhala: "නෑ", english: "No" },
  { sinhala: "අක්කා", english: "Elder Sister" },
  { sinhala: "අයියා", english: "Elder Brother" },
  { sinhala: "නංගි", english: "Younger Sister" },
  { sinhala: "මල්ලි", english: "Younger Brother" },
  { sinhala: "රතු", english: "Red" },
  { sinhala: "නිල්", english: "Blue" },
  { sinhala: "කොළ", english: "Green" },
  { sinhala: "කහ", english: "Yellow" },
];

console.log("=== REQUIRED AUDIO FILES ===\n");

console.log("--- LETTERS (public/audio/letters/) ---\n");
console.log("Filename format: [unicode-codepoint].mp3\n");

const allLetters = [...vowels, ...consonants];
allLetters.forEach(letter => {
  const codePoint = letter.sinhala.codePointAt(0).toString(16);
  console.log(`${codePoint}.mp3  ->  ${letter.sinhala} (${letter.roman})`);
});

console.log("\n--- WORDS (public/audio/words/) ---\n");
console.log("Filename format: [base64-encoded].mp3\n");

words.forEach(word => {
  const encoded = Buffer.from(word.sinhala).toString('base64');
  console.log(`${encoded}.mp3  ->  ${word.sinhala} (${word.english})`);
});

console.log("\n=== INSTRUCTIONS ===");
console.log("1. Record or download audio files for each letter/word");
console.log("2. Save them with the filenames shown above");
console.log("3. Place letter files in: public/audio/letters/");
console.log("4. Place word files in: public/audio/words/");
console.log("5. Use MP3 format for best browser compatibility");
console.log("\nTip: You can use Google Translate website to get audio:");
console.log("1. Go to translate.google.com");
console.log("2. Set source language to Sinhala");
console.log("3. Type the word/letter");
console.log("4. Click the speaker icon to hear it");
console.log("5. Use a browser extension to download the audio");
