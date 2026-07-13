import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Clock, ShieldCheck, CreditCard, LogOut, 
  ArrowUpRight, LayoutDashboard, Briefcase, BellRing, 
  Activity, Sun, Moon, Target, Zap, TrendingDown,
  Calendar, DollarSign, AlertCircle, CheckCircle, Volume2, Upload, Sparkles, Filter,
  BookOpen, ShieldAlert, Gift, MessageSquare, User as UserIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { deleteSavedStrategy, getSavedStrategies } from '../services/savedStrategy';
import { useLocation } from 'react-router-dom';

// --- TRANSLATION SYSTEM FOR KASHMIR ---
const translations = {
  en: {
    dashboardTitle: "Welcome back, Aamir",
    dashboardSubtitle: "Raah-e-Maal - Empowering J&K's Financial Resilience",
    activeBalance: "Active Balance",
    liabilityDistribution: "Liability Distribution",
    totalDebt: "Total Outstanding Loan",
    savedPlan: "Repayment Strategy",
    savings: "Total Saved",
    financialStress: "Financial Health Score",
    loansTitle: "Local Bank & Cooperative Loans",
    loansSubtitle: "Track and manage your local J&K accounts",
    addLoan: "Register Local J&K Loan",
    ocrTitle: "Smart Loan Import",
    ocrPlaceholder: "Upload a loan PDF or statement to automatically import amount, interest, EMI, and due date.",
    recommenderTitle: "Government Schemes Recommender",
    seasonalTitle: "Apple & Saffron Seasonal Income Planner",
    winterCalculatorTitle: "Winter Financial Preparedness Planner",
    winterAlert: "Chillai Kalan Lean Season Advisory",
    offlineMode: "Offline Mode Status",
    voiceAssistant: "AI Financial Voice Guide",
    milestone: "Repayment Progress",
    assetAllocation: "Sector-wise Exposure",
    strategyVault: "Seasonal Advisory Vault",
    strategyTitle: "Flexible Harvest Payoff",
    strategyDesc: "Pay larger EMIs during Sep-Nov harvests, and minimal EMIs in dry winter months to avoid interest penalties.",
    focusLabel: "Monthly Focus",
    horizonLabel: "Horizon",
    savedOnLabel: "Saved On",
    activeLoansLabel: "Active local loans",
    viewDetails: "View Details",
    viewingDetails: "Viewing Details",
    loanDetails: "Loan Details",
    snapshot: "Account Snapshot",
    repaymentProgress: "Repayment progress",
    estMonthlyPayment: "Est. monthly payment",
    whatChanged: "What Changed",
    selectedLoanLabel: "Selected loan",
    loanStatusLabel: "Loan status",
    interestProfile: "Interest profile",
    totalLoansLabel: "Total Loans",
    totalAmountLabel: "Total Amount",
    avgInterestLabel: "Avg Interest",
    alertCenter: "Alert Center",
    notificationsTitle: "Notifications",
    totalNotifications: "Total Notifications",
    unreadLabel: "Unread Alerts",
    paymentAlerts: "Payment Alerts",
    approvalsLabel: "Approvals",
    scanBtn: "Import & Auto-Fill Statement",
    scanning: "Importing & Extracting Loan Details...",
    scanSuccess: "Statement successfully imported! Loan parameters populated below.",
    extraPaymentLabel: "Extra Payment",
    extraPaymentPlaceholder: "Enter extra monthly payment...",
  },
  ur: {
    dashboardTitle: "خوش آمدید، عامر صاحب",
    dashboardSubtitle: "راہِ مال - جموں و کشمیر کی مالی لچک کو فروغ دینا",
    activeBalance: "فعال قرض کی رقم",
    liabilityDistribution: "قرضوں کی تقسیم",
    totalDebt: "کل بقایا قرضہ",
    savedPlan: "ادائیگی کی حکمت عملی",
    savings: "کل بچت",
    financialStress: "مالیاتی صحت کا سکور",
    loansTitle: "مقامی بینک اور کوآپریٹیو قرضے",
    loansSubtitle: "اپنے مقامی جموں و کشمیر بینک کھاتوں کو ٹریک کریں",
    addLoan: "نیا قرض درج کریں",
    ocrTitle: "سمارٹ لون امپورٹ",
    ocrPlaceholder: "قرضہ دستاویز اپ لوڈ کریں تاکہ رقم، سود اور ادائیگی کی تاریخیں خودکار طریقے سے امپورٹ ہو سکیں...",
    recommenderTitle: "سرکاری اسکیموں کا مشیر",
    seasonalTitle: "سیب اور زعفران موسمی آمدنی کا منصوبہ ساز",
    winterCalculatorTitle: "سرمائی مالیاتی تیاری کا منصوبہ ساز",
    winterAlert: "چلّہ کلان سیزن ایڈوائزری",
    offlineMode: "آف لائن وضع کی حیثیت",
    voiceAssistant: "مالیاتی وائس گائیڈ",
    milestone: "قرضہ ادائیگی کی شرح",
    assetAllocation: "سیکٹر کے لحاظ سے تقسیم",
    strategyVault: "موسمی مشاورتی والٹ",
    strategyTitle: "لچکدار سیزنل ادائیگی",
    strategyDesc: "ستمبر سے نومبر کی کٹائی کے دوران زیادہ EMI ادا کریں، اور سود کے جرمانے سے بچنے کے لیے خشک سردیوں کے مہینوں میں کم سے کم EMI ادا کریں۔",
    focusLabel: "ماہانہ توجہ",
    horizonLabel: "دورانیہ",
    savedOnLabel: "محفوظ تاریخ",
    activeLoansLabel: "فعال مقامی قرضے",
    viewDetails: "تفصیلات دیکھیں",
    viewingDetails: "تفصیلات دیکھی جا رہی ہیں",
    loanDetails: "قرض کی تفصیلات",
    snapshot: "کھاتہ کی تفصیل",
    repaymentProgress: "ادائیگی کی شرح",
    estMonthlyPayment: "تخمینی ماہانہ ادائیگی",
    whatChanged: "کیا تبدیل ہوا",
    selectedLoanLabel: "منتخب قرضہ",
    loanStatusLabel: "قرض کی حیثیت",
    interestProfile: "سود کا خاکہ",
    totalLoansLabel: "کل قرضے",
    totalAmountLabel: "کل رقم",
    avgInterestLabel: "اوسط سود",
    alertCenter: "الرٹ سینٹر",
    notificationsTitle: "اطلاعات",
    totalNotifications: "کل اطلاعات",
    unreadLabel: "غیر پڑھی اطلاعات",
    paymentAlerts: "ادائیگی کے الرٹ",
    approvalsLabel: "منظوری",
    scanBtn: "امپورٹ اور خود کار طریقے سے بھریں",
    scanning: "دستاویز درآمد کی جا رہی ہے...",
    scanSuccess: "دستاویز کامیابی سے درآمد ہو گئی! معلومات خود کار طریقے سے بھر گئیں۔",
    extraPaymentLabel: "اضافی ادائیگی",
    extraPaymentPlaceholder: "اضافی ماہانہ رقم درج کریں...",
  },
  ks: {
    dashboardTitle: "خوش آمدید، عامر صٲب",
    dashboardSubtitle: "راہِ مال - جۆم تہٕ کٔشِیرِ ہنٛز مٲلِیٲتی مۆضبوطی",
    activeBalance: "چالو قرضہٕ رقم",
    liabilityDistribution: "قرضہٕ پٔھلٲو",
    totalDebt: "کُل بقایا قرضہٕ",
    savedPlan: "ادائیگی ہنٛز حکمت عملی",
    savings: "کُل بچت",
    financialStress: "مٲلِیٲتی صحت سکور",
    loansTitle: "مقامی بینک تہٕ کوآپریٹیو قرضہٕ",
    loansSubtitle: "پنٛنؠ مقامی جۆم تہٕ کٔشِیر بینک کھاتہٕ ٹریک کٔرِو",
    addLoan: "نۆو قرضہٕ درج کٔرِو",
    ocrTitle: "سمارٹ لون امپورٹ",
    ocrPlaceholder: "قرضہٕ دستاویز اپ لوڈ کٔرِو تاکہ رقم، سود، ای ایم آئی خود کار طریقے سے امپورٹ ہو سکے...",
    recommenderTitle: "سرکاری سکیمن ہُنٛد مشیر",
    seasonalTitle: "ژُنٛٹھ تہٕ کانٛگِر سیزن مٲلِیٲتی منصوبہ ساز",
    winterCalculatorTitle: "سرمائی مٲلِیٲتی منصوبہ ساز",
    winterAlert: "چلّہ کلان سیزن مشورہٕ",
    offlineMode: "آف لائن وضع",
    voiceAssistant: "مالیاتی وائس گائیڈ",
    milestone: "قرضہٕ ادائیگی ترقی",
    assetAllocation: "شعبہٕ وار تقسیم",
    strategyVault: "سیزنل مشورہٕ والٹ",
    strategyTitle: "ژُنٛٹھ فصل کٹائی لچکدار ادائیگی",
    strategyDesc: "ستمبر پؠٹھ نومبر تام فصل کٹائی دوران زیادہ EMI ادا کٔرِو، تہٕ خشک ونٛدَس منٛز کم سے کم EMI ادا کٔرِو۔",
    focusLabel: "ماہانہ توجہ",
    horizonLabel: "دورانیہ",
    savedOnLabel: "محفوظ تاریخ",
    activeLoansLabel: "چالو مقامی قرضہٕ",
    viewDetails: "تفصیل وُچھِو",
    viewingDetails: "تفصیل وُچھنہٕ یوان",
    loanDetails: "قرضہٕ تفصیل",
    snapshot: "کھاتہٕ خلاصہٕ",
    repaymentProgress: "ادائیگی ہنٛز شرح",
    estMonthlyPayment: "تخمینی ماہانہ رقم",
    whatChanged: "کیا تبدیل گۆو",
    selectedLoanLabel: "منتخب قرضہٕ",
    loanStatusLabel: "قرضہٕ حالت",
    interestProfile: "سود خاکہٕ",
    totalLoansLabel: "کُل قرضہٕ",
    totalAmountLabel: "کُل رقم",
    avgInterestLabel: "اوسط سود",
    alertCenter: "الرٹ مرکز",
    notificationsTitle: "اطلاعات",
    totalNotifications: "کُل اطلاعات",
    unreadLabel: "غیر پرؠ مژ اطلاعی",
    paymentAlerts: "ادائیگی الرٹ",
    approvalsLabel: "منظوری",
    scanBtn: "امپورٹ کٔرِو",
    scanning: "امپورٹ سپدان چھِ...",
    scanSuccess: "دستاویز کامیابی سان امپورٹ گٔئی! معلومات بھریٔ گئی.",
    extraPaymentLabel: "اضافی رقم",
    extraPaymentPlaceholder: "اضافی ماہانہ رقم درج کٔرِو...",
  }
};

