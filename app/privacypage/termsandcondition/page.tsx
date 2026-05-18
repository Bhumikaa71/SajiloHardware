"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useGetTermsQuery } from "@/services/termsAndPolicyApi";

interface BlockContentItem {
  type: string;
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
  };
}

interface EditorBlock {
  id: string;
  type: "paragraph" | "bulletListItem" | "heading";
  content: BlockContentItem[];
}

export default function TermsAndCondition() {
  const { data: termsData, isLoading } = useGetTermsQuery();

  // Safely parse the block-editor string string into a readable JavaScript Array
  const renderBlocks = () => {
    if (!termsData?.data?.content) return null;

    try {
      const blocks: EditorBlock[] = JSON.parse(termsData.data.content);

      return blocks.map((block) => {
        // Build out the inline text styles
        const blockText = block.content?.map((item, idx) => (
          <span
            key={idx}
            className={`${item.styles?.bold ? "font-extrabold text-gray-900 block text-lg mt-8 mb-3" : ""} ${item.styles?.italic ? "italic" : ""
              }`}
          >
            {item.text}
          </span>
        ));

        // Format layout structure cleanly matching types
        switch (block.type) {
          case "bulletListItem":
            return (
              <ul key={block.id} className="list-none pl-1 my-2">
                <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span className="text-primarys text-xs mt-1 shrink-0">➔</span>
                  <div>{blockText}</div>
                </li>
              </ul>
            );
          default:
            // Check if paragraph is just an empty line separator block
            if (!block.content || block.content.length === 0) return null;

            return (
              <p key={block.id} className="text-gray-600 text-sm leading-relaxed mb-4">
                {blockText}
              </p>
            );
        }
      });
    } catch (error) {
      console.error("Error formatting JSON dynamic payload:", error);
      return <p className="text-sm text-red-500">Failed to render legal document.</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow bg-linear-to-b from-white to-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="lg:mt-20"></div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Terms & <span className="text-primarys">Conditions</span>
            </h1>
            <p className="text-gray-400 mt-2 text-xs font-bold uppercase tracking-[0.2em]">
              Legal Agreement • Sajilo Hardware
            </p>
          </div>

          {/* Intro Box */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm mb-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primarys" />
            <p className="text-gray-600 leading-relaxed italic">
              By accessing or using our website, you agree to follow these terms.
              Please read them carefully before making any purchase or using our professional services.
            </p>
          </div>

          {/* Terms Content Block Area */}
          <div className="bg-white border border-gray-100 p-8 sm:p-12 rounded-3xl shadow-xs min-h-[200px]">
            {isLoading ? (
              <div className="space-y-4 animate-pulse py-6">
                <div className="h-5 bg-gray-200 rounded-sm w-1/3" />
                <div className="h-4 bg-gray-100 rounded-sm w-full" />
                <div className="h-4 bg-gray-100 rounded-sm w-5/6" />
              </div>
            ) : (
              <div className="prose max-w-none">
                {renderBlocks()}
              </div>
            )}
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