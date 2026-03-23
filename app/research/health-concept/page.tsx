"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HealthConceptPage() {
  const fontStyle = { fontFamily: "classico-urw, sans-serif" };

  return (
    <main className="relative min-h-screen w-full bg-white text-zinc-900" style={fontStyle}>
      
     {/* --- 1. THE HERO --- */}
<header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"> 
  <div className="absolute inset-0 z-0">
    <img 
      src="/health-concept.png"  /* Updated to .png */
      className="w-full h-full object-cover opacity-60"
      alt="HEALTH CONCEPT HERO"
    />
    <div className="absolute inset-0 bg-black/20" />
  </div>

  <div className="relative z-10 text-center text-white px-6 pt-24">
    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="text-[48px] md:text-[4rem] font-thin tracking-[0.2em] md:tracking-[0.4em] leading-[0.9] uppercase"
    >
      Health <br className="md:hidden" /> Concept
    </motion.h1>
    <motion.div 
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      className="w-[1px] h-24 bg-white/30 mx-auto mt-20 origin-top" 
    />
  </div>
</header>

      {/* --- 2. Overview --- */}
      <section className="relative z-10 py-48 px-6 md:px-10 border-b border-zinc-50 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h4 className="text-[24px] md:text-[42px] font-light tracking-tight text-zinc-800 leading-tight">Overview</h4>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 pb-16 border-b border-zinc-50">
              <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[24px] md:text-[36px] font-extralight leading-snug tracking-tight text-zinc-800">
                We approach human health from a new and practical perspective. Our core concept is that <span className="font-light text-black italic">healthy blood is the key to a healthy body</span>.
              </motion.p>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-inner border border-zinc-100 bg-zinc-50 p-4">
                <Image 
                  src="/logo-concept.png" 
                  alt="Healthy Blood Cell Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-w-768px) 100vw, 400px"
                />
              </motion.div>
            </div>

            <div className="text-[20px] md:text-[28px] font-extralight leading-relaxed tracking-tight text-zinc-700 space-y-10">
              <p>We study scientific evidence that explains how blood is a central part of the human body and how its health is critical to the health of the body as a whole. These studies analyze how nature and the environment affect our blood and thus our overall health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Function --- */}
      <section className="py-48 px-6 md:px-10 border-b border-zinc-50 bg-zinc-50/20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h4 className="text-[22px] md:text-[38px] font-light tracking-tight text-zinc-800 leading-tight mb-3">01. Function</h4>
            <p className="text-[16px] md:text-[20px] italic text-zinc-400 font-light tracking-wide">How the Blood Works</p>
          </div>
          <div className="md:col-span-8 text-[20px] md:text-[28px] font-extralight leading-relaxed tracking-tight text-zinc-700 space-y-10">
            <p className="text-[22px] md:text-[34px] font-light text-black italic leading-snug">Everything must pass through blood.</p>
            <p>Blood regulates all the systems of the body. Blood provides nourishment and gives life, prevents harmful waste buildup, and protects and defends the body against foreign agents.</p>
            <p>Blood serves as a remarkably efficient transport system. The oxygen we inhale, the nutrients and water we consume, and the hormones needed to regulate our body – all of these reach the ~37 trillion cells in our bodies through our blood.</p>
          </div>
        </div>
      </section>

      {/* --- 4. DEFAULT SUPPORT SECTION (Matching Articles/About) --- */}
      <section className="py-40 md:py-60 bg-zinc-50 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[10px] font-bold tracking-[0.8em] uppercase text-zinc-300 mb-12">02 — SUPPORT</h2>
          <p className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-16 text-zinc-900 leading-tight">
            A Healthier Future
          </p>
          <p className="text-[13px] md:text-[14px] leading-[2.5] text-zinc-500 font-light tracking-[0.15em] uppercase max-w-2xl mx-auto mb-20">
            WE BELIEVE IN A HEALTHIER FUTURE FOR US AND OUR PLANET. YOUR SUPPORT DRIVES INDEPENDENT RESEARCH.
          </p>
          <Link 
            href="/donate" 
            className="inline-block px-16 py-6 border border-zinc-200 text-zinc-900 text-[9px] font-bold tracking-[0.6em] uppercase hover:border-zinc-900 transition-all duration-1000"
          >
            Donate
          </Link>
        </div>
      </section>
      
    </main>
  );
}