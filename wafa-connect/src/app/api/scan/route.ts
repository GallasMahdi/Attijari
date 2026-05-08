// src/app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { verifyToken } from '@/lib/hmac'
import Guest from '@/models/Guest'
import type { QRPayload, ScanResult } from '@/types/guest'

// Admin auth middleware
function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-token')
  return auth === process.env.ADMIN_PASSWORD
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: { qrData: string; scannedBy?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 })
  }

  const { qrData, scannedBy = 'reception' } = body

  // Parse QR data (supports new optimized "ID:TOKEN" and legacy JSON)
  let id: string, token: string
  
  if (qrData.includes(':')) {
    [id, token] = qrData.split(':')
  } else {
    // Fallback for legacy JSON QR codes
    try {
      const payload: QRPayload = JSON.parse(qrData)
      id = payload.id
      token = payload.token
    } catch {
      return NextResponse.json({ 
        status: 'invalid', 
        message: 'QR code invalide — format inconnu.' 
      }, { status: 200 })
    }
  }

  // Validate required fields
  if (!id || !token) {
    return NextResponse.json({ 
      status: 'invalid', 
      message: 'QR code invalide — données manquantes.' 
    }, { status: 200 })
  }

  // Verify HMAC token — prevents forged QR codes
  if (!verifyToken(id, token)) {
    return NextResponse.json({ 
      status: 'invalid', 
      message: 'QR code invalide — signature incorrecte. Appelez le superviseur.',
    }, { status: 200 })
  }

  try {
    await connectDB()
    const guest = await Guest.findOne({ guestId: id })

    if (!guest) {
      const result: ScanResult = {
        status: 'invalid',
        message: 'Invité introuvable dans la base de données.',
      }
      return NextResponse.json(result, { status: 200 })
    }

    // Already scanned — no-op, return who and when
    if (guest.arrived) {
      const result: ScanResult = {
        status: 'already_scanned',
        guest: {
          guestId: guest.guestId,
          nom: guest.nom,
          prenom: guest.prenom,
          fonction: guest.fonction,
          arrivedAt: guest.arrivedAt?.toISOString() ?? '',
        },
        message: `⚠️ ${guest.prenom} ${guest.nom} a déjà été enregistré(e) à ${
          guest.arrivedAt
            ? new Date(guest.arrivedAt).toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit' })
            : 'heure inconnue'
        }.`,
      }
      return NextResponse.json(result, { status: 200 })
    }

    // First scan — mark arrival
    guest.arrived = true
    guest.arrivedAt = new Date()
    guest.scannedBy = scannedBy
    await guest.save()

    const result: ScanResult = {
      status: 'valid',
      guest: {
        guestId: guest.guestId,
        nom: guest.nom,
        prenom: guest.prenom,
        fonction: guest.fonction,
        arrivedAt: guest.arrivedAt.toISOString(),
      },
      message: `✅ Bienvenue, ${guest.prenom} ${guest.nom} !`,
    }
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.error('[/api/scan]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
