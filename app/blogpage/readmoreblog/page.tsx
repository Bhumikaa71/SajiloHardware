"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Wrench, 
  ShieldCheck, 
  Lightbulb,
  Share2,
  Bookmark,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const ReadMoreBlog = () => {
  const [completion, setCompletion] = useState(0);

  // Reading progress bar logic
  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans selection:bg-primarys selection:text-white">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-primarys z-100 transition-all duration-150" 
        style={{ width: `${completion}%` }}
      />
      
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar: Social & Actions (Sticky) */}
        <aside className="hidden lg:flex lg:col-span-1 flex-col items-center gap-6 sticky top-32 h-fit">
          <button className="p-3 rounded-full bg-white  text-black shadow-sm border border-gray-100 hover:text-primarys transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-3 rounded-full bg-white text-black shadow-sm border border-gray-100 hover:text-primarys transition-colors">
            <Bookmark size={20} />
          </button>
        </aside>

        {/* Main Content Area */}
        <article className="lg:col-span-8">
          {/* Navigation */}
          <Link 
            href="/blogpage/bloghero" 
            className="group inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primarys transition-all mb-10"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Blog List
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primarys text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                DIY Maintenance
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs font-medium">Home Improvement</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-texts-dark leading-[1.1] mb-8 tracking-tight">
              10 Essential Tools Every <span className="text-primarys underline decoration-primarys/20 underline-offset-8">Nepali Homeowner</span> Should Own
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primarys/10 flex items-center justify-center text-primarys font-bold">S</div>
                <div>
                  <p className="text-sm font-bold text-texts-dark leading-none">Sajilo Technical Team</p>
                  <p className="text-xs text-gray-400 mt-1">Expert Maintenance Guild</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden md:block" />
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Calendar size={14}/> April 27, 2026</span>
                <span className="flex items-center gap-1.5"><Clock size={14}/> 8 min read</span>
              </div>
            </div>
          </header>

          {/* Hero Image with Caption */}
          <figure className="mb-16">
            <div className="relative w-full h-87.5 md:h-137.5 rounded-4xl overflow-hidden shadow-2xl shadow-primarys/5">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2000"
                alt="Hardware Maintenance tools spread on a wooden table"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            <figcaption className="text-center text-sm text-gray-400 mt-4 italic">
              Investing in the right tools today saves expensive repair costs tomorrow.
            </figcaption>
          </figure>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-texts-secondary leading-relaxed space-y-12">
            
            <section>
              <p className="text-2xl font-semibold text-texts-dark leading-snug tracking-tight">
                Owning a home in Nepal brings unique challenges—from fixing rooftop water tanks to managing wall dampness during the monsoon.
              </p>
              <p className="mt-6">
                In our local context, a basic toolkit is not just a hobby; it’s a necessity for survival and financial savings. Here is our curated list of essentials for every Kathmandu household.
              </p>
            </section>

            {/* Tool 01 */}
            <section className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-primarys/20 transition-all shadow-sm">
              <div className="flex items-start gap-5">
                <span className="text-5xl font-black text-primarys/10 group-hover:text-primarys/20 transition-colors">01</span>
                <div>
                  <h2 className="text-2xl font-black text-texts-dark flex items-center gap-3 mb-4">
                    <Wrench className="text-primarys" /> Plumbing & Leak Control
                  </h2>
                  <p className="text-gray-600">
                    In Nepal, plumbing issues are the #1 reason people call technicians. You can save thousands by keeping an <strong>Adjustable Wrench (Bhote Paana)</strong> and a roll of <strong>Teflon Tape</strong>. Most tap leaks are simply due to worn-out threads or loose connections that take 2 minutes to fix.
                  </p>
                </div>
              </div>
            </section>

            {/* Tool 02 */}
            <section className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-primarys/20 transition-all shadow-sm">
              <div className="flex items-start gap-5">
                <span className="text-5xl font-black text-primarys/10 group-hover:text-primarys/20 transition-colors">02</span>
                <div>
                  <h2 className="text-2xl font-black text-texts-dark flex items-center gap-3 mb-4">
                    <ShieldCheck className="text-primarys" /> Walls and Masonry
                  </h2>
                  <p className="text-gray-600">
                    Because our homes are primarily brick and cement, a standard drill is not enough. Every homeowner should eventually invest in a <strong>Hammer Drill</strong>. Whether you’re hanging a heavy mirror or installing a shelf, the "hammer" function is essential to penetrate local brickwork.
                  </p>
                </div>
              </div>
            </section>

            {/* Pro-Tip Highlight */}
            <div className="bg-texts-dark p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primarys rounded-lg">
                        <Lightbulb size={24} className="text-white" />
                    </div>
                    <h3 className="text-primarys font-black text-xl uppercase tracking-widest">The Sajilo Pro-Tip</h3>
                </div>
                <blockquote className="text-xl text-white/90 leading-relaxed font-medium">
                  "Nepal's humidity can ruin steel tools in one single monsoon season. We highly recommend applying a light coat of WD-40 or coconut oil to metal parts to prevent rust."
                </blockquote>
              </div>
              {/* Abstract Background Shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primarys/20 rounded-full blur-[80px] group-hover:bg-primarys/30 transition-all" />
              <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Tool 03 */}
            <section className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-primarys/20 transition-all shadow-sm">
              <div className="flex items-start gap-5">
                <span className="text-5xl font-black text-primarys/10 group-hover:text-primarys/20 transition-colors">03</span>
                <div>
                  <h2 className="text-2xl font-black text-texts-dark flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-primarys" /> Electrical Safety
                  </h2>
                  <p className="text-gray-600">
                    Always keep a <strong>Digital Multimeter</strong> or a <strong>Tester Pen</strong>. Before touching any switch plate or socket, verify it isn't "live" to ensure your safety. Voltage fluctuations are still a reality in many neighborhoods.
                  </p>
                </div>
              </div>
            </section>

         
          </div>
        </article>

        {/* Right Sidebar: Table of Contents & Related */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 space-y-10">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Table of Contents</h4>
              <nav className="space-y-4">
                {["Plumbing Essentials", "Masonry Tools", "Electrical Safety", "Conclusion"].map((item, i) => (
                  <button key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-primarys transition-colors text-left group">
                    <span className="w-6 h-px bg-gray-200 group-hover:bg-primarys group-hover:w-8 transition-all" />
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 bg-texts-dark rounded-3xl text-white">
                <h4 className="font-bold mb-2">Need a Professional?</h4>
                <p className="text-xs text-white/60 mb-4">If the DIY task is too big, our experts are ready to help.</p>
                <Link href="/booking" className="inline-flex items-center gap-2 text-xs font-black text-primarys hover:gap-3 transition-all uppercase">
                    Book a Service <ChevronRight size={14}/>
                </Link>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default ReadMoreBlog;