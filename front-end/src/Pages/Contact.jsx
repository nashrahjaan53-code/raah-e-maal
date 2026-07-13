// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   Send,
//   Sparkles,
//   Globe,
//   ShieldCheck,
//   Mail,
//   Headset,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Contact = () => {
//   const [formState, setFormState] = useState("idle");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormState("submitting");
//     setTimeout(() => setFormState("success"), 2000);
//   };

//   const detailCards = [
//     { icon: <Mail />, label: "Email Hub", val: "core@siffrum.com" },
//     { icon: <Globe />, label: "HQ Terminal", val: "San Francisco, CA" },
//     { icon: <Headset />, label: "Human Intel", val: "Live Support Active" },
//     { icon: <ShieldCheck />, label: "Encryption", val: "AES-256 Bit Secure" },
//   ];

//   return (
//     <div
//       className="min-h-screen overflow-x-hidden font-sans selection:bg-[color:color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
//       style={{
//         backgroundColor: "var(--background-color)",
//         color: "var(--text-color)",
//       }}
//     >
//       <section className="relative flex h-[75vh] items-center overflow-hidden md:h-[80vh]">
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
//             alt="Siffrum HQ"
//             className="h-full w-full scale-105 object-cover"
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(to right, var(--surface-color), color-mix(in srgb, var(--surface-color) 80%, transparent), transparent)",
//             }}
//           />
//           <div
//             className="absolute inset-0 opacity-90"
//             style={{
//               background:
//                 "linear-gradient(to top, var(--surface-color), transparent, transparent)",
//             }}
//           />
//         </div>

//         <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-44 md:px-10 md:pt-32">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="max-w-4xl space-y-6 md:space-y-8"
//           >
//             <div
//               className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
//               style={{
//                 backgroundColor:
//                   "color-mix(in srgb, var(--text-color) 10%, transparent)",
//                 border: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)",
//               }}
//             >
//               <Sparkles size={16} style={{ color: "var(--primary-color)" }} />
//               <span
//                 className="text-[10px] font-bold uppercase tracking-[0.4em]"
//                 style={{
//                   color:
//                     "color-mix(in srgb, var(--text-color) 92%, var(--primary-color))",
//                 }}
//               >
//                 Direct Connection
//               </span>
//             </div>

//             <h1 className="text-5xl font-black leading-[0.95] tracking-tighter md:text-8xl">
//               Initiate <br />
//               <span
//                 className="bg-clip-text text-transparent"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(to right, var(--primary-color), color-mix(in srgb, var(--text-color) 92%, var(--primary-color)), color-mix(in srgb, var(--secondary-color) 75%, white))",
//                 }}
//               >
//                 Communication.
//               </span>
//             </h1>

//             <p
//               className="max-w-xl text-lg font-light leading-relaxed md:text-xl"
//               style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
//             >
//               Our engineering team is standing by to help you map your financial
//               sovereignty roadmap.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       <section className="relative z-20 -mt-10 px-6 py-24 lg:px-20 ">
//         <div className="mx-auto w-full max-w-7xl">
//           <div className="mb-16 flex flex-col justify-between gap-10 lg:mb-20 lg:flex-row lg:items-end">
//             <div className="text-left">
//               <h2
//                 className="mb-4 text-xs font-bold uppercase tracking-[0.4em]"
//                 style={{ color: "var(--primary-color)" }}
//               >
//                 Uplink Parameters
//               </h2>
//               <p className="max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
//                 Tell us where you are, <br />
//                 <span
//                   className="italic font-light"
//                   style={{ color: "color-mix(in srgb, var(--text-color) 30%, transparent)" }}
//                 >
//                   we'll engineer where you're going.
//                 </span>
//               </p>
//             </div>

