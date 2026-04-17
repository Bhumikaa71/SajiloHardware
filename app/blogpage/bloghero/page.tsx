"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Clock, Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      category: "DIY Guide",
      title: "10 Essential Tools Every Nepali Homeowner Should Own",
      excerpt:
        "From basic repairs to major renovations, having these tools saves time and money.",
      author: "Sajilo Expert",
      date: "April 12, 2026",
      readTime: "5 min read",
      image: "/images/1.jpg",
    },
    {
      id: 2,
      category: "Maintenance",
      title: "How to Protect Your Power Tools from Monsoon Humidity",
      excerpt:
        "Learn the best ways to protect tools during Nepal’s rainy season.",
      author: "Technical Team",
      date: "April 10, 2026",
      readTime: "4 min read",
      image: "/images/2.jpg",
    },
    {
      id: 3,
      category: "Innovation",
      title: "Why Brushless Motors are Changing the Industry",
      excerpt: "Understand why brushless tools last longer and perform better.",
      author: "Admin",
      date: "April 05, 2026",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl">
        {/* ================= HERO ================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="relative rounded-4xl overflow-hidden bg-texts-dark">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2000&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover opacity-30"
              />
            </div>

            <div className="relative z-10 p-8 md:p-16 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-primarys h-1 w-10 rounded-full" />
                <span className="text-white text-xs tracking-widest uppercase">
                  Sajilo Insights
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Master Your <span className="text-primarys">Hardware</span>
              </h1>

              <p className="text-sm md:text-lg mb-8">
                Expert advice, guides, and maintenance tips for builders.
              </p>
            </div>
          </div>
        </section>

        {/* ================= FEATURED ================= */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-2 bg-white rounded-4xl shadow-xl overflow-hidden border text-gray-400">
            {/* Image */}
            <div className="relative h-64 md:h-96">
              <Image
                src={blogs[0].image}
                alt={blogs[0].title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="flex gap-4 text-xs text-primarys font-bold mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {blogs[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {blogs[0].readTime}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-4">
                {blogs[0].title}
              </h2>

              <p className="text-sm text-texts-secondary mb-6">
                {blogs[0].excerpt}
              </p>

              <Link
                href={`/blog/${blogs[0].id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-primarys hover:gap-3 transition-all"
              >
                Read More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= GRID ================= */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl md:text-3xl text-gray-400 font-extrabold">
              Recent Articles
            </h3>

            <button className="p-2 border rounded-lg hover:border-primarys transition">
              <Search size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                  />
                </div>

                <div className="p-5">
                  <div className="text-xs text-gray-600 mb-2">
                    {post.date} • {post.readTime}
                  </div>

                  <h4 className="text-lg font-bold mb-2 text-gray-400 group-hover:text-primarys transition">
                    {post.title}
                  </h4>

                  <p className="text-sm text-texts-secondary mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition text-primarys"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-texts-dark rounded-4xl p-8 md:p-14 text-center text-white">
            <h3 className="text-2xl md:text-4xl font-black mb-4">
              Join Our Newsletter
            </h3>

            <p className="text-white/60 mb-6 text-sm md:text-base">
              Get tips, guides, and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl text-white w-full sm:w-80 outline-2"
              />

              <button className="bg-primarys px-6 py-3 rounded-xl text-xs font-bold hover:bg-white hover:text-primarys transition">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
