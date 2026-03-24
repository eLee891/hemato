"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext"; // Ensure this path is correct

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  // Extract info from URL parameters
  const type = searchParams.get("type"); // 'shop', 'membership', or 'donation'
  const planName = searchParams.get("plan") || "Membership";
  const email = searchParams.get("email") || "your email";
  
  const isDonation = planName === "Donation" || type === "donation";
  const isShop = type === "shop";

  // Automatically clear the cart if the purchase was for shop items
  useEffect(() => {
    if (isShop && clearCart) {
      clearCart();
    }
  }, [isShop, clearCart]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] px-6 text-black font-sans">
      <div className="max-w-md w-full bg-white p-12 border border-zinc-200 shadow-sm text-center">
        
        {/* ICON Logic */}
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl">
          {isDonation ? "❤️" : isShop ? "🛍️" : "✓"}
        </div>
        
        {/* HEADER Logic */}
        <h1 className="text-[20px] font-black uppercase tracking-widest mb-4">
          {isDonation ? "Donation Received" : isShop ? "Order Confirmed" : "Payment Successful"}
        </h1>
        
        {/* DESCRIPTION Logic */}
        <div className="text-zinc-600 text-[14px] mb-10 leading-relaxed font-light">
          {isDonation ? (
            <p>
              Thank you for your generous gift. <br />
              A tax receipt has been sent to <br />
              <strong className="text-black font-bold">{email}</strong>.
            </p>
          ) : isShop ? (
            <p>
              Thank you for your purchase. We are preparing your items. <br />
              An order confirmation has been sent to <br />
              <strong className="text-black font-bold">{email}</strong>.
            </p>
          ) : (
            <p>
              Thank you for joining. Your membership is active, and an account for <br />
              <strong className="text-black font-bold">{email}</strong> is ready.
            </p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="space-y-4">
          <Link 
            href={isShop ? "/shop" : "/"} 
            className="block w-full py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all"
          >
            {isShop ? "Back to Shop" : "Go to Homepage"}
          </Link>
          
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
            {isDonation 
              ? "Your support fuels our research initiatives." 
              : isShop 
              ? "You will receive a tracking number once shipped." 
              : "Please check your email to set your password."}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-black uppercase tracking-widest text-[11px]">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}