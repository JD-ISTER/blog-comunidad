import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-white">Bienvenido a BlogComunidad</h1>
      <p className="text-gray-400 mb-8">Lee artículos, comenta y conecta con autores.</p>
      <Link 
        href="/explorar" 
        className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors inline-block"
      >
        Explorar Artículos
      </Link>
    </div>
  );
}