//             <div className="relative hidden h-40 w-64 items-center justify-center lg:flex">
//               <div
//                 className="absolute inset-0 rounded-full blur-[80px]"
//                 style={{
//                   backgroundColor:
//                     "color-mix(in srgb, var(--primary-color) 20%, transparent)",
//                 }}
//               />
//               <svg width="200" height="100" viewBox="0 0 200 100" className="relative z-10">
//                 <motion.path
//                   d="M20 50 L60 50 L80 20 L120 80 L140 50 L180 50"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   initial={{ pathLength: 0, opacity: 0 }}
//                   animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                   style={{ color: "var(--text-color)" }}
//                 />
//                 <motion.circle
//                   cx="100"
//                   cy="50"
//                   r="6"
//                   fill="currentColor"
//                   animate={{ r: [6, 10, 6], opacity: [0.5, 1, 0.5] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   style={{ color: "var(--text-color)" }}
//                 />
//                 <text
//                   x="70"
//                   y="95"
//                   fontSize="10"
//                   fill="currentColor"
//                   fontWeight="900"
//                   className="uppercase tracking-[0.3em]"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   connect with us
//                 </text>
//               </svg>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
//             <div className="order-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:order-1">
//               {detailCards.map((item, i) => (
//                 <motion.div
//                   key={item.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{
//                     y: -8,
//                     borderColor: "color-mix(in srgb, var(--primary-color) 40%, transparent)",
//                   }}
//                   className="group rounded-[40px] border p-10 shadow-xl backdrop-blur-3xl transition-all"
//                   style={{
//                     backgroundColor:
//                       "color-mix(in srgb, var(--text-color) 4%, transparent)",
//                     borderColor:
//                       "color-mix(in srgb, var(--text-color) 5%, transparent)",
//                   }}
//                 >
//                   <div
//                     className="mb-6 w-fit rounded-2xl border p-4 transition-all group-hover:text-white"
//                     style={{
//                       backgroundColor:
//                         "color-mix(in srgb, var(--primary-color) 10%, transparent)",
//                       borderColor:
//                         "color-mix(in srgb, var(--primary-color) 20%, transparent)",
//                       color: "var(--primary-color)",
//                     }}
//                   >
//                     {item.icon}
//                   </div>
//                   <p
//                     className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em]"
//                     style={{
//                       color:
//                         "color-mix(in srgb, var(--text-color) 92%, var(--primary-color))",
//                     }}
//                   >
//                     {item.label}
//                   </p>
//                   <p className="text-base font-semibold tracking-tight">{item.val}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative order-1 overflow-hidden rounded-[50px] border p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] lg:order-2 lg:rounded-[60px] md:p-14"
//               style={{
//                 backgroundColor: "color-mix(in srgb, var(--surface-color) 96%, white)",
//                 borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)",
//               }}
//             >
//               <div className="mb-10 text-center md:text-left">
//                 <h3
//                   className="mb-2 text-3xl font-black tracking-tighter"
//                   style={{ color: "color-mix(in srgb, var(--background-color) 92%, black)" }}
//                 >
//                   Send a Message
//                 </h3>
//                 <p style={{ color: "color-mix(in srgb, var(--background-color) 55%, white)" }} className="text-sm font-medium">
//                   Please identify yourself and describe your query.
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--background-color) 45%, white)" }}>
//                       Your Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Smith"
//                       className="w-full rounded-2xl border px-6 py-4 outline-none transition-all placeholder:opacity-60"
//                       style={{
//                         backgroundColor: "color-mix(in srgb, white 88%, var(--surface-color))",
//                         borderColor: "color-mix(in srgb, var(--background-color) 12%, transparent)",
//                         color: "color-mix(in srgb, var(--background-color) 92%, black)",
//                         boxShadow: "inset 0 1px 2px color-mix(in srgb, var(--background-color) 8%, transparent)",
//                       }}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--background-color) 45%, white)" }}>
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="active@node.com"
//                       className="w-full rounded-2xl border px-6 py-4 outline-none transition-all placeholder:opacity-60"
//                       style={{
//                         backgroundColor: "color-mix(in srgb, white 88%, var(--surface-color))",
//                         borderColor: "color-mix(in srgb, var(--background-color) 12%, transparent)",
//                         color: "color-mix(in srgb, var(--background-color) 92%, black)",
//                         boxShadow: "inset 0 1px 2px color-mix(in srgb, var(--background-color) 8%, transparent)",
//                       }}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--background-color) 45%, white)" }}>
//                     Message
//                   </label>
//                   <textarea
//                     rows="4"
//                     placeholder="Describe your request..."
//                     className="w-full resize-none rounded-2xl border px-6 py-4 outline-none transition-all placeholder:opacity-60"
//                     style={{
//                       backgroundColor: "color-mix(in srgb, white 88%, var(--surface-color))",
//                       borderColor: "color-mix(in srgb, var(--background-color) 12%, transparent)",
//                       color: "color-mix(in srgb, var(--background-color) 92%, black)",
//                       boxShadow: "inset 0 1px 2px color-mix(in srgb, var(--background-color) 8%, transparent)",
//                     }}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={formState !== "idle"}
//                   className="group relative w-full overflow-hidden rounded-2xl py-5 text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-[0.98]"
//                   style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
//                 >
//                   <span className="relative z-10 flex items-center justify-center gap-3">
//                     {formState === "idle" && (
//                       <>
//                         Transmit Data <Send size={16} />
//                       </>
//                     )}
//                     {formState === "submitting" && <>Connecting Core...</>}
//                     {formState === "success" && <>Sent Successfully</>}
//                   </span>
//                   <motion.div
//                     initial={{ x: "-100%" }}
//                     animate={{ x: "100%" }}
//                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
//                     className="absolute inset-0 skew-x-[-20deg]"
//                     style={{
//                       background:
//                         "linear-gradient(to right, transparent, color-mix(in srgb, var(--text-color) 20%, transparent), transparent)",
//                     }}
//                   />
//                 </button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//  {/* --- 6. VISIONARY CTA (DARK THEME) --- */}
//       <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
//         <div className="max-w-4xl mx-auto relative group">
//           <div className="absolute -inset-[1px] rounded-3xl" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(79,70,229,0.4), rgba(255,255,255,0.05))" }} />
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="relative border p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl"
//             style={{ backgroundColor: "#0a0a0b", borderColor: "rgba(255,255,255,0.05)" }}
//           >
//              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full blur-[80px] pointer-events-none" style={{ backgroundColor: "rgba(79,70,229,0.05)" }} />

