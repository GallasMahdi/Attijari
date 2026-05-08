// src/app/api/guests/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Guest from '@/models/Guest'

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-token')
  return auth === process.env.ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? 'all' // all | arrived | pending

  try {
    await connectDB()

    const query: Record<string, unknown> = {}

    if (search) {
      query.$text = { $search: search }
    }
    if (filter === 'arrived') query.arrived = true
    if (filter === 'pending') query.arrived = false

    const guests = await Guest.find(query)
      .select('guestId nom prenom email fonction confirmedAt arrived arrivedAt')
      .sort({ confirmedAt: -1 })
      .lean()

    return NextResponse.json({ guests }, {
      headers: { 'Cache-Control': 'no-store' }
    })
  } catch (err) {
    console.error('[/api/guests]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
