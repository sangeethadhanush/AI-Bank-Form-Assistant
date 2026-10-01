import { LanguageCode, LanguageConfig } from '../types';

export const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    speechRecognitionLocale: 'en-IN',
    speechSynthesisLocale: 'en-IN',
    welcomeGreeting: 'Welcome to the AI Bank Form Assistant. I am here to help you fill your bank form simply and easily.',
    scriptName: 'Latin',
    flagEmoji: '🇮🇳',
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechRecognitionLocale: 'ta-IN',
    speechSynthesisLocale: 'ta-IN',
    welcomeGreeting: 'வணக்கம்! AI வங்கி படிவ உதவியாளருக்கு நல்வரவு. உங்கள் வங்கி படிவத்தை எளிதாக பூர்த்தி செய்ய நான் உங்களுக்கு உதவுகிறேன்.',
    scriptName: 'Tamil',
    flagEmoji: '🇮🇳',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    speechRecognitionLocale: 'hi-IN',
    speechSynthesisLocale: 'hi-IN',
    welcomeGreeting: 'नमस्ते! एआई बैंक फॉर्म सहायक में आपका स्वागत है। मैं आपका बैंक फॉर्म आसानी से भरने में आपकी पूरी सहायता करूँगा।',
    scriptName: 'Devanagari',
    flagEmoji: '🇮🇳',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechRecognitionLocale: 'te-IN',
    speechSynthesisLocale: 'te-IN',
    welcomeGreeting: 'నమస్కారం! AI బ్యాంక్ ఫారమ్ సహాయకుడికి స్వాగతం. మీ బ్యాంక్ ఫారమ్‌ను సులభంగా పూర్తి చేయడానికి నేను మీకు సహాయం చేస్తాను.',
    scriptName: 'Telugu',
    flagEmoji: '🇮🇳',
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    speechRecognitionLocale: 'ml-IN',
    speechSynthesisLocale: 'ml-IN',
    welcomeGreeting: 'നമസ്കാരം! AI ബാങ്ക് ഫോം അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ ബാങ്ക് ഫോം എളുപ്പത്തിൽ പൂരിപ്പിക്കാൻ ഞാൻ സഹായിക്കാം.',
    scriptName: 'Malayalam',
    flagEmoji: '🇮🇳',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    speechRecognitionLocale: 'kn-IN',
    speechSynthesisLocale: 'kn-IN',
    welcomeGreeting: 'ನಮಸ್ಕಾರ! AI ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಅನ್ನು ಸುಲಭವಾಗಿ ಭರ್ತಿ ಮಾಡಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',
    scriptName: 'Kannada',
    flagEmoji: '🇮🇳',
  },
};

export interface LocalizedDictionary {
  appTitle: string;
  appSubtitle: string;
  bankCounterBadge: string;
  startBtn: string;
  changeLanguageBtn: string;
  selectLanguageTitle: string;
  selectLanguageDesc: string;
  demoModeNotice: string;
  sampleFormsTitle: string;
  
  // Upload Form
  uploadFormTitle: string;
  uploadFormInstruction: string;
  uploadFormButton: string;
  orChooseSampleForm: string;
  supportedFormats: string;
  fileNameLabel: string;
  continueBtn: string;
  changeFileBtn: string;
  
  // Analyzing Form
  understandingForm: string;
  formUnderstood: string;
  fieldsDetectedCount: (count: number) => string;
  
  // Upload ID
  uploadIdTitle: string;
  uploadIdInstruction: string;
  uploadIdButton: string;
  orChooseSampleId: string;
  readingId: string;
  idReadSuccess: string;
  
  // OCR Confirmation
  ocrFoundTitle: string;
  ocrFoundSubtitle: string;
  ocrName: string;
  ocrDob: string;
  ocrGender: string;
  ocrAddress: string;
  ocrIdNumber: string;
  yesCorrectBtn: string;
  correctBtn: string;
  editDetailsTitle: string;
  saveChangesBtn: string;
  
  // Smart Field Matching
  smartMatchTitle: string;
  smartMatchAutoFilled: string;
  smartMatchMissingTitle: string;
  startVoiceFillingBtn: string;
  
  // Voice states
  aiSpeaking: string;
  tapToSpeak: string;
  listening: string;
  processingSpeech: string;
  youSaid: string;
  isThisCorrect: string;
  confirmYesBtn: string;
  confirmNoRetryBtn: string;
  manualTypeOption: string;
  typeYourAnswerPlaceholder: string;
  submitAnswerBtn: string;
  
  // Voice failure utterances
  voiceErrorUtterance: string;
  retrySpeakBtn: string;
  
  // Review Screen
  reviewTitle: string;
  reviewSubtitle: string;
  looksCorrectBtn: string;
  editFieldBtn: string;
  readAloudBtn: string;
  readingAloudStatus: string;
  stopReadingBtn: string;
  originalFormPreservedNotice: string;
  
  // Final Confirmation
  finalQuestion: string;
  finalYesBtn: string;
  finalNoBtn: string;
  
  // Completed Download
  completedTitle: string;
  completedSubtitle: string;
  downloadFormBtn: string;
  printFormBtn: string;
  startNewFormBtn: string;
  downloadSuccessMessage: string;
  
  // Specific questions
  questions: {
    mobileNumber: string;
    occupation: string;
    accountType: string;
    gender: string;
    nomineeName: string;
    annualIncome: string;
    genericQuestion: (label: string) => string;
  };
  
  confirmUtterance: (value: string) => string;
  summarySpeech: (name: string, address: string, phone: string, accType: string) => string;
}

