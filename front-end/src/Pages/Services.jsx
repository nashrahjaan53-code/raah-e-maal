
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Cpu,
  BarChart3,
  Shield,
  ArrowUpRight,
  Target,
  Sparkles,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const serviceData = [
  {
    id: "01",
    title: "AI Scenario Modeler",
    tagline: "Predict every possible future.",
    desc: "Our ML agents simulate thousands of life events, from interest hikes to career shifts, to ensure your path to freedom is unbreakable.",
    icon: Cpu,
    img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Freedom Roadmap",
    tagline: "The blueprint to zero debt.",
    desc: "A step-by-step custom strategy that reorganizes your liabilities mathematically to save you years of repayment time.",
    icon: Target,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Visual Analytics",
    tagline: "Transparency in every pixel.",
    desc: "Transform dull bank statements into high-fidelity interactive dashboards. See exactly when your money is working for you.",
    icon: BarChart3,
    img: "https://static.vecteezy.com/system/resources/previews/029/316/503/non_2x/business-people-use-computers-to-analyze-business-and-manage-corporate-data-business-analytics-with-charts-metrics-and-kpis-to-improve-organizational-performance-marketing-photo.jpg",
  },
  {
    id: "04",
    title: "Risk Guardrails",
    tagline: "Your automated shield.",
    desc: "Real-time monitoring of predatory fees and market fluctuations. Our AI alerts you before the bank even knows they've changed the rules.",
    icon: Shield,
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000&auto=format&fit=crop",
  },
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans selection:bg-[color:color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      {/* SECTION 1: HERO (DARK) */}
      <section className="relative flex h-[100vh] items-center overflow-hidden px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Fintech Grid"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--surface-color), color-mix(in srgb, var(--surface-color) 60%, transparent), transparent)",
            }}
          />
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "linear-gradient(to top, var(--surface-color), transparent, transparent)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <div
              className="mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-md"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--text-color) 5%, transparent)",
                border: "1px solid color-mix(in srgb, var(--text-color) 10%, transparent)",
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
                Engineering Suite
              </span>
            </div>

            <h1 className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter md:text-8xl">
              Advanced Tools <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--primary-color), color-mix(in srgb, var(--text-color) 92%, var(--primary-color)))",
                }}
              >
                To Reclaim Control.
              </span>
            </h1>

            <p
              className="max-w-2xl text-lg font-light leading-relaxed md:text-2xl"
              style={{ color: "var(--text-color)" }}
            >
              We've developed a high-performance ecosystem designed to engineer
              your path to financial sovereignty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: SERVICES (LIGHT) */}
      <section 
        className="relative px-6 py-20 lg:px-20"
        style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)", color: "#1a1a1a" }} // Forced Light Theme
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-2">
            {serviceData.map((service, index) => {
              const Icon = service.icon;
              const isActive = hoveredIndex === index;

              return (
                <motion.div
                  key={service.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => setHoveredIndex(index)}
                  className="group relative cursor-pointer"
                >
                  <div
                    className={`relative z-10 border-b py-10 transition-all duration-700 ${isActive ? "pb-12 md:pb-20" : ""}`}
                    style={{
                      borderColor: "rgba(0,0,0,0.08)", // Darker border for light bg
                    }}
                  >
                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                      <div className="flex items-center gap-6 md:w-1/2 md:gap-8">
                        <span
                          className="text-xl font-black transition-colors duration-500"
                          style={{
                            color: isActive
                              ? "var(--primary-color)"
                              : "var(--primary-color)",
                          }}
                        >
                          {service.id}
                        </span>

                        <div className="space-y-1">
                          <h3
                            className={`text-2xl font-bold tracking-tighter transition-all duration-500  md:text-5xl ${isActive ? "translate-x-2 md:translate-x-4" : ""}`}
                            style={{
                              color: isActive
                                ? "#000000"
                                : "#000000",
                            }}
                          >
                            {service.title}
                          </h3>

                          <div className="flex items-center gap-3">
                            <p
                              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-opacity duration-500 md:text-xs ${isActive ? "opacity-100" : "opacity-0"}`}
                              style={{ color: "var(--primary-color)" }}
                            >
                              {service.tagline}
                            </p>
                            {!isActive && (
                              <motion.span
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-[8px] font-bold uppercase tracking-widest lg:hidden"
                                style={{
                                  color: "rgba(0,0,0,0.2)",
                                }}
                              >
                                Tap to preview
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="w-full overflow-hidden rounded-2xl border lg:hidden"
                            style={{
                              borderColor: "rgba(0,0,0,0.1)",
                            }}
                          >
                            <img
                              src={service.img}
                              alt={service.title}
                              className="mb-4 h-52 w-full object-cover"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center justify-between md:w-1/3">
                        <div
                          className={`overflow-hidden transition-all duration-700 ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                          <p
                            className="pr-4 text-m font-light leading-relaxed md:pr-10"
                            style={{ color: "rgba(0,0,0,0.9)" }} // Muted dark text
                          >
                            {service.desc}
                          </p>
                        </div>

                        <div className="relative">
                          {!isActive && (
                            <motion.div
                              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="absolute inset-0 rounded-full border lg:hidden"
                              style={{ borderColor: "var(--primary-color)" }}
                            />
                          )}

                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isActive ? "rotate-45" : ""}`}
                            style={{
                              backgroundColor: isActive
                                ? "var(--primary-color)"
                                : "transparent",
                              borderColor: isActive
                                ? "var(--primary-color)"
                                : "rgba(0,0,0,0.1)",
                            }}
                          >
                            {isActive ? (
                              <ArrowUpRight size={20} color="white" />
                            ) : (
                              <Plus
                                size={20}
                                style={{
                                  color: "rgba(0,0,0,0.2)",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 1.1, x: 100 }}
                        transition={{ duration: 0.8 }}
                        className="pointer-events-none absolute right-0 top-1/2 z-0 hidden h-[250px] w-1/3 -translate-y-1/2 lg:block"
                      >
                        <div
                          className="relative h-full w-full overflow-hidden rounded-[30px] border shadow-2xl"
                          style={{
                            borderColor: "rgba(0,0,0,0.05)",
                          }}
                        >
                          <img
                            src={service.img}
                            alt={service.title}
                            className="h-full w-full object-cover grayscale-[50%] transition-all duration-700 group-hover:grayscale-0"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to right, white, transparent, transparent)",
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA (DARK) */}
      <section className="px-6 py-24 md:px-10" style={{ backgroundColor: "color-mix(in srgb, var(--surface-color) 16%, white)" }}>
        <div className="group relative mx-auto max-w-4xl">
          <div
            className="absolute -inset-[1px] rounded-3xl"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--text-color) 5%, transparent), color-mix(in srgb, var(--primary-color) 40%, transparent), color-mix(in srgb, var(--text-color) 5%, transparent))",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-3xl border p-8 shadow-2xl md:flex-row md:p-10"
            style={{
              backgroundColor: "#0a0a0b",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 blur-[80px]"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary-color) 5%, transparent)",
              }}
            />

            <div className="relative z-10 space-y-3 text-center md:text-left">
              <div
                className="mb-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] md:justify-start"
                style={{ color: "var(--primary-color)" }}
              >
                <ShieldCheck size={14} /> SYSTEM READY
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                Ready to begin <br className="hidden md:block" /> your
                engineering?
              </h2>
              <p
                className="text-xs font-light md:text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Join 12,000+ others building their financial future.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4">
              <button
                onClick={() => navigate("/tracker")}
                className="cursor-pointer rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 bg-white text-black"
              >
                Setup Roadmap
              </button>
              <button
                className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.2em] transition-colors text-white/30 hover:text-white"
              >
                Speak with Raah-e-Maal AI
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div
        className="mb-10 h-[1px] w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--text-color) 5%, transparent), transparent)",
        }}
      />
    </div>
  );
};

export default Services;