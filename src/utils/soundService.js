// Simple hash function that works identically in Node.js and browser
// eslint-disable-next-line no-unused-vars
function cyrb53(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

// Sound service for Sinhala learning app using pre-recorded audio files
class SoundService {
  constructor() {
    this.audio = null;
    this.volume = 0.8;
    this.isPlaying = false;
  }

  // Get audio file path for a letter
  getLetterAudioPath(sinhalaLetter) {
    // Use Unicode code point as filename to avoid file system issues
    const codePoint = sinhalaLetter.codePointAt(0).toString(16);
    // Add cache buster to force fresh load
    return `${process.env.PUBLIC_URL}/audio/letters/${codePoint}.mp3?v=8`;
  }

  // Get audio file path for a word
  getWordAudioPath(sinhalaWord) {
    // Use base64 of the word as filename (matching the generate-audio.js script)
    const encoded = btoa(unescape(encodeURIComponent(sinhalaWord)))
      .replace(/\//g, '_')
      .replace(/\+/g, '-');
    // Use hash for long filenames to match generate-audio.js
    let filename;
    if (encoded.length > 100) {
      filename = 'h_' + cyrb53(sinhalaWord);
    } else {
      filename = encoded;
    }
    // Add cache buster to force fresh load
    return `${process.env.PUBLIC_URL}/audio/words/${filename}.mp3?v=4`;
  }

  // Try to play audio file, returns true if successful
  playAudioFile(path) {
    return new Promise((resolve) => {
      this.stop();

      this.audio = new Audio(path);
      this.audio.volume = this.volume;

      let resolved = false;
      const resolveOnce = (value) => {
        if (!resolved) {
          resolved = true;
          resolve(value);
        }
      };

      this.audio.oncanplay = () => {
        // Check if audio was stopped before it could play
        if (!this.audio) {
          resolveOnce(false);
          return;
        }
        this.isPlaying = true;
        this.audio.play()
          .then(() => {
            console.log('Audio playing:', path);
          })
          .catch((err) => {
            console.error('Error playing audio:', err);
            this.isPlaying = false;
            resolveOnce(false);
          });
      };

      this.audio.onended = () => {
        console.log('Audio ended:', path);
        this.isPlaying = false;
        resolveOnce(true);
      };

      this.audio.onabort = () => {
        this.isPlaying = false;
        resolveOnce(false);
      };

      this.audio.onerror = (e) => {
        console.error('Audio load error:', path, e);
        this.isPlaying = false;
        resolveOnce(false);
      };

      // Start loading
      this.audio.load();

      // Timeout fallback in case audio hangs
      setTimeout(() => {
        if (!resolved) {
          console.log('Audio timeout:', path);
          resolveOnce(false);
        }
      }, 5000);
    });
  }

  // Fallback TTS - uses browser speech synthesis
  speakWithFallbackTTS(text, lang = 'si') {
    // For Sinhala, browser TTS usually doesn't work, so just log and resolve
    if (lang === 'si') {
      console.log('No audio available for:', text);
      console.log('Run: node scripts/generate-audio.js YOUR_API_KEY');
      return Promise.resolve(false);
    }
    // For English, try browser TTS
    return this.speakWithBrowserTTS(text, lang);
  }

  speakWithBrowserTTS(text, lang = 'si') {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        resolve(false);
        return;
      }

      const synth = window.speechSynthesis;

      // Cancel any ongoing speech
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'si' ? 'si-LK' : 'en-US';
      utterance.volume = this.volume;
      utterance.rate = 0.7;
      utterance.pitch = 1.0;

      // Try to find a voice for the language
      const voices = synth.getVoices();
      if (lang === 'si') {
        const sinhalaVoice = voices.find(v =>
          v.lang.startsWith('si') || v.name.toLowerCase().includes('sinhala')
        );
        if (sinhalaVoice) {
          utterance.voice = sinhalaVoice;
        }
      } else {
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      utterance.onend = () => {
        this.isPlaying = false;
        resolve(true);
      };

      utterance.onerror = () => {
        this.isPlaying = false;
        resolve(false);
      };

      this.isPlaying = true;
      synth.speak(utterance);
    });
  }

  async speakSinhalaLetter(sinhalaLetter) {
    if (!sinhalaLetter || sinhalaLetter.trim() === '') {
      console.warn('No letter provided');
      return;
    }

    const audioPath = this.getLetterAudioPath(sinhalaLetter);
    console.log('Trying to play letter audio:', audioPath);

    // Try pre-recorded audio first
    const played = await this.playAudioFile(audioPath);

    if (!played) {
      console.log('Pre-recorded audio failed for letter:', sinhalaLetter);
      await this.speakWithFallbackTTS(sinhalaLetter, 'si');
    }
  }

  // Split long text into sentences for chunked playback
  splitIntoSentences(text) {
    // Split on Sinhala sentence-ending punctuation and common delimiters
    const sentences = text.split(/(?<=[.!?။])\s*/).filter(s => s.trim().length > 0);
    return sentences;
  }

  async speakSinhalaWord(sinhalaText, pronunciation) {
    if (!sinhalaText || sinhalaText.trim() === '') {
      console.warn('No text provided');
      return;
    }

    // For short text, try direct playback
    if (sinhalaText.length <= 150) {
      const audioPath = this.getWordAudioPath(sinhalaText);
      console.log('Trying to play word audio:', audioPath);

      const played = await this.playAudioFile(audioPath);

      if (!played) {
        console.log('Pre-recorded audio failed, trying TTS');
        await this.speakWithFallbackTTS(sinhalaText, 'si');
      }
      return;
    }

    // For long text, first try the full text audio file
    const fullAudioPath = this.getWordAudioPath(sinhalaText);
    console.log('Trying full audio for long text:', fullAudioPath);

    const playedFull = await this.playAudioFile(fullAudioPath);
    if (playedFull) {
      return;
    }

    // If no full audio, split into sentences and play each
    console.log('Full audio not found, splitting into sentences');
    const sentences = this.splitIntoSentences(sinhalaText);

    for (const sentence of sentences) {
      if (sentence.trim().length === 0) continue;

      const sentenceAudioPath = this.getWordAudioPath(sentence.trim());
      console.log('Playing sentence:', sentence.substring(0, 30) + '...');

      const played = await this.playAudioFile(sentenceAudioPath);

      if (!played) {
        // If sentence audio not found, try TTS for that sentence
        console.log('Sentence audio not found, using TTS');
        await this.speakWithFallbackTTS(sentence, 'si');
      }

      // Small pause between sentences
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  async speakEnglishWord(englishText) {
    if (!englishText || englishText.trim() === '') {
      console.warn('No text provided');
      return;
    }
    return this.speakWithFallbackTTS(englishText, 'en');
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
      this.audio = null;
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
