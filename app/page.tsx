import NavBar from "@/components/navbar";
import React from "react";
import Hero from "./landingpage/hero/page";
import FeatureScroller from "./landingpage/features/page";
import BestSelling from "./landingpage/bestselling/page";
import Footer from "@/components/footer";
import FeaturedCategories from "./landingpage/FeaturedCategories/page";
import Brand from "./landingpage/Brand/page";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <FeatureScroller />
      <BestSelling />
      <FeaturedCategories />
      <Brand />
      <Footer />
    </div>
  );
}

export default page;
