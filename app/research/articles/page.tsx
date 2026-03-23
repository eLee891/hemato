// 1. Removed "use client" - this is a Server Component fetching from WordPress
import Link from "next/link";
import { getCleanArticles } from "@/lib/wordpress"; 

export default async function ArticlesPage() {
  // 2. Fetch the articles from WordPress
  const articles = await getCleanArticles();
  
  return (
    <main className="relative w-full bg-white font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* --- 1. THE HERO --- */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950"> 
        <div className="absolute inset-0 z-0">
          <img 
            src="/articles.jpg"  /* UPDATED IMAGE SOURCE */
            className="w-full h-full object-cover opacity-60" 
            alt="Articles"
          />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-[0.6em] uppercase">
            Articles
          </h1>
          <div className="w-[1px] h-24 bg-white/20 mx-auto mt-16" />
        </div>
      </header>

      {/* --- 2. THE GRID SECTION --- */}
      <section className="relative z-20 bg-white py-32 md:py-48 px-6 md:px-24 max-w-[1600px] mx-auto">
        
        {/* Section Intro */}
        <div className="mb-32">
          <h2 className="text-[10px] font-bold tracking-[0.8em] uppercase text-zinc-300 mb-8">01 — JOURNAL</h2>
          <p className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase text-zinc-900">
            Latest Research
          </p>
        </div>

        {/* The 3-Column Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-32">
          {articles.map((post: any) => (
            <div key={post.slug} className="flex flex-col group">
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden bg-zinc-50 mb-10 relative">
                <img 
                  src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-8">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-300 block">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                
                <h2 className="text-[20px] md:text-[22px] font-light tracking-[0.15em] uppercase leading-[1.4] text-zinc-900 group-hover:text-zinc-500 transition-colors duration-500">
                  {post.title}
                </h2>
                
                <p className="text-zinc-500 text-[13px] leading-[2] font-light tracking-[0.05em] uppercase line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/research/articles/${post.slug}`} 
                  className="inline-block pt-4 text-[10px] font-bold tracking-[0.4em] uppercase border-b border-zinc-100 hover:border-zinc-900 transition-all duration-700 pb-2"
                >
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. SUPPORT SECTION --- */}
      <section className="py-40 md:py-60 bg-zinc-50 text-center px-6 border-t border-zinc-100">
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