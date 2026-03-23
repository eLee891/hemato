"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  
  // URL 파라미터에서 정보 추출 (기본값 설정)
  const planName = searchParams.get("plan") || "Membership";
  const email = searchParams.get("email") || "your email";
  const isDonation = planName === "Donation";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] px-6 text-black font-sans">
      <div className="max-w-md w-full bg-white p-12 border border-zinc-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl">
          {isDonation ? "❤️" : "✓"}
        </div>
        
        <h1 className="text-[24px] font-black uppercase tracking-tighter mb-4">
          {isDonation ? "Donation Received" : "Payment Successful"}
        </h1>
        
        <div className="text-zinc-600 text-[15px] mb-10 leading-relaxed">
          {isDonation ? (
            <p>
              Thank you for your generous gift. <br />
              A receipt has been sent to <br />
              <strong className="text-black">{email}</strong>.
            </p>
          ) : (
            <p>
              Thank you for joining. Your membership is active, and an account for <br />
              <strong className="text-black">{email}</strong> is ready.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Link 
            href="/" 
            className="block w-full py-4 bg-black text-white text-[14px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
          >
            Go to Homepage
          </Link>
          
          <p className="text-[12px] text-zinc-400 italic">
            {isDonation 
              ? "Your support fuels our research initiatives." 
              : "Please check your email to set your password."}
          </p>
        </div>
      </div>
    </main>
  );
}

// Next.js에서 useSearchParams를 사용하려면 Suspense로 감싸야 에러가 나지 않습니다.
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-black uppercase">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}