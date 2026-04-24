import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrolltotop";
import { StoreProvider } from "@/store/storeProvider";

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
      <StoreProvider>
        <body className="min-h-full flex flex-col">
          <ScrollToTop />

          <WishlistProvider>
            <CartProvider>
              {/* ✅ FIXED NAVBAR */}
              {/* <Navbar /> */}

              {/* ✅ IMPORTANT: prevents overlap */}
              <main className="flex-1">{children}</main>
              <a
                href="https://wa.me/9845526696"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 p-2 text-white  rounded-full shadow-lg transition duration-300 animate-bounce"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.65.86 5.11 2.32 7.11L4 29l7.07-2.27A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.8c-1.97 0-3.88-.53-5.55-1.54l-.4-.24-4.2 1.35 1.37-4.09-.26-.42A9.77 9.77 0 016.2 15c0-5.41 4.39-9.8 9.8-9.8s9.8 4.39 9.8 9.8-4.39 9.8-9.8 9.8zm5.37-7.27c-.29-.14-1.7-.84-1.97-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.43-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-.97 2.44.02 1.44 1.04 2.84 1.19 3.03.14.19 2.06 3.15 5 4.42.7.3 1.25.48 1.68.62.71.22 1.36.19 1.87.12.57-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33z" />
                </svg>
              </a>

              {/* <Footer /> */}
              <Toaster position="top-right" />
            </CartProvider>
          </WishlistProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
