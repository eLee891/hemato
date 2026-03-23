"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-64 pb-80 px-6 md:px-16 lg:px-24 text-black font-classico">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- PAGE TITLE --- */}
        <header className="mb-32 border-b-[3px] border-black pb-12">
          <h1 className="text-[48px] md:text-[64px] font-bold uppercase no-gap">About Us</h1>
        </header>

        {/* --- SECTION: MISSION --- */}
        <section className="border-b border-black/10">
          <div className="flex justify-between items-center py-8 cursor-pointer group">
            <h2 className="text-[24px] font-black uppercase no-gap">Our Mission</h2>
            <span className="text-3xl font-light">−</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-24 pt-4">
            
            {/* 1. IMAGE COLUMN */}
            <div className="md:col-span-3">
              <div className="w-full mb-6">
                <img src="Apple trees.jpg" alt="Mission" className="w-full h-auto block" />
              </div>
              <p className="text-[14px] leading-snug no-gap font-medium italic opacity-80">
                Founded in 2010, Hemato Institute is a non-profit organization dedicated to advancing the understanding of human health.
              </p>
            </div>

            {/* 2. PROGRAM FEATURES COLUMN */}
            <div className="md:col-span-4 px-0 md:px-10 border-l border-black/10">
              <h3 className="text-[11px] font-black uppercase mb-8 no-gap opacity-40">Core Philosophy</h3>
              <ul className="space-y-6 text-[15px] leading-tight no-gap font-bold">
                <li className="flex gap-3"><span>•</span> <span>The vital role of blood in the human body.</span></li>
                <li className="flex gap-3"><span>•</span> <span>Discovery of full potential in health.</span></li>
                <li className="flex gap-3"><span>•</span> <span>Multidisciplinary approach to wellness.</span></li>
              </ul>
            </div>

            {/* 3. DESCRIPTION COLUMN */}
            <div className="md:col-span-5 border-l border-black/10 pl-10">
              <h3 className="text-[11px] font-black uppercase mb-8 no-gap opacity-40">Vision</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-[16px] font-black uppercase no-gap mb-4">Holistic Health</h4>
                  <p className="text-[15px] leading-[1.6] opacity-80 no-gap font-light">
                    We believe that the key to understanding health lies in the vital role that blood plays in our body. By approaching our health through this perspective, we believe we can discover new ways to realize the full potential of our health.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- RESEARCH & EDUCATION (Closed States) --- */}
        <section className="border-b border-black/10">
          <div className="flex justify-between items-center py-12 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
            <h2 className="text-[24px] font-black uppercase no-gap">Research</h2>
            <span className="text-3xl font-light">+</span>
          </div>
        </section>

        <section className="border-b border-black/10">
          <div className="flex justify-between items-center py-12 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
            <h2 className="text-[24px] font-black uppercase no-gap">Education</h2>
            <span className="text-3xl font-light">+</span>
          </div>
        </section>

      </div>

      <style jsx global>{`
        /* Global Font Override */
        .font-classico {
          font-family: "classico-urw", sans-serif !important;
          color: #000000 !important;
          -webkit-font-smoothing: antialiased;
        }

        /* The "No Gap" Logic: Ensures letters are tight like the reference photo */
        .no-gap {
          letter-spacing: -0.02em !important; 
        }

        /* Bold Weights for Headings */
        h1, h2, h3, h4, button {
          font-weight: 900 !important;
          letter-spacing: -0.04em !important; /* Extra tight for large titles */
        }

        p {
          font-weight: 400;
          letter-spacing: -0.01em !important;
        }

        ul li {
          font-weight: 700;
        }
      `}</style>
    </main>
  );
}