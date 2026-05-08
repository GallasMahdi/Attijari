import { QRPayload } from '@/types/guest'

export function encodeQRPayload(payload: QRPayload): string {
  try {
    return btoa(JSON.stringify(payload))
  } catch (error) {
    console.error('Failed to encode QR payload', error)
    return ''
  }
}

export function decodeQRPayload(encoded: string): QRPayload | null {
  try {
    return JSON.parse(atob(encoded))
  } catch (error) {
    console.error('Failed to decode QR payload', error)
    return null
  }
}
