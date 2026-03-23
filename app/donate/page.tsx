"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DonationPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("One-time");

  const donationAmounts = [100, 200, 500, 1000];

  const handleProceed = () => {
    const finalAmount = selectedAmount || parseInt(customAmount);
    if (finalAmount > 0) {
      // 체크아웃 페이지로 금액과 플랜 정보 전달
      router.push(`/checkout?plan=Donation&price=${finalAmount}`);
    } else {
      alert("Please select or enter an amount.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F9] pt-40 pb-20 px-6 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* 상단 타이틀 섹션 */}
<section className="mb-20 text-center md:text-left">
  <h1 className="text-[32px] md:text-[42px] font-bold mb-6 text-black tracking-tight">
    Make a Donation
  </h1>
  <div className="text-[16px] leading-relaxed text-zinc-600 max-w-2xl space-y-4">
    <p>
      Thank you for sustaining Hemato Institute! All donations directly impact 
      our organization and help us further our mission.
    </p>
    <p>
      If you have any questions, or would like to speak with a member of our 
      advancement team, please contact{" "}
      <a 
        href="mailto:info@hcli.com" 
        className="text-black font-bold underline hover:text-zinc-700 transition-colors"
      >
        info@hcli.com
      </a>.
    </p>
  </div>
</section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* 왼쪽: 기부 설정 섹션 */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 border border-zinc-200 shadow-sm">
              
              {/* 기부 빈도 선택 (One-time / Monthly) */}
              <div className="flex justify-center md:justify-start mb-10">
                <div className="inline-flex bg-zinc-100 p-1 rounded-full">
                  {["One-time", "Monthly"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFrequency(type)}
                      className={`px-8 py-2 rounded-full text-[14px] font-bold transition-all ${
                        frequency === type ? "bg-white text-black shadow-sm" : "text-zinc-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 금액 선택 그리드 */}
              <h3 className="text-[12px] font-bold uppercase tracking-widest mb-6 text-black">
                Choose an amount (USD)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {donationAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-4 border text-[16px] font-bold transition-all ${
                      selectedAmount === amt ? "bg-black text-white border-black" : "bg-white border-zinc-200 text-zinc-600 hover:border-black"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* 직접 입력 (Other) */}
              <div className="relative mt-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Other Amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full border border-zinc-200 p-4 pl-8 text-[16px] font-bold outline-none focus:border-black transition-colors"
                />
              </div>

              {/* 기부 옵션 체크박스 */}
              <div className="mt-10 pt-8 border-t border-zinc-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="h-4 w-4 accent-black" />
                  <span className="text-[14px] text-zinc-600 group-hover:text-black">
                    Dedicate my donation in honor or in memory of someone
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* 오른쪽: 요약 및 결제 진행 */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-100 p-8 sticky top-40 border border-zinc-200">
              <h2 className="text-[16px] font-bold uppercase mb-8 text-black text-center">Summary</h2>
              
              <div className="space-y-4 border-b border-zinc-300 pb-6 text-[15px]">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-zinc-700">{frequency} Gift</span>
                  <span className="font-bold text-black">
                    ${selectedAmount || (customAmount ? parseInt(customAmount) : 0)}.00
                  </span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center text-[18px] font-black mb-10 uppercase">
                <span>Total</span>
                <span>${selectedAmount || (customAmount ? parseInt(customAmount) : 0)}.00</span>
              </div>

              <button
                onClick={handleProceed}
                className="w-full bg-black text-white py-5 text-[15px] font-bold uppercase hover:bg-zinc-800 transition-all shadow-md"
              >
                Proceed to Checkout
              </button>

              <p className="text-[11px] text-zinc-400 mt-6 text-center leading-relaxed">
                Your contribution directly supports our mission. <br />
                Hemato Institute is a 501(c)(3) nonprofit.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}