import { BankDocument, IDDocument } from '../types';

// Helper to encode SVG string to data URI
function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

// 1. Realistic State Bank of India Account Opening Form
const SBI_FORM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="100%" height="100%">
  <rect width="800" height="1100" fill="#fdfdfb" stroke="#cbd5e1" stroke-width="2"/>
  
  <!-- Header Banner -->
  <rect x="30" y="25" width="740" height="75" fill="#1e3a8a" rx="4"/>
  <circle cx="70" cy="62" r="22" fill="#ffffff"/>
  <circle cx="70" cy="62" r="16" fill="#1e3a8a"/>
  <rect x="67" y="62" width="6" height="16" fill="#ffffff"/>
  
  <text x="110" y="55" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" letter-spacing="1">STATE BANK OF INDIA</text>
  <text x="110" y="78" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" fill="#bfdbfe">ACCOUNT OPENING FORM FOR RESIDENT INDIVIDUALS (FORM-1)</text>
  <text x="660" y="52" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#93c5fd">Branch Code: 0421</text>
  <text x="660" y="70" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#93c5fd">Date: [ __ / __ / 2026 ]</text>
  
  <!-- Photo Box -->
  <rect x="630" y="115" width="130" height="150" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="4 4" rx="4"/>
  <text x="695" y="185" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Affix Recent</text>
  <text x="695" y="202" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Photograph</text>
  <text x="695" y="220" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">(3.5cm x 4.5cm)</text>

  <!-- Section 1: Personal Details -->
  <rect x="30" y="115" width="580" height="28" fill="#e2e8f0" rx="2"/>
  <text x="45" y="134" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">1. PERSONAL INFORMATION (AS PER IDENTITY PROOF)</text>

  <!-- Full Name -->
  <text x="45" y="170" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">1.1 Full Name of Applicant:</text>
  <rect x="210" y="152" width="390" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Date of Birth -->
  <text x="45" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">1.2 Date of Birth:</text>
  <rect x="210" y="198" width="180" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>
  <text x="220" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#94a3b8">DD / MM / YYYY</text>

  <!-- Gender -->
  <text x="415" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">1.3 Gender:</text>
  <rect x="475" y="203" width="14" height="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="495" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#334155">Male</text>
  <rect x="535" y="203" width="14" height="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="555" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#334155">Female</text>

  <!-- Address -->
  <text x="45" y="260" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">1.4 Permanent / Residential Address:</text>
  <rect x="210" y="244" width="390" height="52" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>
  <line x1="210" y1="270" x2="600" y2="270" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Section 2: Contact Details -->
  <rect x="30" y="320" width="740" height="28" fill="#e2e8f0" rx="2"/>
  <text x="45" y="339" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">2. CONTACT &amp; COMMUNICATIONS DETAILS</text>

  <!-- Mobile Number -->
  <text x="45" y="380" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">2.1 Mobile / Telephone Number:</text>
  <rect x="240" y="362" width="280" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>
  <text x="250" y="380" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#94a3b8">+91 - [ 10 Digits ]</text>

  <!-- Section 3: Occupation & Livelihood -->
  <rect x="30" y="420" width="740" height="28" fill="#e2e8f0" rx="2"/>
  <text x="45" y="439" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">3. OCCUPATION &amp; FINANCIAL PROFILE</text>

  <!-- Occupation -->
  <text x="45" y="480" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">3.1 Occupation / Source of Livelihood:</text>
  <rect x="280" y="462" width="320" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Section 4: Account Details -->
  <rect x="30" y="520" width="740" height="28" fill="#e2e8f0" rx="2"/>
  <text x="45" y="539" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">4. ACCOUNT TYPE &amp; SERVICES REQUIRED</text>

  <!-- Account Type -->
  <text x="45" y="580" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">4.1 Type of Account Required:</text>
  <rect x="240" y="565" width="16" height="16" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="265" y="578" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#0f172a" font-weight="500">Savings Account</text>
  
  <rect x="420" y="565" width="16" height="16" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="445" y="578" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#0f172a" font-weight="500">Current Account</text>

  <!-- Section 5: Nominee Details -->
  <rect x="30" y="620" width="740" height="28" fill="#e2e8f0" rx="2"/>
  <text x="45" y="639" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">5. NOMINATION FORM DA-1 (OPTIONAL)</text>

  <!-- Nominee Name -->
  <text x="45" y="680" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">5.1 Name of Nominee:</text>
  <rect x="210" y="662" width="390" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Section 6: Declaration & Signatures -->
  <rect x="30" y="720" width="740" height="28" fill="#e2e8f0" rx="2"/>
  <text x="45" y="739" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">6. APPLICANT DECLARATION &amp; SPECIMEN SIGNATURE</text>
  
  <text x="45" y="775" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#64748b">I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief.</text>
  <text x="45" y="792" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#64748b">I undertake to inform you of any changes therein, immediately. Aadhaar KYC verified.</text>

  <!-- Specimen Signature Box -->
  <rect x="45" y="820" width="280" height="90" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="185" y="865" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Signature / Thumb Impression of Customer</text>
  <text x="185" y="885" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" fill="#cbd5e1" text-anchor="middle">(Assisted by Bank Kiosk AI)</text>

  <!-- Bank Officer Box -->
  <rect x="450" y="820" width="320" height="90" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" rx="4"/>
  <text x="465" y="845" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" font-weight="bold" fill="#475569">FOR BANK USE ONLY:</text>
  <text x="465" y="865" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" fill="#64748b">Account No: ______________________</text>
  <text x="465" y="885" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" fill="#64748b">KYC Verification: Verified / Validated</text>
  <text x="465" y="900" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" fill="#64748b">Authorized Bank Officer Sign: ________</text>

  <!-- Official Footer -->
  <line x1="30" y1="940" x2="770" y2="940" stroke="#cbd5e1" stroke-width="1"/>
  <text x="45" y="960" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" fill="#94a3b8">State Bank of India — Kiosk &amp; Counter Assisted Digital KYC Form — Compliance with RBI Master Direction (KYC) 2016.</text>