//              <div className="space-y-3 relative z-10 text-center md:text-left">
//                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 justify-center md:justify-start" style={{ color: "var(--primary-color)" }}>
//                    <ShieldCheck size={14} /> SYSTEM READY
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
//                    Ready to begin <br className="hidden md:block"/> your engineering?
//                 </h2>
//                 <p className="text-xs md:text-sm font-light text-white/50">
//                    Join 12,000+ others building their financial future.
//                 </p>
//              </div>

//              <div className="flex flex-col items-center gap-4 relative z-10">
//                 <button className="px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 cursor-pointer bg-white text-black">
//                    Setup Roadmap
//                 </button>
//                 <button className="text-[10px] font-bold transition-colors uppercase tracking-[0.2em] cursor-pointer text-white/30 hover:text-white">
//                    Speak with Siffrum AI
//                 </button>
//              </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;
// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   Send,
//   Sparkles,
//   Globe,
//   ShieldCheck,
//   Mail,
//   Headset,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Contact = () => {
//   const [formState, setFormState] = useState("idle");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormState("submitting");
//     setTimeout(() => setFormState("success"), 2000);
//   };

//   const detailCards = [
//     { icon: <Mail />, label: "Email Hub", val: "core@siffrum.com" },
//     { icon: <Globe />, label: "HQ Terminal", val: "San Francisco, CA" },
//     { icon: <Headset />, label: "Human Intel", val: "Live Support Active" },
//     { icon: <ShieldCheck />, label: "Encryption", val: "AES-256 Bit Secure" },
//   ];

