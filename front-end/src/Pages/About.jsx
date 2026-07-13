
// import React, { useEffect, useRef, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { 
//   Rocket, Shield, Cpu, Zap, ArrowRight, 
//   Globe, Target, Activity, Users, 
//   ChevronDown, Binary, Fingerprint, Code, Database, Sparkles, MapPin, Terminal,
//   TrendingUp, Clock, Unlock, Share2, Server, BarChart3, Lock, ShieldCheck
// } from 'lucide-react';

// const AboutPage = () => {
//   const containerRef = useRef(null);
  
//   // --- SLIDER STATE FOR SECTION 2 ---
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     {
//       label: "// THE ORIGIN",
//       title: "Founded in the Shadow of Crisis.",
//       desc: "Siffrum Intelligence Corp was founded in 2024 by a collective of algorithmic traders and data privacy advocates. We saw how traditional finance thrived on 'The Fog'—the intentional complexity of debt.",
//       img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
//       stats: [{ val: "12+", lab: "Global Nodes" }, { val: "256-bit", lab: "Encryption" }, { val: "99.9%", lab: "Uptime" }]
//     },
//     {
//       label: "// THE MISSION",
//       title: "Weaponizing Data for the People.",
//       desc: "We decided to weaponize the same technology used by Wall Street—AI and predictive modeling—and hand it to the individual to ensure financial sovereignty for all.",
//       img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
//       stats: [{ val: "$4B+", lab: "Wealth tracked" }, { val: "50ms", lab: "Processing" }, { val: "Zero", lab: "Data Leaks" }]
//     },
//     {
//       label: "// THE VISION",
//       title: "The Future of Sovereign Wealth.",
//       desc: "Our predictive engine clears the fog of debt. We don't build apps; we build flight simulators for your financial future. No trackers. No banks. Just math.",
//       img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
//       stats: [{ val: "24/7", lab: "Active Monitoring" }, { val: "140+", lab: "Countries" }, { val: "Sovereign", lab: "Status" }]
//     }
//   ];
//   const slideCount = slides.length;

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slideCount);
//     }, 7000);
//     return () => clearInterval(timer);
//   }, [slideCount]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const fadeIn = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
//   };

//   const pillarContainer = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
//   };

//   const pillarItem = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
//   };

//   const imageHover = {
//     rest: { scale: 1 },
//     hover: { scale: 1.15, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   return (
//     <div
//       className="font-sans overflow-x-hidden selection:bg-[color:color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
//       style={{
//         backgroundColor: "var(--background-color)",
//         color: "var(--text-color)",
//       }}
//       ref={containerRef}
//     >
      
//       {/* --- 1. DYNAMIC HERO SECTION --- */}
//       <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2232" 
//             alt="Digital Architecture"
//             className="w-full h-full object-cover opacity-40" 
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(to bottom, color-mix(in srgb, var(--background-color) 10%, transparent), transparent, color-mix(in srgb, var(--background-color) 20%, transparent))",
//             }}
//           />
//           <div className="absolute inset-0 bg-black/40" />
//         </div>

//         <div className="relative z-10 max-w-7xl text-center">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl mb-12"
//             style={{
//               borderColor: "color-mix(in srgb, var(--primary-color) 20%, transparent)",
//               backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)",
//             }}
//           >
//             <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--primary-color)" }} />
//             <span className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--primary-color)" }}>Decentralized Intelligence v4.0</span>
//           </motion.div>

//           <motion.h1 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-12"
//           >
//             THE <span className="text-transparent bg-clip-text uppercase tracking-widest" style={{ backgroundImage: "linear-gradient(to right, var(--text-color), color-mix(in srgb, var(--primary-color) 45%, white), color-mix(in srgb, var(--secondary-color) 70%, white))" }}>Architects</span> <br />
//             OF WEALTH.
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
//             style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
//           >
//             Siffrum is not a bank. We are a high-frequency engineering lab dedicated to the mathematical destruction of debt and the acceleration of human sovereignty.
//           </motion.p>
//         </div>

