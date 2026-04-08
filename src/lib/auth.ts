import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      nickname: true,
      profileImage: true,
      isAdmin: true,
    },
  })
}
