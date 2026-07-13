import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, CreditCard, HelpCircle, Lock, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";

const categories = [
  { id: "All", label: "General", icon: HelpCircle },
  { id: "Product", label: "Product", icon: Target },
  { id: "Security", label: "Trust & Safety", icon: Lock },
  { id: "Pricing", label: "Billing", icon: CreditCard },
];

const faqs = [
  {
    cat: "Product",
    question: "What exactly is Raah-e-Maal?",
    answer:
      "Raah-e-Maal is a debt planning platform that helps you compare repayment paths, test financial scenarios, and choose a smarter strategy with less guesswork.",
    icon: Zap,
  },
  {
    cat: "Product",
    question: "Can I compare different repayment strategies before I commit?",
    answer:
      "Yes. You can simulate payoff timelines, prepayments, and alternative plans so you can see tradeoffs before making a real decision.",
    icon: Sparkles,
  },
  {
    cat: "Pricing",
    question: "Do I get a discount if I become a frequent customer?",
    answer:
      "We offer plan options designed for different needs. If you use Raah-e-Maal regularly, the upgraded plans unlock deeper analysis and richer planning workflows.",
    icon: CreditCard,
  },
  {
    cat: "Pricing",
    question: "Is there a free option?",
    answer:
      "Yes. The free experience gives you access to core tools, while premium plans unlock advanced forecasting, deeper comparisons, and enhanced guidance.",
    icon: HelpCircle,
  },
  {
    cat: "Security",
    question: "Is my financial data safe and private?",
    answer:
      "We design the platform with privacy-first handling, secure access patterns, and controlled data flows so your planning information stays protected.",
    icon: ShieldCheck,
  },
  {
    cat: "Security",
    question: "Do I need to connect my bank account to use it?",
    answer:
      "No. You can begin by entering information manually, which makes it easy to explore scenarios without linking accounts on day one.",
    icon: Lock,
  },
];

function FaqItem({ faq, isOpen, onClick }) {
  const Icon = faq.icon;

  return (
    <div
      className="overflow-hidden rounded-[24px] border transition-all duration-300"
      style={{
        backgroundColor: "color-mix(in srgb, var(--surface-color) 82%, transparent)",
        borderColor: "color-mix(in srgb, var(--muted-text) 22%, transparent)",
        boxShadow: isOpen
          ? "0 24px 70px color-mix(in srgb, var(--primary-color) 30%, transparent)"
          : "0 12px 32px rgba(0, 0, 0, 0.18)",
      }}
    >
      <button
        onClick={onClick}
        type="button"
        className="flex w-full items-start gap-4 px-6 py-5 text-left md:px-8 md:py-6"
      >
        <div
          className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: "color-mix(in srgb, var(--primary-color) 14%, transparent)",
            color: "var(--primary-color)",
          }}
        >
          <Icon size={18} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-snug md:text-xl" style={{ color: "var(--text-color)" }}>
            {faq.question}
          </h3>

          {isOpen && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-4 max-w-3xl text-sm leading-7 md:text-[15px]"
              style={{ color: "var(--muted-text)" }}
            >
              {faq.answer}
            </motion.p>
          )}
        </div>

        <div
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300"
          style={{
            borderColor: "color-mix(in srgb, var(--muted-text) 22%, transparent)",
            backgroundColor: isOpen
              ? "color-mix(in srgb, var(--primary-color) 14%, transparent)"
              : "color-mix(in srgb, var(--surface-color) 65%, transparent)",
            color: "var(--primary-color)",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <ChevronRight size={18} />
        </div>
      </button>
    </div>
  );
}

function Faqs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = useMemo(() => {
    return activeCategory === "All" ? faqs : faqs.filter((faq) => faq.cat === activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setOpenIndex(0);
  };

  return (
    <>
      <section
        id="faq-section"
        className="relative overflow-hidden px-4 py-24 md:px-8 lg:px-10"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full blur-[120px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)" }}
        />

        <div className="mx-auto max-w-7xl">
          <div
            className="relative overflow-hidden rounded-[36px] border px-5 py-5 backdrop-blur-2xl md:px-8 md:py-8"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--primary-color) 10%, var(--surface-color)), color-mix(in srgb, var(--background-color) 92%, var(--surface-color)))",
              borderColor: "color-mix(in srgb, var(--muted-text) 22%, transparent)",
              boxShadow: "0 30px 100px rgba(0, 0, 0, 0.36)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-16 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary-color) 30%, transparent), transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-[28rem] -translate-x-1/2 rounded-full blur-[90px]"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 14%, transparent)" }}
            />

            <div
              className="relative rounded-[28px] border px-6 py-10 md:px-10 md:py-14 lg:px-14"
              style={{
                backgroundColor: "color-mix(in srgb, var(--surface-color) 72%, black)",
                borderColor: "color-mix(in srgb, var(--muted-text) 22%, transparent)",
              }}
            >
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--primary-color)" }}>
                  FAQ
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl" style={{ color: "var(--text-color)" }}>
                  Questions? Look here.
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "var(--muted-text)" }}>
                  Can&apos;t find an answer? Reach out to our team and we&apos;ll help you choose the right path, plan, or setup.
                </p>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
                <aside>
                  <div
                    className="rounded-[24px] border p-6"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--surface-color) 82%, transparent)",
                      borderColor: "color-mix(in srgb, var(--muted-text) 22%, transparent)",
                    }}
                  >
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text-color)" }}>
                      Table of Contents
                    </h2>

                    <div className="mt-6 space-y-2">
                      {categories.map((category) => {
                        const isActive = activeCategory === category.id;

                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            type="button"
                            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200"
                            style={{
                              backgroundColor: isActive
                                ? "color-mix(in srgb, var(--primary-color) 14%, transparent)"
                                : "transparent",
                              color: isActive ? "var(--primary-color)" : "var(--muted-text)",
                            }}
                          >
                            <category.icon size={16} />
                            <span className="text-sm font-medium">{category.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </aside>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <FaqItem
                      key={`${activeCategory}-${faq.question}`}
                      faq={faq}
                      isOpen={openIndex === index}
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
}

export default Faqs;
