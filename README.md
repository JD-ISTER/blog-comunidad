# BlogComunidad

Aplicación Full-Stack de blogging y comunidad donde los autores publican artículos y los lectores pueden explorarlos, buscarlos y comentar. Resuelve la necesidad de una plataforma sencilla de gestión de contenido con roles diferenciados.

## Demo en vivo
https://blog-comunidad.vercel.app/

## Capturas de Pantalla

1. **Página de Explorar**: Muestra el listado de artículos, barra de búsqueda y tendencias de la API externa
2. **Dashboard de Autor**: Panel con opción de crear, editar y eliminar artículos
3. **Detalle de Artículo**: Vista completa del artículo con sistema de comentarios

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos & Auth**: Supabase (PostgreSQL)
- **Despliegue**: Vercel
- **Control de versiones**: Git + GitHub

## Roles de Usuario

### Lector
- Puede registrarse e iniciar sesión
- Puede ver todos los artículos públicos
- Puede buscar artículos en la página de explorar
- Puede ver tendencias de la API externa (Dev.to)
- Puede dejar comentarios en cualquier artículo

### Autor
- Todas las funcionalidades del Lector
- Acceso al Dashboard personal
- Puede crear nuevos artículos
- Puede editar sus propios artículos
- Puede eliminar sus propios artículos

## Modelo de Datos

### Tabla `profiles`
Extiende `auth.users` de Supabase
- `id` (uuid, PK) - Referencia a auth.users
- `username` (text, unique) - Nombre de usuario
- `role` (text) - 'lector' o 'autor'
- `created_at` (timestamp)

### Tabla `articles`
- `id` (bigint, PK)
- `author_id` (uuid, FK -> profiles.id)
- `title` (text)
- `content` (text)
- `created_at` (timestamp)

### Tabla `comments`
- `id` (bigint, PK)
- `article_id` (bigint, FK -> articles.id)
- `reader_id` (uuid, FK -> profiles.id)
- `content` (text)
- `created_at` (timestamp)

### Row Level Security (RLS)
Todas las tablas tienen RLS activado con políticas que garantizan:
- Solo los dueños pueden editar/borrar su contenido
- Todos los usuarios pueden ver contenido público
- Solo usuarios autenticados pueden crear contenido

## Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/blog-comunidad.git
cd blog-comunidad
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env.local` en la raíz con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Variables de Entorno

Necesitas crear un archivo `.env.local` con:
- `NEXT_PUBLIC_SUPABASE_URL` - URL de tu proyecto en Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave pública de tu proyecto en Supabase

**IMPORTANTE**: Nunca subas este archivo a GitHub. Ya está incluido en `.gitignore`.

## Credenciales de Prueba

### Autor de prueba
- **Email**: autor@test.com
- **Contraseña**: password123

### Lector de prueba
- **Email**: lector@test.com
- **Contraseña**: password123

*Nota: Crea estos usuarios en tu panel de Supabase > Authentication > Users para que el docente pueda probar*

## Funcionalidades Implementadas

- [x] Next.js 14 con App Router y TypeScript
- [x] Tailwind CSS para todos los estilos
- [x] 2 roles de usuario (Lector/Autor) guardados en base de datos
- [x] 2 rutas públicas (/, /explorar)
- [x] 2 rutas privadas (/dashboard, /dashboard/nuevo)
- [x] 1 ruta dinámica (/articulos/[id])
- [x] Base de datos relacional con 3 tablas y foreign keys
- [x] Tabla que extiende auth.users (profiles)
- [x] Relación uno-a-muchos (autor tiene muchos artículos)
- [x] Row Level Security (RLS) activado y configurado
- [x] Registro de usuarios funcionando
- [x] Inicio de sesión funcionando
- [x] Cierre de sesión funcionando
- [x] Protección de rutas con middleware
- [x] Rol guardado en base de datos (no hardcodeado)
- [x] CRUD completo de artículos:
  - [x] Crear con Server Actions
  - [x] Leer (listado y detalle)
  - [x] Actualizar (solo dueño)
  - [x] Eliminar (solo dueño)
- [x] Sistema de comentarios funcional
- [x] Componente de búsqueda con useState ('use client')
- [x] Manejo correcto de Server Components vs Client Components
- [x] Consumo de API externa (Dev.to) con fetch y async/await
- [x] Manejo de errores en API externa
- [x] Fetch desde Server Component 
- [x] Repositorio público en GitHub
- [x] Historial de 15 commits con Conventional Commits
- [x] Despliegue funcional en Vercel con URL pública
- [x] Variables de entorno seguras (.env.local en .gitignore)
- [x] Documentación completa en README.md

## Autor
Juan Del Pozo