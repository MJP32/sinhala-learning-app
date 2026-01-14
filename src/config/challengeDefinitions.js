// Daily Challenge Definitions
// Each challenge type has multiple variants with different targets and rewards

export const challengeTemplates = [
  // Quiz challenges
  {
    id: 'complete_quizzes',
    type: 'quiz',
    titleTemplate: 'Complete {target} quiz(es)',
    titleTemplateSi: 'ප්‍රශ්නාවලි {target}ක් සම්පූර්ණ කරන්න',
    descriptionTemplate: 'Finish {target} quiz(es) today',
    descriptionTemplateSi: 'අද ප්‍රශ්නාවලි {target}ක් අවසන් කරන්න',
    icon: '📝',
    variants: [
      { target: 1, xpReward: 20 },
      { target: 2, xpReward: 35 },
      { target: 3, xpReward: 50 },
    ],
    trackingKey: 'quizzesCompleted',
  },
  {
    id: 'quiz_score',
    type: 'quiz',
    titleTemplate: 'Score {target}% on a quiz',
    titleTemplateSi: 'ප්‍රශ්නාවලියක {target}%ක් ලබා ගන්න',
    descriptionTemplate: 'Get at least {target}% on any quiz',
    descriptionTemplateSi: 'ඕනෑම ප්‍රශ්නාවලියක අවම {target}%ක් ලබන්න',
    icon: '🎯',
    variants: [
      { target: 80, xpReward: 25 },
      { target: 90, xpReward: 35 },
      { target: 100, xpReward: 50 },
    ],
    trackingKey: 'highestQuizScore',
  },

  // XP challenges
  {
    id: 'earn_xp',
    type: 'xp',
    titleTemplate: 'Earn {target} XP',
    titleTemplateSi: 'XP {target}ක් උපයන්න',
    descriptionTemplate: 'Collect {target} experience points today',
    descriptionTemplateSi: 'අද අත්දැකීම් ලකුණු {target}ක් එකතු කරන්න',
    icon: '⭐',
    variants: [
      { target: 30, xpReward: 15 },
      { target: 50, xpReward: 20 },
      { target: 100, xpReward: 30 },
    ],
    trackingKey: 'xpEarnedToday',
  },

  // Flashcard challenges
  {
    id: 'practice_flashcards',
    type: 'flashcard',
    titleTemplate: 'Practice {target} flashcards',
    titleTemplateSi: 'ෆ්ලෑෂ් කාඩ්පත් {target}ක් පුහුණු කරන්න',
    descriptionTemplate: 'Review {target} flashcards',
    descriptionTemplateSi: 'ෆ්ලෑෂ් කාඩ්පත් {target}ක් සමාලෝචනය කරන්න',
    icon: '🃏',
    variants: [
      { target: 5, xpReward: 15 },
      { target: 10, xpReward: 20 },
      { target: 20, xpReward: 30 },
    ],
    trackingKey: 'flashcardsReviewed',
  },

  // Section challenges
  {
    id: 'complete_sections',
    type: 'section',
    titleTemplate: 'Complete {target} section(s)',
    titleTemplateSi: 'කොටස් {target}ක් සම්පූර්ණ කරන්න',
    descriptionTemplate: 'Finish {target} learning section(s)',
    descriptionTemplateSi: 'ඉගෙනුම් කොටස් {target}ක් අවසන් කරන්න',
    icon: '📚',
    variants: [
      { target: 1, xpReward: 20 },
      { target: 2, xpReward: 35 },
      { target: 3, xpReward: 50 },
    ],
    trackingKey: 'sectionsCompleted',
  },

  // Game challenges
  {
    id: 'play_games',
    type: 'game',
    titleTemplate: 'Play {target} game(s)',
    titleTemplateSi: 'ක්‍රීඩා {target}ක් ක්‍රීඩා කරන්න',
    descriptionTemplate: 'Complete {target} interactive game(s)',
    descriptionTemplateSi: 'අන්තර්ක්‍රියාකාරී ක්‍රීඩා {target}ක් සම්පූර්ණ කරන්න',
    icon: '🎮',
    variants: [
      { target: 1, xpReward: 15 },
      { target: 2, xpReward: 25 },
      { target: 3, xpReward: 35 },
    ],
    trackingKey: 'gamesPlayed',
  },

  // Streak challenge
  {
    id: 'maintain_streak',
    type: 'streak',
    titleTemplate: 'Keep your streak alive',
    titleTemplateSi: 'ඔබේ පෙළපත පවත්වා ගන්න',
    descriptionTemplate: 'Log in and learn something today',
    descriptionTemplateSi: 'අද ලොග් වී යමක් ඉගෙන ගන්න',
    icon: '🔥',
    variants: [
      { target: 1, xpReward: 10 },
    ],
    trackingKey: 'streakMaintained',
  },

  // Pronunciation challenges
  {
    id: 'practice_pronunciation',
    type: 'pronunciation',
    titleTemplate: 'Practice {target} pronunciations',
    titleTemplateSi: 'උච්චාරණ {target}ක් පුහුණු කරන්න',
    descriptionTemplate: 'Use the pronunciation practice feature',
    descriptionTemplateSi: 'උච්චාරණ පුහුණු විශේෂාංගය භාවිතා කරන්න',
    icon: '🎤',
    variants: [
      { target: 5, xpReward: 15 },
      { target: 10, xpReward: 25 },
    ],
    trackingKey: 'pronunciationsPracticed',
  },
];

// Bonus XP for completing all daily challenges
export const ALL_CHALLENGES_BONUS_XP = 50;

// Number of challenges to generate per day
export const DAILY_CHALLENGE_COUNT = 3;

// Generate a deterministic seed based on date
export const getDateSeed = (date = new Date()) => {
  const dateStr = date.toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Seeded random number generator
export const seededRandom = (seed) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Generate daily challenges based on date
export const generateDailyChallenges = (date = new Date()) => {
  const seed = getDateSeed(date);
  const challenges = [];
  const usedTemplates = new Set();

  // Shuffle templates using seeded random
  const shuffledTemplates = [...challengeTemplates].sort((a, b) => {
    return seededRandom(seed + challengeTemplates.indexOf(a)) -
           seededRandom(seed + challengeTemplates.indexOf(b));
  });

  for (let i = 0; i < DAILY_CHALLENGE_COUNT && i < shuffledTemplates.length; i++) {
    const template = shuffledTemplates[i];
    if (usedTemplates.has(template.id)) continue;
    usedTemplates.add(template.id);

    // Pick a variant using seeded random
    const variantIndex = Math.floor(seededRandom(seed + i * 100) * template.variants.length);
    const variant = template.variants[variantIndex];

    challenges.push({
      id: `${template.id}_${date.toISOString().split('T')[0]}`,
      templateId: template.id,
      type: template.type,
      title: template.titleTemplate.replace('{target}', variant.target),
      titleSi: template.titleTemplateSi.replace('{target}', variant.target),
      description: template.descriptionTemplate.replace('{target}', variant.target),
      descriptionSi: template.descriptionTemplateSi.replace('{target}', variant.target),
      icon: template.icon,
      target: variant.target,
      xpReward: variant.xpReward,
      trackingKey: template.trackingKey,
      progress: 0,
      completed: false,
      claimed: false,
    });
  }

  return challenges;
};
