// Sound service for Sinhala learning app
class SoundService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.currentVoice = null;
    this.volume = 0.8;
    this.rate = 0.8;
    this.pitch = 1.0;
    
    // Initialize voices when they're loaded
    this.loadVoices();
    
    // Handle voice loading for different browsers
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    
    // Try to find a suitable voice for Sinhala or English
    this.currentVoice = this.findBestVoice();
  }

  findBestVoice() {
    // Priority order for voice selection
    const voicePreferences = [
      'si-LK', // Sinhala (Sri Lanka)
      'si',    // Sinhala
      'en-US', // English (US)
      'en-GB', // English (UK)
      'en'     // English (generic)
    ];

    for (const preference of voicePreferences) {
      const voice = this.voices.find(v => 
        v.lang.toLowerCase().startsWith(preference.toLowerCase())
      );
      if (voice) return voice;
    }

    // Fallback to first available voice
    return this.voices[0] || null;
  }

  speak(text, options = {}) {
    // Stop any currently playing speech
    this.synth.cancel();

    if (!text || text.trim() === '') {
      console.warn('No text provided to speak');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    utterance.voice = options.voice || this.currentVoice;
    utterance.volume = options.volume !== undefined ? options.volume : this.volume;
    utterance.rate = options.rate !== undefined ? options.rate : this.rate;
    utterance.pitch = options.pitch !== undefined ? options.pitch : this.pitch;

    // Add event listeners
    utterance.onstart = () => {
      console.log('Speech started:', text);
    };

    utterance.onend = () => {
      console.log('Speech ended:', text);
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event.error);
    };

    // Speak the text
    this.synth.speak(utterance);
  }

  speakSinhalaLetter(sound) {
    // For Sinhala letters, we'll use the romanized sound
    // and speak it slowly for better pronunciation learning
    this.speak(sound, {
      rate: 0.6, // Slower for letter pronunciation
      pitch: 1.1  // Slightly higher pitch for letters
    });
  }

  speakSinhalaWord(sinhalaText, pronunciation) {
    // First speak the Sinhala word (if browser supports it)
    // Then speak the pronunciation guide
    
    if (this.hasSinhalaVoice()) {
      // Speak Sinhala text first
      this.speak(sinhalaText, {
        rate: 0.7,
        pitch: 1.0
      });
      
      // Wait a bit, then speak pronunciation
      setTimeout(() => {
        this.speak(pronunciation, {
          rate: 0.6,
          pitch: 0.9
        });
      }, 1500);
    } else {
      // Just speak the pronunciation guide
      this.speak(pronunciation, {
        rate: 0.6,
        pitch: 1.0
      });
    }
  }

  speakEnglishWord(englishText) {
    this.speak(englishText, {
      rate: 0.8,
      pitch: 1.0
    });
  }

  hasSinhalaVoice() {
    return this.voices.some(voice => 
      voice.lang.toLowerCase().startsWith('si')
    );
  }

  getAvailableVoices() {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang,
      localService: voice.localService,
      default: voice.default
    }));
  }

  setVoice(voiceName) {
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;
      return true;
    }
    return false;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setRate(rate) {
    this.rate = Math.max(0.1, Math.min(2, rate));
  }

  setPitch(pitch) {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }

  stop() {
    this.synth.cancel();
  }

  // Test if speech synthesis is supported
  isSupported() {
    return 'speechSynthesis' in window;
  }

  // Get current settings
  getSettings() {
    return {
      volume: this.volume,
      rate: this.rate,
      pitch: this.pitch,
      currentVoice: this.currentVoice ? this.currentVoice.name : 'None',
      voicesAvailable: this.voices.length,
      hasSinhalaVoice: this.hasSinhalaVoice()
    };
  }
}

// Create and export a singleton instance
const soundService = new SoundService();

export default soundService;
