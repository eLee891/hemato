"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutContent() {
  const searchParams = useSearchParams();
  
  const planName = searchParams.get("plan") || "Membership";
  const isDonationPage = planName === "Donation";
  const basePrice = parseInt(searchParams.get("price") || "0");
  
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const totalPrice = basePrice; // extraDonation 필요 시 추가
  const emailsMatch = email !== "" && email === confirmEmail;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);
  const formComplete = emailsMatch && isEmailValid && firstName !== "" && lastName !== "";

  return (
    <main className="min-h-screen bg-[#F9F9F9] pt-32 pb-20 px-6 font-sans text-black">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* 왼쪽: 정보 입력 영역 */}
        <div className="lg:col-span-3 space-y-10">
          <section className="bg-white p-8 md:p-12 border border-zinc-200 shadow-sm">
            <h2 className="text-[14px] font-bold uppercase tracking-widest mb-12 border-b pb-4">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="flex flex-col">
                <label className="text-[12px] font-semibold uppercase mb-2">First Name *</label>
                <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="border border-zinc-300 p-3 outline-none focus:border-black transition-colors" />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-semibold uppercase mb-2">Last Name *</label>
                <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" className="border border-zinc-300 p-3 outline-none focus:border-black transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[12px] font-semibold uppercase mb-2">Email Address *</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="example@gmail.com" className="border border-zinc-300 p-3 outline-none focus:border-black transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[12px] font-semibold uppercase mb-2">Confirm Email *</label>
                <input value={confirmEmail} onChange={(e)=>setConfirmEmail(e.target.value)} type="email" className={`border p-3 outline-none transition-colors ${confirmEmail && !emailsMatch ? "border-red-500" : "border-zinc-300 focus:border-black"}`} />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 md:p-12 border border-zinc-200 shadow-sm">
            <h2 className="text-[14px] font-bold uppercase tracking-widest mb-10 border-b pb-4">Payment Details</h2>
            
            <Elements stripe={stripePromise} options={{ mode: 'payment', amount: Math.max(1, totalPrice * 100), currency: 'usd' }}>
              <div className="py-4">
                <PaymentElement options={{ layout: "accordion" }} />
                <div className="mt-10">
                  <CheckoutAction 
                    isReady={formComplete} 
                    totalPrice={totalPrice} 
                    planName={planName} 
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    isDonationPage={isDonationPage}
                  />
                </div>
              </div>
            </Elements>
          </section>
        </div>

        {/* 오른쪽: 주문 요약 영역 */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-100 p-10 sticky top-32 border border-zinc-200">
            <h2 className="text-[16px] font-bold uppercase mb-8 text-center text-black">
              {isDonationPage ? "Donation Summary" : "Your Selection"}
            </h2>
            <div className="space-y-4 border-b border-zinc-300 pb-6 text-[15px]">
              <div className="flex justify-between items-center">
                <span className="font-medium text-zinc-700 uppercase tracking-tight">
                  {isDonationPage ? "Support Gift" : planName}
                </span>
                <span className="font-bold text-black">${totalPrice}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckoutAction({ 
  isReady, 
  totalPrice, 
  planName, 
  email,
  firstName,
  lastName,
  isDonationPage
}: { 
  isReady: boolean, 
  totalPrice: number, 
  planName: string, 
  email: string,
  firstName: string,
  lastName: string,
  isDonationPage: boolean
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements || !agreed || !isReady) return;
    setIsLoading(true);

    try {
      // ✅ 1. 카드 입력 정보의 유효성을 먼저 검사 (이게 빠지면 에러남)
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error(submitError.message);
        setIsLoading(false);
        return;
      }

      // ✅ 2. 서버에서 Client Secret 가져오기
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: Math.round(totalPrice * 100), 
          membershipType: isDonationPage ? "donation" : planName.toLowerCase(),
          email: email,
          firstName,
          lastName
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // ✅ 3. 결제 최종 승인
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { 
          return_url: `${window.location.origin}/success?plan=${planName}&email=${encodeURIComponent(email)}`, 
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`.trim(),
              email: email
            }
          }
        },
      });

      if (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("🔥 Error during checkout:", err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 accent-black cursor-pointer" />
        <label htmlFor="terms" className="text-[13px] font-medium text-zinc-700">
          I agree to the <Link href="/terms" className="underline font-bold text-black">Terms & Conditions</Link>.
        </label>
      </div>
      <button onClick={handleSubmit} disabled={!agreed || !isReady || isLoading}
        className={`w-full py-5 text-[15px] font-bold uppercase transition-all shadow-md ${
          agreed && isReady && !isLoading ? "bg-black text-white hover:bg-zinc-800" : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
        }`}>
        {isLoading ? "Processing..." : isReady ? `Pay $${totalPrice}.00` : "Complete Information"}
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold uppercase tracking-widest text-black">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}