import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(240); // in months
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate EMI using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                    (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emiValue * tenure;
    const interestAmount = totalPayment - principal;

    setEmi(emiValue);
    setTotalInterest(interestAmount);
    setTotalAmount(totalPayment);
  };

  useEffect(() => {
    calculateEMI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, interestRate, tenure]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-[#7C3AED]" />
        <h3 className="text-xl font-bold text-white">Loan Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Principal Amount */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Principal Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED]"
              min="0"
              step="10000"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Interest Rate (% per annum)
          </label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED]"
              min="0"
              max="30"
              step="0.1"
            />
          </div>
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Loan Tenure (months)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED]"
              min="1"
              max="360"
              step="1"
            />
          </div>
        </div>

        {/* Tenure in Years */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Tenure (Years)
          </label>
          <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
            {(tenure / 12).toFixed(1)} years
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm mb-1">Monthly EMI</p>
          <p className="text-white text-xl font-bold">{formatCurrency(emi)}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-300 text-sm mb-1">Total Interest</p>
          <p className="text-white text-xl font-bold">{formatCurrency(totalInterest)}</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-300 text-sm mb-1">Total Amount</p>
          <p className="text-white text-xl font-bold">{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      {/* Interest Breakdown */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60">Principal Amount</span>
          <span className="text-white font-medium">{formatCurrency(principal)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60">Interest Amount</span>
          <span className="text-white font-medium">{formatCurrency(totalInterest)}</span>
        </div>
        <div className="h-px bg-white/10 my-2"></div>
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Total Payment</span>
          <span className="text-white font-bold">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-6">
        <p className="text-white/60 text-sm mb-3">Quick Presets:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => {
              setPrincipal(1000000);
              setInterestRate(8.5);
              setTenure(240);
            }}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors"
          >
            Home Loan
          </button>
          <button
            onClick={() => {
              setPrincipal(500000);
              setInterestRate(9.0);
              setTenure(84);
            }}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors"
          >
            Car Loan
          </button>
          <button
            onClick={() => {
              setPrincipal(200000);
              setInterestRate(12.0);
              setTenure(48);
            }}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors"
          >
            Personal Loan
          </button>
          <button
            onClick={() => {
              setPrincipal(1500000);
              setInterestRate(7.5);
              setTenure(300);
            }}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-colors"
          >
            Education Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
