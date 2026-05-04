"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSendOtpMutation } from "@/services/vendorApi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      setError("");

      const res = await sendOtp({ email }).unwrap();

      router.push(`/resetpassword?email=${email}`);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#F97316]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

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
          <div className="h-px w-12 bg-orange-500/30 mb-4" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
            Admin Portal
          </h2>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Management Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // clear error on typing
                  }}
                  placeholder="admin@sajilo.com"
                  className={`w-full bg-slate-50/50 border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-slate-700 ${error
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5"
                    }`}
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#F97316] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "SENDING..." : "SEND OTP"}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-[10px] font-bold tracking-widest uppercase">
          Sajilo Hardware Internal Systems v2.0
        </p>
      </div>
    </div>
  );
}
