'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, null)

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="w-full max-w-sm space-y-6 p-8">
        <h1 className="text-2xl font-bold">회원가입</h1>

        <form action={action} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호 (8자 이상, 영문+숫자)"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
            {state?.errors?.password && (
              <ul className="space-y-1">
                {state.errors.password.map((e) => (
                  <li key={e} className="text-sm text-red-500">
                    {e}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="birthDate" className="text-sm font-medium">
              생년월일
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
            {state?.errors?.birthDate && (
              <p className="text-sm text-red-500">{state.errors.birthDate[0]}</p>
            )}
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {pending ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="font-medium underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
