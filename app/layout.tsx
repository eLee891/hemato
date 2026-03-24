import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SupportFooter from "@/components/SupportFooter";
import AuthProvider from "@/components/AuthProvider";

// CHANGE THIS LINE: Use the @ alias to match your Navbar import
import { CartProvider } from "@/app/context/CartContext"; 

import CartSidebar from "@/components/CartSidebar"; // Cleaned up alias

export const metadata: Metadata = {
  title: "Hemato Institute",
  description: "Research and Education for a Healthier Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zls4fyd.css" />
      </head>
      <body className="antialiased bg-white selection:bg-zinc-100">
        <AuthProvider>
          <CartProvider>
            
            <Navbar />
            <CartSidebar />

            <main className="min-h-screen">
              {children}
            </main>

            <SupportFooter />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}