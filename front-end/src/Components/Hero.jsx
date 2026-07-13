import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Sparkles, Shield, BarChart3, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const slides = [
  {
    id: 1,
    tagline: "Master Your Debt, Reclaim Your Life.",
    para: "Raah-e-Maal designs a personalized roadmap for Kashmiri households to eliminate debt liabilities and navigate seasonal income stress with precision AI-driven guidance.",
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmluYW5jaWFsJTIwZnJlZWRvbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    tagline: "AI-Driven Paths to Financial Sovereignty.",
    para: "Our advanced ML models simulate agricultural and handicraft loan repayment scenarios to find the one that saves you the most interest.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    tagline: "Visualize Freedom, Secure Your Future.",
    para: "Stop guessing your financial future. Use our localized J&K seasonal charts to see exactly when you will break the chains of debt.",
    img: "https://t4.ftcdn.net/jpg/18/43/81/25/360_F_1843812540_86QKisGEOvx0TxUV7ADSapzEDcEPEghx.jpg",
  },
  {
    id: 4,
    tagline: "Turn Harvest Income into Lifetime Savings.",
    para: "Raah-e-Maal provides precautionary alerts and real-time advice to keep you prepared for lean winters and road closure blockages.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
  }
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); 
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: "var(--background-color)" }}>
      {/* Background Image Carousel (Cross-Fade) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "linear" }} className="absolute inset-0 w-full h-full">
            <img src={slides[current].img} alt="Bg" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, color-mix(in srgb, var(--background-color) 94%, transparent), color-mix(in srgb, var(--background-color) 52%, transparent), color-mix(in srgb, var(--background-color) 20%, transparent))",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-20 pt-32">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-8"
            style={{
              backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)",
              border: "1px solid color-mix(in srgb, var(--primary-color) 40%, transparent)",
            }}
          >
            <Sparkles size={16} style={{ color: "color-mix(in srgb, var(--text-color) 92%, transparent)" }} />
            <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "color-mix(in srgb, var(--text-color) 92%, transparent)" }}>
              Empowering Kashmiri Financial Freedom
            </span>
          </motion.div>

          <div className="relative mb-8 md:mb-10 min-h-[160px] md:min-h-[220px]">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight drop-shadow-2xl text-left" style={{ color: "var(--text-color)" }}>
              Financial Planning <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, var(--primary-color), var(--secondary-color))" }}>
                Built for the Rhythm of Kashmir
              </span>
            </h1>
            <p className="text-sm md:text-xl max-w-3xl font-light leading-relaxed drop-shadow-lg text-left" style={{ color: "color-mix(in srgb, var(--text-color) 80%, transparent)" }}>
              Manage loans, prepare for seasonal income changes, discover financial support schemes, plan for winter, and build a financially secure future—all through one intelligent platform designed for Jammu & Kashmir.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button 
              onClick={() => navigate(isLoggedIn ? "/user" : "/tracker")} 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center group shadow-2xl active:scale-95 cursor-pointer text-xs uppercase tracking-wider"
              style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
            >
              Start Your Financial Journey
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </button>
            <button 
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/user", { state: { activeSection: 'schemes' } });
                } else {
                  navigate("/auth");
                }
              }} 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center group shadow-2xl active:scale-95 cursor-pointer text-xs uppercase tracking-wider border"
              style={{ borderColor: "color-mix(in srgb, var(--text-color) 30%, transparent)", backgroundColor: "white", color: "black" }}
            >
              Explore Financial Support
            </button>
            <button 
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/user", { state: { activeSection: 'chatbot' } });
                } else {
                  navigate("/auth");
                }
              }} 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center group shadow-2xl active:scale-95 cursor-pointer text-xs uppercase tracking-wider border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--text-color)" }}
            >
              Ask the AI Financial Guide
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 border-t pt-8" style={{ borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)" }}>
            <div className="flex items-center gap-3"><Shield size={20} style={{ color: "color-mix(in srgb, var(--text-color) 92%, transparent)" }} /><span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-color)" }}>Bank-Grade Secure</span></div>
            <div className="flex items-center gap-3"><BarChart3 size={20} style={{ color: "color-mix(in srgb, var(--text-color) 92%, transparent)" }} /><span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-color)" }}>ML Prediction</span></div>
            <div className="flex items-center gap-3"><Zap size={20} style={{ color: "color-mix(in srgb, var(--text-color) 92%, transparent)" }} /><span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-color)" }}>Instant Scenarios</span></div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-10 right-10 flex gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-700 rounded-full h-1.5 ${index === current ? "w-12" : "w-4"}`}
            style={{ backgroundColor: index === current ? "var(--primary-color)" : "color-mix(in srgb, var(--text-color) 20%, transparent)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
