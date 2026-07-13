// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   LayoutDashboard, 
//   Wallet, 
//   ArrowUpRight, 
//   ArrowDownLeft, 
//   RefreshCcw, 
//   TrendingUp, 
//   ShieldCheck, 
//   Bell, 
//   Search,
//   MoreVertical,
//   Plus,
//   CreditCard,
//   Cpu,
//   History,
//   ChevronRight,
//   ArrowRight
// } from 'lucide-react';

// // --- Mock Data ---
// const TRANSACTIONS = [
//   { id: 1, type: 'inbound', name: 'Node Rewards', amount: '+0.042 ETH', status: 'Verified', date: '2 mins ago' },
//   { id: 2, type: 'outbound', name: 'Siffrum Swap', amount: '-1,240.00 USDC', status: 'Complete', date: '1 hour ago' },
//   { id: 3, type: 'inbound', name: 'Treasury Yield', amount: '+842.10 USDT', status: 'Processing', date: '5 hours ago' },
// ];

// const ASSETS = [
//   { name: 'Ethereum', symbol: 'ETH', balance: '12.45', value: '$28,450.00', change: '+4.2%' },
//   { name: 'Solana', symbol: 'SOL', balance: '450.20', value: '$12,120.50', change: '-1.5%' },
//   { name: 'Bitcoin', symbol: 'BTC', balance: '0.82', value: '$34,100.20', change: '+0.8%' },
// ];

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   return (
//     <div className="min-h-screen bg-[#0F1115] text-white font-sans selection:bg-[#7C3AED]/30 flex">
      
//       {/* --- SIDEBAR NAVIGATION --- */}
//       <aside className="hidden lg:flex w-72 border-r border-white/5 flex-col p-8 bg-[#0F1115] sticky top-0 h-screen">
//         <div className="flex items-center gap-3 mb-12">
//           <div className="w-10 h-10 bg-[#7C3AED] rounded-xl flex items-center justify-center">
//             <Cpu className="text-white" size={24} />
//           </div>
//           <span className="text-xl font-black tracking-tighter uppercase">Siffrum</span>
//         </div>

//         <nav className="space-y-2 flex-1">
//           {[
//             { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Command Center' },
//             { id: 'assets', icon: <Wallet size={20} />, label: 'Asset Nodes' },
//             { id: 'history', icon: <History size={20} />, label: 'Uplink Log' },
//             { id: 'security', icon: <ShieldCheck size={20} />, label: 'Encryption' },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-sm font-bold tracking-wide uppercase ${
//                 activeTab === item.id 
//                 ? 'bg-white/5 text-[#7C3AED] border border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.1)]' 
//                 : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         <div className="p-6 rounded-[30px] bg-gradient-to-br from-[#7C3AED]/20 to-transparent border border-[#7C3AED]/20">
//           <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-[0.2em] mb-2">System Status</p>
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-xs font-semibold">Nodes Active</span>
//           </div>
//           <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#EDE9FE] transition-colors">
//             Upgrade Access
//           </button>
//         </div>
//       </aside>

//       {/* --- MAIN CONTENT --- */}
//       <main className="flex-1 min-w-0 overflow-y-auto px-6 lg:px-12 py-10">
        
//         {/* TOP BAR */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Command Center</h1>
//             <p className="text-white/40 text-sm font-medium">Welcome back, operative. System sync 100%.</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="relative group">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#7C3AED] transition-colors" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search Protocol..." 
//                 className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-[#7C3AED]/50 transition-all w-64 text-sm"
//               />
//             </div>
//             <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors relative">
//               <Bell size={20} />
//               <span className="absolute top-3 right-3 w-2 h-2 bg-[#7C3AED] rounded-full border-2 border-[#0F1115]" />
//             </button>
//           </div>
//         </header>

//         {/* HERO CARDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
//           {/* MAIN BALANCE CARD */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="lg:col-span-2 relative overflow-hidden p-10 rounded-[40px] bg-[#16191E] border border-white/5 shadow-2xl group"
//           >
//             <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-[#7C3AED]/20 transition-all duration-700" />
            
//             <div className="relative z-10">
//               <div className="flex justify-between items-start mb-10">
//                 <div>
//                   <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-[0.3em] mb-2">Total Combined Liquidity</p>
//                   <h2 className="text-5xl md:text-6xl font-black tracking-tighter">$142,500.82</h2>
//                 </div>
//                 <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 flex items-center gap-2">
//                   <TrendingUp size={16} />
//                   <span className="text-xs font-bold">+12.4%</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <button className="flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-[#6366F1] py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all">
//                   <ArrowUpRight size={16} /> Transmit
//                 </button>
//                 <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all">
//                   <ArrowDownLeft size={16} /> Receive
//                 </button>
//                 <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all">
//                   <RefreshCcw size={16} /> Swap
//                 </button>
//               </div>
//             </div>
//           </motion.div>

//           {/* SECONDARY CARD - SECURE NODE */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col justify-between"
//           >
//             <div>
//               <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] mb-6">
//                 <ShieldCheck size={24} />
//               </div>
//               <h3 className="text-xl font-bold tracking-tight mb-2">Vault Security</h3>
//               <p className="text-white/40 text-sm leading-relaxed">Multi-sig node authentication is active on all outbound transfers.</p>
//             </div>
//             <div className="mt-8 space-y-4">
//                <div className="flex justify-between text-xs font-bold">
//                   <span className="text-white/40 uppercase">Node Health</span>
//                   <span className="text-white">99.9%</span>
//                </div>
//                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
//                   <motion.div 
//                     initial={{ width: 0 }}
//                     animate={{ width: '99.9%' }}
//                     transition={{ duration: 1.5 }}
//                     className="h-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1]" 
//                   />
//                </div>
//             </div>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* RECENT TRANSACTIONS */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold tracking-tight">Recent Uplinks</h3>
//               <button className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-[0.2em] flex items-center gap-2">
//                 View All <ArrowRight size={14} />
//               </button>
//             </div>

//             <div className="space-y-3">
//               {TRANSACTIONS.map((tx, i) => (
//                 <motion.div 
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   key={tx.id}
//                   className="group flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-3xl transition-all cursor-pointer"
//                 >
//                   <div className="flex items-center gap-5">
//                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
//                       tx.type === 'inbound' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[#7C3AED]/10 text-[#7C3AED]'
//                     }`}>
//                       {tx.type === 'inbound' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-sm tracking-wide uppercase">{tx.name}</h4>
//                       <p className="text-xs text-white/30 font-medium">{tx.date}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-black text-sm ${tx.type === 'inbound' ? 'text-emerald-500' : 'text-white'}`}>
//                       {tx.amount}
//                     </p>
//                     <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{tx.status}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* HOLDINGS/ASSETS */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-bold tracking-tight">Asset Nodes</h3>
//             <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 space-y-8">
//               {ASSETS.map((asset, i) => (
//                 <div key={asset.symbol} className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-black text-xs">
//                       {asset.symbol[0]}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-sm">{asset.name}</h4>
//                       <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{asset.balance} {asset.symbol}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-bold">{asset.value}</p>
//                     <p className={`text-[10px] font-black ${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
//                       {asset.change}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-[#7C3AED] hover:border-[#7C3AED]/50 transition-all flex items-center justify-center gap-2">
//                 <Plus size={14} /> Initialize New Node
//               </button>
//             </div>
//           </div>

//         </div>
//       </main>

//       {/* --- FLOATING SECURE FOOTER --- */}
//       <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
//         <motion.div 
//           whileHover={{ scale: 1.05 }}
//           className="bg-[#7C3AED] p-4 rounded-2xl shadow-[0_20px_40px_rgba(124,58,237,0.4)] cursor-pointer flex items-center gap-3 px-6"
//         >
//           <Cpu size={20} className="animate-pulse" />
//           <span className="text-[10px] font-black uppercase tracking-widest">Siffrum AI Terminal</span>
//         </motion.div>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { 
  LayoutDashboard, Wallet, FileText, Calculator, 
  Calendar, MessageSquare, Settings, LogOut, 
  ChevronRight, Activity, ShieldCheck, Video, Clock 
} from 'lucide-react';

