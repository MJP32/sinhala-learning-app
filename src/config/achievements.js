// Achievement definitions for the Sinhala Learning App

export const ACHIEVEMENTS = {
  // Learning Progress Achievements
  first_section: {
    id: 'first_section',
    name: 'First Steps',
    nameSinhala: 'පළමු පියවර',
    description: 'Complete your first section',
    icon: '🎯',
    xpReward: 25,
    category: 'progress'
  },
  ten_sections: {
    id: 'ten_sections',
    name: 'Quick Learner',
    nameSinhala: 'වේගවත් ඉගෙනුම්කරු',
    description: 'Complete 10 sections',
    icon: '📚',
    xpReward: 50,
    category: 'progress'
  },
  twenty_five_sections: {
    id: 'twenty_five_sections',
    name: 'Dedicated Student',
    nameSinhala: 'කැපවූ ශිෂ්‍යයා',
    description: 'Complete 25 sections',
    icon: '🎓',
    xpReward: 100,
    category: 'progress'
  },
  fifty_sections: {
    id: 'fifty_sections',
    name: 'Knowledge Seeker',
    nameSinhala: 'දැනුම් සෙවනැල්ල',
    description: 'Complete 50 sections',
    icon: '🌟',
    xpReward: 200,
    category: 'progress'
  },

  // Grade Completion Achievements
  grade1_master: {
    id: 'grade1_master',
    name: 'Grade 1 Master',
    nameSinhala: 'පළමු ශ්‍රේණි ජයග්‍රාහක',
    description: 'Complete all Grade 1 sections',
    icon: '🏆',
    xpReward: 150,
    category: 'grades'
  },
  grade2_master: {
    id: 'grade2_master',
    name: 'Grade 2 Master',
    nameSinhala: 'දෙවන ශ්‍රේණි ජයග්‍රාහක',
    description: 'Complete all Grade 2 sections',
    icon: '🏆',
    xpReward: 150,
    category: 'grades'
  },
  grade3_master: {
    id: 'grade3_master',
    name: 'Grade 3 Master',
    nameSinhala: 'තෙවන ශ්‍රේණි ජයග්‍රාහක',
    description: 'Complete all Grade 3 sections',
    icon: '🏆',
    xpReward: 150,
    category: 'grades'
  },
  grade4_master: {
    id: 'grade4_master',
    name: 'Grade 4 Master',
    nameSinhala: 'සිව්වන ශ්‍රේණි ජයග්‍රාහක',
    description: 'Complete all Grade 4 sections',
    icon: '🏆',
    xpReward: 150,
    category: 'grades'
  },
  grade5_master: {
    id: 'grade5_master',
    name: 'Grade 5 Master',
    nameSinhala: 'පස්වන ශ්‍රේණි ජයග්‍රාහක',
    description: 'Complete all Grade 5 sections',
    icon: '🏆',
    xpReward: 150,
    category: 'grades'
  },
  grade6_master: {
    id: 'grade6_master',
    name: 'Grade 6 Master',
    nameSinhala: 'හයවන ශ්‍රේණි ජයග්‍රාහක',
    description: 'Complete all Grade 6 sections',
    icon: '🏆',
    xpReward: 150,
    category: 'grades'
  },
  all_grades_master: {
    id: 'all_grades_master',
    name: 'Ultimate Master',
    nameSinhala: 'අවසාන ජයග්‍රාහක',
    description: 'Complete all grades',
    icon: '👑',
    xpReward: 500,
    category: 'grades'
  },

  // Streak Achievements
  streak_3: {
    id: 'streak_3',
    name: 'Getting Started',
    nameSinhala: 'ආරම්භය',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    xpReward: 30,
    category: 'streaks'
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    nameSinhala: 'සතියේ සටන්කරු',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xpReward: 75,
    category: 'streaks'
  },
  streak_14: {
    id: 'streak_14',
    name: 'Fortnight Fighter',
    nameSinhala: 'පොකුර සටන්කරු',
    description: 'Maintain a 14-day learning streak',
    icon: '🔥',
    xpReward: 150,
    category: 'streaks'
  },
  streak_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    nameSinhala: 'මාසික ජයග්‍රාහක',
    description: 'Maintain a 30-day learning streak',
    icon: '🔥',
    xpReward: 300,
    category: 'streaks'
  },

  // Quiz Achievements
  first_quiz: {
    id: 'first_quiz',
    name: 'Quiz Starter',
    nameSinhala: 'ප්‍රශ්නාවලිය ආරම්භකයා',
    description: 'Complete your first quiz',
    icon: '❓',
    xpReward: 25,
    category: 'quizzes'
  },
  perfect_quiz: {
    id: 'perfect_quiz',
    name: 'Perfect Score',
    nameSinhala: 'පරිපූර්ණ ලකුණු',
    description: 'Get 100% on any quiz',
    icon: '💯',
    xpReward: 100,
    category: 'quizzes'
  },
  five_perfect_quizzes: {
    id: 'five_perfect_quizzes',
    name: 'Quiz Champion',
    nameSinhala: 'ප්‍රශ්නාවලි ශූරයා',
    description: 'Get 5 perfect quiz scores',
    icon: '🏅',
    xpReward: 200,
    category: 'quizzes'
  },
  ten_quizzes: {
    id: 'ten_quizzes',
    name: 'Quiz Enthusiast',
    nameSinhala: 'ප්‍රශ්නාවලි උනන්දුකරු',
    description: 'Complete 10 quizzes',
    icon: '📝',
    xpReward: 75,
    category: 'quizzes'
  },

  // XP and Level Achievements
  level_5: {
    id: 'level_5',
    name: 'Rising Star',
    nameSinhala: 'නැගී එන තරුව',
    description: 'Reach Level 5',
    icon: '⭐',
    xpReward: 100,
    category: 'levels'
  },
  level_10: {
    id: 'level_10',
    name: 'Shining Star',
    nameSinhala: 'දීප්තිමත් තරුව',
    description: 'Reach Level 10',
    icon: '🌟',
    xpReward: 250,
    category: 'levels'
  },
  xp_1000: {
    id: 'xp_1000',
    name: 'XP Collector',
    nameSinhala: 'XP එකතු කරන්නා',
    description: 'Earn 1,000 XP',
    icon: '💎',
    xpReward: 50,
    category: 'levels'
  },
  xp_5000: {
    id: 'xp_5000',
    name: 'XP Master',
    nameSinhala: 'XP ජයග්‍රාහක',
    description: 'Earn 5,000 XP',
    icon: '💎',
    xpReward: 150,
    category: 'levels'
  }
};

