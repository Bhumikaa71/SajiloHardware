// "use client";

// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef } from "react";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import toast from "react-hot-toast";
// import { Phone } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useParams } from "next/dist/client/components/navigation";
// import { useGetProductDetailsQuery } from "@/services/productApi";

// export default function Page() {
//   const descriptionRef = useRef<HTMLDivElement | null>(null);
//   const [qty, setQty] = useState(1);
//   const { slug } = useParams();

//   const { data: singleProductData } = useGetProductDetailsQuery(
//     { slug: slug as string },
//     { skip: !slug }
//   );

//   console.log("Single Product Data:", singleProductData);


//   const images = [
//     "/images/addtocart.jpg",
//     "/images/ab.jpeg",
//     "/images/ba.jpeg",
//   ];

//   const [activeImage, setActiveImage] = useState(images[0]);

//   const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
//   const [showZoom, setShowZoom] = useState(false);

//   const product = {
//     id: 1,
//     name: "PVC Rubber Base Traffic Cone - Red",
//     price: 900,
//     image_url: "/images/addtocart.jpg",
//   };

//   const { addToCart, cart } = useCart();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   const isInCart = cart.some((item) => item.id === product.id);
//   const isInWishlist = wishlist.some((item) => item.id === product.id);

//   const handleMouseMove = (e: any) => {
//     const rect = e.currentTarget.getBoundingClientRect();

//     let x = ((e.clientX - rect.left) / rect.width) * 100;
//     let y = ((e.clientY - rect.top) / rect.height) * 100;

//     x = Math.min(Math.max(x, 0), 100);
//     y = Math.min(Math.max(y, 0), 100);

//     setZoomPos({ x, y });
//   };

//   return (
//     <div className="bg-gray-50">
//       <Navbar />

//       <div className="min-h-screen max-w-7xl mx-auto">
//         {/* HEADER */}
//         <header className="bg-white border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//           <h1 className="text-xl sm:text-2xl font-bold text-[var(--texts-dark)]">
//             <span className="text-[var(--primarys)]">Sajilo</span> Hardware
//           </h1>
//           <span className="text-xs sm:text-sm text-[var(--texts-secondary)]">
//             Tools • Hardware • Supplies
//           </span>
//         </header>

//         {/* MAIN */}
//         <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
//           {/* LEFT IMAGE */}
//           <div className="space-y-4 flex flex-col items-center md:items-start relative">
//             {/* MAIN IMAGE */}
//             <div
//               className="relative w-full max-w-[420px] aspect-square bg-white border rounded-2xl overflow-hidden"
//               onMouseEnter={() => setShowZoom(true)}
//               onMouseLeave={() => setShowZoom(false)}
//               onMouseMove={handleMouseMove}
//             >
//               <Image
//                 src={activeImage}
//                 alt="product"
//                 fill
//                 className="object-contain"
//               />
//             </div>

//             {/* ZOOM (ONLY DESKTOP) */}
//             {showZoom && (
//               <div className="hidden lg:block fixed top-1/2 left-[55%] xl:left-[45%] -translate-y-1/2 z-50 w-[500px] xl:w-[700px] h-[400px] xl:h-[520px] mt-20 border bg-white border-2 shadow-2xl rounded-2xl overflow-hidden pointer-events-none">
//                 <div
//                   className="w-full h-full"
//                   style={{
//                     backgroundImage: `url(${activeImage})`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "260%",
//                     backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
//                   }}
//                 />
//               </div>
//             )}

//             {/* THUMBNAILS */}
//             <div className="flex gap-3 flex-wrap justify-center md:justify-start">
//               {images.map((img, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setActiveImage(img)}
//                   className={`border rounded-lg p-2 cursor-pointer transition ${activeImage === img
//                       ? "border-[var(--primarys)]"
//                       : "border-gray-200"
//                     }`}
//                 >
//                   <Image src={img} alt="thumb" width={70} height={70} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT INFO */}
//           <div className="space-y-6 text-primarys">
//             <h1 className="text-xl sm:text-2xl font-semibold text-[var(--texts-dark)]">
//               {product.name}
//             </h1>

//             <p className="text-2xl sm:text-3xl font-bold text-[var(--primarys)]">
//               Rs. {product.price}
//             </p>

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
//                 <button
//                   onClick={() => setQty(Math.max(1, qty - 1))}
//                   className="px-3 py-2 hover:bg-[var(--primarys)] hover:text-white"
//                 >
//                   −
//                 </button>