//         <motion.div 
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="absolute bottom-10"
//         >
//           <ChevronDown size={32} style={{ color: "color-mix(in srgb, var(--primary-color) 50%, transparent)" }} />
//         </motion.div>
//       </section>

//       {/* --- 2. THE GENESIS (SLIDER) --- */}
//       <section
//         className="py-24 px-6 relative border-y"
//         style={{
//           borderColor: "color-mix(in srgb, var(--primary-color) 18%, transparent)",
//           backgroundColor: "color-mix(in srgb, var(--background-color) 82%, var(--surface-color))",
//         }}
//       >
//         <div className="max-w-7xl mx-auto min-h-[500px] flex items-center">
//           <AnimatePresence mode="wait">
//             <motion.div 
//               key={currentSlide}
//               initial={{ opacity: 0, x: 15 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -15 }}
//               transition={{ duration: 1.2, ease: "easeInOut" }}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full"
//             >
//               <div>
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mb-6 flex items-center gap-4"
//                 >
//                   <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: "color-mix(in srgb, var(--secondary-color) 78%, white)" }}>{slides[currentSlide].label}</h2>
//                   <div className="h-[1px] w-20" style={{ backgroundColor: "color-mix(in srgb, var(--secondary-color) 30%, transparent)" }} />
//                 </motion.div>

//                 <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">
//                   {slides[currentSlide].title}
//                 </h3>

//                 <p className="text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl" style={{ color: "color-mix(in srgb, var(--text-color) 70%, transparent)" }}>
//                   {slides[currentSlide].desc}
//                 </p>
                
