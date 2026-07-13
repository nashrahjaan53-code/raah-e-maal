
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ghulam Ahmad",
    role: "Apple Orchardist, Shopian",
    quote: "Raah-e-Maal saved my harvest season! The KCC interest subvention reminder alert saved me from paying high interest, and the winter planner gave me a clear monthly safety target.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
  },
  {
    name: "Fatima Banu",
    role: "Pashmina Weaver, Srinagar",
    quote: "Due to winter road blockages on NH44, I always struggled with my cooperative bank EMIs. The flexible harvest-repayment scheduler from Raah-e-Maal helped me manage my cash flows easily.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
  },
  {
    name: "Bilal Dar",
    role: "Shikara Operator, Dal Lake",
    quote: "I wanted to expand my tourist services but was afraid of high bank debts. The AI Repayment simulation showed me how to clear my existing micro-loans and fund my new shikara.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
  },
  {
    name: "Muzaffar Shah",
    role: "Saffron Grower, Pulwama",
    quote: "The government scheme recommender matched me with the Kisan Credit Card crop loan automatically. I got ₹1.6 Lakh without collateral at just 4% interest!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
  }
];

const TestimonialCard = ({ t }) => (
  // Reduced width: 320px on desktop, 280px on mobile
    <div className="w-[280px] md:w-[320px] flex-shrink-0 px-3">
    <div
      className="h-full border p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group"
      style={{
        backgroundColor: "white",
        borderColor: "color-mix(in srgb, var(--muted-text) 18%, white)",
      }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} fill="#f59e0b" className="text-amber-500" />
        ))}
      </div>
      
      <p className="text-sm md:text-base leading-relaxed italic mb-6" style={{ color: "color-mix(in srgb, var(--surface-color) 60%, white)" }}>
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <img 
          src={t.avatar} 
          alt={t.name} 
          className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" 
        />
        <div className="min-w-0">
          <h4 className="font-bold text-sm truncate" style={{ color: "color-mix(in srgb, var(--surface-color) 92%, black)" }}>{t.name}</h4>
          <p className="text-[10px] font-bold uppercase tracking-tighter truncate" style={{ color: "var(--primary-color)" }}>
            {t.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const InfiniteTrack = ({ items, direction = "left", speed = 40 }) => {
  return (
    <div className="flex overflow-hidden w-full">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-nowrap" // Prevents wrapping/overlapping
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-20 w-full overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-bold tracking-[0.2em] uppercase text-[10px] mb-3 block"
          style={{ color: "var(--primary-color)" }}
        >
          Community Voice
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black tracking-tight"
          style={{ color: "color-mix(in srgb, var(--surface-color) 92%, black)" }}
        >
          Loved by <span style={{ color: "var(--primary-color)" }}>thousands</span> of founders.
        </motion.h2>
      </div>

      {/* Slider Container - Full Screen Width */}
      <div className="relative w-full space-y-6">
        {/* Top Row: Moves Left */}
        <InfiniteTrack items={testimonials.slice(0, 3)} direction="left" speed={25} />
        
        {/* Bottom Row: Moves Right */}
        <InfiniteTrack items={testimonials.slice(3, 6)} direction="right" speed={30} />

        {/* Glossy Fade effect on the left and right edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 z-10" style={{ backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--surface-color) 10%, white), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 z-10" style={{ backgroundImage: "linear-gradient(to left, color-mix(in srgb, var(--surface-color) 10%, white), transparent)" }} />
      </div>

      
    </section>
  );
}
