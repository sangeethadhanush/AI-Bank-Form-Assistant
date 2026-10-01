import React from 'react';
import { X, Check, Volume2 } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, DICTIONARIES } from '../services/languages';
import { VoiceService } from '../services/voiceService';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const currentDict = DICTIONARIES[selectedLanguage];

  const handleChooseLanguage = (langCode: LanguageCode) => {
    onSelectLanguage(langCode);
    const newLang = SUPPORTED_LANGUAGES[langCode];
    // Warm spoken confirmation in the new language
    VoiceService.speak(newLang.welcomeGreeting, langCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentDict.selectLanguageTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {currentDict.selectLanguageDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {(Object.keys(SUPPORTED_LANGUAGES) as LanguageCode[]).map((code) => {
            const lang = SUPPORTED_LANGUAGES[code];
            const isSelected = selectedLanguage === code;

            return (
              <button
                key={code}
                onClick={() => handleChooseLanguage(code)}
                className={`p-5 rounded-2xl border-2 text-left flex items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{lang.flagEmoji}</span>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {lang.nativeName}
                    </div>
                    <div className="text-sm font-semibold text-slate-500">
                      {lang.name} · {lang.speechSynthesisLocale}
                    </div>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                ) : (
                  <Volume2 className="w-5 h-5 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Global Voice &amp; UI Language · Supports Speech Recognition &amp; Text-to-Speech
        </div>
      </div>
    </div>
  );
};
