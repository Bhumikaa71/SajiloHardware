"use client";

import NavBar from "@/components/navbar";
import React from "react";
import Hero from "./landingpage/hero/page";
import FeatureScroller from "./landingpage/features/page";
import BestSelling from "../components/sections/BestSelling";
import Footer from "@/components/footer";
import FeaturedCategories from "./landingpage/FeaturedCategories/page";
import Brand from "./landingpage/Brand/page";
import FeaturedProducts from "./landingpage/FeaturedProducts/page";
import Navbar from "@/components/navbar";
import NewArrivals from "./landingpage/newArrivals/page";

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
      <NewArrivals />
      <Footer />
    </div>
  );
}

export default page;
