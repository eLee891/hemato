"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function ReusablePage() {
  const containerRef = useRef(null);
  
  // ============ EDIT THESE 3 LINES FOR EACH NEW PAGE ============
  const PageSettings = {
    title: "About",
    titleItalic: "Us",
    image: "/about-hero.jpg", // Ensure this file is in your /public folder
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main className="relative w-full bg-white font-sans" ref={containerRef}>
      
      {/* THE FIX: -mt-[80px] forces this section to ignore the navbar 
        and start at the very top of the screen. 
      */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 -mt-[80px]"> 
        
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <img 
            src={PageSettings.image} 
            className="w-full h-full object-cover" 
            alt={PageSettings.title}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <motion.div style={{ opacity: opacityHero }} className="relative z-10 text-center text-white px-6">
          <h1 className="text-[14vw] md:text-[12rem] leading-[0.8] uppercase font-light tracking-tighter">
            {PageSettings.title} <br /> 
            <span className="italic font-serif text-white/90">{PageSettings.titleItalic}</span>
          </h1>
          <div className="w-[1px] h-24 bg-white/40 mx-auto mt-12 animate-pulse" />
        </motion.div>
      </section>

      {/* Chapter Content Starts Below the Hero */}
      <section className="relative z-20 bg-white py-40 md:py-64 px-6 md:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-40">
            <h2 className="text-[10px] font-bold tracking-[0.6em] uppercase text-red-800 mb-10">Chapter I</h2>
            <p className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter mb-10 uppercase">
              {PageSettings.title} <br /> <span className="italic font-serif text-zinc-400">{PageSettings.titleItalic}</span>
            </p>
          </div>
          <div className="lg:col-span-6 pt-10 lg:pt-32">
             <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-zinc-900 mb-12 italic font-serif">
                Add your mission statement or quote here.
             </p>
             <p className="text-lg md:text-xl leading-relaxed text-zinc-500 font-light">
                Add your detailed description here.
             </p>
          </div>
        </div>
      </section>
      
    </main>
  );
}