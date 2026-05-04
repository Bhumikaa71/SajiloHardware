"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useSendOtpAndResetPasswordMutation } from "@/services/vendorApi";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email");


  const [resetPassword, { isLoading }] =
    useSendOtpAndResetPasswordMutation();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedOtp = otp.trim();
    const email = emailFromUrl || localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("Email missing. Please try again.");
      return;
    }

    if (!trimmedOtp) {
      setError("OTP is required");
      return;
    }

    if (!/^[0-9]{6}$/.test(trimmedOtp)) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");

      const res = await resetPassword({
        email,
        otp: trimmedOtp,
        newPassword: password,
      }).unwrap();

      toast.success(res?.message || "Password reset successful");

      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired OTP");
    }
  };

  return (
    <>
      {/* ✅ TOASTER */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#F97316]" />

        <div className="w-full max-w-110 z-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-48 h-16 mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="h-px w-12 bg-orange-500/30 mb-4" />
            <h2 className="text-xl font-black uppercase text-slate-900">
              Admin Portal
            </h2>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Enter OTP
              </label>

              <input
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
                maxLength={6}
                inputMode="numeric"
                placeholder="------"
                className={`w-full bg-slate-50/50 border rounded-2xl py-4 px-4 outline-none transition-all font-bold text-slate-700 text-center tracking-[0.5em] ${error
                  ? "border-red-400"
                  : "border-slate-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5"
                  }`}
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-slate-50/50 border rounded-2xl py-4 pl-4 pr-12 outline-none font-bold text-slate-700 border-slate-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="w-full bg-slate-50/50 border rounded-2xl py-4 px-4 outline-none font-bold text-slate-700 border-slate-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5"
              />

              {/* Inline error */}
              {error && (
                <p className="text-red-500 text-xs ml-1">{error}</p>
              )}

              {/* Button */}
              <button
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] flex justify-center gap-3 hover:bg-[#F97316] transition-all disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "RESET PASSWORD"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}