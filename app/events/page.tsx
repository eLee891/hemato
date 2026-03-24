"use client";

import { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEvents } from "@/lib/contentful";
import { useRouter } from "next/navigation"; // Added for navigation
import Link from "next/link"; // Added for list navigation

export default function EventsPage() {
  const router = useRouter(); 
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"month" | "list">("month");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getEvents();
        
        const mappedEvents = data.map(e => {
          const fields = e.fields || e; 
          const title = (fields.title || "").toLowerCase();
          const isWorkshop = title.includes("workshop") || title.includes("class") || title.includes("session");
          const finalCategory = isWorkshop ? "Workshop" : "Farm";

          return {
            id: e.sys?.id || e.id || Math.random().toString(),
            title: fields.title || "Untitled Event",
            start: fields.date || fields.start,
            extendedProps: { 
              slug: fields.slug, // 🚨 Added slug to mapping
              time: fields.time || "", 
              image: fields.image?.fields?.file?.url 
                ? `https:${fields.image.fields.file.url}` 
                : (typeof fields.image === 'string' ? fields.image : null), 
              category: finalCategory 
            }
          };
        });

        setEvents(mappedEvents);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally { 
        setLoading(false); 
      }
    }
    loadData();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeCategory === "All") return matchesSearch;
      return matchesSearch && event.extendedProps.category === activeCategory;
    });
  }, [events, searchQuery, activeCategory]);

  const categories = ["All", "Farm", "Workshop"];

  // 🚨 Handle Calendar Item Click
  const handleEventClick = (info: any) => {
    const slug = info.event.extendedProps.slug;
    if (slug) {
      router.push(`/events/${slug}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-[10px] tracking-[0.5em] uppercase font-classico animate-pulse text-zinc-400">
        Loading Archive...
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-52 pb-24 px-6 md:px-16 events-page-wrapper font-classico">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- 1. 검색 및 뷰 전환 (NO CHANGES TO LAYOUT) --- */}
        <div className="flex flex-col md:flex-row items-center gap-0 mb-16 border border-zinc-200 bg-white text-black">
          <div className="relative flex-1 w-full border-r border-zinc-100">
            <input 
              type="text"
              placeholder="SEARCH EVENTS"
              className="w-full pl-8 pr-4 py-5 text-[11px] outline-none tracking-[0.2em] placeholder:text-zinc-300 font-classico"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-black text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] font-classico hover:bg-zinc-800 transition-colors">
            FIND
          </button>
          <div className="flex h-full bg-zinc-50 border-l border-zinc-100">
             <button onClick={() => setViewMode("month")} className={`px-8 py-5 text-[9px] font-bold uppercase tracking-widest font-classico ${viewMode === 'month' ? 'bg-white text-black' : 'text-zinc-400'}`}>CALENDAR</button>
             <button onClick={() => setViewMode("list")} className={`px-8 py-5 text-[9px] font-bold uppercase tracking-widest font-classico ${viewMode === 'list' ? 'bg-white text-black' : 'text-zinc-400'}`}>LIST</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-20">
          
          {/* --- 2. 사이드바 필터 (NO CHANGES TO LAYOUT) --- */}
          <aside className="w-full md:w-64 shrink-0">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-black border-b border-zinc-200 pb-4 font-classico">FILTER</h3>
            <div className="space-y-6">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block text-[14px] uppercase tracking-[0.25em] transition-all relative text-left w-full font-classico ${
                    activeCategory === cat ? 'text-black pl-4 font-bold' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  {activeCategory === cat && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full" />}
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* --- 3. 메인 콘텐츠 (ADDED CLICK HANDLERS) --- */}
          <div className="flex-1 overflow-hidden">
            {filteredEvents.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-zinc-200">
                <p className="text-[20px] tracking-[0.2em] text-zinc-400 uppercase font-classico">No events found in this category.</p>
              </div>
            ) : viewMode === "month" ? (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={filteredEvents}
                aspectRatio={1.6}
                headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
                eventClick={handleEventClick} // 🚨 Enabled click for calendar
                eventContent={(arg) => (
                  <div className="flex flex-col py-2 px-1 gap-1.5 group cursor-pointer font-classico">
                    {arg.event.extendedProps.image && (
                      <div className="w-full h-16 overflow-hidden mb-1 bg-zinc-100">
                        <img src={arg.event.extendedProps.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                    )}
                    <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{arg.event.extendedProps.time}</div>
                    <div className="text-[13px] font-bold text-black uppercase leading-tight tracking-tight">{arg.event.title}</div>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-12">
                {filteredEvents.map(event => (
                  // 🚨 Wrapped list item in Link for detail navigation
                  <Link 
                    href={`/events/${event.extendedProps.slug}`} 
                    key={event.id} 
                    className="group flex flex-col md:flex-row gap-10 border-b border-zinc-100 pb-12 items-start md:items-center cursor-pointer"
                  >
                    <div className="w-full md:w-48 aspect-[4/5] bg-zinc-100 overflow-hidden">
                      <img src={event.extendedProps.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 space-y-4 text-black font-classico">
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em] font-classico">{event.extendedProps.time} — {event.extendedProps.category}</p>
                      <h2 className="text-2xl uppercase tracking-widest font-classico">{event.title}</h2>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ALL YOUR EXISTING CSS REMAINS HERE */
        .fc-toolbar-title { font-family: "classico-urw", sans-serif !important; font-size: 1.4rem !important; text-transform: uppercase; color: #000 !important; font-weight: 700 !important; }
        .fc-col-header-cell-cushion { font-family: "classico-urw", sans-serif !important; text-transform: uppercase; font-size: 11px !important; color: #000 !important; font-weight: 700 !important; text-decoration: none !important; }
        .fc-daygrid-day-number { font-family: "classico-urw", sans-serif !important; font-size: 1.8rem !important; font-weight: 200 !important; color: #000 !important; opacity: 0.2; text-decoration: none !important; padding: 15px !important; }
        .fc .fc-today-button { font-family: "classico-urw", sans-serif !important; background: transparent !important; border: none !important; color: #000 !important; font-size: 16px !important; font-weight: 800 !important; text-transform: uppercase !important; letter-spacing: 0px !important; opacity: 1 !important; cursor: pointer; padding: 0 10px !important; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #F0F0F0 !important; }
        .fc .fc-daygrid-day-frame { min-height: 140px !important; }
        .fc-day-today { background-color: #FFF !important; box-shadow: inset 0 0 0 1.5px #000 !important; }
        .fc-day-today .fc-daygrid-day-number { opacity: 1 !important; font-weight: 700 !important; }
        .fc-event { background: transparent !important; border: none !important; }
      `}</style>
    </main>
  );
}