import AppShell from '@/components/layout/AppShell'
import { getCurrentUser } from '@/lib/auth'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Main() {
  const user = await getCurrentUser()

  return (
    <div>
      <AppShell />
      <div>
        {user ? (
          <form action={logout}>
            <Button type="submit">로그아웃</Button>
          </form>
        ) : (
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
