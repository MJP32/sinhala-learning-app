// Smart Recommendation Engine
// Analyzes user performance and generates personalized learning recommendations

// Category to section mapping for each grade
const categoryToSectionMap = {
  grade1: {
    alphabet: { section: 'letters', name: 'Letters & Alphabet', nameSi: 'අකුරු' },
    numbers: { section: 'numbers', name: 'Numbers', nameSi: 'අංක' },
    vocabulary: { section: 'words', name: 'Simple Words', nameSi: 'සරල වචන' },
    animals: { section: 'animals', name: 'Animals', nameSi: 'සතුන්' },
    fruits: { section: 'fruits', name: 'Fruits', nameSi: 'පලතුරු' },
    body: { section: 'body', name: 'Body Parts', nameSi: 'ශරීර කොටස්' },
    colors: { section: 'colors', name: 'Colors', nameSi: 'වර්ණ' },
    greetings: { section: 'words', name: 'Greetings', nameSi: 'ආචාර' },
    family: { section: 'words', name: 'Family', nameSi: 'පවුල' },
  },
  grade2: {
    days: { section: 'time', name: 'Days & Time', nameSi: 'දින සහ කාලය' },
    food: { section: 'food', name: 'Food', nameSi: 'ආහාර' },
    weather: { section: 'nature', name: 'Weather', nameSi: 'කාලගුණය' },
    school: { section: 'school', name: 'School', nameSi: 'පාසල' },
    vocabulary: { section: 'vocabulary', name: 'Vocabulary', nameSi: 'වචන මාලාව' },
    sentences: { section: 'sentences', name: 'Sentences', nameSi: 'වාක්‍ය' },
  },
  grade3: {
    grammar: { section: 'grammar', name: 'Grammar', nameSi: 'ව්‍යාකරණ' },
    verbs: { section: 'verbs', name: 'Verbs', nameSi: 'ක්‍රියා පද' },
    adjectives: { section: 'adjectives', name: 'Adjectives', nameSi: 'නාම විශේෂණ' },
    reading: { section: 'reading', name: 'Reading', nameSi: 'කියවීම' },
    writing: { section: 'writing', name: 'Writing', nameSi: 'ලිවීම' },
  },
  grade4: {
    advanced_grammar: { section: 'grammar', name: 'Advanced Grammar', nameSi: 'උසස් ව්‍යාකරණ' },
    comprehension: { section: 'comprehension', name: 'Comprehension', nameSi: 'අවබෝධය' },
    conversation: { section: 'conversation', name: 'Conversation', nameSi: 'සංවාදය' },
    culture: { section: 'culture', name: 'Culture', nameSi: 'සංස්කෘතිය' },
  },
  grade5: {
    literature: { section: 'literature', name: 'Literature', nameSi: 'සාහිත්‍යය' },
    history: { section: 'history', name: 'History', nameSi: 'ඉතිහාසය' },
    environment: { section: 'environment', name: 'Environment', nameSi: 'පරිසරය' },
    advanced_reading: { section: 'reading', name: 'Advanced Reading', nameSi: 'උසස් කියවීම' },
  },
  grade6: {
    essay_writing: { section: 'writing', name: 'Essay Writing', nameSi: 'රචනා ලිවීම' },
    poetry: { section: 'poetry', name: 'Poetry', nameSi: 'කවි' },
    formal_language: { section: 'formal', name: 'Formal Language', nameSi: 'විධිමත් භාෂාව' },
    contemporary: { section: 'contemporary', name: 'Contemporary Topics', nameSi: 'සමකාලීන මාතෘකා' },
  },
};

// Priority weights for different factors
const PRIORITY_WEIGHTS = {
  scoreDifference: 0.4,   // How far below 70% is the score
  recency: 0.25,          // More recent poor performance = higher priority
  frequency: 0.2,         // How often this category appears in quizzes
  importance: 0.15,       // Base importance of the category
};

// Base importance scores for categories
const CATEGORY_IMPORTANCE = {
  alphabet: 10,
  numbers: 9,
  vocabulary: 9,
  grammar: 8,
  verbs: 7,
  adjectives: 6,
  reading: 8,
  writing: 7,
  comprehension: 8,
  conversation: 7,
  culture: 5,
  default: 5,
};

/**
 * Analyze quiz history and identify weak areas
 * @param {Object} analytics - Analytics data from AnalyticsContext
 * @param {string} currentGrade - Current grade key (e.g., 'grade1')
 * @returns {Array} Array of weak category objects
 */
