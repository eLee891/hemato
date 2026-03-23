"use client";

import { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEvents } from "@/lib/contentful";

export default function EventsPage() {
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
        
        // 제목(Title)을 소문자로 변환하여 키워드 체크
        const title = (fields.title || "").toLowerCase();
        
        // 제목에 'workshop', 'class', 'session' 등이 포함되면 Workshop으로 분류
        // 그 외에는 모두 Farm으로 분류 (요청하신 순서와 로직을 보장)
        const isWorkshop = title.includes("workshop") || title.includes("class") || title.includes("session");
        const finalCategory = isWorkshop ? "Workshop" : "Farm";

        return {
          id: e.sys?.id || e.id || Math.random().toString(),
          title: fields.title || "Untitled Event",
          start: fields.date || fields.start,
          extendedProps: { 
            time: fields.time || "", 
            image: fields.image?.fields?.file?.url 
              ? `https:${fields.image.fields.file.url}` 
              : (typeof fields.image === 'string' ? fields.image : null), 
            category: finalCategory // "Farm" 또는 "Workshop"으로 여기서 명확히 정의됨
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

  // 필터링 로직: 위에서 고정한 카테고리 값과 사이드바 버튼 값을 비교
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategory === "All") return matchesSearch;
      
      // 이제 event.extendedProps.category는 무조건 "Farm" 아니면 "Workshop"입니다.
      return matchesSearch && event.extendedProps.category === activeCategory;
    });
  }, [events, searchQuery, activeCategory]);

  // 요청하신 순서: Farm이 먼저 나옵니다.
  const categories = ["All", "Farm", "Workshop"];

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
        
        {/* --- 1. 검색 및 뷰 전환 --- */}
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
          
          {/* --- 2. 사이드바 필터 --- */}
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

          {/* --- 3. 메인 콘텐츠 (달력/리스트) --- */}
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
                  <div key={event.id} className="group flex flex-col md:flex-row gap-10 border-b border-zinc-100 pb-12 items-start md:items-center">
                    <div className="w-full md:w-48 aspect-[4/5] bg-zinc-100 overflow-hidden">
                      <img src={event.extendedProps.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 space-y-4 text-black font-classico">
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em] font-classico">{event.extendedProps.time} — {event.extendedProps.category}</p>
                      <h2 className="text-2xl uppercase tracking-widest font-classico">{event.title}</h2>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
/* 1. 달력 상단 제목 (MARCH 2026) */
        .fc-toolbar-title { 
          font-family: "classico-urw", sans-serif !important; 
          font-size: 1.4rem !important; /* 조금 더 키움 */
          text-transform: uppercase; 
          letter-spacing: 0em !important; 
          color: #000 !important; 
          font-weight: 700 !important;
        }

        /* 2. 요일 헤더 (SUN, MON...) */
        .fc-col-header-cell-cushion { 
          font-family: "classico-urw", sans-serif !important; 
          text-transform: uppercase; 
          letter-spacing: 0em !important; 
          font-size: 11px !important; 
          color: #000 !important; /* 더 검게 */
          font-weight: 700 !important;
          text-decoration: none !important; 
        }

        /* 3. 날짜 숫자 */
        .fc-daygrid-day-number { 
          font-family: "classico-urw", sans-serif !important; 
          font-size: 1.8rem !important; 
          font-weight: 200 !important; 
          color: #000 !important; /* 더 검게 */
          opacity: 0.2; /* 평소엔 연하게 하여 정갈함 유지 */
          text-decoration: none !important; 
          padding: 15px !important; 
        }

        /* 4. 네비게이션 버튼 (TODAY, <, >) - 요청하신 핵심 수정 사항 */
        .fc .fc-today-button {
          font-family: "classico-urw", sans-serif !important; 
          background: transparent !important; 
          border: none !important; 
          color: #000 !important; /* 선명한 블랙 */
          font-size: 14px !important; /* 더 크게 */
          font-weight: 800 !important; /* 더 두껍게 */
          text-transform: uppercase !important; 
          letter-spacing: 0em !important; 
          opacity: 1 !important; /* 흐릿함 제거 */
          cursor: pointer;
          padding: 0 10px !important;
        }

        .fc .fc-today-button:disabled {
          opacity: 1 !important; /* 오늘 날짜여도 흐려지지 않게 고정 */
        }

.fc .fc-today-button {
  /* ... other styles ... */
  letter-spacing: 0px !important; /* Change from 0.4em/0.5em to 0px */
  font-size: 16px !important;
  color: #000 !important;
}

        /* 5. 레이아웃 및 오늘 날짜 강조 */
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #F0F0F0 !important; }
        .fc .fc-daygrid-day-frame { min-height: 140px !important; }
        .fc-day-today { background-color: #FFF !important; box-shadow: inset 0 0 0 1.5px #000 !important; }
        .fc-day-today .fc-daygrid-day-number { opacity: 1 !important; font-weight: 700 !important; }
        .fc-event { background: transparent !important; border: none !important; }
      `}</style>
    </main>
  );
}