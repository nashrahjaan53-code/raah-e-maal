import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

const UspSection = () => {
  const uspPoints = [
    {
      title: "Tracking",
      subtitle: "EXPLAINS THE PRESENT",
      desc: "Real-time mapping of current liabilities to remove the fog of debt.",
      icon: <Target size={22} />,
      side: "left",
    },
    {
      title: "Engineering",
      subtitle: "EVALUATES FUTURE OUTCOMES",
      desc: "Mathematical simulations that project your path to sovereignty.",
      icon: <Cpu size={22} />,
      side: "right",
    },
    {
      title: "Prevention",
      subtitle: "REPLACES REACTION",
      desc: "AI guardrails stopping financial stress before it reaches you.",
      icon: <ShieldAlert size={22} />,
      side: "left",
    }
  ];

  return (
    <section className="relative min-h-screen lg:h-screen w-full overflow-hidden flex items-center px-6 md:px-20 py-20 lg:py-0" style={{ backgroundColor: "var(--background-color)" }}>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ backgroundColor: "color-mix(in srgb, var(--secondary-color) 10%, transparent)" }} />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              border: "1px solid color-mix(in srgb, var(--primary-color) 30%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, transparent)",
              boxShadow: "0 0 20px color-mix(in srgb, var(--primary-color) 10%, transparent)",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--primary-color)" }} />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "color-mix(in srgb, var(--text-color) 92%, transparent)" }}>
              Unique Selling Proposition
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter"
              style={{ color: "var(--text-color)" }}
            >
              Not just tracking debt, but <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, var(--primary-color), var(--secondary-color))" }}>
                engineering freedom.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg font-normal leading-relaxed max-w-lg"
              style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
            >
              Most financial apps show users what they owe today. <span className="font-bold" style={{ color: "var(--primary-color)" }}>Raah-e-Maal</span> focuses on what today's decisions will do to their future.
            </motion.p>
          </div>
        </div>

        <div className="relative py-6 lg:py-0">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[24px] lg:left-1/2 top-0 w-[1px] -translate-x-1/2"
            style={{ backgroundImage: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--text-color) 20%, transparent), transparent)" }}
          />

          <div className="space-y-20 lg:space-y-24 relative">
            {uspPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center w-full group
                  ${item.side === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                  flex-row justify-start lg:justify-center`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: item.side === 'right' ? 5 : -5 }}
                  className={`relative z-10 w-full lg:w-[45%] pl-16 lg:pl-4 py-4 px-6 rounded-2xl transition-all duration-500
                  ${item.side === 'right' ? 'lg:text-left lg:pl-20' : 'lg:text-right lg:pr-20'}
                  hover:bg-white/[0.03] hover:backdrop-blur-sm`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" style={{ backgroundImage: "linear-gradient(to bottom right, color-mix(in srgb, var(--primary-color) 0%, transparent), color-mix(in srgb, var(--primary-color) 5%, transparent))" }} />

                  <span className="font-bold text-[9px] md:text-[11px] tracking-[0.2em] uppercase block mb-1 group-hover:text-white transition-colors" style={{ color: "var(--primary-color)" }}>
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight" style={{ color: "var(--text-color)" }}>
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs md:text-sm font-light leading-relaxed max-w-[320px] transition-colors group-hover:text-white/90
                    ${item.side === 'right' ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'}`}
                    style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
                  >
                    {item.desc}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: 40 }}
                    className={`absolute top-1/2 h-[1px] hidden lg:block
                      ${item.side === 'right' ? 'right-full' : 'left-full'}`}
                    style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 40%, transparent)" }}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer"
                  style={{
                    backgroundColor: "var(--background-color)",
                    border: "1px solid color-mix(in srgb, var(--primary-color) 40%, transparent)",
                    color: "var(--primary-color)",
                    boxShadow: "0 0 20px color-mix(in srgb, var(--primary-color) 20%, transparent)",
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-t-2 border-l-2 animate-spin" style={{ borderColor: "transparent" }} />
                  <div className="absolute inset-1 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 5%, transparent)" }} />
                  {item.icon}
                </motion.div>

                <div className="hidden lg:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ backgroundImage: "linear-gradient(to right, transparent, color-mix(in srgb, var(--text-color) 10%, transparent), transparent)" }} />
    </section>
  );
};

export default UspSection;
