// src/types/guest.ts
export type GuestFonction = 'Invité' | 'Journaliste'

export interface GuestFormData {
  nom: string
  prenom: string
  email: string
  fonction: GuestFonction
}

export interface QRPayload {
  id: string
  name: string
  email: string
  fonction: GuestFonction
  event: string
  organizer: string
  date: string
  venue: string
  timestamp: string
  token: string  // HMAC signature for server-side validation
  valid: boolean
}

export interface GuestResponse {
  success: boolean
  guestId: string
  nom: string
  prenom: string
  email: string
  fonction: GuestFonction
  qrData: string          // JSON stringified QRPayload
  message: string
}

export interface ConfirmationState {
  status: 'idle' | 'loading' | 'success' | 'error'
  data: GuestResponse | null
  error: string | null
}

// Admin portal types
export type ScanStatus = 'valid' | 'already_scanned' | 'invalid'

export interface ScanResult {
  status: ScanStatus
  guest?: {
    guestId: string
    nom: string
    prenom: string
    fonction: GuestFonction
    arrivedAt: string
  }
  message: string
}

export interface AdminGuest {
  guestId: string
  nom: string
  prenom: string
  email: string
  fonction: GuestFonction
  confirmedAt: string
  arrived: boolean
  arrivedAt: string | null
}

export interface EventStats {
  total: number
  arrived: number
  pending: number
  percentage: number
}