//                 <div className="flex gap-10">
//                   {slides[currentSlide].stats.map((stat, idx) => (
//                     <div key={idx}>
//                       <div className="text-3xl font-black text-white">{stat.val}</div>
//                       <div className="text-[10px] font-mono uppercase tracking-wider mt-2" style={{ color: "var(--primary-color)" }}>{stat.lab}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-12 flex gap-3">
//                   {slides.map((_, idx) => (
//                     <div 
//                       key={idx} 
//                       className={`h-1 transition-all duration-700 rounded-full ${currentSlide === idx ? 'w-10' : 'w-3'}`}
//                       style={{ backgroundColor: currentSlide === idx ? "var(--primary-color)" : "color-mix(in srgb, var(--text-color) 10%, transparent)" }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="relative flex justify-center">
//                 <div className="absolute -inset-4 blur-[80px] rounded-full opacity-20" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 20%, transparent)" }} />
//                 <motion.div 
//                   className="relative rounded-2xl overflow-hidden w-full max-w-[450px] aspect-[4/3] group shadow-2xl"
//                   style={{ borderColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)" }}
//                 >
//                   <motion.img 
//                     src={slides[currentSlide].img} 
//                     alt="Infrastructure" 
//                     className="w-full h-full object-cover transition-all duration-1000"
//                   />
//                   <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(to top, var(--background-color), transparent, transparent)" }} />
//                   <div
//                     className="absolute bottom-4 left-4 backdrop-blur-xl border p-3 rounded-lg"
//                     style={{
//                       backgroundColor: "color-mix(in srgb, var(--background-color) 80%, transparent)",
//                       borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)",
//                     }}
//                   >
//                     <Code size={20} style={{ color: "var(--primary-color)" }} />
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* --- 3. CORE PILLARS --- */}
//       <section className="py-32 px-6 relative overflow-hidden">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 5%, transparent)" }} />
//         <div className="max-w-7xl mx-auto relative z-10">
//           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-24">
//             <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter uppercase">THE THREE PILLARS</h2>
//             <div className="flex items-center justify-center gap-4 font-mono tracking-[0.3em] text-xs uppercase" style={{ color: "color-mix(in srgb, var(--primary-color) 70%, white)" }}>
//               <span className="h-[1px] w-12" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)" }} /> How we rewrite the future <span className="h-[1px] w-12" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)" }} />
//             </div>
//           </motion.div>
//           <motion.div variants={pillarContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               { title: "Neural Modeling", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop", desc: "10,000 simulations per second. Our AI calculates every possible outcome of your financial decisions.", icon: Cpu },
//               { title: "Zero-Knowledge", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop", desc: "We utilize ZK-proofs to ensure your net worth is verified but never visible to our servers.", icon: Shield },
//               { title: "Velocity Engine", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", desc: "Real-time feedback loops. When you spend, your freedom date recalculates instantly.", icon: Zap }
//             ].map((pillar, i) => (
//               <motion.div
//                 key={i}
//                 variants={pillarItem}
//                 initial="rest"
//                 whileHover="hover"
//                 className="relative group rounded-[2.5rem] overflow-hidden border backdrop-blur-sm transition-all duration-500"
//                 style={{
//                   backgroundColor: "color-mix(in srgb, var(--surface-color) 40%, transparent)",
//                   borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)",
//                   boxShadow: "0 20px 50px color-mix(in srgb, var(--primary-color) 10%, transparent)",
//                 }}
//               >
//                 <div className="h-72 overflow-hidden relative">
//                   <motion.img variants={imageHover} src={pillar.img} className="w-full h-full object-cover" />
//                   <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--surface-color), color-mix(in srgb, var(--surface-color) 40%, transparent), transparent)" }} />
//                   <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="absolute bottom-8 left-8 w-14 h-14 rounded-2xl flex items-center justify-center z-20" style={{ backgroundColor: "var(--primary-color)", boxShadow: "0 0 25px color-mix(in srgb, var(--primary-color) 50%, transparent)" }}>
//                     <pillar.icon size={28} strokeWidth={1.5} />
//                   </motion.div>
//                 </div>
//                 <div className="p-10 pt-4 relative">
//                   <h3 className="text-3xl font-bold mb-4 tracking-tight transition-colors group-hover:text-[var(--primary-color)]">{pillar.title}</h3>
//                   <p className="font-light leading-relaxed text-base transition-colors" style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}>{pillar.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* --- 5. UPDATED GLOBAL IMPACT SECTION --- */}
//       <section className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: "var(--background-color)" }}>
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)" }} />
        
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
//           {/* LEFT SIDE: CONTENT */}
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }} 
//             whileInView={{ opacity: 1, x: 0 }} 
//             viewport={{ once: true }} 
//             className="flex-1"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ borderColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--primary-color) 5%, transparent)" }}>
//                <Globe size={14} style={{ color: "var(--primary-color)" }} />
//                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--primary-color)" }}>Global Backbone</span>
//             </div>
            
//             <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
//               Intelligence <br/>
//               <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, var(--primary-color), color-mix(in srgb, var(--secondary-color) 75%, white))" }}>
//                 Without Latency.
//               </span>
//             </h2>

//             <div className="grid gap-8">
//               {[
//                 {
//                   title: "Distributed Edge Nodes",
//                   desc: "Our neural engine is physically deployed across 12 tier-4 data centers, ensuring your financial simulations run with sub-50ms latency anywhere on Earth.",
//                   icon: Server
//                 },
//                 {
//                   title: "Sovereign Protocol",
//                   desc: "No centralized point of failure. Your data is fragmented and encrypted at the hardware level, making it mathematically impossible to intercept.",
//                   icon: Lock
//                 }
//               ].map((item, idx) => (
//                 <div key={idx} className="group flex gap-5">
//                   <div className="flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-colors" style={{ backgroundColor: "color-mix(in srgb, var(--text-color) 5%, transparent)", borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)" }}>
//                     <item.icon size={20} style={{ color: "color-mix(in srgb, var(--primary-color) 75%, white)" }} />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-xl mb-2" style={{ color: "color-mix(in srgb, var(--text-color) 90%, transparent)" }}>{item.title}</h4>
//                     <p className="font-light leading-relaxed max-w-md text-sm" style={{ color: "color-mix(in srgb, var(--text-color) 55%, transparent)" }}>{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* RIGHT SIDE: NETWORK COMMAND INTERFACE */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }} 
//             whileInView={{ opacity: 1, scale: 1 }} 
//             viewport={{ once: true }} 
//             className="flex-1 w-full relative"
//           >
//             <div className="relative border rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 88%, black)", borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)" }}>
              