//                 <input
//                   type="number"
//                   value={qty}
//                   onChange={(e) => setQty(Number(e.target.value))}
//                   className="w-14 text-center outline-none"
//                 />

//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   className="px-3 py-2 hover:bg-[var(--primarys)] hover:text-white"
//                 >
//                   +
//                 </button>
//               </div>

//               <span className="text-green-600 text-sm font-medium">
//                 In Stock
//               </span>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link
//                 href="https://wa.me/9845526696"
//                 className="w-full sm:w-auto"
//               >
//                 <button className="w-full px-10 py-3 bg-green-600 text-white rounded-xl font-medium">
//                   Enquiry on Whatsapp
//                 </button>
//               </Link>

//               <button
//                 onClick={() => {
//                   if (isInCart) {
//                     toast.error("Already in cart");
//                     return;
//                   }
//                   // addToCart({ ...product, quantity: qty });
//                   addToCart(product);
//                   toast.success("Added to cart 🛒");
//                 }}
//                 disabled={isInCart}
//                 className={`w-full sm:w-auto px-23 py-3 rounded-xl font-medium ${isInCart
//                     ? "bg-[var(--primarys)] text-white"
//                     : "border border-[var(--primarys)] text-[var(--primarys)]"
//                   }`}
//               >
//                 {isInCart ? "In Cart" : "Add to Cart"}
//               </button>
//             </div>

//             {/* WISHLIST */}
//             <button
//               onClick={() => {
//                 if (isInWishlist) {
//                   removeFromWishlist(product.id);
//                   toast("Removed from Wishlist ❌");
//                 } else {
//                   addToWishlist(product);
//                   toast.success("Added to Wishlist ❤️");
//                 }
//               }}
//               className="text-[var(--primarys)] text-sm hover:underline"
//             >
//               {isInWishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
//             </button>

//             {/* INQUIRY */}
//             <div>
//               <p className="text-sm text-[var(--texts-secondary)] mb-2">
//                 For Inquiry
//               </p>

//               <div className="flex gap-3">
//                 <a
//                   href="tel:+9779845526696"
//                   className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
//                 >
//                   <Phone size={24} />
//                 </a>

//                 <a
//                   href="https://wa.me/9845526696"
//                   className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
//                 >
//                   <FaWhatsapp size={24} />
//                 </a>
//               </div>
//             </div>

//             {/* SPECIFICATIONS */}
//             <div>
//               <h3 className="text-lg font-semibold mb-2">
//                 Product Specification
//               </h3>

