import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

async function getTrendingArticles() {
  try {
    const res = await fetch('https://dev.to/api/articles?tag=webdev&per_page=3', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Error API');
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function ExplorarPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from('articles').select('*, profiles(username)').order('created_at', { ascending: false });
  const trending = await getTrendingArticles();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Explorar Artículos</h1>
      
      <SearchBar articles={articles || []} />

      <section className="mt-10 bg-gray-800 border border-gray-700 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-3 text-white">Tendencias en Dev.to (API Externa)</h2>
        {trending.length > 0 ? (
          <ul className="space-y-2">
            {trending.map((post: any) => (
              <li key={post.id}>
                <a href={post.url} target="_blank" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No se pudo cargar la API externa.</p>
        )}
      </section>
    </div>
  );
}