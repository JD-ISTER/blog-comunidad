import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { logout } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "BlogComunidad" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <nav className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
            BlogComunidad
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/explorar" className="text-gray-300 hover:text-white transition-colors">
              Explorar
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <form action={logout}>
                  <button className="text-gray-400 hover:text-red-400 transition-colors">
                    Salir
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                  Registro
                </Link>
              </>
            )}
          </div>
        </nav>
        <main className="p-4 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}