import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Activity,
  Database,
  CheckCircle2,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
  Search,
  UserCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { apiRequest } from '../services/api';

const Admin = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersData = await apiRequest('/api/users/admin/all-users');
        
        // Fetch all loans
        const loansData = await apiRequest('/api/loans/admin/all');

        if (usersData && loansData) {
          // Transform users data to include loan info
          const usersWithLoans = usersData.map(user => {
            const userLoans = loansData.filter(loan => loan.user_id === user.id);
            const totalDebt = userLoans.reduce((sum, loan) => sum + (loan.amount || 0), 0);
            return {
              id: `USER-${user.id}`,
              userId: user.id,
              name: user.username,
              loans: userLoans.length,
              status: 'Active',
              debt: totalDebt,
            };
          });
          
          setUsers(usersWithLoans);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const activeUsers = users.length;
    const loanPayers = users.filter((u) => Number(u.debt) > 0).length;
    const totalLoans = users.reduce((acc, u) => acc + u.loans, 0);

    setGraphData([
      { name: 'Total Users', value: activeUsers, tone: '#7C3AED' },
      { name: 'Active Loans', value: totalLoans, tone: '#22C55E' },
      { name: 'Loan Payers', value: loanPayers, tone: '#F59E0B' },
    ]);
  }, [users]);

  const totalLoans = users.reduce((acc, u) => acc + u.loans, 0);
  const debtFreeCount = users.filter((u) => Number(u.debt) === 0).length;
  const filteredNodes = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sovereigns = users.filter((u) => Number(u.debt) === 0);
  const activeUsersCount = users.length;
  const loanPayersCount = users.filter((u) => Number(u.debt) > 0).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#020203]">
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  const theme = {
    bg: isDarkMode ? 'bg-[#020203]' : 'bg-[#F8FAFC]',
    card: isDarkMode ? 'bg-white/[0.02] border-white/10 backdrop-blur-3xl' : 'bg-white border-zinc-200 shadow-xl',
    text: isDarkMode ? 'text-white' : 'text-zinc-900',
    muted: isDarkMode ? 'text-zinc-500' : 'text-zinc-600',
    nav: isDarkMode ? 'bg-[#050507]' : 'bg-white',
    border: isDarkMode ? 'border-white/5' : 'border-zinc-200',
  };

  return (
    <div className={`h-screen ${theme.bg} ${theme.text} flex overflow-hidden transition-colors duration-1000 font-sans [&_button]:cursor-pointer`}>
      <aside className={`w-64 ${theme.nav} border-r ${theme.border} flex flex-col z-30 transition-all relative overflow-hidden`}>
        <div className={`absolute inset-x-0 top-0 h-40 ${isDarkMode ? 'bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_65%)]' : 'bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.12),_transparent_70%)]'} pointer-events-none`} />
        <div className="p-8 mb-4 flex items-center gap-3 relative">
          <div className="w-11 h-11 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(124,58,237,0.28)]">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter uppercase italic block">Raah-e-Maal</span>
            <span className={`text-[9px] font-black uppercase tracking-[0.35em] ${theme.muted}`}>Admin Console</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 relative">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activePage === 'Dashboard'} onClick={() => setActivePage('Dashboard')} isDarkMode={isDarkMode} />
          <NavItem icon={<Users size={18} />} label="Identity Nodes" active={activePage === 'Nodes'} onClick={() => setActivePage('Nodes')} isDarkMode={isDarkMode} />
          <NavItem icon={<UserCheck size={18} />} label="Debt Sovereigns" active={activePage === 'Sovereigns'} onClick={() => setActivePage('Sovereigns')} isDarkMode={isDarkMode} />
        </nav>

        <div className={`p-8 border-t ${theme.border} relative`}>
          <button onClick={onLogout} className={`flex items-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500 hover:text-red-500' : 'text-zinc-600 hover:text-red-500'}`}>
            <LogOut size={16} /> Terminate Root
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08),_transparent_28%)]' : 'bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.1),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.06),_transparent_24%)]'} pointer-events-none`} />
        <header className={`h-24 px-10 flex items-center justify-between border-b ${theme.border} backdrop-blur-xl relative`}>
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7C3AED]">Sovereign Control</h2>
            <h1 className="text-xl font-bold tracking-tight uppercase tracking-widest">{activePage}</h1>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle isDarkMode={isDarkMode} toggle={() => setIsDarkMode(!isDarkMode)} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border shadow-inner ${isDarkMode ? 'bg-zinc-800 border-white/10' : 'bg-white border-zinc-200'}`}>AD</div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {activePage === 'Dashboard' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard label="Total Users" value={users.length} icon={<Users />} color="text-blue-400" theme={theme} />
                  <StatCard label="App Status" value="Operational" icon={<Activity />} color="text-green-400" theme={theme} pulse />
                  <StatCard label="Total Loans" value={totalLoans} icon={<Database />} color="text-purple-400" theme={theme} />
                  <StatCard label="Debt Free" value={debtFreeCount} icon={<CheckCircle2 />} color="text-emerald-400" theme={theme} />
                </div>

                <div className={`p-10 rounded-[40px] border ${theme.card} relative overflow-hidden`}>
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[linear-gradient(180deg,rgba(124,58,237,0.10),transparent_35%)]' : 'bg-[linear-gradient(180deg,rgba(124,58,237,0.06),transparent_35%)]'} pointer-events-none`} />
                  <div className="flex justify-between items-start mb-10 relative">
                    <div>
                      <h3 className="text-2xl font-serif italic mb-1">Portfolio Pressure Ladder</h3>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>Real-time counts for active, deactivated, and currently paying users</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Logic: Nominal</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1.6fr_0.9fr] gap-8 items-end relative">
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={graphData} barCategoryGap="28%">
                          <CartesianGrid vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(24,24,27,0.08)'} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: isDarkMode ? '#71717A' : '#52525B', fontSize: 11, fontWeight: 700 }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fill: isDarkMode ? '#71717A' : '#52525B', fontSize: 11, fontWeight: 700 }} />
                          <Tooltip
                            cursor={{ fill: isDarkMode ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.06)' }}
                            contentStyle={{
                              backgroundColor: isDarkMode ? '#09090B' : '#FFFFFF',
                              borderRadius: '18px',
                              border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(24,24,27,0.08)',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                            }}
                          />
                          <Bar dataKey="value" radius={[12, 12, 4, 4]}>
                            {graphData.map((entry, index) => (
                              <Cell key={`value-${index}`} fill={entry.tone} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <InsightCard label="Total Users" value={activeUsersCount} tone="text-[#7C3AED]" theme={theme} />
                      <InsightCard label="Total Loans" value={totalLoans} tone="text-emerald-400" theme={theme} />
                      <InsightCard label="Loan Payers" value={loanPayersCount} tone="text-yellow-400" theme={theme} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activePage === 'Nodes' && (
              <motion.div key="nodes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.muted}`} size={16} />
                    <input
                      type="text"
                      placeholder="Search Identity..."
                      className={`pl-12 pr-6 py-3 rounded-full border ${theme.border} ${isDarkMode ? 'bg-white/[0.02]' : 'bg-white'} outline-none focus:border-[#7C3AED] transition-all min-w-[300px]`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.35em] ${theme.muted}`}>Read Only Registry</p>
                </div>

                <div className={`${theme.card} rounded-[32px] overflow-hidden border`}>
                  <table className="w-full text-left">
                    <thead className={`border-b ${theme.border} text-[10px] font-black uppercase ${theme.muted}`}>
                      <tr>
                        <th className="p-6">Node ID</th>
                        <th className="p-6">Identity</th>
                        <th className="p-6">Debt (?)</th>
                        <th className="p-6">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNodes.map((u) => (
                        <tr key={u.id} className={`border-b ${theme.border} hover:bg-[#7C3AED]/5 transition-all`}>
                          <td className="p-6 font-mono text-[10px] text-[#7C3AED] tracking-widest">{u.id}</td>
                          <td className="p-6 font-bold">{u.name}</td>
                          <td className="p-6 font-medium tracking-tight">?{u.debt.toLocaleString()}</td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${u.status === 'Deactivated' ? 'bg-slate-500/10 text-slate-400' : 'bg-blue-500/10 text-blue-500'}`}>
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activePage === 'Sovereigns' && (
              <motion.div key="sovereigns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-3xl font-serif italic tracking-tight">Debt Sovereigns</h2>
                <p className={`${theme.muted} text-sm max-w-lg mb-8`}>Users who have successfully engineered their financial freedom and completed all active loan nodes.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sovereigns.map((u) => (
                    <div key={u.id} className={`${theme.card} p-8 rounded-[32px] flex items-center justify-between group border relative overflow-hidden`}>
                      <div className={`absolute inset-0 ${isDarkMode ? 'bg-[linear-gradient(135deg,rgba(16,185,129,0.08),transparent_55%)]' : 'bg-[linear-gradient(135deg,rgba(16,185,129,0.05),transparent_55%)]'} pointer-events-none`} />
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                          <UserCheck size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{u.name}</h4>
                          <p className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>{u.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-green-500 uppercase px-3 py-1 bg-green-500/10 rounded-lg">Verified Sovereign</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, isDarkMode }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-[#7C3AED]/10 text-[#7C3AED] shadow-[inset_0_0_0_1px_rgba(124,58,237,0.18)]' : isDarkMode ? 'text-zinc-500 hover:text-white hover:bg-white/5' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'}`}>
    <div className={active ? 'text-[#7C3AED]' : isDarkMode ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'}>{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    {active && <motion.div layoutId="sidebarActive" className="ml-auto w-1 h-4 bg-[#7C3AED] rounded-full" />}
  </button>
);

const StatCard = ({ label, value, icon, color, theme, pulse }) => (
  <div className={`${theme.card} p-8 rounded-[32px] group hover:scale-[1.02] transition-all duration-500 border relative overflow-hidden`}>
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.08),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className={`mb-6 ${color} group-hover:scale-110 transition-transform relative`}>{icon}</div>
    <p className={`text-[9px] font-black uppercase tracking-widest ${theme.muted} mb-2`}>{label}</p>
    <div className="flex items-center gap-2 relative">
      <h4 className="text-2xl font-bold tracking-tight">{value}</h4>
      {pulse && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
    </div>
  </div>
);

const InsightCard = ({ label, value, tone, theme }) => (
  <div className={`rounded-[26px] p-5 border ${theme.card}`}>
    <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.muted}`}>{label}</p>
    <p className={`mt-3 text-3xl font-black tracking-tight ${tone}`}>{value}</p>
  </div>
);

const ThemeToggle = ({ isDarkMode, toggle }) => (
  <div onClick={toggle} className="w-14 h-7 rounded-full p-1 bg-zinc-800 cursor-pointer flex items-center relative border border-white/5">
    <motion.div animate={{ x: isDarkMode ? 28 : 0 }} className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center z-10">
      {isDarkMode ? <Moon size={10} className="text-white" /> : <Sun size={10} className="text-white" />}
    </motion.div>
    <Sun size={10} className={`absolute left-2 text-zinc-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
    <Moon size={10} className={`absolute right-2 text-zinc-500 ${!isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
  </div>
);

export default Admin;