export const analyzeWeakAreas = (analytics, currentGrade) => {
  if (!analytics || !analytics.quizHistory || analytics.quizHistory.length === 0) {
    return [];
  }

  // Group quiz results by category
  const categoryStats = {};
  const now = Date.now();
  const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

  analytics.quizHistory.forEach((quiz, index) => {
    const category = quiz.category || 'general';
    const grade = quiz.grade || currentGrade;

    if (!categoryStats[category]) {
      categoryStats[category] = {
        category,
        grade,
        scores: [],
        recentScores: [],
        totalAttempts: 0,
        lastAttemptTime: 0,
      };
    }

    categoryStats[category].scores.push(quiz.score);
    categoryStats[category].totalAttempts++;
    categoryStats[category].lastAttemptTime = Math.max(
      categoryStats[category].lastAttemptTime,
      quiz.timestamp || (now - (index * 60000))
    );

    // Track recent scores separately
    if (quiz.timestamp >= oneWeekAgo || index >= analytics.quizHistory.length - 10) {
      categoryStats[category].recentScores.push(quiz.score);
    }
  });

  // Calculate averages and identify weak areas
  const weakAreas = [];

  Object.values(categoryStats).forEach(stats => {
    const avgScore = stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length;
    const recentAvg = stats.recentScores.length > 0
      ? stats.recentScores.reduce((a, b) => a + b, 0) / stats.recentScores.length
      : avgScore;

    // Consider area weak if below 70%
    if (recentAvg < 70 || avgScore < 70) {
      const recencyScore = Math.min(1, (now - stats.lastAttemptTime) / (7 * 24 * 60 * 60 * 1000));
      const scoreDiff = Math.max(70 - recentAvg, 70 - avgScore);
      const importance = CATEGORY_IMPORTANCE[stats.category] || CATEGORY_IMPORTANCE.default;

      const priorityScore =
        (scoreDiff / 70) * PRIORITY_WEIGHTS.scoreDifference +
        (1 - recencyScore) * PRIORITY_WEIGHTS.recency +
        (stats.totalAttempts / 10) * PRIORITY_WEIGHTS.frequency +
        (importance / 10) * PRIORITY_WEIGHTS.importance;

      weakAreas.push({
        category: stats.category,
        grade: stats.grade,
        avgScore: Math.round(avgScore),
        recentAvgScore: Math.round(recentAvg),
        totalAttempts: stats.totalAttempts,
        priorityScore,
        improvement: avgScore - recentAvg, // Negative means getting worse
      });
    }
  });

  // Sort by priority score (highest first)
  return weakAreas.sort((a, b) => b.priorityScore - a.priorityScore);
};

/**
 * Generate personalized recommendations based on weak areas
 * @param {Array} weakAreas - Array from analyzeWeakAreas
 * @param {string} currentGrade - Current grade key
 * @param {number} maxRecommendations - Maximum number of recommendations
 * @returns {Array} Array of recommendation objects
 */
export const generateRecommendations = (weakAreas, currentGrade, maxRecommendations = 5) => {
  const recommendations = [];
  const gradeMapping = categoryToSectionMap[currentGrade] || {};

  // Generate recommendations for top weak areas
  weakAreas.slice(0, maxRecommendations).forEach((area, index) => {
    const mapping = gradeMapping[area.category];

    if (mapping) {
      const recommendation = {
        id: `rec-${area.category}-${Date.now()}`,
        category: area.category,
        section: mapping.section,
        sectionName: mapping.name,
        sectionNameSi: mapping.nameSi,
        grade: currentGrade,
        priority: index + 1,
        currentScore: area.recentAvgScore,
        targetScore: 70,
        gap: 70 - area.recentAvgScore,
        reason: getRecommendationReason(area),
        reasonSi: getRecommendationReasonSi(area),
        actionType: getActionType(area),
      };
      recommendations.push(recommendation);
    }
  });

  // If no weak areas, suggest general practice
  if (recommendations.length === 0) {
    recommendations.push({
      id: `rec-general-${Date.now()}`,
      category: 'general',
      section: 'quiz',
      sectionName: 'General Practice',
      sectionNameSi: 'සාමාන්‍ය පුහුණුව',
      grade: currentGrade,
      priority: 1,
      reason: "You're doing great! Keep practicing to maintain your skills.",
      reasonSi: "ඔබ හොඳින් කරනවා! ඔබේ කුසලතා පවත්වා ගැනීමට දිගටම පුහුණු වන්න.",
      actionType: 'maintain',
    });
  }

  return recommendations;
};

/**
 * Get human-readable reason for recommendation
 */
