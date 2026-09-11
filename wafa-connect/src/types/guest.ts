// src/types/guest.ts
export type GuestFonction = 
  // Cayenne E4 Dynamic Launch values
  | 'Invité VIP — Dynamic Launch'
  | 'Partenaire Fleet & Business'
  | 'Presse & Média Officiel'
  // Legacy values kept for backwards compatibility
  | 'Invité d\'Honneur VIP'
  | 'Membre Club & Propriétaire'
  | 'Pilote VIP'
  | 'Invité Paddock'
  | 'Journaliste'
  | 'Invité'

export interface GuestFormData {
  nom: string
  prenom: string
  email: string
  fonction: GuestFonction
  sessionSlot?: string
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
  sessionSlot?: string
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
  sessionSlot?: string
  qrData: string          // JSON stringified QRPayload or compact token
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
    sessionSlot?: string
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
  sessionSlot?: string
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
