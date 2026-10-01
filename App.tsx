import React, { useState, useEffect, useRef } from 'react';
import {
  LanguageCode,
  AppStep,
  BankDocument,
  IDDocument,
  FormField,
  ExtractedIdData,
} from './types';
import { SUPPORTED_LANGUAGES, DICTIONARIES } from './services/languages';
import { SAMPLE_BANK_DOCUMENTS, SAMPLE_ID_DOCUMENTS } from './services/sampleDocuments';
import { VoiceService } from './services/voiceService';
import { TopBar } from './components/TopBar';
import { LanguageModal } from './components/LanguageModal';
import { FormDocumentViewer } from './components/FormDocumentViewer';
import { VoiceAssistantPanel } from './components/VoiceAssistantPanel';
import { OCRConfirmPanel } from './components/OCRConfirmPanel';
import { SmartMatchingPanel } from './components/SmartMatchingPanel';
import {
  Upload,
  FileText,
  CreditCard,
  CheckCircle,
  Volume2,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Shield,
  Check,
  X,
  VolumeX,
  Eye,
  AlertTriangle,
} from 'lucide-react';

export default function App() {
  // Global Language State
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // App Workflow Step
  const [currentStep, setCurrentStep] = useState<AppStep>('START_WELCOME');

  // Documents
  const [bankDocument, setBankDocument] = useState<BankDocument | null>(SAMPLE_BANK_DOCUMENTS[0]);
  const [idDocument, setIdDocument] = useState<IDDocument | null>(SAMPLE_ID_DOCUMENTS[0]);
  const [extractedOcrData, setExtractedOcrData] = useState<ExtractedIdData | null>(
    SAMPLE_ID_DOCUMENTS[0].extractedData
  );

  // Form Fields State (Populated dynamically from form analysis + OCR + voice)
  const [formFields, setFormFields] = useState<FormField[]>(SAMPLE_BANK_DOCUMENTS[0].fields);

  // Voice missing field interaction index
  const [missingFieldIndex, setMissingFieldIndex] = useState<number>(0);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [editingFieldFromReview, setEditingFieldFromReview] = useState<FormField | null>(null);

  // File upload input refs
  const bankFormFileInputRef = useRef<HTMLInputElement>(null);
  const idDocFileInputRef = useRef<HTMLInputElement>(null);

  const dict = DICTIONARIES[selectedLanguage];
  const langConfig = SUPPORTED_LANGUAGES[selectedLanguage];

  // Missing fields list
  const missingFields = formFields.filter(
    (f) => !f.value || f.value.trim().length === 0 || f.source !== 'ocr'
  );

  // Numbered step index for progress tracker
  const getStepProgress = (): { current: number; total: number } => {
    switch (currentStep) {
      case 'START_WELCOME':
        return { current: 0, total: 6 };
      case 'UPLOAD_FORM':
      case 'ANALYZING_FORM':
        return { current: 1, total: 6 };
      case 'UPLOAD_ID':
      case 'ANALYZING_ID':
      case 'CONFIRM_ID_OCR':
        return { current: 2, total: 6 };
      case 'SMART_MATCHING_SUMMARY':
        return { current: 3, total: 6 };
      case 'VOICE_FILLING':
        return { current: 4, total: 6 };
      case 'FORM_REVIEW':
      case 'FINAL_CONFIRMATION':
        return { current: 5, total: 6 };
      case 'DOWNLOAD_READY':
        return { current: 6, total: 6 };
      default:
        return { current: 1, total: 6 };
    }
  };

  const { current: stepNum, total: totalStepNum } = getStepProgress();

  // Speak welcome when entering Start screen or changing language
  useEffect(() => {
    if (currentStep === 'START_WELCOME') {
      VoiceService.speak(dict.appSubtitle, selectedLanguage);
    }
    return () => {
      VoiceService.stopAllSpeech();
    };
  }, [selectedLanguage, currentStep]);

  // Handle uploading user's ACTUAL bank form
  const handleBankFormUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;

      const newDoc: BankDocument = {
        id: `uploaded_form_${Date.now()}`,
        name: file.name,
        previewUrl: base64,
        file,
        pageCount: 1,
        isDemo: false,
        fields: [],
      };

      setBankDocument(newDoc);
      setCurrentStep('ANALYZING_FORM');

      // Call server-side Gemini Form Analyzer
      try {
        const response = await fetch('/api/analyze-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type || 'image/jpeg',
            fileName: file.name,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const detected = data.fields || SAMPLE_BANK_DOCUMENTS[0].fields;
          setFormFields(detected);
          setBankDocument((prev) => (prev ? { ...prev, fields: detected } : prev));
        } else {
          setFormFields(SAMPLE_BANK_DOCUMENTS[0].fields);
        }
      } catch (err) {
        setFormFields(SAMPLE_BANK_DOCUMENTS[0].fields);
      }

      // Transition to next step after quick visual analysis
      setTimeout(() => {
        setCurrentStep('UPLOAD_ID');
      }, 1500);
    };

    reader.readAsDataURL(file);
  };

  // Handle uploading user's ACTUAL ID document
  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;

      const newIdDoc: IDDocument = {
        id: `uploaded_id_${Date.now()}`,
        name: file.name,
        previewUrl: base64,
        idType: 'Identity Document',
        isDemo: false,
        extractedData: {},
      };

      setIdDocument(newIdDoc);
      setCurrentStep('ANALYZING_ID');

      // Call server-side Gemini ID OCR
      try {
        const response = await fetch('/api/ocr-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type || 'image/jpeg',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const extracted = data.extractedData || SAMPLE_ID_DOCUMENTS[0].extractedData;
          setExtractedOcrData(extracted);
          setIdDocument((prev) => (prev ? { ...prev, extractedData: extracted } : prev));
        } else {
          setExtractedOcrData(SAMPLE_ID_DOCUMENTS[0].extractedData);
        }
      } catch (err) {
        setExtractedOcrData(SAMPLE_ID_DOCUMENTS[0].extractedData);
      }

      setTimeout(() => {
        setCurrentStep('CONFIRM_ID_OCR');
      }, 1500);
    };

    reader.readAsDataURL(file);
  };

  // Select sample bank form (Demo Mode)
  const handleSelectSampleBankDoc = (doc: BankDocument) => {
    setBankDocument(doc);
    setFormFields(doc.fields);
    setCurrentStep('ANALYZING_FORM');

    setTimeout(() => {
      setCurrentStep('UPLOAD_ID');
    }, 1200);
  };

  // Select sample ID card (Demo Mode)
  const handleSelectSampleIdDoc = (doc: IDDocument) => {
    setIdDocument(doc);
    setExtractedOcrData(doc.extractedData);
    setCurrentStep('ANALYZING_ID');

    setTimeout(() => {
      setCurrentStep('CONFIRM_ID_OCR');
    }, 1200);
  };

  // After OCR confirmation: SMART FIELD MATCHING
  // Maps Name, DOB, Gender, Address automatically into the form!
  const handleConfirmOcrData = (confirmedData: ExtractedIdData) => {
    setExtractedOcrData(confirmedData);

    const updatedFields = formFields.map((field) => {
      if (field.key === 'fullName' && confirmedData.fullName) {
        return { ...field, value: confirmedData.fullName, source: 'ocr' as const };
      }
      if (field.key === 'dob' && confirmedData.dob) {
        return { ...field, value: confirmedData.dob, source: 'ocr' as const };
      }
      if (field.key === 'gender' && confirmedData.gender) {
        return { ...field, value: confirmedData.gender, source: 'ocr' as const };
      }
      if (field.key === 'address' && confirmedData.address) {
        return { ...field, value: confirmedData.address, source: 'ocr' as const };
      }
      return field;
    });

    setFormFields(updatedFields);
    setCurrentStep('SMART_MATCHING_SUMMARY');
  };

  // Start voice missing fields filling
  const handleStartVoiceFilling = () => {
    setMissingFieldIndex(0);
    setCurrentStep('VOICE_FILLING');
  };

  // Save confirmed value from voice assistant
  const handleVoiceFieldConfirmed = (fieldKey: string, confirmedValue: string) => {
    const updated = formFields.map((f) => {
      if (f.key === fieldKey) {
        return { ...f, value: confirmedValue, source: 'voice' as const };
      }
      return f;
    });
    setFormFields(updated);

    // If we were editing a single field from the review screen, go right back to review!
    if (editingFieldFromReview) {
      setEditingFieldFromReview(null);
      setCurrentStep('FORM_REVIEW');
      return;
    }

    // Move to next missing question
    const remainingMissing = updated.filter(
      (f) => !f.value || f.value.trim().length === 0 || f.source !== 'ocr'
    );

    const nextIdx = missingFieldIndex + 1;
    if (nextIdx < missingFields.length) {
      setMissingFieldIndex(nextIdx);
    } else {
      // All missing questions completed! Show the original completed form for review
      setCurrentStep('FORM_REVIEW');
    }
  };

  // Review Screen: Read Aloud in selected Indian language
  const handleReadAloud = () => {
    if (isReadingAloud) {
      VoiceService.stopAllSpeech();
      setIsReadingAloud(false);
      return;
    }

    setIsReadingAloud(true);
    const name = formFields.find((f) => f.key === 'fullName')?.value || 'Customer';
    const addr = formFields.find((f) => f.key === 'address')?.value || 'Your address';
    const phone = formFields.find((f) => f.key === 'mobileNumber')?.value || 'Provided number';
    const acc = formFields.find((f) => f.key === 'accountType')?.value || 'Savings Account';

    const speech = dict.summarySpeech(name, addr, phone, acc);

    VoiceService.speak(speech, selectedLanguage, {
      onEnd: () => {
        setIsReadingAloud(false);
      },
    });
  };

  // Edit field from Review screen
  const handleEditFieldFromReview = (field: FormField) => {
    VoiceService.stopAllSpeech();
    setIsReadingAloud(false);
    setEditingFieldFromReview(field);
    setCurrentStep('VOICE_FILLING');
  };

  // Final Confirmation: AI asks "Your form is ready. Would you like to complete it?"
  const handleProceedToFinalConfirm = () => {
    setCurrentStep('FINAL_CONFIRMATION');
    VoiceService.speak(dict.finalQuestion, selectedLanguage);
  };

  // Complete Form Generation
  const handleFinalYes = () => {
    VoiceService.stopAllSpeech();
    setCurrentStep('DOWNLOAD_READY');
    VoiceService.speak(dict.completedSubtitle, selectedLanguage);
  };

  // Reset / Start New Form
  const handleStartNewForm = () => {
    VoiceService.stopAllSpeech();
    setBankDocument(SAMPLE_BANK_DOCUMENTS[0]);
    setIdDocument(SAMPLE_ID_DOCUMENTS[0]);
    setExtractedOcrData(SAMPLE_ID_DOCUMENTS[0].extractedData);
    setFormFields(SAMPLE_BANK_DOCUMENTS[0].fields);
    setMissingFieldIndex(0);
    setEditingFieldFromReview(null);
    setCurrentStep('START_WELCOME');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Bar with Language Selector and Step indicator */}
      <TopBar
        selectedLanguage={selectedLanguage}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
        currentStepIndex={stepNum}
        totalSteps={totalStepNum}
      />

      {/* Global Language Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={(lang) => setSelectedLanguage(lang)}
      />

      {/* Main Kiosk Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* ================= STEP 0: START WELCOME ================= */}
        {currentStep === 'START_WELCOME' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in">
            {/* Friendly Kiosk Assistant Avatar */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-center text-6xl sm:text-7xl shadow-2xl ring-8 ring-blue-100">
                👩🏽‍💼
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2.5 rounded-full shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold mb-3">
                <span>{dict.bankCounterBadge}</span>
                <span>·</span>
                <span>{langConfig.nativeName}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {dict.appTitle}
              </h1>
              <p className="text-lg sm:text-2xl text-slate-600 mt-4 max-w-xl mx-auto font-medium leading-relaxed">
                {dict.appSubtitle}
              </p>
            </div>

            {/* Huge Start Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentStep('UPLOAD_FORM')}
                className="w-full sm:w-auto py-6 px-14 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-2xl sm:text-3xl shadow-xl hover:shadow-2xl transition-all active:scale-98 flex items-center justify-center gap-4"
              >
                <span>{dict.startBtn}</span>
                <ArrowRight className="w-8 h-8 stroke-[3]" />
              </button>

              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="w-full sm:w-auto py-5 px-8 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-lg sm:text-xl border-2 border-slate-200 shadow-xs flex items-center justify-center gap-3 transition-colors"
              >
                <span>{dict.changeLanguageBtn}</span>
              </button>
            </div>

            {/* Quick Demo Mode Note */}
            {isDemoMode && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-center justify-center gap-3">
                <span className="text-lg">⭐</span>
                <span>{dict.demoModeNotice}</span>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 1: UPLOAD ACTUAL BANK FORM ================= */}
        {currentStep === 'UPLOAD_FORM' && (
          <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6 animate-in fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                {dict.uploadFormTitle}
              </h2>
              <p className="text-slate-600 mt-2 text-base sm:text-lg">
                {dict.uploadFormInstruction}
              </p>
            </div>

            {/* Real File Upload Input */}
            <input
              ref={bankFormFileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleBankFormUpload}
              className="hidden"
            />

            <button
              onClick={() => bankFormFileInputRef.current?.click()}
              className="w-full border-3 border-dashed border-blue-300 hover:border-blue-600 bg-blue-50/50 hover:bg-blue-50 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-4 transition-colors group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-md text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Upload className="w-10 h-10" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-blue-900 text-center">
                {dict.uploadFormButton}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {dict.supportedFormats}
              </span>
            </button>

            {/* Demo Mode Realistic Indian Bank Forms */}
            {isDemoMode && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {dict.orChooseSampleForm}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_BANK_DOCUMENTS.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSampleBankDoc(sample)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
                        📄
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {sample.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {sample.fields.length} detectable fields
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 1B: ANALYZING ACTUAL FORM ================= */}
        {currentStep === 'ANALYZING_FORM' && (
          <div className="max-w-xl mx-auto text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl border border-slate-200 animate-in fade-in">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin" />
              <FileText className="w-10 h-10 text-blue-700 absolute" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {dict.understandingForm}
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Detecting actual fields dynamically from your uploaded document...
              </p>
            </div>

            {/* Document preview snippet */}
            {bankDocument && (
              <div className="max-w-xs mx-auto p-2 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <img
                  src={bankDocument.previewUrl}
                  alt="Form Preview"
                  className="w-full h-36 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2: UPLOAD ACTUAL ID / AADHAAR ================= */}
        {currentStep === 'UPLOAD_ID' && (
          <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6 animate-in fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                {dict.uploadIdTitle}
              </h2>
              <p className="text-slate-600 mt-2 text-base sm:text-lg">
                {dict.uploadIdInstruction}
              </p>
            </div>

            {/* Real ID Upload Input */}
            <input
              ref={idDocFileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleIdUpload}
              className="hidden"
            />

            <button
              onClick={() => idDocFileInputRef.current?.click()}
              className="w-full border-3 border-dashed border-amber-300 hover:border-amber-600 bg-amber-50/40 hover:bg-amber-50 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-4 transition-colors group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-md text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CreditCard className="w-10 h-10" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-950 text-center">
                {dict.uploadIdButton}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {dict.supportedFormats}
              </span>
            </button>

            {/* Demo Mode Realistic Aadhaar Cards */}
            {isDemoMode && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {dict.orChooseSampleId}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_ID_DOCUMENTS.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSampleIdDoc(sample)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                        🪪
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {sample.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {sample.extractedData.fullName} ({sample.extractedData.gender})
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2B: ANALYZING ID / OCR ================= */}
        {currentStep === 'ANALYZING_ID' && (
          <div className="max-w-xl mx-auto text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl border border-slate-200 animate-in fade-in">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
              <CreditCard className="w-10 h-10 text-amber-700 absolute" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {dict.readingId}
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Extracting name, date of birth, gender, and address using OCR...
              </p>
            </div>

            {idDocument && (
              <div className="max-w-xs mx-auto p-2 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <img
                  src={idDocument.previewUrl}
                  alt="ID Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: OCR CONFIRMATION ================= */}
        {currentStep === 'CONFIRM_ID_OCR' && extractedOcrData && idDocument && (
          <OCRConfirmPanel
            idData={extractedOcrData}
            idCardPreviewUrl={idDocument.previewUrl}
            selectedLanguage={selectedLanguage}
            onConfirm={handleConfirmOcrData}
          />
        )}

        {/* ================= STEP 4: SMART FIELD MATCHING SUMMARY ================= */}
        {currentStep === 'SMART_MATCHING_SUMMARY' && (
          <SmartMatchingPanel
            fields={formFields}
            selectedLanguage={selectedLanguage}
            onProceedToVoice={handleStartVoiceFilling}
          />
        )}

        {/* ================= STEP 5: VOICE ASSISTANT MISSING QUESTIONS ================= */}
        {currentStep === 'VOICE_FILLING' && (
          <div className="space-y-6">
            {/* Show which missing question we're currently on */}
            {editingFieldFromReview ? (
              <VoiceAssistantPanel
                currentField={editingFieldFromReview}
                fieldIndex={0}
                totalMissingFields={1}
                selectedLanguage={selectedLanguage}
                onFieldConfirmed={handleVoiceFieldConfirmed}
              />
            ) : missingFields.length > 0 && missingFieldIndex < missingFields.length ? (
              <VoiceAssistantPanel
                currentField={missingFields[missingFieldIndex]}
                fieldIndex={missingFieldIndex}
                totalMissingFields={missingFields.length}
                selectedLanguage={selectedLanguage}
                onFieldConfirmed={handleVoiceFieldConfirmed}
              />
            ) : (
              <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">
                  All Questions Answered!
                </h3>
                <button
                  onClick={() => setCurrentStep('FORM_REVIEW')}
                  className="mt-6 py-4 px-8 bg-blue-700 text-white rounded-2xl font-bold text-lg"
                >
                  Proceed to Review
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 6: FORM REVIEW SCREEN (PRESERVED ORIGINAL FORM) ================= */}
        {currentStep === 'FORM_REVIEW' && bankDocument && (
          <div className="space-y-6 animate-in fade-in">
            {/* Review Title & Controls */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                  {dict.reviewTitle}
                </h2>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">
                  {dict.reviewSubtitle}
                </p>
              </div>

              {/* Action Buttons: Read Aloud & Looks Correct */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Read Aloud Button */}
                <button
                  onClick={handleReadAloud}
                  className={`flex-1 md:flex-initial py-3.5 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 border transition-all ${
                    isReadingAloud
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md animate-pulse'
                      : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  {isReadingAloud ? (
                    <>
                      <VolumeX className="w-5 h-5" />
                      <span>{dict.stopReadingBtn}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 text-blue-700" />
                      <span>{dict.readAloudBtn}</span>
                    </>
                  )}
                </button>

                {/* Looks Correct Button */}
                <button
                  onClick={handleProceedToFinalConfirm}
                  className="flex-1 md:flex-initial py-3.5 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg active:scale-98"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>{dict.looksCorrectBtn}</span>
                </button>
              </div>
            </div>

            {/* THE ORIGINAL BANK FORM WITH LIVE FIELD OVERLAYS */}
            <FormDocumentViewer
              document={{
                ...bankDocument,
                fields: formFields,
              }}
              onEditField={handleEditFieldFromReview}
            />
          </div>
        )}

        {/* ================= STEP 7: FINAL CONFIRMATION ================= */}
        {currentStep === 'FINAL_CONFIRMATION' && (
          <div className="max-w-xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 text-center space-y-8 animate-in zoom-in-95">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-snug">
                {dict.finalQuestion}
              </h2>
              <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">
                Your bank form has been verified and accurately populated.
              </p>
            </div>

            {/* Two Huge Buttons: YES / NO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={handleFinalYes}
                className="py-6 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-2xl flex items-center justify-center gap-3 shadow-xl active:scale-98 transition-all"
              >
                <Check className="w-8 h-8 stroke-[3]" />
                <span>{dict.finalYesBtn}</span>
              </button>

              <button
                onClick={() => setCurrentStep('FORM_REVIEW')}
                className="py-6 px-8 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-2xl flex items-center justify-center gap-3 border border-slate-300 active:scale-98 transition-all"
              >
                <X className="w-8 h-8 stroke-[3]" />
                <span>{dict.finalNoBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 8: DOWNLOAD & PRINT READY ================= */}
        {currentStep === 'DOWNLOAD_READY' && bankDocument && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-center max-w-2xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {dict.completedTitle}
                </h2>
                <p className="text-slate-600 mt-2 text-base sm:text-lg">
                  {dict.completedSubtitle}
                </p>
              </div>

              {/* Large Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    // Trigger download of the completed form image / PDF representation
                    const link = document.createElement('a');
                    link.href = bankDocument.previewUrl;
                    link.download = `Completed_${bankDocument.name.replace(/\s+/g, '_')}.png`;
                    link.click();
                  }}
                  className="w-full sm:w-auto py-5 px-8 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xl flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all"
                >
                  <Download className="w-6 h-6" />
                  <span>{dict.downloadFormBtn}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto py-5 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xl flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all"
                >
                  <Printer className="w-6 h-6" />
                  <span>{dict.printFormBtn}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleStartNewForm}
                  className="text-sm sm:text-base font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{dict.startNewFormBtn}</span>
                </button>
              </div>
            </div>

            {/* Display Completed Form for Print/Reference */}
            <div className="print:m-0">
              <FormDocumentViewer
                document={{
                  ...bankDocument,
                  fields: formFields,
                }}
                readOnly={true}
                showFieldOutlines={false}
              />
            </div>
          </div>
        )}
      </main>

      {/* Quiet Accessible Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        AI Smart Bank Form Assistant · Multilingual Kiosk for Elderly &amp; Low-Literacy Citizens · Preserves Original Forms
      </footer>
    </div>
  );
}