//               <ul className="space-y-2 text-[var(--texts-secondary)]">
//                 {[
//                   "Colour: Red",
//                   "Condition: New",
//                   "Size: 1.5 ft",
//                   "Rubber Base",
//                 ].map((item, i) => (
//                   <li key={i} className="flex items-center gap-2">
//                     <span className="w-2 h-2 bg-[var(--primarys)] rounded-full"></span>
//                     {item}
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={() =>
//                   descriptionRef.current?.scrollIntoView({
//                     behavior: "smooth",
//                   })
//                 }
//                 className="mt-3 border border-[var(--primarys)] text-[var(--primarys)] px-4 py-1 rounded hover:bg-[var(--primarys)] hover:text-white transition text-sm"
//               >
//                 View More details
//               </button>
//             </div>
//           </div>
//         </main>

//         {/* DELIVERY */}
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 pb-6">
//           <div className="bg-white border rounded-xl p-4 text-[var(--primarys)] font-medium">
//             🚚 1-2 Days Normal Delivery
//           </div>

//           <div className="bg-white border rounded-xl p-4 text-[var(--primarys)] font-medium">
//             ⚡ 24 Hours Express Delivery
//           </div>
//         </div>

//         {/* SELLER */}
//         <div className="max-w-6xl mx-auto bg-white border rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
//           <div className="text-[var(--primarys)] ">
//             <p>SOLD BY</p>
//             <p className="font-semibold text-gray-500">HT024</p>
//           </div>

//           <div className="text-[var(--primarys)]">
//             <p>WARRANTY</p>
//             <p className="font-semibold text-gray-500">NO</p>
//           </div>

//           <div className="text-[var(--primarys)]">
//             <p>EASY RETURN</p>
//             <p className="font-semibold text-gray-500">Available, T&C Apply</p>
//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         <div
//           ref={descriptionRef}
//           className="max-w-6xl mx-auto bg-white border rounded-xl p-4 sm:p-6 mt-6 scroll-mt-24"
//         >
//           <h2 className="text-lg sm:text-xl text-[var(--primarys)] font-semibold  mb-3">
//             Product Description
//           </h2>

//           <p className="text-[var(--texts-secondary)] leading-relaxed text-sm sm:text-base">
//             This PVC Rubber Base Traffic Cone is designed for high visibility
//             and durability. Ideal for road safety, construction sites, and
//             parking management.
//           </p>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }




"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "next/dist/client/components/navigation";
import { useGetProductDetailsQuery } from "@/services/productApi";

export default function Page() {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [qty, setQty] = useState(1);
  const { slug } = useParams();

  const { data: singleProductData, isLoading } = useGetProductDetailsQuery(
    { slug: slug as string },
    { skip: !slug }
  );

  const productDetails = singleProductData?.data;

  const [activeImage, setActiveImage] = useState<string>("");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const images: string[] = productDetails?.image || [];
  const currentImage = activeImage || images[0] || "";

  const { addToCart, cart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const cartProduct = {
    id: productDetails?._id,
    name: productDetails?.name,
    price: productDetails?.dp_price || productDetails?.op_price,
    image_url: images[0],
  };

  const isInCart = cart.some((item) => item.id === productDetails?._id);
  const isInWishlist = wishlist.some((item) => item.id === productDetails?._id);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    x = Math.min(Math.max(x, 0), 100);
    y = Math.min(Math.max(y, 0), 100);
    setZoomPos({ x, y });
  };

  const whatsappUrl = `https://wa.me/9845526696?text=${encodeURIComponent(
    `Interested in: ${productDetails?.name} (Price: Rs. ${productDetails?.dp_price || productDetails?.op_price})`
  )}`;

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <span className="text-5xl mb-4">📦</span>
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar />

      <div className="min-h-screen max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="bg-white border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--texts-dark)]">
            <span className="text-[var(--primarys)]">Sajilo</span> Hardware
          </h1>

          {/* BREADCRUMB */}
          <nav className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-primarys">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primarys">Shop</Link>
            {productDetails.parentCategory && (
              <>
                <span>/</span>
                <Link
                  href={`/shop?category=${productDetails.parentCategory.slug}`}
                  className="hover:text-primarys"
                >
                  {productDetails.parentCategory.name}
                </Link>
              </>
            )}
            {productDetails.category && (
              <>
                <span>/</span>
                <Link
                  href={`/shop?category=${productDetails.category.slug}`}
                  className="hover:text-primarys"
                >
                  {productDetails.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-400 line-clamp-1">{productDetails.name}</span>
          </nav>
        </header>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — IMAGES */}
          <div className="space-y-4 flex flex-col items-center md:items-start relative">
            {/* MAIN IMAGE */}
            <div
              className="relative w-full max-w-[420px] aspect-square bg-white border rounded-2xl overflow-hidden"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              {currentImage && (
                <Image
                  src={currentImage}
                  alt={productDetails.name}
                  fill
                  className="object-contain p-4"
                />
              )}
            </div>

            {/* ZOOM (DESKTOP ONLY) */}
            {showZoom && currentImage && (
              <div className="hidden lg:block fixed top-1/2 left-[55%] xl:left-[45%] -translate-y-1/2 z-50 w-[500px] xl:w-[700px] h-[400px] xl:h-[520px] mt-20 border bg-white border-2 shadow-2xl rounded-2xl overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "260%",
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />
              </div>
            )}

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`border rounded-lg p-2 cursor-pointer transition ${currentImage === img
                        ? "border-[var(--primarys)]"
                        : "border-gray-200"
                      }`}
                  >
                    <Image src={img} alt={`thumb-${i}`} width={70} height={70} className="object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — INFO */}
          <div className="space-y-6 text-primarys">
            {/* BADGES */}
            <div className="flex gap-2 flex-wrap">
              {productDetails.bestSeller && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                  ⭐ Best Seller
                </span>
              )}
              {productDetails.hot_selling && (
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                  🔥 Hot Selling
                </span>
              )}
              {productDetails.featured && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                  ✨ Featured
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-[var(--texts-dark)]">
              {productDetails.name}
            </h1>

            {/* CATEGORY & BRAND */}
            <div className="flex gap-4 text-sm text-gray-500 flex-wrap">
              {productDetails.category && (
                <span>
                  Category:{" "}
                  <span className="text-primarys font-medium">
                    {productDetails.category.name}
                  </span>
                </span>
              )}
              {productDetails.brand && (
                <span>
                  Brand:{" "}
                  <span className="text-primarys font-medium">
                    {productDetails.brand.brand_name}
                  </span>
                </span>
              )}
            </div>

            {/* PRICE */}
            {productDetails.show_price ? (
              <div className="flex items-center gap-3">
                {productDetails.op_price > 0 && productDetails.dp_price > 0 && (
                  <span className="text-gray-400 line-through text-lg">
                    Rs. {productDetails.op_price?.toLocaleString()}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-bold text-[var(--primarys)]">
                  Rs. {(productDetails.dp_price || productDetails.op_price)?.toLocaleString()}
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Contact us for pricing
              </p>
            )}

            {/* AVAILABILITY */}
            <span
              className={`text-sm  font-medium ${productDetails.availability === "Available"
                  ? "text-green-600"
                  : "text-red-500"
                }`}
            >
              {productDetails.availability === "Available"
                ? "✅ In Stock"
                : "❌ Out of Stock"}
            </span>

            {/* BUTTONS */}
            <div className="flex mt-4 flex-col sm:flex-row gap-4">
              <Link href={whatsappUrl} target="_blank" className="w-full sm:w-auto">
                <button className="w-full px-10 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
                  Enquiry on Whatsapp
                </button>
              </Link>

              <button
                onClick={() => {
                  if (isInCart) {
                    toast.error("Already in cart");
                    return;
                  }
                  addToCart(cartProduct);
                  toast.success("Added to cart 🛒");
                }}
                disabled={isInCart}
                className={`w-full sm:w-auto px-10 py-3 rounded-xl font-medium transition ${isInCart
                    ? "bg-[var(--primarys)] text-white"
                    : "border border-[var(--primarys)] text-[var(--primarys)] hover:bg-[var(--primarys)] hover:text-white"
                  }`}
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </button>
            </div>

            {/* WISHLIST */}
            <button
              onClick={() => {
                if (isInWishlist) {
                  removeFromWishlist(productDetails._id);
                  toast("Removed from Wishlist ❌");
                } else {
                  addToWishlist(cartProduct);
                  toast.success("Added to Wishlist ❤️");
                }
              }}
              className="text-[var(--primarys)] text-sm hover:underline"
            >
              {isInWishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
            </button>

            {/* INQUIRY */}
            <div>
              <p className="text-sm text-[var(--texts-secondary)] mb-2">For Inquiry</p>
              <div className="flex gap-3">

                <a href="tel:+9779845526696"
                  className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
                >
                  <Phone size={24} />
                </a>

                <a href={whatsappUrl}
                  className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>

            {/* SPECIFICATIONS */}
            {productDetails.specifications?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Specification</h3>
                <ul className="space-y-2 text-[var(--texts-secondary)]">
                  {productDetails.specifications.map((spec: any) => (
                    <li key={spec._id} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--primarys)] rounded-full shrink-0" />
                      <span className="font-medium">{spec.key}:</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    descriptionRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-3 border border-[var(--primarys)] text-[var(--primarys)] px-4 py-1 rounded hover:bg-[var(--primarys)] hover:text-white transition text-sm"
                >
                  View More Details
                </button>
              </div>
            )}
          </div>
        </main>

        {/* DELIVERY */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 pb-6">
          <div className="bg-white border rounded-xl p-4 text-[var(--primarys)] font-medium">
            🚚 1-2 Days Normal Delivery
          </div>
          <div className="bg-white border rounded-xl p-4 text-[var(--primarys)] font-medium">
            ⚡ 24 Hours Express Delivery
          </div>
        </div>



        {/* DESCRIPTION */}
        <div
          ref={descriptionRef}
          className="max-w-6xl mx-auto bg-white border rounded-xl p-4 sm:p-6 mt-6 mx-4 sm:mx-auto scroll-mt-24 mb-10"
        >
          <h2 className="text-lg sm:text-xl text-[var(--primarys)] font-semibold mb-3">
            Product Description
          </h2>
          <p className="text-[var(--texts-secondary)] leading-relaxed text-sm sm:text-base">
            {productDetails.description || "No description available."}
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
}