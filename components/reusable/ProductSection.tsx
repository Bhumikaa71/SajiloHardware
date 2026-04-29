// "use client";

// import { useRef, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   ShoppingCart,
//   MessageCircle,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useAnimation, useInView, type Variants } from "framer-motion";
// import { useWishlist } from "@/context/WishlistContext";
// import { useCart } from "@/context/CartContext";
// import toast from "react-hot-toast";
// import { useGetBestSellingProductsQuery } from "@/services/categoryApi";
// import no_image_available from "@/public/images/no-image-available.png";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
// };

// export default function ProductSection({
//   title,
//   products,
// }: {
//   title: string;
//   products: Product[];
// }) {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

//   const controls = useAnimation();
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const { cart, addToCart } = useCart();


//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const el = scrollRef.current;
//     const scrollAmount = 280;
//     el.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   const startAutoScroll = () => {
//     stopAutoScroll();
//     autoScrollRef.current = setInterval(() => {
//       if (!scrollRef.current) return;
//       const el = scrollRef.current;
//       if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
//         el.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         scroll("right");
//       }
//     }, 6000);
//   };

//   const stopAutoScroll = () => {
//     if (autoScrollRef.current) clearInterval(autoScrollRef.current);
//   };

//   useEffect(() => {
//     startAutoScroll();
//     return () => stopAutoScroll();
//   }, []);

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { x: 40, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   return (
//     <section
//       ref={ref}
//       className="py-10 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden bg-white"
//       onMouseEnter={stopAutoScroll}
//       onMouseLeave={startAutoScroll}
//     >
//       {/* HEADER */}
//       <div className="mb-6 flex items-center justify-between px-1">
//         <motion.h2
//           initial={{ opacity: 0, x: -20 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight"
//         >
//           {title}
//         </motion.h2>

//         <Link
//           href="/shop"
//           className="text-primarys text-xs sm:text-sm font-bold hover:underline underline-offset-4"
//         >
//           See All
//         </Link>
//       </div>

//       <div className="relative group/container">
//         {/* NAVIGATION BUTTONS */}
//         <button
//           onClick={() => scroll("left")}
//           className="absolute -left-2 top-[35%] -translate-y-1/2 z-30 bg-white text-primarys p-2 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover/container:opacity-100 transition-all hover:bg-primarys hover:text-white"
//         >
//           <ChevronLeft size={20} />
//         </button>

//         <button
//           onClick={() => scroll("right")}
//           className="absolute -right-2 top-[35%] -translate-y-1/2 z-30 bg-white text-primarys p-2 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover/container:opacity-100 transition-all hover:bg-primarys hover:text-white"
//         >
//           <ChevronRight size={20} />
//         </button>

//         {/* PRODUCTS SCROLLER */}
//         <motion.div
//           ref={scrollRef}
//           variants={containerVariants}
//           initial="hidden"
//           animate={controls}
//           className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-6 pt-1"
//         >
//           {products?.map((product: any, index: number) => {
//             const isInWishlist = wishlist.some((item) => item.id === product.id);
//             const isInCart = cart.some((item) => item.id === product.id);
//             const whatsappUrl = `https://wa.me/9845526696?text=Interested in: ${encodeURIComponent(product.name)} (Price: Rs. ${product.price})`;

//             return (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="flex-shrink-0 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] cursor-pointer"
//                 onClick={() => (window.location.href = "/product")}
//               >
//                 <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group/card">
//                   {/* Wishlist Button */}
//                   <motion.button
//                     whileTap={{ scale: 0.8 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       isInWishlist
//                         ? removeFromWishlist(product.id)
//                         : addToWishlist(product);
//                       toast.success(isInWishlist ? "Removed" : "Added ❤️");
//                     }}
//                     className={`absolute top-4 right-4 z-20 p-2 rounded-xl backdrop-blur-md transition-all ${
//                       isInWishlist
//                         ? "bg-primarys text-white"
//                         : "bg-white/90 text-gray-400 shadow-sm"
//                     }`}
//                   >
//                     <Heart
//                       size={16}
//                       className={isInWishlist ? "fill-white" : "text-gray-400"}
//                     />
//                   </motion.button>

//                   {/* IMAGE */}
//                   <div className="relative w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gray-50">
//                     <Image
//                       src={product?.image?.[0] || no_image_available}
//                       alt={product.name}
//                       fill
//                       className="object-contain p-2 group-hover/card:scale-105 transition-transform duration-300"
//                     />
//                   </div>

//                   {/* INFO */}
//                   <div className="mt-3 px-1">
//                     <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover/card:text-primarys transition-colors">
//                       {product.name}
//                     </h3>
//                     <p className="mt-1 text-primarys font-extrabold text-base">
//                       {/* Rs. {product?.data?.op_price?.toLocaleString()} */}
//                     </p>
//                   </div>

//                   {/* ACTION BUTTONS */}
//                   <div className="mt-4 flex flex-col gap-1.5">
//                     {/* Add to Cart */}
//                     <motion.button
//                       whileTap={{ scale: 0.97 }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!isInCart) {
//                           addToCart(product);
//                           toast.success("Added to Cart 🛒");
//                         }
//                       }}
//                       className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
//                         isInCart
//                           ? "bg-gray-100 text-gray-400"
//                           : "bg-gray-900 text-white hover:bg-primarys"
//                       }`}
//                     >
//                       <ShoppingCart size={14} />
//                       {isInCart ? "IN CART" : "ADD TO CART"}
//                     </motion.button>

//                     {/* WhatsApp Button */}
//                     <a
//                       href={whatsappUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       onClick={(e) => e.stopPropagation()}
//                       className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest bg-green-500 text-white hover:bg-green-600 transition-all"
//                     >
//                       <MessageCircle size={14} />
//                       WHATSAPP
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>

//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }






"use client";

import { useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import no_image_available from "@/public/images/no-image-available.png";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

export default function ProductSection({
  title,
  products,
  onLoadMore,
  hasMore,
  isLoading,
}: {
  title: string;
  products: Product[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollAmount = 280;
    if (direction === "right") {
      const isNearEnd = el.scrollLeft + el.offsetWidth >= el.scrollWidth - 300;
      if (isNearEnd && hasMore) onLoadMore?.();
    }
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        if (hasMore) onLoadMore?.();
        else el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 6000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [hasMore, onLoadMore]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // SKELETON
  if (isLoading && products.length === 0) {
    return (
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-white">
        <div className="mb-6 flex items-center justify-between px-1">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[23%]">
              <div className="rounded-2xl border border-gray-100 p-3 flex flex-col gap-3">
                <div className="w-full aspect-square bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-9 bg-green-100 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section
      ref={ref}
      className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-white"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between px-1">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight"
        >
          {title}
        </motion.h2>
        <Link
          href="/shop"
          className="text-primarys text-xs sm:text-sm font-bold hover:underline underline-offset-4"
        >
          See All
        </Link>
      </div>

      <div className="relative group/container">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 top-[35%] -translate-y-1/2 z-30 bg-white text-primarys p-2 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover/container:opacity-100 transition-all hover:bg-primarys hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 top-[35%] -translate-y-1/2 z-30 bg-white text-primarys p-2 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover/container:opacity-100 transition-all hover:bg-primarys hover:text-white"
        >
          <ChevronRight size={20} />
        </button>

        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-6 pt-1"
        >
          {products.map((product: any, index: number) => {
            const isInWishlist = wishlist.some((item) => item.id === product.id);
            const isInCart = cart.some((item) => item.id === product.id);
            const whatsappUrl = `https://wa.me/9845526696?text=Interested in: ${encodeURIComponent(product.name)} (Price: Rs. ${product.op_price})`;

            return (
              <motion.div
                key={product._id ?? index}
                variants={itemVariants}
                className="shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[23%] cursor-pointer"
                onClick={() => (window.location.href = `/product/${product.slug}`)}
              >
                <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group/card">
            
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gray-50">
                    <Image
                      src={product?.image?.[0] || no_image_available}
                      alt={product?.name}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 48vw, (max-width: 1024px) 32vw, 23vw"
                      className="object-contain p-2 group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-3 px-1">
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover/card:text-primarys transition-colors">
                      {product?.name}
                    </h3>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-1">

                      {/* Original Price */}
                      {product.op_price > 0 && product.dp_price > 0 ? (
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-gray-400 line-through text-sm">
                            Rs. {product?.op_price?.toLocaleString()}
                          </span>
                        </div>
                      ): (
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-primarys font-bold">
                            {product.op_price ? `Rs. ${product?.op_price?.toLocaleString()}` : ""}
                          </span>
                        </div>
                      )}

                      {/* Discount Price */}
                      {product.op_price > 0 && product.dp_price > 0 && (
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-primarys font-bold">
                            Rs. {product.dp_price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-1.5">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isInCart) {
                          addToCart(product);
                          toast.success("Added to Cart 🛒");
                        }
                      }}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${isInCart ? "bg-gray-100 text-gray-400" : "bg-gray-900 text-white hover:bg-primarys"
                        }`}
                    >
                      <ShoppingCart size={14} />
                      {isInCart ? "IN CART" : "ADD TO CART"}
                    </motion.button>


                    <a href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest bg-green-500 text-white hover:bg-green-600 transition-all"
                    >
                      <MessageCircle size={14} />
                      WHATSAPP
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {hasMore && (
            <div className="shrink-0 w-[23%] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primarys border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}