//               <div className="flex justify-between items-center mb-6 border-b pb-4" style={{ borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}>
//                 <div className="flex gap-2">
//                   <div className="w-2 h-2 rounded-full bg-red-500/50" />
//                   <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
//                   <div className="w-2 h-2 rounded-full bg-green-500/50" />
//                 </div>
//                 <div className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded" style={{ color: "var(--primary-color)", backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)" }}>
//                   System Status: Optimal
//                 </div>
//               </div>

//               <div className="relative aspect-video rounded-xl border overflow-hidden group" style={{ backgroundColor: "var(--background-color)", borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}>
//                 {/* Stylized Map Dots */}
//                 <div className="absolute inset-0 opacity-20" 
//                   style={{ 
//                     backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`, 
//                     backgroundSize: '24px 24px' 
//                   }} 
//                 />

//                 {/* Connection Lines (SVG) */}
//                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
//                   <motion.path
//                     d="M 150 100 Q 250 50 400 120"
//                     stroke="url(#gradient1)" strokeWidth="1" fill="none"
//                     initial={{ pathLength: 0, opacity: 0 }}
//                     whileInView={{ pathLength: 1, opacity: 0.4 }}
//                     transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
//                   />
//                   <defs>
//                     <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%0%">
//                       <stop offset="0%" stopColor="transparent" />
//                       <stop offset="50%" stopColor="#8b5cf6" />
//                       <stop offset="100%" stopColor="transparent" />
//                     </linearGradient>
//                   </defs>
//                 </svg>

//                 {/* Active City Nodes */}
//                 {[
//                   { city: "New York", top: "35%", left: "25%", delay: 0 },
//                   { city: "London", top: "28%", left: "48%", delay: 0.4 },
//                   { city: "Singapore", top: "65%", left: "75%", delay: 0.8 },
//                   { city: "Tokyo", top: "40%", left: "85%", delay: 1.2 },
//                 ].map((node, i) => (
//                   <div key={i} className="absolute" style={{ top: node.top, left: node.left }}>
//                     <motion.div 
//                       animate={{ scale: [1, 2], opacity: [0.5, 0] }}
//                       transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
//                       className="absolute -inset-2 rounded-full bg-purple-500/30"
//                     />
//                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 70%, white)", boxShadow: "0 0 10px var(--primary-color)" }} />
//                     <div className="absolute top-4 left-0 -translate-x-1/2 whitespace-nowrap">
//                       <span className="text-[8px] font-mono uppercase tracking-tighter px-1 py-0.5 rounded" style={{ color: "color-mix(in srgb, var(--text-color) 40%, transparent)", backgroundColor: "color-mix(in srgb, black 50%, transparent)" }}>
//                         {node.city}
//                       </span>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Scanning Radar Line */}
//                 <motion.div 
//                   animate={{ top: ['0%', '100%', '0%'] }}
//                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                   className="absolute left-0 right-0 h-[1px] z-10"
//                   style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--primary-color) 40%, transparent), transparent)" }}
//                 />
//               </div>

//               {/* Understandable Stats Bar */}
//               <div className="grid grid-cols-3 gap-4 mt-6">
//                 <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: "color-mix(in srgb, var(--text-color) 5%, transparent)", borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}>
//                   <div className="text-[9px] font-mono uppercase mb-1" style={{ color: "color-mix(in srgb, var(--text-color) 40%, transparent)" }}>Avg Latency</div>
//                   <div className="text-lg font-bold text-green-400">14<span className="text-[10px] ml-0.5 text-white/60">ms</span></div>
//                 </div>
//                 <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: "color-mix(in srgb, var(--text-color) 5%, transparent)", borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}>
//                   <div className="text-[9px] font-mono uppercase mb-1" style={{ color: "color-mix(in srgb, var(--text-color) 40%, transparent)" }}>Active Nodes</div>
//                   <div className="text-lg font-bold text-white">12/12</div>
//                 </div>
//                 <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: "color-mix(in srgb, var(--text-color) 5%, transparent)", borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}>
//                   <div className="text-[9px] font-mono uppercase mb-1" style={{ color: "color-mix(in srgb, var(--text-color) 40%, transparent)" }}>Security Tier</div>
//                   <div className="text-lg font-bold" style={{ color: "color-mix(in srgb, var(--primary-color) 75%, white)" }}>01</div>
//                 </div>
//               </div>

