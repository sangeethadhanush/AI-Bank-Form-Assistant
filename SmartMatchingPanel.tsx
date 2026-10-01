import React from 'react';
import { FormField, LanguageCode } from '../types';
import { DICTIONARIES } from '../services/languages';
import { CheckCircle2, Mic, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface SmartMatchingPanelProps {
  fields: FormField[];
  selectedLanguage: LanguageCode;
  onProceedToVoice: () => void;
}

export const SmartMatchingPanel: React.FC<SmartMatchingPanelProps> = ({
  fields,
  selectedLanguage,
  onProceedToVoice,
}) => {
  const dict = DICTIONARIES[selectedLanguage];

  const autoFilledFields = fields.filter((f) => f.value && f.source === 'ocr');
  const missingFields = fields.filter((f) => !f.value || f.source !== 'ocr');

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
      <div className="text-center pb-6 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Intelligent Form Matcher</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {dict.smartMatchTitle}
        </h2>
        <p className="text-slate-600 mt-2 text-base sm:text-lg">
          We matched your ID with your bank form. You will only be asked for missing details!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Section 1: Auto-filled Fields */}
        <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg mb-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>Auto-Filled from ID ({autoFilledFields.length})</span>
          </div>
          <p className="text-xs text-emerald-700 mb-4 font-medium">
            {dict.smartMatchAutoFilled}
          </p>

          <div className="space-y-3">
            {autoFilledFields.map((field) => (
              <div
                key={field.key}
                className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    {field.label}
                  </div>
                  <div className="text-base font-bold text-slate-900 truncate max-w-[220px]">
                    {field.value}
                  </div>
                </div>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  ✓ Matched
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Missing Fields */}
        <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-lg mb-1">
            <Mic className="w-6 h-6 text-amber-600" />
            <span>Missing Information ({missingFields.length})</span>
          </div>
          <p className="text-xs text-amber-800 mb-4 font-medium">
            {dict.smartMatchMissingTitle}
          </p>

          <div className="space-y-3">
            {missingFields.map((field, idx) => (
              <div
                key={field.key}
                className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Question {idx + 1}
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {field.label}
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Mic className="w-3 h-3" /> Voice
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Big Action Button */}
      <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
        <button
          onClick={onProceedToVoice}
          className="w-full sm:w-auto py-5 px-12 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center gap-4 shadow-xl active:scale-98 transition-all"
        >
          <Mic className="w-8 h-8" />
          <span>{dict.startVoiceFillingBtn}</span>
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