// Check if an achievement condition is met
export const checkAchievementCondition = (achievement, stats) => {
  switch (achievement.id) {
    // Progress achievements
    case 'first_section':
      return stats.totalSectionsCompleted >= 1;
    case 'ten_sections':
      return stats.totalSectionsCompleted >= 10;
    case 'twenty_five_sections':
      return stats.totalSectionsCompleted >= 25;
    case 'fifty_sections':
      return stats.totalSectionsCompleted >= 50;

    // Grade completion achievements
    case 'grade1_master':
      return stats.grade1Completed;
    case 'grade2_master':
      return stats.grade2Completed;
    case 'grade3_master':
      return stats.grade3Completed;
    case 'grade4_master':
      return stats.grade4Completed;
    case 'grade5_master':
      return stats.grade5Completed;
    case 'grade6_master':
      return stats.grade6Completed;
    case 'all_grades_master':
      return stats.allGradesCompleted;

    // Streak achievements
    case 'streak_3':
      return stats.currentStreak >= 3 || stats.longestStreak >= 3;
    case 'streak_7':
      return stats.currentStreak >= 7 || stats.longestStreak >= 7;
    case 'streak_14':
      return stats.currentStreak >= 14 || stats.longestStreak >= 14;
    case 'streak_30':
      return stats.currentStreak >= 30 || stats.longestStreak >= 30;

    // Quiz achievements
    case 'first_quiz':
      return stats.quizzesCompleted >= 1;
    case 'perfect_quiz':
      return stats.perfectQuizzes >= 1;
    case 'five_perfect_quizzes':
      return stats.perfectQuizzes >= 5;
    case 'ten_quizzes':
      return stats.quizzesCompleted >= 10;

    // Level achievements
    case 'level_5':
      return stats.level >= 5;
    case 'level_10':
      return stats.level >= 10;
    case 'xp_1000':
      return stats.xp >= 1000;
    case 'xp_5000':
      return stats.xp >= 5000;

    default:
      return false;
  }
};

// Get achievements by category
export const getAchievementsByCategory = (category) => {
  return Object.values(ACHIEVEMENTS).filter(ach => ach.category === category);
};

// Get achievement categories
export const ACHIEVEMENT_CATEGORIES = [
  { id: 'progress', name: 'Learning Progress', nameSinhala: 'ඉගෙනුම් ප්‍රගතිය' },
  { id: 'grades', name: 'Grade Mastery', nameSinhala: 'ශ්‍රේණි ප්‍රවීණතාව' },
  { id: 'streaks', name: 'Streaks', nameSinhala: 'ධාරා' },
  { id: 'quizzes', name: 'Quiz Performance', nameSinhala: 'ප්‍රශ්නාවලි කාර්ය සාධනය' },
  { id: 'levels', name: 'XP & Levels', nameSinhala: 'XP සහ මට්ටම්' }
];
