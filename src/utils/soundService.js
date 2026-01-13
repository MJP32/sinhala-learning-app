// Sound service for Sinhala learning app using pre-recorded audio files
class SoundService {
  constructor() {
    this.audio = null;
    this.volume = 0.8;
    this.isPlaying = false;
    this.audioCache = {};
  }

  // Get audio file path for a letter
  getLetterAudioPath(sinhalaLetter) {
    // Use Unicode code point as filename to avoid file system issues
    const codePoint = sinhalaLetter.codePointAt(0).toString(16);
    return `/audio/letters/${codePoint}.mp3`;
  }

  // Get audio file path for a word
  getWordAudioPath(sinhalaWord) {
    // Use base64 or hash of the word as filename
    const encoded = btoa(unescape(encodeURIComponent(sinhalaWord)));
    return `/audio/words/${encoded}.mp3`;
  }

  // Check if audio file exists
  async audioExists(path) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Play audio from file or use TTS fallback
  async speak(audioPath, text, lang = 'si') {
    this.stop();

    if (!text || text.trim() === '') {
      console.warn('No text provided to speak');
      return;
    }

    // Try to play pre-recorded audio
    const hasAudio = await this.audioExists(audioPath);

    if (hasAudio) {
      return this.playAudioFile(audioPath);
    } else {
      // Fallback to Web Speech API
      return this.speakWithTTS(text, lang);
    }
  }

  playAudioFile(path) {
    return new Promise((resolve, reject) => {
      this.audio = new Audio(path);
      this.audio.volume = this.volume;

      this.audio.onplay = () => {
        this.isPlaying = true;
      };

      this.audio.onended = () => {
        this.isPlaying = false;
        resolve();
      };

      this.audio.onerror = (error) => {
        this.isPlaying = false;
        console.error('Audio file error:', error);
        resolve(); // Don't reject to prevent UI errors
      };

      this.audio.play().catch((err) => {
        console.error('Error playing audio:', err);
        resolve();
      });
    });
  }

  speakWithTTS(text, lang = 'si') {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        resolve();
        return;
      }

      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = lang === 'si' ? 'si-LK' : 'en-US';
      utterance.volume = this.volume;
      utterance.rate = 0.7;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        this.isPlaying = false;
        resolve();
      };

      utterance.onerror = () => {
        this.isPlaying = false;
        resolve();
      };

      this.isPlaying = true;
      synth.speak(utterance);
    });
  }

  async speakSinhalaLetter(sinhalaLetter) {
    const audioPath = this.getLetterAudioPath(sinhalaLetter);
    return this.speak(audioPath, sinhalaLetter, 'si');
  }

  async speakSinhalaWord(sinhalaText, pronunciation) {
    const audioPath = this.getWordAudioPath(sinhalaText);
    return this.speak(audioPath, sinhalaText, 'si');
  }

  async speakEnglishWord(englishText) {
    return this.speakWithTTS(englishText, 'en');
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
  }

  isSupported() {
    return typeof Audio !== 'undefined';
  }

  getSettings() {
    return {
      volume: this.volume,
      isPlaying: this.isPlaying
    };
  }
}

// Create and export a singleton instance
const soundService = new SoundService();

export default soundService;
