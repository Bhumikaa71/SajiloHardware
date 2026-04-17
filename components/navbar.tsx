/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Search,
  Menu,
  X,
  ChevronDown,
  Zap,
  Hammer,
  Droplets,
  Lightbulb,
  ShieldCheck,
  Flame,
  Home,
  ChevronRight,
  BookOpen,
  ShoppingBag,
  CreditCard,
  Info,
  ShoppingCart,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      name: "Power Tools",
      href: "/category",
      icon: <Zap size={18} />,
      items: [
        { name: "Drills", href: "/category/subcategory" },
        { name: "Angle Grinders", href: "/category/subcategory" },
        { name: "Circular Saws", href: "/category/subcategory" },
        { name: "Impact Drivers", href: "/category/subcategory" },
      ],
    },
    {
      name: "Hand Tools",
      href: "/category",
      icon: <Hammer size={18} />,
      items: [
        { name: "Wrenches", href: "/category/subcategory" },
        { name: "Pliers", href: "/category/subcategory" },
        { name: "Screwdrivers", href: "/category/subcategory" },
        { name: "Measuring Tapes", href: "/category/subcategory" },
      ],
    },
    {
      name: "Plumbing",
      href: "/category",
      icon: <Droplets size={18} />,
      items: [
        { name: "PVC Pipes", href: "/category/subcategory" },
        { name: "CPVC Fittings", href: "/category/subcategory" },
        { name: "Faucets", href: "/category/subcategory" },
        { name: "Water Pumps", href: "/category/subcategory" },
      ],
    },
    {
      name: "Electrical",
      href: "/category",
      icon: <Lightbulb size={18} />,
      items: [
        { name: "MCBs", href: "/category/subcategory" },
        { name: "LED Bulbs", href: "/category/subcategory" },
        { name: "Modular Switches", href: "/category/subcategory" },
        { name: "Wires", href: "/category/subcategory" },
      ],
    },
    {
      name: "Safety Gear",
      href: "/category",
      icon: <ShieldCheck size={18} />,
      items: [
        { name: "Helmets", href: "/category/subcategory" },
        { name: "Gloves", href: "/category/subcategory" },
        { name: "Safety Shoes", href: "/category/subcategory" },
        { name: "Vests", href: "/category/subcategory" },
      ],
    },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* TOP HEADER */}
      <div
        className={`bg-white border-b border-gray-100 transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0 -mt-20" : "max-h-25 opacity-100 py-3"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
          >
            <Menu size={28} />
          </button>

          <Link href="/" className="shrink-0 flex items-center">
            <div className="relative h-10 w-32 md:h-14 md:w-48">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex grow max-w-xl">
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full bg-gray-50 border rounded-2xl py-2.5 px-6"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://wa.me/9800000000"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-2xl"
            >
              <MessageCircle size={22} />
              WhatsApp
            </Link>

            <Link href="/addtocart">
              <button className="relative p-2.5 text-primarys">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primarys text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            <Link href="/wishlistpage">
              <button className="relative p-2.5 text-primarys">
                <Heart size={24} />
                <span className="absolute top-1 right-1 bg-primarys text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="hidden lg:block bg-primarys text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-8">
          <div className="flex items-center">
            {/* Categories */}
            <div
              className="relative h-full"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="bg-black/10 px-6 h-full flex items-center gap-3 font-bold">
                <Menu size={18} />
                ALL CATEGORIES
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Nav links */}
            <NavItem label="HOME" href="/" icon={<Home size={16} />} />
            <NavItem
              label="ABOUT"
              href="/aboutpage"
              icon={<Info size={16} />}
            />
            <NavItem
              label="SHOP"
              href="/shop"
              icon={<ShoppingBag size={16} />}
            />
            <NavItem
              label="BLOG"
              href="/blogpage/bloghero"
              icon={<BookOpen size={16} />}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* ✅ FIXED HOT DEALS */}
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl text-xs font-bold"
            >
              <Flame size={16} className="text-yellow-300 animate-pulse" />
              HOT DEALS
            </Link>

            <Link
              href="/addtocart"
              className="bg-white text-primarys px-6 py-2 rounded-xl font-bold"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label, href, icon }: any) => (
  <Link href={href} className="px-5 h-full flex items-center gap-2">
    {icon}
    {label}
  </Link>
);

export default Navbar;
