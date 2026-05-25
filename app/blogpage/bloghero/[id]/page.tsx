/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Share2,
  Link2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useGetBlogByIdQuery, useGetAllBlogsQuery } from "@/services/blogApi";

// ⭐ KEY: Import the BlockNote-specific blog styles
import "./blocknote-blog.css";
import ShareButton from "@/components/ShareButton";

export const dynamic = "force-static";

// ─── Helpers ────────────────────────────────────────────────────────────────

const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

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
  "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1200&auto=format&fit=crop";

// ─── BlockNote-aware heading extraction ──────────────────────────────────────
// BlockNote wraps headings: <div data-content-type="heading" data-level="2"><h2 class="bn-inline-content">...</h2>

const extractHeadings = (html: string): { id: string; text: string; level: number }[] => {
  // Try BlockNote format first
  const bnMatches = [
    ...html.matchAll(/data-content-type="heading"[^>]*data-level="([1-3])"[^>]*>.*?<(?:h[1-3])[^>]*>(.*?)<\/h[1-3]>/gi),
  ];
  if (bnMatches.length > 0) {
    return bnMatches.map((m, i) => ({
      id: `heading-${i}`,
      text: m[2].replace(/<[^>]*>/g, ""),
      level: parseInt(m[1]),
    }));
  }
  // Fallback: plain HTML headings
  const matches = [...html.matchAll(/<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi)];
  return matches.map((m, i) => ({
    id: `heading-${i}`,
    text: m[2].replace(/<[^>]*>/g, ""),
    level: parseInt(m[1]),
  }));
};

const injectHeadingIds = (html: string): string => {
  let idx = 0;
  // Inject IDs into BlockNote heading wrappers
  return html.replace(
    /(<div[^>]*data-content-type="heading"[^>]*>)/gi,
    (match) => match.replace(/>$/, ` id="heading-${idx++}">`)
  );
};

// ─── Reading Progress Bar ────────────────────────────────────────────────────

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-orange-500 z-50"
    />
  );
};


// ─── Active TOC Hook ──────────────────────────────────────────────────────────

const useActiveHeading = (headings: { id: string }[]) => {
  const [activeId, setActiveId] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "0px 0px -65% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);
  return activeId;
};

// ─── Related Card ─────────────────────────────────────────────────────────────

