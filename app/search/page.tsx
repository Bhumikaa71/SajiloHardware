"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen -mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 sm:mt-0 lg:mt-24 pt-20 lg:pt-38">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black">
            Search Results for:{" "}
            <span className="text-primarys break-words">{query}</span>
          </h1>
        </div>
      </div>

      <Footer />
    </>
  );
}