//   return (
//     <div
//       className="min-h-screen overflow-x-hidden font-sans selection:bg-[color:color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
//       style={{
//         backgroundColor: "var(--background-color)",
//         color: "var(--text-color)",
//       }}
//     >
//       <section className="relative flex h-[75vh] items-center overflow-hidden md:h-[80vh]">
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
//             alt="Siffrum HQ"
//             className="h-full w-full scale-105 object-cover"
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(to right, var(--surface-color), color-mix(in srgb, var(--surface-color) 80%, transparent), transparent)",
//             }}
//           />
//           <div
//             className="absolute inset-0 opacity-90"
//             style={{
//               background:
//                 "linear-gradient(to top, var(--surface-color), transparent, transparent)",
//             }}
//           />
//         </div>

//         <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-44 md:px-10 md:pt-32">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="max-w-4xl space-y-6 md:space-y-8"
//           >
//             <div
//               className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
//               style={{
//                 backgroundColor:
//                   "color-mix(in srgb, var(--text-color) 10%, transparent)",
//                 border: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)",
//               }}
//             >
//               <Sparkles size={16} style={{ color: "var(--primary-color)" }} />
//               <span
//                 className="text-[10px] font-bold uppercase tracking-[0.4em]"
//                 style={{
//                   color:
//                     "color-mix(in srgb, var(--text-color) 92%, var(--primary-color))",
//                 }}
//               >
//                 Direct Connection
//               </span>
//             </div>

//             <h1 className="text-5xl font-black leading-[0.95] tracking-tighter md:text-8xl">
//               Initiate <br />
//               <span
//                 className="bg-clip-text text-transparent"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(to right, var(--primary-color), color-mix(in srgb, var(--text-color) 92%, var(--primary-color)), color-mix(in srgb, var(--secondary-color) 75%, white))",
//                 }}
//               >
//                 Communication.
//               </span>
//             </h1>

//             <p
//               className="max-w-xl text-lg font-light leading-relaxed md:text-xl"
//               style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
//             >
//               Our engineering team is standing by to help you map your financial
//               sovereignty roadmap.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- SECOND SECTION UPDATED TO DARK THEME --- */}
//       <section className="relative z-20 -mt-10 px-6 py-24 lg:px-20" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
//         <div className="mx-auto w-full max-w-7xl">
//           <div className="mb-16 flex flex-col justify-between gap-10 lg:mb-20 lg:flex-row lg:items-end">
//             <div className="text-left">
//               <h2
//                 className="mb-4 text-xs font-bold uppercase tracking-[0.4em]"
//                 style={{ color: "var(--primary-color)" }}
//               >
//                 Uplink Parameters
//               </h2>
//               <p className="max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl text-white">
//                 Tell us where you are, <br />
//                 <span
//                   className="italic font-light"
//                   style={{ color: "rgba(255,255,255,0.3)" }}
//                 >
//                   we'll engineer where you're going.
//                 </span>
//               </p>
//             </div>

