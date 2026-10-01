import React from 'react';
import { Globe, Volume2, ShieldCheck, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, DICTIONARIES } from '../services/languages';

interface TopBarProps {
  selectedLanguage: LanguageCode;
  onOpenLanguageModal: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  currentStepIndex: number;
  totalSteps: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  selectedLanguage,
  onOpenLanguageModal,
  isDemoMode,
  onToggleDemoMode,
  currentStepIndex,
  totalSteps,
}) => {
  const currentLang = SUPPORTED_LANGUAGES[selectedLanguage];
  const dict = DICTIONARIES[selectedLanguage];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark / Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
                BankAssist AI
              </span>
              <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                {dict.bankCounterBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block">
              {currentLang.nativeName} ({currentLang.name}) · Assisted Kiosk
            </p>
          </div>
        </div>

        {/* Zone 2: Step Progress (Simple & Clear for Elderly) */}
        {totalSteps > 0 && currentStepIndex > 0 && (
          <div className="hidden lg:flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-xl">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Step {currentStepIndex} of {totalSteps}
            </span>
            <div className="w-32 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStepIndex / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Zone 3: Actions - Language selector & Demo toggle */}
        <div className="flex items-center gap-3">
          {/* Demo toggle */}
          <button
            onClick={onToggleDemoMode}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
              isDemoMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title="Toggle Demo Mode for sample documents"
          >
            {isDemoMode ? '⭐ Demo Mode: ON' : 'Demo Mode'}
          </button>

          {/* Global Language Button */}
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors shadow-xs"
            aria-label="Change Language"
          >
            <Globe className="w-5 h-5 text-blue-700" />
            <span className="font-semibold">{currentLang.nativeName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
