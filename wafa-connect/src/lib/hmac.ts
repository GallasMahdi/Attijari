// src/lib/hmac.ts
import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.HMAC_SECRET ?? 'fallback-dev-secret-change-in-prod'

/**
 * Signs a guest ID to produce a tamper-proof token for the QR payload.
 */
export function signToken(guestId: string): string {
  return createHmac('sha256', SECRET).update(guestId).digest('hex')
}

/**
 * Verifies the token against the given guest ID using constant-time comparison
 * to prevent timing attacks.
 */
export function verifyToken(guestId: string, token: string): boolean {
  try {
    const expected = signToken(guestId)
    const expectedBuf = Buffer.from(expected, 'hex')
    const actualBuf   = Buffer.from(token,    'hex')
    if (expectedBuf.length !== actualBuf.length) return false
    return timingSafeEqual(expectedBuf, actualBuf)
  } catch {
    return false
  }
}
