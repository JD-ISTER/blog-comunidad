import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { createComment } from "@/app/actions";
import CommentForm from "@/components/CommentForm";

export default async function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  const { data: article } = await supabase
    .from('articles')
    .select('*, profiles(username)')
    .eq('id', id)
    .single();

  const { data: comments } = await supabase
    .from('comments')
    .select('*, profiles(username)')
    .eq('article_id', id)
    .order('created_at', { ascending: false });

  if (!article) return notFound();

  const createCommentWithId = createComment.bind(null, parseInt(id));

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white">{article.title}</h1>
      <p className="text-gray-500 mb-6">Por: {article.profiles?.username}</p>
      <div className="prose prose-invert mb-8 whitespace-pre-wrap text-gray-300">{article.content}</div>
      
      <h2 className="text-2xl font-bold mb-4 text-white">Comentarios</h2>
      
      {user ? (
        <CommentForm action={createCommentWithId} />
      ) : (
        <p className="bg-gray-800 border border-gray-700 p-4 rounded mb-6 text-gray-400">
          <a href="/login" className="text-gray-300 hover:text-white underline">Inicia sesión</a> para dejar un comentario.
        </p>
      )}

      {comments && comments.length > 0 ? (
        <ul className="space-y-3 mb-8">
          {comments.map(c => (
            <li key={c.id} className="bg-gray-800 border border-gray-700 p-3 rounded">
              <p className="font-bold text-sm text-gray-300">{c.profiles?.username}</p>
              <p className="text-gray-400 mt-1">{c.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-8">No hay comentarios aún. ¡Sé el primero en comentar!</p>
      )}
    </article>
  );
}