"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useGetPrivacyPolicyQuery } from "@/services/termsAndPolicyApi";

interface BlockStyle {
  bold?: boolean;
  italic?: boolean;
}

interface InlineContentNode {
  type: "text" | "link";
  text?: string;
  href?: string;
  styles?: BlockStyle;
  content?: InlineContentNode[]; // For embedded text inside link wrappers
}

interface EditorBlock {
  id: string;
  type: "paragraph" | "bulletListItem" | "heading";
  props?: {
    level?: number;
  };
  content: InlineContentNode[];
}

export default function PrivacyPolicy() {
  const { data: privacyPolicyData, isLoading } = useGetPrivacyPolicyQuery();

  // Flattens mixed string text nodes and links into standardized styled React elements
  const renderInlineContent = (contentNodes: InlineContentNode[]) => {
    if (!contentNodes) return null;

    return contentNodes.map((node, idx) => {
      const isBold = node.styles?.bold;
      const isItalic = node.styles?.italic;

      const textClass = `${isBold ? "font-extrabold text-gray-900" : ""} ${isItalic ? "italic" : ""
        }`;

      if (node.type === "link") {
        return (
          <a
            key={idx}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primarys underline hover:text-orange-600 break-all transition-colors"
          >
            {node.content ? renderInlineContent(node.content) : node.text}
          </a>
        );
      }

      return (
        <span key={idx} className={textClass}>
          {node.text}
        </span>
      );
    });
  };

  const renderBlocks = () => {
    if (!privacyPolicyData?.data?.content) return null;

    try {
      const blocks: EditorBlock[] = JSON.parse(privacyPolicyData.data.content);

      return blocks.map((block) => {
        // Drop layout blocks that do not possess actual text payload metrics
        if (!block.content || block.content.length === 0) return null;

        const inlineElements = renderInlineContent(block.content);

        // Map layout structures cleanly matching editor block variations
        switch (block.type) {
          case "heading":
            const headingLevel = block.props?.level || 3;
            if (headingLevel === 1) {
              return <h2 key={block.id} className="text-2xl font-black text-gray-900 mt-8 mb-4 tracking-tight">{inlineElements}</h2>;
            }
            if (headingLevel === 2) {
              return <h3 key={block.id} className="text-xl font-extrabold text-gray-900 mt-7 mb-3 tracking-tight">{inlineElements}</h3>;
            }
            return <h4 key={block.id} className="text-base font-extrabold text-gray-900 mt-6 mb-2 tracking-tight">{inlineElements}</h4>;

          case "bulletListItem":
            return (
              <ul key={block.id} className="list-none pl-1 my-2">
                <li className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span className="text-primarys text-xs mt-1 shrink-0">➔</span>
                  <div className="flex-1">{inlineElements}</div>
                </li>
              </ul>
            );

          default:
            // Check if the single text segment within paragraph indicates a sub-header setup
            const isEmphasizedHeading = block.content[0]?.styles?.bold && block.content.length === 1;

            return (
              <p
                key={block.id}
                className={`text-gray-600 text-sm leading-relaxed ${isEmphasizedHeading ? "text-base font-extrabold text-gray-900 mt-8 mb-3 block" : "mb-4"
                  }`}
              >
                {inlineElements}
              </p>
            );
        }
      });
    } catch (error) {
      console.error("Error formatting dynamic privacy payload:", error);
      return <p className="text-sm text-red-500">Failed to render privacy metrics.</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="lg:pt-20"></div>
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

          {/* Dynamic Content Container */}
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