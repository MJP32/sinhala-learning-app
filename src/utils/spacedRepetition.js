// SM-2 Spaced Repetition Algorithm
// Based on the SuperMemo 2 algorithm for optimizing learning intervals

/**
 * Calculate the next review interval using the SM-2 algorithm
 * @param {Object} card - The flashcard object with learning data
 * @param {number} quality - Quality of response (0-5)
 *   0 - Complete failure, no memory
 *   1 - Incorrect, but upon seeing correct answer, remembered
 *   2 - Incorrect, but correct answer seemed easy to recall
 *   3 - Correct with serious difficulty
 *   4 - Correct after hesitation
 *   5 - Perfect response
 * @returns {Object} Updated card data with new interval and ease factor
 */
export const calculateNextReview = (card, quality) => {
  let { easeFactor = 2.5, interval = 0, repetitions = 0 } = card;

  // Quality must be >= 3 for successful recall
  if (quality >= 3) {
    // Successful recall
    if (repetitions === 0) {
      interval = 1; // First review: 1 day
    } else if (repetitions === 1) {
      interval = 6; // Second review: 6 days
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Failed recall - reset to beginning
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ease factor should not go below 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    nextReview: nextReview.toISOString(),
    lastReview: new Date().toISOString()
  };
};

/**
 * Check if a card is due for review
 * @param {Object} card - The flashcard object
 * @returns {boolean} True if the card should be reviewed
 */
export const isDue = (card) => {
  if (!card.nextReview) return true;
  const now = new Date();
  const reviewDate = new Date(card.nextReview);
  return now >= reviewDate;
};

/**
 * Get all cards that are due for review
 * @param {Object} flashcards - Object containing all flashcard data
 * @returns {Array} Array of card IDs that are due
 */
export const getDueCards = (flashcards) => {
  return Object.entries(flashcards)
    .filter(([_, card]) => isDue(card))
    .map(([id, card]) => ({ id, ...card }))
    .sort((a, b) => {
      // Sort by interval (shorter intervals first for harder cards)
      return (a.interval || 0) - (b.interval || 0);
    });
};

/**
 * Get cards that are new (never reviewed)
 * @param {Array} allCardIds - All possible card IDs
 * @param {Object} flashcards - Object containing reviewed card data
 * @returns {Array} Array of new card IDs
 */
export const getNewCards = (allCardIds, flashcards) => {
  return allCardIds.filter(id => !flashcards[id]);
};

/**
 * Calculate quality score based on user response
 * @param {boolean} correct - Whether the answer was correct
 * @param {number} responseTime - Time taken to respond in milliseconds
 * @param {boolean} usedHint - Whether a hint was used
 * @returns {number} Quality score (0-5)
 */
export const calculateQuality = (correct, responseTime, usedHint = false) => {
  if (!correct) {
    return usedHint ? 1 : 0;
  }

  // Correct answer
  if (usedHint) {
    return 3; // Correct but with help
  }

  // Based on response time
  if (responseTime < 2000) {
    return 5; // Perfect - very fast
  } else if (responseTime < 5000) {
    return 4; // Good - quick response
  } else {
    return 3; // Correct but slow
  }
};

/**
 * Get learning statistics for flashcards
 * @param {Object} flashcards - Object containing all flashcard data
 * @returns {Object} Statistics about the flashcard deck
 */
export const getFlashcardStats = (flashcards) => {
  const cards = Object.values(flashcards);
  const now = new Date();

  const stats = {
    total: cards.length,
    mastered: 0, // Cards with interval >= 21 days
    learning: 0, // Cards with 0 < interval < 21
    new: 0, // Cards never reviewed
    dueToday: 0,
    averageEaseFactor: 0
  };

  let totalEaseFactor = 0;

  cards.forEach(card => {
    if (!card.lastReview) {
      stats.new++;
    } else if (card.interval >= 21) {
      stats.mastered++;
    } else {
      stats.learning++;
    }

    if (isDue(card)) {
      stats.dueToday++;
    }

    totalEaseFactor += card.easeFactor || 2.5;
  });

  stats.averageEaseFactor = cards.length > 0
    ? Math.round((totalEaseFactor / cards.length) * 100) / 100
    : 2.5;

  return stats;
};

/**
 * Get recommended daily new cards limit
 * @param {Object} flashcards - Object containing all flashcard data
 * @returns {number} Recommended number of new cards to learn today
 */
export const getRecommendedNewCards = (flashcards) => {
  const dueCount = getDueCards(flashcards).length;

  // If many cards are due, limit new cards
  if (dueCount > 50) return 5;
  if (dueCount > 30) return 10;
  if (dueCount > 15) return 15;
  return 20; // Default max new cards per day
};

/**
 * Format interval for display
 * @param {number} interval - Interval in days
 * @returns {string} Human-readable interval
 */
export const formatInterval = (interval) => {
  if (interval < 1) return 'Today';
  if (interval === 1) return '1 day';
  if (interval < 7) return `${interval} days`;
  if (interval < 30) return `${Math.round(interval / 7)} weeks`;
  if (interval < 365) return `${Math.round(interval / 30)} months`;
  return `${Math.round(interval / 365)} years`;
};

/**
 * Get difficulty label based on ease factor
 * @param {number} easeFactor - The ease factor of the card
 * @returns {Object} Difficulty label in English and Sinhala
 */
export const getDifficultyLabel = (easeFactor) => {
  if (easeFactor >= 2.5) {
    return { en: 'Easy', si: 'පහසු', color: '#4CAF50' };
  } else if (easeFactor >= 2.0) {
    return { en: 'Medium', si: 'මධ්‍යම', color: '#FF9800' };
  } else {
    return { en: 'Hard', si: 'අමාරු', color: '#f44336' };
  }
};
