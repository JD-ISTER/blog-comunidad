import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { updateArticle } from "@/app/actions";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('author_id', user.id)
    .single();

  if (!article) return notFound();

  const updateWithId = updateArticle.bind(null, parseInt(id));

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-white">Editar Artículo</h1>
      <form action={updateWithId} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-300">
            Título
          </label>
          <input 
            id="title"
            name="title" 
            type="text" 
            defaultValue={article.title}
            required 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-gray-500 focus:outline-none" 
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-300">
            Contenido
          </label>
          <textarea 
            id="content"
            name="content" 
            defaultValue={article.content}
            required 
            rows={10}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-gray-500 focus:outline-none" 
          />
        </div>
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Guardar Cambios
          </button>
          <a 
            href="/dashboard" 
            className="bg-gray-600 text-gray-200 px-6 py-2 rounded hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}