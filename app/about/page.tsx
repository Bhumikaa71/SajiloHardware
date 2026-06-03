"use client";

import dynamic from "next/dynamic";
import { useGetAboutQuery } from "@/services/aboutApi";

const AboutContent = dynamic(() => import("./AboutContent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      Loading About...
    </div>
  ),
});

export default function AboutPage() {
  const { data, isLoading, isError } = useGetAboutQuery();
  const about = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading About...
      </div>
    );
  }

  if (isError || !about) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load About page
      </div>
    );
  }

  return <AboutContent about={about} />;
}