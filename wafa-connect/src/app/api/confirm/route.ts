// src/app/api/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { guestSchema } from '@/lib/validations'
import { QRPayload, GuestResponse } from '@/types/guest'
import { EVENT } from '@/lib/constants'
import { connectDB } from '@/lib/db'
import { signToken } from '@/lib/hmac'
import Guest from '@/models/Guest'

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

  const { nom, prenom, email, fonction } = parseResult.data

  try {
    await connectDB()

    // Prevent duplicate registrations for the same email
    const existing = await Guest.findOne({ email: email.toLowerCase() }).lean()
    if (existing) {
      return NextResponse.json(
        { error: 'Cette adresse email est déjà enregistrée pour cet événement.' },
        { status: 409 }
      )
    }

    const guestId = nanoid(12)
    const timestamp = new Date().toISOString()
    const token = signToken(guestId)

    // Persist to MongoDB
    await Guest.create({
      guestId,
      nom,
      prenom,
      email: email.toLowerCase(),
      fonction,
      token,
      confirmedAt: new Date(),
    })

    const qrPayload: QRPayload = {
      id: guestId,
      name: `${prenom} ${nom}`,
      email,
      fonction,
      event: EVENT.fullName,
      organizer: EVENT.organizer,
      date: EVENT.dateLabel,
      venue: `${EVENT.venue}, ${EVENT.city}`,
      timestamp,
      token,   // HMAC token embedded in QR
      valid: true,
    }

    const response: GuestResponse = {
      success: true,
      guestId,
      nom,
      prenom,
      email,
      fonction,
      qrData: `${guestId}:${token}`, // Optimized: Just ID and Token for faster scanning
      message: `Bienvenue ${prenom} ! Votre QR code d'accès est prêt.`,
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
