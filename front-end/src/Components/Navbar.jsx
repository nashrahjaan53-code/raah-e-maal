// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";



// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // Scroll detection for blur effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = ["Home", "About", "Tracker", "Services", "FAQ'S", "Contact"];

//   // --- UPDATED NAVIGATION & SCROLL LOGIC ---
//   const handleNav = (path, mode = null) => {
//     setMenuOpen(false);
//     if (mode) {
//       navigate(`${path}?mode=${mode}`);
//     } else {
//       navigate(path);
//     }

//     // Forces the window to scroll to the top smoothly
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };
//   // -----------------------------------------

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
//         scrolled || menuOpen
//           ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10"
//           : "py-6 bg-transparent"
//       }`}
//     >
//       {/* Logo */}
//       <div 
//         onClick={() => handleNav('/')}
//         className="text-2xl font-extrabold tracking-tight text-[#7C3AED] z-[120] cursor-pointer select-none"
//       >
//         Siffrum
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-8 bg-[#6366F1]/20 backdrop-blur-xl border border-white/10 px-8 py-2 rounded-full">
//         {navLinks.map((link) => (
//           <span
//             key={link}
//             onClick={() => handleNav(link === 'Home' ? '/' : link === "FAQ'S" ? '/faqs' : `/${link.toLowerCase()}`)}
//             className="cursor-pointer text-sm font-medium text-white hover:text-[#EDE9FE] transition-colors uppercase tracking-widest text-[11px]"
//           >
//             {link}
//           </span>
//         ))}
//       </div>

//       {/* Auth Buttons */}
//       <div className="flex items-center gap-5 z-[120]">
        
//         {/* DESKTOP LOG IN - Luminous Trace */}
//         <button 
//           onClick={() => handleNav('/auth', 'login')}
//           className="hidden md:block relative px-5 py-2 group overflow-hidden rounded-lg transition-all cursor-pointer"
//         >
//           <span className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-[#7C3AED]/50" />
//           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//             <motion.div 
//               animate={{ rotate: 360 }} 
//               transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
//               className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,#7C3AED_20%,transparent_40%)]" 
//             />
//           </div>
//           <div className="absolute inset-[1px] bg-black/20 group-hover:bg-black/40 rounded-lg transition-colors" />
//           <span className="relative z-10 text-[#EDE9FE] group-hover:text-white text-sm font-medium">Log in</span>
//         </button>

//         {/* SIGN UP - Luminous Trace */}
//         <button 
//           onClick={() => handleNav('/auth', 'signup')}
//           className="relative p-[1.5px] overflow-hidden rounded-full group transition-all active:scale-95 shadow-lg shadow-purple-900/20 cursor-pointer border-0"
//         >
//           <div className="absolute inset-0 opacity-100">
//             <motion.div 
//               animate={{ rotate: 360 }} 
//               transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
//               className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,#7C3AED_30%,transparent_60%)]" 
//             />
//           </div>
//           <div className="relative flex items-center justify-center bg-white px-6 py-2 rounded-full transition-colors group-hover:bg-[#F8FAFC]">
//             <span className="text-[#7C3AED] font-bold text-sm tracking-tight">Sign up</span>
//           </div>
//         </button>

//         {/* UNIQUE KINETIC TOGGLE (Mobile Only) */}
//         <button 
//           onClick={() => setMenuOpen(!menuOpen)} 
//           className="md:hidden flex flex-col items-end justify-center w-8 h-8 gap-1.5 outline-none group cursor-pointer"
//         >
//           <motion.span 
//             animate={{ 
//               rotate: menuOpen ? 45 : 0, 
//               y: menuOpen ? 4 : 0,
//               width: menuOpen ? "28px" : "24px" 
//             }}
//             className="h-[2px] bg-white rounded-full origin-center transition-all duration-300" 
//           />
//           <motion.span 
//             animate={{ 
//               rotate: menuOpen ? -45 : 0, 
//               y: menuOpen ? -4 : 0,
//               width: menuOpen ? "28px" : "14px",
//               backgroundColor: menuOpen ? "#FFFFFF" : "#7C3AED"
//             }}
//             className="h-[2px] rounded-full origin-center transition-all duration-300" 
//           />
//         </button>
//       </div>

//       {/* MOBILE HAM MENU OVERLAY */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: -20 }} 
//             className="fixed inset-0 h-screen w-full bg-black/95 backdrop-blur-3xl z-[110] flex flex-col justify-center items-center gap-10"
//           >
//             {navLinks.map((link, i) => (
//               <motion.span 
//                 initial={{ opacity: 0, y: 10 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ delay: i * 0.1 }}
//                 key={link} 
//                 className="text-2xl font-medium text-white/90 hover:text-[#7C3AED] transition-colors cursor-pointer" 
//                 onClick={() => handleNav(link === 'Home' ? '/' : link === "FAQ'S" ? '/faqs' : `/${link.toLowerCase()}`)}
//               >
//                 {link}
//               </motion.span>
//             ))}
            
//             <motion.button 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               transition={{ delay: 0.5 }}
//               onClick={() => handleNav('/auth', 'login')}
//               className="text-[#7C3AED] font-bold text-xl border-t border-white/10 pt-6 w-1/2 text-center cursor-pointer"
//             >
//               Log in
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// export default Navbar;




import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, LogOut, X } from "lucide-react"; // Added icons for the dialog

