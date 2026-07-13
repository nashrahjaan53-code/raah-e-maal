import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Percent, Plus, Search, Edit, Trash2, Eye, Calculator } from 'lucide-react';
import { loansAPI, formatCurrency, formatDate } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    user_id: 1,
    loan_name: '',
    amount: '',
    emi: '',
    interest_rate: ''
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const data = await loansAPI.getAll();
      setLoans(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch loans');
      console.error('Loans fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      user_id: 1,
      loan_name: '',
      amount: '',
      emi: '',
      interest_rate: ''
    });
  };

  // Open create modal
  const handleOpenCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  // Close create modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    resetForm();
  };

  // Create new loan
  const handleCreateLoan = async (loanData) => {
    try {
      const newLoan = await loansAPI.create(loanData);
      setLoans(prev => [newLoan, ...prev]);
      setIsCreateModalOpen(false);
      toast.success('Loan created successfully!');
    } catch {
      toast.error('Failed to create loan');
    }
  };

  const handleDeleteLoan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this loan?')) return;
    
    try {
      await loansAPI.delete(id);
      setLoans(prev => prev.filter(loan => loan.id !== id));
      setShowDetails(false);
      setSelectedLoan(null);
      toast.success('Loan deleted successfully!');
    } catch {
      toast.error('Failed to delete loan');
    }
  };

  const calculateTotalInterest = (loan) => {
    const principal = loan.amount || 0;
    const tenure = loan.tenure || 0;
    const emi = loan.emi || 0;
    const totalPayment = emi * tenure;
    return totalPayment - principal;
  };

  const filteredLoans = loans.filter(loan =>
    loan.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.borrower_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalAmount: loans.reduce((sum, loan) => sum + (loan.amount || 0), 0),
    totalEMI: loans.reduce((sum, loan) => sum + (loan.emi || 0), 0),
    avgInterest: loans.length > 0 ? loans.reduce((sum, loan) => sum + (loan.interest_rate || 0), 0) / loans.length : 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Loans</h1>
            <p className="text-white/60">Manage and track all loans</p>
          </div>
          <button 
            onClick={handleOpenCreateModal}
            className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Loan
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="text-purple-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-medium">+12%</span>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Total Amount</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalAmount)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-medium">+8%</span>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Monthly EMI</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalEMI)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Percent className="text-orange-400" size={24} />
              </div>
              <span className="text-red-400 text-sm font-medium">-2%</span>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Avg. Interest Rate</h3>
            <p className="text-2xl font-bold text-white">{totalStats.avgInterest.toFixed(1)}%</p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Loans Table */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-red-400" size={32} />
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchLoans}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/60 font-medium">Loan Details</th>
                    <th className="text-left p-4 text-white/60 font-medium">Borrower</th>
                    <th className="text-left p-4 text-white/60 font-medium">Amount</th>
                    <th className="text-left p-4 text-white/60 font-medium">Interest</th>
                    <th className="text-left p-4 text-white/60 font-medium">EMI</th>
                    <th className="text-left p-4 text-white/60 font-medium">Tenure</th>
                    <th className="text-left p-4 text-white/60 font-medium">Status</th>
                    <th className="text-left p-4 text-white/60 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan, index) => (
                    <motion.tr
                      key={loan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{loan.loan_name || 'Unnamed Loan'}</p>
                          <p className="text-white/40 text-sm">ID: {loan.id}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white">{loan.borrower_name || 'N/A'}</p>
                        {loan.borrower_email && (
                          <p className="text-white/40 text-sm">{loan.borrower_email}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="text-white font-medium">{formatCurrency(loan.amount || 0)}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-400 font-medium">{loan.interest_rate || 0}%</span>
                          <TrendingUp className="text-orange-400" size={16} />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white font-medium">{formatCurrency(loan.emi || 0)}</p>
                        <p className="text-white/40 text-sm">/month</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-white/40" size={16} />
                          <span className="text-white">{loan.tenure || 0} months</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          loan.status === 'active' 
                            ? 'bg-green-500/20 text-green-400'
                            : loan.status === 'completed'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {loan.status || 'active'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedLoan(loan);
                              setShowDetails(true);
                            }}
                            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteLoan(loan.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredLoans.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="text-white/20 mx-auto mb-4" size={48} />
                  <p className="text-white/40">
                    {searchTerm ? 'No loans found matching your search' : 'No loans found'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Loan Details Modal */}
      {showDetails && selectedLoan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Loan Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Loan Name</p>
                  <p className="text-white font-medium">{selectedLoan.loan_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Principal Amount</p>
                  <p className="text-white font-medium">{formatCurrency(selectedLoan.amount || 0)}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Interest Rate</p>
                  <p className="text-white font-medium">{selectedLoan.interest_rate || 0}% per annum</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Monthly EMI</p>
                  <p className="text-white font-medium">{formatCurrency(selectedLoan.emi || 0)}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Loan Tenure</p>
                  <p className="text-white font-medium">{selectedLoan.tenure || 0} months</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Interest</p>
                  <p className="text-white font-medium">{formatCurrency(calculateTotalInterest(selectedLoan))}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Payment</p>
                  <p className="text-white font-medium">{formatCurrency((selectedLoan.emi || 0) * (selectedLoan.tenure || 0))}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedLoan.status === 'active' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {selectedLoan.status || 'active'}
                  </span>
                </div>
              </div>
            </div>

            {selectedLoan.borrower_name && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Borrower Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Name</p>
                    <p className="text-white">{selectedLoan.borrower_name}</p>
                  </div>
                  {selectedLoan.borrower_email && (
                    <div>
                      <p className="text-white/60 text-sm mb-1">Email</p>
                      <p className="text-white">{selectedLoan.borrower_email}</p>
                    </div>
                  )}
                  {selectedLoan.borrower_phone && (
                    <div>
                      <p className="text-white/60 text-sm mb-1">Phone</p>
                      <p className="text-white">{selectedLoan.borrower_phone}</p>
                    </div>
                  )}
                  {selectedLoan.created_at && (
                    <div>
                      <p className="text-white/60 text-sm mb-1">Created On</p>
                      <p className="text-white">{formatDate(selectedLoan.created_at)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {/* Create Loan Modal */}
        {isCreateModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseCreateModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Loan</h2>
              <button
                onClick={handleCloseCreateModal}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateLoan({
                ...formData,
                amount: parseFloat(formData.amount),
                emi: parseFloat(formData.emi),
                interest_rate: parseFloat(formData.interest_rate)
              });
            }} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Loan Name
                </label>
                <input
                  type="text"
                  name="loan_name"
                  value={formData.loan_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                  placeholder="e.g., Home Loan, Car Loan"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                  placeholder="e.g., 500000"
                  min="0"
                  step="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Monthly EMI (₹)
                </label>
                <input
                  type="number"
                  name="emi"
                  value={formData.emi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                  placeholder="e.g., 8000"
                  min="0"
                  step="100"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  name="interest_rate"
                  value={formData.interest_rate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                  placeholder="e.g., 8.5"
                  min="0"
                  max="30"
                  step="0.1"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
                >
                  Add Loan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Loans;
