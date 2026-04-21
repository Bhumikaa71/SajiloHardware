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
  User,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("sh-token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedToken) setToken(storedToken);

    const handleStorage = () => {
      setToken(localStorage.getItem("sh-token"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const categories = [
    {
      name: "Power Tools",
      icon: <Zap size={18} />,
      items: ["Drills", "Angle Grinders", "Circular Saws", "Impact Drivers"],
    },
    {
      name: "Hand Tools",
      icon: <Hammer size={18} />,
      items: ["Wrenches", "Pliers", "Screwdrivers", "Measuring Tapes"],
    },
    {
      name: "Plumbing",
      icon: <Droplets size={18} />,
      items: ["PVC Pipes", "CPVC Fittings", "Faucets", "Water Pumps"],
    },
    {
      name: "Electrical",
      icon: <Lightbulb size={18} />,
      items: ["MCBs", "LED Bulbs", "Modular Switches", "Wires"],
    },
    {
      name: "Safety Gear",
      icon: <ShieldCheck size={18} />,
      items: ["Helmets", "Gloves", "Safety Shoes", "Vests"],
    },
  ];

  const profileRef = React.useRef<HTMLDivElement>(null);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-500 bg-white">
      {/* ================= TOP HEADER ================= */}
      <div
        className={`bg-white border-b border-gray-100 transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0 -mt-20" : "max-h-40 opacity-100"
        }`}
      >
        {/* ---- MOBILE TOP BAR ---- */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3 gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl text-primarys transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Logo centered */}
          <Link href="/" className="flex-1 flex justify-center">
            <div className="relative h-9 w-32">
              <Image
                src="/images/logo.png"
                alt="Sajilo Hardware Logo"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </Link>

          {/* Icon actions */}
          <div className="flex items-center gap-1">
            <Link href="/addtocart">
              <button className="relative p-2 text-primarys">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-primarys text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            <Link href="/wishlistpage">
              <button className="relative p-2 text-primarys">
                <Heart size={22} />
                <span className="absolute top-0.5 right-0.5 bg-primarys text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">
                  {wishlist.length}
                </span>
              </button>
            </Link>

            <Link href={token ? "/profile" : "/login"}>
              <button className="p-2 text-primarys">
                <User size={22} />
              </button>
            </Link>
          </div>
        </div>

        {/* ---- MOBILE SEARCH BAR ---- */}
        <div className="flex lg:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for tools, hardware..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-4 pr-10 text-sm focus:bg-white focus:border-primarys focus:ring-2 focus:ring-orange-50 outline-none transition-all text-texts-dark"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primarys">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* ---- DESKTOP TOP BAR ---- */}
        <div className="hidden lg:flex mx-auto max-w-7xl px-4 lg:px-8 items-center justify-between gap-4 lg:gap-8 py-3">
          {/* LOGO ONLY */}
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

          {/* SEARCH */}
          <div className="flex grow max-w-xl">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search for tools, hardware..."
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-2.5 pl-6 pr-14 focus:bg-white focus:border-primarys focus:ring-4 focus:ring-orange-50 transition-all outline-none text-texts-dark"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primarys text-white p-2 rounded-xl">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* WhatsApp */}
            <Link href="https://wa.me/9800000000">
              <div className="flex items-center gap-2 bg-[#25D366] text-white p-2.5 md:px-5 md:py-2.5 rounded-2xl">
                <MessageCircle size={22} fill="white" />
                <span className="hidden md:inline font-bold text-sm">
                  WhatsApp
                </span>
              </div>
            </Link>

            {/* Cart */}
            <Link href="/addtocart">
              <button className="relative p-2.5 text-primarys">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primarys text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlistpage">
              <button className="relative p-2.5 text-primarys">
                <Heart size={24} />
                <span className="absolute top-1 right-1 bg-primarys text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                  {wishlist.length}
                </span>
              </button>
            </Link>

            {/* PROFILE DROPDOWN — hover triggered */}
            <div
              className="relative"
              ref={profileRef}
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button className="p-2 text-primarys">
                <User size={22} />
              </button>

              {/* Invisible bridge fills the gap so mouse doesn't leave the zone */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full w-56 pt-2 z-50">
                  <div className="bg-white shadow-xl rounded-lg border border-gray-200 py-2">
                    {!token ? (
                      <Link
                        href="/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          My Profile
                        </Link>

                        <Link
                          href="/orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          My Orders
                        </Link>

                        <button
                          onClick={() => {
                            localStorage.removeItem("sh-token");
                            setToken(null);
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV (desktop only) ================= */}
      <div
        className={`hidden lg:block bg-primarys text-white shadow-lg transition-all duration-300 ${
          scrolled ? "h-16" : "h-14"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between h-full px-8">
          {/* CATEGORY MENU */}
          <div
            className="relative h-full"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="bg-black/10 text-white px-8 h-full flex items-center gap-4 font-black text-sm tracking-wider">
              <Menu size={20} />
              ALL CATEGORIES
              <ChevronDown size={16} />
            </button>

            {isCategoriesOpen && (
              <div className="absolute top-full left-0 w-80 bg-white text-texts-dark shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-b-3xl py-4 border-x border-b border-gray-100">
                {categories.map((cat, idx) => (
                  <div key={idx} className="group/item px-4 relative">
                    <Link href="/category">
                      <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-primarys hover:text-white transition-all cursor-pointer">
                        <div className="flex items-center gap-4 font-bold">
                          <span className="text-primarys group-hover/item:text-white transition-colors">
                            {cat.icon}
                          </span>
                          {cat.name}
                        </div>
                        <ChevronRight size={16} />
                      </div>
                    </Link>

                    <div className="invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 absolute left-[95%] top-0 w-64 bg-white shadow-2xl rounded-3xl py-6 border border-gray-100 transition-all duration-300">
                      {cat.items.map((sub, i) => (
                        <Link key={i} href="/category/subcategory">
                          <span className="block px-8 py-2 text-sm text-texts-dark hover:text-primarys hover:pl-10 transition-all font-medium border-l-4 border-transparent hover:border-primarys">
                            {sub}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NAV LINKS */}
          <div className="flex items-center h-full ml-4">
            <Link href="/" className="px-5">
              HOME
            </Link>
            <Link href="/aboutpage" className="px-5">
              ABOUT
            </Link>
            <Link href="/shop" className="px-5">
              SHOP
            </Link>
            <Link href="/blogpage/bloghero" className="px-5">
              BLOG
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <Link
              href="/hot-deals"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl text-xs font-black tracking-widest"
            >
              <Flame size={16} className="text-yellow-300" /> HOT DEALS
            </Link>
            <Link
              href="/checkout"
              className="flex items-center gap-2 bg-white text-primarys px-6 py-2 rounded-xl text-xs font-black tracking-widest shadow-lg"
            >
              <CreditCard size={16} /> BUY NOW
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[82%] max-w-xs bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-primarys shrink-0">
            <div>
              <p className="text-white font-black text-sm tracking-widest">
                MENU
              </p>
              <p className="text-orange-200 text-[10px] mt-0.5">
                Sajilo Hardware
              </p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            {/* Quick Links Grid */}
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                { label: "Home", href: "/", Icon: Home },
                { label: "About", href: "/aboutpage", Icon: Info },
                { label: "Shop", href: "/shop", Icon: ShoppingBag },
                { label: "Blog", href: "/blogpage/bloghero", Icon: BookOpen },
              ].map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-orange-50 rounded-xl text-sm font-semibold text-gray-700 hover:text-primarys transition-colors border border-transparent hover:border-orange-100"
                >
                  <Icon size={14} className="text-primarys shrink-0" />
                  {label}
                </Link>
              ))}

              {/* Buy Now — full width */}
              <Link
                href="/checkout"
                onClick={() => setIsMobileMenuOpen(false)}
                className="col-span-2 flex items-center justify-center gap-2 p-3 bg-primarys hover:bg-orange-600 text-white rounded-xl text-sm font-bold tracking-wide transition-colors"
              >
                <CreditCard size={14} /> BUY NOW
              </Link>

              {/* WhatsApp — full width */}
              <Link
                href="https://wa.me/9800000000"
                className="col-span-2 flex items-center justify-center gap-2 p-3 bg-[#25D366] hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-colors"
              >
                <MessageCircle size={14} fill="white" /> WhatsApp Us
              </Link>
            </div>

            {/* Divider + Categories label */}
            <div className="px-4 pb-4">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-2 px-1">
                CATEGORIES
              </p>

              <div className="flex flex-col gap-1.5">
                {categories.map((cat, i) => (
                  <details key={i} className="group">
                    <summary className="list-none flex items-center justify-between px-3 py-3 rounded-xl hover:bg-orange-50 cursor-pointer transition-colors border border-transparent hover:border-orange-100">
                      <div className="flex items-center gap-3 font-semibold text-sm text-gray-700">
                        <span className="text-primarys">{cat.icon}</span>
                        {cat.name}
                      </div>
                      <ChevronDown
                        size={15}
                        className="text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0"
                      />
                    </summary>

                    <div className="mt-1 ml-9 pl-3 border-l-2 border-orange-100 flex flex-col gap-2 pb-2">
                      {cat.items.map((sub, j) => (
                        <Link
                          key={j}
                          href="/subcategory"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-gray-600 hover:text-primarys font-medium transition-colors py-0.5"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
