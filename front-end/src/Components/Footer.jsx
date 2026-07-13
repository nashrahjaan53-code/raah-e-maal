import React from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden border-t pt-10 pb-10"
      style={{
        backgroundColor: "color-mix(in srgb, var(--background-color) 92%, black)",
        borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)",
      }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--primary-color) 5%, transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--secondary-color) 5%, transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link
              to="/"
              className="text-3xl font-black tracking-tighter transition-opacity hover:opacity-80"
              style={{ color: "var(--primary-color)" }}
            >
              Raah-e-Maal
            </Link>
            <p
              className="max-w-xs text-sm leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--text-color) 60%, transparent)" }}
            >
              Navigating financial safety and loan repayment paths for Kashmiri farmers, weavers, and households.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<Linkedin size={18} />} href="https://linkedin.com" />
              <SocialIcon icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialIcon icon={<Github size={18} />} href="https://github.com" />
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-color)" }}>
              Platform
            </h4>
            <ul className="space-y-4">
              <FooterLink label="Loan Tracker" to="/tracker" />
              <FooterLink label="Services" to="/services" />
              <FooterLink label="How It Works" to="/" />
              <FooterLink label="Visualisation Suite" to="/visualisation" />
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-color)" }}>
              Company
            </h4>
            <ul className="space-y-4">
              <FooterLink label="About Raah-e-Maal" to="/about" />
              <FooterLink label="FAQ'S" to="/faqs" />
              <FooterLink label="Contact Us" to="/contact" />
              <FooterLink label="Privacy Policy" to="/privacy" />
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-color)" }}>
              Intelligence Briefing
            </h4>
            <p style={{ color: "color-mix(in srgb, var(--text-color) 50%, transparent)" }}>
              Get the latest insights on J&K subsidies and financial planning updates.
            </p>
            <div className="group relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full border py-3 px-5 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--text-color) 5%, transparent)",
                  borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)",
                  color: "var(--text-color)",
                }}
              />
              <button
                className="absolute right-1.5 top-1.5 rounded-full p-1.5 transition-colors group-hover:scale-110 active:scale-95"
                style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center gap-6 border-t pt-8 md:flex-row"
          style={{ borderColor: "color-mix(in srgb, var(--text-color) 5%, transparent)" }}
        >
          <div
            className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "color-mix(in srgb, var(--text-color) 30%, transparent)" }}
          >
            <span style={{ color: "var(--primary-color)" }}>© 2026 Raah-e-Maal</span>
            <Link to="/about" style={{ color: "var(--primary-color)" }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: "var(--primary-color)" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label, to }) => (
  <li>
    <Link
      to={to}
      className="inline-block text-sm transition-all hover:translate-x-1"
      style={{ color: "color-mix(in srgb, var(--text-color) 50%, transparent)" }}
    >
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300"
    style={{
      borderColor: "color-mix(in srgb, var(--text-color) 10%, transparent)",
      color: "color-mix(in srgb, var(--text-color) 50%, transparent)",
    }}
  >
    {icon}
  </a>
);

export default Footer;
