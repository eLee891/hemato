import { getCleanArticles } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
// Notice we added Promise<{ slug: string }> to the type
export default async function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. Await the params to get the slug safely
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // 2. Fetch articles from your WordPress helper
  const articles = await getCleanArticles();
  
  // 3. Find match (Safe check for 'a.slug' to avoid further errors)
  const post = articles.find((a: any) => 
    a?.slug?.toLowerCase() === slug?.toLowerCase()
  );

  // This will show up in your VS Code terminal (the black box at the bottom)
  console.log("Checking for slug:", slug);

  if (!post) {
    return notFound();
  }

  const fontStyle = { fontFamily: "classico-urw, sans-serif" };

  return (
    <main className="relative min-h-screen bg-white text-zinc-900" style={fontStyle}>
      <Navbar />

      <article className="pt-60 pb-40 px-6 max-w-[900px] mx-auto">
        <header className="mb-20 text-center">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-300 mb-8">
             {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <h1 className="text-4xl md:text-7xl font-extralight tracking-tighter uppercase leading-[1.1] mb-12">
            {post.title}
          </h1>
          {post.featuredImage?.node?.sourceUrl && (
            <div className="aspect-video w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 mb-20">
               <img src={post.featuredImage.node.sourceUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        <div 
          className="prose prose-zinc prose-lg max-w-none font-light leading-[2] text-zinc-800 
                     prose-p:mb-10 prose-headings:uppercase prose-headings:tracking-widest"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <footer className="mt-32 pt-10 border-t border-zinc-100">
          <Link href="/research/articles" className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 hover:text-black transition-colors">
            ← Back to Research Archive
          </Link>
        </footer>
      </article>
    </main>
  );
}