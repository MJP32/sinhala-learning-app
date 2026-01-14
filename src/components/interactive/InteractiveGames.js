import React, { useState } from 'react';
import FlashcardDeck from './FlashcardDeck';
import DragDropMatch from './DragDropMatch';
import WordScramble from './WordScramble';
import SentenceBuilder from './SentenceBuilder';
import MemoryMatch from './MemoryMatch';
import SpeedQuiz from './SpeedQuiz';
import ListeningChallenge from './ListeningChallenge';
import FillInTheBlank from './FillInTheBlank';
import './Interactive.css';

const InteractiveGames = ({
  gradeKey,
  flashcardData,
  matchData,
  scrambleData,
  sentenceData,
  memoryData,
  speedQuizData,
  listeningData,
  fillBlankData
}) => {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'flashcards',
      name: 'Flashcards',
      nameSinhala: 'ෆ්ලෑෂ් කාඩ්',
      icon: '🃏',
      description: 'Review vocabulary with spaced repetition',
      descSinhala: 'වචන මාලාව සමාලෝචනය කරන්න',
      available: flashcardData && flashcardData.length > 0
    },
    {
      id: 'match',
      name: 'Word Match',
      nameSinhala: 'වචන ගැලපීම',
      icon: '🔗',
      description: 'Match Sinhala words with English',
      descSinhala: 'සිංහල වචන ඉංග්‍රීසි සමඟ ගලපන්න',
      available: matchData && matchData.length > 0
    },
    {
      id: 'scramble',
      name: 'Word Scramble',
      nameSinhala: 'වචන පැටලිලි',
      icon: '🔀',
      description: 'Unscramble letters to form words',
      descSinhala: 'අකුරු නිවැරදිව සකසන්න',
      available: scrambleData && scrambleData.length > 0
    },
    {
      id: 'sentence',
      name: 'Sentence Builder',
      nameSinhala: 'වාක්‍ය ගොඩනැගීම',
      icon: '📝',
      description: 'Arrange words to form sentences',
      descSinhala: 'වචන සකසා වාක්‍ය ගොඩනඟන්න',
      available: sentenceData && sentenceData.length > 0
    },
    {
      id: 'memory',
      name: 'Memory Match',
      nameSinhala: 'මතක ගැලපීම',
      icon: '🧠',
      description: 'Match pairs of Sinhala and English cards',
      descSinhala: 'සිංහල හා ඉංග්‍රීසි කාඩ්පත් යුගල ගලපන්න',
      available: memoryData && memoryData.length >= 4
    },
    {
      id: 'speed',
      name: 'Speed Quiz',
      nameSinhala: 'වේග ප්‍රශ්නාවලිය',
      icon: '⚡',
      description: '60-second rapid-fire vocabulary challenge',
      descSinhala: 'තත්පර 60 වේගවත් වචන අභියෝගය',
      available: speedQuizData && speedQuizData.length >= 5
    },
    {
      id: 'listening',
      name: 'Listening Challenge',
      nameSinhala: 'සවන්දීමේ අභියෝගය',
      icon: '👂',
      description: 'Listen and identify Sinhala words',
      descSinhala: 'සිංහල වචන අසා හඳුනාගන්න',
      available: listeningData && listeningData.length >= 3
    },
    {
      id: 'fillblank',
      name: 'Fill in the Blank',
      nameSinhala: 'හිස්තැන් පුරවන්න',
      icon: '✏️',
      description: 'Complete sentences with missing words',
      descSinhala: 'අතුරුදහන් වචන සමඟ වාක්‍ය සම්පූර්ණ කරන්න',
      available: fillBlankData && fillBlankData.length >= 3
    }
  ];

  const handleGameComplete = (gameId, results) => {
    console.log(`Game ${gameId} completed:`, results);
    // Could trigger achievements or save stats here
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'flashcards':
        return (
          <FlashcardDeck
            cards={flashcardData}
            title="Vocabulary Review"
            titleSinhala="වචන මාලා සමාලෝචනය"
            gradeKey={gradeKey}
            onComplete={(results) => handleGameComplete('flashcards', results)}
          />
        );
      case 'match':
        return (
          <DragDropMatch
            pairs={matchData}
            title="Word Matching"
            titleSinhala="වචන ගැලපීම"
            gradeKey={gradeKey}
            onComplete={(results) => handleGameComplete('match', results)}
          />
        );
      case 'scramble':
        return (
          <WordScramble
            words={scrambleData}
            title="Word Scramble"
            titleSinhala="වචන පැටලිලි"
            gradeKey={gradeKey}
            onComplete={(results) => handleGameComplete('scramble', results)}
          />
        );
      case 'sentence':
        return (
          <SentenceBuilder
            sentences={sentenceData}
            title="Sentence Builder"
            titleSinhala="වාක්‍ය ගොඩනැගීම"
            gradeKey={gradeKey}
            onComplete={(results) => handleGameComplete('sentence', results)}
          />
        );
      case 'memory':
        return (
          <MemoryMatch
            pairs={memoryData}
            title="Memory Match"
            titleSinhala="මතක ගැලපීම"
            gradeKey={gradeKey}
            difficulty="easy"
            onComplete={(results) => handleGameComplete('memory', results)}
          />
        );
      case 'speed':
        return (
          <SpeedQuiz
            questions={speedQuizData}
            title="Speed Quiz"
            titleSinhala="වේග ප්‍රශ්නාවලිය"
            gradeKey={gradeKey}
            timeLimit={60}
            onComplete={(results) => handleGameComplete('speed', results)}
          />
        );
      case 'listening':
        return (
          <ListeningChallenge
            items={listeningData}
            title="Listening Challenge"
            titleSinhala="සවන්දීමේ අභියෝගය"
            gradeKey={gradeKey}
            onComplete={(results) => handleGameComplete('listening', results)}
          />
        );
      case 'fillblank':
        return (
          <FillInTheBlank
            sentences={fillBlankData}
            title="Fill in the Blank"
            titleSinhala="හිස්තැන් පුරවන්න"
            gradeKey={gradeKey}
            onComplete={(results) => handleGameComplete('fillblank', results)}
          />
        );
      default:
        return null;
    }
  };

  if (selectedGame) {
    return (
      <div className="interactive-game-container">
        <button className="back-to-games" onClick={() => setSelectedGame(null)}>
          ← Back to Games / ක්‍රීඩා වෙත ආපසු
        </button>
        {renderGame()}
      </div>
    );
  }

  return (
    <div className="interactive-games">
      <div className="games-header">
        <h3>Interactive Games</h3>
        <span className="games-header-si">අන්තර්ක්‍රියාකාරී ක්‍රීඩා</span>
        <p className="games-subtitle">Practice what you've learned through fun games!</p>
        <p className="games-subtitle-si">විනෝදජනක ක්‍රීඩා හරහා ඔබ ඉගෙන ගත් දේ පුහුණු කරන්න!</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <button
            key={game.id}
            className={`game-card ${!game.available ? 'disabled' : ''}`}
            onClick={() => game.available && setSelectedGame(game.id)}
            disabled={!game.available}
          >
            <span className="game-icon">{game.icon}</span>
            <div className="game-info">
              <span className="game-name">{game.name}</span>
              <span className="game-name-si">{game.nameSinhala}</span>
              <span className="game-desc">{game.description}</span>
              <span className="game-desc-si">{game.descSinhala}</span>
            </div>
            {!game.available && (
              <span className="game-locked">Coming soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveGames;
