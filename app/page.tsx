"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "contentful";
import Link from "next/link";
import React from 'react';

const client = createClient({
  space: "2q8npu73arud",
  accessToken: "2FzBrMO-7Z7upvOkl3aecYLTl2n9rdaBwChkApCf8I4",
});

const slides = [
  { id: 1, title: "Welcome", description: "Hemato Institute is a non-profit organization that operates a 40-acre certified organic farm for its center for research and education.", button: "About Us", link: "/about", image: "/bg1.png" },
  { id: 2, title: "Learn About Health", description: "Our innovative and independent research focuses on the role of blood in our health.", button: "Learn More", link: "/research/health-concept", image: "/bg2.png" },
  { id: 3, title: "Experience Our Farm", description: "Follow our journey to grow healthy and nutritious food by regenerating the soil.", button: "Explore", link: "/events", image: "/bg3.png" }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  const colors = {
    primary: "#2C2825",    
    secondary: "#A89F94",  
    background: "#F9F8F6", 
    border: "#EAE7E2"      
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await client.getEntries({
          content_type: "event", 
          order: "fields.date" as any,
          limit: 4, 
        });
        const formatted = response.items.map((item: any) => ({
          id: item.sys.id,
          title: item.fields.title || "Untitled Event",
          slug: item.fields.slug,
          
          date: new Date(item.fields.date).toLocaleDateString('en-US', { 
            month: '2-digit', day: '2-digit', timeZone: 'America/New_York' 
          }),
          imageUrl: item.fields.image?.fields?.file?.url 
            ? `https:${item.fields.image.fields.file.url}` 
            : null,
        }));
        setEvents(formatted);
      } catch (error) {
        console.error("Contentful Error:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden" style={{ backgroundColor: colors.background }}>
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${slides[current].image})` }} 
            >
              <div className="absolute inset-0 bg-zinc-900/40 mix-blend-multiply" />
            </motion.div>
            
            <div className="relative h-full flex items-center justify-center">
              <div className="container mx-auto px-6 max-w-[1700px] text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-light mb-6 tracking-[0.15em] uppercase leading-tight" style={{ fontFamily: '"urw-classico", sans-serif' }}>
                    {slides[current].title}
                  </h1>
                  <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] max-w-xl mx-auto mb-10 font-light leading-relaxed opacity-90 tracking-wide">
                    {slides[current].description}
                  </p>
                  <Link href={slides[current].link} className="inline-block px-12 py-4 border border-white/40 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-[#1A2233] transition-all duration-500">
                    {slides[current].button}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* --- INTRODUCTION SECTION --- */}
      <section className="py-32 md:py-48 px-6 md:px-12" style={{ backgroundColor: colors.background }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <h2 className="text-[2.2rem] md:text-[3.8rem] font-light leading-tight mb-10 uppercase tracking-[0.15em]" 
                style={{ color: colors.primary, fontFamily: '"urw-classico", serif' }}>
              Hemato Institute <br />
              Research Institute
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="text-[14px] md:text-[16px] font-light leading-[1.8] mb-20 max-w-2xl mx-auto opacity-80 uppercase tracking-[0.1em]"
               style={{ color: colors.primary, fontFamily: '"urw-classico", serif' }}>
              Hemato Institute is a non-profit organization that operates a 40-acre certified organic farm for its center for research and education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="pt-10 border-t"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <span className="text-[10px] md:text-[12px] tracking-[0.6em] uppercase font-light"
                  style={{ color: colors.primary, fontFamily: '"urw-classico", serif' }}>
              A Leader in Regenerative Soil Research
            </span>
          </motion.div>
        </div>
      </section>

{/* --- UPCOMING EVENTS --- */}
      <div className="w-full px-6 md:px-12 pt-32 pb-8 flex justify-between items-end" style={{ backgroundColor: colors.background }}>
        <h2 className="text-[20px] md:text-[22px] font-light tracking-[0.05em] uppercase opacity-90" 
            style={{ color: colors.primary, fontFamily: '"urw-classico", serif' }}>
          Upcoming Events & Workshops
        </h2>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => document.getElementById('event-slider')?.scrollBy({ left: -400, behavior: 'smooth' })}
            className="p-3 border border-[#EAE7E2] rounded-full hover:bg-white transition-all group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={() => document.getElementById('event-slider')?.scrollBy({ left: 400, behavior: 'smooth' })}
            className="p-3 border border-[#EAE7E2] rounded-full hover:bg-white transition-all group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <section className="pb-12 md:pb-24 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: colors.background }}>
        <div id="event-slider" className="flex md:grid md:grid-cols-4 gap-6 md:gap-4 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10">
          {events.map((event) => {
            const eventObj = new Date(event.date + '/' + new Date().getFullYear());
            const dayName = eventObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
            const monthShort = eventObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayNumber = eventObj.getDate();

            return (
<Link key={event.id} href={`/events/${event.slug}`} className="no-underline">
  <motion.div className="flex-none w-[85vw] md:w-full snap-start flex flex-col group cursor-pointer">
    
    <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg mb-6 shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
      {/* 🚨 FIX: Ensure this matches your library (event.image vs event.imageUrl) */}
      <img 
        src={event.image || event.imageUrl} 
        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[4s] ease-out" 
        alt={event.title}
      />
      
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
      
      <div className="absolute top-[50%] left-10 right-10 transform -translate-y-[50%] text-center">
        <h3 className="text-[1.8rem] font-extralight leading-tight text-white uppercase tracking-[0.15em]" style={{ fontFamily: '"urw-classico", serif' }}>
          {event.title}
        </h3>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex justify-between text-white/90 text-[9px] font-light tracking-[0.2em]" style={{ fontFamily: '"urw-classico", serif' }}>
        <span className="uppercase font-medium">Workshop</span>
        <span className="uppercase">{dayName} {monthShort} {dayNumber}</span>
      </div>
    </div>

    {/* 🚨 FIX: Removed 'href' from the div because the whole card is already a Link */}
    <div className="w-full py-4 px-6 text-[10px] font-light tracking-[0.4em] uppercase text-center" 
         style={{ border: `1px solid ${colors.border}`, color: colors.secondary, fontFamily: '"urw-classico", serif' }}>
      View Details →
    </div>

  </motion.div>
</Link>
            );
          })}
        </div>
      </section>

      {/* --- REFINED MEMBERSHIP & DONATE SECTION --- */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24" style={{ backgroundColor: colors.background }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32">
            
            {/* 1. MEMBERSHIP */}
            <div className="md:col-span-5 flex flex-col">
              <div className="aspect-[4/5] w-full mb-10 rounded-sm overflow-hidden group relative">
                <img 
                  src="/member.jpg" 
                  alt="Membership" 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="max-w-xs">
                <span className="text-[10px] tracking-[0.5em] uppercase font-light opacity-50 mb-4 block">
                  Community
                </span>
                <h3 className="text-[54px] md:text-[64px] font-medium leading-[1.1] mb-6" 
                    style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary }}>
                  Membership
                </h3>
                <p className="text-[15px] leading-relaxed font-light opacity-60 mb-10">
                  Join our community and help us build a lasting relationship with the land through soil research.
                </p>
                <Link href="/membership" className="inline-block border border-black px-10 py-5 text-[10px] tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-500">
                  Become a Member
                </Link>
              </div>
            </div>

            {/* 2. DONATION */}
            <div className="md:col-span-6 md:col-start-7 flex flex-col">
              <div className="aspect-[1.2/1] w-full mb-10 rounded-sm overflow-hidden group relative">
                <img 
                  src="/donate.jpeg" 
                  alt="Donate" 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                  <span className="text-[10px] tracking-[0.5em] uppercase font-light opacity-50 mb-4 block">
                    Impact
                  </span>
                  <h3 className="text-[54px] md:text-[64px] font-medium leading-[1.1]" 
                      style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary }}>
                    Donation
                  </h3>
                </div>
                <div className="max-w-[280px] md:pt-14">
                  <p className="text-[14px] leading-relaxed font-light opacity-60 mb-10">
                    A one-time gift to fuel our soil research and workshop initiatives. Your support sustains our mission.
                  </p>
                  <Link href="/donate" className="inline-block border border-black px-10 py-5 text-[10px] tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-500">
                    Contribute Now
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="pb-32" style={{ backgroundColor: colors.background }} />
    </main>
  );
}