//             <div className="relative hidden h-40 w-64 items-center justify-center lg:flex">
//               <div
//                 className="absolute inset-0 rounded-full blur-[80px]"
//                 style={{
//                   backgroundColor:
//                     "color-mix(in srgb, var(--primary-color) 20%, transparent)",
//                 }}
//               />
//               <svg width="200" height="100" viewBox="0 0 200 100" className="relative z-10">
//                 <motion.path
//                   d="M20 50 L60 50 L80 20 L120 80 L140 50 L180 50"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.4)"
//                   strokeWidth="1.5"
//                   initial={{ pathLength: 0, opacity: 0 }}
//                   animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                 />
//                 <motion.circle
//                   cx="100"
//                   cy="50"
//                   r="6"
//                   fill="white"
//                   animate={{ r: [6, 10, 6], opacity: [0.5, 1, 0.5] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 />
//                 <text
//                   x="70"
//                   y="95"
//                   fontSize="10"
//                   fill="currentColor"
//                   fontWeight="900"
//                   className="uppercase tracking-[0.3em]"
//                   style={{ color: "var(--primary-color)" }}
//                 >
//                   connect with us
//                 </text>
//               </svg>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
//             <div className="order-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:order-1">
//               {detailCards.map((item, i) => (
//                 <motion.div
//                   key={item.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{
//                     y: -8,
//                     borderColor: "rgba(255,255,255,0.2)",
//                   }}
//                   className="group rounded-[40px] border p-10 shadow-xl backdrop-blur-3xl transition-all"
//                   style={{
//                     backgroundColor: "rgba(255,255,255,0.03)",
//                     borderColor: "rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   <div
//                     className="mb-6 w-fit rounded-2xl border p-4 transition-all group-hover:bg-white group-hover:text-black"
//                     style={{
//                       backgroundColor: "rgba(79,70,229,0.1)",
//                       borderColor: "rgba(79,70,229,0.2)",
//                       color: "var(--primary-color)",
//                     }}
//                   >
//                     {item.icon}
//                   </div>
//                   <p
//                     className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em]"
//                     style={{ color: "var(--primary-color)" }}
//                   >
//                     {item.label}
//                   </p>
//                   <p className="text-base font-semibold tracking-tight text-white">{item.val}</p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* --- FORM BOX UPDATED TO MATCH CTA COLORS --- */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative order-1 overflow-hidden rounded-[50px] border p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] lg:order-2 lg:rounded-[60px] md:p-14"
//               style={{
//                 backgroundColor: "#0a0a0b",
//                 borderColor: "rgba(255,255,255,0.05)",
//               }}
//             >
//               {/* Subtle inner glow */}
//               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full blur-[100px] pointer-events-none" style={{ backgroundColor: "rgba(79,70,229,0.05)" }} />

//               <div className="relative z-10 mb-10 text-center md:text-left">
//                 <h3 className="mb-2 text-3xl font-black tracking-tighter text-white">
//                   Send a Message
//                 </h3>
//                 <p className="text-sm font-medium text-white/40">
//                   Please identify yourself and describe your query.
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
//                       Your Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Smith"
//                       className="w-full rounded-2xl border px-6 py-4 outline-none transition-all placeholder:text-white/20 text-white focus:border-white/30"
//                       style={{
//                         backgroundColor: "rgba(255,255,255,0.03)",
//                         borderColor: "rgba(255,255,255,0.05)",
//                       }}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="active@node.com"
//                       className="w-full rounded-2xl border px-6 py-4 outline-none transition-all placeholder:text-white/20 text-white focus:border-white/30"
//                       style={{
//                         backgroundColor: "rgba(255,255,255,0.03)",
//                         borderColor: "rgba(255,255,255,0.05)",
//                       }}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
//                     Message
//                   </label>
//                   <textarea
//                     rows="4"
//                     placeholder="Describe your request..."
//                     className="w-full resize-none rounded-2xl border px-6 py-4 outline-none transition-all placeholder:text-white/20 text-white focus:border-white/30"
//                     style={{
//                       backgroundColor: "rgba(255,255,255,0.03)",
//                       borderColor: "rgba(255,255,255,0.05)",
//                     }}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={formState !== "idle"}
//                   className="group relative w-full overflow-hidden rounded-2xl py-5 text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-[0.98] bg-white text-black"
//                 >
//                   <span className="relative z-10 flex items-center justify-center gap-3">
//                     {formState === "idle" && (
//                       <>
//                         Transmit Data <Send size={16} />
//                       </>
//                     )}
//                     {formState === "submitting" && <>Connecting Core...</>}
//                     {formState === "success" && <>Sent Successfully</>}
//                   </span>
//                   <motion.div
//                     initial={{ x: "-100%" }}
//                     animate={{ x: "100%" }}
//                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
//                     className="absolute inset-0 skew-x-[-20deg]"
//                     style={{
//                       background:
//                         "linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent)",
//                     }}
//                   />
//                 </button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* --- 6. VISIONARY CTA (DARK THEME - KEPT AS REFERENCE) --- */}
//       <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
//         <div className="max-w-4xl mx-auto relative group">
//           <div className="absolute -inset-[1px] rounded-3xl" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(79,70,229,0.4), rgba(255,255,255,0.05))" }} />
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="relative border p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl"
//             style={{ backgroundColor: "#0a0a0b", borderColor: "rgba(255,255,255,0.05)" }}
//           >
//              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full blur-[80px] pointer-events-none" style={{ backgroundColor: "rgba(79,70,229,0.05)" }} />

