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

import { FaYoutube, FaInstagramSquare, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { PiTiktokLogoBold } from "react-icons/pi";
import { useGetContactDetailsQuery } from "@/services/contactDetailsApi";
import { useGetMapDetailsQuery } from "@/services/mapApi";
import { useGetCategoryTreeQuery } from "@/services/categoryApi";
import { useGetAllSocialMediaQuery } from "@/services/socialMediaApi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const { data: contactDetails } = useGetContactDetailsQuery();
  const { data: mapDetails } = useGetMapDetailsQuery();
  const locations = mapDetails?.data?.[0]?.locations || [];
  const activeLocations = locations.filter((loc: any) => loc.active);
  const { data: categoryTree } = useGetCategoryTreeQuery();
  const { data: socialMedia, isLoading: isSocialLoading } = useGetAllSocialMediaQuery();
  console.log("Social Media Data in Footer:", socialMedia);


  // Helper method: Map social network platform string keys onto concrete React Icon setups
// Helper method: Map social network platform string keys safely onto React Icons
  const getPlatformIcon = (platformId: string | undefined | null) => {
    const safePlatformId = platformId ? platformId.toLowerCase().trim() : "";

    switch (safePlatformId) {
      case "facebook":
        return <FaFacebookF size={18} />;
      case "youtube":
        return <FaYoutube size={18} />;
      case "tiktok":
        return <PiTiktokLogoBold size={18} />;
      case "instagram":
        return <FaInstagramSquare size={18} />;
      case "linkedin":
        return <FaLinkedinIn size={18} />;
      
      // ─── ADD THESE NEW CASES FOR YOUR DATABASE LINKS ───
      case "github":
        // Import FaGithub at the top from "react-icons/fa" if it yells, 
        // or quickly reuse the Lucide code template structure below
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        );
      case "website":
        return <Globe size={18} />; // Clean browser-globe line work for normal domain addresses
        
      default:
        return <Globe size={18} />;
    }
  };


  const activeSocialData = socialMedia?.data?.[0];  


  // Helper method: Secure base string links against runtime browser redirect context crashes
  const formatUrl = (url: string): string => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  // Helper method: Safely extract description string payload from the social media hook
  const getDynamicDescription = (): string => {
    // Looks through the description object nested array logic safely
    const apiText = socialMedia?.data?.[0]?.description?.[0]?.content?.[0]?.text;

    if (!apiText) {
      // Returns your exact fallback placeholder text if backend arrays are empty
      return "The most trusted hardware partner in Nepal. Providing professional tools for contractors and DIY enthusiasts since 2075 BS.";
    }
    return apiText;
  };

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
           {/* Dynamic Summary Description Block Text */}
<p className="text-texts-secondary text-sm leading-relaxed font-medium">
  {getDynamicDescription()}
</p>

{/* Dynamic Social Action Row */}
<div className="flex flex-wrap gap-3">
  {isSocialLoading ? (
    <div className="flex gap-2 animate-pulse py-1">
      <div className="w-10 h-10 bg-gray-100 rounded-xl" />
      <div className="w-10 h-10 bg-gray-100 rounded-xl" />
      <div className="w-10 h-10 bg-gray-100 rounded-xl" />
    </div>
  ) : activeSocialData?.socialLinks && activeSocialData.socialLinks.length > 0 ? (
    activeSocialData.socialLinks.map((link: any, index: number) => (
      <a
        key={link.platformId || index}
        href={formatUrl(link.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <SocialBtn icon={getPlatformIcon(link.platformId)} />
      </a>
    ))
  ) : (
    /* Native Fallback UI if API is empty or non-existent */
    <>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <SocialBtn icon={<FaFacebookF size={18} />} />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <SocialBtn icon={<FaYoutube size={18} />} />
      </a>
      <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
        <SocialBtn icon={<PiTiktokLogoBold size={18} />} />
      </a>
    </>
  )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-t border-gray-200 items-start">

          {/* Column 1: Navigation */}
          <div className="space-y-5">
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
          <div className="space-y-5">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Categories
            </h4>

            {/* Wrapping the data map inside a structured ul fixes the layout bugs */}
            <ul className="space-y-3 list-none">
              {categoryTree?.data && Array.isArray(categoryTree.data) && (
                categoryTree.data.slice(0, 5).map((cat: any) => (
                  <FooterLink
                    key={cat._id}
                    label={cat.name}
                    href={`/shop?category=${cat.slug}`}
                  />
                ))
              )}
            </ul>
          </div>

          {/* Column 3: Status & Contact */}
          <div className="space-y-5">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Store Status
            </h4>

            <div className="bg-green-50/70 border border-green-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-green-700 font-black text-[10px] uppercase tracking-widest mb-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                Store is Online
              </div>
              <p className="text-xs font-bold text-green-900">
                Orders are being processed 24/7
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Phone Link */}
              {contactDetails?.data?.phone && (
                <a
                  href={`tel:+977${contactDetails?.data?.phone}`}
                  className="flex items-center gap-3 text-sm font-bold text-texts-dark hover:text-primarys transition-colors group min-w-0"
                >
                  <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-primarys group-hover:text-white transition-all shrink-0">
                    <Phone size={16} className="text-primarys group-hover:text-white" />
                  </div>
                  <span className="truncate">+977-{contactDetails?.data?.phone}</span>
                </a>
              )}

              {/* Email Link */}
              {contactDetails?.data?.email && (
                <a
                  href={`mailto:${contactDetails?.data?.email}`}
                  className="flex items-start gap-3 text-sm font-bold text-texts-dark hover:text-primarys transition-colors group min-w-0"
                >
                  <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-primarys group-hover:text-white transition-all shrink-0 mt-0.5">
                    <Mail size={16} className="text-primarys group-hover:text-white" />
                  </div>
                  {/* break-all prevents long emails from shattering your 4-column layout layout */}
                  <span className="break-all text-xs pt-1 leading-tight">
                    {contactDetails?.data?.email}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Column 4: Location Map */}
          <div className="space-y-5">
            <h4 className="text-texts-dark font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-primarys rounded-full" />
              Our Location
            </h4>

            <div className="overflow-hidden rounded-xl bg-white border border-gray-200 p-4 shadow-sm hover:border-primarys/60 transition-all">
              <div className="space-y-2.5">
                {activeLocations.map((loc: any) => (
                  <a
                    key={loc._id}
                    href={loc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-primarys/5 hover:border-primarys/30 group transition-all"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-[11px] font-black text-texts-dark uppercase tracking-wide truncate">
                        {loc.title}
                      </span>
                      <span className="text-[10px] text-texts-secondary mt-0.5">
                        Open in Google Maps
                      </span>
                    </div>
                    <div className="shrink-0">
                      <ArrowRight
                        size={14}
                        className="text-primarys group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </a>
                ))}
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
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacypage/privacypolicy"
              className="hover:text-primarys transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        {/* javtech links */}
        <div className="flex justify-center py-3">

          <a href="https://javtechinfosys.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-5 py-2
              border border-gray-200 rounded-xl
              bg-gray-50 text-gray-500 text-sm
              hover:border-gray-400 hover:text-gray-800
              transition-all duration-200
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
            Developed by javtechinfosys
          </a>
        </div>
      </div>
    </footer >
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

