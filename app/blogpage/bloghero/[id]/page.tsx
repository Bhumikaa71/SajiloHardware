/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useGetBlogByIdQuery, useGetAllBlogsQuery } from "@/services/blogApi";

// ─── Helpers ────────────────────────────────────────────────────────────────

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractFirstImage = (html: string): string | null => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
};

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const estimateReadTime = (html: string): string => {
  const words = stripHtml(html).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop";

// ─── Reading Progress Bar ────────────────────────────────────────────────────

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-amber-400 z-50"
    />
  );
};

// ─── Table of Contents ───────────────────────────────────────────────────────

const extractHeadings = (
  html: string,
): { id: string; text: string; level: number }[] => {
  const matches = [...html.matchAll(/<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi)];
  return matches.map((m, i) => ({
    id: `heading-${i}`,
    text: m[2].replace(/<[^>]*>/g, ""),
    level: parseInt(m[1]),
  }));
};

const injectHeadingIds = (html: string): string => {
  let idx = 0;
  return html.replace(/<h([2-3])([^>]*)>/gi, (_match, level, attrs) => {
    return `<h${level}${attrs} id="heading-${idx++}">`;
  });
};

// ─── Related Card ────────────────────────────────────────────────────────────

const RelatedCard = ({ post }: { post: any }) => (
  <motion.article
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 overflow-hidden transition-all duration-200"
  >
    {/* Image */}
    <div className="relative h-36 w-full overflow-hidden bg-gray-50">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen size={24} className="text-gray-200" />
        </div>
      )}
    </div>

    {/* Body */}
    <div className="p-4">
      <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <h4 className="text-[13px] font-medium leading-snug mb-3 text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
        {post.title}
      </h4>
      <Link
        href={`/blog/${post.id}`}
        className="text-[11px] font-medium flex items-center gap-1 text-gray-500 group-hover:text-gray-900 transition-colors"
      >
        Read more <ArrowRight size={11} />
      </Link>
    </div>
  </motion.article>
);

// ─── Skeleton ────────────────────────────────────────────────────────────────

const BlogDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[360px] bg-gray-100 rounded-2xl mb-8" />
    <div className="max-w-3xl mx-auto px-4 space-y-4">
      <div className="h-3 bg-gray-100 rounded w-1/3" />
      <div className="h-8 bg-gray-100 rounded w-3/4" />
      <div className="h-8 bg-gray-100 rounded w-2/3" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-3 bg-gray-100 rounded w-full" />
      ))}
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const BlogDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, amount: 0 });

  const { data: blogData, isLoading, isError } = useGetBlogByIdQuery(id);
  const { data: allBlogsData } = useGetAllBlogsQuery();

  const blog = blogData?.blog
    ? {
        id: blogData.blog._id,
        title: blogData.blog.title,
        content: blogData.blog.content,
        date: formatDate(blogData.blog.createdAt),
        readTime: estimateReadTime(blogData.blog.content),
        image: extractFirstImage(blogData.blog.content) ?? FALLBACK_IMAGE,
        headings: extractHeadings(blogData.blog.content),
        contentWithIds: injectHeadingIds(blogData.blog.content),
      }
    : null;

  const relatedBlogs = (allBlogsData?.blogs ?? [])
    .filter((b: any) => b._id !== id)
    .slice(0, 3)
    .map((b: any) => ({
      id: b._id,
      title: b.title,
      date: formatDate(b.createdAt),
      readTime: estimateReadTime(b.content),
      image: extractFirstImage(b.content) ?? FALLBACK_IMAGE,
    }));

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: blog?.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <ReadingProgressBar />
      <Navbar />

      <main className="mx-auto max-w-5xl">
        {/* ── Loading ── */}
        {isLoading && (
          <div className="px-4 sm:px-6 lg:px-8 pt-10">
            <BlogDetailSkeleton />
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
            <p className="text-red-400 text-base font-medium mb-4">
              Failed to load this article. Please try again.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 font-medium text-sm hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={15} /> Back to Blog
            </Link>
          </div>
        )}

        {blog && (
          <>
            {/* ── Hero Banner ── */}
            <section className="px-4 mt-20 sm:px-6 lg:px-8 pt-8 pb-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden min-h-[340px] md:min-h-[420px] flex items-end"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a2a1a 100%)",
                }}
              >
                {/* Background image */}
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover opacity-35"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-7 md:p-12 w-full">
                  {/* Breadcrumb */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center gap-2 text-white/40 text-[11px] tracking-wide mb-4"
                  >
                    <Link
                      href="/"
                      className="hover:text-white/70 transition-colors"
                    >
                      Home
                    </Link>
                    <ChevronRight size={11} className="opacity-40" />
                    <Link
                      href="/blog"
                      className="hover:text-white/70 transition-colors"
                    >
                      Blog
                    </Link>
                    <ChevronRight size={11} className="opacity-40" />
                    <span className="truncate max-w-[200px] opacity-50">
                      {blog.title}
                    </span>
                  </motion.div>

                  {/* Meta pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-wrap items-center gap-4 mb-4"
                  >
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400 tracking-widest uppercase">
                      <Calendar size={11} /> {blog.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400 tracking-widest uppercase">
                      <Clock size={11} /> {blog.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400 tracking-widest uppercase">
                      <BookOpen size={11} /> Article
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-2xl sm:text-3xl md:text-[2.4rem] font-black text-white leading-[1.2] max-w-2xl tracking-tight"
                    style={{
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                    }}
                  >
                    {blog.title}
                  </motion.h1>
                </div>
              </motion.div>
            </section>

            {/* ── Back + Share Row ── */}
            <div className="px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
              <Link
                href="/blogpage/bloghero"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-black hover:text-gray-400 transition-colors group"
              >
                <ArrowLeft
                  size={15}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Back to Blog
              </Link>

              {/* WhatsApp Enquiry Button */}
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-md underline font-extrabold  text-green-600 hover:text-green-700 transition-colors"
              >
                Enquiry on WhatsApp
              </a>
            </div>

            {/* ── Body: TOC + Content ── */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20 text-black text-justify">
              <div className="flex gap-10 items-start">
                {/* Table of Contents — sticky sidebar */}
                {blog.headings.length > 0 && (
                  <aside className="hidden xl:block w-44 shrink-0 sticky top-24 self-start">
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-black mb-3">
                      In this article
                    </p>
                    <ul className="space-y-0">
                      {blog.headings.map((h, i) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={`
                              block text-[12px] leading-relaxed py-[5px] border-l-2 transition-all
                              ${h.level === 3 ? "pl-4" : "pl-3"}
                              ${
                                i === 0
                                  ? "border-gray-900 text-gray-900 font-medium"
                                  : "border-gray-100 text-black hover:text-gray-700 hover:border-gray-300"
                              }
                            `}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {/* Article Content */}
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="flex-1 min-w-0"
                >
                  <article
                    className="
                      prose prose-lg max-w-none
                      prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                      prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4 prose-h2:[font-family:'Playfair_Display',Georgia,serif]
                      prose-h3:text-[17px] prose-h3:mt-7 prose-h3:mb-3 prose-h3:font-semibold
                      prose-p:text-gray-500 prose-p:leading-[1.8] prose-p:mb-5 prose-p:text-[15px]
                      prose-a:text-gray-900 prose-a:font-medium prose-a:underline prose-a:decoration-gray-300 hover:prose-a:decoration-gray-600
                      prose-img:rounded-2xl prose-img:w-full prose-img:my-8
                      prose-strong:text-gray-800 prose-strong:font-semibold
                      prose-ul:text-gray-500 prose-ol:text-gray-500
                      prose-li:mb-1 prose-li:text-[15px]
                      prose-blockquote:border-l-[3px] prose-blockquote:border-amber-400
                      prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-xl
                      prose-blockquote:py-4 prose-blockquote:px-5 prose-blockquote:my-6
                      prose-blockquote:text-gray-600 prose-blockquote:not-italic prose-blockquote:text-[15px]
                      prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px]
                      prose-pre:bg-gray-950 prose-pre:rounded-2xl prose-pre:text-[13px]
                    "
                    dangerouslySetInnerHTML={{ __html: blog.contentWithIds }}
                  />

                  {/* Article footer */}
                  <div className="mt-12 pt-7 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[13px] font-medium text-gray-500">
                        ET
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-gray-800">
                          Editorial Team
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Published {blog.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