function Navbar({ isLoggedIn, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for Dialog Box
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Tracker", "Services", "FAQ'S", "Contact"];

  const handleNav = (path, mode = null) => {
    setMenuOpen(false);
    if (mode) {
      navigate(`${path}?mode=${mode}`);
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to handle the actual logout after confirmation
  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
          scrolled || menuOpen
            ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "py-6 bg-transparent"
        }`}
      >
        {/* Logo */}
        <div 
          onClick={() => handleNav('/')}
          className="text-2xl font-extrabold tracking-tight text-[#7C3AED] z-[120] cursor-pointer select-none"
        >
          Raah-e-Maal
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 bg-[#6366F1]/20 backdrop-blur-xl border border-white/10 px-8 py-2 rounded-full">
          {navLinks.map((link) => (
            <span
              key={link}
              onClick={() => handleNav(link === 'Home' ? '/' : link === "FAQ'S" ? '/faqs' : `/${link.toLowerCase()}`)}
              className="cursor-pointer text-sm font-medium text-white hover:text-[#EDE9FE] transition-colors uppercase tracking-widest text-[11px]"
            >
              {link}
            </span>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-5 z-[120]">
          {isLoggedIn ? (
            /* UPDATED LOGOUT BUTTON: Purple Animation */
            <button 
              onClick={() => setShowLogoutConfirm(true)} // Open Dialog instead of direct logout
              className="relative p-[1.5px] overflow-hidden rounded-full group transition-all active:scale-95 shadow-lg shadow-purple-900/20 cursor-pointer border-0"
            >
              <div className="absolute inset-0 opacity-100">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,#7C3AED_30%,transparent_60%)]" 
                />
              </div>
              <div className="relative flex items-center justify-center bg-white px-6 py-2 rounded-full transition-colors group-hover:bg-[#F8FAFC]">
                <span className="text-[#7C3AED] font-bold text-sm tracking-tight uppercase">Logout</span>
              </div>
            </button>
          ) : (
            /* Login & Sign Up (Unchanged) */
            <>
              <button onClick={() => handleNav('/auth', 'login')} className="hidden md:block relative px-5 py-2 group overflow-hidden rounded-lg transition-all cursor-pointer">
                <span className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-[#7C3AED]/50" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,#7C3AED_20%,transparent_40%)]" />
                </div>
                <div className="absolute inset-[1px] bg-black/20 group-hover:bg-black/40 rounded-lg transition-colors" />
                <span className="relative z-10 text-[#EDE9FE] group-hover:text-white text-sm font-medium">Log in</span>
              </button>

              <button onClick={() => handleNav('/auth', 'signup')} className="relative p-[1.5px] overflow-hidden rounded-full group transition-all active:scale-95 shadow-lg shadow-purple-900/20 cursor-pointer border-0">
                <div className="absolute inset-0 opacity-100">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,#7C3AED_30%,transparent_60%)]" />
                </div>
                <div className="relative flex items-center justify-center bg-white px-6 py-2 rounded-full transition-colors group-hover:bg-[#F8FAFC]">
                  <span className="text-[#7C3AED] font-bold text-sm tracking-tight">Sign up</span>
                </div>
              </button>
            </>
          )}

          {/* Mobile Hamburger (Unchanged) */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col items-end justify-center w-8 h-8 gap-1.5 outline-none group cursor-pointer">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0, width: menuOpen ? "28px" : "24px" }} className="h-[2px] bg-white rounded-full origin-center transition-all duration-300" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0, width: menuOpen ? "28px" : "14px", backgroundColor: menuOpen ? "#FFFFFF" : "#7C3AED" }} className="h-[2px] rounded-full origin-center transition-all duration-300" />
          </button>
        </div>
      </nav>

      {/* 1. CUSTOM LOGOUT CONFIRMATION DIALOG */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Dialog Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-[380px] bg-[#0A0A0B] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Purple Glow Effect behind the card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#7C3AED]/20 blur-3xl rounded-full" />

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#7C3AED]/20">
                  <LogOut className="text-[#7C3AED]" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Logging Out?</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Are you sure you want to exit your vault? You will need to sign in again to access your tracker.
                </p>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={confirmLogout}
                    className="w-full py-4 bg-[#7C3AED] hover:bg-[#6366F1] text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-purple-900/20"
                  >
                    Yes, Logout
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl font-bold text-sm transition-all active:scale-95 border border-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. MOBILE HAM MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} 
            className="fixed inset-0 h-screen w-full bg-black/95 backdrop-blur-3xl z-[110] flex flex-col justify-center items-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.span 
                key={link} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-2xl font-medium text-white/90 hover:text-[#7C3AED] transition-colors cursor-pointer" 
                onClick={() => handleNav(link === 'Home' ? '/' : link === "FAQ'S" ? '/faqs' : `/${link.toLowerCase()}`)}
              >
                {link}
              </motion.span>
            ))}
            
            {isLoggedIn ? (
               <motion.button 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
               onClick={() => { setShowLogoutConfirm(true); setMenuOpen(false); }}
               className="text-[#7C3AED] font-bold text-xl border-t border-white/10 pt-6 w-1/2 text-center cursor-pointer"
             >
               Logout
             </motion.button>
            ) : (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                onClick={() => handleNav('/auth', 'login')}
                className="text-[#7C3AED] font-bold text-xl border-t border-white/10 pt-6 w-1/2 text-center cursor-pointer"
              >
                Log in
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;