const RelatedCard = ({ post, index }: { post: any; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.45 }}
    whileHover={{ y: -3 }}
    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
  >
    <Link href={`/blogpage/bloghero/${post.id}`} className="block">

      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <img
          src={post.image} alt={post.title}
          className="object-cover fill group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
          <Calendar size={9} /><span>{post.date}</span>
          <span className="text-gray-200">·</span>
          <Clock size={9} /><span>{post.readTime}</span>
        </div>
        <h4 className="text-[14px] font-bold text-gray-900 leading-snug mb-4 line-clamp-2 group-hover:text-orange-600 transition-colors" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
          {post.title}
        </h4>
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-500 hover:text-orange-700 transition-colors">
          Read more <ArrowRight size={11} />
        </p>
      </div>
    </Link>
  </motion.article>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const BlogDetailSkeleton = () => (
  <div className="animate-pulse max-w-4xl mx-auto">
    <div className="h-3 bg-gray-100 rounded-full w-48 mb-8" />
    <div className="h-10 bg-gray-100 rounded-xl w-3/4 mb-3" />
    <div className="h-10 bg-gray-100 rounded-xl w-1/2 mb-8" />
    <div className="h-[420px] bg-gray-100 rounded-2xl mb-12" />
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-3.5 bg-gray-100 rounded-full w-full mb-4" />
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BlogDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef(null);

  const { data: blogData, isLoading, isError } = useGetBlogByIdQuery(id);
  const { data: allBlogsData } = useGetAllBlogsQuery();

  const blog = blogData?.blog
    ? {
      id: blogData.blog._id,
      title: blogData.blog.title,
      content: blogData.blog.content,
      date: formatDate(blogData.blog.createdAt),
      readTime: estimateReadTime(blogData.blog.content),
      image: blogData.blog?.image || extractFirstImage(blogData.blog.content) || FALLBACK_IMAGE,
      headings: extractHeadings(blogData.blog.content),
      contentWithIds: injectHeadingIds(blogData.blog.content),
    }
    : null;

  const activeHeading = useActiveHeading(blog?.headings ?? []);

  const relatedBlogs = (allBlogsData?.blogs ?? [])
    .filter((b: any) => b._id !== id)
    .slice(0, 3)
    .map((b: any) => ({
      id: b._id,
      title: b.title,
      date: formatDate(b.createdAt),
      readTime: estimateReadTime(b.content),
      image: b?.image || extractFirstImage(b.content),
    }));

  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Enquiry about: ${blog?.title}  \n\nLink: ${process.env.NEXT_PUBLIC_BASE_URL}/blogpage/bloghero/${blog?.id}`
  )}`;

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* <div className="mt-5"></div> */}
      <ReadingProgressBar />
      <Navbar />

      <main>
        {isLoading && (
          <div className="px-4 sm:px-8 pt-32 pb-20 max-w-6xl mx-auto">
            <BlogDetailSkeleton />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-40 text-center px-4">
            <BookOpen size={32} className="text-gray-200 mb-5" />
            <p className="text-gray-400 text-[15px] mb-6">Couldn't load this article. Please try again.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-full transition-colors">
              <ArrowLeft size={13} /> Back to Blog
            </Link>
          </div>
        )}

        {blog && (
          <>
            {/* ════════ HEADER — white, clean ════════ */}
            <div className="bg-white border-b border-gray-100">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-42 pb-10">

                {/* Breadcrumb */}
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 mb-7"
                >
                  <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
                  <ChevronRight size={10} className="text-gray-300" />
                  <Link href="/blogpage/bloghero" className="hover:text-gray-700 transition-colors">Blog</Link>
                  <ChevronRight size={10} className="text-gray-300" />
                  <span className="text-gray-300 truncate max-w-[200px]">{blog.title}</span>
                </motion.nav>

                {/* Orange pill */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-5">
                    <BookOpen size={10} /> Article
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[1.95rem] sm:text-[2.5rem] md:text-[2.85rem] font-black text-gray-950 leading-[1.17] tracking-tight mb-8"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {blog.title}
                </motion.h1>

                {/* Author + actions row */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[11px] font-black text-orange-600">
                      ET
                    </div>
                    <div>
                      <p className="text-[12.5px] font-bold text-gray-800 leading-none mb-1">Editorial Team</p>
                      <div className="flex items-center gap-3 text-[10.5px] text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={9.5} /> {blog.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock size={9.5} /> {blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] font-bold text-white bg-[#25D366] hover:bg-[#1ab956] px-4 py-2 rounded-full transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Enquiry
                    </a>
                    <ShareButton title={blog.title} id={blog.id} />
                  </div>
                </motion.div>
              </div>

              {/* Hero image — below header text, rounded top, no overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                {blog?.image ? (
                  <div className="relative w-full overflow-hidden rounded-t-2xl aspect-[21/9]">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 animate-pulse" style={{ aspectRatio: "21/9" }} />
                )}
              </motion.div>
            </div>

            {/* ════════ CONTENT ════════ */}
            <div className="bg-gray-50 pb-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-10 items-start">

                  {/* TOC Sidebar */}
                  {blog.headings.length > 0 && (
                    <aside className="hidden xl:block w-52 shrink-0 sticky top-24 self-start pt-10">
                      <p className="text-[9px] font-black tracking-[0.2em] uppercase text-gray-400 mb-4">
                        In this article
                      </p>
                      <ul className="space-y-0">
                        {blog.headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={`
                                block text-[11.5px] leading-relaxed py-[5px] border-l-2 transition-all duration-200
                                ${h.level === 3 ? "pl-5" : "pl-3.5"}
                                ${activeHeading === h.id
                                  ? "border-orange-500 text-orange-600 font-semibold"
                                  : "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400"
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

                  {/* Article white card */}
                  <motion.div
                    ref={contentRef}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex-1 min-w-0"
                  >
                    <div className="bg-white rounded-b-2xl border border-t-0 border-gray-100 shadow-sm px-8 sm:px-12 pt-10 pb-12">

                      {/*
                        ⭐ NO 'prose' class here — blocknote-blog.css handles all styling
                           via .bn-block-group, .bn-block-content, .bn-inline-content, etc.
                      */}
                      <div
                        className="blocknote-content"
                        dangerouslySetInnerHTML={{ __html: blog.contentWithIds }}
                      />

                      {/* Footer */}
                      <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[12px] font-black text-orange-600">
                            ET
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-gray-800">Editorial Team</p>
                            <p className="text-[11px] text-gray-400">Published {blog.date}</p>
                          </div>
                        </div>
                        <ShareButton title={blog.title} id={blog.id} />
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        href="/blogpage/bloghero"
                        className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-colors group"
                      >
                        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                        All Articles
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ════════ RELATED ARTICLES ════════ */}
            {relatedBlogs.length > 0 && (
              <section ref={relatedRef} className="bg-white border-t border-gray-100 py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-end justify-between mb-10">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-orange-500 mb-2">Keep reading</p>
                      <h2 className="text-2xl sm:text-3xl font-black text-gray-900" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
                        Related Articles
                      </h2>
                    </div>
                    <Link href="/blogpage/bloghero" className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors">
                      View all <ArrowRight size={11} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedBlogs.map((post: any, i: number) => (
                      <RelatedCard key={post.id} post={post} index={i} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;