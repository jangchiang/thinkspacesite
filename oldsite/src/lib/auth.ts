// src/lib/auth.ts
import { verify, sign } from 'jsonwebtoken'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET!

export async function verifyAuth(token: string) {
  const decoded = verify(token, JWT_SECRET)
  return decoded
}

export async function createToken(user: any) {
  return sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' })
}