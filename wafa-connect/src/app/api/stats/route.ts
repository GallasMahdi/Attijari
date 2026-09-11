// src/app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getGuestStats } from '@/lib/guest-storage'

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-token')
  const expectedPassword = process.env.ADMIN_PASSWORD || '2K-VIP-2026'
  return Boolean(auth && auth === expectedPassword)
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const stats = await getGuestStats()

    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    console.error('[/api/stats]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
