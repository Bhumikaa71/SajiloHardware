"use client";

import { Truck, Flame, FileText, Percent, Sparkles } from "lucide-react";

const items = [
  { title: "Free Delivery", icon: Truck },
  { title: "Hot Deals", icon: Flame },
  { title: "Blogs", icon: FileText },
  { title: "Sell With Us", icon: Percent },
  { title: "New Arrivals", icon: Sparkles },
];

export default function InfiniteFeatureScroll() {
  const loopItems = [...items, ...items];

  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="flex w-max animate-[var(--animate-scroll)] hover:[animation-play-state:paused] gap-4 px-4">
        {loopItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="min-w-[240px]">
              <div className="relative bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="absolute left-0 top-0 h-full w-1 bg-primarys rounded-l-2xl"></div>

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-texts-dark text-primarys-dark">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </p>
                  {/* <p className="text-xs text-gray-500">Explore more →</p> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
