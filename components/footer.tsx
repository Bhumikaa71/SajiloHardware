"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Flame,
  ShoppingBag,
  ShieldCheck,
  Globe,
  Star,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { PiTiktokLogoBold } from "react-icons/pi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 font-sans">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* --- Top Row: Bento Style Highlights --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Brand Info Card */}
          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm md:col-span-1 space-y-6">
            <div className="relative h-12 w-40">
              <Image
                src="/images/logo.png"
                alt="Sajilo Hardware"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-texts-secondary text-sm leading-relaxed font-medium">
              The most trusted hardware partner in Nepal. Providing professional
              tools for contractors and DIY enthusiasts since 2075 BS.
            </p>
            <div className="flex gap-3">
              <SocialBtn icon={<FaFacebookF size={18} />} />
              <SocialBtn icon={<FaYoutube size={18} />} />
              <SocialBtn icon={<FaInstagramSquare size={18} />} />
              <SocialBtn icon={<PiTiktokLogoBold size={18} />} />
            </div>
          </div>

          {/* Quick Shop Grid Card */}
          <div className="bg-texts-dark p-8 rounded-4xl md:col-span-2 text-white overflow-hidden relative group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-black mb-2 italic shiny-phrase">
                  BUILT TO LAST, PRICED TO BUILD.
                </h3>
                <p className="text-white/60 text-sm font-bold tracking-widest uppercase">
                  Visit our digital showroom for exclusive deals.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/shop"
                  className="bg-primarys hover:bg-primarys-dark text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={16} /> EXPLORE SHOP
                </Link>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-700">
              <ShieldCheck size={280} />
            </div>
          </div>
        </div>

        {/* --- Main Links Grid --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-12 border-t border-gray-200">
          {/* Column 1: Navigation */}
          <div className="space-y-6">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Main Menu
            </h4>
            <ul className="space-y-3">
              <FooterLink label="Return to Home" href="/" />
              <FooterLink label="Hardware Shop" href="/shop" />
              <FooterLink label="About Our Team" href="/aboutpage" />
              <FooterLink label="Read Our Blog" href="/blogpage/bloghero" />
              <FooterLink label="Buy Now" href="tel:9800123456" />
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-6">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Categories
            </h4>
            <ul className="space-y-3">
              <FooterLink label="Heavy Power Tools" href="/shop" />
              <FooterLink label="Hand Tool Sets" href="/shop" />
              <FooterLink label="Plumbing Systems" href="/shop" />
              <FooterLink label="Electrical Fittings" href="/shop" />
              <FooterLink label="Construction Gear" href="/shop" />
            </ul>
          </div>

          {/* Column 3: Status & Contact */}
          <div className="space-y-6">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Store Status
            </h4>
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-green-700 font-black text-[10px] uppercase tracking-widest mb-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                Store is Online
              </div>
              <p className="text-xs font-bold text-green-900">
                Orders are being processed 24/7
              </p>
            </div>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${phone}`}
                className="flex items-center gap-3 text-sm font-bold text-texts-dark hover:text-primarys transition-colors group"
              >
                <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-primarys group-hover:text-white transition-all">
                  <Phone
                    size={16}
                    className="text-primarys group-hover:text-white"
                  />
                </div>
                +977-{phone}
              </a>

              {/* Email Link */}
              <a
                href="mailto:sajilohardwareofficial@gmail.com"
                className="flex items-center gap-3 text-sm font-bold text-texts-dark hover:text-primarys transition-colors group"
              >
                <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-primarys group-hover:text-white transition-all">
                  <Mail
                    size={16}
                    className="text-primarys group-hover:text-white"
                  />
                </div>
                sajilohardwareofficial@gmail.com
              </a>
            </div>
          </div>

          {/* Column 4: Location Map-ish */}
          <div className="space-y-6">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Our Location
            </h4>
            <div className="relative group overflow-hidden rounded-2xl bg-white border border-gray-200 p-4 shadow-sm hover:border-primarys transition-all">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primarys shrink-0" />
                <p className="text-xs font-bold text-texts-secondary leading-tight">
                  06 School Chowk Sanogaun,
                  <br />
                  Mahalaxmi 44708
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <a
                  href="https://maps.app.goo.gl/FHm5y8Fk5cZAeC6r5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-between group/map"
                >
                  <span className="text-[10px] font-black text-primarys group-hover/map:underline">
                    VIEW ON GOOGLE MAPS
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-primarys group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="py-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-black text-texts-secondary tracking-widest uppercase">
            © {currentYear} Sajilo Hardware Nepal
          </p>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair text-gray-600">
            <Badge icon={<ShieldCheck size={14} />} label="Secure" />
            <Badge icon={<Star size={14} />} label="Top Rated" />
            <Badge icon={<Globe size={14} />} label="Nepal Wide" />
          </div>

          <div className="flex gap-6 text-[11px] font-black uppercase tracking-tighter text-gray-600">
            <Link
              href="/privacypage/termsandcondition"
              className="hover:text-primarys transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacypage/privacypolicy"
              className="hover:text-primarys transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
        {/* javtech links */}
        <div className="text-center underline">
          <a
            href="https://javtechinfosys.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primarys text-lg italic font-semibold"
          >
            Developed by javtechinfosys
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Sub Components ---

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <li>
    <Link
      href={href}
      className="text-texts-secondary text-sm font-bold hover:text-primarys transition-all flex items-center gap-2 group"
    >
      <ArrowRight
        size={12}
        className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
      />
      {label}
    </Link>
  </li>
);

const SocialBtn = ({ icon }: { icon: React.ReactNode }) => (
  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-texts-dark hover:bg-primarys hover:text-white hover:-translate-y-1 transition-all shadow-sm">
    {icon}
  </button>
);

const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default Footer;

// hello
