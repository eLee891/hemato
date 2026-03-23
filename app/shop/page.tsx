"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

const products = [
  {
    title: "FARM HOODIE",
    price: "$85.00",
    images: ["/farm-hoodie-front.jpg", "/farm-hoodie-back.jpg"], 
    slug: "farm-hoodie"
  },
  {
    title: "FARM HOODIE — BLUE",
    price: "$85.00",
    images: ["/farm-hoodie-blue-front.jpg", "/farm-hoodie-blue-back.jpg"], 
    slug: "farm-hoodie-blue"
  }
];

export default function ShopPage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-[#1A2233]">
      
      {/* --- 1. LOCAL NAV BAR (Fixed Visibility) --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-sm px-8 py-7 flex justify-between items-center text-[#1A2233] border-b border-zinc-50">
        <Link href="/" className="text-[14px] tracking-[0.6em] font-light uppercase">
          H E M A T O
        </Link>
        
        <div className="flex items-center gap-8">
          <Link href="/account">
            <User className="w-[18px] h-[18px] stroke-[1.5px] hover:opacity-40 transition-opacity" />
          </Link>
          <Link href="/cart">
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5px] hover:opacity-40 transition-opacity" />
          </Link>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      {/* pt-56 provides the exact airy spacing seen in your Grace Farms mockup */}
      <header className="pt-56 pb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[44px] md:text-[62px] font-light tracking-tight text-[#1A2233] mb-5"
          style={{ fontFamily: 'var(--font-classico), serif' }}
        >
          the shop
        </motion.h1>
        <p className="text-[10px] font-light tracking-[0.6em] uppercase opacity-30">
          Brewed with purpose. Shared with care.
        </p>
      </header>

      {/* --- 3. PRODUCT GRID --- */}
      <div className="max-w-[1440px] mx-auto px-10 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-32">
          {products.map((product) => (
            <motion.div key={product.slug} className="group flex flex-col">
              <Link href={`/shop/${product.slug}`} className="w-full">
                
                {/* Image Box - Grey background with high padding for a floating effect */}
                <div className="aspect-square bg-[#F9F9F9] flex items-center justify-center mb-8 relative overflow-hidden transition-colors group-hover:bg-[#F4F4F4]">
                  <motion.img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className={`w-full h-full object-contain p-16 md:p-24 transition-opacity duration-700 ${
                      product.images.length > 1 ? "group-hover:opacity-0" : ""
                    }`}
                  />
                  
                  {product.images.length > 1 && (
                    <img 
                      src={product.images[1]} 
                      alt={`${product.title} alternate`} 
                      className="absolute inset-0 w-full h-full object-contain p-16 md:p-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  )}
                </div>
                
                {/* Product Text */}
                <div className="text-center space-y-1">
                  <h3 className="text-[12px] font-bold tracking-[0.25em] uppercase text-[#1A2233]">
                    {product.title}
                  </h3>
                  <p className="text-[13px] text-zinc-400 font-light tracking-wide">
                    {product.price}
                  </p>
                  
                  <div className="pt-6">
                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all border-b border-zinc-900 pb-1">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}