// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      }
    })
    return NextResponse.json({ success: true, contact })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}