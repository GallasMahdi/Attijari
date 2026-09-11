// src/app/api/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { guestSchema } from '@/lib/validations'
import { QRPayload, GuestResponse } from '@/types/guest'
import { EVENT } from '@/lib/constants'
import { signToken } from '@/lib/hmac'
import { saveGuest, getGuestByEmail } from '@/lib/guest-storage'

// Rate limiting (in-memory per instance — sufficient for event scale)
const requestCounts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 5
  const record = requestCounts.get(ip)
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (record.count >= maxRequests) return false
  record.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez patienter une minute.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  const parseResult = guestSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Données invalides', details: parseResult.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { nom, prenom, email, fonction, sessionSlot } = parseResult.data

  try {
    // Check if already registered
    const existing = await getGuestByEmail(email)
    if (existing) {
      // Re-issue their existing pass without error, or return friendly conflict
      const response: GuestResponse = {
        success: true,
        guestId: existing.guestId,
        nom: existing.nom,
        prenom: existing.prenom,
        email: existing.email,
        fonction: existing.fonction,
        sessionSlot: existing.sessionSlot,
        qrData: `2K-P911:${existing.guestId}:${existing.token}`,
        message: `Ravi de vous revoir ${existing.prenom} ! Voici votre invitation officielle.`,
      }
      return NextResponse.json(response, {
        status: 200,
        headers: { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' },
      })
    }

    const shortCode = nanoid(8).toUpperCase()
    const guestId = `2K-${shortCode}`
    const timestamp = new Date().toISOString()
    const token = signToken(guestId)

    // Save to resilient storage layer (in-memory + file + MongoDB sync if available)
    await saveGuest({
      guestId,
      nom,
      prenom,
      email,
      fonction,
      sessionSlot: sessionSlot || 'Cocktail & Révélation (19h30)',
      token,
      confirmedAt: timestamp,
    })

    const response: GuestResponse = {
      success: true,
      guestId,
      nom,
      prenom,
      email,
      fonction,
      sessionSlot: sessionSlot || 'Cocktail & Révélation (19h30)',
      qrData: `2K-P911:${guestId}:${token}`,
      message: `Bienvenue ${prenom} ! Votre invitation officielle à la révélation Porsche est prête.`,
    }

    return NextResponse.json(response, {
      status: 201,
      headers: { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[/api/confirm]', err)
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
