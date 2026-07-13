import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Plus, Trash2, Search, 
  DollarSign, TrendingUp, CheckCircle, Clock, 
  Activity, Layers, Cpu, Lock
} from 'lucide-react';
import { getCurrentUser } from '../services/auth';
import { getToken } from '../services/api';
import { getSavedStrategies, saveStrategy } from '../services/savedStrategy';
import {
  createFinancialProfile,
  createLoan,
  deleteLoan,
  getFinancialProfile,
  getLoanSummary,
  getLoans,
  requestRecommendations,
  runSimulation,
  updateFinancialProfile,
  updateLoan,
} from '../services/tracker';

const Tracker = () => {
  const [step, setStep] = useState('profile'); 
  const [unlockedStep, setUnlockedStep] = useState(0); 
  const [loading, setLoading] = useState(Boolean(getToken()));
  const [stepLoading, setStepLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [strategyOptions, setStrategyOptions] = useState([]);
  const [savedStrategies, setSavedStrategies] = useState(() => getSavedStrategies());
  
  const [profile, setProfile] = useState({
    income: 70000,
    expenses: 40000,
    savings: 0,
    creditScore: 750,
  });
  
  const [loans, setLoans] = useState([]);
  
  const [expandedStrategy, setExpandedStrategy] = useState(null);
  const steps = ['profile', 'summary', 'strategies'];
  const isGuestMode = !currentUserId;

  const defaultStrategies = [
    {
      name: 'Snowball Method',
      tag: 'Smallest Loans First',
      cost: '₹30k',
      freeIn: '56m',
      saved: 'N/A',
      desc: 'Focus extra capital on the smallest loan first to build immediate momentum.',
      accent: '#00d2ff',
    },
    {
      name: 'Avalanche Method',
      tag: 'High Interest First',
      cost: '₹30k',
      freeIn: '48m',
      saved: 'N/A',
      desc: 'Target the highest-interest debts first to minimize total lifetime cost.',
      accent: '#7C3AED',
    },
  ];

  useEffect(() => {
    const loadTrackerData = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setCurrentUserId(currentUser.id);

        try {
          const profileData = await getFinancialProfile(currentUser.id);
          setProfile({
            income: profileData.income,
            expenses: profileData.expenses,
            savings: profileData.savings,
            creditScore: profileData.credit_score,
          });
          setProfileExists(true);
        } catch (error) {
          if (!String(error.message).includes('not found')) {
            throw error;
          }
        }

        try {
          const loanData = await getLoans(currentUser.id);
          setLoans(
            loanData.map((loan) => ({
              id: loan.id,
              name: loan.loan_name,
              total: loan.amount,
              emi: loan.emi,
              interestRate: loan.interest_rate,
              tenureMonths: loan.tenure_months || 180,
              isNew: false,
            }))
          );
        } catch (error) {
          if (!String(error.message).includes('No loans found')) {
            throw error;
          }
        }
      } catch (error) {
      if (token) {
        console.error(error.message || 'Failed to load tracker data.');
      }
      } finally {
        setLoading(false);
      }
    };

    loadTrackerData();
  }, []);

  const persistProfile = async (partialData = null) => {
    if (!currentUserId) {
      return;
    }

    const fullPayload = {
      user_id: currentUserId,
      income: Number(profile.income),
      expenses: Number(profile.expenses),
      savings: Number(profile.savings),
      credit_score: Number(profile.creditScore),
    };

    try {
      if (!profileExists) {
        await createFinancialProfile(fullPayload);
        setProfileExists(true);
        return;
      }

      const patchPayload = partialData || {
        income: fullPayload.income,
        expenses: fullPayload.expenses,
        savings: fullPayload.savings,
        credit_score: fullPayload.credit_score,
      };
      await updateFinancialProfile(currentUserId, patchPayload);
    } catch (error) {
      console.error(error.message || 'Failed to save profile.');
    }
  };

  const persistLoan = async (loan) => {
    if (!currentUserId) {
      return;
    }

    try {
      if (loan.isNew) {
        const created = await createLoan({
          user_id: currentUserId,
          loan_name: loan.name,
          amount: Number(loan.total),
          tenure_months: Number(loan.tenureMonths || 180),
          interest_rate: Number(loan.interestRate || 10),
        });

        setLoans((prev) =>
          prev.map((item) =>
            item.id === loan.id
              ? {
                  ...item,
                  id: created.id,
                  isNew: false,
                  emi: created.emi,
                  tenureMonths: created.tenure_months,
                }
              : item
          )
        );
        return;
      }

      await updateLoan(loan.id, {
        loan_name: loan.name,
        amount: Number(loan.total),
        interest_rate: Number(loan.interestRate || 10),
      });
    } catch (error) {
      console.error(error.message || 'Failed to save loan changes.');
    }
  };

  const handleAddLoan = () => {
    const newId = loans.length > 0 ? Math.max(...loans.map(l => l.id)) + 1 : 1;
    setLoans([...loans, { id: newId, name: 'KCC Apple Orchard Loan', total: 100000, emi: 5000, interestRate: 4, tenureMonths: 36, isNew: true }]);
  };

  const handleDeleteLoan = async (id) => {
    const target = loans.find((loan) => loan.id === id);
    if (!target) {
      return;
    }

    if (!target.isNew) {
      try {
        await deleteLoan(id);
      } catch (error) {
        console.error(error.message || 'Failed to delete loan.');
        return;
      }
    }

    setLoans(loans.filter((loan) => loan.id !== id));
  };
  
  const handleUpdateLoan = (id, field, value) => {
    setLoans(loans.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handlePersistLoanById = async (id) => {
    const target = loans.find((loan) => loan.id === id);
    if (!target) {
      return;
    }

    await persistLoan(target);
  };

  const buildStrategyCards = (items, emiValue) => {
    if (!Array.isArray(items) || items.length === 0) {
      return defaultStrategies;
    }

    return items.map((item, idx) => {
      const name = item.strategy || `Strategy ${idx + 1}`;
      const desc = item.description || 'Strategy generated from your current loan profile.';
      const isAvalanche = String(name).toLowerCase().includes('avalanche');
      const isSnowball = String(name).toLowerCase().includes('snowball');

      return {
        name,
        tag: isAvalanche ? 'High Interest First' : isSnowball ? 'Smallest Loans First' : 'AI Recommended',
        cost: `₹${Math.round(Number(emiValue || 0)).toLocaleString('en-IN')}`,
        freeIn: isAvalanche ? '48m' : '56m',
        saved: 'N/A',
        desc,
        accent: idx % 2 === 0 ? '#00d2ff' : '#7C3AED',
      };
    });
  };
  
  const handleGenerate = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setStepLoading(true);

    if (!currentUserId) {
      setSummaryData({
        total_balance: totalDebt,
        total_emi: totalEmi,
        emi_income_ratio: emiRatio,
      });
      setStrategyOptions(defaultStrategies);
      setUnlockedStep(1);
      setStep('summary');
      setStepLoading(false);
      return;
    }

    await persistProfile();
    await Promise.all(loans.map((loan) => persistLoan(loan)));

    setStep('processing');

    try {
      const [simulationData, loanSummary] = await Promise.all([
        runSimulation(currentUserId),
        getLoanSummary(currentUserId),
      ]);

      const summaryFromApi = simulationData?.summary || {};
      setSummaryData({
        total_balance: Number(summaryFromApi.total_balance ?? 0),
        total_emi: Number(summaryFromApi.total_emi ?? loanSummary.total_emi ?? 0),
        emi_income_ratio: Number(summaryFromApi.emi_income_ratio ?? loanSummary.emi_income_ratio ?? 0),
      });

      const recommendations = simulationData?.analysis?.recommended_strategies || [];
      setStrategyOptions(buildStrategyCards(recommendations, summaryFromApi.total_emi));
    } catch (error) {
      console.error(error.message || 'Failed to generate simulation results.');
    }

    setTimeout(() => {
        setUnlockedStep(1);
        setStep('summary');
        setStepLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500); 
  };

  const handleAnalyze = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStepLoading(true);

    if (!currentUserId) {
      setStrategyOptions(defaultStrategies);
      setUnlockedStep(2);
      setStep('strategies');
      setStepLoading(false);
      return;
    }

    try {
      if (strategyOptions.length === 0) {
        const recommendationData = await requestRecommendations(currentUserId);
        const apiStrategies = recommendationData?.analysis?.recommended_strategies || [];
        setStrategyOptions(buildStrategyCards(apiStrategies, summaryData?.total_emi || totalEmi));
      }
    } catch (error) {
      console.error(error.message || 'Failed to load recommendations.');
      setStrategyOptions(defaultStrategies);
    }

    setUnlockedStep(2);
    setStep('strategies');
    setStepLoading(false);
  };

  const handleSaveStrategy = (strategy) => {
    const savedStrategy = saveStrategy({
      name: strategy.name,
      tag: strategy.tag,
      cost: strategy.cost,
      freeIn: strategy.freeIn,
      saved: strategy.saved,
      desc: strategy.desc,
      accent: strategy.accent,
      loans: loans.map((loan) => ({
        id: loan.id,
        name: loan.name,
        total: Number(loan.total || 0),
        emi: Number(loan.emi || 0),
        interestRate: Number(loan.interestRate || 0),
      })),
      loanSignature: loans.map((loan) => `${loan.name}:${loan.total}:${loan.emi}:${loan.interestRate}`).join('|') || 'guest-empty',
    });

    setSavedStrategies((current) => [
      savedStrategy,
      ...current.filter(
        (item) => item.name !== savedStrategy.name || item.loanSignature !== savedStrategy.loanSignature
      ),
    ]);
  };

  const totalDebt = loans.reduce((sum, loan) => sum + Number(loan.total || 0), 0);
  const totalEmi = loans.reduce((sum, loan) => sum + Number(loan.emi || 0), 0);
  const emiRatio = profile.income > 0 ? Math.round((totalEmi / Number(profile.income)) * 100) : 0;
  const totalDebtValue = Number(summaryData?.total_balance ?? totalDebt);
  const totalEmiValue = Number(summaryData?.total_emi ?? totalEmi);
  const emiRatioValue = Number(summaryData?.emi_income_ratio ?? emiRatio);
  const formatLakh = (amount) => `₹${(amount / 100000).toFixed(1)}L`;

  return (
    <div className="min-h-screen bg-[#050507] pt-24 md:pt-28 pb-20 px-4 md:px-10 relative font-sans selection:bg-[#7C3AED]/30 text-white overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 md:w-screen h-80 md:h-screen bg-[#7C3AED]/10 blur-3xl md:blur-3xl rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 md:w-screen h-80 md:h-screen bg-[#6366F1]/5 blur-3xl md:blur-3xl rounded-full opacity-30" />
      </div>
      
      <main className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex items-center gap-1 shadow-2xl overflow-x-auto max-w-full no-scrollbar">
            {steps.map((s, i) => {
              const isLocked = i > unlockedStep;
              return (
                <React.Fragment key={s}>
                  <button
                    disabled={isLocked}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setStep(s);
                    }}
                    className={`px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 whitespace-nowrap ${
                      step === s 
                      ? 'bg-[#7C3AED] text-white shadow-lg shadow-purple-500/20' 
                      : isLocked 
                        ? 'text-white cursor-not-allowed' 
                        : 'text-white/30 hover:text-white cursor-pointer'
                    }`}
                  >
                    {isLocked && <Lock size={10} />}
                    {s}
                  </button>
                  {i < steps.length - 1 && <div className="w-2 md:w-4 h-px bg-white/10 shrink-0" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {isGuestMode && !loading && step === 'profile' && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-[#7C3AED]/20 bg-white/4 backdrop-blur-xl">
            <div className="flex items-center gap-4 px-4 py-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.8)] shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#C4B5FD]">
                Guest Access
              </p>
            </div>
            <div className="relative overflow-hidden py-3">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="flex w-max items-center gap-10 whitespace-nowrap px-4"
              >
                <span className="text-sm text-white/75">Use the tracker freely without logging in.</span>
                <span className="text-[#7C3AED] text-xs">•</span>
                <span className="text-sm text-white/75">Compare repayment strategies in one go.</span>
                <span className="text-[#7C3AED] text-xs">•</span>
                <span className="text-sm text-white/75">Save the plan you like and review it later in your dashboard.</span>
                <span className="text-[#7C3AED] text-xs">•</span>
                <span className="text-sm text-white/75">Use the tracker freely without logging in.</span>
                <span className="text-[#7C3AED] text-xs">•</span>
                <span className="text-sm text-white/75">Compare repayment strategies in one go.</span>
                <span className="text-[#7C3AED] text-xs">•</span>
                <span className="text-sm text-white/75">Save the plan you like and review it later in your dashboard.</span>
              </motion.div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
                <div className="w-full lg:col-span-4 space-y-6">
                  <div className="bg-[#0A0A0C] border border-white/5 rounded-4xl p-6 md:p-8 shadow-2xl">
                    <h2 className="text-lg md:text-xl font-bold mb-8 flex items-center gap-3"><Activity size={20} className="text-[#00d2ff]" /> Global Data</h2>
                    <div className="space-y-6">
                      <LuxuryInput label="Monthly Income" value={profile.income} onChange={v => setProfile({...profile, income: v})} onBlur={() => persistProfile({ income: Number(profile.income) })} />
                      <LuxuryInput label="Living Expenses" value={profile.expenses} onChange={v => setProfile({...profile, expenses: v})} onBlur={() => persistProfile({ expenses: Number(profile.expenses) })} />
                      <LuxuryInput label="Savings" value={profile.savings} onChange={v => setProfile({...profile, savings: v})} onBlur={() => persistProfile({ savings: Number(profile.savings) })} />
                    </div>
                  </div>
                </div>

                <div className="w-full lg:col-span-8 space-y-6">
                   <div className="bg-white/2 border border-white/5 backdrop-blur-3xl rounded-4xl p-6 md:p-10 shadow-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Active Liabilities</h2>
                        <button onClick={handleAddLoan} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl border border-white/10 cursor-pointer transition-all"><Plus size={14}/> Add Entry</button>
                      </div>
                      <div className="space-y-4 mb-10">
                        {loans.map((loan) => (
                          <div key={loan.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 bg-white/2 border border-white/5 rounded-2xl p-5 md:p-6 relative group transition-all">
                             <LedgerInput label="Name" value={loan.name} onChange={v => handleUpdateLoan(loan.id, 'name', v)} onBlur={() => handlePersistLoanById(loan.id)} isText />
                             <LedgerInput label="Total (₹)" value={loan.total} onChange={v => handleUpdateLoan(loan.id, 'total', v)} onBlur={() => handlePersistLoanById(loan.id)} />
                             <LedgerInput label="Monthly EMI" value={loan.emi} onChange={v => handleUpdateLoan(loan.id, 'emi', v)} onBlur={() => handlePersistLoanById(loan.id)} />
                             <LedgerInput label="Interest %" value={loan.interestRate} onChange={v => handleUpdateLoan(loan.id, 'interestRate', v)} onBlur={() => handlePersistLoanById(loan.id)} />
                             <div className="flex items-center justify-end col-span-2 md:col-span-1 pt-2 md:pt-0">
                                <button onClick={() => handleDeleteLoan(loan.id)} className="w-full md:w-10 h-10 rounded-xl md:rounded-full flex items-center justify-center text-red-500 bg-red-500/10 md:bg-transparent md:text-white/10 md:hover:bg-red-500/10 md:opacity-0 group-hover:opacity-100 transition-all cursor-pointer border md:border-0 border-red-500/20"><Trash2 size={16} className="md:mr-0 mr-2"/> <span className="md:hidden text-[10px] font-bold uppercase">Remove</span></button>
                             </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={handleGenerate} disabled={stepLoading} className="w-full py-4 md:py-5 bg-[#7C3AED] hover:bg-[#6366F1] disabled:opacity-60 text-white font-black text-xs md:text-sm uppercase tracking-[0.3em] rounded-full shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-4 cursor-pointer">
                        {stepLoading ? 'Processing...' : 'Run Simulation'} <Search size={18} />
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[60vh] flex flex-col items-center justify-center gap-8 text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-24 h-24 rounded-full border-2 border-dashed border-[#7C3AED]/20 flex items-center justify-center">
                    <Cpu size={32} className="text-[#7C3AED] animate-pulse" />
                </motion.div>
                <div className="px-4"><h2 className="text-xl md:text-2xl font-bold tracking-tighter">Analyzing Scenarios</h2><p className="text-[#7C3AED] text-[10px] font-black uppercase tracking-[0.5em] mt-2">Synchronizing Logic Nodes...</p></div>
            </motion.div>
          )}

          {step === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6 md:space-y-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatNode label="Total Debt" value={formatLakh(totalDebtValue)} icon={<Layers/>} color="text-purple-400" />
                  <StatNode label="Monthly EMI" value={`₹${totalEmiValue.toLocaleString('en-IN')}`} icon={<TrendingUp/>} color="text-red-400" />
                  <StatNode label="Savings" value={`₹${Number(profile.savings || 0).toLocaleString('en-IN')}`} icon={<CheckCircle/>} color="text-green-400" />
                  <StatNode label="EMI Ratio" value={`${emiRatioValue}%`} icon={<Clock/>} color="text-[#00d2ff]" />
               </div>
               <div className="bg-[#0A0A0C] border border-white/5 rounded-4xl md:rounded-full p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-linear-to-t from-[#7C3AED]/10 via-transparent to-transparent" />
                  <p className="text-[9px] md:text-[10px] font-black text-[#7C3AED] uppercase tracking-[0.5em] mb-4 md:mb-6">Total Net Liability</p>
                  <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 md:mb-12">₹{Math.max(totalDebtValue - Number(profile.savings || 0), 0).toLocaleString('en-IN')}</h2>
                  <button onClick={handleAnalyze} disabled={stepLoading} className="w-full md:w-auto px-10 md:px-16 py-4 md:py-6 bg-white text-black rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#EDE9FE] disabled:opacity-60 transition-all active:scale-95 cursor-pointer relative z-10">{stepLoading ? 'Loading...' : 'Compare Strategies'}</button>
               </div>
            </motion.div>
          )}

          {step === 'strategies' && (
            <motion.div key="strategies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="text-center mb-10 md:mb-16 px-4"><h2 className="text-3xl md:text-6xl font-black tracking-tighter">Tactical Paths</h2><p className="text-[#7C3AED] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mt-2">Optimal Raah-e-Maal Logic Engine v4.0</p></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {(strategyOptions.length ? strategyOptions : defaultStrategies).map((strategy, index) => (
                  <StrategyBlade
                    key={`${strategy.name}-${index}`}
                    name={strategy.name}
                    tag={strategy.tag}
                    cost={strategy.cost}
                    freeIn={strategy.freeIn}
                    saved={strategy.saved}
                    desc={strategy.desc}
                    accent={strategy.accent}
                    expanded={expandedStrategy === index}
                    isSaved={savedStrategies.some((item) => item.name === strategy.name && item.loanSignature === (loans.map((loan) => `${loan.name}:${loan.total}:${loan.emi}:${loan.interestRate}`).join('|') || 'guest-empty'))}
                    isGuestMode={isGuestMode}
                    onSave={() => handleSaveStrategy(strategy)}
                    onToggle={() => setExpandedStrategy(expandedStrategy === index ? null : index)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const LuxuryInput = ({ label, value, onChange, onBlur }) => (
  <div className="space-y-2">
    <label className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">{label}</label>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} className="w-full bg-white/5 border border-white/5 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-base md:text-lg font-bold outline-none focus:border-[#7C3AED]/50 transition-all text-white" />
  </div>
);

const LedgerInput = ({ label, value, onChange, onBlur, isText }) => {
  if (isText && label === "Name") {
    const options = [
      "KCC Apple Orchard Loan",
      "KCC Saffron Harvest Loan",
      "Mumkin Youth Transport Loan",
      "Tejaswini Women Startup Loan",
      "Artisan Pashmina Loom Loan",
      "Dal Lake Shikara Micro-Loan",
      "Cooperative Agricultural Loan",
      "Local Business Loan",
      "Personal Loan"
    ];
    
    // Fallback if the loaded name is custom or generic, select it or default to first
    const currentValue = options.includes(value) ? value : value || options[0];

    return (
      <div className="space-y-1">
        <label className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</label>
        <select 
          value={currentValue} 
          onChange={e => onChange(e.target.value)} 
          onBlur={onBlur} 
          className="w-full bg-transparent border-b border-white/10 py-1 text-xs md:text-sm font-bold focus:border-[#7C3AED] transition-all outline-none text-white cursor-pointer [&_option]:bg-slate-950 [&_option]:text-white"
        >
          {!options.includes(value) && value && (
            <option value={value}>{value}</option>
          )}
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</label>
      <input type={isText ? "text" : "number"} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} className="w-full bg-transparent border-b border-white/10 py-1 text-xs md:text-sm font-bold focus:border-[#7C3AED] transition-colors outline-none text-white" />
    </div>
  );
};

const StatNode = ({ label, value, icon, color }) => (
  <div className="bg-white/3 border border-white/5 rounded-2xl md:rounded-4xl p-5 md:p-8 shadow-xl backdrop-blur-xl group transition-all">
    <div className={`${color} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>{icon}</div>
    <p className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">{label}</p>
    <p className="text-lg md:text-xl font-bold text-white">{value}</p>
  </div>
);

const StrategyBlade = ({ name, tag, cost, freeIn, saved, desc, accent, expanded, onToggle, onSave, isSaved, isGuestMode }) => (
  <div className={`relative bg-[#0A0A0C] border border-white/5 rounded-4xl md:rounded-4xl transition-all duration-700 overflow-hidden ${expanded ? 'ring-1 ring-white/20 shadow-2xl opacity-100' : 'opacity-60 hover:opacity-100'}`}>
    <div className="p-6 md:p-10 cursor-pointer" onClick={onToggle}>
      <div className="flex justify-between items-start mb-6 md:mb-8 text-left">
        <div><h3 className="text-xl md:text-3xl font-bold tracking-tight mb-1 text-white">{name}</h3><span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{tag}</span></div>
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 shrink-0 ${expanded ? 'rotate-45 bg-white text-black' : 'text-white'}`}><Plus size={16} /></div>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-6 py-6 md:py-8 border-y border-white/5 text-left">
         <div><p className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase mb-1 tracking-widest">Monthly</p><p className="text-sm md:text-lg font-black text-white">{cost}</p></div>
         <div><p className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase mb-1 tracking-widest">Horizon</p><p className="text-sm md:text-lg font-black text-white">{freeIn}</p></div>
         <div><p className="text-[8px] md:text-[9px] font-black text-green-400 uppercase mb-1 tracking-widest">Saved</p><p className="text-sm md:text-lg font-black text-green-400">{saved}</p></div>
      </div>
      <AnimatePresence>{expanded && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 md:pt-8 text-left"><p className="text-white/40 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-light italic">"{desc}"</p><button onClick={(event) => { event.stopPropagation(); onSave(); }} className={`w-full py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.3em] cursor-pointer shadow-lg active:scale-95 transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-[#7C3AED] text-white'}`}>{isSaved ? 'Saved To Dashboard' : 'Save Strategy'}</button>{isGuestMode && <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Save now, then review it later in your dashboard.</p>}</motion.div>)}</AnimatePresence>
    </div>
  </div>
);

export default Tracker;