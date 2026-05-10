// src/app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { verifyToken } from '@/lib/hmac'
import Guest from '@/models/Guest'
import type { QRPayload, ScanResult } from '@/types/guest'

// Admin auth middleware
function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-token')
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedPassword) return false // CRITICAL: Fail closed if env var is missing
  return auth === expectedPassword
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

    // 1. Check if already scanned (we still need to fetch details for already_scanned state)
    let guest = await Guest.findOne({ guestId: id })

    if (!guest) {
      return NextResponse.json({
        status: 'invalid',
        message: 'Invité introuvable dans la base de données.'
      }, { status: 200 })
    }

    if (guest.arrived) {
      return NextResponse.json({
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
      }, { status: 200 })
    }

    // 2. Atomic update to mark as arrived
    // Using findOneAndUpdate with { arrived: false } filter ensures only one scanner wins
    const now = new Date()
    const updatedGuest = await Guest.findOneAndUpdate(
      { guestId: id, arrived: false },
      { 
        $set: { 
          arrived: true, 
          arrivedAt: now,
          scannedBy: scannedBy
        } 
      },
      { new: true } // Return the updated document
    )

    if (!updatedGuest) {
      // If someone else updated it between our first check and now
      return NextResponse.json({
        status: 'already_scanned',
        message: 'Déjà enregistré par un autre poste à l\'instant.'
      }, { status: 200 })
    }

    return NextResponse.json({
      status: 'valid',
      guest: {
        guestId: updatedGuest.guestId,
        nom: updatedGuest.nom,
        prenom: updatedGuest.prenom,
        fonction: updatedGuest.fonction,
        arrivedAt: updatedGuest.arrivedAt?.toISOString() ?? new Date().toISOString(),
      },
      message: `✅ Bienvenue, ${updatedGuest.prenom} ${updatedGuest.nom} !`,
    }, { status: 200 })
  } catch (err) {
    console.error('[/api/scan]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
