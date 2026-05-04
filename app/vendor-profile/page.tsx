"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useGetVendorProfileQuery, useUpdatePasswordMutation, useUpdateProfileMutation } from "@/services/vendorApi";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

// --- Skeleton Component ---
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white p-6 animate-pulse">
    <div className="max-w-7xl mx-auto px-12">
      <div className="h-8 w-48 bg-gray-200 rounded mb-1"></div>
      <div className="h-4 w-64 bg-gray-100 rounded mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-24 bg-gray-100 rounded-full"></div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 h-40"></div>
          <div className="bg-white rounded-2xl shadow-sm p-6 h-64"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function VendorProfile() {
  const { data: response, isLoading } = useGetVendorProfileQuery();
  const vendorData = response?.data;
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ name: form.name, email: form.email }).unwrap();
      toast("Profile updated successfully!");
    } catch (e) { toast.error("Failed to update profile"); }
  };

  const handleUpdatePassword = async () => {
    if (form.newPassword !== form.confirmPassword) return toast.error("Passwords don't match");
    try {
      await updatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      }).unwrap();
      toast("Password updated!");
      setForm({ ...form, currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (e) { toast.error("Failed to update password"); }
  };


  useEffect(() => {
    if (vendorData) {
      setForm((prev) => ({
        ...prev,
        name: vendorData.full_name || "",
        email: vendorData.email || "",
      }));
    }
  }, [vendorData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Using the Skeleton ---
  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-6">
        {/* ... rest of your existing JSX code ... */}
        <div className="max-w-7xl mx-auto px-12">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-[var(--texts-dark)] mb-1">
            Vendor Settings
          </h1>
          <p className="text-sm text-[var(--texts-secondary)] mb-6">
            Update your profile details and security credentials.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT PROFILE CARD */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[var(--primarys)] flex items-center justify-center text-white text-2xl font-bold">
                  {vendorData?.full_name?.charAt(0).toUpperCase() || "V"}
                </div>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-[var(--texts-dark)]">
                {vendorData?.vendor_shop_name || "Vendor Name"}
              </h2>

              <span className="mt-2 px-3 py-1 text-xs rounded-full bg-orange-100 text-[var(--primarys)] font-medium">
                {vendorData?.isActive ? "ACTIVE VENDOR" : "INACTIVE"}
              </span>

              <p className="mt-4 text-sm text-[var(--texts-secondary)]">
                {vendorData?.email || "No email available"}
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:col-span-2 space-y-6">
              {/* ACCOUNT DETAILS */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-md font-semibold text-[var(--texts-dark)] mb-4">
                  Account Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[var(--texts-secondary)]">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primarys)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--texts-secondary)]">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primarys)]"
                    />
                  </div>
                  <button
                    onClick={handleUpdateProfile}
                    className="px-6 py-2 rounded-lg bg-[var(--primarys)] text-white"
                  >
                    Update Account
                  </button>
                </div>
              </div>

              {/* SECURITY */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-md font-semibold text-[var(--texts-dark)] mb-4">
                  Security & Password
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[var(--texts-secondary)]">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primarys)]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[var(--texts-secondary)]">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primarys)]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--texts-secondary)]">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primarys)]"
                      />
                    </div>
                    <button
                      onClick={handleUpdatePassword}
                      className="px-6 py-2 rounded-lg bg-[var(--primarys)] text-white"
                    >
                      Update Password
                    </button>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 text-sm p-4 rounded-xl text-[var(--primarys-dark)]">
                    <strong>Security Tip:</strong> Use a mix of letters, numbers, and symbols.
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-4">
                <button className="px-6 py-2 rounded-lg border text-[var(--texts-secondary)]">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-[var(--primarys)] text-white hover:bg-[var(--primarys-dark)] transition">
                  Update Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}