</svg>`;

// 2. Realistic Canara Bank Savings Account Form
const CANARA_FORM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="100%" height="100%">
  <rect width="800" height="1100" fill="#fffdf9" stroke="#cbd5e1" stroke-width="2"/>
  
  <!-- Header Banner -->
  <rect x="30" y="25" width="740" height="75" fill="#0284c7" rx="4"/>
  <rect x="45" y="42" width="40" height="40" fill="#facc15" rx="6"/>
  <text x="65" y="68" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="bold" fill="#0284c7" text-anchor="middle">CB</text>
  
  <text x="100" y="55" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff" letter-spacing="1">CANARA BANK</text>
  <text x="100" y="78" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" fill="#e0f2fe">SAVINGS BANK CUSTOMER ONBOARDING FORM (KIOSK ASSISTED)</text>
  <text x="640" y="60" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#ffffff">FORM NO: CB-SB-104</text>

  <!-- Photo Box -->
  <rect x="630" y="115" width="130" height="150" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="4 4" rx="4"/>
  <text x="695" y="185" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Customer Photo</text>

  <!-- Section: Applicant Particulars -->
  <rect x="30" y="115" width="580" height="28" fill="#e0f2fe" rx="2"/>
  <text x="45" y="134" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">A. APPLICANT INFORMATION</text>

  <!-- Name -->
  <text x="45" y="170" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Name in Full:</text>
  <rect x="180" y="152" width="420" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- DOB -->
  <text x="45" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Date of Birth:</text>
  <rect x="180" y="198" width="190" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Gender -->
  <text x="400" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Gender:</text>
  <rect x="460" y="203" width="14" height="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="480" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#334155">Male</text>
  <rect x="525" y="203" width="14" height="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="545" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#334155">Female</text>

  <!-- Address -->
  <text x="45" y="260" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Address for Communication:</text>
  <rect x="180" y="244" width="420" height="52" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Section B: Contact Info -->
  <rect x="30" y="320" width="740" height="28" fill="#e0f2fe" rx="2"/>
  <text x="45" y="339" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">B. CONTACT &amp; OCCUPATION</text>

  <!-- Mobile -->
  <text x="45" y="380" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Mobile Number:</text>
  <rect x="180" y="362" width="280" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Occupation -->
  <text x="45" y="430" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Occupation:</text>
  <rect x="180" y="412" width="320" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Section C: Account Scheme -->
  <rect x="30" y="470" width="740" height="28" fill="#e0f2fe" rx="2"/>
  <text x="45" y="489" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">C. ACCOUNT SCHEME</text>

  <text x="45" y="530" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Account Choice:</text>
  <rect x="180" y="515" width="16" height="16" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="205" y="528" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#0f172a">Savings Bank</text>
  <rect x="350" y="515" width="16" height="16" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="375" y="528" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#0f172a">Current Account</text>

  <!-- Nominee -->
  <rect x="30" y="570" width="740" height="28" fill="#e0f2fe" rx="2"/>
  <text x="45" y="589" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">D. NOMINATION</text>
  <text x="45" y="630" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#334155">Nominee Name:</text>
  <rect x="180" y="612" width="360" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="3"/>

  <!-- Signature Box -->
  <rect x="45" y="690" width="280" height="90" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="185" y="740" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Customer Signature / Thumbprint</text>
</svg>`;

