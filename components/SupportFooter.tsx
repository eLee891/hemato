"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SupportFooter() {
  const classicoStyle = { fontFamily: '"urw-classico", serif' };

  return (
    <footer className="w-full bg-[#FAF9F6] pt-20 pb-12 px-6 md:px-12 lg:px-24 border-t border-zinc-100">
      <div className="max-w-[1800px] mx-auto w-full">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-24">
          
          {/* Section 1: VISIT THE FARM */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-[16px] font-bold tracking-tight text-[#1A1D33] uppercase" style={classicoStyle}>
              Visit the Farm
            </h4>
            <div className="flex flex-col gap-1 text-[14px] font-light text-[#1A1D33]/70 leading-relaxed italic" style={classicoStyle}>
              <p>50 Orchard Hill Rd</p>
              <p>Katonah, NY 10536</p>
            </div>
            <ul className="flex flex-col gap-4 text-[14px] font-light text-[#1A1D33]/70">
              <li>
                <Link href="/events" className="hover:underline decoration-[#E31B23] uppercase tracking-[0.3em] text-[11px] font-bold" style={classicoStyle}>
                  Events →
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2: LEARN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-[16px] font-bold tracking-tight text-[#1A1D33] uppercase" style={classicoStyle}>
              Learn
            </h4>
            <ul className="flex flex-col gap-4 text-[14px] font-light text-[#1A1D33]/70" style={classicoStyle}>
              <li><Link href="/about" className="hover:underline decoration-[#E31B23]">About Us</Link></li>
              <li><Link href="/research" className="hover:underline decoration-[#E31B23]">Research</Link></li>
              <li><Link href="/farm" className="hover:underline decoration-[#E31B23]">Farm</Link></li>
            </ul>
          </div>

          {/* Section 3: ACCOUNT */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-[16px] font-bold tracking-tight text-[#1A1D33] uppercase" style={classicoStyle}>
              Account
            </h4>
            <ul className="flex flex-col gap-4 text-[14px] font-light text-[#1A1D33]/70" style={classicoStyle}>
              <li><Link href="/manage" className="hover:underline decoration-[#E31B23]">Manage Subscriptions</Link></li>
              <li><Link href="/signup" className="hover:underline decoration-[#E31B23]">Sign Up</Link></li>
            </ul>
          </div>

          {/* Section 4: NEWSLETTER */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-12">
            <h4 className="text-[16px] font-bold tracking-tight text-[#1A1D33] uppercase" style={classicoStyle}>
              Join the Farm Family
            </h4>
            <p className="text-[13px] text-zinc-500 leading-relaxed font-light max-w-sm" style={classicoStyle}>
              Be the first to know about new research and events of daily life at the institute.
            </p>
            <form className="flex border-b border-zinc-400 pb-2 mt-4 group max-w-md">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent w-full text-[13px] font-light outline-none placeholder:text-zinc-300 text-[#1A1D33] uppercase tracking-widest"
                style={classicoStyle} 
              />
              <button className="text-[11px] font-bold tracking-widest uppercase text-[#1A1D33] hover:text-[#E31B23] transition-colors" style={classicoStyle}>
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* --- LOGO & SOCIAL BAR --- */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t border-zinc-200">
          <div className="mb-8 md:mb-0">
             <span className="text-[28px] md:text-[38px] tracking-[0.15em] text-[#1A1D33] font-light flex items-center" style={classicoStyle}>
               HEMAT<span className="text-[#E31B23]">O</span> INSTITUTE
             </span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-[#1A1D33]/60 hover:text-[#E31B23] transition-colors" style={classicoStyle}>Instagram</a>
            <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-[#1A1D33]/60 hover:text-[#E31B23] transition-colors" style={classicoStyle}>TikTok</a>
            <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-[#1A1D33]/60 hover:text-[#E31B23] transition-colors" style={classicoStyle}>YouTube</a>
          </div>
        </div>

        {/* --- LEGAL BAR --- */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-light" style={classicoStyle}>
          <div className="flex flex-wrap gap-x-10 gap-y-4 mb-6 md:mb-0 justify-center">
            <Link href="/privacy" className="hover:text-[#1A1D33]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#1A1D33]"></Link>
            <Link href="/shipping" className="hover:text-[#1A1D33]"></Link>
          </div>
          <p>© 2026 Hemato Institute</p>
        </div>

      </div>
    </footer>
  );
}