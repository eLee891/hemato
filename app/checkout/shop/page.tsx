"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/CartContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ShopCheckoutPage() {
  const { cart } = useCart();
  const [email, setEmail] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  // Calculate Subtotal and Total including shipping
  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);
  const shippingCost = shippingMethod === "express" ? 25 : 15;
  const totalPrice = subtotal + shippingCost;

  return (
    <main className="min-h-screen bg-[#F9F9F9] pt-32 pb-20 px-6 text-black font-sans">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* LEFT: SHIPPING & PAYMENT */}
        <div className="lg:col-span-3 space-y-8">
          <Elements 
            stripe={stripePromise} 
            options={{ 
              mode: 'payment', 
              amount: Math.max(1, Math.round(totalPrice * 100)), 
              currency: 'usd',
              appearance: { theme: 'flat' } 
            }}
          >
            
            {/* 1. CONTACT & SHIPPING */}
            <section className="bg-white p-8 md:p-10 border border-zinc-200 shadow-sm">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-10 border-b pb-4">Shipping Details</h2>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase mb-2 tracking-widest opacity-50">Email Address</label>
                  <input 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="email" 
                    placeholder="email@example.com" 
                    className="border border-zinc-200 p-4 outline-none focus:border-black transition-colors text-sm" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase mb-2 tracking-widest opacity-50">Shipping Address</label>
                  <AddressElement options={{ mode: 'shipping', allowedCountries: ['CA', 'US'] }} />
                </div>
              </div>
            </section>

            {/* 2. SHIPPING METHOD */}
            <section className="bg-white p-8 md:p-10 border border-zinc-200 shadow-sm">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-8 border-b pb-4">Shipping Method</h2>
              <div className="grid grid-cols-1 gap-4">
                <label className={`flex justify-between items-center p-5 border cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-black bg-zinc-50' : 'border-zinc-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-black" />
                    <span className="text-xs uppercase tracking-widest font-medium">Standard Shipping</span>
                  </div>
                  <span className="text-sm font-bold">$15.00</span>
                </label>
                <label className={`flex justify-between items-center p-5 border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-black bg-zinc-50' : 'border-zinc-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="accent-black" />
                    <span className="text-xs uppercase tracking-widest font-medium">Express Courier</span>
                  </div>
                  <span className="text-sm font-bold">$25.00</span>
                </label>
              </div>
            </section>

            {/* 3. PAYMENT */}
            <section className="bg-white p-8 md:p-10 border border-zinc-200 shadow-sm">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-8 border-b pb-4">Payment</h2>
              <PaymentElement options={{ layout: "accordion" }} />
              <div className="mt-12">
                <ShopCheckoutAction 
                  totalPrice={totalPrice} 
                  email={email} 
                  cart={cart}
                />
              </div>
            </section>
          </Elements>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-100 p-10 sticky top-32 border border-zinc-200">
            <h2 className="text-[14px] font-bold uppercase tracking-widest mb-10 border-b border-zinc-300 pb-4">Summary</h2>
            <div className="space-y-6 mb-10">
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start text-[12px] uppercase tracking-wider">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-black">{item.title} x{item.quantity}</span>
                    <span className="opacity-40 italic">Size: {item.selectedSize}</span>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-300">
              <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-60">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-60">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-[18px] text-black pt-4">
                 <span>Total</span>
                 <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShopCheckoutAction({ totalPrice, email, cart }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements || !email) {
      alert("Please complete all details.");
      return;
    }

    setIsLoading(true);

    // 1. Validate Payment and Address info
    const { error: submitError } = await elements.submit();
    if (submitError) { setIsLoading(false); return; }

    // 2. Extract Customer Name from Address Element
    const addressElement = elements.getElement('address');
    const { value: addressValue } = await addressElement!.getValue();
    const fullName = addressValue.name || "Customer";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    // 3. Format detailed item string for Stripe Metadata
    const itemSummary = cart.map((i: any) => 
      `${i.title} (${i.selectedSize}) x${i.quantity}`
    );

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: Math.round(totalPrice * 100), 
          type: "shop_order",
          email,
          firstName,
          lastName,
          items: itemSummary 
        }),
      });

      const { clientSecret } = await response.json();

      await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { 
          return_url: `${window.location.origin}/success?type=shop`, 
          billing_details: { 
            name: fullName,
            email: email 
          }
        },
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubmit} 
      disabled={isLoading || totalPrice === 0}
      className="w-full bg-black text-white py-6 text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 disabled:bg-zinc-200 transition-all cursor-pointer"
    >
      {isLoading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
    </button>
  );
}