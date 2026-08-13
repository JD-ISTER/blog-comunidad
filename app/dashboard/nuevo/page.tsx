import { createArticle } from '@/app/actions'

export default function NewArticlePage() {
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-white">Crear Nuevo Artículo</h1>
      <form action={createArticle} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-300">
            Título
          </label>
          <input 
            id="title"
            name="title" 
            type="text" 
            placeholder="Escribe el título del artículo" 
            required 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none" 
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-300">
            Contenido
          </label>
          <textarea 
            id="content"
            name="content" 
            placeholder="Escribe el contenido del artículo..." 
            required 
            rows={10}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none" 
          />
        </div>
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Publicar Artículo
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
  )
}