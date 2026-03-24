"use client";

import { useCart } from "../app/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  // Added updateQuantity from context
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // FIX: Calculate Subtotal by multiplying price * quantity for each item
  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout/shop");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-pointer"
          />
          
          {/* SIDEBAR PANEL */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[480px] bg-white h-full shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-8 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={14} className="opacity-50" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.3em]">
                  Your Cart ({cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0)})
                </h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="group p-2 -mr-2">
                <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-8">Your cart is empty.</p>
                  <button onClick={() => setIsOpen(false)} className="text-[11px] font-bold uppercase border-b border-black pb-1">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-8">
                  {cart.map((item: any) => (
                    <div key={item.cartId} className="flex gap-6 mb-10 pb-10 border-b border-zinc-50 last:border-0">
                      <div className="w-24 aspect-[3/4] bg-[#F9F9F9] overflow-hidden flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[12px] font-bold uppercase tracking-tight">{item.title}</h3>
                            <p className="text-[13px] font-medium ml-4">
                              ${(item.price * (item.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-[11px] text-zinc-400 italic font-light">Size: {item.selectedSize}</p>
                        </div>

                        <div className="flex justify-between items-end mt-6">
                          {/* UPDATED: Quantity Selector with logic */}
                          <div className="flex items-center border border-zinc-200">
                            <button 
                              onClick={() => updateQuantity(item.cartId, (item.quantity || 1) - 1)}
                              className="px-3 py-1 hover:bg-zinc-50 transition-colors cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[11px] px-2 w-8 text-center font-bold">{item.quantity || 1}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartId, (item.quantity || 1) + 1)}
                              className="px-3 py-1 hover:bg-zinc-50 transition-colors cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-[10px] uppercase tracking-widest text-zinc-300 hover:text-red-800 underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

{/* FOOTER */}
{cart.length > 0 && (
  <div className="p-8 bg-white border-t border-zinc-100">
    <div className="space-y-4 mb-8">
      <div className="flex justify-between items-center text-zinc-400 font-light">
        <span className="text-[11px] uppercase tracking-widest">Subtotal</span>
        <span className="text-[13px] tracking-widest">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.2em]">Total</span>
        <span className="text-[20px] font-light">${subtotal.toFixed(2)}</span>
      </div>
    </div>

    <button 
      onClick={handleCheckout}
      className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-900 transition-all active:scale-[0.98] cursor-pointer"
    >
      Proceed to Checkout
    </button>
    
    <p className="text-[9px] text-center mt-6 text-zinc-400 uppercase tracking-widest leading-relaxed font-light">
      Secure Payment Processing
    </p>
  </div>
)}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}