const RaahEMaalDashboardContent = () => {
  return (
    <div className="min-h-screen bg-[#060709] text-white font-['Inter'] flex mt-15">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-[#0F1115] shrink-0 h-screen sticky top-0">
        <nav className="flex-1 px-4 space-y-8 mt-4">
          <div>
            <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase mb-4 px-4 mt-15">Navigation</p>
            <div className="space-y-1">
              <SidebarItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
              <SidebarItem icon={<Wallet size={18}/>} label="salary" />
              <SidebarItem icon={<FileText size={18}/>} label="Activeloans" />
              <SidebarItem icon={<Calculator size={18}/>} label="savings" />
              {/* <SidebarItem icon={<Calendar size={18}/>} label="Appointments" />
              <SidebarItem icon={<MessageSquare size={18}/>} label="Messages" /> */}
            </div>
          </div>
        </nav>
        <div className="p-4 border-t border-white/5 space-y-1">
          <SidebarItem icon={<Settings size={18}/>} label="Settings" />
          <SidebarItem icon={<LogOut size={18}/>} label="Log Out" />
        </div>
      </aside>

      {/* --- MAIN DASHBOARD AREA --- */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12">
        
        {/* WELCOME SECTION: Fixed line-height and spacing */}
        <section className="pt-4">
          <h2 className="text-5xl font-black italic tracking-tighter leading-[1.1]">
            Welcome back, <span className="text-purple-500 not-italic">John</span>
          </h2>
          <p className="text-white/40 font-light italic mt-3 max-w-2xl">
            Here's an overview of your loan portfolio and upcoming consultations. 
            All uplink channels are currently <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest">Active</span>.
          </p>
        </section>

        {/* STATS ROW: Fixed icon overlaying by using flex-col flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Wallet size={18}/>} label="Total Borrowed" value="$124,500" trend="+2.5%" />
          <StatCard icon={<Activity size={18}/>} label="Total Paid" value="$43,200" trend="+$2,400" />
          <StatCard icon={<FileText size={18}/>} label="Active Loans" value="3" trend="Stable" />
          <StatCard icon={<ShieldCheck size={18}/>} label="Credit Score" value="742" trend="+12 pts" />
        </div>

        {/* GRID LAYOUT: Loans & Consultations */}
        <div className="grid grid-cols-12 gap-10">
          
          {/* Active Loans Section */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black italic uppercase tracking-widest text-white/80">Active Loans</h3>
              <button className="text-[10px] font-bold text-purple-500 tracking-[0.2em] uppercase hover:text-white transition-colors">View All Channel Access</button>
            </div>

            {/* Loan Card: Matching your Inspo spacing */}
            <div className="bg-[#16181D]/60 border border-white/5 rounded-4xl p-8 hover:border-purple-500/20 transition-all group">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h4 className="text-2xl font-bold italic leading-none mb-2 group-hover:text-purple-400 transition-colors">Home Mortgage</h4>
                  <p className="text-xs text-white/30 italic">Fixed Rate Architecture · 30 Year Uplink</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest">
                  5.25% APR
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">
                    Paid: <span className="text-white">$28,900</span> <span className="mx-2">/</span> Total: <span className="text-white/60">$85,000</span>
                  </p>
                  <span className="text-2xl font-black italic text-purple-500">34%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-linear-to-r from-purple-700 to-purple-500 w-[34%] rounded-full shadow-[0_0_15px_rgba(147,51,234,0.4)]" />
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-white/5">
                 <div className="flex gap-10">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest font-bold text-white/20 mb-1">Next Payout</p>
                        <p className="text-lg font-bold tracking-tight">$1,245.00</p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest font-bold text-white/20 mb-1">Due Date</p>
                        <p className="text-sm font-mono text-purple-400">04.01.2026</p>
                    </div>
                 </div>
                 <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all">
                    <ChevronRight size={18} />
                 </button>
              </div>
            </div>
          </div>

          {/* Consultation Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <h3 className="text-lg font-black italic uppercase tracking-widest text-white/80">Consultations</h3>
            
            <div className="bg-[#16181D]/60 border border-white/5 rounded-4xl p-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-900/20 flex items-center justify-center text-2xl font-bold text-purple-400 border-2 border-purple-500/20">
                  SM
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-4 border-[#16181D] rounded-full shadow-lg" />
              </div>
              
              <h4 className="font-bold italic text-xl leading-none">Sarah Miller</h4>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mt-3 mb-8">Mortgage Architect</p>
              
              <div className="w-full space-y-3 mb-8">
                <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                    <Clock size={14} className="text-purple-500" />
                    <span className="text-xs font-medium">Tomorrow, 10:30 AM</span>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                    <Video size={14} className="text-purple-500" />
                    <span className="text-xs font-medium">Video Uplink</span>
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-purple-900/20 active:scale-95">
                Initiate Consultation
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SidebarItem = ({ icon, label, active = false }) => (
  <a href="#" className={`
    flex items-center gap-4 p-3.5 rounded-2xl transition-all group
    ${active ? 'bg-purple-500/10 text-purple-400 border border-purple-500/10 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]' : 'text-white/30 hover:text-white hover:bg-white/5'}
  `}>
    <span className={active ? 'text-purple-500' : 'group-hover:text-purple-500 transition-colors'}>{icon}</span>
    <span className="text-[11px] font-bold tracking-tight uppercase">{label}</span>
  </a>
);

const StatCard = ({ icon, label, value, trend }) => (
  <div className="bg-[#16181D]/60 border border-white/5 p-6 rounded-[28px] hover:border-purple-500/20 transition-all flex flex-col justify-between h-40">
    <div className="flex justify-between items-center">
      <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-purple-500 border border-white/5">
        {icon}
      </div>
      <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">
        {trend}
      </span>
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-black italic tracking-tighter leading-none mb-2">{value}</h3>
      <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-none">{label}</p>
    </div>
  </div>
);
export default RaahEMaalDashboardContent;
