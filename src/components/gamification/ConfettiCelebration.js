import confetti from 'canvas-confetti';

// Pre-configured celebration effects

export const celebrateQuizComplete = (score) => {
  if (score === 100) {
    // Perfect score - big celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#ff6b35', '#4CAF50']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd700', '#ff6b35', '#4CAF50']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } else if (score >= 80) {
    // Good score
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4CAF50', '#8BC34A', '#CDDC39']
    });
  } else if (score >= 60) {
    // Passing score
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#2196F3', '#03A9F4', '#00BCD4']
    });
  }
};

export const celebrateSectionComplete = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.65 },
    colors: ['#8d153a', '#ffd700', '#4CAF50']
  });
};

export const celebrateStreak = (days) => {
  const intensity = Math.min(days * 10, 150);

  confetti({
    particleCount: intensity,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#ff4500', '#ff6b35', '#ff8c00', '#ffa500', '#ffcc00']
  });
};

export const celebrateGradeComplete = () => {
  // School-themed colors for grade completion
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = ['#8d153a', '#ffd700', '#4CAF50', '#2196F3', '#9C27B0'];

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
      colors
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
      colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

export const celebrateFlashcardMastery = () => {
  confetti({
    particleCount: 60,
    spread: 45,
    origin: { y: 0.6 },
    colors: ['#9C27B0', '#E91E63', '#FF5722']
  });
};

export const celebrateGameWin = () => {
  // Fun burst for game completion
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55
  });
  fire(0.2, {
    spread: 60
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
};

// Export all celebrations as default
const celebrations = {
  quizComplete: celebrateQuizComplete,
  sectionComplete: celebrateSectionComplete,
  streak: celebrateStreak,
  gradeComplete: celebrateGradeComplete,
  flashcardMastery: celebrateFlashcardMastery,
  gameWin: celebrateGameWin
};

export default celebrations;
