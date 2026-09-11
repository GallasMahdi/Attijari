// src/app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/hmac'
import { getGuestById, markGuestArrived } from '@/lib/guest-storage'
import type { QRPayload, ScanResult } from '@/types/guest'

// Admin auth middleware
function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-token')
  const expectedPassword = process.env.ADMIN_PASSWORD || '2K-VIP-2026'
  return Boolean(auth && auth === expectedPassword)
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

  if (!qrData || typeof qrData !== 'string') {
    return NextResponse.json({
      status: 'invalid',
      message: 'QR code vide ou illisible.',
    }, { status: 200 })
  }

  // Parse QR data (supports 2K-P911:ID:TOKEN, ID:TOKEN, and JSON)
  let id = ''
  let token = ''

  if (qrData.startsWith('2K-P911:')) {
    const parts = qrData.split(':')
    id = parts[1] || ''
    token = parts[2] || ''
  } else if (qrData.includes(':')) {
    const parts = qrData.split(':')
    id = parts[0] || ''
    token = parts[1] || ''
  } else {
    try {
      const payload: QRPayload = JSON.parse(qrData)
      id = payload.id
      token = payload.token
    } catch {
      return NextResponse.json({
        status: 'invalid',
        message: 'Format du QR code non reconnu.',
      }, { status: 200 })
    }
  }

  if (!id) {
    return NextResponse.json({
      status: 'invalid',
      message: 'Identifiant VIP manquant dans le QR code.',
    }, { status: 200 })
  }

  try {
    const guest = await getGuestById(id)

    if (!guest) {
      return NextResponse.json({
        status: 'invalid',
        message: 'Invité introuvable dans le registre VIP officiel.',
      }, { status: 200 })
    }

    // Verify token: either valid HMAC signature or matching token in stored record
    const hasValidHmac = token ? verifyToken(id, token) : false
    const matchesStoredToken = Boolean(guest.token && guest.token === token)

    if (!hasValidHmac && !matchesStoredToken) {
      return NextResponse.json({
        status: 'invalid',
        message: 'Signature de sécurité invalide. Veuillez vérifier auprès de l\'accueil 2K Events.',
      }, { status: 200 })
    }

    // Check if already checked in
    if (guest.arrived) {
      const timeFormatted = guest.arrivedAt
        ? new Date(guest.arrivedAt).toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit' })
        : 'heure inconnue'

      return NextResponse.json({
        status: 'already_scanned',
        guest: {
          guestId: guest.guestId,
          nom: guest.nom,
          prenom: guest.prenom,
          fonction: guest.fonction,
          sessionSlot: guest.sessionSlot,
          arrivedAt: guest.arrivedAt ?? '',
        },
        message: `⚠️ Déjà enregistré(e) : ${guest.prenom} ${guest.nom} a accédé au gala à ${timeFormatted}.`,
      }, { status: 200 })
    }

    // Mark guest as arrived
    const result = await markGuestArrived(id, scannedBy)

    if (!result.success || !result.guest) {
      return NextResponse.json({
        status: 'invalid',
        message: 'Impossible de valider l\'entrée.',
      }, { status: 200 })
    }

    if (result.alreadyScanned) {
      return NextResponse.json({
        status: 'already_scanned',
        guest: {
          guestId: result.guest.guestId,
          nom: result.guest.nom,
          prenom: result.guest.prenom,
          fonction: result.guest.fonction,
          sessionSlot: result.guest.sessionSlot,
          arrivedAt: result.guest.arrivedAt ?? '',
        },
        message: 'Enregistré à l\'instant par un autre poste d\'accueil.',
      }, { status: 200 })
    }

    const updated = result.guest

    return NextResponse.json({
      status: 'valid',
      guest: {
        guestId: updated.guestId,
        nom: updated.nom,
        prenom: updated.prenom,
        fonction: updated.fonction,
        sessionSlot: updated.sessionSlot,
        arrivedAt: updated.arrivedAt ?? new Date().toISOString(),
      },
      message: `✨ Accès VIP Autorisé : Bienvenue ${updated.prenom} ${updated.nom} !`,
    }, { status: 200 })
  } catch (err) {
    console.error('[/api/scan]', err)
    return NextResponse.json({ error: 'Erreur serveur lors du scan' }, { status: 500 })
  }
}
