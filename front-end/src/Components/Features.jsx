import React from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  Flower2,
  Scissors,
  Ship,
  Compass,
  Store,
  GraduationCap,
  ArrowUpRight
} from "lucide-react";

const features = [
  {
    icon: <Sprout className="w-5 h-5" />, 
    title: "Apple & Horticulture",
    desc: "Plan loan repayments around autumn harvest cash flows and buffer winter cold storage costs.",
    img: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: <Flower2 className="w-5 h-5" />,
    title: "Saffron Cultivators",
    desc: "Smooth out volatile crop pricing cycles and claim cooperative agricultural bank subsidies.",
    img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: <Scissors className="w-5 h-5" />,
    title: "Artisans & Loom Weavers",
    desc: "Protect your craft earnings from winter transport blockages and finance raw Pashmina wool.",
    img: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: <Ship className="w-5 h-5" />,
    title: "Houseboats & Shikaras",
    desc: "Reserve peak summer tourist incomes to cover loan payments during Dal Lake freezing spells.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: "Tourism & Hospitality",
    desc: "Align debt schedules with Gulmarg/Pahalgam seasonal peak seasons and off-season drops.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: <Store className="w-5 h-5" />,
    title: "Shopkeepers & Traders",
    desc: "Track winter stock reserves and discover J&K credit schemes and local interest subventions.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Students & Families",
    desc: "Manage education micro-loans, discover Himayat training grants, and build winter savings.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
  }
];

export default function PremiumFeatures() {
  return (
    /* Added min-h-screen and flex logic to make it take the full screen height */
    <section className="relative w-full min-h-screen flex items-center py-20 px-6 overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--secondary-color) 10%, transparent)" }} />
      </div>

      {/* Restored max-w-7xl mx-auto so it is NOT full screen in width */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block shadow-sm"
            style={{
              border: "1px solid color-mix(in srgb, var(--primary-color) 20%, transparent)",
              backgroundColor: "white",
              color: "var(--primary-color)",
            }}
          >
            Target Communities
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: "color-mix(in srgb, var(--surface-color) 90%, black)" }}
          >
            Tailored for <span style={{ color: "var(--primary-color)" }}>Kashmiri</span> Livelihoods
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--muted-text)" }}
          >
            Koshur Finance supports the diverse communities of Jammu & Kashmir in building financial stability around seasonal economic flows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-70 rounded-3xl overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(99,102,241,0.12)]"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={feature.img} 
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto p-6">
                <div
                  className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl text-white group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    boxShadow: "0 8px 16px color-mix(in srgb, var(--primary-color) 30%, transparent)",
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  {feature.title}
                  <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center transition-all group-hover:border-transparent" style={{ backgroundColor: "transparent" }}>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {feature.desc}
                </p>
                
                <div className="mt-5 flex items-center gap-2">
                   <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-0 group-hover:w-full transition-all duration-700" style={{ backgroundColor: "var(--primary-color)" }} />
                   </div>
                   <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Premium</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
