"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
// Go up two levels (out of [slug], then out of shop) to reach 'app'
import { useCart } from "../../context/CartContext";

const products = {
  "farm-hoodie": {
    title: "FARM HOODIE",
    price: 85.00,
    description: "For every rise. Our Farm Hoodies are made to last. Crafted from premium heavyweight fleece with a structured fit and brushed interior, they are designed for the farm and the kitchen alike. A thoughtful foundation for your everyday wardrobe.",
    images: ["/farm-hoodie-front.jpg", "/farm-hoodie-back.jpg"] 
  },
  "farm-hoodie-blue": {
    title: "FARM HOODIE — BLUE",
    price: 85.00,
    description: "The Hemato Farm Edition hoodie in a vibrant blue. A sturdy yet soft companion for early mornings and late sunsets.",
    images: ["/farm-hoodie-blue-front.jpg", "/farm-hoodie-blue-back.jpg"]
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products[slug as keyof typeof products];
  
  const { addToCart } = useCart(); // Hook into the Cart logic
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <div className="pt-40 text-center font-light">Product not found.</div>;

  // Function to handle the Add to Cart click
  const handleAddToCart = () => {
    // We pass the product info, selected size, and the quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        image: product.images[0], // Use the first image for the cart thumbnail
        id: slug
      }, selectedSize);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCF9] text-[#1A2233] pt-32 pb-20 px-6 md:px-16">
      
      {/* 1. BREADCRUMB */}
      <nav className="mb-8 text-[12px] font-light tracking-wide text-zinc-500">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-black">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-black opacity-60">{product.title}</span>
      </nav>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="aspect-[4/5] w-full bg-[#F2F0EB] overflow-hidden">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[activeImage]} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-24 aspect-square bg-[#F2F0EB] border-2 transition-all cursor-pointer ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="lg:col-span-5 flex flex-col pt-2">
          <h1 className="text-[42px] font-bold tracking-tight mb-2 uppercase">{product.title}</h1>
          <div className="text-[22px] font-medium mb-1">${product.price.toFixed(2)}</div>
          <p className="text-[12px] text-zinc-500 mb-6 italic">Shipping calculated at checkout.</p>
          
          <hr className="border-t-2 border-black mb-8 w-full" />

          {/* SIZE SELECTION */}
          <div className="mb-8">
            <span className="text-[13px] font-bold uppercase tracking-widest block mb-4">Size</span>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 text-[13px] border transition-all cursor-pointer ${
                    selectedSize === size 
                      ? "border-black bg-black text-white" 
                      : "border-zinc-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY & ADD TO CART */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex items-center border border-zinc-300 h-[54px] bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 cursor-pointer hover:bg-zinc-100 h-full">−</button>
              <span className="px-4 text-[14px] w-12 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 cursor-pointer hover:bg-zinc-100 h-full">+</button>
            </div>
            {/* Action Button: Now triggers handleAddToCart */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-black hover:bg-zinc-800 text-white font-bold text-[11px] tracking-[0.3em] h-[54px] transition-colors cursor-pointer uppercase"
            >
              Add to cart
            </button>
          </div>

          <button className="w-full border border-black py-3 text-[11px] font-bold tracking-[0.3em] uppercase mb-10 hover:bg-zinc-50 transition-colors cursor-pointer bg-white">
            Add Gift Wrapping & Note
          </button>

          {/* DESCRIPTION */}
          <div className="space-y-6 text-[15px] leading-[1.7] text-zinc-800 font-light">
            <p className="font-medium italic">For every morning.</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}