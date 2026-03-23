"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const historyStories = [
  {
    date: "1800s - 1920s",
    title: "Establishment & Hollywood Roots",
    content: "Established by farmers in the 1800s, the farm was transformed into an estate in the 1920s by Jack Cohn, founder of Columbia Pictures. It is believed this grand colonial residence inspired the film 'Gone with the Wind'.",
    image: "https://hematoinstitute.org/wp-content/uploads/2025/03/Movies.png"
  },
  {
    date: "1960s",
    title: "Historic Amenities & Freedomland",
    content: "Under Jack Cohn, the farm expanded with stables, tennis courts, and a 62’ pool. It features a children’s mini-railroad station salvaged from the former Freedomland Amusement Park in Queens, which closed in the 1960s.",
    image: "https://hematoinstitute.org/wp-content/uploads/2024/12/IMG_0544.jpg"
  },
  {
    date: "2000s",
    title: "Angle Fly Preserve",
    content: "The farm is surrounded by the 654-acre Angle Fly Preserve, a natural sanctuary in Westchester County. This protected land provides a serene border of majestic trees and local wildlife that complements our organic mission.",
    image: "https://hematoinstitute.org/wp-content/uploads/2024/12/DSC_1547-scaled.jpg"
  },
  {
    date: "PRESENT",
    title: "40 Acres of Pure Organic Soil",
    content: "Now a 40-acre sanctuary, our soil remains untouched by synthetic pesticides or GMOs, exceeding organic standards. Our old apple orchards stand as a staple of our history, inviting visitors to experience an organic lifestyle.",
    image: "https://hematoinstitute.org/wp-content/uploads/2024/12/DSC_2175-scaled.jpg"
  }
];

export default function HistoryPage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-zinc-900">
      
      {/* --- 1. THE HERO (NAV FIX) --- */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950"> 
        <div className="absolute inset-0 z-0">
          <img 
            src="https://hematoinstitute.org/wp-content/uploads/2025/03/Movies.png" 
            className="w-full h-full object-cover opacity-40 grayscale" 
            alt="History Hero"
          />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[0.6em] uppercase"
          >
            Our <span className="italic opacity-70">History</span>
          </motion.h1>
          <div className="w-[1px] h-24 bg-white/20 mx-auto mt-16" />
        </div>
      </header>

      {/* --- 2. TIMELINE SECTION --- */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-48">
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 -translate-x-1/2 hidden md:block" />

          <div className="space-y-48 md:space-y-64">
            {historyStories.map((story, index) => (
              <TimelineEntry key={index} story={story} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. DEFAULT SUPPORT SECTION --- */}
      <section className="py-40 md:py-60 bg-zinc-50 text-center px-6 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[10px] font-bold tracking-[0.8em] uppercase text-zinc-300 mb-12">02 — SUPPORT</h2>
          <p className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-16 text-zinc-900 leading-tight">
            Preserve the Future
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

function TimelineEntry({ story, index }: { story: any, index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Dot on the Timeline */}
      <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-300 rounded-full z-10 hidden md:block" />

      {/* Content Side */}
      <div className="w-full md:w-1/2 space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-300 uppercase block">
            {story.date}
          </span>
          <h3 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-zinc-900 leading-tight">
            {story.title}
          </h3>
        </div>
        <p className="text-zinc-500 font-light leading-relaxed text-[17px] max-w-lg">
          {story.content}
        </p>
      </div>

      {/* Image Side */}
      <div className="w-full md:w-1/2">
        <div className="aspect-[16/10] overflow-hidden bg-zinc-50 grayscale hover:grayscale-0 transition-all duration-[2s] ease-out">
          <motion.img 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={story.image} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}