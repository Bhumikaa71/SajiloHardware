"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Clock, Search, ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      category: "DIY Guide",
      title: "10 Essential Tools Every Nepali Homeowner Should Own",
      excerpt: "From basic repairs to major renovations, having these tools in your kit will save you time and money during emergencies.",
      author: "Sajilo Expert",
      date: "April 12, 2026",
      readTime: "5 min read",
      image: "/images/1.jpg",
    },
    {
      id: 2,
      category: "Maintenance",
      title: "How to Protect Your Power Tools from Monsoon Humidity",
      excerpt: "Humidity can ruin your expensive machinery. Learn the best ways to store and maintain your tools during the rainy season.",
      author: "Technical Team",
      date: "April 10, 2026",
      readTime: "4 min read",
      image: "/images/2.jpg",
    },
    {
      id: 3,
      category: "Innovation",
      title: "Why Brushless Motors are Changing the Hardware Industry",
      excerpt: "Discover the science behind brushless technology and why your next drill should definitely have it for longer life.",
      author: "Admin",
      date: "April 05, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-primarys selection:text-white">
      <Navbar />

      {/* Main Wrapper */}
      <main className="mx-auto max-w-7xl">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full h-137.5 flex items-center overflow-hidden bg-texts-dark rounded-b-[4rem]">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2000&auto=format&fit=crop" 
              alt="Hardware"
              fill
              className="object-cover opacity-30 grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-texts-dark via-texts-dark/80 to-transparent" />
          </div>

          <div className="relative z-10 px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
                <span className="bg-primarys h-1 w-12 rounded-full" />
                <span className="text-white font-black text-xs tracking-[0.4em] uppercase">Sajilo Insights</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6">
                Master Your <span className="text-primarys italic">Hardware</span> <br /> 
                Like a Professional
              </h1>
              
              <p className="text-white/60 text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed">
                Expert advice, industrial guides, and maintenance tips to help you build Nepal’s future.
              </p>

              <div className="flex items-center gap-4 text-white/40 text-[10px] font-black tracking-widest uppercase">
                <Link href="/">HOME</Link>
                <ChevronRight size={14} className="text-primarys" />
                <span className="text-white">BLOG JOURNAL</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED POST ================= */}
        <section className="relative z-20 -mt-20 px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col lg:flex-row min-h-125 border border-gray-100">
            <div className="relative lg:w-1/2 min-h-87.5">
              <Image 
                src={blogs[0].image} 
                alt={blogs[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute top-8 left-8">
                 <span className="bg-primarys text-white text-[10px] font-black px-5 py-2.5 rounded-full tracking-[0.2em] uppercase shadow-xl">
                   FEATURED ARTICLE
                 </span>
              </div>
            </div>

            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-4 text-[10px] font-black text-primarys uppercase tracking-widest mb-6">
                 <span className="flex items-center gap-1.5"><Calendar size={14} /> {blogs[0].date}</span>
                 <span className="flex items-center gap-1.5"><Clock size={14} /> {blogs[0].readTime}</span>
              </div>

              <h2 className="text-4xl font-black text-texts-dark leading-tight mb-6 hover:text-primarys transition-colors cursor-pointer">
                {blogs[0].title}
              </h2>

              <p className="text-texts-secondary text-lg leading-relaxed mb-10 opacity-80">
                {blogs[0].excerpt}
              </p>

              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primarys">
                    <User size={20} />
                  </div>
                  <span className="text-sm font-black text-texts-dark tracking-wider uppercase">{blogs[0].author}</span>
                </div>
                
                <Link
                  href={`/blog/${blogs[0].id}`}
                  className="flex items-center gap-3 bg-primarys text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest hover:bg-texts-dark hover:-translate-y-1 transition-all shadow-lg"
                >
                  READ STORY <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BLOG GRID ================= */}
        <section className="py-32 px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
             <h3 className="text-3xl font-black text-texts-dark tracking-tight">Recent <span className="text-primarys underline decoration-gray-200">Articles</span></h3>
             <div className="h-px grow mx-10 bg-gray-100 hidden md:block" />
             <div className="flex gap-2">
                <button className="p-3 rounded-xl border-2 border-gray-100 hover:border-primarys transition-colors"><Search size={20}/></button>
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((post) => (
              <article key={post.id} className="group flex flex-col">
                <div className="relative h-72 w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-texts-dark text-[9px] font-black px-4 py-2 rounded-xl tracking-widest uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-texts-secondary uppercase tracking-widest mb-4">
                    <span className="text-primarys">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{post.readTime}</span>
                  </div>

                  <h4 className="text-2xl font-black text-texts-dark leading-tight mb-4 group-hover:text-primarys transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h4>

                  <p className="text-texts-secondary text-sm leading-relaxed line-clamp-2 mb-6 opacity-70">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-texts-dark group-hover:text-primarys transition-colors"
                  >
                    CONTINUE READING <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="pb-32 px-6 lg:px-8">
          <div className="relative bg-texts-dark rounded-[4rem] p-10 md:p-20 overflow-hidden text-center lg:text-left">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Join the <span className="text-primarys italic">Pro-Builder</span> List.
                </h3>
                <p className="text-white/50 text-lg font-medium">
                  Get weekly tool comparisons, DIY hacks, and exclusive Sajilo discounts directly in your inbox.
                </p>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/20 px-8 py-5 rounded-4xl text-white w-full lg:w-80 outline-none focus:border-primarys transition-all font-bold"
                />
                <button className="bg-primarys text-white px-10 py-5 rounded-4xl font-black text-xs tracking-widest hover:bg-white hover:text-primarys transition-all shadow-xl active:scale-95">
                  SUBSCRIBE NOW
                </button>
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primarys/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primarys/5 rounded-full blur-[100px]" />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;