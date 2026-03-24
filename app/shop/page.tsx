"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: "farm-hoodie",
    title: "FARM HOODIE",
    price: 85.00,
    image: "/farm-hoodie-front.jpg",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "farm-hoodie-blue",
    title: "FARM HOODIE — BLUE",
    price: 85.00,
    image: "/farm-hoodie-blue-front.jpg",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  }
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Minimal Filter Bar */}
        <div className="flex gap-8 mb-12 border-b border-zinc-100 pb-4 text-[11px] uppercase tracking-[0.3em] font-medium text-zinc-400">
          <span className="text-black">All Products</span>
          <span className="cursor-pointer hover:text-black transition-colors">Availability ⌵</span>
          <span className="cursor-pointer hover:text-black transition-colors">Price ⌵</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="flex flex-col group">
      {/* 1. PRODUCT IMAGE - Clean Light Gray Background */}
      <Link href={`/shop/${product.id}`} className="mb-8 block overflow-hidden bg-[#F9F9F9]">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </Link>

      {/* 2. PRODUCT INFO - Minimal Typography */}
      <div className="space-y-2 mb-8 text-center">
        <Link href={`/shop/${product.id}`}>
          <h2 className="text-[14px] font-bold tracking-[0.2em] uppercase border-b border-black/10 hover:border-black inline-block pb-1 transition-colors">
            {product.title} {selectedSize && `— ${selectedSize}`}
          </h2>
        </Link>
        <p className="text-[13px] font-light text-zinc-500">${product.price.toFixed(2)}</p>
      </div>

      {/* 3. CIRCULAR SIZE SELECTOR - Monochrome */}
      <div className="flex justify-center gap-3 mb-8">
        {product.sizes.map((size: string) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`w-9 h-9 rounded-full border text-[10px] flex items-center justify-center transition-all cursor-pointer ${
              selectedSize === size 
                ? "bg-black border-black text-white" 
                : "border-zinc-200 text-zinc-400 hover:border-black hover:text-black bg-white"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* 4. ACTION BUTTON - Solid Black */}
      <button className="w-full bg-black hover:bg-zinc-800 text-white py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors cursor-pointer">
        Add to Cart
      </button>
    </div>
  );
}