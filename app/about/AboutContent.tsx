"use client";

import React, { useMemo } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface InlineContent {
  type: string;
  text: string;
  styles: Record<string, unknown>;
}

interface Block {
  id: string;
  type: string;
  props: {
    backgroundColor: string;
    textColor: string;
    textAlignment: string;
    level?: number;
  };
  content: InlineContent[];
  children: Block[];
}

interface AboutContentProps {
  about: {
    image: string;
    content: string;
  };
}

function getInlineText(content: InlineContent[]): React.ReactNode[] {
  return content.map((item, i) => {
    let node: React.ReactNode = item.text;
    if (item.styles?.bold) node = <strong key={i}>{node}</strong>;
    if (item.styles?.italic) node = <em key={i}>{node}</em>;
    if (item.styles?.underline) node = <u key={i}>{node}</u>;
    if (item.styles?.strike) node = <s key={i}>{node}</s>;
    return <React.Fragment key={i}>{node}</React.Fragment>;
  });
}

function renderBlock(block: Block, index: number): React.ReactNode {
  const text = block.content.map((c) => c.text).join("");
  const inline = getInlineText(block.content);

  switch (block.type) {
    case "heading": {
      const level = block.props.level ?? 2;
      const sizes: Record<number, string> = {
        1: "text-3xl mt-12 mb-4",
        2: "text-2xl mt-10 mb-3",
        3: "text-xl mt-8 mb-2",
      };
      return (
        <h2
          key={block.id}
          className={`font-serif font-semibold text-gray-900 tracking-tight ${sizes[level] ?? sizes[2]}`}
        >
          {inline}
        </h2>
      );
    }

    case "paragraph": {
      if (!text.trim()) return null;
      return (
        <p
          key={block.id}
          className="text-gray-500 text-[15px] leading-[1.85] font-light mb-4"
        >
          {inline}
        </p>
      );
    }

    case "bulletListItem": {
      return (
        <li
          key={block.id}
          className="text-gray-500 text-[15px] leading-relaxed font-light mb-1 ml-4 list-disc"
        >
          {inline}
          {block.children.length > 0 && (
            <ul className="mt-1 space-y-1 pl-4">
              {block.children.map((child) => renderBlock(child, 0))}
            </ul>
          )}
        </li>
      );
    }

    case "numberedListItem": {
      return (
        <li
          key={block.id}
          className="text-gray-500 text-[15px] leading-relaxed font-light mb-1 ml-4 list-decimal"
        >
          {inline}
          {block.children.length > 0 && (
            <ol className="mt-1 space-y-1 pl-4">
              {block.children.map((child) => renderBlock(child, 0))}
            </ol>
          )}
        </li>
      );
    }

    case "checkListItem": {
      const checked = (block.props as any).checked ?? false;
      return (
        <li key={block.id} className="flex items-start gap-2 mb-2">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mt-1 accent-orange-500"
          />
          <span
            className={`text-[15px] font-light leading-relaxed ${
              checked ? "line-through text-gray-400" : "text-gray-500"
            }`}
          >
            {inline}
          </span>
        </li>
      );
    }

    case "quote": {
      return (
        <blockquote
          key={block.id}
          className="border-l-2 border-orange-400 pl-5 my-6 italic text-gray-500 text-sm leading-relaxed font-light"
        >
          {inline}
        </blockquote>
      );
    }

    case "table": {
      const rows = (block.content as any)?.rows ?? [];
      if (!rows.length) return null;
      const [headerRow, ...bodyRows] = rows;
      return (
        <div key={block.id} className="overflow-x-auto my-6 rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <tr>
                {headerRow?.cells?.map((cell: any[], ci: number) => (
                  <th key={ci} className="px-4 py-3 border-b border-gray-100">
                    {cell.map((c) => c.text).join("")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row: any, ri: number) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                >
                  {row.cells?.map((cell: any[], ci: number) => (
                    <td key={ci} className="px-4 py-3 border-b border-gray-100 font-light">
                      {cell.map((c) => c.text).join("")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "image": {
      const src = (block.props as any).url ?? "";
      const caption = (block.props as any).caption ?? "";
      if (!src) return null;
      return (
        <figure key={block.id} className="my-6">
          <img
            src={src}
            alt={caption}
            className="w-full rounded-xl object-cover max-h-80"
          />
          {caption && (
            <figcaption className="text-center text-xs text-gray-400 mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}

// Wrap consecutive list items in <ul> or <ol>
function renderBlocks(blocks: Block[]): React.ReactNode {
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "bulletListItem") {
      const items: React.ReactNode[] = [];
      while (i < blocks.length && blocks[i].type === "bulletListItem") {
        items.push(renderBlock(blocks[i], i));
        i++;
      }
      result.push(
        <ul key={`ul-${i}`} className="my-4 space-y-1 pl-2">
          {items}
        </ul>
      );
      continue;
    }

    if (block.type === "numberedListItem") {
      const items: React.ReactNode[] = [];
      while (i < blocks.length && blocks[i].type === "numberedListItem") {
        items.push(renderBlock(blocks[i], i));
        i++;
      }
      result.push(
        <ol key={`ol-${i}`} className="my-4 space-y-1 pl-2">
          {items}
        </ol>
      );
      continue;
    }

    if (block.type === "checkListItem") {
      const items: React.ReactNode[] = [];
      while (i < blocks.length && blocks[i].type === "checkListItem") {
        items.push(renderBlock(blocks[i], i));
        i++;
      }
      result.push(
        <ul key={`cl-${i}`} className="my-4 space-y-1 list-none pl-0">
          {items}
        </ul>
      );
      continue;
    }

    const rendered = renderBlock(block, i);
    if (rendered) result.push(rendered);
    i++;
  }

  return result;
}



export default function AboutContent({ about }: AboutContentProps) {
  const blocks: Block[] = useMemo(() => {
    try {
      return JSON.parse(about.content);
    } catch {
      return [];
    }
  }, [about.content]);

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif !important; }
      `}</style>

      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-32 pb-16">

        {/* Hero */}
        <div className="relative w-full h-[360px] rounded-2xl overflow-hidden mb-12 shadow-md">
          <img
            src={about.image}
            alt="About"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <h1 className="font-serif absolute bottom-8 left-8 text-white text-4xl font-semibold tracking-tight drop-shadow">
            About Us
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-12">

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-gray-200 pr-8 pt-2">
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-5">
              At a glance
            </p>
            {[
              { num: " 2076 BS", label: "Year founded" },
              { num: "10K+", label: "Products in catalog" },
              { num: "50+", label: "Cities served" },
            ].map((s) => (
              <div key={s.num} className="mb-6">
                <p className="font-serif text-3xl font-semibold text-gray-900 leading-none mb-1">
                  {s.num}
                </p>
                <p className="text-xs text-gray-400 font-light">{s.label}</p>
              </div>
            ))}
            <hr className="border-gray-100 my-2" />
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-3 mt-4">
              Specialties
            </p>
            {["Industrial Tools", "Structural Systems", "Trade Equipment", "Bulk Orders"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-gray-500 border border-gray-200 rounded-full px-3 py-1 mb-2 w-fit font-light"
                >
                  {tag}
                </span>
              )
            )}
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">{renderBlocks(blocks)}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}