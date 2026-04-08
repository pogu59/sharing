'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'

// ─── 로그인 ───────────────────────────────────────────────────

const LoginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

export type LoginState = {
  errors?: { email?: string[]; password?: string[] }
  error?: string
} | null

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const result = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const { email, password } = result.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
  }

  if (user.deletedAt) {
    return { error: '탈퇴한 계정입니다.' }
  }

  await createSession(user.id, user.isAdmin)
  redirect('/')
}

// ─── 회원가입 ──────────────────────────────────────────────────

const SignupSchema = z.object({
  name: z.string().min(2, { message: '이름은 2자 이상이어야 합니다.' }),
  email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다.' })
    .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' }),
  birthDate: z.string().min(1, { message: '생년월일을 입력해주세요.' }),
})

export type SignupState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    birthDate?: string[]
  }
  error?: string
} | null

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const result = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    birthDate: formData.get('birthDate'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const { name, email, password, birthDate } = result.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: '이미 사용 중인 이메일입니다.' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      birthDate: new Date(birthDate),
    },
  })

  await createSession(user.id, user.isAdmin)
  redirect('/')
}

// ─── 로그아웃 ──────────────────────────────────────────────────

export async function logout() {
  await deleteSession()
  redirect('/')
}
