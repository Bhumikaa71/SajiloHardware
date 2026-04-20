import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrolltotop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajilo HardWare",
  description: "Hardware store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        
        <WishlistProvider>
          <CartProvider>
            {/* ✅ FIXED NAVBAR */}
            {/* <Navbar /> */}

            {/* ✅ IMPORTANT: prevents overlap */}
            <main className="flex-1">{children}</main>

            {/* <Footer /> */}
            <Toaster position="top-right" />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
