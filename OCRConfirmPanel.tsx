import React, { useState } from 'react';
import { Check, Edit3, ShieldCheck, User, Calendar, MapPin, CreditCard, Mic, Volume2 } from 'lucide-react';
import { ExtractedIdData, LanguageCode } from '../types';
import { DICTIONARIES } from '../services/languages';
import { VoiceService } from '../services/voiceService';

interface OCRConfirmPanelProps {
  idData: ExtractedIdData;
  idCardPreviewUrl: string;
  selectedLanguage: LanguageCode;
  onConfirm: (confirmedData: ExtractedIdData) => void;
}

export const OCRConfirmPanel: React.FC<OCRConfirmPanelProps> = ({
  idData,
  idCardPreviewUrl,
  selectedLanguage,
  onConfirm,
}) => {
  const dict = DICTIONARIES[selectedLanguage];
  const [data, setData] = useState<ExtractedIdData>({ ...idData });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<keyof ExtractedIdData | null>(null);

  const handleVoiceEditField = (fieldKey: keyof ExtractedIdData) => {
    setEditingField(fieldKey);
    // Voice prompt
    const prompt = `Please speak the correct ${fieldKey}`;
    VoiceService.speak(prompt, selectedLanguage);

    const recognition = VoiceService.createRecognition(selectedLanguage, {
      onResult: (spokenText) => {
        setData((prev) => ({ ...prev, [fieldKey]: spokenText }));
        setEditingField(null);
        VoiceService.speak(dict.confirmUtterance(spokenText), selectedLanguage);
      },
      onError: () => {
        setEditingField(null);
      },
      onEnd: () => {
        setEditingField(null);
      },
    });

    if (recognition) {
      try {
        recognition.start();
      } catch (e) {}
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
        {/* Title */}
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>OCR Document Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {dict.ocrFoundTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-base sm:text-lg">
            {dict.ocrFoundSubtitle}
          </p>
        </div>

        {/* Two Columns: ID Preview + Extracted Data Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          {/* Column 1: Uploaded ID document preview */}
          <div className="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Uploaded Identity Document
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white">
              <img
                src={idCardPreviewUrl}
                alt="Uploaded ID"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{data.idType || 'Aadhaar Card'}</span>
              <span className="text-emerald-600 font-semibold">✓ Verified via OCR</span>
            </div>
          </div>

          {/* Column 2: Large text extracted fields */}
          <div className="lg:col-span-7 space-y-4">
            {/* Full Name */}
            <div className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700 mt-0.5">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase">
                    {dict.ocrName}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={data.fullName || ''}
                      onChange={(e) => setData({ ...data, fullName: e.target.value })}
                      className="mt-1 text-xl font-bold text-slate-900 border-b-2 border-blue-500 focus:outline-hidden bg-white px-2 py-1 rounded"
                    />
                  ) : (
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                      {data.fullName}
                    </div>
                  )}
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => handleVoiceEditField('fullName')}
                  className={`p-2 rounded-xl ${
                    editingField === 'fullName' ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-slate-600 border'
                  }`}
                  title="Speak Name"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Date of Birth & Gender in row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* DOB */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{dict.ocrDob}</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={data.dob || ''}
                    onChange={(e) => setData({ ...data, dob: e.target.value })}
                    className="mt-1 text-lg font-bold text-slate-900 border-b border-blue-500 w-full bg-white px-2 py-1 rounded"
                  />
                ) : (
                  <div className="text-xl font-bold text-slate-900 mt-1">
                    {data.dob}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <span>⚧️</span>
                  <span>{dict.ocrGender}</span>
                </div>
                {isEditing ? (
                  <select
                    value={data.gender || 'Male'}
                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                    className="mt-1 text-lg font-bold text-slate-900 border-b border-blue-500 w-full bg-white px-2 py-1 rounded"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="text-xl font-bold text-slate-900 mt-1">
                    {data.gender}
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-200 rounded-xl text-slate-700 mt-0.5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase">
                    {dict.ocrAddress}
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={data.address || ''}
                      onChange={(e) => setData({ ...data, address: e.target.value })}
                      className="mt-1 text-base font-semibold text-slate-900 border border-blue-500 w-full bg-white p-2 rounded-lg"
                    />
                  ) : (
                    <div className="text-base sm:text-lg font-bold text-slate-800 mt-1 leading-relaxed">
                      {data.address}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ID Number (Masked) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    {dict.ocrIdNumber}
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    {data.idNumber}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-6 border-t border-slate-100">
          <button
            onClick={() => onConfirm(data)}
            className="py-5 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all"
          >
            <Check className="w-7 h-7 stroke-[3]" />
            <span>{dict.yesCorrectBtn}</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="py-5 px-8 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xl sm:text-2xl flex items-center justify-center gap-3 border border-slate-300 active:scale-98 transition-all"
          >
            <Edit3 className="w-6 h-6" />
            <span>{isEditing ? dict.saveChangesBtn : dict.correctBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
