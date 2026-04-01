'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
  }

  revalidatePath('/', 'layout')
  redirect('/hub')
}

export async function signupUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string // User display name

  const supabase = await createClient()

  // 1. Supabase Auth 계정 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      }
    }
  })

  if (authError || !authData.user) {
    throw new Error(`회원가입 실패: ${authError?.message}`)
  }

  // MVP용 하드코딩된 조직/워크스페이스에 'author' 권한으로 자동 멤버십 등록 처리
  // (실제 프로덕션은 초대 브랜치 로직이나 직접 생성 등 분기 처리 필요)
  const MOCK_WORKSPACE_ID = '00000000-0000-0000-0000-000000000000'
  
  const { error: memberError } = await supabase.from('workspace_members').insert({
    workspace_id: MOCK_WORKSPACE_ID,
    user_id: authData.user.id,
    role: 'author'
  })

  if (memberError) {
    // 이미 존재하는 워크스페이스 구조가 없거나 제약이 걸려 에러가 날 수 있음.
    console.error('워크스페이스 멤버 등록 실패', memberError)
  }

  revalidatePath('/', 'layout')
  redirect('/hub')
}

export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login')
}