export const DICTIONARIES: Record<LanguageCode, LocalizedDictionary> = {
  en: {
    appTitle: 'AI Smart Bank Form Assistant',
    appSubtitle: 'I will help you complete your bank form using your voice and ID card.',
    bankCounterBadge: 'Bank Kiosk Assistant',
    startBtn: 'Start',
    changeLanguageBtn: '🌐 Language',
    selectLanguageTitle: 'Choose Your Language',
    selectLanguageDesc: 'The assistant will speak and listen to you in this language.',
    demoModeNotice: 'Demo Mode — Realistic sample documents available for fast testing',
    sampleFormsTitle: 'Or choose a sample bank form:',
    uploadFormTitle: 'Upload your bank form',
    uploadFormInstruction: 'Please upload the bank form you want to complete.',
    uploadFormButton: '📄 Upload Bank Form (PDF / JPG / PNG)',
    orChooseSampleForm: 'Or choose a sample bank form to test:',
    supportedFormats: 'Supports PDF, JPG, JPEG, and PNG files',
    fileNameLabel: 'Selected file:',
    continueBtn: 'Continue',
    changeFileBtn: 'Change Document',
    understandingForm: 'Understanding your form...',
    formUnderstood: 'Form understood! Detected fields ready.',
    fieldsDetectedCount: (n) => `Detected ${n} fields on your original document`,
    uploadIdTitle: 'Upload your ID',
    uploadIdInstruction: 'Please upload your Aadhaar or identity document.',
    uploadIdButton: '🪪 Upload ID / Aadhaar Document',
    orChooseSampleId: 'Or choose a sample Aadhaar card:',
    readingId: 'Reading your ID...',
    idReadSuccess: 'Identity document read successfully',
    ocrFoundTitle: 'I found your information:',
    ocrFoundSubtitle: 'Please verify the details extracted from your ID document.',
    ocrName: 'Full Name',
    ocrDob: 'Date of Birth',
    ocrGender: 'Gender',
    ocrAddress: 'Address',
    ocrIdNumber: 'ID / Aadhaar Number',
    yesCorrectBtn: '✓ Yes, correct',
    correctBtn: '✏ Correct',
    editDetailsTitle: 'Correct Extracted Information',
    saveChangesBtn: 'Save and Continue',
    smartMatchTitle: 'Smart Field Comparison',
    smartMatchAutoFilled: 'Found on your Aadhaar card — automatically filled into form!',
    smartMatchMissingTitle: 'Missing fields — will ask you by voice:',
    startVoiceFillingBtn: '🎤 Start Voice Assistant',
    aiSpeaking: 'AI is speaking...',
    tapToSpeak: 'Tap to Speak',
    listening: 'Listening...',
    processingSpeech: 'Understanding your answer...',
    youSaid: 'You said:',
    isThisCorrect: 'Is this correct?',
    confirmYesBtn: '✓ Correct',
    confirmNoRetryBtn: '↻ Speak Again',
    manualTypeOption: 'Or tap here to type if microphone is unavailable',
    typeYourAnswerPlaceholder: 'Type your answer here...',
    submitAnswerBtn: 'Submit Answer',
    voiceErrorUtterance: 'Sorry, I could not understand. Please speak slowly and try again.',
    retrySpeakBtn: '↻ Try Speaking Again',
    reviewTitle: 'Please check your form',
    reviewSubtitle: 'Your original bank form is shown below with your details populated.',
    looksCorrectBtn: '✓ Looks Correct',
    editFieldBtn: '✏ Edit Field',
    readAloudBtn: '🔊 Read Aloud',
    readingAloudStatus: 'Reading form details aloud...',
    stopReadingBtn: '⏹ Stop Reading',
    originalFormPreservedNotice: 'Your original bank form layout is completely preserved.',
    finalQuestion: 'Your form is ready. Would you like to complete it?',
    finalYesBtn: '✓ Yes, Complete Form',
    finalNoBtn: '✕ No, Review Again',
    completedTitle: 'Your form is ready!',
    completedSubtitle: 'Your bank form has been filled with your information and is ready for submission.',
    downloadFormBtn: '📄 Download Completed Form',
    printFormBtn: '🖨 Print Form',
    startNewFormBtn: '↺ Start New Form',
    downloadSuccessMessage: 'Your completed document has been prepared for download.',
    questions: {
      mobileNumber: 'Please tell me your mobile number.',
      occupation: 'What is your occupation or work?',
      accountType: 'What type of account do you want? Say Savings or Current.',
      gender: 'Please tell me your gender. Say male or female.',
      nomineeName: 'Would you like to add a nominee name?',
      annualIncome: 'Please tell me your annual income.',
      genericQuestion: (label) => `Please tell me your ${label}.`,
    },
    confirmUtterance: (val) => `You said ${val}. Is this correct?`,
    summarySpeech: (name, addr, phone, acc) =>
      `Here is a summary: Your name is ${name}. Your address is ${addr}. Your mobile number is ${phone}. Your account type is ${acc}. Everything is filled accurately.`,
  },

  ta: {
    appTitle: 'AI ஸ்மார்ட் வங்கி படிவ உதவியாளர்',
    appSubtitle: 'உங்கள் குரல் மற்றும் அடையாள அட்டையைப் பயன்படுத்தி வங்கி படிவத்தை எளிதாக பூர்த்தி செய்ய நான் உதவுகிறேன்.',
    bankCounterBadge: 'வங்கி கவுண்டர் உதவியாளர்',
    startBtn: 'தொடங்கு',
    changeLanguageBtn: '🌐 மொழி (Tamil)',
    selectLanguageTitle: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    selectLanguageDesc: 'உதவியாளர் இந்த மொழியிலேயே உங்களுடன் பேசுவார்.',
    demoModeNotice: 'டெமோ பயன்முறை — மாதிரி ஆவணங்கள் உடனடியாக சோதிக்க கிடைக்கின்றன',
    sampleFormsTitle: 'அல்லது மாதிரி படிவத்தைத் தேர்ந்தெடுக்கவும்:',
    uploadFormTitle: 'உங்கள் வங்கி படிவத்தை பதிவேற்றவும்',
    uploadFormInstruction: 'நீங்கள் பூர்த்தி செய்ய விரும்பும் வங்கி படிவத்தை பதிவேற்றவும்.',
    uploadFormButton: '📄 வங்கி படிவத்தை பதிவேற்றவும் (PDF / JPG / PNG)',
    orChooseSampleForm: 'அல்லது சோதனை செய்ய மாதிரி வங்கி படிவத்தை தேர்வு செய்யவும்:',
    supportedFormats: 'PDF, JPG, JPEG மற்றும் PNG கோப்புகள் ஆதரிக்கப்படுகின்றன',
    fileNameLabel: 'தேர்ந்தெடுக்கப்பட்ட கோப்பு:',
    continueBtn: 'தொடரவும்',
    changeFileBtn: 'படிவத்தை மாற்றவும்',
    understandingForm: 'உங்கள் படிவத்தை புரிந்துகொள்கிறேன்...',
    formUnderstood: 'படிவம் புரிந்துகொள்ளப்பட்டது! புலங்கள் தயார்.',
    fieldsDetectedCount: (n) => `உங்கள் அசல் படிவத்தில் ${n} புலங்கள் கண்டறியப்பட்டுள்ளன`,
    uploadIdTitle: 'உங்கள் அடையாள ஆவணத்தை பதிவேற்றவும்',
    uploadIdInstruction: 'தயவுசெய்து உங்கள் ஆதார் அல்லது அடையாள ஆவணத்தை பதிவேற்றவும்.',
    uploadIdButton: '🪪 ஆதார் / அடையாள அட்டை பதிவேற்றவும்',
    orChooseSampleId: 'அல்லது மாதிரி ஆதார் அட்டையைத் தேர்ந்தெடுக்கவும்:',
    readingId: 'உங்கள் அடையாள அட்டையை படிக்கிறேன்...',
    idReadSuccess: 'அடையாள அட்டை வெற்றிகரமாக படிக்கப்பட்டது',
    ocrFoundTitle: 'கண்டுபிடிக்கப்பட்ட உங்கள் விவரங்கள்:',
    ocrFoundSubtitle: 'உங்கள் அடையாள அட்டையிலிருந்து பெறப்பட்ட தகவல்களை சரிபார்க்கவும்.',
    ocrName: 'முழுப் பெயர்',
    ocrDob: 'பிறந்த தேதி',
    ocrGender: 'பாலினம்',
    ocrAddress: 'முகவரி',
    ocrIdNumber: 'ஆதார் / அடையாள எண்',
    yesCorrectBtn: '✓ ஆம், சரி',
    correctBtn: '✏ திருத்து',
    editDetailsTitle: 'விவரங்களை திருத்தவும்',
    saveChangesBtn: 'சேமித்து தொடரவும்',
    smartMatchTitle: 'தானியங்கி படிவப் பொருத்தம்',
    smartMatchAutoFilled: 'ஆதாரில் இருந்து கண்டறியப்பட்டது — படிவத்தில் தானாகவே நிரப்பப்பட்டது!',
    smartMatchMissingTitle: 'விடுபட்ட தகவல்கள் — குரல் மூலம் கேட்கப்படும்:',
    startVoiceFillingBtn: '🎤 குரல் உதவியாளரைத் தொடங்கு',
    aiSpeaking: 'AI பேசுகிறது...',
    tapToSpeak: 'பேச தட்டவும்',
    listening: 'கேட்கிறது...',
    processingSpeech: 'உங்கள் பதிலை புரிந்துகொள்கிறேன்...',
    youSaid: 'நீங்கள் சொன்னது:',
    isThisCorrect: 'இது சரியா?',
    confirmYesBtn: '✓ ஆம் (சரி)',
    confirmNoRetryBtn: '↻ இல்லை (மீண்டும் சொல்)',
    manualTypeOption: 'மைக் வேலை செய்யவில்லை என்றால் தட்டச்சு செய்ய இங்கு தொடவும்',
    typeYourAnswerPlaceholder: 'உங்கள் பதிலை இங்கே தட்டச்சு செய்யவும்...',
    submitAnswerBtn: 'பதிலை சமர்ப்பிக்கவும்',
    voiceErrorUtterance: 'மன்னிக்கவும், உங்கள் பதிலை புரிந்துகொள்ள முடியவில்லை. தயவுசெய்து மெதுவாக மீண்டும் சொல்லுங்கள்.',
    retrySpeakBtn: '↻ மீண்டும் பேச முயற்சிக்கவும்',
    reviewTitle: 'உங்கள் படிவத்தை சரிபார்க்கவும்',
    reviewSubtitle: 'உங்கள் அசல் வங்கி படிவத்தில் அனைத்து தகவல்களும் நிரப்பப்பட்டுள்ளன.',
    looksCorrectBtn: '✓ சரியாக உள்ளது',
    editFieldBtn: '✏ திருத்து',
    readAloudBtn: '🔊 வாசித்து காட்டுங்கள்',
    readingAloudStatus: 'படிவ விவரங்களை சத்தமாக வாசிக்கிறது...',
    stopReadingBtn: '⏹ வாசிப்பதை நிறுத்து',
    originalFormPreservedNotice: 'உங்கள் அசல் படிவத்தின் வடிவம் அப்படியே பாதுகாக்கப்பட்டுள்ளது.',
    finalQuestion: 'உங்கள் படிவம் தயாராகிவிட்டது. இதை உறுதி செய்யலாமா?',
    finalYesBtn: '✓ ஆம், பூர்த்தி செய்',
    finalNoBtn: '✕ இல்லை, மீண்டும் பார்',
    completedTitle: 'உங்கள் படிவம் தயாராக உள்ளது!',
    completedSubtitle: 'உங்கள் வங்கி படிவம் முழுமையாக பூர்த்தி செய்யப்பட்டு சமர்ப்பிக்க தயாராக உள்ளது.',
    downloadFormBtn: '📄 பூர்த்தி செய்த படிவத்தை பதிவிறக்கு',
    printFormBtn: '🖨 படிவத்தை அச்சிடு (Print)',
    startNewFormBtn: '↺ புதிய படிவம் தொடங்கு',
    downloadSuccessMessage: 'பூர்த்தி செய்யப்பட்ட ஆவணம் பதிவிறக்கத்திற்கு தயாராக உள்ளது.',
    questions: {
      mobileNumber: 'தயவுசெய்து உங்கள் மொபைல் எண்ணைச் சொல்லுங்கள்.',
      occupation: 'உங்கள் தொழில் அல்லது வேலை என்ன என்று சொல்லுங்கள்.',
      accountType: 'நீங்கள் என்ன வகை கணக்கு தொடங்க விரும்புகிறீர்கள்? சேமிப்பு அல்லது நடப்பு என்று சொல்லுங்கள்.',
      gender: 'உங்கள் பாலினத்தைத் தேர்ந்தெடுக்கவும். ஆண் அல்லது பெண் என்று சொல்லுங்கள்.',
      nomineeName: 'உங்கள் வாரிசுதாரர் (நாமினி) பெயரைச் சொல்ல விரும்புகிறீர்களா?',
      annualIncome: 'உங்கள் ஆண்டு வருமானம் எவ்வளவு?',
      genericQuestion: (label) => `தயவுசெய்து உங்கள் ${label} சொல்லுங்கள்.`,
    },
    confirmUtterance: (val) => `நீங்கள் ${val} என்று சொன்னீர்கள். இது சரியா?`,
    summarySpeech: (name, addr, phone, acc) =>
      `சுருக்கம்: உங்கள் பெயர் ${name}. உங்கள் முகவரி ${addr}. உங்கள் மொபைல் எண் ${phone}. உங்கள் கணக்கு வகை ${acc}. அனைத்தும் சரியாக நிரப்பப்பட்டுள்ளது.`,
  },

  hi: {
    appTitle: 'एआई स्मार्ट बैंक फॉर्म सहायक',
    appSubtitle: 'मैं आपकी आवाज और पहचान पत्र से आपका बैंक फॉर्म आसानी से भरने में मदद करूँगा।',
    bankCounterBadge: 'बैंक काउंटर सहायक',
    startBtn: 'शुरू करें',
    changeLanguageBtn: '🌐 भाषा (Hindi)',
    selectLanguageTitle: 'अपनी भाषा चुनें',
    selectLanguageDesc: 'सहायक इसी भाषा में आपसे बात करेगा और आपकी बात सुनेगा।',
    demoModeNotice: 'डेमो मोड — तुरंत परीक्षण के लिए नमूना दस्तावेज़ उपलब्ध हैं',
    sampleFormsTitle: 'या एक नमूना बैंक फॉर्म चुनें:',
    uploadFormTitle: 'अपना बैंक फॉर्म अपलोड करें',
    uploadFormInstruction: 'कृपया वह बैंक फॉर्म अपलोड करें जिसे आप भरना चाहते हैं।',
    uploadFormButton: '📄 बैंक फॉर्म अपलोड करें (PDF / JPG / PNG)',
    orChooseSampleForm: 'या टेस्ट करने के लिए नमूना बैंक फॉर्म चुनें:',
    supportedFormats: 'PDF, JPG, JPEG और PNG फाइल समर्थित हैं',
    fileNameLabel: 'चुनी गई फाइल:',
    continueBtn: 'आगे बढ़ें',
    changeFileBtn: 'दस्तावेज़ बदलें',
    understandingForm: 'आपका फॉर्म समझा जा रहा है...',
    formUnderstood: 'फॉर्म समझ लिया गया! फ़ील्ड्स तैयार हैं।',
    fieldsDetectedCount: (n) => `आपके मूल दस्तावेज़ पर ${n} फ़ील्ड्स पहचाने गए`,
    uploadIdTitle: 'अपना पहचान पत्र अपलोड करें',
    uploadIdInstruction: 'कृपया अपना आधार या पहचान पत्र अपलोड करें।',
    uploadIdButton: '🪪 आधार / पहचान पत्र अपलोड करें',
    orChooseSampleId: 'या नमूना आधार कार्ड चुनें:',
    readingId: 'आपका पहचान पत्र पढ़ा जा रहा है...',
    idReadSuccess: 'पहचान पत्र सफलतापूर्वक पढ़ा गया',
    ocrFoundTitle: 'आपकी जानकारी मिल गई:',
    ocrFoundSubtitle: 'कृपया अपने पहचान पत्र से निकाली गई जानकारी की जांच करें।',
    ocrName: 'पूरा नाम',
    ocrDob: 'जन्म तिथि',
    ocrGender: 'लिंग',
    ocrAddress: 'पता',
    ocrIdNumber: 'आधार / पहचान संख्या',
    yesCorrectBtn: '✓ हाँ, सही है',
    correctBtn: '✏ सुधारें',
    editDetailsTitle: 'जानकारी सुधारें',
    saveChangesBtn: 'सहेजें और आगे बढ़ें',
    smartMatchTitle: 'स्मार्ट फॉर्म मिलान',
    smartMatchAutoFilled: 'आधार से मिल गया — फॉर्म में अपने आप भर दिया गया!',
    smartMatchMissingTitle: 'छूटी हुई जानकारी — आवाज से पूछी जाएगी:',
    startVoiceFillingBtn: '🎤 आवाज सहायक शुरू करें',
    aiSpeaking: 'एआई बोल रहा है...',
    tapToSpeak: 'बोलने के लिए दबाएं',
    listening: 'सुन रहा हूँ...',
    processingSpeech: 'आपका जवाब समझ रहा हूँ...',
    youSaid: 'आपने कहा:',
    isThisCorrect: 'क्या यह सही है?',
    confirmYesBtn: '✓ हाँ (सही)',
    confirmNoRetryBtn: '↻ नहीं (फिर से बोलें)',
    manualTypeOption: 'माइक उपलब्ध न होने पर टाइप करने के लिए यहाँ दबाएं',
    typeYourAnswerPlaceholder: 'अपना जवाब यहाँ लिखें...',
    submitAnswerBtn: 'जवाब जमा करें',
    voiceErrorUtterance: 'माफ़ कीजिए, मैं आपका जवाब समझ नहीं पाया। कृपया धीरे से फिर बोलें।',
    retrySpeakBtn: '↻ फिर से बोलने का प्रयास करें',
    reviewTitle: 'कृपया अपना फॉर्म जांचें',
    reviewSubtitle: 'आपका मूल बैंक फॉर्म आपकी जानकारी के साथ नीचे भरा हुआ दिख रहा है।',
    looksCorrectBtn: '✓ सब सही है',
    editFieldBtn: '✏ फ़ील्ड सुधारें',
    readAloudBtn: '🔊 पढ़कर सुनाएं',
    readingAloudStatus: 'फॉर्म का विवरण पढ़कर सुनाया जा रहा है...',
    stopReadingBtn: '⏹ पढ़ना बंद करें',
    originalFormPreservedNotice: 'आपके मूल फॉर्म का प्रारूप पूरी तरह सुरक्षित रखा गया है।',
    finalQuestion: 'आपका फॉर्म तैयार है। क्या आप इसे पूरा करना चाहते हैं?',
    finalYesBtn: '✓ हाँ, पूरा करें',
    finalNoBtn: '✕ नहीं, फिर जांचें',
    completedTitle: 'आपका फॉर्म तैयार है!',
    completedSubtitle: 'आपका बैंक फॉर्म पूरी तरह से भर गया है और जमा करने के लिए तैयार है।',
    downloadFormBtn: '📄 भरा हुआ फॉर्म डाउनलोड करें',
    printFormBtn: '🖨 फॉर्म प्रिंट करें',
    startNewFormBtn: '↺ नया फॉर्म शुरू करें',
    downloadSuccessMessage: 'आपका पूरा किया गया फॉर्म डाउनलोड के लिए तैयार है।',
    questions: {
      mobileNumber: 'कृपया अपना मोबाइल नंबर बताएं।',
      occupation: 'आपका व्यवसाय या काम क्या है?',
      accountType: 'आप किस प्रकार का खाता खोलना चाहते हैं? बचत खाता या चालू खाता बोलें।',
      gender: 'कृपया अपना लिंग बताएं। पुरुष या महिला बोलें।',
      nomineeName: 'क्या आप अपने नॉमिनी का नाम बताना चाहते हैं?',
      annualIncome: 'कृपया अपनी वार्षिक आय बताएं।',
      genericQuestion: (label) => `कृपया अपना ${label} बताएं।`,
    },
    confirmUtterance: (val) => `आपने ${val} कहा। क्या यह सही है?`,
    summarySpeech: (name, addr, phone, acc) =>
      `सारांश: आपका नाम ${name} है। आपका पता ${addr} है। आपका मोबाइल नंबर ${phone} है। आपका खाता प्रकार ${acc} है। सब कुछ सही ढंग से भरा गया है।`,
  },

  te: {
    appTitle: 'AI స్మార్ట్ బ్యాంక్ ఫారమ్ సహాయకుడు',
    appSubtitle: 'మీ వాయిస్ మరియు గుర్తింపు కార్డుతో మీ బ్యాంక్ ఫారమ్‌ను సులభంగా పూర్తి చేయడానికి నేను సహాయం చేస్తాను.',
    bankCounterBadge: 'బ్యాంక్ కౌంటర్ సహాయకుడు',
    startBtn: 'ప్రారంభించండి',
    changeLanguageBtn: '🌐 భాష (Telugu)',
    selectLanguageTitle: 'మీ భాషను ఎంచుకోండి',
    selectLanguageDesc: 'సహాయకుడు ఈ భాషలోనే మీతో మాట్లాడతారు మరియు వింటారు.',
    demoModeNotice: 'డెమో మోడ్ — వేగవంతమైన పరీక్ష కోసం నమూనా పత్రాలు అందుబాటులో ఉన్నాయి',
    sampleFormsTitle: 'లేదా నమూనా బ్యాంక్ ఫారమ్‌ను ఎంచుకోండి:',
    uploadFormTitle: 'మీ బ్యాంక్ ఫారమ్‌ను అప్‌లోడ్ చేయండి',
    uploadFormInstruction: 'దయచేసి మీరు పూర్తి చేయాలనుకుంటున్న బ్యాంక్ ఫారమ్‌ను అప్‌లోడ్ చేయండి.',
    uploadFormButton: '📄 బ్యాంక్ ఫారమ్ అప్‌లోడ్ చేయండి (PDF / JPG / PNG)',
    orChooseSampleForm: 'లేదా నమూనా బ్యాంక్ ఫారమ్‌ను ఎంచుకోండి:',
    supportedFormats: 'PDF, JPG, JPEG మరియు PNG ఫైళ్లు మద్దతు ఇవ్వబడతాయి',
    fileNameLabel: 'ఎంచుకున్న ఫైల్:',
    continueBtn: 'కొనసాగించండి',
    changeFileBtn: 'పత్రాన్ని మార్చండి',
    understandingForm: 'మీ ఫారమ్‌ను అర్థం చేసుకుంటున్నాను...',
    formUnderstood: 'ఫారమ్ అర్థమైంది! ఫీల్డ్‌లు సిద్ధంగా ఉన్నాయి.',
    fieldsDetectedCount: (n) => `మీ అసలు పత్రంలో ${n} ఫీల్డ్‌లు కనుగొనబడ్డాయి`,
    uploadIdTitle: 'మీ గుర్తింపు కార్డును అప్‌లోడ్ చేయండి',
    uploadIdInstruction: 'దయచేసి మీ ఆధార్ లేదా గుర్తింపు పత్రాన్ని అప్‌లోడ్ చేయండి.',
    uploadIdButton: '🪪 ఆధార్ / గుర్తింపు కార్డు అప్‌లోడ్ చేయండి',
    orChooseSampleId: 'లేదా నమూనా ఆధార్ కార్డును ఎంచుకోండి:',
    readingId: 'మీ గుర్తింపు కార్డును చదువుతున్నాను...',
    idReadSuccess: 'గుర్తింపు కార్డు విజయవంతంగా చదవబడింది',
    ocrFoundTitle: 'మీ వివరాలు కనుగొనబడ్డాయి:',
    ocrFoundSubtitle: 'మీ గుర్తింపు పత్రం నుండి సేకరించిన సమాచారాన్ని ధృవీకరించండి.',
    ocrName: 'పూర్తి పేరు',
    ocrDob: 'పుట్టిన తేదీ',
    ocrGender: 'లింగం',
    ocrAddress: 'చిరునామా',
    ocrIdNumber: 'ఆధార్ / గుర్తింపు సంఖ్య',
    yesCorrectBtn: '✓ అవును, సరైనది',
    correctBtn: '✏ సవరించండి',
    editDetailsTitle: 'సమాచారాన్ని సవరించండి',
    saveChangesBtn: 'సేవ్ చేసి కొనసాగించండి',
    smartMatchTitle: 'స్మార్ట్ ఫారమ్ పోలిక',
    smartMatchAutoFilled: 'ఆధార్ కార్డు నుండి లభించింది — ఫారమ్‌లో స్వయంచాలకంగా నింపబడింది!',
    smartMatchMissingTitle: 'మిగిలిన సమాచారం — వాయిస్ ద్వారా అడగబడుతుంది:',
    startVoiceFillingBtn: '🎤 వాయిస్ సహాయకుడిని ప్రారంభించండి',
    aiSpeaking: 'AI మాట్లాడుతోంది...',
    tapToSpeak: 'మాట్లాడటానికి నొక్కండి',
    listening: 'వింటున్నాను...',
    processingSpeech: 'మీ సమాధానాన్ని అర్థం చేసుకుంటున్నాను...',
    youSaid: 'మీరు చెప్పింది:',
    isThisCorrect: 'ఇది సరైనదేనా?',
    confirmYesBtn: '✓ అవును (సరి)',
    confirmNoRetryBtn: '↻ కాదు (మళ్లీ చెప్పండి)',
    manualTypeOption: 'మైక్ అందుబాటులో లేకపోతే టైప్ చేయడానికి ఇక్కడ నొక్కండి',
    typeYourAnswerPlaceholder: 'మీ సమాధానాన్ని ఇక్కడ టైప్ చేయండి...',
    submitAnswerBtn: 'సమాధానం సమర్పించండి',
    voiceErrorUtterance: 'క్షమించండి, మీ సమాధానం అర్థం కాలేదు. దయచేసి నెమ్మదిగా మళ్లీ చెప్పండి.',
    retrySpeakBtn: '↻ మళ్లీ మాట్లాడటానికి ప్రయత్నించండి',
    reviewTitle: 'దయచేసి మీ ఫారమ్‌ను తనిఖీ చేయండి',
    reviewSubtitle: 'మీ అసలు బ్యాంక్ ఫారమ్‌లో మీ వివరాలు నింపబడి క్రింద చూపబడ్డాయి.',
    looksCorrectBtn: '✓ సరిగ్గా ఉంది',
    editFieldBtn: '✏ ఫీల్డ్ సవరించండి',
    readAloudBtn: '🔊 చదివి వినిపించండి',
    readingAloudStatus: 'ఫారమ్ వివరాలను చదివి వినిపిస్తోంది...',
    stopReadingBtn: '⏹ చదవడం ఆపివేయండి',
    originalFormPreservedNotice: 'మీ అసలు ఫారమ్ లేఅవుట్ అలాగే ఉంచబడింది.',
    finalQuestion: 'మీ ఫారమ్ సిద్ధంగా ఉంది. దీన్ని పూర్తి చేయాలనుకుంటున్నారా?',
    finalYesBtn: '✓ అవును, పూర్తి చేయండి',
    finalNoBtn: '✕ కాదు, మళ్లీ చూడండి',
    completedTitle: 'మీ ఫారమ్ సిద్ధంగా ఉంది!',
    completedSubtitle: 'మీ బ్యాంక్ ఫారమ్ పూర్తిగా నింపబడింది మరియు సమర్పించడానికి సిద్ధంగా ఉంది.',
    downloadFormBtn: '📄 పూర్తి చేసిన ఫారమ్ డౌన్‌లోడ్ చేయండి',
    printFormBtn: '🖨 ఫారమ్ ప్రింట్ చేయండి',
    startNewFormBtn: '↺ కొత్త ఫారమ్ ప్రారంభించండి',
    downloadSuccessMessage: 'మీ పూర్తి చేసిన ఫారమ్ డౌన్‌లోడ్ చేయడానికి సిద్ధంగా ఉంది.',
    questions: {
      mobileNumber: 'దయచేసి మీ మొబైల్ నంబర్ చెప్పండి.',
      occupation: 'మీ వృత్తి లేదా పని ఏమిటి?',
      accountType: 'మీరు ఏ రకమైన ఖాతా తెరవాలనుకుంటున్నారు? సేవింగ్స్ లేదా కరెంట్ అని చెప్పండి.',
      gender: 'దయచేసి మీ లింగాన్ని చెప్పండి. పురుషుడు లేదా స్త్రీ అని చెప్పండి.',
      nomineeName: 'మీరు నామినీ పేరును తెలియజేయాలనుకుంటున్నారా?',
      annualIncome: 'దయచేసి మీ వార్షిక ఆదాయాన్ని చెప్పండి.',
      genericQuestion: (label) => `దయచేసి మీ ${label} చెప్పండి.`,
    },
    confirmUtterance: (val) => `మీరు ${val} అని చెప్పారు. ఇది సరైనదేనా?`,
    summarySpeech: (name, addr, phone, acc) =>
      `సారాంశం: మీ పేరు ${name}. మీ చిరునామా ${addr}. మీ మొబైల్ నంబర్ ${phone}. మీ ఖాతా రకం ${acc}. అంతా సరైన రీతిలో నింపబడింది.`,
  },

  ml: {
    appTitle: 'AI സ്മാർട്ട് ബാങ്ക് ഫോം അസിസ്റ്റന്റ്',
    appSubtitle: 'നിങ്ങളുടെ ശബ്ദവും തിരിച്ചറിയൽ രേഖയും ഉപയോഗിച്ച് ബാങ്ക് ഫോം പൂരിപ്പിക്കാൻ ഞാൻ സഹായിക്കാം.',
    bankCounterBadge: 'ബാങ്ക് കൗണ്ടർ അസിസ്റ്റന്റ്',
    startBtn: 'തുടങ്ങുക',
    changeLanguageBtn: '🌐 ഭാഷ (Malayalam)',
    selectLanguageTitle: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    selectLanguageDesc: 'അസിസ്റ്റന്റ് ഈ ഭാഷയിൽ സംസാരിക്കുകയും കേൾക്കുകയും ചെയ്യും.',
    demoModeNotice: 'ഡെമോ മോഡ് — വേഗത്തിൽ പരീക്ഷിക്കാൻ മാതൃകാ രേഖകൾ ലഭ്യമാണ്',
    sampleFormsTitle: 'അല്ലെങ്കിൽ മാതൃകാ ബാങ്ക് ഫോം തിരഞ്ഞെടുക്കുക:',
    uploadFormTitle: 'നിങ്ങളുടെ ബാങ്ക് ഫോം അപ്‌ലോഡ് ചെയ്യുക',
    uploadFormInstruction: 'നിങ്ങൾ പൂരിപ്പിക്കാൻ ആഗ്രഹിക്കുന്ന ബാങ്ക് ഫോം ദയവായി അപ്‌ലോഡ് ചെയ്യുക.',
    uploadFormButton: '📄 ബാങ്ക് ഫോം അപ്‌ലോഡ് ചെയ്യുക (PDF / JPG / PNG)',
    orChooseSampleForm: 'അല്ലെങ്കിൽ മാതൃകാ ബാങ്ക് ഫോം തിരഞ്ഞെടുക്കുക:',
    supportedFormats: 'PDF, JPG, JPEG, PNG ഫയലുകൾ പിന്തുണയ്ക്കുന്നു',
    fileNameLabel: 'തിരഞ്ഞെടുത്ത ഫയൽ:',
    continueBtn: 'തുടരുക',
    changeFileBtn: 'രേഖ മാറ്റുക',
    understandingForm: 'നിങ്ങളുടെ ഫോം മനസ്സിലാക്കുന്നു...',
    formUnderstood: 'ഫോം മനസ്സിലായി! ഫീൽഡുകൾ തയ്യാറാണ്.',
    fieldsDetectedCount: (n) => `നിങ്ങളുടെ യഥാർത്ഥ രേഖയിൽ ${n} ഫീൽഡുകൾ കണ്ടെത്തി`,
    uploadIdTitle: 'നിങ്ങളുടെ തിരിച്ചറിയൽ രേഖ അപ്‌ലോഡ് ചെയ്യുക',
    uploadIdInstruction: 'നിങ്ങളുടെ ആധാർ അല്ലെങ്കിൽ തിരിച്ചറിയൽ രേഖ ദയവായി അപ്‌ലോഡ് ചെയ്യുക.',
    uploadIdButton: '🪪 ആധാർ / തിരിച്ചറിയൽ കാർഡ് അപ്‌ലോഡ് ചെയ്യുക',
    orChooseSampleId: 'അല്ലെങ്കിൽ മാതൃകാ ആധാർ കാർഡ് തിരഞ്ഞെടുക്കുക:',
    readingId: 'നിങ്ങളുടെ തിരിച്ചറിയൽ രേഖ വായിക്കുന്നു...',
    idReadSuccess: 'തിരിച്ചറിയൽ രേഖ വിജയകരമായി വായിച്ചു',
    ocrFoundTitle: 'കണ്ടെത്തിയ വിവരങ്ങൾ:',
    ocrFoundSubtitle: 'നിങ്ങളുടെ തിരിച്ചറിയൽ രേഖയിൽ നിന്ന് എടുത്ത വിവരങ്ങൾ പരിശോധിക്കുക.',
    ocrName: 'പൂർണ്ണ നാമം',
    ocrDob: 'ജനന തീയതി',
    ocrGender: 'ലിംഗഭേദം',
    ocrAddress: 'മേൽവിലാസം',
    ocrIdNumber: 'ആധാർ / തിരിച്ചറിയൽ നമ്പർ',
    yesCorrectBtn: '✓ അതെ, ശരിയാണ്',
    correctBtn: '✏ തിരുത്തുക',
    editDetailsTitle: 'വിവരങ്ങൾ തിരുത്തുക',
    saveChangesBtn: 'സംരക്ഷിച്ച് തുടരുക',
    smartMatchTitle: 'സ്മാർട്ട് ഫോം പൊരുത്തപ്പെടുത്തൽ',
    smartMatchAutoFilled: 'ആധാർ കാർഡിൽ നിന്ന് ലഭിച്ചു — ഫോമിൽ സ്വയമേവ പൂരിപ്പിച്ചു!',
    smartMatchMissingTitle: 'വിട്ടുപോയ വിവരങ്ങൾ — ശബ്ദത്തിലൂടെ ചോദിക്കും:',
    startVoiceFillingBtn: '🎤 വോയ്‌സ് അസിസ്റ്റന്റ് തുടങ്ങുക',
    aiSpeaking: 'AI സംസാരിക്കുന്നു...',
    tapToSpeak: 'സംസാരിക്കാൻ തൊടുക',
    listening: 'കേൾക്കുന്നു...',
    processingSpeech: 'നിങ്ങളുടെ മറുപടി മനസ്സിലാക്കുന്നു...',
    youSaid: 'നിങ്ങൾ പറഞ്ഞത്:',
    isThisCorrect: 'ഇത് ശരിയാണോ?',
    confirmYesBtn: '✓ അതെ (ശരി)',
    confirmNoRetryBtn: '↻ അല്ല (വീണ്ടും പറയുക)',
    manualTypeOption: 'മൈക്ക് ലഭ്യമല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യാൻ ഇവിടെ തൊടുക',
    typeYourAnswerPlaceholder: 'നിങ്ങളുടെ ഉത്തരം ഇവിടെ ടൈപ്പ് ചെയ്യുക...',
    submitAnswerBtn: 'ഉത്തരം നൽകുക',
    voiceErrorUtterance: 'ക്ഷമിക്കണം, നിങ്ങളുടെ മറുപടി മനസ്സിലാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി സാവധാനം വീണ്ടും പറയുക.',
    retrySpeakBtn: '↻ വീണ്ടും സംസാരിക്കാൻ ശ്രമിക്കുക',
    reviewTitle: 'നിങ്ങളുടെ ഫോം പരിശോധിക്കുക',
    reviewSubtitle: 'നിങ്ങളുടെ യഥാർത്ഥ ബാങ്ക് ഫോമിൽ വിവരങ്ങൾ പൂരിപ്പിച്ച് താഴെ കാണിച്ചിരിക്കുന്നു.',
    looksCorrectBtn: '✓ എല്ലാം ശരിയാണ്',
    editFieldBtn: '✏ ഫീൽഡ് തിരുത്തുക',
    readAloudBtn: '🔊 വായിച്ചു കേൾപ്പിക്കുക',
    readingAloudStatus: 'ഫോം വിവരങ്ങൾ ഉച്ചത്തിൽ വായിക്കുന്നു...',
    stopReadingBtn: '⏹ വായന നിർത്തുക',
    originalFormPreservedNotice: 'നിങ്ങളുടെ യഥാർത്ഥ ഫോം രൂപരേഖ പൂർണ്ണമായും സംരക്ഷിച്ചിരിക്കുന്നു.',
    finalQuestion: 'നിങ്ങളുടെ ഫോം തയ്യാറാണ്. ഇത് പൂർത്തിയാക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?',
    finalYesBtn: '✓ അതെ, പൂർത്തിയാക്കുക',
    finalNoBtn: '✕ അല്ല, വീണ്ടും പരിശോധിക്കുക',
    completedTitle: 'നിങ്ങളുടെ ഫോം തയ്യാറാണ്!',
    completedSubtitle: 'നിങ്ങളുടെ ബാങ്ക് ഫോം പൂർണ്ണമായി പൂരിപ്പിച്ച് സമർപ്പിക്കാൻ തയ്യാറായിരിക്കുന്നു.',
    downloadFormBtn: '📄 പൂരിപ്പിച്ച ഫോം ഡൗൺലോഡ് ചെയ്യുക',
    printFormBtn: '🖨 ഫോം പ്രിന്റ് ചെയ്യുക',
    startNewFormBtn: '↺ പുതിയ ഫോം തുടങ്ങുക',
    downloadSuccessMessage: 'പൂരിപ്പിച്ച ഫോം ഡൗൺലോഡിനായി തയ്യാറാണ്.',
    questions: {
      mobileNumber: 'ദയവായി നിങ്ങളുടെ മൊബൈൽ നമ്പർ പറയുക.',
      occupation: 'നിങ്ങളുടെ ജോലി അല്ലെങ്കിൽ തൊഴിൽ എന്താണ്?',
      accountType: 'നിങ്ങൾക്ക് ഏത് തരത്തിലുള്ള അക്കൗണ്ട് വേണം? സേവിംഗ്സ് അല്ലെങ്കിൽ കറന്റ് എന്ന് പറയുക.',
      gender: 'ദയവായി നിങ്ങളുടെ ലിംഗഭേദം പറയുക. പുരുഷൻ അല്ലെങ്കിൽ സ്ത്രീ എന്ന് പറയുക.',
      nomineeName: 'നിങ്ങൾക്ക് നോമിനിയുടെ പേര് ചേർക്കാൻ ആഗ്രഹമുണ്ടോ?',
      annualIncome: 'നിങ്ങളുടെ വാർഷിക വരുമാനം എത്രയാണ്?',
      genericQuestion: (label) => `ദയവായി നിങ്ങളുടെ ${label} പറയുക.`,
    },
    confirmUtterance: (val) => `നിങ്ങൾ ${val} എന്ന് പറഞ്ഞു. ഇത് ശരിയാണോ?`,
    summarySpeech: (name, addr, phone, acc) =>
      `സംഗ്രഹം: നിങ്ങളുടെ പേര് ${name}. നിങ്ങളുടെ മേൽവിലാസം ${addr}. നിങ്ങളുടെ മൊബൈൽ നമ്പർ ${phone}. നിങ്ങളുടെ അക്കൗണ്ട് തരം ${acc}. എല്ലാം കൃത്യമായി പൂരിപ്പിച്ചിരിക്കുന്നു.`,
  },

  kn: {
    appTitle: 'AI ಸ್ಮಾರ್ಟ್ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಸಹಾಯಕ',
    appSubtitle: 'ನಿಮ್ಮ ಧ್ವನಿ ಮತ್ತು ಗುರುತಿನ ಚೀಟಿ ಬಳಸಿ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಅನ್ನು ಸುಲಭವಾಗಿ ಭರ್ತಿ ಮಾಡಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',
    bankCounterBadge: 'ಬ್ಯಾಂಕ್ ಕೌಂಟರ್ ಸಹಾಯಕ',
    startBtn: 'ಪ್ರಾರಂಭಿಸಿ',
    changeLanguageBtn: '🌐 ಭಾಷೆ (Kannada)',
    selectLanguageTitle: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectLanguageDesc: 'ಸಹಾಯಕರು ಈ ಭಾಷೆಯಲ್ಲೇ ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡುತ್ತಾರೆ ಮತ್ತು ಕೇಳುತ್ತಾರೆ.',
    demoModeNotice: 'ಡೆಮೊ ಮೋಡ್ — ತ್ವರಿತ ಪರೀಕ್ಷೆಗಾಗಿ ಮಾದರಿ ದಾಖಲೆಗಳು ಲಭ್ಯವಿದೆ',
    sampleFormsTitle: 'ಅಥವಾ ಮಾದರಿ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಆಯ್ಕೆಮಾಡಿ:',
    uploadFormTitle: 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadFormInstruction: 'ದಯವಿಟ್ಟು ನೀವು ಭರ್ತಿ ಮಾಡಲು ಬಯಸುವ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    uploadFormButton: '📄 ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (PDF / JPG / PNG)',
    orChooseSampleForm: 'ಅಥವಾ ಮಾದರಿ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    supportedFormats: 'PDF, JPG, JPEG ಮತ್ತು PNG ಫೈಲ್‌ಗಳು ಬೆಂಬಲಿತವಾಗಿವೆ',
    fileNameLabel: 'ಆಯ್ಕೆಮಾಡಿದ ಫೈಲ್:',
    continueBtn: 'ಮುಂದುವರಿಯಿರಿ',
    changeFileBtn: 'ದಾಖಲೆ ಬದಲಾಯಿಸಿ',
    understandingForm: 'ನಿಮ್ಮ ಫಾರ್ಮ್ ಅನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...',
    formUnderstood: 'ಫಾರ್ಮ್ ಅರ್ಥವಾಯಿತು! ಕ್ಷೇತ್ರಗಳು ಸಿದ್ಧವಾಗಿವೆ.',
    fieldsDetectedCount: (n) => `ನಿಮ್ಮ ಮೂಲ ದಾಖಲೆಯಲ್ಲಿ ${n} ಕ್ಷೇತ್ರಗಳು ಪತ್ತೆಯಾಗಿವೆ`,
    uploadIdTitle: 'ನಿಮ್ಮ ಗುರುತಿನ ಚೀಟಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadIdInstruction: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆಧಾರ್ ಅಥವಾ ಗುರುತಿನ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    uploadIdButton: '🪪 ಆಧಾರ್ / ಗುರುತಿನ ಚೀಟಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    orChooseSampleId: 'ಅಥವಾ ಮಾದರಿ ಆಧಾರ್ ಕಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ:',
    readingId: 'ನಿಮ್ಮ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಓದಲಾಗುತ್ತಿದೆ...',
    idReadSuccess: 'ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಓದಲಾಗಿದೆ',
    ocrFoundTitle: 'ನಿಮ್ಮ ವಿವರಗಳು ಕಂಡುಬಂದಿವೆ:',
    ocrFoundSubtitle: 'ನಿಮ್ಮ ಗುರುತಿನ ದಾಖಲೆಯಿಂದ ಪಡೆದ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    ocrName: 'ಪೂರ್ಣ ಹೆಸರು',
    ocrDob: 'ಹುಟ್ಟಿದ ದಿನಾಂಕ',
    ocrGender: 'ಲಿಂಗ',
    ocrAddress: 'ವಿಳಾಸ',
    ocrIdNumber: 'ಆಧಾರ್ / ಗುರುತಿನ ಸಂಖ್ಯೆ',
    yesCorrectBtn: '✓ ಹೌದು, ಸರಿಯಾಗಿದೆ',
    correctBtn: '✏ ತಿದ್ದುಪಡಿ ಮಾಡಿ',
    editDetailsTitle: 'ಮಾಹಿತಿಯನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡಿ',
    saveChangesBtn: 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ',
    smartMatchTitle: 'ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ಹೋಲಿಕೆ',
    smartMatchAutoFilled: 'ಆಧಾರ್ ಕಾರ್ಡ್‌ನಿಂದ ಲಭಿಸಿದೆ — ಫಾರ್ಮ್‌ನಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ!',
    smartMatchMissingTitle: 'ಬಿಟ್ಟುಹೋದ ಮಾಹಿತಿ — ಧ್ವನಿಯ ಮೂಲಕ ಕೇಳಲಾಗುತ್ತದೆ:',
    startVoiceFillingBtn: '🎤 ಧ್ವನಿ ಸಹಾಯಕವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    aiSpeaking: 'AI ಮಾತನಾಡುತ್ತಿದೆ...',
    tapToSpeak: 'ಮಾತನಾಡಲು ಒತ್ತಿರಿ',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...',
    processingSpeech: 'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...',
    youSaid: 'ನೀವು ಹೇಳಿದ್ದು:',
    isThisCorrect: 'ಇದು ಸರಿಯೇ?',
    confirmYesBtn: '✓ ಹೌದು (ಸರಿ)',
    confirmNoRetryBtn: '↻ ಇಲ್ಲ (ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ)',
    manualTypeOption: 'ಮೈಕ್ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಟೈಪ್ ಮಾಡಲು ಇಲ್ಲಿ ಒತ್ತಿರಿ',
    typeYourAnswerPlaceholder: 'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    submitAnswerBtn: 'ಉತ್ತರ ಸಲ್ಲಿಸಿ',
    voiceErrorUtterance: 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.',
    retrySpeakBtn: '↻ ಮತ್ತೊಮ್ಮೆ ಮಾತನಾಡಲು ಪ್ರಯತ್ನಿಸಿ',
    reviewTitle: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಫಾರ್ಮ್ ಪರಿಶೀಲಿಸಿ',
    reviewSubtitle: 'ನಿಮ್ಮ ಮೂಲ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್‌ನಲ್ಲಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಕೆಳಗೆ ತೋರಿಸಲಾಗಿದೆ.',
    looksCorrectBtn: '✓ ಸರಿಯಾಗಿದೆ',
    editFieldBtn: '✏ ಕ್ಷೇತ್ರ ತಿದ್ದುಪಡಿ',
    readAloudBtn: '🔊 ಓದಿ ಕೇಳಿಸಿ',
    readingAloudStatus: 'ಫಾರ್ಮ್ ವಿವರಗಳನ್ನು ಗಟ್ಟಿಯಾಗಿ ಓದಲಾಗುತ್ತಿದೆ...',
    stopReadingBtn: '⏹ ಓದುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
    originalFormPreservedNotice: 'ನಿಮ್ಮ ಮೂಲ ಫಾರ್ಮ್ ವಿನ್ಯಾಸವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ.',
    finalQuestion: 'ನಿಮ್ಮ ಫಾರ್ಮ್ ಸಿದ್ಧವಾಗಿದೆ. ನೀವು ಅದನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಬಯಸುತ್ತೀರಾ?',
    finalYesBtn: '✓ ಹೌದು, ಪೂರ್ಣಗೊಳಿಸಿ',
    finalNoBtn: '✕ ಇಲ್ಲ, ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ',
    completedTitle: 'ನಿಮ್ಮ ಫಾರ್ಮ್ ಸಿದ್ಧವಾಗಿದೆ!',
    completedSubtitle: 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಸಂಪೂರ್ಣವಾಗಿ ಭರ್ತಿಯಾಗಿದೆ ಮತ್ತು ಸಲ್ಲಿಸಲು ಸಿದ್ಧವಾಗಿದೆ.',
    downloadFormBtn: '📄 ಭರ್ತಿ ಮಾಡಿದ ಫಾರ್ಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    printFormBtn: '🖨 ಫಾರ್ಮ್ ಪ್ರಿಂಟ್ ಮಾಡಿ',
    startNewFormBtn: '↺ ಹೊಸ ಫಾರ್ಮ್ ಪ್ರಾರಂಭಿಸಿ',
    downloadSuccessMessage: 'ನಿಮ್ಮ ಪೂರ್ಣಗೊಂಡ ಫಾರ್ಮ್ ಡೌನ್‌ಲೋಡ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ.',
    questions: {
      mobileNumber: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ತಿಳಿಸಿ.',
      occupation: 'ನಿಮ್ಮ ಉದ್ಯೋಗ ಅಥವಾ ಕೆಲಸ ಯಾವುದು?',
      accountType: 'ನೀವು ಯಾವ ರೀತಿಯ ಖಾತೆಯನ್ನು ಬಯಸುತ್ತೀರಿ? ಉಳಿತಾಯ ಅಥವಾ ಚಾಲ್ತಿ ಎಂದು ಹೇಳಿ.',
      gender: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಲಿಂಗವನ್ನು ತಿಳಿಸಿ. ಪುರುಷ ಅಥವಾ ಮಹಿಳೆ ಎಂದು ಹೇಳಿ.',
      nomineeName: 'ನೀವು ನಾಮಿನಿ ಹೆಸರನ್ನು ಸೇರಿಸಲು ಬಯಸುತ್ತೀರಾ?',
      annualIncome: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ತಿಳಿಸಿ.',
      genericQuestion: (label) => `ದಯವಿಟ್ಟು ನಿಮ್ಮ ${label} ತಿಳಿಸಿ.`,
    },
    confirmUtterance: (val) => `ನೀವು ${val} ಎಂದು ಹೇಳಿದ್ದೀರಿ. ಇದು ಸರಿಯೇ?`,
    summarySpeech: (name, addr, phone, acc) =>
      `ಸಾರಾಂಶ: ನಿಮ್ಮ ಹೆಸರು ${name}. ನಿಮ್ಮ ವಿಳಾಸ ${addr}. ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ${phone}. ನಿಮ್ಮ ಖಾತೆ ಪ್ರಕಾರ ${acc}. ಎಲ್ಲವನ್ನೂ ಸರಿಯಾಗಿ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ.`,
  },
};
