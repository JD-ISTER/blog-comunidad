'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SearchBar({ articles }: { articles: any[] }) {
  const [search, setSearch] = useState('')
  const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar artículos..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none mb-4"
      />
      <ul className="space-y-4">
        {filtered.map((article) => (
          <li key={article.id} className="bg-gray-800 border border-gray-700 p-4 rounded hover:border-gray-600 transition-colors">
            <Link href={`/articulos/${article.id}`} className="text-xl font-bold text-gray-200 hover:text-white transition-colors">
              {article.title}
            </Link>
            <p className="text-gray-500 text-sm mt-1">Por: {article.profiles?.username}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}