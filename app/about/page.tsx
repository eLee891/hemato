"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const [openSection, setOpenSection] = useState<string | null>("mission");
  const classicoStyle = { fontFamily: '"urw-classico", serif' };

  return (
    <main className="min-h-screen bg-white pt-48 pb-60 px-6 md:px-12 lg:px-24 text-[#1A1D33]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- ACCORDION AREA --- */}
        <div className="border-t border-zinc-100">
          
          {/* --- SECTION 1: OUR MISSION --- */}
          <div className="border-b border-zinc-100">
            <button 
              onClick={() => setOpenSection(openSection === "mission" ? null : "mission")}
              className="w-full flex justify-between items-center py-12 cursor-pointer text-left focus:outline-none"
            >
              <h2 className="text-[18px] md:text-[22px] font-medium uppercase tracking-[0.2em]" style={classicoStyle}>
                Our Mission
              </h2>
              <span className={`text-xl transition-transform duration-500 ${openSection === 'mission' ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>

            <AnimatePresence>
              {openSection === "mission" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-12 pb-24 pt-8">
                    <div className="md:col-span-4">
                      {/* Replace "mission.jpg" with your actual file name in /public */}
                      <img src="/Apple trees.jpg" alt="Our Mission" className="w-full h-auto object-cover mb-8" />
                      <p className="text-[14px] leading-relaxed italic opacity-60" style={classicoStyle}>
                        Founded in 2010, Hemato Institute is a non-profit organization dedicated to advancing the understanding of human health.
                      </p>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-[10px] font-bold uppercase mb-10 tracking-[0.4em] opacity-30" style={classicoStyle}>Core Philosophy</h3>
                      <ul className="space-y-8 text-[15px] font-light text-[#1A1D33]" style={classicoStyle}>
                        <li className="flex gap-4"><span>•</span> <span>The vital role of blood in the human body.</span></li>
                        <li className="flex gap-4"><span>•</span> <span>Discovery of full potential in health.</span></li>
                        <li className="flex gap-4"><span>•</span> <span>Multidisciplinary approach to wellness.</span></li>
                      </ul>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-[10px] font-bold uppercase mb-10 tracking-[0.4em] opacity-30" style={classicoStyle}>Vision</h3>
                      <h4 className="text-[18px] font-medium uppercase mb-6 tracking-widest text-[#1A1D33]" style={classicoStyle}>Holistic Health</h4>
                      <p className="text-[15px] leading-[1.8] opacity-70 font-light" style={classicoStyle}>
                        We believe that the key to understanding health lies in the vital role that blood plays in our body. 
                        By approaching our health through this perspective, we believe we can discover new ways to realize 
                        the full potential of our health.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- SECTION 2: RESEARCH --- */}
          <div className="border-b border-zinc-100">
            <button 
              onClick={() => setOpenSection(openSection === "research" ? null : "research")}
              className="w-full flex justify-between items-center py-12 cursor-pointer text-left focus:outline-none"
            >
              <h2 className="text-[18px] md:text-[22px] font-medium uppercase tracking-[0.2em]" style={classicoStyle}>
                Research
              </h2>
              <span className={`text-xl transition-transform duration-500 ${openSection === 'research' ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>

            <AnimatePresence>
              {openSection === "research" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-12 pb-24 pt-8">
                    <div className="md:col-span-4">
                      {/* Replace "research.jpg" with your actual file name in /public */}
                      <img src="/about-us.jpg" alt="Research" className="w-full h-auto object-cover mb-8" />
                    </div>
                    <div className="md:col-span-8">
                      <h3 className="text-[10px] font-bold uppercase mb-10 tracking-[0.4em] opacity-30" style={classicoStyle}>Global Collaboration</h3>
                      <p className="text-[16px] md:text-[18px] leading-[1.8] opacity-70 font-light" style={classicoStyle}>
                        We conduct independent research in collaboration with physicians, academic scholars, and leading experts worldwide. Our research seeks to deepen knowledge of the human body, the role of blood in health, and the complex factors that influence wellness, with the aim of contributing to both scientific progress and practical applications.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- SECTION 3: EDUCATION --- */}
          <div className="border-b border-zinc-100">
            <button 
              onClick={() => setOpenSection(openSection === "education" ? null : "education")}
              className="w-full flex justify-between items-center py-12 cursor-pointer text-left focus:outline-none"
            >
              <h2 className="text-[18px] md:text-[22px] font-medium uppercase tracking-[0.2em]" style={classicoStyle}>
                Education
              </h2>
              <span className={`text-xl transition-transform duration-500 ${openSection === 'education' ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>

            <AnimatePresence>
              {openSection === "education" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-12 pb-24 pt-8">
                    <div className="md:col-span-4">
                      {/* Replace "education.jpg" with your actual file name in /public */}
                      <img src="/education.jpg" alt="Education" className="w-full h-auto object-cover mb-8" />
                    </div>
                    <div className="md:col-span-8">
                      <h3 className="text-[10px] font-bold uppercase mb-10 tracking-[0.4em] opacity-30" style={classicoStyle}>Katonah Headquarters</h3>
                      <p className="text-[16px] md:text-[18px] leading-[1.8] opacity-70 font-light" style={classicoStyle}>
                        Our headquarter in Katonah, New York, serves as the center of our educational initiatives. Through hands-on workshops, interactive seminars, and community events, we strive to empower individuals and communities to lead healthier lives.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}