// --- HIGH-FIDELITY DATA (KASHMIR THEMED) ---
const trajectoryData = [
  { m: 'Mar', b: 1450000 }, { m: 'May', b: 1320000 }, { m: 'Jul', b: 1250000 },
  { m: 'Sep', b: 1100000 }, { m: 'Nov', b: 780000 }, { m: 'Jan', b: 750000 },
];

// Mock database of local J&K Government Schemes
const jkSchemes = [
  {
    id: 1,
    name: "Kisan Credit Card (KCC) for Orchardists",
    description: "Subsidized crop loans for apple, saffron, cherry, and walnut growers in J&K. Offers 3% interest subvention, making the effective interest rate just 4% APR.",
    benefit: "Up to ₹3 Lakh loan at 4% effective interest rate, no collateral up to ₹1.6 Lakh.",
    occupations: ["Orchardist / Farmer"],
    districts: ["Shopian", "Baramulla", "Anantnag", "Srinagar", "Budgam", "Pulwama", "Kupwara", "Kulgam", "Ganderbal", "Bandipora"],
    applyLink: "Contact nearest J&K Bank or Ellaquai Dehati Bank branch."
  },
  {
    id: 2,
    name: "Mumkin Scheme (Youth Livelihood)",
    description: "Provides financial assistance to unemployed youth for purchasing commercial passenger/goods vehicles to establish a sustainable livelihood.",
    benefit: "20% of the vehicle cost as subsidy (10% from J&K Govt, 10% from vehicle manufacturer). Interest-free mudra loan for the remaining 80%.",
    occupations: ["Student", "Tourism Operator"],
    districts: ["Srinagar", "Budgam", "Ganderbal", "Anantnag", "Baramulla", "Kupwara", "Pulwama", "Shopian", "Kulgam", "Bandipora"],
    applyLink: "Apply online via JK e-Services portal or contact District Employment and Counseling Centre."
  },
  {
    id: 3,
    name: "Tejaswini Scheme (Women Entrepreneurship)",
    description: "Empowers young women (aged 18-35) to set up gainful self-employment ventures in manufacturing, services, or trade.",
    benefit: "Financial assistance up to ₹5 Lakh. 10% (₹50,000) of the project cost as interest-free subsidy, interest subvention on the rest.",
    occupations: ["Female Entrepreneur"],
    districts: ["Srinagar", "Budgam", "Baramulla", "Anantnag", "Pulwama", "Shopian", "Kupwara", "Ganderbal", "Bandipora", "Kulgam"],
    applyLink: "Apply through Mission Youth J&K or local DIC office."
  },
  {
    id: 4,
    name: "Artisan Credit Card Scheme",
    description: "Subsidized loan facility for registered handloom weavers and handicraft artisans (carpet, pashmina, papier-mâché, wood carving).",
    benefit: "Loan up to ₹2 Lakh with 10% interest subvention for a period of 5 years.",
    occupations: ["Artisan / Weaver"],
    districts: ["Srinagar", "Ganderbal", "Budgam", "Baramulla", "Anantnag", "Bandipora"],
    applyLink: "Apply through Directorate of Handicrafts & Handloom, Kashmir."
  },
  {
    id: 5,
    name: "Himayat Scheme (Skill & Employment)",
    description: "Free vocational training and placement scheme for school/college dropouts and unemployed youth in urban and rural areas of J&K.",
    benefit: "100% sponsored training, monthly stipend of ₹1,000 during training, and post-placement support for 1 year.",
    occupations: ["Student"],
    districts: ["Srinagar", "Baramulla", "Anantnag", "Kupwara", "Budgam", "Poonch", "Rajouri", "Doda", "Ramban", "Kishtwar"],
    applyLink: "Register on Himayat Portal or visit the nearest training center."
  }
];