const getRecommendationReason = (area) => {
  if (area.improvement < -10) {
    return `Your ${area.category} skills have dropped recently. Let's review the basics.`;
  } else if (area.recentAvgScore < 50) {
    return `You're struggling with ${area.category}. Focus on this area to improve.`;
  } else if (area.recentAvgScore < 70) {
    return `Your ${area.category} score is ${area.recentAvgScore}%. Practice more to reach 70%.`;
  }
  return `Keep practicing ${area.category} to solidify your understanding.`;
};

/**
 * Get Sinhala reason for recommendation
 */
const getRecommendationReasonSi = (area) => {
  if (area.improvement < -10) {
    return `ඔබේ ${area.category} කුසලතා මෑතදී පහත වැටී ඇත. මූලික කරුණු සමාලෝචනය කරමු.`;
  } else if (area.recentAvgScore < 50) {
    return `ඔබට ${area.category} අමාරුයි. වැඩිදියුණු වීමට මෙම ප්‍රදේශය කෙරෙහි අවධානය යොමු කරන්න.`;
  } else if (area.recentAvgScore < 70) {
    return `ඔබේ ${area.category} ලකුණු ${area.recentAvgScore}% කි. 70% ළඟා වීමට තවත් පුහුණු වන්න.`;
  }
  return `ඔබේ අවබෝධය තහවුරු කිරීමට ${area.category} පුහුණු කරගෙන යන්න.`;
};

/**
 * Determine what action type the recommendation should have
 */
const getActionType = (area) => {
  if (area.recentAvgScore < 40) return 'review'; // Need to review basics
  if (area.recentAvgScore < 60) return 'practice'; // Need more practice
  if (area.recentAvgScore < 70) return 'strengthen'; // Almost there, strengthen
  return 'maintain'; // Good, just maintain
};

/**
 * Generate quick review questions for a weak area
 * @param {string} category - The category to generate questions for
 * @param {string} grade - The grade level
 * @param {number} count - Number of questions to generate
 * @returns {Array} Array of question objects
 */
export const generateQuickReviewQuestions = (category, grade, count = 5) => {
  // This would ideally fetch from a question bank
  // For now, return placeholder structure
  return {
    category,
    grade,
    questions: [],
    message: `Quick review for ${category} - ${count} questions`,
  };
};

/**
 * Calculate overall learning health score
 * @param {Object} analytics - Analytics data
 * @returns {Object} Health score and status
 */
export const calculateLearningHealth = (analytics) => {
  if (!analytics || !analytics.quizHistory || analytics.quizHistory.length === 0) {
    return {
      score: 0,
      status: 'new',
      statusSi: 'අලුත්',
      message: 'Start taking quizzes to track your progress!',
      messageSi: 'ඔබේ ප්‍රගතිය නිරීක්ෂණය කිරීමට ප්‍රශ්නාවලි කිරීම ආරම්භ කරන්න!',
    };
  }

  const recentQuizzes = analytics.quizHistory.slice(-10);
  const avgScore = recentQuizzes.reduce((sum, q) => sum + q.score, 0) / recentQuizzes.length;

  let status, statusSi, message, messageSi;

  if (avgScore >= 80) {
    status = 'excellent';
    statusSi = 'විශිෂ්ට';
    message = 'Outstanding progress! You\'re mastering Sinhala!';
    messageSi = 'විශිෂ්ට ප්‍රගතියක්! ඔබ සිංහල ප්‍රගුණ කරගෙන යයි!';
  } else if (avgScore >= 70) {
    status = 'good';
    statusSi = 'හොඳ';
    message = 'Good job! Keep up the consistent practice.';
    messageSi = 'හොඳයි! අඛණ්ඩ පුහුණුව කරගෙන යන්න.';
  } else if (avgScore >= 50) {
    status = 'improving';
    statusSi = 'වැඩිදියුණු වෙමින්';
    message = 'You\'re making progress. Focus on weak areas.';
    messageSi = 'ඔබ ප්‍රගතියක් ලබමින් සිටී. දුර්වල ප්‍රදේශ කෙරෙහි අවධානය යොමු කරන්න.';
  } else {
    status = 'needs-attention';
    statusSi = 'අවධානය අවශ්‍යයි';
    message = 'Let\'s work on strengthening your basics.';
    messageSi = 'ඔබේ මූලික කරුණු ශක්තිමත් කිරීමට වැඩ කරමු.';
  }

  return {
    score: Math.round(avgScore),
    status,
    statusSi,
    message,
    messageSi,
    totalQuizzes: analytics.quizHistory.length,
    recentAverage: Math.round(avgScore),
  };
};

const recommendationEngine = {
  analyzeWeakAreas,
  generateRecommendations,
  generateQuickReviewQuestions,
  calculateLearningHealth,
  categoryToSectionMap,
};

export default recommendationEngine;
