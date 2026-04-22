"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function VendorProfile() {
  const [form, setForm] = useState({
    name: "Vendor Name",
    email: "vendor@email.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-6">
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
                  VN
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow">
                  📷
                </button>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-[var(--texts-dark)]">
                Vendor Name
              </h2>

              <span className="mt-2 px-3 py-1 text-xs rounded-full bg-orange-100 text-[var(--primarys)] font-medium">
                VERIFIED VENDOR
              </span>

              <p className="mt-4 text-sm text-[var(--texts-secondary)]">
                vendor@email.com
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
                  </div>

                  {/* TIP */}
                  <div className="bg-orange-50 border border-orange-200 text-sm p-4 rounded-xl text-[var(--primarys-dark)]">
                    <strong>Security Tip:</strong> Use a mix of letters,
                    numbers, and symbols. Updating your password regularly
                    improves security.
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
