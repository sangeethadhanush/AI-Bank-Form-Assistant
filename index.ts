export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  speechRecognitionLocale: string;
  speechSynthesisLocale: string;
  welcomeGreeting: string;
  scriptName: string;
  flagEmoji: string;
}

export type VoiceAssistantState =
  | 'IDLE'
  | 'AI_SPEAKING'
  | 'WAITING_FOR_USER'
  | 'LISTENING'
  | 'PROCESSING_SPEECH'
  | 'SHOWING_TRANSCRIPT'
  | 'CONFIRMING'
  | 'NEXT_QUESTION'
  | 'ERROR';

export type AppStep =
  | 'START_WELCOME'
  | 'UPLOAD_FORM'
  | 'ANALYZING_FORM'
  | 'UPLOAD_ID'
  | 'ANALYZING_ID'
  | 'CONFIRM_ID_OCR'
  | 'SMART_MATCHING_SUMMARY'
  | 'VOICE_FILLING'
  | 'FORM_REVIEW'
  | 'FINAL_CONFIRMATION'
  | 'DOWNLOAD_READY';

export interface FormFieldBox {
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  width: number;
  height: number;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'choice' | 'phone' | 'number';
  options?: string[];
  box: FormFieldBox;
  category?: 'personal' | 'contact' | 'banking' | 'other';
  value?: string;
  source?: 'ocr' | 'voice' | 'manual';
  confidence?: number;
}

export interface BankDocument {
  id: string;
  name: string;
  previewUrl: string;
  file?: File;
  pageCount: number;
  fields: FormField[];
  isDemo?: boolean;
}

export interface ExtractedIdData {
  fullName?: string;
  dob?: string;
  gender?: string;
  address?: string;
  idNumber?: string;
  idType?: string;
  fatherOrHusbandName?: string;
}

export interface IDDocument {
  id: string;
  name: string;
  previewUrl: string;
  idType: string;
  extractedData: ExtractedIdData;
  isDemo?: boolean;
}
