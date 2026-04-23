import NavBar from "@/components/navbar";
import React from "react";
import Hero from "./landingpage/hero/page";
import FeatureScroller from "./landingpage/features/page";
import BestSelling from "./landingpage/bestselling/page";
import Footer from "@/components/footer";
import FeaturedCategories from "./landingpage/FeaturedCategories/page";
import Brand from "./landingpage/Brand/page";
import FeaturedProducts from "./landingpage/FeaturedProducts/page";
import PowerTools from "./landingpage/powertools/page";
import GardeningTools from "./landingpage/gardening tools/page";
import HandTools from "./landingpage/handtools/page";
import SafetyGearTools from "./landingpage/safety gear/page";
import Navbar from "@/components/navbar";
import WhatsAppEnquiry from "@/components/reusable/WhatsappEnquiry";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureScroller />
      <BestSelling />
      <FeaturedCategories />
      <Brand />
      <FeaturedProducts />
      <PowerTools />
      <GardeningTools />
      <HandTools />
      <SafetyGearTools />
      <WhatsAppEnquiry />
      <Footer />
    </div>
  );
}

export default page;