// Realistic Aadhaar 1 (Tamil Nadu / South India)
const AADHAAR_1_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 410" width="100%" height="100%">
  <!-- Card Background -->
  <rect width="650" height="410" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Top Indian Flag Color Bar -->
  <rect x="0" y="0" width="650" height="12" fill="#ff9933" rx="14 14 0 0"/>
  
  <!-- Header Zone -->
  <circle cx="50" cy="55" r="24" fill="#f8fafc" stroke="#cbd5e1"/>
  <!-- Ashoka Pillar silhouette representation -->
  <rect x="45" y="38" width="10" height="25" fill="#b45309" rx="2"/>
  <circle cx="50" cy="40" r="7" fill="#b45309"/>

  <text x="90" y="48" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">भारत सरकार / Government of India</text>
  <text x="90" y="68" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#475569">भारतीय विशिष्ट पहचान प्राधिकरण / UIDAI</text>

  <!-- Red Sunburst Aadhaar Logo -->
  <g transform="translate(560, 30)">
    <circle cx="28" cy="28" r="20" fill="#dc2626"/>
    <circle cx="28" cy="28" r="14" fill="#fbbf24"/>
    <circle cx="28" cy="28" r="8" fill="#dc2626"/>
  </g>

  <!-- Divider line -->
  <line x1="20" y1="90" x2="630" y2="90" stroke="#f97316" stroke-width="2"/>

  <!-- Customer Photo Box -->
  <rect x="35" y="115" width="120" height="150" fill="#f1f5f9" stroke="#94a3b8" rx="8"/>
  <circle cx="95" cy="165" r="32" fill="#cbd5e1"/>
  <path d="M 60 250 Q 95 210 130 250 Z" fill="#cbd5e1"/>

  <!-- Text Details -->
  <!-- Name -->
  <text x="180" y="135" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">பெயர் / Name:</text>
  <text x="180" y="158" font-family="'Plus Jakarta Sans', 'Noto Sans Tamil', Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">கே. ராமநாதன் / K. Ramanathan</text>

  <!-- Date of Birth -->
  <text x="180" y="190" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">பிறந்த தேதி / DOB:</text>
  <text x="310" y="190" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">14/08/1958</text>

  <!-- Gender -->
  <text x="180" y="218" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">பாலினம் / Gender:</text>
  <text x="310" y="218" font-family="'Plus Jakarta Sans', 'Noto Sans Tamil', Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">ஆண் / Male</text>

  <!-- Address -->
  <text x="180" y="246" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">முகவரி / Address:</text>
  <text x="180" y="268" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" fill="#1e293b">No 42, Gandhi Road, Mylapore,</text>
  <text x="180" y="286" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" fill="#1e293b">Chennai, Tamil Nadu - 600004</text>

  <!-- QR Code representation -->
  <rect x="525" y="180" width="85" height="85" fill="#f8fafc" stroke="#64748b" rx="4"/>
  <rect x="535" y="190" width="20" height="20" fill="#0f172a"/>
  <rect x="580" y="190" width="20" height="20" fill="#0f172a"/>
  <rect x="535" y="235" width="20" height="20" fill="#0f172a"/>
  <rect x="565" y="220" width="15" height="15" fill="#0f172a"/>

  <!-- Aadhaar Number (Large bold 12-digit / masked) -->
  <rect x="0" y="325" width="650" height="70" fill="#f8fafc" stroke="#e2e8f0" rx="0 0 14 14"/>
  <text x="325" y="368" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="28" font-weight="bold" fill="#dc2626" text-anchor="middle" letter-spacing="4">XXXX  XXXX  8921</text>
  <text x="325" y="388" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">ஆதார் - சாதாரண மனிதனின் உரிமை / Mera Aadhaar, Meri Pehchan</text>

  <!-- Bottom green stripe -->
  <rect x="0" y="402" width="650" height="8" fill="#15803d" rx="0 0 14 14"/>
