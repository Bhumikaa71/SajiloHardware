"use client";

import Image from "next/image";

type Brand = {
  name: string;
  logo: string;
};

const brands: Brand[] = [
  { name: "Bosch", logo: "/images/brand1.png" },
  { name: "Ingco", logo: "/images/brand2.png" },
  { name: "Dingqi", logo: "/images/brand3.png" },
  { name: "UNI-T", logo: "/images/brand4.png" },
  { name: "Karcher", logo: "/images/brand5.jpg" },
  { name: "Taparia", logo: "/images/brand6.png" },
  { name: "Deli Tools", logo: "/images/brand7.png" },
  { name: "Rhinowalk", logo: "/images/brand8.jpg" },
  { name: "Assur", logo: "/images/brand9.png" },
  { name: "Jadever", logo: "/images/brand10.png" },
  { name: "Moto Torque", logo: "/images/brand11.png" },
  { name: "Petzl", logo: "/images/brand12.png" },
];

export default function Brand() {
  return (
    <section className="relative  py-12 px-4 md:px-10 overflow-hidden max-w-7xl mx-auto">
      {/* Decorative Orange Shapes
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500 to-orange-400 rounded-bl-[80px] opacity-90" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-tr-[80px] opacity-90" /> */}
      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Shop by Brands
        </h2>
        <button className="text-white hover:text-orange-600 font-medium transition">
          View All →
        </button>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 relative z-10">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
          >
            <div className="relative w-30 h-26 mb-3">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain group-hover:scale-105 transition"
              />
            </div>

            <p className="text-sm text-gray-700 group-hover:text-orange-500 font-medium text-center">
              {brand.name}
            </p>

            {/* Orange underline on hover */}
            <div className="w-0 h-[2px] bg-orange-500 mt-2 group-hover:w-10 transition-all duration-300 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
