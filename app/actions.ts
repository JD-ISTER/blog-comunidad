'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) redirect('/login?error=credenciales_invalidas')
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const role = formData.get('role') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username, role } }
  })
  if (error) redirect('/register?error=' + error.message)
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function createArticle(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('articles').insert({
    author_id: user.id,
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  })
  if (error) throw error
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateArticle(id: number, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('articles').update({
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  }).eq('id', id)
  if (error) throw error
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteArticle(id: number) {
  const supabase = await createClient()
  await supabase.from('articles').delete().eq('id', id)
  revalidatePath('/dashboard')
}

export async function createComment(articleId: number, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('comments').insert({
    article_id: articleId,
    reader_id: user.id,
    content: formData.get('content') as string,
  })
  if (error) throw error
  revalidatePath(`/articulos/${articleId}`)
}