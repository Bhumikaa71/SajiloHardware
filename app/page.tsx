import NavBar from "@/components/navbar";
import React from "react";
import Hero from "./landingpage/hero/page";
import FeatureScroller from "./landingpage/features/page";
import BestSelling from "./landingpage/bestselling/page";
import Footer from '@/components/footer'

function page() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <FeatureScroller />
      <BestSelling />
      <br />
      <Footer />

    </div>
  );
}

export default page;
