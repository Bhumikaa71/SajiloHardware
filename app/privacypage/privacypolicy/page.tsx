"use client";

import React from "react";
import { FileText, Share2, Cookie, UserCheck} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: <FileText size={20} />,
      content: [
        {
          label: "Identity Data",
          text: "Name, address, and contact details for secure delivery.",
        },
        {
          label: "Transaction Data",
          text: "Payment details and order history.",
        },
      ],
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: <UserCheck size={20} />,
      content: [
        { text: "Process and deliver your orders efficiently." },
        { text: "Send timely updates via SMS or email." },
        { text: "Prevent fraud and improve overall site security." },
      ],
    },
    {
      id: 3,
      title: "Data Sharing",
      icon: <Share2 size={20} />,
      content: [
        {
          label: "Payment Partners",
          text: "Secure handling of financial transactions.",
        },
        {
          label: "Delivery Services",
          text: "Trusted couriers to deliver products to your location.",
        },
      ],
    },
    {
      id: 4,
      title: "Cookies & Tracking",
      icon: <Cookie size={20} />,
      content: [
        {
          text: "We use cookies to improve your experience, remember your preferences, and analyze site traffic.",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow bg-linear-to-b from-white to-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Privacy <span className="text-primarys">Policy</span>
            </h1>
            <p className="text-gray-400 mt-2 text-xs font-bold uppercase tracking-[0.2em]">
              Sajilo Hardware Nepal
            </p>
          </div>

          {/* Intro Box */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm mb-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primarys" />
            <p className="text-gray-600 leading-relaxed italic">
              Your privacy matters to us. This policy outlines how we collect,
              use, and protect your information while ensuring a safe and smooth
              shopping experience.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="group bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  {/* Number Badge */}
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primarys/10 text-primarys font-bold text-sm">
                    0{section.id}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gray-50 rounded-lg text-primarys group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="text-sm leading-relaxed text-gray-600">
                          {/* TypeScript safe check for label */}
                          {"label" in item && (
                            <span className="font-bold uppercase text-[10px] tracking-widest block mb-1 text-primarys">
                              {item.label}
                            </span>
                          )}
                          <p className="text-gray-700">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

          {/* Footer Note */}
          <p className="text-center text-[10px] font-bold text-gray-400 mt-12 uppercase tracking-widest">
            Last updated: April 20, 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}