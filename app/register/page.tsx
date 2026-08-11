import { signup } from '@/app/actions'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 space-y-4">
        <h1 className="text-2xl font-bold text-center text-white">Crear Cuenta</h1>
        <input 
          name="username" 
          type="text" 
          placeholder="Nombre de usuario" 
          required 
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none" 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none" 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Contraseña" 
          required 
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none" 
        />
        <select 
          name="role" 
          required 
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-gray-500 focus:outline-none"
        >
          <option value="lector">Quiero ser Lector</option>
          <option value="autor">Quiero ser Autor</option>
        </select>
        <button 
          formAction={signup} 
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-500 transition-colors"
        >
          Registrarme
        </button>
        <p className="text-center text-sm text-gray-400">
          ¿Ya tienes cuenta? <a href="/login" className="text-gray-300 hover:text-white underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  )
}