"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, Clock, Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useGetAllBlogsQuery } from "@/services/blogApi";

// Helper: strip HTML tags to get plain text excerpt
const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

// Helper: extract first image src from HTML content
const extractFirstImage = (html: string): string | null => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
};

// Helper: format date
const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Helper: estimate read time
const estimateReadTime = (html: string): string => {
  const words = stripHtml(html).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop";

const BlogPage = () => {
  const gridRef = useRef(null);
  // amount: 0 so it triggers as soon as even 1px is visible
  const gridInView = useInView(gridRef, { once: true, amount: 0 });

  const { data: blogsData, isLoading, isError } = useGetAllBlogsQuery();

  const blogs = (blogsData?.blogs ?? []).map((blog: any) => ({
    id: blog._id,
    title: blog.title,
    excerpt: stripHtml(blog.content).slice(0, 120) + "...",
    date: formatDate(blog.createdAt),
    readTime: estimateReadTime(blog.content),
    image: extractFirstImage(blog.content) ?? FALLBACK_IMAGE,
  }));

  const featured = blogs[0];
  const rest = blogs.slice(1); // blogs 2–N shown in Recent Articles

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="mx-auto max-w-7xl">

        {/* ================= HERO ================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-4xl overflow-hidden bg-texts-dark"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2000&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover opacity-30"
              />
            </div>

            <div className="relative z-10 p-8 md:p-16 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="bg-primarys h-1 w-10 rounded-full" />
                <span className="text-white text-xs tracking-widest uppercase">
                  Sajilo Insights
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
              >
                Master Your <span className="text-primarys">Hardware</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm md:text-lg text-white mb-8"
              >
                Expert advice, guides, and maintenance tips for builders.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* ================= LOADING / ERROR ================= */}
        {isLoading && (
          <div className="px-4 sm:px-6 lg:px-8 pb-10 text-center text-texts-secondary animate-pulse">
            Loading articles...
          </div>
        )}
        {isError && (
          <div className="px-4 sm:px-6 lg:px-8 pb-10 text-center text-red-500">
            Failed to load blogs. Please try again later.
          </div>
        )}

        {/* ================= FEATURED ================= */}
        {featured && (
          <section className="px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 bg-white rounded-4xl shadow-xl overflow-hidden border text-gray-400"
            >
              {/* Image */}
              <div className="relative min-h-64 md:min-h-96 h-full w-full overflow-hidden bg-gray-100">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex gap-4 text-xs text-primarys font-bold mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {featured.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black mb-4 text-texts-dark">
                  {featured.title}
                </h2>

                <p className="text-sm text-texts-secondary mb-6">
                  {featured.excerpt}
                </p>

                <Link
                  href={`/blogpage/bloghero/${featured.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primarys hover:gap-4 transition-all"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* ================= RECENT ARTICLES GRID ================= */}
        <section ref={gridRef} className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl md:text-3xl text-texts-dark font-extrabold">
              Recent Articles
            </h3>
            <motion.button
              whileHover={{ rotate: 90 }}
              className="p-2 border rounded-lg hover:border-primarys transition"
            >
              <Search size={18} />
            </motion.button>
          </div>

          {/* Skeleton loaders while fetching */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actual grid — all blogs shown here, featured is separate above */}
          {!isLoading && rest.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"} // fixed: amount:0 ensures this fires
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {rest.map((post: any) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48  w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                      <Clock size={12} /> {post.date} • {post.readTime}
                    </div>

                    <h4 className="text-lg font-bold mb-2 text-texts-dark group-hover:text-primarys transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-sm text-texts-secondary mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blogpage/bloghero/${post.id}`}
                      className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-primarys"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && rest.length === 0 && (
            <p className="text-center text-texts-secondary py-10">
              No recent articles yet.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;