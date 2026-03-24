import { getEventBySlug } from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-white text-black pb-40" style={{ fontFamily: "'urw-classico', 'Optima', sans-serif" }}>
      
      {/* --- TOP NAV --- */}
      <div className="max-w-[1200px] mx-auto px-8 pt-12">
        <Link href="/events" className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors">
          ← All Events
        </Link>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: Date & Details */}
        <div className="lg:col-span-3 pt-2">
          <div className="sticky top-12 border-t border-black pt-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 font-medium">Schedule</h3>
            <div className="space-y-10 tracking-tight leading-snug text-black">
              {/* 🖤 Date now strictly Black */}
              <p className="text-[18px] font-light">
                {event.displayDate.split(',')[0]}<br />
                <span>{event.displayDate.split(',').slice(1).join(',')}</span>
              </p>
              
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-2 font-medium">Venue</h3>
                {/* 🖤 Venue Name now strictly Black */}
                <p className="text-[18px] font-light mb-1">{event.displayLocation}</p>
                <a 
                  href={event.mapUrl} 
                  target="_blank" 
                  className="text-[14px] text-black hover:opacity-60 underline underline-offset-4 decoration-zinc-200 transition-all block"
                >
                  {event.displayAddress}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Area */}
        <div className="lg:col-span-9">
          
          <div className="w-full mb-20 flex justify-center bg-transparent">
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto max-h-[550px] object-contain mix-blend-multiply" 
              />
            )}
          </div>

          <div className="max-w-[750px]">
            <h1 className="text-[40px] md:text-[56px] font-light uppercase tracking-[0.12em] leading-tight mb-12 text-black">
              {event.title}
            </h1>

            <div className="prose prose-zinc max-w-none text-[18px] leading-[1.8] font-light text-black prose-strong:font-medium">
              {event.description ? (
                documentToReactComponents(event.description)
              ) : (
                <p className="italic text-zinc-400 font-light">Details coming soon.</p>
              )}
            </div>

            {/* --- ADMISSION FOOTER --- */}
            <div className="mt-24 pt-12 border-t border-zinc-100 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 block mb-3 font-medium">Admission</span>
                {/* 🖤 Price now strictly Black */}
                <p className="text-[32px] font-light tracking-tighter text-black">
                  {event.price ? `$${event.price}` : "$15.00"}
                </p>
              </div>

              <button className="bg-black text-white px-16 py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all rounded-sm">
                Register Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}