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
      <section className="relative h-screen w-full overflow-hidden bg-zinc-950 group">
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
                  <Link href={slides[current].link} className="inline-block px-12 py-4 border border-white/40 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-[#1A2233] transition-all duration-500 cursor-pointer">
                    {slides[current].button}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* --- NAVIGATION ARROWS --- */}
        {/* Left Arrow */}
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 text-white/50 hover:text-white transition-colors cursor-pointer focus:outline-none"
        >
          <span className="text-3xl font-extralight" style={{ fontFamily: '"urw-classico", serif' }}>‹</span>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 text-white/50 hover:text-white transition-colors cursor-pointer focus:outline-none"
        >
          <span className="text-3xl font-extralight" style={{ fontFamily: '"urw-classico", serif' }}>›</span>
        </button>
      </section>

{/* --- INTRODUCTION SECTION --- */}
      <section className="py-32 md:py-48 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <h2 className="text-[2.2rem] md:text-[3.8rem] font-light leading-tight mb-10 uppercase tracking-[0.15em]" 
                style={{ color: "#000000", fontFamily: '"urw-classico", serif' }}>
              Hemato Institute <br />
              
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="text-[14px] md:text-[16px] font-light leading-[1.8] mb-20 max-w-2xl mx-auto opacity-80 uppercase tracking-[0.1em]"
               style={{ color: "#000000", fontFamily: '"urw-classico", serif' }}>
              Healthy blood is the key to a healthy body. Hemato Institute is a non-profit organization that operates a 40-acre certified organic farm for its center for research and education, dedicated to advancing human wellness through comprehensive research and education with a specialized focus on the vital role of healthy blood.
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
                  style={{ color: "#000000", fontFamily: '"urw-classico", serif' }}>
              A CENTER FOR NATURAL HEALTH EDUCATION
            </span>
          </motion.div>
        </div>
      </section>

{/* --- UPCOMING EVENTS TITLE (Pure White Background Perfect Match) --- */}

<div className="py-24 md:py-32 bg-white" style={{ backgroundColor: "#FFFFFF" }}>
  <div className="max-w-5xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <h2 className="text-[2.2rem] md:text-[3.8rem] font-light uppercase tracking-[0.2em] leading-tight text-black" 
          style={{ fontFamily: '"urw-classico", serif' }}>
        Upcoming Events
      </h2>
      
      {/* 타이틀 아래 아주 얇은 구분선 (선택 사항: image_3f9e22 느낌) */}
      <div className="mt-12 w-12 border-t border-black/20 mx-auto" />
    </motion.div>
  </div>
</div>

{/* EVENT SLIDER SECTION */}
<section className="pb-12 md:pb-24 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
  <div id="event-slider" className="flex md:grid md:grid-cols-4 gap-6 md:gap-4 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10">
    {events.map((event) => {
      const eventObj = new Date(event.date + '/' + new Date().getFullYear());
      const dayName = eventObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
      const monthShort = eventObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const dayNumber = eventObj.getDate();

      return (
        <Link key={event.id} href={`/events/${event.slug}`} className="no-underline">
          <motion.div className="flex-none w-[85vw] md:w-full snap-start flex flex-col group cursor-pointer">
            
            {/* IMAGE CARD */}
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-sm" style={{ border: `1px solid rgba(0,0,0,0.05)` }}>
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
          </motion.div>
        </Link>
      );
    })}
  </div>

{/* --- VIEW MORE EVENTS BUTTON --- */}
<div className="w-full flex justify-center mt-12 mb-20">
  <Link href="/events" className="no-underline">
    {/* cursor-pointer 클래스를 추가했습니다 */}
    <button className="px-12 py-4 border border-black text-[11px] tracking-[0.5em] uppercase font-light hover:bg-black hover:text-white cursor-pointer transition-all duration-500"
            style={{ fontFamily: '"urw-classico", serif' }}>
      View More Events
    </button>
  </Link>
</div>

  {/* BOTTOM DIVIDER LINE */}
  <div className="w-full max-w-5xl mx-auto border-t mt-20" style={{ borderColor: "rgba(0,0,0,0.08)" }} />
</section>
{/* --- MEMBERSHIP & DONATE SECTION (Hand Cursor Fix) --- */}
      <section className="py-32 md:py-48 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          
          <div className="relative flex flex-col md:flex-row items-stretch">
            
            {/* 1. MEMBERSHIP */}
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-16 justify-between">
              <div className="flex flex-col items-center">
                <span className="text-[10px] tracking-[0.5em] uppercase font-light text-zinc-400 mb-8"
                      style={{ fontFamily: '"urw-classico", serif' }}>
                  01 — Community
                </span>
                <h2 className="text-[2.2rem] md:text-[3.2rem] font-light leading-tight mb-8 uppercase tracking-[0.2em] text-black" 
                    style={{ fontFamily: '"urw-classico", serif' }}>
                  Membership
                </h2>
                <p className="text-[12px] md:text-[14px] font-light leading-relaxed mb-16 max-w-[280px] opacity-60 uppercase tracking-[0.1em]"
                   style={{ fontFamily: '"urw-classico", serif' }}>
                  Become a member today and save every time you shop or learn.
                </p>
              </div>

              {/* Added cursor-pointer here */}
              <Link href="/membership" className="no-underline cursor-pointer">
                <button className="px-12 py-5 border border-black text-[10px] tracking-[0.4em] uppercase font-light hover:bg-black hover:text-white transition-all duration-500 cursor-pointer"
                        style={{ fontFamily: '"urw-classico", serif' }}>
                  Join Membership
                </button>
              </Link>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden md:block h-auto w-[1px]" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

            {/* 2. DONATION */}
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-16 mt-32 md:mt-0 justify-between">
              <div className="flex flex-col items-center">
                <span className="text-[10px] tracking-[0.5em] uppercase font-light text-zinc-400 mb-8"
                      style={{ fontFamily: '"urw-classico", serif' }}>
                  02 — Impact
                </span>
                <h2 className="text-[2.2rem] md:text-[3.2rem] font-light leading-tight mb-8 uppercase tracking-[0.2em] text-black" 
                    style={{ fontFamily: '"urw-classico", serif' }}>
                  Donation
                </h2>
                <p className="text-[12px] md:text-[14px] font-light leading-relaxed mb-16 max-w-[280px] opacity-60 uppercase tracking-[0.1em]"
                   style={{ fontFamily: '"urw-classico", serif' }}>
                  SUPPORT A HEALTHIER FUTURE FOR US AND OUR PLANET
                </p>
              </div>

              {/* Added cursor-pointer here */}
              <Link href="/donate" className="no-underline cursor-pointer">
                <button className="px-12 py-5 border border-black text-[10px] tracking-[0.4em] uppercase font-light hover:bg-black hover:text-white transition-all duration-500 cursor-pointer"
                        style={{ fontFamily: '"urw-classico", serif' }}>
                  Donate Now
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}