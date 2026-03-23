"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  // Mock data - in a real app, this would come from a state provider like Zustand or Context
  const cartItems = [
    {
      id: 1,
      title: "Saliva Book",
      price: 105.00,
      quantity: 1,
      image: "/saliva-book-cover.jpg",
      language: "English"
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main className="min-h-screen bg-white pt-44 pb-40 px-6 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        <header className="border-b border-zinc-100 pb-8 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-2">Review</h2>
            <h1 className="text-5xl font-light tracking-tighter uppercase">Shopping Bag</h1>
          </div>
          <Link href="/shop" className="text-[10px] uppercase tracking-widest border-b border-zinc-900 pb-1 hover:text-red-800 hover:border-red-800 transition-all">
            Continue Shopping
          </Link>
        </header>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* --- LEFT: ITEMS LIST --- */}
            <div className="lg:col-span-8">
              <div className="space-y-12">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-8 border-b border-zinc-50 pb-12">
                    <div className="w-32 h-40 bg-[#F9F9F9] flex-shrink-0 flex items-center justify-center p-4">
                      <img src={item.image} alt={item.title} className="max-h-full w-auto object-contain shadow-sm" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-medium uppercase tracking-tight">{item.title}</h3>
                          <button className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-red-800">Remove</button>
                        </div>
                        <p className="text-zinc-400 text-sm mt-1">Language: {item.language}</p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex border border-zinc-200 px-4 py-2 gap-6 items-center">
                          <button className="text-zinc-400 hover:text-zinc-900">-</button>
                          <span className="text-xs font-medium">{item.quantity}</span>
                          <button className="text-zinc-400 hover:text-zinc-900">+</button>
                        </div>
                        <p className="text-lg font-light">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT: SUMMARY --- */}
            <div className="lg:col-span-4">
              <div className="bg-[#F9F9F9] p-8 space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-zinc-200 pb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 font-light">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 font-light">Shipping</span>
                    <span className="italic text-zinc-400 text-xs">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-zinc-200 pt-4 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-zinc-900 text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-red-900 transition-all duration-500">
                  Proceed to Checkout
                </button>

                <div className="pt-4 flex flex-col gap-2">
                   <p className="text-[9px] text-zinc-400 uppercase tracking-widest leading-loose">
                     Secure checkout powered by Stripe. All publications are shipped globally from Germany.
                   </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-400 italic mb-8">Your bag is currently empty.</p>
            <Link href="/shop" className="bg-zinc-900 text-white px-12 py-4 text-[10px] font-bold uppercase tracking-widest">
              Return to Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}