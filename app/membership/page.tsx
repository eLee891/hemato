"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; // NextAuth로 변경
import Link from "next/link";

const tiers = [
  {
    name: "Individual",
    slug: "individual",
    monthlyPrice: "$10/mo",
    yearlyPrice: "$100/yr",
    monthlyLink: "/checkout?plan=individual&cycle=monthly&price=10",
    yearlyLink: "/checkout?plan=individual&cycle=yearly&price=100",
    benefits: ["10% discount on produce, workshops and products"],
  },
  {
    name: "Family",
    slug: "family",
    monthlyPrice: "$20/mo",
    yearlyPrice: "$200/yr",
    monthlyLink: "/checkout?plan=family&cycle=monthly&price=20",
    yearlyLink: "/checkout?plan=family&cycle=yearly&price=200",
    benefits: ["Individual benefits extend to 2 adults and children under 18"],
  },
  {
    name: "Contributor",
    slug: "contributor",
    monthlyPrice: "$100/mo",
    yearlyPrice: "$1,000/yr",
    monthlyLink: "/checkout?plan=contributor&cycle=monthly&price=100",
    yearlyLink: "/checkout?plan=contributor&cycle=yearly&price=1000",
    benefits: ["25% discount on produce, workshops and products"],
  },
];

export default function MembershipPage() {
  const { data: session, status } = useSession(); // session 정보 사용
  const [isYearly, setIsYearly] = useState(false);
  
  // WordPress 유저의 role이 'member'인지 확인
  const isMember = session?.user?.role === "member";
  const isLoaded = status !== "loading";

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-classico">
        <p className="text-[10px] tracking-[0.4em] uppercase animate-pulse text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-52 pb-24 px-6 md:px-16 font-classico">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER & TOGGLE */}
        <header className="mb-24 text-center">
          <h1 className="text-[12px] font-bold tracking-[0.6em] uppercase mb-4 text-zinc-400">
            Support the Farm
          </h1>
          <h2 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-black mb-12">
            Membership
          </h2>

          <div className="flex justify-center items-center gap-6 text-[10px] font-bold tracking-[0.3em] uppercase">
            <button 
              type="button"
              onClick={() => setIsYearly(false)} 
              className={`transition-colors ${!isYearly ? "text-black border-b border-black pb-1" : "text-zinc-300"}`}
            >
              Monthly
            </button>
            
            <div 
              onClick={() => setIsYearly(!isYearly)}
              className="w-10 h-5 bg-zinc-50 border border-zinc-200 cursor-pointer relative"
            >
              <div className={`absolute top-1 w-2.5 h-2.5 bg-black transition-all duration-300 ${isYearly ? "right-1" : "left-1"}`} />
            </div>

            <button 
              type="button"
              onClick={() => setIsYearly(true)} 
              className={`transition-colors ${isYearly ? "text-black border-b border-black pb-1" : "text-zinc-300"}`}
            >
              Yearly <span className="ml-2 text-amber-600">(Save 15%)</span>
            </button>
          </div>

          {isMember && (
            <div className="mt-12 text-[10px] tracking-[0.2em] text-amber-600 uppercase font-bold">
              ● You are currently an active member
            </div>
          )}
        </header>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-zinc-200">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className="border-r border-b border-zinc-200 p-12 flex flex-col items-start transition-all hover:bg-zinc-50 group"
            >
              <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-black">
                {tier.name}
              </h3>
              <p className="text-2xl font-light tracking-tighter mb-10 text-black">
                {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
              </p>
              
              <ul className="space-y-4 mb-16 flex-1">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="text-[11px] leading-relaxed tracking-widest text-zinc-500 uppercase">
                    — {benefit}
                  </li>
                ))}
              </ul>

              {/* ACTION BUTTON */}
              {isMember ? (
                // 이미 멤버라면? 관리 페이지나 대시보드로 유도 (혹은 버튼 비활성화)
                <div className="w-full text-center border border-zinc-200 py-4 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
                  Current Plan
                </div>
              ) : (
                // 멤버가 아니라면 결제창으로 이동
                <Link 
                  href={isYearly ? tier.yearlyLink : tier.monthlyLink}
                  className="w-full text-center border border-black py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-black hover:text-white"
                >
                  Join Now
                </Link>
              )}
            </div>
          ))}
        </div> 

        <p className="mt-16 text-center text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
          All memberships directly support our educational programs and sustainable farming practices.
        </p>
      </div>
    </main>
  );
}