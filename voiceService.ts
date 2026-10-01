import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, DICTIONARIES } from './languages';

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Global active audio to allow stopping
let activeAudioElement: HTMLAudioElement | null = null;

export const VoiceService = {
  // Cancel any currently playing speech or audio
  stopAllSpeech(): void {
    if (typeof window !== 'undefined') {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
    if (activeAudioElement) {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement = null;
    }
  },

  // Speak text in the given language
  async speak(text: string, languageCode: LanguageCode, options: SpeakOptions = {}): Promise<void> {
    this.stopAllSpeech();

    const langConfig = SUPPORTED_LANGUAGES[languageCode];
    const locale = langConfig?.speechSynthesisLocale || 'en-IN';

    // Try server-side TTS first if online, else client speechSynthesis
    let serverTtsSucceeded = false;
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: languageCode }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.audioBase64) {
          serverTtsSucceeded = true;
          const audio = new Audio(`data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`);
          activeAudioElement = audio;

          audio.onplay = () => {
            options.onStart?.();
          };
          audio.onended = () => {
            activeAudioElement = null;
            options.onEnd?.();
          };
          audio.onerror = (e) => {
            activeAudioElement = null;
            // Fallback to client synthesis if audio fails
            this.speakWithBrowserSynthesis(text, locale, options);
          };

          await audio.play();
          return;
        }
      }
    } catch (e) {
      // Continue to browser fallback
    }

    if (!serverTtsSucceeded) {
      this.speakWithBrowserSynthesis(text, locale, options);
    }
  },

  speakWithBrowserSynthesis(text: string, locale: string, options: SpeakOptions): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      options.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.rate = options.rate || 0.95; // Slightly slower, calm pace for elderly users
    utterance.pitch = options.pitch || 1.0;

    // Pick best native voice matching the language if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === locale.toLowerCase() || v.lang.startsWith(locale.split('-')[0])
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis error or interrupted:', err);
      options.onError?.(err);
      options.onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  },

  // Create Speech Recognition instance configured with exact language locale
  createRecognition(
    languageCode: LanguageCode,
    callbacks: {
      onResult: (transcript: string) => void;
      onError: (error: any) => void;
      onEnd: () => void;
      onStart?: () => void;
    }
  ): any | null {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition is not supported in this browser.');
      return null;
    }

    const langConfig = SUPPORTED_LANGUAGES[languageCode];
    const recognition = new SpeechRecognition();
    recognition.lang = langConfig?.speechRecognitionLocale || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      callbacks.onStart?.();
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      callbacks.onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      callbacks.onError(event);
    };

    recognition.onend = () => {
      callbacks.onEnd();
    };

    return recognition;
  },

  // Parse and normalize spoken response for elderly / multilingual input
  normalizeSpokenValue(
    rawText: string,
    fieldType: string,
    fieldKey: string,
    languageCode: LanguageCode
  ): string {
    const trimmed = rawText.trim();
    if (!trimmed) return '';

    // Phone / Number normalization: extract digits from Indian words or numerals
    if (fieldType === 'phone' || fieldType === 'number') {
      // Map Indic digits to standard Arabic digits
      const indicDigitsMap: Record<string, string> = {
        '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4', '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9', // Tamil
        '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9', // Devanagari
        '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9', // Telugu
        '൦': '0', '൧': '1', '൨': '2', '൩': '3', '൪': '4', '൫': '5', '൬': '6', '൭': '7', '൮': '8', '൯': '9', // Malayalam
        '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9', // Kannada
      };

      let converted = '';
      for (const char of trimmed) {
        if (indicDigitsMap[char]) {
          converted += indicDigitsMap[char];
        } else {
          converted += char;
        }
      }

      const digitsOnly = converted.replace(/\D/g, '');
      if (digitsOnly.length >= 10) {
        return digitsOnly.slice(-10);
      }
      if (digitsOnly.length > 0) {
        return digitsOnly;
      }
    }

    // Choice / Gender normalization
    if (fieldKey === 'gender') {
      const lower = trimmed.toLowerCase();
      if (/ஆண்|पुरुष|పురుషుడు|പുരുഷൻ|ಪುರುಷ|male|men/i.test(lower)) {
        return 'Male';
      }
      if (/பெண்|महिला|స్త్రీ|സ്ത്രീ|ಮಹಿಳೆ|female|women/i.test(lower)) {
        return 'Female';
      }
    }

    // Account Type normalization
    if (fieldKey === 'accountType') {
      if (/சேமிப்பு|बचत|సేవింగ్స్|സേവിംഗ്സ്|ಉಳಿತಾಯ|savings|saving/i.test(trimmed)) {
        return 'Savings Account';
      }
      if (/நடப்பு|चालू|కరెంట్|കറന്റ്|ಚಾಲ್ತಿ|current/i.test(trimmed)) {
        return 'Current Account';
      }
    }

    // Remove filler phrases like "my number is", "என் எண்", "मेरा नाम", etc.
    const cleaned = trimmed
      .replace(/^(my\s+(number|occupation|name)\s+is|என்\s+(எண்|தொழில்|பெயர்)|मेरा\s+(नंबर|काम|नाम)\s+है|నా\s+(నంబర్|పని)|എന്റെ\s+നമ്പർ|ನನ್ನ\s+ಸಂಖ್ಯೆ)\s*:?/i, '')
      .trim();

    return cleaned || trimmed;
  },
};
