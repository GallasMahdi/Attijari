// src/app/api/stats/route.ts
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

  try {
    await connectDB()
    const [total, arrived] = await Promise.all([
      Guest.countDocuments(),
      Guest.countDocuments({ arrived: true }),
    ])

    const stats = {
      total,
      arrived,
      pending: total - arrived,
      percentage: total > 0 ? Math.round((arrived / total) * 100) : 0,
    }

    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'no-store' }
    })
  } catch (err) {
    console.error('[/api/stats]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