//              <div className="space-y-3 relative z-10 text-center md:text-left">
//                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 justify-center md:justify-start" style={{ color: "var(--primary-color)" }}>
//                    <ShieldCheck size={14} /> SYSTEM READY
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
//                    Ready to begin <br className="hidden md:block"/> your engineering?
//                 </h2>
//                 <p className="text-xs md:text-sm font-light text-white/50">
//                    Join 12,000+ others building their financial future.
//                 </p>
//              </div>

//              <div className="flex flex-col items-center gap-4 relative z-10">
//                 <button className="px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 cursor-pointer bg-white text-black">
//                    Setup Roadmap
//                 </button>
//                 <button className="text-[10px] font-bold transition-colors uppercase tracking-[0.2em] cursor-pointer text-white/30 hover:text-white">
//                    Speak with Siffrum AI
//                 </button>
//              </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Globe,
  ShieldCheck,
  Mail,
  Headset,
} from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 2000);
  };

  const detailCards = [
    { icon: <Mail />, label: "Email Hub", val: "contact@raah-e-maal.in" },
    { icon: <Globe />, label: "HQ Terminal", val: "Srinagar, J&K" },
    { icon: <Headset />, label: "Human Intel", val: "Live Support Active" },
    { icon: <ShieldCheck />, label: "Encryption", val: "AES-256 Bit Secure" },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans selection:bg-[color:color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <section className="relative flex h-[75vh] items-center overflow-hidden md:h-[100vh]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Raah-e-Maal HQ"
            className="h-full w-full scale-105 object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--surface-color), color-mix(in srgb, var(--surface-color) 80%, transparent), transparent)",
            }}
          />
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "linear-gradient(to top, #0a0a0b, transparent, transparent)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-44 md:px-10 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl space-y-6 md:space-y-8"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--text-color) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)",
              }}
            >
              <Sparkles size={16} style={{ color: "var(--primary-color)" }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.4em]"
                style={{
                  color:
                    "color-mix(in srgb, var(--text-color) 92%, var(--primary-color))",
                }}
              >
                Direct Connection
              </span>
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tighter md:text-8xl">
              Initiate <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--primary-color), color-mix(in srgb, var(--text-color) 92%, var(--primary-color)), color-mix(in srgb, var(--secondary-color) 75%, white))",
                }}
              >
                Communication.
              </span>
            </h1>

            <p
              className="max-w-xl text-lg font-light leading-relaxed md:text-xl"
              style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
            >
              Our engineering team is standing by to help you map your financial
              sovereignty roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECOND SECTION: UPDATED TO DARK THEME --- */}
      <section className="relative z-20 -mt-10 px-6 py-24 lg:px-20" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-10 lg:mb-20 lg:flex-row lg:items-end">
            <div className="text-left">
              <h2
                className="mb-4 text-xs font-bold uppercase tracking-[0.4em]"
                style={{ color: "var(--primary-color)" }}
              >
                Uplink Parameters
              </h2>
              <p className="max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl text-black">
                Tell us where you are, <br />
                <span
                  className="italic font-light"
                  style={{ color: " text-black" }}
                >
                  we'll engineer where you're going.
                </span>
              </p>
            </div>

            <div className="relative hidden h-40 w-64 items-center justify-center lg:flex">
              <div
                className="absolute inset-0 rounded-full blur-[80px]"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary-color) 20%, transparent)",
                }}
              />
              <svg width="200" height="100" viewBox="0 0 200 100" className="relative z-10">
                <motion.path
                  d="M20 50 L60 50 L80 20 L120 80 L140 50 L180 50"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="100"
                  cy="50"
                  r="6"
                  fill="black"
                  animate={{ r: [6, 10, 6], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <text
                  x="70"
                  y="95"
                  fontSize="10"
                  fill="currentColor"
                  fontWeight="900"
                  className="uppercase tracking-[0.3em]"
                  style={{ color: "var(--primary-color)" }}
                >
                  connect with us
                </text>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
           {/* --- UPDATED DETAIL CARDS (LEFT SIDE) --- */}
<div className="order-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:order-1">
  {detailCards.map((item, i) => (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{
        y: -8,
        borderColor: "rgba(255,255,255,0.2)", // Brighter border on hover
        backgroundColor: "#111112", // Slightly lighter black on hover
      }}
      className="group rounded-[40px] border p-10 shadow-2xl transition-all"
      style={{
        backgroundColor: "#0a0a0b", // Deep Black background
        borderColor: "rgba(255,255,255,0.08)", // Subtle glass border
      }}
    >
      {/* Icon Container */}
      <div
        className="mb-6 w-fit rounded-2xl border p-4 transition-all group-hover:bg-white group-hover:text-black"
        style={{
          backgroundColor: "rgba(79,70,229,0.15)", // Indigo tinted background
          borderColor: "rgba(79,70,229,0.3)",
          color: "var(--primary-color)", // Primary color icon
        }}
      >
        {item.icon}
      </div>

      {/* Label Text */}
      <p
        className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em]"
        style={{ color: "var(--primary-color)" }}
      >
        {item.label}
      </p>

      {/* Value Text */}
      <p className="text-base font-semibold tracking-tight text-white">
        {item.val}
      </p>
    </motion.div>
  ))}
