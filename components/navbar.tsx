"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, MessageCircle, Search, Menu, 
  ChevronDown, Zap, Hammer, Droplets, 
  Lightbulb, ShieldCheck, Flame, Home,
  Phone
} from 'lucide-react';

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const categories = [
    { name: "Power Tools", icon: <Zap size={18}/>, items: ["Drills", "Angle Grinders", "Circular Saws", "Impact Drivers"] },
    { name: "Hand Tools", icon: <Hammer size={18}/>, items: ["Wrenches", "Pliers", "Screwdrivers", "Measuring Tapes"] },
    { name: "Plumbing", icon: <Droplets size={18}/>, items: ["PVC Pipes", "CPVC Fittings", "Faucets", "Water Pumps"] },
    { name: "Electrical", icon: <Lightbulb size={18}/>, items: ["MCBs", "LED Bulbs", "Modular Switches", "Wires"] },
    { name: "Safety Gear", icon: <ShieldCheck size={18}/>, items: ["Helmets", "Gloves", "Safety Shoes", "Vests"] },
  ];

  return (
    <header className="w-full shadow-xl sticky top-0 z-50 bg-white">
      {/* --- Top Header (Logo & Search) --- */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-3 flex items-center justify-between gap-6">
        
        {/* Logo Section */}
        <Link href="/" className="shrink-0 group">
          <div className="relative h-14 w-48 transition-transform group-hover:scale-105">
            <Image 
              src="/images/logo.png" 
              alt="Sajilo Hardware Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex grow max-w-xl">
          <div className="relative w-full flex items-center">
            <input 
              type="text" 
              placeholder="Search tools, hardware, equipment..." 
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-2.5 pl-6 pr-14 focus:bg-white focus:border-primarys focus:ring-4 focus:ring-orange-50 transition-all outline-none text-texts-dark"
            />
            <button className="absolute right-1.5 bg-primarys text-white p-2 rounded-xl hover:bg-primarys-dark transition-colors shadow-sm">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Help Contact */}
          <div className="hidden lg:flex items-center gap-2 text-texts-secondary border-r pr-5 border-gray-100">
            <Phone size={18} className="text-primarys" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase opacity-60">Call Support</span>
              <span className="text-xs font-black text-texts-dark">+977-9800000000</span>
            </div>
          </div>

          {/* Wishlist Icon */}
          <button className="relative p-2.5 rounded-xl text-texts-secondary hover:text-red-500 hover:bg-red-50 transition-all">
            <Heart size={24} />
            <span className="absolute top-1 right-1 bg-primarys text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
          </button>

          {/* WhatsApp Button */}
          <Link 
            href="https://wa.me/9800000000" 
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-5 py-2.5 rounded-2xl transition-all shadow-md font-bold text-sm"
          >
            <MessageCircle size={20} fill="white" />
            <span className="hidden xl:inline">WhatsApp</span>
          </Link>
        </div>
      </div>

      {/* --- Main Navigation Bar (Primarys BG) --- */}
      <div className="bg-primarys">
        <div className="mx-auto max-w-7xl flex items-center justify-between h-14 px-4 lg:px-8">
          
          <div className="flex items-center h-full">
              {/* All Categories Dropdown */}
              <div 
                className="relative h-full"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="bg-black/10 text-white px-6 h-full flex items-center gap-4 font-black text-sm tracking-wider hover:bg-black/20 transition-all">
                    <Menu size={20} />
                    ALL CATEGORIES
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Dropdown Menu */}
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white shadow-2xl rounded-b-2xl py-2 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat, idx) => (
                      <div key={idx} className="group/item relative px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center justify-between transition-all">
                        <div className="flex items-center gap-4 text-texts-dark font-bold group-hover/item:text-primarys">
                          <span className="text-texts-secondary group-hover/item:text-primarys">{cat.icon}</span>
                          {cat.name}
                        </div>
                        <ChevronDown size={14} className="-rotate-90 text-gray-300 group-hover/item:text-primarys" />
                        
                        {/* Sub-menu (Side Panel) */}
                        <div className="invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 absolute left-full top-0 w-64 bg-white shadow-2xl rounded-r-2xl py-4 border-l-4 border-primarys min-h-[300px] transition-all duration-200">
                          <div className="px-6 mb-2 text-[10px] font-black text-texts-secondary uppercase tracking-widest">Popular Items</div>
                          {cat.items.map((sub, i) => (
                            <Link key={i} href={`/shop/${sub.toLowerCase().replace(/\s+/g, '-')}`} className="block px-6 py-2.5 text-sm text-texts-dark hover:text-primarys hover:bg-orange-50 transition-all font-medium">
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center h-full ml-2">
                  <NavItem label="HOME" href="/" icon={<Home size={16}/>} />
                  <NavItem label="POWER TOOLS" href="/power-tools" hasSub />
                  <NavItem label="HAND TOOLS" href="/hand-tools" />
                  <NavItem label="PLUMBING" href="/plumbing" />
                  <NavItem label="ELECTRICAL" href="/electrical" />
              </div>
          </div>

          {/* Hot Deals Button */}
          <div className="px-4">
              <Link href="/hot-deals" className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl text-xs font-black tracking-widest flex items-center gap-2 transition-all">
                  <Flame size={16} className="text-yellow-300" />
                  HOT DEALS
              </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Reusable NavItem Component
const NavItem = ({ label, href, icon, hasSub = false }: { label: string, href: string, icon?: React.ReactNode, hasSub?: boolean }) => (
  <div className="relative group px-5 h-full flex items-center cursor-pointer">
    <Link href={href} className="flex items-center gap-2 text-white font-black text-[12px] tracking-widest group-hover:text-orange-100 transition-colors">
      {icon && icon}
      {label}
      {hasSub && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
    </Link>
    {/* Animated Bottom Indicator */}
    <div className="absolute bottom-0 left-5 right-5 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-full" />
    
    {/* Standard Dropdown */}
    {hasSub && (
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full left-0 w-52 bg-white shadow-2xl rounded-b-2xl py-3 border border-gray-100 transition-all duration-200">
        <Link href="#" className="block px-4 py-2.5 text-sm text-texts-dark hover:bg-orange-50 hover:text-primarys font-bold">Latest Arrivals</Link>
        <Link href="#" className="block px-4 py-2.5 text-sm text-texts-dark hover:bg-orange-50 hover:text-primarys font-bold">Best Sellers</Link>
        <Link href="#" className="block px-4 py-2.5 text-sm text-texts-dark hover:bg-orange-50 hover:text-primarys font-bold">Clearance</Link>
      </div>
    )}
  </div>
);

export default Navbar;