//               {/* Terminal Logs */}
//               <div className="mt-4 font-mono text-[9px] space-y-1" style={{ color: "color-mix(in srgb, var(--text-color) 30%, transparent)" }}>
//                 <div className="flex gap-2">
//                   <span className="text-green-500">[OK]</span> 
//                   <span>Handshake complete with LDN_NODE</span>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="text-blue-500">[INFO]</span> 
//                   <span>Syncing financial ledger across global shard...</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- 6. VISIONARY CTA --- */}
//       <section className="py-24 px-6 md:px-10">
//         <div className="max-w-4xl mx-auto relative group">
//           <div className="absolute -inset-[1px] rounded-3xl" style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--text-color) 5%, transparent), color-mix(in srgb, var(--primary-color) 40%, transparent), color-mix(in srgb, var(--text-color) 5%, transparent))" }} />
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="relative border p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl"
//             style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 90%, black)", borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}
//           >
//              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full blur-[80px] pointer-events-none" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 5%, transparent)" }} />

//              <div className="space-y-3 relative z-10 text-center md:text-left">
//                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 justify-center md:justify-start" style={{ color: "var(--primary-color)" }}>
//                    <ShieldCheck size={14} /> SYSTEM READY
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
//                    Ready to begin <br className="hidden md:block"/> your engineering?
//                 </h2>
//                 <p className="text-xs md:text-sm font-light" style={{ color: "var(--muted-text)" }}>
//                    Join 12,000+ others building their financial future.
//                 </p>
//              </div>

//              <div className="flex flex-col items-center gap-4 relative z-10">
//                 <button className="px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 cursor-pointer" style={{ backgroundColor: "var(--text-color)", color: "var(--background-color)" }}>
//                    Setup Roadmap
//                 </button>
//                 <button className="text-[10px] font-bold transition-colors uppercase tracking-[0.2em] cursor-pointer" style={{ color: "color-mix(in srgb, var(--text-color) 30%, transparent)" }}>
//                    Speak with Siffrum AI
//                 </button>
//              </div>
//           </motion.div>
//         </div>
//       </section>

//     </div>
//   );
// };
 
// export default AboutPage;



import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Rocket, Shield, Cpu, Zap, ArrowRight, 
  Globe, Target, Activity, Users, 
  ChevronDown, Binary, Fingerprint, Code, Database, Sparkles, MapPin, Terminal,
  TrendingUp, Clock, Unlock, Share2, Server, BarChart3, Lock, ShieldCheck
} from 'lucide-react';

