import React, { useEffect, useState, useRef } from 'react';
import { Mic, Volume2, Check, RotateCcw, AlertCircle, Sparkles, Keyboard } from 'lucide-react';
import { FormField, LanguageCode, VoiceAssistantState } from '../types';
import { SUPPORTED_LANGUAGES, DICTIONARIES } from '../services/languages';
import { VoiceService } from '../services/voiceService';

interface VoiceAssistantPanelProps {
  currentField: FormField;
  fieldIndex: number;
  totalMissingFields: number;
  selectedLanguage: LanguageCode;
  onFieldConfirmed: (fieldKey: string, confirmedValue: string) => void;
  onCancelOrBack?: () => void;
}

export const VoiceAssistantPanel: React.FC<VoiceAssistantPanelProps> = ({
  currentField,
  fieldIndex,
  totalMissingFields,
  selectedLanguage,
  onFieldConfirmed,
  onCancelOrBack,
}) => {
  const dict = DICTIONARIES[selectedLanguage];
  const langConfig = SUPPORTED_LANGUAGES[selectedLanguage];

  const [voiceState, setVoiceState] = useState<VoiceAssistantState>('AI_SPEAKING');
  const [transcript, setTranscript] = useState<string>('');
  const [cleanValue, setCleanValue] = useState<string>('');
  const [isManualInputOpen, setIsManualInputOpen] = useState<boolean>(false);
  const [manualInputText, setManualInputText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isComponentMounted = useRef<boolean>(true);

  // Get question text for current field in selected language
  const getQuestionText = (field: FormField): string => {
    if (field.key === 'mobileNumber') return dict.questions.mobileNumber;
    if (field.key === 'occupation') return dict.questions.occupation;
    if (field.key === 'accountType') return dict.questions.accountType;
    if (field.key === 'gender') return dict.questions.gender;
    if (field.key === 'nomineeName') return dict.questions.nomineeName;
    if (field.key === 'annualIncome') return dict.questions.annualIncome;
    return dict.questions.genericQuestion(field.label);
  };

  const questionText = getQuestionText(currentField);

  // STEP A: AI automatically speaks the question on mount or field change
  useEffect(() => {
    isComponentMounted.current = true;
    setVoiceState('AI_SPEAKING');
    setTranscript('');
    setCleanValue('');
    setErrorMessage(null);
    setIsManualInputOpen(false);

    let isCancelled = false;

    const askQuestion = async () => {
      try {
        await VoiceService.speak(questionText, selectedLanguage, {
          onEnd: () => {
            if (isCancelled || !isComponentMounted.current) return;
            // STEP B: After speaking, automatically transition to WAITING_FOR_USER
            setVoiceState('WAITING_FOR_USER');
          },
          onError: () => {
            if (isCancelled || !isComponentMounted.current) return;
            setVoiceState('WAITING_FOR_USER');
          },
        });
      } catch (e) {
        if (!isCancelled) {
          setVoiceState('WAITING_FOR_USER');
        }
      }
    };

    askQuestion();

    return () => {
      isCancelled = true;
      isComponentMounted.current = false;
      VoiceService.stopAllSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [currentField.key, selectedLanguage]);

  // STEP C: User taps microphone button to start listening
  const handleStartListening = () => {
    VoiceService.stopAllSpeech();
    setVoiceState('LISTENING');
    setErrorMessage(null);

    const recognition = VoiceService.createRecognition(selectedLanguage, {
      onStart: () => {
        setVoiceState('LISTENING');
      },
      onResult: async (spokenText) => {
        if (!spokenText || spokenText.trim().length === 0) {
          handleVoiceFailure();
          return;
        }

        // STEP D: Speech-to-text received, transition to processing
        setVoiceState('PROCESSING_SPEECH');
        setTranscript(spokenText);

        // Normalize spoken value locally or via backend
        let normalized = VoiceService.normalizeSpokenValue(
          spokenText,
          currentField.type,
          currentField.key,
          selectedLanguage
        );

        // Call backend interpret endpoint for smart phone/name/choice interpretation
        try {
          const res = await fetch('/api/interpret-speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              spokenText,
              fieldKey: currentField.key,
              fieldType: currentField.type,
              language: langConfig.name,
              options: currentField.options,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.value) {
              normalized = data.value;
            }
          }
        } catch (err) {
          // Use normalized fallback
        }

        setCleanValue(normalized);
        setVoiceState('CONFIRMING');

        // AI speaks confirmation in selected language
        const confirmUtterance = dict.confirmUtterance(normalized);
        VoiceService.speak(confirmUtterance, selectedLanguage);
      },
      onError: (err) => {
        console.warn('Speech recognition error event:', err);
        handleVoiceFailure();
      },
      onEnd: () => {
        // Handled in onResult or onError
      },
    });

    if (!recognition) {
      // Speech recognition not supported in this browser
      handleVoiceFailure('Speech recognition not available on this device.');
      setIsManualInputOpen(true);
      return;
    }

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      console.warn('Failed to start recognition:', e);
      handleVoiceFailure();
    }
  };

  // STEP 5: Voice failure handling
  const handleVoiceFailure = (customError?: string) => {
    setVoiceState('ERROR');
    setErrorMessage(customError || dict.voiceErrorUtterance);
    // Speak warm failure message in selected language
    VoiceService.speak(dict.voiceErrorUtterance, selectedLanguage, {
      onEnd: () => {
        setVoiceState('WAITING_FOR_USER');
      },
    });
  };

  // User taps choice button (e.g. Savings or Current, Male or Female)
  const handleSelectChoice = (option: string) => {
    VoiceService.stopAllSpeech();
    setTranscript(option);
    setCleanValue(option);
    setVoiceState('CONFIRMING');

    const confirmUtterance = dict.confirmUtterance(option);
    VoiceService.speak(confirmUtterance, selectedLanguage);
  };

  // Confirming answer
  const handleConfirmAnswer = () => {
    VoiceService.stopAllSpeech();
    setVoiceState('NEXT_QUESTION');
    onFieldConfirmed(currentField.key, cleanValue);
  };

  // Speak again / retry
  const handleRetrySpeaking = () => {
    VoiceService.stopAllSpeech();
    setTranscript('');
    setCleanValue('');
    setErrorMessage(null);
    setVoiceState('WAITING_FOR_USER');
    handleStartListening();
  };

  // Manual fallback submission
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInputText.trim()) return;
    const val = manualInputText.trim();
    setTranscript(val);
    setCleanValue(val);
    setVoiceState('CONFIRMING');
    setIsManualInputOpen(false);

    const confirmUtterance = dict.confirmUtterance(val);
    VoiceService.speak(confirmUtterance, selectedLanguage);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
      {/* Progress Kicker */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500 pb-4 border-b border-slate-100">
        <span className="uppercase tracking-wider">
          Missing Question {fieldIndex + 1} of {totalMissingFields}
        </span>
        <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
          {langConfig.nativeName} ({langConfig.speechRecognitionLocale})
        </span>
      </div>

      {/* Main Question Header */}
      <div className="mt-6 text-center">
        <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">
          {currentField.label}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-snug">
          {questionText}
        </h2>
      </div>

      {/* Choice Options (Very large buttons if field has choices, per Requirement 18) */}
      {currentField.options && currentField.options.length > 0 && voiceState !== 'CONFIRMING' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {currentField.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelectChoice(opt)}
              className="p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-xl font-bold text-slate-800 transition-all flex items-center justify-center gap-3 shadow-xs active:scale-98"
            >
              <span>🏦</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      )}

      {/* STATE MACHINE VISUALS */}
      <div className="my-8 flex flex-col items-center justify-center min-h-[220px]">
        {/* STATE: AI_SPEAKING */}
        {voiceState === 'AI_SPEAKING' && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in">
            <div className="relative flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 animate-pulse">
                <Volume2 className="w-14 h-14" />
              </div>
              <span className="absolute w-36 h-36 rounded-full border-4 border-blue-400/40 animate-ping" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-900">
              {dict.aiSpeaking}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Speaking in {langConfig.nativeName}...
            </p>
          </div>
        )}

        {/* STATE: WAITING_FOR_USER */}
        {voiceState === 'WAITING_FOR_USER' && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in">
            <button
              onClick={handleStartListening}
              className="group relative w-32 h-32 rounded-full bg-gradient-to-tr from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white flex items-center justify-center shadow-2xl transition-transform active:scale-95 focus:outline-hidden ring-8 ring-blue-100"
              aria-label={dict.tapToSpeak}
            >
              <Mic className="w-16 h-16 group-hover:scale-110 transition-transform" />
            </button>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {dict.tapToSpeak}
            </div>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Tap the microphone and speak your answer
            </p>
          </div>
        )}

        {/* STATE: LISTENING */}
        {voiceState === 'LISTENING' && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in">
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl animate-pulse">
                <Mic className="w-16 h-16" />
              </div>
              <span className="absolute w-44 h-44 rounded-full border-4 border-red-400/60 animate-ping" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600">
              {dict.listening}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Listening in {langConfig.nativeName} ({langConfig.speechRecognitionLocale})...
            </p>
          </div>
        )}

        {/* STATE: PROCESSING_SPEECH */}
        {voiceState === 'PROCESSING_SPEECH' && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in">
            <div className="w-20 h-20 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin" />
            <div className="text-xl sm:text-2xl font-bold text-slate-800">
              {dict.processingSpeech}
            </div>
          </div>
        )}

        {/* STATE: SHOWING_TRANSCRIPT / CONFIRMING */}
        {voiceState === 'CONFIRMING' && (
          <div className="w-full flex flex-col items-center gap-5 animate-in zoom-in-95">
            <div className="w-full bg-slate-50 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-sm font-semibold text-slate-500 mb-1">
                {dict.youSaid}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-900 break-words font-sans">
                {cleanValue || transcript}
              </div>
              {transcript !== cleanValue && (
                <div className="text-xs text-slate-400 mt-1">
                  (Heard: "{transcript}")
                </div>
              )}
            </div>

            <div className="text-xl sm:text-2xl font-bold text-slate-800">
              {dict.isThisCorrect}
            </div>

            {/* Huge Confirmation Buttons */}
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              <button
                onClick={handleConfirmAnswer}
                className="py-5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all"
              >
                <Check className="w-8 h-8 stroke-[3]" />
                <span>{dict.confirmYesBtn}</span>
              </button>

              <button
                onClick={handleRetrySpeaking}
                className="py-5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xl sm:text-2xl flex items-center justify-center gap-3 border border-slate-300 active:scale-98 transition-all"
              >
                <RotateCcw className="w-7 h-7" />
                <span>{dict.confirmNoRetryBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* STATE: ERROR / VOICE FAILURE */}
        {voiceState === 'ERROR' && (
          <div className="flex flex-col items-center gap-4 text-center animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 max-w-md">
              {errorMessage}
            </div>
            <button
              onClick={handleRetrySpeaking}
              className="mt-2 py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg flex items-center gap-3 shadow-md"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{dict.retrySpeakBtn}</span>
            </button>
          </div>
        )}
      </div>

      {/* Testing Simulation / Manual Typing Drawer (for testing or mic permission issues) */}
      <div className="pt-6 border-t border-slate-100">
        {!isManualInputOpen ? (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsManualInputOpen(true)}
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-2"
            >
              <Keyboard className="w-4 h-4" />
              <span>{dict.manualTypeOption}</span>
            </button>

            {/* Quick-test speech simulation chips in the selected language */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Quick Test:</span>
              {currentField.key === 'mobileNumber' && (
                <button
                  onClick={() => {
                    setTranscript('9876543210');
                    setCleanValue('9876543210');
                    setVoiceState('CONFIRMING');
                    VoiceService.speak(dict.confirmUtterance('9876543210'), selectedLanguage);
                  }}
                  className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-mono"
                >
                  "9876543210"
                </button>
              )}
              {currentField.key === 'occupation' && (
                <button
                  onClick={() => {
                    const sample = selectedLanguage === 'ta' ? 'விவசாயி' : selectedLanguage === 'hi' ? 'किसान' : 'Agriculture';
                    setTranscript(sample);
                    setCleanValue(sample);
                    setVoiceState('CONFIRMING');
                    VoiceService.speak(dict.confirmUtterance(sample), selectedLanguage);
                  }}
                  className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md"
                >
                  {selectedLanguage === 'ta' ? '"விவசாயி"' : selectedLanguage === 'hi' ? '"किसान"' : '"Agriculture"'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleManualSubmit} className="flex gap-3 mt-2">
            <input
              type="text"
              value={manualInputText}
              onChange={(e) => setManualInputText(e.target.value)}
              placeholder={dict.typeYourAnswerPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
            >
              {dict.submitAnswerBtn}
            </button>
            <button
              type="button"
              onClick={() => setIsManualInputOpen(false)}
              className="px-4 py-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
