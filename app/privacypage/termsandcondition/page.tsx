"use client";

import React from "react";
import { FileText, Package, Truck, RotateCcw, AlertTriangle} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsAndCondition() {
  const sections = [
    {
      id: 1,
      title: "General Conditions",
      icon: <FileText size={20} />,
      content: [
        {
          text: "We reserve the right to refuse service to anyone at any time for any reason.",
        },
        {
          text: "You agree not to reproduce, duplicate, or resell our services or products without explicit written permission.",
        },
      ],
    },
    {
      id: 2,
      title: "Products and Pricing",
      icon: <Package size={20} />,
      content: [
        {
          label: "Accuracy",
          text: "Product descriptions or pricing may occasionally contain errors. We reserve the right to correct them and cancel orders if needed.",
        },
        {
          label: "Availability",
          text: "Stock may change without notice. If an item becomes unavailable, we will contact you for a full refund or replacement.",
        },
      ],
    },
    {
      id: 3,
      title: "Delivery and Shipping",
      icon: <Truck size={20} />,
      content: [
        {
          text: "We aim to deliver within the estimated timeframe, but delays due to logistics, weather, or local regulations may occur.",
        },
        {
          text: "Risk of loss passes to you once the product is delivered to your provided shipping address.",
        },
      ],
    },
    {
      id: 4,
      title: "Returns and Refunds",
      icon: <RotateCcw size={20} />,
      content: [
        {
          text: "Items must be returned in original packaging with proof of purchase within our valid return window.",
        },
        {
          label: "Non-returnable",
          text: "Custom paints, cut-to-size materials, and used tools cannot be returned for hygiene and safety reasons.",
        },
      ],
    },
    {
      id: 5,
      title: "Limitation of Liability",
      icon: <AlertTriangle size={20} />,
      content: [
        {
          text: "Sajilo Hardware is not liable for indirect or consequential damages resulting from product use.",
        },
        {
          label: "Safety",
          text: "All tools and machinery should be used at your own risk and strictly according to the manufacturer's safety guidelines.",
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
              Terms & <span className="text-primarys">Conditions</span>
            </h1>
            <p className="text-gray-400 mt-2 text-xs font-bold uppercase tracking-[0.2em]">
              Legal Agreement • Sajilo Hardware
            </p>
          </div>

          {/* Intro Box - Matching Privacy Policy Style */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm mb-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primarys" />
            <p className="text-gray-600 leading-relaxed italic">
              By accessing or using our website, you agree to follow these terms. 
              Please read them carefully before making any purchase or using our professional services.
            </p>
          </div>

          {/* Terms Sections */}
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
                            <span className="font-bold text-gray-900 uppercase text-[10px] tracking-widest block mb-1">
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