const User = ({ onLogout }) => {
  const initialSavedStrategies = getSavedStrategies();
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  
  // Custom states for local J&K Banks
  const [localLoans, setLocalLoans] = useState(() => {
    const saved = localStorage.getItem('koshur_loans');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, type: 'J&K Bank Apple Kisan Credit Card', amount: 150000, interest: 4.0, dueDate: '2026-11-15', status: 'Active' },
      { id: 2, type: 'Ellaquai Dehati Bank Artisan Loan', amount: 80000, interest: 6.0, dueDate: '2026-12-01', status: 'Active' },
      { id: 3, type: 'JK Cooperative Business Loan', amount: 300000, interest: 8.5, dueDate: '2026-10-10', status: 'Paid Off' },
    ];
  });

  const [localPayments, setLocalPayments] = useState([
    { id: 1, date: '2026-09-15', amount: 3500, loanType: 'J&K Bank KCC', status: 'Completed' },
    { id: 2, date: '2026-08-10', amount: 4500, loanType: 'JK Cooperative Loan', status: 'Completed' },
    { id: 3, date: '2026-10-15', amount: 3500, loanType: 'J&K Bank KCC', status: 'Upcoming' },
    { id: 4, date: '2026-11-01', amount: 1200, loanType: 'EDB Artisan Loan', status: 'Upcoming' },
  ]);

  const [localNotifications, setLocalNotifications] = useState([
    { id: 1, type: 'Weather Alert', message: 'Heavy snowfall predicted in Shopian. Highway NH44 closed. Secure your winter reserve fund.', date: '2026-11-20', read: false },
    { id: 2, type: 'Scheme Subvention', message: 'Your J&K Government interest subvention for Apple KCC has been credited.', date: '2026-10-10', read: true },
    { id: 3, type: 'EMI Reminder', message: 'Upcoming lean winter season EMI is due. Adjusted flexible EMI applied.', date: '2026-11-12', read: true },
  ]);

  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    return location.state?.activeSection || (initialSavedStrategies.length ? 'strategies' : 'portfolio');
  });

  React.useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);
  const [savedStrategies, setSavedStrategies] = useState(initialSavedStrategies);
  const isDark = theme === 'dark';
  const savedStrategy = savedStrategies[0] || null;

  // Government Scheme recommender states
  const [district, setDistrict] = useState('Shopian');
  const [occupation, setOccupation] = useState('Orchardist / Farmer');
  const [dependents, setDependents] = useState(3);
  const [primaryGoal, setPrimaryGoal] = useState('Winter emergency reserve');

  // Seasonal planner states
  const [cropType, setCropType] = useState('Apple');
  const [peakIncome, setPeakIncome] = useState(150000);
  const [leanIncome, setLeanIncome] = useState(15000);
  const [flexibleEmiMode, setFlexibleEmiMode] = useState(true);

  // Winter Preparedness states
  const [winterExpenses, setWinterExpenses] = useState(20000);
  const [winterEmis, setWinterEmis] = useState(8000);
  const [winterMonths, setWinterMonths] = useState(5); // Shopian default
  const [kangriBuffer, setKangriBuffer] = useState(15000);
  const [winterResult, setWinterResult] = useState(null);

  // Goal-based savings planner state
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: "Buy farming equipment", target: 80000, current: 35000, icon: "🚜" },
    { id: 2, name: "Children's education", target: 150000, current: 90000, icon: "🎓" },
    { id: 3, name: "Expand handicraft business", target: 50000, current: 12000, icon: "🧵" },
    { id: 4, name: "Build a greenhouse", target: 200000, current: 80000, icon: "🌿" },
    { id: 5, name: "Buy a shikara", target: 120000, current: 45000, icon: "🛶" }
  ]);
  const [goalContribution, setGoalContribution] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState(1);

  // Voice Guide state
  const [voiceGuideText, setVoiceGuideText] = useState("Select a financial question below and click to listen.");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'AI', text: "Assalam-o-Alaikum! I am your Raah-e-Maal financial voice guide. You can ask me questions about dry winters, local cooperative banks, and Apple KCC loan structures. How can I assist you today?" }
  ]);

  const askVoiceGuide = (question) => {
    if (!question || !question.trim()) return;

    const userMsg = { id: Date.now(), sender: 'User', text: question };
    let responseText = "";
    const q = question.toLowerCase();
    const activeDebt = localLoans.reduce((sum, l) => sum + (l.status === 'Active' ? l.amount : 0), 0);
    const winterTarget = (winterExpenses + winterEmis) * winterMonths + kangriBuffer;

    if (q.includes("save before winter") || q.includes("winter savings") || q.includes("how much should i save")) {
      responseText = `Based on your profile, your winter expenses are ${formatCurrency(winterExpenses)} and EMIs are ${formatCurrency(winterEmis)} across ${winterMonths} months of the Chilli Kalan lean season. I recommend building a winter safety buffer of at least ${formatCurrency(winterTarget)} (including a ${formatCurrency(kangriBuffer)} heating buffer).`;
    } else if (q.includes("afford another") || q.includes("afford a loan") || q.includes("can i afford")) {
      if (activeDebt > 200000) {
        responseText = `With your current outstanding liabilities of ${formatCurrency(activeDebt)}, taking another loan is highly discouraged. Focus on clearing your current debt first.`;
      } else {
        responseText = `Yes, your active debt of ${formatCurrency(activeDebt)} is currently manageable. If you need seasonal farming inputs, I recommend the J&K Kisan Credit Card (KCC) scheme, which offers a subsidized interest rate of 4.0%.`;
      }
    } else if (q.includes("harvest") || q.includes("plan emi") || q.includes("mainly during harvest") || q.includes("mainly comes during harvest")) {
      responseText = `Since your agricultural yield flows are highly seasonal (concentrated around autumn), you should opt for our Flexible EMI mode. This allows you to pay higher amounts during harvest peaks and drop to minimal payments during the winter dry season.`;
    } else if (q.includes("emergency") || q.includes("buffer") || q.includes("emergency fund")) {
      responseText = `To build a resilient emergency fund, reserve 20% of your peak harvest profits immediately in a high-yield local savings bank. For a ${occupation} in ${district}, keeping a buffer of ${formatCurrency(50000)} is ideal to secure against winter highway blockages.`;
    } else {
      responseText = `Assalamu Alaikum! As your financial assistant, I recommend scheduling flexible EMIs, utilizing government interest subventions (like KCC at 4%), and maintaining a winter reserve buffer of ${formatCurrency(winterTarget)} for the lean season.`;
    }

    const aiMsg = { id: Date.now() + 1, sender: 'AI', text: responseText };
    setChatHistory(prev => [...prev, userMsg, aiMsg]);
    setVoiceGuideText(question);
    
    // Voice Speech synthesizer wrapper
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(responseText);
      const voices = window.speechSynthesis.getVoices();
      let voice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('ur'));
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Form for new loan
  const [showAddLoanForm, setShowAddLoanForm] = useState(false);
  const [newLoanName, setNewLoanName] = useState('');
  const [newLoanAmount, setNewLoanAmount] = useState('');
  const [newLoanInterest, setNewLoanInterest] = useState('');
  const [newLoanTenure, setNewLoanTenure] = useState('');
  const [newLoanBank, setNewLoanBank] = useState('Jammu & Kashmir Bank');

  // OCR state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Voice Assistant state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Global district change handler
  const handleDistrictChange = (selected) => {
    setDistrict(selected);
    if (selected === 'Shopian') {
      setOccupation('Orchardist / Farmer');
      setCropType('Apple');
      setWinterMonths(5);
      setPeakIncome(180000);
      setLeanIncome(10000);
    } else if (selected === 'Pulwama') {
      setOccupation('Orchardist / Farmer');
      setCropType('Saffron');
      setWinterMonths(4);
      setPeakIncome(220000);
      setLeanIncome(25000);
    } else if (selected === 'Srinagar') {
      setOccupation('Tourism Operator');
      setCropType('Tourism');
      setWinterMonths(3);
      setPeakIncome(150000);
      setLeanIncome(35000);
    } else if (selected === 'Baramulla') {
      setOccupation('Orchardist / Farmer');
      setCropType('Apple');
      setWinterMonths(4);
      setPeakIncome(140000);
      setLeanIncome(12000);
    } else if (selected === 'Kupwara') {
      setOccupation('Artisan / Weaver');
      setCropType('Handicrafts');
      setWinterMonths(6);
      setPeakIncome(90000);
      setLeanIncome(8000);
    }
    
    // Reset calculated winter results so they are recalculated
    setWinterResult(null);

    const newN = {
      id: Date.now(),
      type: 'Personalization',
      message: `Profile personalized for ${selected} District. Recommendations, seasonal cash flows, and winter planners updated.`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setLocalNotifications(prev => [newN, ...prev]);
  };

  const getAiRiskDetails = () => {
    let score = 15; // base risk
    const reasons = [];

    // 1. District risk
    if (district === 'Kupwara') {
      score += 18;
      reasons.push("Kupwara has extreme winter isolation (5-6 months), which historically delays local bank collections.");
    } else if (district === 'Shopian') {
      score += 15;
      reasons.push("Shopian faces high snow isolation and NH44 blockages, affecting winter apple cold storage logistics.");
    } else if (district === 'Baramulla') {
      score += 10;
      reasons.push("Baramulla has moderate winter road isolation, causing temporary cash flow delays.");
    } else if (district === 'Pulwama') {
      score += 8;
      reasons.push("Pulwama saffron trade is highly dependent on harvest-time market prices, creating price volatility.");
    } else {
      score += 3;
      reasons.push("Srinagar offers better year-round retail liquidity and lower transport disruptions.");
    }

    // 2. Occupation risk
    if (occupation === 'Orchardist / Farmer') {
      score += 15;
      reasons.push("Agriculture has high seasonal cash concentration (90% in Oct-Nov), leaving winter dry of cash.");
    } else if (occupation === 'Artisan / Weaver') {
      score += 12;
      reasons.push("Handicrafts sales fluctuate based on tourist footfall and winter handicraft market demand.");
    } else if (occupation === 'Tourism Operator') {
      score += 18;
      reasons.push("Tourism is extremely sensitive to highway closures, heavy snow, and off-season drops.");
    } else {
      score += 5;
      reasons.push("Stable year-round income helps buffer debt servicing requirements.");
    }

    // 3. Flexible EMI mode
    if (!flexibleEmiMode) {
      score += 25;
      reasons.push("Rigid monthly EMIs ignore the 4-5 winter lean months, increasing default risk during dry spells.");
    } else {
      score -= 10;
      reasons.push("Flexible harvest-aligned EMIs act as a shield, reducing winter default probability.");
    }

    // 4. Debt Burden
    const activeDebt = localLoans.reduce((sum, l) => sum + (l.status === 'Active' ? l.amount : 0), 0);
    if (activeDebt > 300000) {
      score += 20;
      reasons.push(`High debt exposure of ₹${(activeDebt / 100000).toFixed(1)}L exceeds healthy leverage bounds.`);
    } else if (activeDebt > 150000) {
      score += 10;
      reasons.push(`Moderate debt exposure of ₹${(activeDebt / 100000).toFixed(1)}L requires careful crop insurance.`);
    } else {
      score -= 5;
      reasons.push("Debt levels are healthy and well within safe borrowing ratios.");
    }

    // Bound score
    const finalScore = Math.max(5, Math.min(98, score));
    let rating = 'LOW RISK';
    let colorClass = 'text-emerald-500';
    let bgClass = 'bg-emerald-500/10 border-emerald-500/20';
    if (finalScore > 70) {
      rating = 'CRITICAL RISK';
      colorClass = 'text-red-500';
      bgClass = 'bg-red-500/10 border-red-500/20';
    } else if (finalScore > 45) {
      rating = 'MODERATE RISK';
      colorClass = 'text-amber-500';
      bgClass = 'bg-amber-500/10 border-amber-500/20';
    }

    return { score: finalScore, rating, reasons, colorClass, bgClass };
  };

  const getMixData = () => {
    if (district === 'Shopian') {
      return [
        { name: 'Apple Orchards', value: 80, color: '#DC2626' },
        { name: 'Handicrafts', value: 10, color: '#D97706' },
        { name: 'Tourism', value: 10, color: '#0D9488' },
      ];
    } else if (district === 'Pulwama') {
      return [
        { name: 'Saffron Crops', value: 60, color: '#7C3AED' },
        { name: 'Apple Orchards', value: 30, color: '#DC2626' },
        { name: 'Tourism', value: 10, color: '#0D9488' },
      ];
    } else if (district === 'Srinagar') {
      return [
        { name: 'Tourism (Shikara)', value: 60, color: '#0D9488' },
        { name: 'Handicrafts', value: 30, color: '#D97706' },
        { name: 'Agriculture', value: 10, color: '#DC2626' },
      ];
    } else if (district === 'Baramulla') {
      return [
        { name: 'Apple Orchards', value: 50, color: '#DC2626' },
        { name: 'Tourism', value: 30, color: '#0D9488' },
        { name: 'Handicrafts', value: 20, color: '#D97706' },
      ];
    } else if (district === 'Kupwara') {
      return [
        { name: 'Artisan Crafts', value: 50, color: '#D97706' },
        { name: 'Walnut/Apple', value: 30, color: '#DC2626' },
        { name: 'Eco-Tourism', value: 20, color: '#0D9488' },
      ];
    }
    return [
      { name: 'Apple Orchards', value: 70, color: '#DC2626' },
      { name: 'Handicrafts', value: 20, color: '#D97706' },
      { name: 'Tourism', value: 10, color: '#0D9488' },
    ];
  };

  const mixData = getMixData();

  // Helper to contribute to savings goals
  const handleContributeGoal = (e) => {
    e.preventDefault();
    const amt = parseFloat(goalContribution);
    if (isNaN(amt) || amt <= 0) return;

    setSavingsGoals(prev => prev.map(g => {
      if (g.id === selectedGoalId) {
        return { ...g, current: Math.min(g.target, g.current + amt) };
      }
      return g;
    }));

    setGoalContribution('');

    // Add alert
    const targetGoal = savingsGoals.find(g => g.id === selectedGoalId);
    const newN = {
      id: Date.now(),
      type: 'Goal Planner',
      message: `Contributed ${formatCurrency(amt)} to savings goal: "${targetGoal.name}". Keep it up!`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setLocalNotifications(prev => [newN, ...prev]);
  };

  // AI Financial Voice Guide trigger
  const triggerVoiceGuideQuestion = (questionType) => {
    let answer = "";
    if (questionType === 'afford') {
      const activeTotal = localLoans.reduce((sum, l) => sum + (l.status === 'Active' ? l.amount : 0), 0);
      if (activeTotal > 200000) {
        answer = `With your current outstanding liabilities of ${formatCurrency(activeTotal)}, you should hold off on taking additional credit. Focus on your flexible EMI harvest payoff plan first.`;
      } else {
        answer = `Yes. Your total active debt load is ${formatCurrency(activeTotal)}, which is healthy. You can afford a micro-loan for seasonal inputs, preferably under the subsidized KCC scheme.`;
      }
    } else if (questionType === 'winter') {
      const winterReserveTarget = (winterExpenses + winterEmis) * winterMonths + kangriBuffer;
      answer = `For this winter in ${district} District, you should target a preparedness fund of ${formatCurrency(winterReserveTarget)}. This covers ${winterMonths} months of lean winter expenses, EMIs, and a special heating buffer.`;
    }

    setVoiceGuideText(answer);
    speakText(answer);
  };

  const getSeasonalPlannerData = () => {
    const months = [
      { name: 'Jan', peak: false }, { name: 'Feb', peak: false }, { name: 'Mar', peak: false },
      { name: 'Apr', peak: false }, { name: 'May', peak: false }, { name: 'Jun', peak: false },
      { name: 'Jul', peak: false }, { name: 'Aug', peak: false }, { name: 'Sep', peak: false },
      { name: 'Oct', peak: false }, { name: 'Nov', peak: false }, { name: 'Dec', peak: false }
    ];

    if (cropType === 'Apple') {
      months[8].peak = true;
      months[9].peak = true;
      months[10].peak = true;
    } else if (cropType === 'Saffron') {
      months[10].peak = true;
    } else if (cropType === 'Tourism') {
      months[4].peak = true;
      months[5].peak = true;
      months[6].peak = true;
      months[7].peak = true;
      months[11].peak = true;
      months[0].peak = true;
    } else if (cropType === 'Handicrafts') {
      months[10].peak = true;
      months[11].peak = true;
      months[0].peak = true;
      months[1].peak = true;
    }

    return months.map(m => {
      const income = m.peak ? peakIncome : leanIncome;
      let emi = 6000;
      if (flexibleEmiMode) {
        emi = m.peak ? 12000 : 1500;
      }
      return {
        month: m.name,
        Income: income,
        EMI: emi,
        Buffer: Math.max(0, income - emi)
      };
    });
  };

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  const handleLoanDetails = (loan) => {
    setSelectedLoan((currentLoan) => (currentLoan?.id === loan.id ? null : loan));
  };

  const handleDeleteStrategy = (strategy) => {
    const nextStrategies = deleteSavedStrategy(strategy);
    setSavedStrategies(nextStrategies);

    if (nextStrategies.length === 0 && activeSection === 'strategies') {
      setActiveSection('portfolio');
    }
  };

  const formatCurrency = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

  // Voice Speech synthesizer
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Find suitable local language or fallback
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('ur'));
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // OCR Simulation scanner
  const runOcrScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Autofill form
          setNewLoanName('KCC Apple Harvest Loan');
          setNewLoanAmount('250000');
          setNewLoanInterest('4.0');
          setNewLoanTenure('36');
          setNewLoanBank('Jammu & Kashmir Bank');
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const handleAddLoan = (e) => {
    e.preventDefault();
    if (!newLoanName || !newLoanAmount || !newLoanInterest) return;
    
    const newL = {
      id: Date.now(),
      type: `${newLoanBank} ${newLoanName}`,
      amount: parseFloat(newLoanAmount),
      interest: parseFloat(newLoanInterest),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active'
    };

    const updated = [newL, ...localLoans];
    setLocalLoans(updated);
    localStorage.setItem('koshur_loans', JSON.stringify(updated));

    // Clear form
    setNewLoanName('');
    setNewLoanAmount('');
    setNewLoanInterest('');
    setNewLoanTenure('');
    setShowAddLoanForm(false);

    // Add alert
    const newNotification = {
      id: Date.now(),
      type: 'Loan Registered',
      message: `Your new loan "${newL.type}" has been registered successfully.`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setLocalNotifications([newNotification, ...localNotifications]);
  };

  // --- THEME ADAPTIVE CLASSES ---
  const ui = {
    bg: isDark ? 'bg-[#020203]' : 'bg-[#FDFDFD]',
    glass: isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-zinc-200 shadow-xl shadow-zinc-200/50',
    text: isDark ? 'text-white' : 'text-zinc-900',
    muted: isDark ? 'text-zinc-500' : 'text-zinc-400',
    accent: 'text-[#7C3AED]',
    border: isDark ? 'border-white/5' : 'border-zinc-100',
    nav: isDark ? 'bg-[#050507]' : 'bg-zinc-50',
  };

  return (
    <div className={`h-screen ${ui.bg} ${ui.text} font-sans flex overflow-hidden transition-colors duration-1000 [&_button]:cursor-pointer`}>
      
      {/* --- FLOATING NAVIGATION PILLAR --- */}
      <aside className={`w-24 md:w-28 ${ui.nav} border-r ${ui.border} flex flex-col items-center py-10 z-30`}>
        <div className="flex flex-col items-center mb-16">
          <div className="w-12 h-12 bg-[#7C3AED] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-purple-400 mt-3 text-center">Raah-e-Maal</span>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar py-2 w-full flex flex-col items-center">
          <NavIcon icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeSection === 'portfolio'} onClick={() => setActiveSection('portfolio')} isDark={isDark} />
          <NavIcon icon={<Briefcase size={20}/>} label="My Loans" active={activeSection === 'loans'} onClick={() => setActiveSection('loans')} isDark={isDark} />
          <NavIcon icon={<Wallet size={20}/>} label="Planner" active={activeSection === 'strategies'} onClick={() => setActiveSection('strategies')} isDark={isDark} />
          <NavIcon icon={<Gift size={20}/>} label="Schemes" active={activeSection === 'schemes'} onClick={() => setActiveSection('schemes')} isDark={isDark} />
          <NavIcon icon={<Target size={20}/>} label="Goals" active={activeSection === 'goals'} onClick={() => setActiveSection('goals')} isDark={isDark} />
          <NavIcon icon={<BookOpen size={20}/>} label="Learn" active={activeSection === 'education'} onClick={() => setActiveSection('education')} isDark={isDark} />
          <NavIcon icon={<MessageSquare size={20}/>} label="AI Guide" active={activeSection === 'chatbot'} onClick={() => setActiveSection('chatbot')} isDark={isDark} />
          <NavIcon icon={<UserIcon size={20}/>} label="Profile" active={activeSection === 'profile'} onClick={() => setActiveSection('profile')} isDark={isDark} />
        </nav>

        <button type="button" onClick={onLogout} className="p-4 text-zinc-500 hover:text-red-500 transition-colors">
          <LogOut size={22} />
        </button>
      </aside>

      {/* --- MAIN EXECUTIVE SUITE --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-24 px-12 flex items-center justify-between z-20">
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
                {lang === 'en' ? 'Language' : lang === 'ur' ? 'زبان' : 'زبان'}
              </span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className={`bg-transparent text-xs font-bold uppercase tracking-wider outline-none border border-white/10 rounded-md px-2 py-1 mt-1 cursor-pointer transition-colors ${isDark ? 'text-white bg-slate-950' : 'text-zinc-800 bg-white'}`}
              >
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="en">English</option>
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="ur">اردو (Urdu)</option>
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="ks">کٲشُر (Kashmiri)</option>
              </select>
            </div>

            {/* Offline Mode Switch */}
            <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
                {t('offlineMode')}
              </span>
              <button
                type="button"
                onClick={() => {
                  setOfflineMode(!offlineMode);
                  const msg = !offlineMode ? "Offline Mode Enabled. Using local storage." : "Online Mode Enabled. Syncing with backend API.";
                  const newN = {
                    id: Date.now(),
                    type: 'Connectivity',
                    message: msg,
                    date: new Date().toISOString().split('T')[0],
                    read: false
                  };
                  setLocalNotifications(prev => [newN, ...prev]);
                }}
                className={`w-16 h-7 rounded-full p-0.5 mt-1 border transition-all duration-300 relative flex items-center ${offlineMode ? 'bg-amber-600/20 border-amber-500/50' : 'bg-emerald-600/20 border-emerald-500/50'}`}
              >
                <motion.div
                  animate={{ x: offlineMode ? 34 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black shadow-md ${offlineMode ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-white'}`}
                >
                  {offlineMode ? 'OFF' : 'ON'}
                </motion.div>
              </button>
            </div>

            {/* District Personalization Selector */}
            <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
                Personalization District
              </span>
              <select
                value={district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className={`bg-transparent text-sm font-semibold outline-none border border-white/10 rounded-md px-3 py-1.5 mt-1 cursor-pointer transition-colors ${isDark ? 'text-white bg-slate-950' : 'text-zinc-800 bg-white'}`}
              >
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Shopian">Shopian</option>
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Srinagar">Srinagar</option>
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Baramulla">Baramulla</option>
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Kupwara">Kupwara</option>
                <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Pulwama">Pulwama</option>
              </select>
            </div>

            <div>
              <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/80' : 'text-zinc-800'}`}>
                {isDark ? 'Dark' : 'Light'}
              </h2>
              <p className={`text-[10px] font-bold uppercase tracking-[0.25em] mt-1 ${isDark ? 'text-white/55' : 'text-zinc-600'}`}>
                Tap the switch to change theme
              </p>
            </div>
            {/* THEME TOGGLE (Architectural Design) */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className={`group relative w-16 h-8 rounded-full p-1 transition-all duration-500 ${isDark ? 'bg-zinc-900 border border-white/10' : 'bg-zinc-200 border border-zinc-300'}`}
            >
              <motion.div 
                animate={{ x: isDark ? 32 : 0 }}
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-xl ${isDark ? 'bg-[#7C3AED]' : 'bg-white'}`}
              >
                {isDark ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-[#7C3AED]" />}
              </motion.div>
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">{t('totalDebt')}</p>
              <p className="font-bold text-xl tracking-tighter">{formatCurrency(localLoans.reduce((sum, l) => sum + (l.status === 'Active' ? l.amount : 0), 0))}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#7C3AED] to-[#4F46E5] p-[1.5px] rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="w-full h-full rounded-[14px] bg-black overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=a4" alt="P" className="w-full h-full object-cover grayscale" />
               </div>
            </div>
          </div>
        </header>

        {/* CONTENT (Dynamic based on activeSection) */}
        <div className="flex-1 px-12 pb-10 overflow-y-auto min-h-0">
          {activeSection === 'portfolio' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Intelligence Core</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">{t('dashboardTitle')}</h1>
                  <p className="text-xs opacity-75 mt-2">{t('dashboardSubtitle')}</p>
                </div>
                <div className={`p-5 rounded-[24px] border ${ui.glass} flex items-center gap-4`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${savedStrategy ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {savedStrategy ? <Zap size={20} /> : <TrendingDown size={20} />}
                   </div>
                   <div>
                      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{t('savedPlan')}</p>
                      <p className="text-sm font-bold">{savedStrategy ? t('strategyTitle') : 'Optimized (+18.4%)'}</p>
                   </div>
                </div>
              </div>

              {/* MAIN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[55%]">
                
                {/* TRAJECTORY MODULE (Large Graph) */}
                <div className={`lg:col-span-8 ${ui.glass} rounded-[40px] p-8 flex flex-col relative overflow-hidden`}>
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                       <h3 className="text-lg font-bold tracking-tight">Seasonal Cashflow & Debt</h3>
                       <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">Loan Principal Amortization (INR)</p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-[#7C3AED] tracking-tighter">{formatCurrency(localLoans.reduce((sum, l) => sum + (l.status === 'Active' ? l.amount : 0), 0))}</p>
                       <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest">{t('activeBalance')}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 -ml-10">
                    <ResponsiveContainer width="110%" height="100%">
                      <AreaChart data={trajectoryData}>
                        <defs>
                          <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip 
                          cursor={{ stroke: '#7C3AED', strokeWidth: 1 }}
                          contentStyle={{ backgroundColor: isDark ? '#0A0A0C' : '#FFF', border: 'none', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                          formatter={(value) => formatCurrency(value)}
                        />
                        <Area type="monotone" dataKey="b" stroke="#7C3AED" strokeWidth={4} fill="url(#pgrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* MIX MODULE (Small Graph) */}
                <div className={`lg:col-span-4 ${ui.glass} rounded-[40px] p-8 flex flex-col items-center justify-between relative overflow-hidden`}>
                   <div className="w-full">
                      <h3 className="text-lg font-bold tracking-tight">{t('assetAllocation')}</h3>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">{t('liabilityDistribution')}</p>
                   </div>
                   
                   <div className="h-44 w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={mixData} innerRadius={55} outerRadius={75} paddingAngle={8} dataKey="value" stroke="none">
                            {mixData.map((e, i) => <Cell key={i} fill={e.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                         <p className="text-2xl font-black tracking-tighter">70<span className="text-xs opacity-40">%</span></p>
                         <p className="text-[8px] font-black opacity-30 uppercase">Orchards</p>
                      </div>
                   </div>

                   <div className="w-full space-y-3">
                      {mixData.map(item => (
                        <div key={item.name} className="flex justify-between items-center bg-white/3 p-3 rounded-xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                          </div>
                          <span className="text-[10px] font-black opacity-40">{item.value}%</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* QUICK ACTIONS BAR */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryStat label={t('totalDebt')} value={formatCurrency(localLoans.reduce((sum, l) => sum + (l.status === 'Active' ? l.amount : 0), 0))} icon={<Briefcase/>} theme={theme} />
                <SummaryStat label={t('financialStress')} value="84/100" icon={<Zap/>} theme={theme} color="text-yellow-500" />
                <SummaryStat label={t('savings')} value={formatCurrency(84200)} icon={<TrendingDown/>} theme={theme} color="text-emerald-500" />
                <SummaryStat label={t('milestone')} value="56% Paid" icon={<Target/>} theme={theme} />
              </div>


            </div>
          )}

          {activeSection === 'loans' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Local Loan Ledger</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">{t('loansTitle')}</h1>
                  <p className="text-xs opacity-75 mt-2">{t('loansSubtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddLoanForm(!showAddLoanForm)}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Sparkles size={14} />
                    {t('addLoan')}
                  </button>
                  <div className={`p-4 rounded-[20px] border ${ui.glass} flex items-center gap-4`}>
                     <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Briefcase size={16} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">{t('activeLoansLabel')}</p>
                        <p className="text-xs font-bold">{localLoans.filter(l => l.status === 'Active').length}</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* ADD LOAN FORM WITH OCR STATEMENT SCANNING */}
              <AnimatePresence>
                {showAddLoanForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`rounded-[28px] border border-dashed ${ui.glass} p-7 overflow-hidden`}
                  >
                    <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                      <Upload size={18} className="text-[#7C3AED]" />
                      Smart Loan Import
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* OCR DRAG & DROP ZONE */}
                      <div className="lg:col-span-5 border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/[0.01] text-center min-h-[220px]">
                        {isScanning ? (
                          <div className="w-full space-y-3">
                            <motion.div 
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-amber-500 text-sm font-bold"
                            >
                              {t('scanning')}
                            </motion.div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                            </div>
                            <span className="text-[10px] text-zinc-500">{scanProgress}% completed</span>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Upload size={32} className="text-zinc-600 mx-auto" />
                            <p className="text-xs text-zinc-400">{t('ocrPlaceholder')}</p>
                            <button
                              type="button"
                              onClick={runOcrScan}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full text-xs font-bold transition-colors border border-white/10"
                            >
                              {t('scanBtn')}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* LOAN FIELD ENTRY FORM */}
                      <form onSubmit={handleAddLoan} className="lg:col-span-7 grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-black uppercase opacity-60">Local Financial Bank</label>
                          <select
                            value={newLoanBank}
                            onChange={(e) => setNewLoanBank(e.target.value)}
                            className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-sm ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                          >
                            <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Jammu & Kashmir Bank">Jammu &amp; Kashmir Bank (J&amp;K Bank)</option>
                            <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Ellaquai Dehati Bank">Ellaquai Dehati Bank (EDB)</option>
                            <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="JK Cooperative Bank">J&amp;K Cooperative Bank</option>
                            <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="NABARD Rural Branch">NABARD Local Co-op</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase opacity-60">Loan Product Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Apple Orchard KCC, Saffron Loan"
                            value={newLoanName}
                            onChange={(e) => setNewLoanName(e.target.value)}
                            className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-sm ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase opacity-60">Loan Amount (₹)</label>
                          <input
                            type="number"
                            placeholder="e.g. 150000"
                            value={newLoanAmount}
                            onChange={(e) => setNewLoanAmount(e.target.value)}
                            className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-sm ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase opacity-60">Subsidized Interest Rate (% APR)</label>
                          <input
                            type="number"
                            step="0.1"
                            placeholder="e.g. 4.0"
                            value={newLoanInterest}
                            onChange={(e) => setNewLoanInterest(e.target.value)}
                            className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-sm ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase opacity-60">Tenure (Months)</label>
                          <input
                            type="number"
                            placeholder="e.g. 36"
                            value={newLoanTenure}
                            onChange={(e) => setNewLoanTenure(e.target.value)}
                            className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-sm ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                          />
                        </div>

                        <div className="col-span-2 flex justify-end gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => setShowAddLoanForm(false)}
                            className="px-4 py-2 text-zinc-500 hover:text-white text-xs font-bold transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#7C3AED] hover:bg-[#6366F1] text-white text-xs font-bold rounded-full transition-colors"
                          >
                            Register Loan
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LOANS LIST */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localLoans.map(loan => (
                    <div
                      key={loan.id}
                      className={`${ui.glass} rounded-[24px] p-6 flex flex-col justify-between transition-all duration-300 ${selectedLoan?.id === loan.id ? 'ring-2 ring-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.18)]' : ''}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-md font-bold tracking-tight truncate max-w-[200px]">{loan.type}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${loan.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                            {loan.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="opacity-60">Principal</span>
                            <span className="font-bold">{formatCurrency(loan.amount)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="opacity-60">Interest Rate</span>
                            <span className="font-bold text-[#7C3AED]">{loan.interest}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="opacity-60">Next Due Date</span>
                            <span className="font-bold">{loan.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleLoanDetails(loan)}
                        className={`mt-4 w-full text-white py-2 rounded-full text-xs font-bold transition-colors ${selectedLoan?.id === loan.id ? 'bg-[#6366F1]' : 'bg-[#7C3AED] hover:bg-[#6366F1]'}`}
                      >
                        {selectedLoan?.id === loan.id ? t('viewingDetails') : t('viewDetails')}
                      </button>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedLoan && (
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className={`mt-8 rounded-[28px] border ${ui.glass} p-7`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#7C3AED]">{t('loanDetails')}</p>
                          <h3 className="text-3xl font-bold tracking-tight mt-3">{selectedLoan.type}</h3>
                          <p className="text-sm opacity-70 mt-2">
                            Detailed view for this local bank account. Review details, crop-subsidies, and repayment cycles below.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-2 rounded-full text-xs font-bold ${selectedLoan.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                            {selectedLoan.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedLoan(null)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'}`}
                          >
                            Close
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
                        <div className={`rounded-[22px] p-5 border ${isDark ? 'bg-[#0B0B0E] border-white/10' : 'bg-zinc-50 border-zinc-200'}`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">Loan Amount</p>
                          <p className="text-3xl font-black tracking-tight mt-3">{formatCurrency(selectedLoan.amount)}</p>
                        </div>
                        <div className={`rounded-[22px] p-5 border ${isDark ? 'bg-[#0B0B0E] border-white/10' : 'bg-zinc-50 border-zinc-200'}`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">Interest Rate</p>
                          <p className="text-3xl font-black tracking-tight mt-3 text-[#7C3AED]">{selectedLoan.interest}%</p>
                        </div>
                        <div className={`rounded-[22px] p-5 border ${isDark ? 'bg-[#0B0B0E] border-white/10' : 'bg-zinc-50 border-zinc-200'}`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">Next Due Date</p>
                          <p className="text-3xl font-black tracking-tight mt-3">{selectedLoan.dueDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                        <div className={`rounded-[22px] p-5 border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-zinc-200'}`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">{t('snapshot')}</p>
                          <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="opacity-60">{t('repaymentProgress')}</span>
                              <span className="font-bold">{selectedLoan.status === 'Paid Off' ? '100%' : '56%'}</span>
                            </div>
                            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-zinc-200'}`}>
                              <div
                                className="h-full rounded-full bg-linear-to-r from-[#7C3AED] to-[#4F46E5]"
                                style={{ width: selectedLoan.status === 'Paid Off' ? '100%' : '56%' }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="opacity-60">{t('estMonthlyPayment')}</span>
                              <span className="font-bold">{formatCurrency(Math.round(selectedLoan.amount / 24))}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`rounded-[22px] p-5 border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-zinc-200'}`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">{t('whatChanged')}</p>
                          <div className="space-y-3 mt-4 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="opacity-60">{t('selectedLoanLabel')}</span>
                              <span className="font-bold truncate max-w-[220px]">{selectedLoan.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="opacity-60">{t('loanStatusLabel')}</span>
                              <span className="font-bold">{selectedLoan.status}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="opacity-60">{t('interestProfile')}</span>
                              <span className="font-bold text-[#7C3AED]">{selectedLoan.interest}% APR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* QUICK ACTIONS BAR */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryStat label={t('totalLoansLabel')} value={localLoans.length.toString()} icon={<Briefcase/>} theme={theme} />
                <SummaryStat label={t('activeLoansLabel')} value={localLoans.filter(l => l.status === 'Active').length.toString()} icon={<CheckCircle/>} theme={theme} />
                <SummaryStat label={t('totalAmountLabel')} value={formatCurrency(localLoans.reduce((sum, l) => sum + l.amount, 0))} icon={<DollarSign/>} theme={theme} />
                <SummaryStat label={t('avgInterestLabel')} value={`${(localLoans.reduce((sum, l) => sum + l.interest, 0) / localLoans.length).toFixed(1)}%`} icon={<Target/>} theme={theme} />
              </div>
            </div>
          )}

          {activeSection === 'strategies' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Scheme & Season Advisory</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Financial Strategies</h1>
                  <p className="text-xs opacity-75 mt-2">Maximize government subsidies and smooth out seasonal cash flow drops</p>
                </div>
              </div>

              {/* TWO COLUMN GRID FOR SCHEMES AND SEASONAL PLANNING */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* GOVERNMENT SCHEME RECOMMENDER */}
                <div className={`rounded-4xl border ${ui.glass} p-7 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold tracking-tight">{t('recommenderTitle')}</h3>
                      <button
                        type="button"
                        onClick={() => speakText("Here are J and K Government schemes recommended for you. You can select your district and occupation to find matching options.")}
                        className={`p-2 rounded-full hover:bg-white/10 text-[#7C3AED] ${isSpeaking ? 'animate-pulse' : ''}`}
                        title={t('voiceAssistant')}
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-[10px] font-black uppercase opacity-60">J&amp;K District</label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                        >
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Shopian">Shopian</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Srinagar">Srinagar</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Baramulla">Baramulla</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Anantnag">Anantnag</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Budgam">Budgam</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Pulwama">Pulwama</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Kupwara">Kupwara</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Ganderbal">Ganderbal</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase opacity-60">Primary Occupation</label>
                        <select
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                        >
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Orchardist / Farmer">Orchardist / Farmer (Apple/Saffron)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Artisan / Weaver">Artisan / Weaver (Pashmina/Carpet)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Tourism Operator">Tourism Operator (Houseboats/Shikara)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Female Entrepreneur">Female Entrepreneur</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Student">Student / Unemployed Youth</option>
                        </select>
                      </div>
                    </div>

                    {/* RECOMMENDED SCHEMES LIST */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {jkSchemes
                        .filter(s => s.occupations.includes(occupation) && s.districts.includes(district))
                        .map(scheme => (
                          <div 
                            key={scheme.id}
                            onClick={() => setSelectedScheme(selectedScheme?.id === scheme.id ? null : scheme)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedScheme?.id === scheme.id ? 'bg-[#7C3AED]/10 border-[#7C3AED]' : 'bg-white/3 border-white/5 hover:border-white/20'}`}
                          >
                            <h4 className="font-bold text-sm text-[#7C3AED]">{scheme.name}</h4>
                            <p className="text-xs opacity-80 mt-1 line-clamp-2">{scheme.description}</p>
                            {selectedScheme?.id === scheme.id && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 pt-3 border-t border-white/5 space-y-2 text-xs"
                              >
                                <div>
                                  <span className="font-black uppercase text-[9px] text-amber-500">Scheme Benefit:</span>
                                  <p className="opacity-90">{scheme.benefit}</p>
                                </div>
                                <div>
                                  <span className="font-black uppercase text-[9px] text-[#7C3AED]">How to Apply:</span>
                                  <p className="opacity-90 font-medium">{scheme.applyLink}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakText(`${scheme.name}. Benefit: ${scheme.benefit}. Apply: ${scheme.applyLink}`);
                                  }}
                                  className="mt-1 px-3 py-1 bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/35 rounded-full font-bold text-[10px] flex items-center gap-1.5"
                                >
                                  <Volume2 size={12} />
                                  Listen Detail
                                </button>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      {jkSchemes.filter(s => s.occupations.includes(occupation) && s.districts.includes(district)).length === 0 && (
                        <p className="text-xs opacity-50 text-center py-6">No specific district scheme matches. Try changing occupation filters.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SEASONAL CASHFLOW & PAYOFF PLANNER */}
                <div className={`rounded-4xl border ${ui.glass} p-7 flex flex-col justify-between`}>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-2">{t('seasonalTitle')}</h3>
                    <p className="text-xs opacity-75 mb-4">
                      Model your cash flows and pay higher EMIs in harvest seasons (Sept-Nov) and lower EMIs in lean winters.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-[10px] font-black uppercase opacity-60">Primary Crop/Cycle</label>
                        <select
                          value={cropType}
                          onChange={(e) => setCropType(e.target.value)}
                          className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                        >
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Apple">Apple Orchard (Harvest: Oct-Nov)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Saffron">Saffron (Harvest: Nov)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Tourism">Tourism (Peak: May-Aug, Dec-Jan)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Handicrafts">Handicrafts (Peak: Nov-Feb)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <label className="text-[10px] font-black uppercase opacity-60">Flexible EMIs</label>
                        <button
                          type="button"
                          onClick={() => setFlexibleEmiMode(!flexibleEmiMode)}
                          className={`w-12 h-6 rounded-full p-0.5 border transition-all duration-300 relative flex items-center ${flexibleEmiMode ? 'bg-[#7C3AED]/30 border-[#7C3AED]' : 'bg-zinc-800 border-zinc-700'}`}
                        >
                          <motion.div
                            animate={{ x: flexibleEmiMode ? 24 : 0 }}
                            className={`w-4 h-4 rounded-full ${flexibleEmiMode ? 'bg-[#7C3AED]' : 'bg-zinc-500'}`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="opacity-60">Harvest/Peak Income per month</span>
                          <span className="font-bold text-emerald-500">{formatCurrency(peakIncome)}</span>
                        </div>
                        <input
                          type="range"
                          min={50000}
                          max={500000}
                          step={10000}
                          value={peakIncome}
                          onChange={(e) => setPeakIncome(Number(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="opacity-60">Dry Winter/Lean Income per month</span>
                          <span className="font-bold text-amber-500">{formatCurrency(leanIncome)}</span>
                        </div>
                        <input
                          type="range"
                          min={5000}
                          max={100000}
                          step={5000}
                          value={leanIncome}
                          onChange={(e) => setLeanIncome(Number(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                        />
                      </div>
                    </div>

                    {/* SEASONAL INCOME & EMI CHART */}
                    <div className="mt-6 h-[160px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getSeasonalPlannerData()}>
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            labelStyle={{ color: '#9ca3af', fontWeight: 'bold' }}
                          />
                          <Area type="monotone" dataKey="Income" stroke="#10b981" fill="rgba(16,185,129,0.1)" strokeWidth={2} name="Monthly Income" />
                          <Area type="monotone" dataKey="EMI" stroke="#6366f1" fill="rgba(99,102,241,0.1)" strokeWidth={2} name="EMI Payment" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-between ${flexibleEmiMode ? 'border-emerald-500/20 bg-emerald-500/[0.01]' : ''}`}>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider opacity-40">Estimated Interest Savings</p>
                      <p className="text-lg font-black text-emerald-500">{flexibleEmiMode ? formatCurrency(34200) : formatCurrency(0)}</p>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 max-w-[200px] text-right">
                      {flexibleEmiMode 
                        ? "Peak EMIs of ₹12,000 paid during harvests, dropped to ₹1,500 in dry winters." 
                        : "Standard EMI schedule applied without seasonal flexibility."}
                    </span>
                  </div>
                </div>

              </div>

              {/* Winter Preparedness and AI Risk Prediction Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                {/* WINTER FINANCIAL PREPAREDNESS PLANNER */}
                <div className={`rounded-4xl border ${ui.glass} p-7 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.35em]">{t('winterAlert')}</p>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500">
                        Winter Prep
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mt-3">
                      {t('winterCalculatorTitle')}
                    </h3>
                    <p className="text-xs opacity-75 mt-1">
                      Smooth out food reserves, local kangri heating fuels, and bank EMI payments during highway blockages in {district} district.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest opacity-60">Monthly Expenses (₹)</label>
                        <input
                          type="number"
                          value={winterExpenses}
                          onChange={(e) => setWinterExpenses(Number(e.target.value))}
                          className={`w-full mt-1 px-3 py-1.5 text-sm rounded-lg bg-transparent border ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest opacity-60">Monthly Loan EMIs (₹)</label>
                        <input
                          type="number"
                          value={winterEmis}
                          onChange={(e) => setWinterEmis(Number(e.target.value))}
                          className={`w-full mt-1 px-3 py-1.5 text-sm rounded-lg bg-transparent border ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest opacity-60">Duration ({district} customized)</label>
                        <select
                          value={winterMonths}
                          onChange={(e) => setWinterMonths(Number(e.target.value))}
                          className={`w-full mt-1 px-3 py-1.5 text-sm rounded-lg bg-transparent border ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                        >
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value={2}>2 Months (Dec-Jan)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value={3}>3 Months (Dec-Feb)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value={4}>4 Months (Nov-Feb)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value={5}>5 Months (Nov-March)</option>
                          <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value={6}>6 Months (Oct-March)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest opacity-60">Kangri Heating &amp; Food Buffer (₹)</label>
                        <input
                          type="number"
                          value={kangriBuffer}
                          onChange={(e) => setKangriBuffer(Number(e.target.value))}
                          className={`w-full mt-1 px-3 py-1.5 text-sm rounded-lg bg-transparent border ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const total = (winterExpenses + winterEmis) * winterMonths + kangriBuffer;
                        setWinterResult(total);
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-full transition-colors"
                    >
                      Calculate Preparedness Fund
                    </button>
                    {winterResult !== null && (
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-50">Planner Safety Buffer</p>
                        <p className="text-lg font-black text-amber-500">{formatCurrency(winterResult)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI FINANCIAL RISK PREDICTOR */}
                {(() => {
                  const riskDetails = getAiRiskDetails();
                  return (
                    <div className={`rounded-4xl border ${ui.glass} p-7 flex flex-col justify-between`}>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-2">
                          <ShieldAlert className="text-purple-500" size={24} />
                          AI Financial Risk Predictor
                        </h3>
                        <p className="text-xs opacity-75 mb-5">Calculates defaults, lean periods, and winter liquidity risks based on crop exposure.</p>

                        {/* RISK DIAL GAUGE */}
                        <div className="mb-6 p-4 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-1 font-mono">Default Risk Probability</span>
                            <span className={`text-3xl font-black italic tracking-tighter ${riskDetails.colorClass}`}>
                              {riskDetails.score}%
                            </span>
                          </div>
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${riskDetails.colorClass} ${riskDetails.bgClass}`}>
                            {riskDetails.rating}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {/* Risk item 1 */}
                          <div className="flex items-start justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                              <p className="text-xs font-bold">Missed EMI Risk</p>
                              <p className="text-[11px] opacity-60 mt-0.5">
                                {flexibleEmiMode 
                                  ? "Flexible repayments act as a buffer for dry winters." 
                                  : "Standard rigid terms are vulnerable to winter blockage sales drops."}
                              </p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${flexibleEmiMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                              {flexibleEmiMode ? 'LOW RISK' : 'HIGH RISK'}
                            </span>
                          </div>

                          {/* Risk item 2 */}
                          <div className="flex items-start justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                              <p className="text-xs font-bold">Cash Flow Shortage</p>
                              <p className="text-[11px] opacity-60 mt-0.5">
                                {district === 'Shopian' || district === 'Kupwara'
                                  ? `High winter road isolation danger in ${district} (predicted Jan-Feb).`
                                  : `Normal local winter logistics constraints expected for ${district}.`}
                              </p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${district === 'Shopian' || district === 'Kupwara' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                              {district === 'Shopian' || district === 'Kupwara' ? 'HIGH RISK' : 'MEDIUM RISK'}
                            </span>
                          </div>

                          {/* AI Diagnostic Briefing */}
                          <div className="p-4 rounded-2xl border border-[#7C3AED]/20 bg-[#7C3AED]/5">
                            <span className="text-[9px] font-black uppercase tracking-wider text-[#A78BFA] block mb-2 font-mono">AI Diagnostics Briefing</span>
                            <ul className="space-y-1.5 text-[10px] text-white/70 list-disc list-inside leading-relaxed text-left">
                              {riskDetails.reasons.map((reason, i) => (
                                <li key={i}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Payment Ledger</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Payments Calendar</h1>
                </div>
                <div className={`p-5 rounded-[24px] border ${ui.glass} flex items-center gap-4`}>
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <CreditCard size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Upcoming Payments</p>
                      <p className="text-sm font-bold">{localPayments.filter(p => p.status === 'Upcoming').length}</p>
                   </div>
                </div>
              </div>

              {/* PAYMENTS LIST */}
              <div>
                <div className="space-y-4">
                  {localPayments.map(payment => (
                    <div key={payment.id} className={`${ui.glass} rounded-[24px] p-6 flex items-center justify-between`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${payment.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {payment.status === 'Completed' ? <CheckCircle size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                          <h3 className="font-bold">{payment.loanType}</h3>
                          <p className="text-sm opacity-60">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(payment.amount)}</p>
                        <p className={`text-sm ${payment.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS BAR */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryStat label="Total Payments" value={localPayments.length.toString()} icon={<CreditCard/>} theme={theme} />
                <SummaryStat label="Completed" value={localPayments.filter(p => p.status === 'Completed').length.toString()} icon={<CheckCircle/>} theme={theme} />
                <SummaryStat label="Total Paid" value={formatCurrency(localPayments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0))} icon={<DollarSign/>} theme={theme} />
                <SummaryStat label="Upcoming" value={localPayments.filter(p => p.status === 'Upcoming').length.toString()} icon={<Calendar/>} theme={theme} />
              </div>
            </div>
          )}

          {activeSection === 'schemes' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Discovery System</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Financial Support & Schemes</h1>
                  <p className="text-xs opacity-75 mt-2">Discover personalized J&K schemes based on your district and livelihood.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className={`lg:col-span-4 rounded-4xl border ${ui.glass} p-7 space-y-6`}>
                  <h3 className="text-lg font-bold flex items-center gap-2"><Filter size={18} className="text-purple-500" /> Filter Criteria</h3>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-60">J&K District</label>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    >
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Shopian">Shopian</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Srinagar">Srinagar</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Baramulla">Baramulla</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Pulwama">Pulwama</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Kupwara">Kupwara</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-60">Livelihood Category</label>
                    <select
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    >
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Orchardist / Farmer">Orchardist / Farmer (Apple/Saffron)</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Artisan / Weaver">Artisan / Weaver (Pashmina/Carpet)</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Tourism Operator">Tourism Operator (Houseboats/Shikara)</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Female Entrepreneur">Female Entrepreneur</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Student">Student / Unemployed Youth</option>
                    </select>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 leading-relaxed">
                    ⚠️ <strong>Prototype Note:</strong> Scheme details are for demonstration/informational purposes. Actual eligibility should be checked with official departments.
                  </div>
                </div>
                <div className="lg:col-span-8 space-y-4">
                  {jkSchemes
                    .filter(s => s.occupations.includes(occupation) && s.districts.includes(district))
                    .map(scheme => (
                      <div key={scheme.id} className={`p-6 rounded-3xl border ${ui.glass} space-y-4 text-left`}>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-lg text-[#7C3AED]">{scheme.name}</h4>
                          <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400">J&K GOVT</span>
                        </div>
                        <p className="text-xs opacity-80 leading-relaxed">{scheme.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-white/5">
                          <div>
                            <span className="font-black uppercase text-[9px] text-amber-500 block mb-1">Benefit Details:</span>
                            <p className="opacity-90">{scheme.benefit}</p>
                          </div>
                          <div>
                            <span className="font-black uppercase text-[9px] text-[#7C3AED] block mb-1">Application Action:</span>
                            <p className="opacity-90 font-medium">{scheme.applyLink}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {jkSchemes.filter(s => s.occupations.includes(occupation) && s.districts.includes(district)).length === 0 && (
                    <div className={`p-10 rounded-3xl border ${ui.glass} text-center text-xs opacity-50`}>
                      No specific district schemes match. Try switching filters to view other options.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'goals' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Savings Targets</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Goal-Based Savings</h1>
                  <p className="text-xs opacity-75 mt-2">Invest in farming equipment, looms, shikaras, or winter stores with custom progress meters.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className={`lg:col-span-4 rounded-4xl border ${ui.glass} p-7 space-y-6`}>
                  <h3 className="text-lg font-bold flex items-center gap-2"><Target size={18} className="text-purple-500" /> Save for Goal</h3>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-60">Select Goal</label>
                    <select
                      value={selectedGoalId}
                      onChange={(e) => setSelectedGoalId(Number(e.target.value))}
                      className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    >
                      {savingsGoals.map(g => (
                        <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} key={g.id} value={g.id}>{g.icon} {g.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-60">Contribution Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={goalContribution}
                      onChange={(e) => setGoalContribution(e.target.value)}
                      className={`w-full mt-1.5 px-4 py-2 rounded-xl bg-transparent border text-xs font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800'}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!goalContribution || isNaN(goalContribution)) return;
                      setSavingsGoals(prev => prev.map(g => g.id === selectedGoalId ? { ...g, current: Math.min(g.target, g.current + Number(goalContribution)) } : g));
                      setGoalContribution('');
                      const targetG = savingsGoals.find(g => g.id === selectedGoalId);
                      const newN = {
                        id: Date.now(),
                        type: 'Savings Update',
                        message: `Contributed ₹${Number(goalContribution).toLocaleString('en-IN')} to "${targetG.name}". Keep saving!`,
                        date: new Date().toISOString().split('T')[0],
                        read: false
                      };
                      setLocalNotifications(prev => [newN, ...prev]);
                    }}
                    className="w-full py-3 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Add Contribution
                  </button>
                </div>
                <div className="lg:col-span-8 space-y-4">
                  {savingsGoals.map(goal => {
                    const pct = Math.round((goal.current / goal.target) * 100);
                    return (
                      <div key={goal.id} className={`p-6 rounded-3xl border ${ui.glass} space-y-3 text-left`}>
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-base flex items-center gap-2"><span className="text-xl">{goal.icon}</span> {goal.name}</h4>
                          <span className="text-xs font-bold opacity-60">{pct}% Complete</span>
                        </div>
                        <div className="flex justify-between text-xs opacity-75">
                          <span>Current: ₹{goal.current.toLocaleString('en-IN')}</span>
                          <span>Target: ₹{goal.target.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-linear-to-r from-purple-600 to-indigo-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'chatbot' && (
            <div className="flex flex-col gap-6 min-h-full h-[80vh]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">AI Support Pillar</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">AI Financial Voice Guide</h1>
                  <p className="text-xs opacity-75 mt-2">Chat with Raah-e-Maal AI and get speech-guided answers regarding winter savings and KCC loans.</p>
                </div>
              </div>
              <div className={`flex-1 rounded-4xl border ${ui.glass} overflow-hidden p-3 flex flex-col`}>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
                  {chatHistory.map((msg, index) => (
                    <div key={msg.id || index} className={`flex gap-3 text-left ${msg.sender === 'User' ? 'justify-end' : ''}`}>
                      {msg.sender === 'AI' && (
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 text-xs shrink-0 font-bold">AI</div>
                      )}
                      <div className={`border rounded-2xl p-4 text-xs max-w-[80%] leading-relaxed ${msg.sender === 'User' ? 'bg-[#7C3AED] text-white border-none' : 'bg-white/5 border-white/5 text-slate-200'}`}>
                        {msg.text}
                      </div>
                      {msg.sender === 'User' && (
                        <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] text-xs shrink-0 font-bold">U</div>
                      )}
                    </div>
                  ))}

                  <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10 text-xs space-y-3">
                    <p className="font-bold opacity-60">SUGGESTED QUESTIONS:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "How much should I save before winter?",
                        "Can I afford another loan?",
                        "My income comes mainly during harvest. How to plan EMIs?",
                        "How should I create an emergency fund?"
                      ].map(q => (
                        <button
                          key={q}
                          onClick={() => {
                            askVoiceGuide(q);
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 text-[10px] font-medium"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-white/5 flex gap-3 items-center">
                  <div className="flex-1 bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-xs opacity-55 text-left truncate">
                    {voiceGuideText}
                  </div>
                  <button
                    onClick={() => {
                      if (isSpeaking) {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      } else {
                        if (voiceGuideText && voiceGuideText !== "Select a financial question below and click to listen.") {
                          askVoiceGuide(voiceGuideText);
                        }
                      }
                    }}
                    className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-colors ${isSpeaking ? 'bg-red-500 text-white animate-pulse' : 'bg-[#7C3AED] text-white'}`}
                  >
                    {isSpeaking ? 'Stop playback' : 'Play Voice Guide'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Onboarding Profile</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Personalized Onboarding</h1>
                  <p className="text-xs opacity-75 mt-2">Adjust your Kashmiri district, primary livelihood, dependents, and goals to optimize the AI advice engine.</p>
                </div>
              </div>
              <div className={`rounded-4xl border ${ui.glass} p-8 max-w-2xl mx-auto w-full text-left space-y-6`}>
                <h3 className="text-xl font-bold border-b border-white/5 pb-4">Financial Profile Form</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider opacity-60">J&K District</label>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className={`w-full mt-2 px-4 py-3 rounded-xl bg-transparent border text-sm font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    >
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Shopian">Shopian</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Srinagar">Srinagar</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Baramulla">Baramulla</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Kupwara">Kupwara</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Pulwama">Pulwama</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider opacity-60">Primary Livelihood</label>
                    <select
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className={`w-full mt-2 px-4 py-3 rounded-xl bg-transparent border text-sm font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    >
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Orchardist / Farmer">Horticulture / Apple Orchardist</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Saffron Cultivator">Saffron Cultivation</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Artisan / Weaver">Handicrafts / Carpet Weaver</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Tourism Operator">Tourism Operator (Houseboat/Shikara)</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Small Business">Small Business / Shopkeeper</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Student">Student / Youth</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Salaried Employee">Salaried Employee</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider opacity-60">Financial Dependents</label>
                    <input
                      type="number"
                      value={dependents}
                      onChange={(e) => setDependents(Number(e.target.value))}
                      className={`w-full mt-2 px-4 py-3 rounded-xl bg-transparent border text-sm ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider opacity-60">Primary Financial Goal</label>
                    <select
                      value={primaryGoal}
                      onChange={(e) => setPrimaryGoal(e.target.value)}
                      className={`w-full mt-2 px-4 py-3 rounded-xl bg-transparent border text-sm font-bold ${isDark ? 'border-white/10 text-white' : 'border-zinc-300 text-zinc-800 bg-white'}`}
                    >
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Winter emergency reserve">Winter Emergency Reserve</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Orchard equipment">Farming & Orchard Equipment</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Shikara purchase">Dal Lake Shikara Purchase</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Greenhouse building">Greenhouse Construction</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Loom setup">Pashmina Loom Setup</option>
                      <option style={{ color: '#111827', backgroundColor: '#ffffff', fontSize: '14px' }} value="Children education">Children's Education</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const newN = {
                        id: Date.now(),
                        type: 'Profile Update',
                        message: `Your profile has been saved. General J&K default risk model and winter planners updated reactively.`,
                        date: new Date().toISOString().split('T')[0],
                        read: false
                      };
                      setLocalNotifications(prev => [newN, ...prev]);
                      setActiveSection('portfolio');
                    }}
                    className="px-8 py-3.5 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl text-xs font-bold uppercase tracking-widest"
                  >
                    Save & Update Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'education' && (
            <div className="flex flex-col gap-6 min-h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#7C3AED] text-[11px] font-black uppercase tracking-[0.5em] mb-3">Knowledge Core</p>
                  <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Financial Literacy Hub</h1>
                  <p className="text-xs opacity-75 mt-2">Build financial strength and learn to navigate local agrarian credit systems safely.</p>
                </div>
                <div className={`p-5 rounded-[24px] border ${ui.glass} flex items-center gap-4`}>
                   <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <BookOpen size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Active Lessons</p>
                      <p className="text-sm font-bold">4 / 4 Complete</p>
                   </div>
                </div>
              </div>

              {/* LITERACY HUB CARD TILES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className={`rounded-4xl border ${ui.glass} p-7`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📊</span>
                    <h3 className="text-lg font-bold tracking-tight">How EMIs Work</h3>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    An Equated Monthly Installment (EMI) consists of both principal repayment and interest charges. In the beginning, a larger share goes to interest, and over time, more goes to principal. Paying early or making extra payments directly reduces the principal, saving you significant interest.
                  </p>
                </div>

                <div className={`rounded-4xl border ${ui.glass} p-7`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📈</span>
                    <h3 className="text-lg font-bold tracking-tight">Fixed vs Floating Interest</h3>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Fixed rates remain constant throughout the loan tenure, protecting you from rate hikes but keeping you from benefits if rates drop. Floating rates fluctuate based on market benchmarks (like RBI repo rates). Local agriculture loans like KCC often have fixed subsidized rates.
                  </p>
                </div>

                <div className={`rounded-4xl border ${ui.glass} p-7`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🪤</span>
                    <h3 className="text-lg font-bold tracking-tight">Avoiding Debt Traps</h3>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    A debt trap happens when you take new loans to pay off old ones. Always limit your debt-to-income ratio below 40%. Build a winter buffer to cover payments during lean seasons instead of borrowing from informal high-interest local lenders.
                  </p>
                </div>

                <div className={`rounded-4xl border ${ui.glass} p-7`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">💰</span>
                    <h3 className="text-lg font-bold tracking-tight">Building Savings</h3>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Pay yourself first! Aim to save 20% of your harvest or peak income immediately. Place it in a high-yield local account or liquid emergency reserve to secure against highway closures and crop crop crop failures.
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const NavIcon = ({ icon, label, active, onClick, isDark }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative group transition-all duration-500 ${active ? 'text-[#7C3AED]' : isDark ? 'text-zinc-600 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'} flex flex-col items-center bg-transparent border-0`}
  >
    {active && <motion.div layoutId="navActive" className="absolute -left-10 w-1 h-8 bg-[#7C3AED] rounded-r-full shadow-[0_0_15px_#7C3AED]" />}
    {icon}
    <span className="text-[8px] font-bold uppercase tracking-widest mt-2">{label}</span>
  </button>
);

const SummaryStat = ({ label, value, icon, theme, color }) => (
  <div className={`p-6 rounded-[28px] flex items-center gap-5 transition-all duration-500 ${theme === 'dark' ? 'bg-white/[0.03] border-white/5' : 'bg-white border-zinc-200 shadow-md'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-white/5' : 'bg-zinc-50'}`}>
       <div className={color || "text-[#7C3AED]"}>{icon}</div>
    </div>
    <div>
      <p className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-bold tracking-tight">{value}</p>
    </div>
  </div>
);

const MetricCard = ({ theme, label, value }) => (
  <div className={`rounded-[22px] p-5 border ${theme === 'dark' ? 'bg-[#0B0B0E] border-white/10' : 'bg-zinc-50 border-zinc-200'}`}>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-45">{label}</p>
    <p className="text-2xl font-black tracking-tight mt-3">{value}</p>
  </div>
);

export default User;