const AboutPage = () => {
  const containerRef = useRef(null);
  
  // --- SLIDER STATE FOR SECTION 2 ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      label: "// THE ORIGIN",
      title: "Founded in the Shadow of Crisis.",
      desc: "Raah-e-Maal was founded in 2026 to support Kashmiri households. We saw how traditional financial models and rigid banking debt structures failed to account for seasonal crop and tourism cycles.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
      stats: [{ val: "12+", lab: "Global Nodes" }, { val: "256-bit", lab: "Encryption" }, { val: "99.9%", lab: "Uptime" }]
    },
    {
      label: "// THE MISSION",
      title: "Weaponizing Data for the People.",
      desc: "We decided to weaponize the same technology used by Wall Street—AI and predictive modeling—and hand it to the individual to ensure financial sovereignty for all.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
      stats: [{ val: "$4B+", lab: "Wealth tracked" }, { val: "50ms", lab: "Processing" }, { val: "Zero", lab: "Data Leaks" }]
    },
    {
      label: "// THE VISION",
      title: "The Future of Sovereign Wealth.",
      desc: "Our predictive engine clears the fog of debt. We don't build apps; we build flight simulators for your financial future. No trackers. No banks. Just math.",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
      stats: [{ val: "24/7", lab: "Active Monitoring" }, { val: "140+", lab: "Countries" }, { val: "Sovereign", lab: "Status" }]
    }
  ];
  const slideCount = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 7000);
    return () => clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const pillarContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const pillarItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const imageHover = {
    rest: { scale: 1 },
    hover: { scale: 1.15, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div
      className="font-sans overflow-x-hidden selection:bg-[color:color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
      ref={containerRef}
    >
      
      {/* --- 1. DYNAMIC HERO SECTION (DARK) --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2232" 
            alt="Digital Architecture"
            className="w-full h-full object-cover opacity-40" 
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--background-color) 10%, transparent), transparent, color-mix(in srgb, var(--background-color) 20%, transparent))",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl mb-12"
            style={{
              borderColor: "color-mix(in srgb, var(--primary-color) 20%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)",
            }}
          >
            <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--primary-color)" }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--primary-color)" }}>KASHMIRI DEBT RESILIENCE PLATFORM</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-12"
          >
            THE <span className="text-transparent bg-clip-text uppercase tracking-widest" style={{ backgroundImage: "linear-gradient(to right, var(--text-color), color-mix(in srgb, var(--primary-color) 45%, white), color-mix(in srgb, var(--secondary-color) 70%, white))" }}>Architects</span> <br />
            OF WEALTH.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
            style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
          >
            Raah-e-Maal is not a bank. We are a dedicated financial planning platform built for the mathematical destruction of debt and the acceleration of Kashmiri economic resilience.
          </motion.p>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown size={32} style={{ color: "color-mix(in srgb, var(--primary-color) 50%, transparent)" }} />
        </motion.div>
      </section>

      {/* --- 2. THE GENESIS (LIGHT THEME) --- */}
      <section
        className="py-24 px-6 relative border-y"
        style={{
          borderColor: "rgba(0,0,0,0.05)",
          backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)", // Forced White
          color: "#1a1a1a" // Forced Dark Text
        }}
      >
        <div className="max-w-7xl mx-auto min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full"
            >
              <div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 flex items-center gap-4"
                >
                  <h2 className="font-mono text-sm tracking-widest uppercase" style={{ color: "var(--secondary-color)" }}>{slides[currentSlide].label}</h2>
                  <div className="h-[1px] w-20" style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
                </motion.div>

                <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-black">
                  {slides[currentSlide].title}
                </h3>

                <p className="text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(0,0,0,0.7)" }}>
                  {slides[currentSlide].desc}
                </p>
                
                <div className="flex gap-10">
                  {slides[currentSlide].stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-3xl font-black text-black">{stat.val}</div>
                      <div className="text-[10px] font-mono uppercase tracking-wider mt-2" style={{ color: "var(--primary-color)" }}>{stat.lab}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex gap-3">
                  {slides.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 transition-all duration-700 rounded-full ${currentSlide === idx ? 'w-10' : 'w-3'}`}
                      style={{ backgroundColor: currentSlide === idx ? "var(--primary-color)" : "rgba(0,0,0,0.1)" }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="absolute -inset-4 blur-[80px] rounded-full opacity-10" style={{ backgroundColor: "var(--primary-color)" }} />
                <motion.div 
                  className="relative rounded-2xl overflow-hidden w-full max-w-[450px] aspect-[4/3] group shadow-2xl border"
                  style={{ borderColor: "rgba(0,0,0,0.05)" }}
                >
                  <motion.img 
                    src={slides[currentSlide].img} 
                    alt="Infrastructure" 
                    className="w-full h-full object-cover transition-all duration-1000"
                  />
                  <div className="absolute inset-0 opacity-20" style={{ background: "linear-gradient(to top, white, transparent, transparent)" }} />
                  <div
                    className="absolute bottom-4 left-4 backdrop-blur-xl border p-3 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(0,0,0,0.1)",
                    }}
                  >
                    <Code size={20} style={{ color: "var(--primary-color)" }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- 3. CORE PILLARS (DARK THEME) --- */}
      <section className="py-20 px-6 md:py-12 relative overflow-hidden" style={{ backgroundColor: "var(--background-color)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 5%, transparent)" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-white">THE THREE PILLARS</h2>
            <div className="flex items-center justify-center gap-4 font-mono tracking-[0.3em] text-xs uppercase" style={{ color: "color-mix(in srgb, var(--primary-color) 70%, white)" }}>
              <span className="h-[1px] w-12" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)" }} /> How we rewrite the future <span className="h-[1px] w-12" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)" }} />
            </div>
          </motion.div>
          <motion.div variants={pillarContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Neural Modeling", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop", desc: "10,000 simulations per second. Our AI calculates every possible outcome of your financial decisions.", icon: Cpu },
              { title: "Zero-Knowledge", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop", desc: "We utilize ZK-proofs to ensure your net worth is verified but never visible to our servers.", icon: Shield },
              { title: "Velocity Engine", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", desc: "Real-time feedback loops. When you spend, your freedom date recalculates instantly.", icon: Zap }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                variants={pillarItem}
                initial="rest"
                whileHover="hover"
                className="relative group rounded-[2.5rem] overflow-hidden border backdrop-blur-sm transition-all duration-500"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--surface-color) 40%, transparent)",
                  borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)",
                  boxShadow: "0 20px 50px color-mix(in srgb, var(--primary-color) 10%, transparent)",
                }}
              >
                <div className="h-72 overflow-hidden relative">
                  <motion.img variants={imageHover} src={pillar.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--surface-color), color-mix(in srgb, var(--surface-color) 40%, transparent), transparent)" }} />
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="absolute bottom-8 left-8 w-14 h-14 rounded-2xl flex items-center justify-center z-20" style={{ backgroundColor: "var(--primary-color)", boxShadow: "0 0 25px color-mix(in srgb, var(--primary-color) 50%, transparent)" }}>
                    <pillar.icon size={28} strokeWidth={1.5} color="white" />
                  </motion.div>
                </div>
                <div className="p-10 pt-4 relative">
                  <h3 className="text-3xl font-bold mb-4 tracking-tight transition-colors group-hover:text-[var(--primary-color)] text-white">{pillar.title}</h3>
                  <p className="font-light leading-relaxed text-base transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 5. GLOBAL IMPACT (LIGHT THEME) --- */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: "rgba(79, 70, 229, 0.05)" }} />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
          {/* LEFT SIDE: CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ borderColor: "rgba(0,0,0,0.1)", backgroundColor: "rgba(0,0,0,0.03)" }}>
               <Globe size={14} style={{ color: "var(--primary-color)" }} />
               <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#666" }}>Global Backbone</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none text-black">
              Intelligence <br/>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, var(--primary-color), var(--secondary-color))" }}>
                Without Latency.
              </span>
            </h2>

            <div className="grid gap-8">
              {[
                {
                  title: "Distributed Edge Nodes",
                  desc: "Our neural engine is physically deployed across 12 tier-4 data centers, ensuring your financial simulations run with sub-50ms latency anywhere on Earth.",
                  icon: Server
                },
                {
                  title: "Sovereign Protocol",
                  desc: "No centralized point of failure. Your data is fragmented and encrypted at the hardware level, making it mathematically impossible to intercept.",
                  icon: Lock
                }
              ].map((item, idx) => (
                <div key={idx} className="group flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-colors" style={{ backgroundColor: "white", borderColor: "rgba(0,0,0,0.05)" }}>
                    <item.icon size={20} style={{ color: "var(--primary-color)" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-black">{item.title}</h4>
                    <p className="font-light leading-relaxed max-w-md text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: NETWORK COMMAND INTERFACE (KEEPS DARK UI CARD) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="flex-1 w-full relative"
          >
            <div className="relative border rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden bg-[#0a0a0b]" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-white/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded bg-primary/10 text-primary-color" style={{ color: "var(--primary-color)" }}>
                  System Status: Optimal
                </div>
              </div>

              <div className="relative aspect-video rounded-xl border overflow-hidden group bg-black/40 border-white/5">
                <div className="absolute inset-0 opacity-20" 
                  style={{ 
                    backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`, 
                    backgroundSize: '24px 24px' 
                  }} 
                />

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M 150 100 Q 250 50 400 120"
                    stroke="url(#gradient1)" strokeWidth="1" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>

                {[
                  { city: "Srinagar", top: "35%", left: "25%", delay: 0 },
                  { city: "Shopian", top: "28%", left: "48%", delay: 0.4 },
                  { city: "Baramulla", top: "65%", left: "75%", delay: 0.8 },
                  { city: "Pulwama", top: "40%", left: "85%", delay: 1.2 },
                ].map((node, i) => (
                  <div key={i} className="absolute" style={{ top: node.top, left: node.left }}>
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                      className="absolute -inset-2 rounded-full bg-purple-500/30"
                    />
                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_var(--primary-color)]" />
                    <div className="absolute top-4 left-0 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-[8px] font-mono uppercase tracking-tighter px-1 py-0.5 rounded text-white/40 bg-black/50">
                        {node.city}
                      </span>
                    </div>
                  </div>
                ))}

                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] z-10"
                  style={{ background: "linear-gradient(to right, transparent, rgba(79, 70, 229, 0.4), transparent)" }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-3 rounded-lg border border-white/5 bg-white/5 text-center">
                  <div className="text-[9px] font-mono uppercase mb-1 text-white/40">Avg Latency</div>
                  <div className="text-lg font-bold text-green-400">14<span className="text-[10px] ml-0.5 text-white/60">ms</span></div>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-white/5 text-center">
                  <div className="text-[9px] font-mono uppercase mb-1 text-white/40">Active Nodes</div>
                  <div className="text-lg font-bold text-white">12/12</div>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-white/5 text-center">
                  <div className="text-[9px] font-mono uppercase mb-1 text-white/40">Security Tier</div>
                  <div className="text-lg font-bold text-primary-color" style={{ color: "var(--primary-color)" }}>01</div>
                </div>
              </div>

              <div className="mt-4 font-mono text-[9px] space-y-1 text-white/30">
                <div className="flex gap-2">
                  <span className="text-green-500">[OK]</span> 
                  <span>Handshake complete with SRINAGAR_NODE</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-500">[INFO]</span> 
                  <span>Syncing J&K district financial ledger...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 6. VISIONARY CTA (DARK THEME) --- */}
      <section className="py-24 w-full" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 relative group">
          <div className="absolute -inset-[1px] rounded-3xl" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(79,70,229,0.4), rgba(255,255,255,0.05))" }} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#0a0a0b", borderColor: "rgba(255,255,255,0.05)" }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full blur-[80px] pointer-events-none" style={{ backgroundColor: "rgba(79,70,229,0.05)" }} />

             <div className="space-y-3 relative z-10 text-center md:text-left">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 justify-center md:justify-start" style={{ color: "var(--primary-color)" }}>
                   <ShieldCheck size={14} /> SYSTEM READY
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                   Ready to begin <br className="hidden md:block"/> your engineering?
                </h2>
                <p className="text-xs md:text-sm font-light text-white/50">
                   Join 12,000+ others building their financial future.
                </p>
             </div>

             <div className="flex flex-col items-center gap-4 relative z-10">
                <button className="px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 cursor-pointer bg-white text-black">
                   Setup Roadmap
                </button>
                <button className="text-[10px] font-bold transition-colors uppercase tracking-[0.2em] cursor-pointer text-white/30 hover:text-white">
                   Speak with Raah-e-Maal AI
                </button>
             </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
 
export default AboutPage;
