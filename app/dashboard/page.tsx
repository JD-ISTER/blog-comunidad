import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteArticle } from "../actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single();
  const { data: articles } = await supabase.from('articles').select('*').eq('author_id', user!.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-white">Hola, {profile?.username}</h1>
      <p className="text-gray-400 mb-6">
        Rol: <span className="font-bold capitalize text-gray-200">{profile?.role}</span>
      </p>
      
      {profile?.role === 'autor' && (
        <Link 
          href="/dashboard/nuevo" 
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mb-6 inline-block"
        >
          + Nuevo Artículo
        </Link>
      )}

      <h2 className="text-xl font-bold mb-4 text-white">Mis Artículos</h2>
      <ul className="space-y-3">
        {articles?.map(article => (
          <li key={article.id} className="bg-gray-800 border border-gray-700 p-4 rounded flex justify-between items-center">
            <span className="text-gray-200">{article.title}</span>
            <div className="flex gap-3">
              <Link href={`/articulos/${article.id}`} className="text-gray-400 hover:text-white transition-colors">
                Ver
              </Link>
              <Link href={`/dashboard/editar/${article.id}`} className="text-gray-400 hover:text-white transition-colors">
                Editar
              </Link>
              <form action={deleteArticle.bind(null, article.id)}>
                <button className="text-gray-400 hover:text-red-400 transition-colors">
                  Borrar
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}