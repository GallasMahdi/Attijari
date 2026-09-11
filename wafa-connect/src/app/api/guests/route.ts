// src/app/api/guests/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAllGuests } from '@/lib/guest-storage'

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-token')
  const expectedPassword = process.env.ADMIN_PASSWORD || '2K-VIP-2026'
  return Boolean(auth && auth === expectedPassword)
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? 'all' // all | arrived | pending

  try {
    const guests = await getAllGuests(search, filter)

    return NextResponse.json(
      { guests },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (err) {
    console.error('[/api/guests]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