</div>

            {/* --- FORM BOX --- */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 overflow-hidden rounded-[50px] border p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] lg:order-2 lg:rounded-[60px] md:p-14"
              style={{
                backgroundColor: "#0a0a0b",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full blur-[100px] pointer-events-none" style={{ backgroundColor: "rgba(79,70,229,0.05)" }} />

              <div className="relative z-10 mb-10 text-center md:text-left">
                <h3 className="mb-2 text-3xl font-black tracking-tighter text-white">
                  Send a Message
                </h3>
                <p className="text-sm font-medium text-white/40">
                  Please identify yourself and describe your query.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full rounded-2xl border px-6 py-4 outline-none transition-all placeholder:text-white/20 text-white focus:border-white/30"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.05)",
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="active@node.com"
                      className="w-full rounded-2xl border px-6 py-4 outline-none transition-all placeholder:text-white/20 text-white focus:border-white/30"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.05)",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="ml-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Describe your request..."
                    className="w-full resize-none rounded-2xl border px-6 py-4 outline-none transition-all placeholder:text-white/20 text-white focus:border-white/30"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.05)",
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState !== "idle"}
                  className="group relative w-full overflow-hidden rounded-2xl py-5 text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-[0.98] bg-white text-black"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {formState === "idle" && (
                      <>
                        Transmit Data <Send size={16} />
                      </>
                    )}
                    {formState === "submitting" && <>Connecting Core...</>}
                    {formState === "success" && <>Sent Successfully</>}
                  </span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 skew-x-[-20deg]"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent)",
                    }}
                  />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 6. VISIONARY CTA (DARK THEME) --- */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
        <div className="max-w-4xl mx-auto relative group">
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

export default Contact;