</svg>`;

// Realistic Aadhaar 2 (Hindi / North India)
const AADHAAR_2_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 410" width="100%" height="100%">
  <rect width="650" height="410" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="0" y="0" width="650" height="12" fill="#ff9933" rx="14 14 0 0"/>
  
  <circle cx="50" cy="55" r="24" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="45" y="38" width="10" height="25" fill="#b45309" rx="2"/>
  <circle cx="50" cy="40" r="7" fill="#b45309"/>

  <text x="90" y="48" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">भारत सरकार / Government of India</text>
  <text x="90" y="68" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#475569">भारतीय विशिष्ट पहचान प्राधिकरण / UIDAI</text>

  <g transform="translate(560, 30)">
    <circle cx="28" cy="28" r="20" fill="#dc2626"/>
    <circle cx="28" cy="28" r="14" fill="#fbbf24"/>
    <circle cx="28" cy="28" r="8" fill="#dc2626"/>
  </g>

  <line x1="20" y1="90" x2="630" y2="90" stroke="#f97316" stroke-width="2"/>

  <!-- Customer Photo Box -->
  <rect x="35" y="115" width="120" height="150" fill="#f1f5f9" stroke="#94a3b8" rx="8"/>
  <circle cx="95" cy="165" r="32" fill="#cbd5e1"/>
  <path d="M 60 250 Q 95 210 130 250 Z" fill="#cbd5e1"/>

  <!-- Name -->
  <text x="180" y="135" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">नाम / Name:</text>
  <text x="180" y="158" font-family="'Plus Jakarta Sans', 'Noto Sans Devanagari', Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">सुनीता देवी शर्मा / Sunita Devi Sharma</text>

  <!-- DOB -->
  <text x="180" y="190" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">जन्म तिथि / DOB:</text>
  <text x="310" y="190" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">05/11/1962</text>

  <!-- Gender -->
  <text x="180" y="218" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">लिंग / Gender:</text>
  <text x="310" y="218" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">महिला / Female</text>

  <!-- Address -->
  <text x="180" y="246" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" fill="#64748b">पता / Address:</text>
  <text x="180" y="268" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" fill="#1e293b">Flat 302, Shanti Vihar, Civil Lines,</text>
  <text x="180" y="286" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" fill="#1e293b">Jaipur, Rajasthan - 302006</text>

  <rect x="525" y="180" width="85" height="85" fill="#f8fafc" stroke="#64748b" rx="4"/>
  <rect x="535" y="190" width="20" height="20" fill="#0f172a"/>
  <rect x="580" y="190" width="20" height="20" fill="#0f172a"/>
  <rect x="535" y="235" width="20" height="20" fill="#0f172a"/>
  <rect x="565" y="220" width="15" height="15" fill="#0f172a"/>

  <rect x="0" y="325" width="650" height="70" fill="#f8fafc" stroke="#e2e8f0" rx="0 0 14 14"/>
  <text x="325" y="368" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="28" font-weight="bold" fill="#dc2626" text-anchor="middle" letter-spacing="4">XXXX  XXXX  4153</text>
  <text x="325" y="388" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">मेरा आधार, मेरी पहचान</text>
  <rect x="0" y="402" width="650" height="8" fill="#15803d" rx="0 0 14 14"/>
</svg>`;

