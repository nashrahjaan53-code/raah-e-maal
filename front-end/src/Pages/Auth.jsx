import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  CheckCircle2,
  LockKeyhole,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth";

const Auth = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");
    setErrors({});
  }, [searchParams]);

  const validate = () => {
    const tempErrors = {};
    if (!isLogin && !formData.name.trim()) tempErrors.name = "Required";
    if (!formData.username.trim()) tempErrors.username = "Required";
    if (!formData.password.trim()) tempErrors.password = "Required";
    else if (formData.password.length < 6) tempErrors.password = "Min 6 chars";
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Mismatch";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/user");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      if (isLogin) {
        await loginUser({ 
          username: formData.username, 
          password: formData.password 
        });
      } else {
        await registerUser({
          username: formData.username,
          password: formData.password,
        });
        // Auto login after registration
        await loginUser({
          username: formData.username,
          password: formData.password,
        });
      }

      handleAuthSuccess();
    } catch (error) {
      setErrors({ auth: error.message || "Invalid Authorization" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-dvh w-full flex flex-col items-center justify-center px-4 py-6 relative transition-colors duration-500 font-sans overflow-hidden ${isDarkMode ? "bg-[#050608] text-slate-200" : "bg-[#F1F5F9] text-slate-900"}`}>
      
      {/* Background Decor */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-[#7C3AED] blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 ${isDarkMode ? "opacity-10" : "opacity-5"}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-[#4F46E5] blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 ${isDarkMode ? "opacity-10" : "opacity-5"}`} />

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className={`absolute top-6 left-6 transition-colors cursor-pointer flex items-center gap-1.5 z-50 font-bold ${isDarkMode ? "text-white hover:text-[#7C3AED]" : "text-black hover:text-[#7C3AED]"}`}
      >
        <ChevronLeft size={18} />
        <span className="text-[12px] uppercase tracking-[0.2em]">Back to Raah-e-Maal</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] z-10 flex flex-col"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-2xl bg-linear-to-br from-[#7C3AED] to-[#4F46E5] shadow-xl mb-3">
            <ShieldCheck size={26} className="text-white" />
          </div>
          <h1 className={`text-2xl font-bold tracking-tight transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Raah-e-Maal Vault
          </h1>
          <p className={`text-[10px] uppercase tracking-[0.3em] font-bold mt-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
            Authorized Access Only
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className={`w-full border rounded-[2.5rem] p-2 shadow-2xl transition-all duration-500 relative ${isDarkMode ? "bg-[#0D0E12] border-white/10 shadow-black/50" : "bg-white border-slate-200 shadow-slate-200/40"}`}>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`absolute top-6 right-6 p-2 rounded-full transition-all ${isDarkMode ? "bg-white/5 text-yellow-400 hover:bg-white/10" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Segmented Toggle */}
          <div className={`flex p-1 rounded-[1.8rem] mb-4 transition-colors ${isDarkMode ? "bg-black/40" : "bg-slate-100"}`}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${isLogin ? (isDarkMode ? "bg-[#1A1B23] text-white shadow-lg" : "bg-white text-slate-900 shadow-md border border-slate-100") : (isDarkMode ? "text-slate-600" : "text-slate-400")}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${!isLogin ? (isDarkMode ? "bg-[#1A1B23] text-white shadow-lg" : "bg-white text-slate-900 shadow-md border border-slate-100") : (isDarkMode ? "text-slate-600" : "text-slate-400")}`}
            >
              Register
            </button>
          </div>

          <div className="px-5 pb-6 pt-1 sm:px-7">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all mb-3 ${isDarkMode ? "bg-white/2 border-white/5 focus-within:border-[#7C3AED]/50" : "bg-slate-50 border-slate-200 focus-within:border-[#7C3AED]"}`}>
                      <User size={16} className={isDarkMode ? "text-slate-600" : "text-slate-400"} />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={`bg-transparent w-full text-sm outline-none font-medium ${isDarkMode ? "text-white placeholder:text-slate-700" : "text-slate-900 placeholder:text-slate-400"}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${isDarkMode ? "bg-white/[0.02] border-white/5 focus-within:border-[#7C3AED]/50" : "bg-slate-50 border-slate-200 focus-within:border-[#7C3AED]"}`}>
                <Mail size={16} className={isDarkMode ? "text-slate-600" : "text-slate-400"} />
                <input
                  type="text"
                  placeholder="Username"
                  className={`bg-transparent w-full text-sm outline-none font-medium ${isDarkMode ? "text-white placeholder:text-slate-700" : "text-slate-900 placeholder:text-slate-400"}`}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${isDarkMode ? "bg-white/[0.02] border-white/5 focus-within:border-[#7C3AED]/50" : "bg-slate-50 border-slate-200 focus-within:border-[#7C3AED]"}`}>
                <Lock size={16} className={isDarkMode ? "text-slate-600" : "text-slate-400"} />
                <input
                  type="password"
                  placeholder="Secret Key"
                  className={`bg-transparent w-full text-sm outline-none font-medium ${isDarkMode ? "text-white placeholder:text-slate-700" : "text-slate-900 placeholder:text-slate-400"}`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <AnimatePresence>
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all mt-3 ${isDarkMode ? "bg-white/2 border-white/5 focus-within:border-[#7C3AED]/50" : "bg-slate-50 border-slate-200 focus-within:border-[#7C3AED]"}`}>
                      <CheckCircle2 size={16} className={isDarkMode ? "text-slate-600" : "text-slate-400"} />
                      <input
                        type="password"
                        placeholder="Confirm Key"
                        className={`bg-transparent w-full text-sm outline-none font-medium ${isDarkMode ? "text-white placeholder:text-slate-700" : "text-slate-900 placeholder:text-slate-400"}`}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {errors.auth && (
                <div className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center py-1">
                  {errors.auth}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 bg-[#7C3AED] text-white text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-purple-500/20"
              >
                {loading ? "Decrypting..." : isLogin ? "Access Vault" : "Initialize Identity"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className={`mt-6 pt-5 border-t ${isDarkMode ? "border-white/5" : "border-slate-200"}`}>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>Protocol Status</span>
                <span className="flex items-center gap-1.5 text-[9px] font-black text-green-600 uppercase">
                  <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" /> Encrypted
                </span>
              </div>

              <div className={`rounded-2xl p-3 flex items-center gap-3 border transition-colors ${isDarkMode ? "bg-white/1 border-white/5" : "bg-slate-50 border-slate-200"}`}>
                <div className="bg-[#7C3AED]/10 p-2 rounded-lg text-[#7C3AED]">
                  <LockKeyhole size={18} />
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-tight ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>Zero-Knowledge Storage</p>
                  <p className={`text-[9px] font-medium leading-tight ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>Keys stay on your device.</p>
                </div>
              </div>

              <div className={`flex justify-between items-center mt-4 px-1 ${isDarkMode ? "text-slate-700" : "text-slate-400"}`}>
                <div className="flex items-center gap-1.5">
                  <Globe size={10} />
                  <span className="text-[8px] font-black uppercase tracking-tighter">Global Compliance</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter">AES-256 GCM</span>
              </div>
            </div>
          </div>
        </div>

        <p className={`text-center mt-6 text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? "text-slate-600" : "text-slate-500"}`}>
          Secured by <span className={isDarkMode ? "text-slate-400" : "text-slate-900"}>Raah-e-Maal Protocol</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;