import React, { useState, useEffect, useCallback, useRef } from 'react';
import soundService from '../../utils/soundService';

const PronunciationPractice = ({ words, title = "Pronunciation Practice" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const currentWord = words[currentWordIndex];
  const checkPronunciationRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'si-LK'; // Sinhala language

    recognitionInstance.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      if (checkPronunciationRef.current) {
        checkPronunciationRef.current(result);
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        setFeedback({ type: 'info', message: "I didn't hear anything. Try again! / කිසිවක් අසා නැත. නැවත උත්සාහ කරන්න!" });
      } else if (event.error === 'audio-capture') {
        setFeedback({ type: 'error', message: "No microphone found. / මයික්‍රොෆෝනය හමු නොවීය." });
      } else if (event.error === 'language-not-supported') {
        setFeedback({ type: 'error', message: "Sinhala not supported on this browser. Try Chrome. / මෙම බ්‍රවුසරයේ සිංහල සහාය නොදක්වයි." });
      } else {
        setFeedback({ type: 'error', message: "Something went wrong. Try again. / යමක් වැරදී ඇත. නැවත උත්සාහ කරන්න." });
      }
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, []);

  const checkPronunciation = useCallback((spoken) => {
    // Levenshtein distance for fuzzy matching
    const levenshteinDistance = (str1, str2) => {
      const m = str1.length;
      const n = str2.length;
      const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (str1[i - 1] === str2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1];
          } else {
            dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
          }
        }
      }
      return dp[m][n];
    };

    // Calculate string similarity (0-1)
    const calculateSimilarity = (str1, str2) => {
      if (str1.length === 0 && str2.length === 0) return 1;
      if (str1.length === 0 || str2.length === 0) return 0;

      const longer = str1.length > str2.length ? str1 : str2;
      const shorter = str1.length > str2.length ? str2 : str1;

      const longerLength = longer.length;
      const distance = levenshteinDistance(longer, shorter);

      return (longerLength - distance) / longerLength;
    };

    setAttempts(prev => prev + 1);

    // Get the expected Sinhala word
    const expectedSinhala = currentWord.sinhala || '';

    // Clean up the spoken text (remove extra spaces)
    const spokenClean = spoken.trim();

    // Calculate similarity using character matching for Sinhala
    let matchScore = 0;

    // Exact match
    if (spokenClean === expectedSinhala) {
      matchScore = 100;
    }
    // Check if spoken contains the expected word or vice versa
    else if (spokenClean.includes(expectedSinhala) || expectedSinhala.includes(spokenClean)) {
      matchScore = 85;
    }
    // Character-level similarity for partial matches
    else {
      const similarity = calculateSimilarity(spokenClean, expectedSinhala);
      matchScore = similarity * 100;
    }

    if (matchScore >= 70) {
      setFeedback({
        type: 'success',
        message: matchScore >= 90 ? "Perfect! / ඉතා හොඳයි!" : "Good job! / හොඳයි!"
      });
      setScore(prev => prev + 1);
    } else if (matchScore >= 40) {
      setFeedback({
        type: 'partial',
        message: "Almost there! Try again. / ආසන්නයි! නැවත උත්සාහ කරන්න."
      });
    } else {
      setFeedback({
        type: 'retry',
        message: `Try again / නැවත කියන්න: "${expectedSinhala}"`
      });
    }
  }, [currentWord]);

  // Keep the ref updated with the latest checkPronunciation function
  useEffect(() => {
    checkPronunciationRef.current = checkPronunciation;
  }, [checkPronunciation]);

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript('');
      setFeedback(null);
      setIsListening(true);
      try {
        recognition.start();
      } catch (e) {
        console.error('Recognition start error:', e);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
    setTranscript('');
    setFeedback(null);
    setShowHint(false);
  };

  const previousWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + words.length) % words.length);
    setTranscript('');
    setFeedback(null);
    setShowHint(false);
  };

  const speakWord = () => {
    // Use soundService which prioritizes pre-recorded audio files
    soundService.speakSinhalaWord(currentWord.sinhala, currentWord.pronunciation);
  };

  const resetPractice = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setAttempts(0);
    setTranscript('');
    setFeedback(null);
    setShowHint(false);
  };

  if (!isSupported) {
    return (
      <div className="pronunciation-practice">
        <div className="practice-error">
          <h3>Speech Recognition Not Available</h3>
          <p>Your browser doesn't support speech recognition.</p>
          <p>Please try using <strong>Google Chrome</strong> for Sinhala speech recognition.</p>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="pronunciation-practice">
      <h3>{title}</h3>

      <div className="practice-stats">
        <span className="stat">Score / ලකුණු: {score}/{attempts}</span>
        <span className="stat">Word / වචනය: {currentWordIndex + 1}/{words.length}</span>
      </div>

      <div className="practice-card">
        <div className="word-display">
          <div className="sinhala-word">{currentWord.sinhala}</div>
          <div className="english-word">{currentWord.english}</div>
          <button className="hint-btn" onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide / සඟවන්න' : 'Show Pronunciation / උච්චාරණය බලන්න'}
          </button>
          {showHint && (
            <div className="pronunciation-hint">
              Pronunciation / උච්චාරණය: <strong>{currentWord.pronunciation}</strong>
            </div>
          )}
        </div>

        <div className="practice-controls">
          <button
            className="listen-example-btn"
            onClick={speakWord}
            title="Listen to the word"
          >
            🔊 Listen / අහන්න
          </button>

          <button
            className={`mic-btn ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? '🛑 Stop / නවතන්න' : '🎤 Speak / කියන්න'}
          </button>
        </div>

        {isListening && (
          <div className="listening-indicator">
            <div className="pulse"></div>
            <span>Listening... Speak now! / සවන් දෙමින්... දැන් කියන්න!</span>
          </div>
        )}

        {transcript && (
          <div className="transcript">
            <span>You said / ඔබ කීවේ: </span>
            <strong>{transcript}</strong>
          </div>
        )}

        {feedback && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.type === 'success' && <span className="icon">✓</span>}
            {feedback.type === 'partial' && <span className="icon">★</span>}
            {feedback.type === 'retry' && <span className="icon">↻</span>}
            {feedback.type === 'error' && <span className="icon">⚠</span>}
            {feedback.type === 'info' && <span className="icon">ℹ</span>}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="navigation-controls">
          <button className="nav-btn-practice" onClick={previousWord}>
            ← Previous / පෙර
          </button>
          <button className="nav-btn-practice" onClick={nextWord}>
            Next / ඊළඟ →
          </button>
        </div>
      </div>

      <button className="reset-btn-practice" onClick={resetPractice}>
        Reset / නැවත පටන් ගන්න
      </button>

      <div className="practice-tips">
        <h4>ඉඟි / Tips:</h4>
        <ul>
          <li>සිංහලෙන් පැහැදිලිව කියන්න - Speak the Sinhala word clearly</li>
          <li>"🎤 කියන්න" බොත්තම ඔබා සිංහල වචනය කියන්න</li>
          <li>Click the microphone button and say the Sinhala word shown</li>
          <li>Use Chrome browser for best Sinhala speech recognition</li>
          <li>Make sure your microphone is enabled</li>
        </ul>
      </div>

      <style>{styles}</style>
    </div>
  );
};

const styles = `
  .pronunciation-practice {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    margin: 0 auto;
  }

  .pronunciation-practice h3 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .practice-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 20px;
  }

  .stat {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .practice-card {
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
    border-radius: 15px;
    padding: 30px;
    text-align: center;
  }

  .word-display {
    margin-bottom: 25px;
  }

  .sinhala-word {
    font-size: 4rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .english-word {
    font-size: 1.3rem;
    color: #555;
    margin-bottom: 15px;
    font-style: italic;
  }

  .hint-btn {
    background: rgba(255, 255, 255, 0.7);
    border: none;
    padding: 8px 16px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #666;
    transition: all 0.3s ease;
  }

  .hint-btn:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  .pronunciation-hint {
    margin-top: 10px;
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    font-size: 1.1rem;
    color: #444;
  }

  .practice-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }

  .listen-example-btn {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .listen-example-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(79, 172, 254, 0.4);
  }

  .mic-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mic-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  .mic-btn.listening {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    animation: pulse-btn 1.5s infinite;
  }

  @keyframes pulse-btn {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .listening-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 15px 0;
    color: #e74c3c;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .pulse {
    width: 15px;
    height: 15px;
    background: #e74c3c;
    border-radius: 50%;
    animation: pulse-dot 1s infinite;
  }

  @keyframes pulse-dot {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }

  .transcript {
    background: rgba(255, 255, 255, 0.9);
    padding: 15px 20px;
    border-radius: 10px;
    margin: 15px 0;
    font-size: 1.2rem;
  }

  .transcript strong {
    font-size: 1.4rem;
    color: #333;
  }

  .feedback {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 20px;
    border-radius: 10px;
    margin: 15px 0;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .feedback .icon {
    font-size: 1.5rem;
  }

  .feedback.success {
    background: #d4edda;
    color: #155724;
  }

  .feedback.partial {
    background: #fff3cd;
    color: #856404;
  }

  .feedback.retry {
    background: #f8d7da;
    color: #721c24;
  }

  .feedback.error {
    background: #f8d7da;
    color: #721c24;
  }

  .feedback.info {
    background: #d1ecf1;
    color: #0c5460;
  }

  .navigation-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }

  .nav-btn-practice {
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #ddd;
    padding: 12px 25px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    color: #555;
    transition: all 0.3s ease;
  }

  .nav-btn-practice:hover {
    background: white;
    border-color: #667eea;
    color: #667eea;
  }

  .reset-btn-practice {
    display: block;
    margin: 20px auto 0;
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .reset-btn-practice:hover {
    background: #ee5a5a;
    transform: translateY(-2px);
  }

  .practice-tips {
    margin-top: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
  }

  .practice-tips h4 {
    color: #444;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .practice-tips ul {
    margin: 0;
    padding-left: 20px;
    color: #666;
  }

  .practice-tips li {
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .practice-error {
    text-align: center;
    padding: 30px;
    background: #f8d7da;
    border-radius: 15px;
    color: #721c24;
  }

  .practice-error h3 {
    color: #721c24;
  }

  @media (max-width: 480px) {
    .sinhala-word {
      font-size: 3rem;
    }

    .english-word {
      font-size: 1.1rem;
    }

    .practice-controls {
      flex-direction: column;
      gap: 10px;
    }

    .mic-btn, .listen-example-btn {
      width: 100%;
    }

    .practice-stats {
      gap: 15px;
    }

    .stat {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
  }
`;

export default PronunciationPractice;
