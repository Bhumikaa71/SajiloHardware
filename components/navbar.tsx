"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, MessageCircle, Search, Menu, X,
  ChevronDown, Zap, Hammer, Droplets, 
  Lightbulb, ShieldCheck, Flame, Home,
  Phone, ChevronRight
} from 'lucide-react';

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle sticky effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: "Power Tools", icon: <Zap size={18}/>, items: ["Drills", "Angle Grinders", "Circular Saws", "Impact Drivers"] },
    { name: "Hand Tools", icon: <Hammer size={18}/>, items: ["Wrenches", "Pliers", "Screwdrivers", "Measuring Tapes"] },
    { name: "Plumbing", icon: <Droplets size={18}/>, items: ["PVC Pipes", "CPVC Fittings", "Faucets", "Water Pumps"] },
    { name: "Electrical", icon: <Lightbulb size={18}/>, items: ["MCBs", "LED Bulbs", "Modular Switches", "Wires"] },
    { name: "Safety Gear", icon: <ShieldCheck size={18}/>, items: ["Helmets", "Gloves", "Safety Shoes", "Vests"] },
  ];

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-2xl' : 'shadow-md'}`}>
      {/* --- Top Header --- */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-3 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-texts-dark"
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0 group flex items-center">
            <div className="relative h-10 w-32 md:h-14 md:w-48 transition-transform group-hover:scale-105">
              <Image 
                src="/images/logo.png" 
                alt="Sajilo Hardware Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden lg:flex grow max-w-xl">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="Search tools, hardware..." 
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-2.5 pl-6 pr-14 focus:bg-white focus:border-primarys focus:ring-4 focus:ring-orange-50 transition-all outline-none text-texts-dark"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primarys text-white p-2 rounded-xl hover:bg-primarys-dark transition-all hover:rotate-12 shadow-lg shadow-orange-200">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            <Link href="https://wa.me/9800000000" className="flex items-center gap-2 bg-[#25D366] text-white p-2.5 md:px-5 md:py-2.5 rounded-2xl hover:shadow-lg hover:shadow-green-100 transition-all active:scale-95">
              <MessageCircle size={22} fill="white" />
              <span className="hidden md:inline font-bold text-sm">WhatsApp</span>
            </Link>

            <button className="relative p-2.5 rounded-xl text-texts-secondary hover:text-primarys hover:bg-orange-50 transition-all">
              <Heart size={24} />
              <span className="absolute top-1 right-1 bg-primarys text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Desktop Navigation --- */}
      <div className="hidden lg:block bg-primarys">
        <div className="mx-auto max-w-7xl flex items-center justify-between h-14 px-8">
          <div className="flex items-center h-full">
            {/* Attractive Mega Dropdown */}
            <div 
              className="relative h-full"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="bg-black/10 text-white px-8 h-full flex items-center gap-4 font-black text-sm tracking-wider group">
                <Menu size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                ALL CATEGORIES
                <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-b-3xl py-4 border border-white animate-in fade-in slide-in-from-top-4 duration-300">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="group/item px-4 relative">
                      <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-primarys hover:text-white transition-all cursor-pointer">
                        <div className="flex items-center gap-4 font-bold">
                          <span className="text-texts-secondary group-hover/item:text-white transition-colors">{cat.icon}</span>
                          {cat.name}
                        </div>
                        <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                      </div>
                      
                      {/* Floating Sub-menu */}
                      <div className="invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 absolute left-[95%] top-0 w-64 bg-white shadow-2xl rounded-3xl py-6 border border-gray-100 transition-all duration-300 scale-95 group-hover/item:scale-100">
                        <h4 className="px-8 text-[10px] font-black text-primarys uppercase tracking-widest mb-4">Top in {cat.name}</h4>
                        {cat.items.map((sub, i) => (
                          <Link key={i} href="#" className="block px-8 py-2.5 text-sm text-texts-dark hover:text-primarys hover:pl-10 transition-all font-medium border-l-4 border-transparent hover:border-primarys">
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center h-full ml-4">
              <NavItem label="HOME" href="/" />
              <NavItem label="POWER TOOLS" href="/power-tools" hasSub />
              <NavItem label="HAND TOOLS" href="/hand-tools" />
              <NavItem label="PLUMBING" href="/plumbing" />
            </div>
          </div>

          <Link href="/deals" className="flex items-center gap-2 bg-white text-primarys px-5 py-2 rounded-full text-xs font-black hover:bg-primarys-dark hover:text-white transition-all shadow-inner">
            <Flame size={16} /> HOT DEALS
          </Link>
        </div>
      </div>

      {/* --- Mobile Drawer Menu --- */}
      <div className={`fixed inset-0 z-60 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer Content */}
        <div className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primarys text-white">
            <h2 className="font-black tracking-tight">MENU</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-20 p-4">
            <div className="mb-6">
              <h3 className="text-[10px] font-black text-texts-secondary uppercase tracking-widest px-4 mb-2">Categories</h3>
              {categories.map((cat, i) => (
                <details key={i} className="group mb-1">
                  <summary className="list-none flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 cursor-pointer">
                    <div className="flex items-center gap-4 font-bold text-texts-dark">
                      <span className="text-primarys">{cat.icon}</span>
                      {cat.name}
                    </div>
                    <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-14 pr-4 py-2 flex flex-col gap-3 border-l-2 border-orange-100 ml-8">
                    {cat.items.map((sub, j) => (
                      <Link key={j} href="#" className="text-sm text-texts-secondary hover:text-primarys font-medium">{sub}</Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label, href, hasSub = false }: { label: string, href: string, hasSub?: boolean }) => (
  <div className="relative group px-5 h-full flex items-center cursor-pointer">
    <Link href={href} className="text-white font-black text-[12px] tracking-widest flex items-center gap-1 group-hover:opacity-80 transition-opacity">
      {label}
      {hasSub && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
    </Link>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-full" />
    
    {hasSub && (
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full left-0 w-52 bg-white shadow-2xl rounded-b-2xl py-4 border-t-2 border-primarys transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <Link href="#" className="block px-6 py-2.5 text-sm text-texts-dark hover:bg-orange-50 hover:text-primarys font-bold">New Tools</Link>
        <Link href="#" className="block px-6 py-2.5 text-sm text-texts-dark hover:bg-orange-50 hover:text-primarys font-bold">Refurbished</Link>
      </div>
    )}
  </div>
);

export default Navbar;