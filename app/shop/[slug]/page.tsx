"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const product = {
    title: "Saliva Book",
    price: "$105.00",
    image: "/saliva-book-cover.jpg", 
    description: "Through various examples backed by medical illustrations and facts on how the body functions, the Saliva book explains how the most familiar fluid in our body plays an important role.",
    quote: "Through saliva, we are able to maintain the blood. Saliva has the ability to revive the blood, within which is the life of the flesh."
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setIsAdding(false);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleAddToCart = () => {
    setIsAdding(true);
    setShowSuccess(true);
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-40 px-6 md:px-16 relative overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* LEFT: IMAGE */}
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] flex items-center justify-center bg-[#F9F9F9] overflow-hidden group">
            <img 
              src={product.image} 
              className="max-h-[80%] w-auto object-contain drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105" 
              alt="Book"
            />
          </div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="lg:col-span-5 flex flex-col pt-4">
          <nav className="text-[11px] uppercase tracking-[0.5em] text-zinc-400 mb-12">
            Shop / <span className="text-zinc-900 font-bold">Publications</span>
          </nav>

          <h1 className="text-7xl md:text-8xl font-light tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.85]">
            {product.title}
          </h1>
          
          <p className="text-3xl text-zinc-400 font-extralight mb-16 italic tracking-tight">
            {product.price}
          </p>
          
          <div className="space-y-12 mb-20">
            <p className="text-zinc-500 font-light leading-relaxed text-xl tracking-tight max-w-md">
              {product.description}
            </p>
            
            <div className="py-2">
              <p className="italic font-serif text-3xl md:text-4xl text-zinc-800 leading-[1.3] tracking-tight">
                “{product.quote}”
              </p>
            </div>
          </div>

          {/* ACTION AREA - NO OVERLAP */}
          <div className="flex flex-col gap-16"> {/* Gap-16 ensures a huge space between button and message */}
            <div className="flex gap-4">
              <div className="flex border border-zinc-200 px-8 py-5 items-center gap-10">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-zinc-400 hover:text-zinc-900 cursor-pointer text-xl">-</button>
                <span className="font-medium text-lg w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-zinc-400 hover:text-zinc-900 cursor-pointer text-xl">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-grow bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-[0.4em] py-5 px-10 hover:bg-red-900 transition-all duration-300 shadow-xl cursor-pointer disabled:bg-red-900"
              >
                {isAdding ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* --- RE-STYLED MESSAGE (RELATIVE POSITION) --- */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between py-10 border-t-2 border-zinc-900">
                    <div className="flex items-center gap-6">
                      <div className="w-4 h-4 bg-red-800 rounded-full animate-pulse" />
                      <p className="text-[16px] uppercase font-bold tracking-[0.3em] text-zinc-900">
                        Item added to bag
                      </p>
                    </div>
                    <div className="flex gap-12">
                      <button onClick={() => window.location.href = '/cart'} className="text-[13px] uppercase font-bold tracking-[0.3em] text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors">
                        View Bag
                      </button>
                      <button onClick={() => window.location.href = '/checkout'} className="text-[13px] uppercase font-bold tracking-[0.3em] text-red-800 hover:text-red-900 cursor-pointer border-b border-red-800 pb-1">
                        Checkout
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}