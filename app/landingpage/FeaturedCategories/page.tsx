// components/FeaturedCategories.tsx

import Link from "next/link";
import {
  Wrench,
  Zap,
  Tent,
  HardHat,
  Lightbulb,
  Flame,
  Hammer,
  Drill,
  Bike,
  Leaf,
} from "lucide-react";

type Category = {
  name: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { name: "Vacuum Cleaner", icon: <Zap size={26} /> },
  { name: "Welding Equipment", icon: <Flame size={26} /> },
  { name: "Camping Gear", icon: <Tent size={26} /> },
  { name: "Generators", icon: <Zap size={26} /> },
  { name: "Safety Equipment", icon: <HardHat size={26} /> },
  { name: "Lights", icon: <Lightbulb size={26} /> },
  { name: "Gardening Tools", icon: <Leaf size={26} /> },
  { name: "Heaters", icon: <Flame size={26} /> },
  { name: "Hand Tools", icon: <Hammer size={26} /> },
  { name: "Power Tools", icon: <Drill size={26} /> },
  { name: "Motorcycle", icon: <Bike size={26} /> },
  { name: "Electrical", icon: <Wrench size={26} /> },
];

export default function FeaturedCategories() {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Featured Categories
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat, index) => (
          <Link
            key={index}
            href="/category"
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* hover background sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primarys)]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative flex flex-col items-center justify-center text-center h-36 px-3">
              {/* Icon */}
              <div className="mb-3 p-3 rounded-lg bg-[var(--color-primarys)]/10 text-[var(--color-primarys)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--color-primarys)] group-hover:text-white">
                {cat.icon}
              </div>

              {/* Text */}
              <p className="text-sm font-medium text-[var(--color-texts-secondary)] group-hover:text-[var(--color-texts-dark)]">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
