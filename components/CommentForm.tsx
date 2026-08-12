'use client'
import { useState } from 'react'

export default function CommentForm({ action }: { action: (formData: FormData) => void }) {
  const [content, setContent] = useState('')

  return (
    <form action={action} className="mb-6">
      <label htmlFor="comment-content" className="block text-sm font-medium mb-2 text-gray-300">
        Deja tu comentario
      </label>
      <textarea 
        id="comment-content"
        name="content" 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu comentario aquí..." 
        required 
        rows={3}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none mb-2" 
      />
      <button 
        type="submit" 
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Publicar Comentario
      </button>
    </form>
  )
}