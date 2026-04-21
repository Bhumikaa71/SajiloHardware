"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
// import VendorNavbar from "@/components/VendorNavbar";

const VendorLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // just redirect
    window.location.href = "/";
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

        <div className="w-full max-w-110 z-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-48 h-16 mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="h-px w-12 bg-green-500/30 mb-4" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              Vendor Portal
            </h2>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email */}
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Vendor Email
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors"
                    size={18}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vendor@sajilo.com"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <div className="flex justify-between mb-2 ml-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Password
                  </label>

                  <Link
                    href="#"
                    className="text-[10px] font-black text-green-500 hover:text-slate-900 tracking-widest transition-colors"
                  >
                    FORGOT?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors"
                    size={18}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold text-slate-700"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#10B981] hover:shadow-xl hover:shadow-green-500/20 active:scale-[0.98] transition-all duration-300">
                SIGN IN
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center mt-8 text-slate-400 text-[10px] font-bold tracking-widest uppercase">
            Sajilo Vendor System v2.0
          </p>
        </div>
      </div>
    </>
  );
};

export default VendorLoginPage;