export const SAMPLE_BANK_DOCUMENTS: BankDocument[] = [
  {
    id: 'sbi_form_1',
    name: 'State Bank of India — Account Opening Form (Form-1)',
    previewUrl: svgToDataUrl(SBI_FORM_SVG),
    pageCount: 1,
    isDemo: true,
    fields: [
      {
        key: 'fullName',
        label: 'Full Name of Applicant',
        type: 'text',
        box: { x: 26.5, y: 14.1, width: 48, height: 2.4 },
        category: 'personal',
      },
      {
        key: 'dob',
        label: 'Date of Birth (DD/MM/YYYY)',
        type: 'date',
        box: { x: 26.5, y: 18.2, width: 22, height: 2.4 },
        category: 'personal',
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'choice',
        options: ['Male', 'Female'],
        box: { x: 60, y: 18.2, width: 20, height: 2.4 },
        category: 'personal',
      },
      {
        key: 'address',
        label: 'Permanent / Residential Address',
        type: 'text',
        box: { x: 26.5, y: 22.4, width: 48, height: 4.8 },
        category: 'personal',
      },
      {
        key: 'mobileNumber',
        label: 'Mobile / Contact Number',
        type: 'phone',
        box: { x: 30.5, y: 33.2, width: 34, height: 2.4 },
        category: 'contact',
      },
      {
        key: 'occupation',
        label: 'Occupation / Source of Livelihood',
        type: 'text',
        box: { x: 35.5, y: 42.2, width: 39, height: 2.4 },
        category: 'banking',
      },
      {
        key: 'accountType',
        label: 'Account Type',
        type: 'choice',
        options: ['Savings Account', 'Current Account'],
        box: { x: 30.5, y: 51.5, width: 34, height: 2.4 },
        category: 'banking',
      },
      {
        key: 'nomineeName',
        label: 'Nominee Name (Optional)',
        type: 'text',
        box: { x: 26.5, y: 60.5, width: 48, height: 2.4 },
        category: 'banking',
      },
    ],
  },
  {
    id: 'canara_form_1',
    name: 'Canara Bank — Savings Customer Onboarding Form',
    previewUrl: svgToDataUrl(CANARA_FORM_SVG),
    pageCount: 1,
    isDemo: true,
    fields: [
      {
        key: 'fullName',
        label: 'Name in Full',
        type: 'text',
        box: { x: 23, y: 14.1, width: 52, height: 2.4 },
        category: 'personal',
      },
      {
        key: 'dob',
        label: 'Date of Birth',
        type: 'date',
        box: { x: 23, y: 18.2, width: 23, height: 2.4 },
        category: 'personal',
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'choice',
        options: ['Male', 'Female'],
        box: { x: 58, y: 18.2, width: 20, height: 2.4 },
        category: 'personal',
      },
      {
        key: 'address',
        label: 'Address for Communication',
        type: 'text',
        box: { x: 23, y: 22.4, width: 52, height: 4.8 },
        category: 'personal',
      },
      {
        key: 'mobileNumber',
        label: 'Mobile Number',
        type: 'phone',
        box: { x: 23, y: 33.2, width: 35, height: 2.4 },
        category: 'contact',
      },
      {
        key: 'occupation',
        label: 'Occupation',
        type: 'text',
        box: { x: 23, y: 37.8, width: 40, height: 2.4 },
        category: 'banking',
      },
      {
        key: 'accountType',
        label: 'Account Scheme',
        type: 'choice',
        options: ['Savings Bank', 'Current Account'],
        box: { x: 23, y: 47.0, width: 35, height: 2.4 },
        category: 'banking',
      },
      {
        key: 'nomineeName',
        label: 'Nominee Name',
        type: 'text',
        box: { x: 23, y: 56.0, width: 45, height: 2.4 },
        category: 'banking',
      },
    ],
  },
];

export const SAMPLE_ID_DOCUMENTS: IDDocument[] = [
  {
    id: 'aadhaar_ramanathan',
    name: 'Aadhaar Card — K. Ramanathan (Chennai, TN)',
    previewUrl: svgToDataUrl(AADHAAR_1_SVG),
    idType: 'Aadhaar Card',
    isDemo: true,
    extractedData: {
      fullName: 'K. Ramanathan',
      dob: '14/08/1958',
      gender: 'Male',
      address: 'No 42, Gandhi Road, Mylapore, Chennai, Tamil Nadu - 600004',
      idNumber: 'XXXX XXXX 8921',
      idType: 'Aadhaar Card',
    },
  },
  {
    id: 'aadhaar_sunita',
    name: 'Aadhaar Card — Sunita Devi Sharma (Jaipur, RJ)',
    previewUrl: svgToDataUrl(AADHAAR_2_SVG),
    idType: 'Aadhaar Card',
    isDemo: true,
    extractedData: {
      fullName: 'Sunita Devi Sharma',
      dob: '05/11/1962',
      gender: 'Female',
      address: 'Flat 302, Shanti Vihar, Civil Lines, Jaipur, Rajasthan - 302006',
      idNumber: 'XXXX XXXX 4153',
      idType: 'Aadhaar Card',
    },
  },
];
