// src/lib/guest-storage.ts
import fs from 'fs/promises'
import path from 'path'
import type { GuestFonction, AdminGuest, EventStats } from '@/types/guest'
import { connectDB } from '@/lib/db'
import Guest from '@/models/Guest'

export interface StoredGuest {
  guestId: string
  nom: string
  prenom: string
  email: string
  fonction: GuestFonction
  sessionSlot?: string
  token: string
  confirmedAt: string
  arrived: boolean
  arrivedAt: string | null
  scannedBy: string | null
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'guests.json')

// In-memory cache for ultra-low latency reads/writes
let memoryCache: Map<string, StoredGuest> | null = null
let isInitialized = false

async function ensureDataFile(): Promise<void> {
  if (isInitialized && memoryCache) return

  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const content = await fs.readFile(DATA_FILE, 'utf-8')
    const list: StoredGuest[] = JSON.parse(content)
    memoryCache = new Map(list.map((g) => [g.guestId, g]))
  } catch {
    // If file doesn't exist, start with empty store
    memoryCache = new Map()
    await persistToFile()
  }

  isInitialized = true
}

async function persistToFile(): Promise<void> {
  if (!memoryCache) return
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const list = Array.from(memoryCache.values())
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8')
  } catch (err) {
    console.error('[guest-storage] Failed to persist guests to file:', err)
  }
}

/**
 * Check if MongoDB connection is available without throwing fatal unhandled errors
 */
function hasMongo(): boolean {
  return Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0)
}

export async function saveGuest(
  data: Omit<StoredGuest, 'arrived' | 'arrivedAt' | 'scannedBy'> &
    Partial<Pick<StoredGuest, 'arrived' | 'arrivedAt' | 'scannedBy'>>
): Promise<StoredGuest> {
  await ensureDataFile()

  const guestRecord: StoredGuest = {
    guestId: data.guestId,
    nom: data.nom.trim(),
    prenom: data.prenom.trim(),
    email: data.email.trim().toLowerCase(),
    fonction: data.fonction,
    sessionSlot: data.sessionSlot || 'Cocktail & Révélation (19h30)',
    token: data.token,
    confirmedAt: data.confirmedAt || new Date().toISOString(),
    arrived: data.arrived ?? false,
    arrivedAt: data.arrivedAt ?? null,
    scannedBy: data.scannedBy ?? null,
  }

  // Update in-memory & file store
  memoryCache!.set(guestRecord.guestId, guestRecord)
  await persistToFile()

  // Best-effort MongoDB sync if configured
  if (hasMongo()) {
    try {
      await connectDB()
      await Guest.findOneAndUpdate(
        { guestId: guestRecord.guestId },
        {
          ...guestRecord,
          confirmedAt: new Date(guestRecord.confirmedAt),
          arrivedAt: guestRecord.arrivedAt ? new Date(guestRecord.arrivedAt) : null,
        },
        { upsert: true, new: true }
      )
    } catch (mongoErr) {
      console.warn('[guest-storage] MongoDB write skipped (file storage active):', mongoErr)
    }
  }

  return guestRecord
}

export async function getGuestById(guestId: string): Promise<StoredGuest | null> {
  await ensureDataFile()

  // Check memory/file cache first
  const found = memoryCache!.get(guestId)
  if (found) return found

  // Also check by lowercase or case-insensitive match
  for (const g of Array.from(memoryCache!.values())) {
    if (g.guestId.toLowerCase() === guestId.toLowerCase()) return g
  }

  // Fallback to MongoDB if active
  if (hasMongo()) {
    try {
      await connectDB()
      const doc = await Guest.findOne({ guestId }).lean()
      if (doc) {
        const mapped: StoredGuest = {
          guestId: doc.guestId,
          nom: doc.nom,
          prenom: doc.prenom,
          email: doc.email,
          fonction: doc.fonction as GuestFonction,
          token: doc.token,
          confirmedAt: doc.confirmedAt ? doc.confirmedAt.toISOString() : new Date().toISOString(),
          arrived: doc.arrived ?? false,
          arrivedAt: doc.arrivedAt ? doc.arrivedAt.toISOString() : null,
          scannedBy: doc.scannedBy ?? null,
        }
        memoryCache!.set(mapped.guestId, mapped)
        return mapped
      }
    } catch {
      // Ignore Mongo error
    }
  }

  return null
}

export async function getGuestByEmail(email: string): Promise<StoredGuest | null> {
  await ensureDataFile()
  const cleanEmail = email.trim().toLowerCase()

  for (const g of Array.from(memoryCache!.values())) {
    if (g.email.toLowerCase() === cleanEmail) return g
  }

  if (hasMongo()) {
    try {
      await connectDB()
      const doc = await Guest.findOne({ email: cleanEmail }).lean()
      if (doc) {
        return {
          guestId: doc.guestId,
          nom: doc.nom,
          prenom: doc.prenom,
          email: doc.email,
          fonction: doc.fonction as GuestFonction,
          token: doc.token,
          confirmedAt: doc.confirmedAt ? doc.confirmedAt.toISOString() : new Date().toISOString(),
          arrived: doc.arrived ?? false,
          arrivedAt: doc.arrivedAt ? doc.arrivedAt.toISOString() : null,
          scannedBy: doc.scannedBy ?? null,
        }
      }
    } catch {
      // Ignore Mongo error
    }
  }

  return null
}

export async function markGuestArrived(
  guestId: string,
  scannedBy: string = 'reception'
): Promise<{ success: boolean; guest?: StoredGuest; alreadyScanned?: boolean }> {
  await ensureDataFile()

  const guest = await getGuestById(guestId)
  if (!guest) {
    return { success: false }
  }

  if (guest.arrived) {
    return { success: true, guest, alreadyScanned: true }
  }

  const nowIso = new Date().toISOString()
  guest.arrived = true
  guest.arrivedAt = nowIso
  guest.scannedBy = scannedBy

  memoryCache!.set(guest.guestId, guest)
  await persistToFile()

  if (hasMongo()) {
    try {
      await connectDB()
      await Guest.findOneAndUpdate(
        { guestId: guest.guestId },
        { arrived: true, arrivedAt: new Date(nowIso), scannedBy }
      )
    } catch (err) {
      console.warn('[guest-storage] MongoDB arrival sync skipped:', err)
    }
  }

  return { success: true, guest, alreadyScanned: false }
}

export async function getAllGuests(search: string = '', filter: string = 'all'): Promise<AdminGuest[]> {
  await ensureDataFile()
  let list = Array.from(memoryCache!.values())

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    list = list.filter(
      (g) =>
        g.nom.toLowerCase().includes(q) ||
        g.prenom.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.guestId.toLowerCase().includes(q) ||
        g.fonction.toLowerCase().includes(q)
    )
  }

  if (filter === 'arrived') {
    list = list.filter((g) => g.arrived)
  } else if (filter === 'pending') {
    list = list.filter((g) => !g.arrived)
  }

  // Sort descending by confirmed date
  list.sort((a, b) => new Date(b.confirmedAt).getTime() - new Date(a.confirmedAt).getTime())

  return list.map((g) => ({
    guestId: g.guestId,
    nom: g.nom,
    prenom: g.prenom,
    email: g.email,
    fonction: g.fonction,
    sessionSlot: g.sessionSlot,
    confirmedAt: g.confirmedAt,
    arrived: g.arrived,
    arrivedAt: g.arrivedAt,
  }))
}

export async function getGuestStats(): Promise<EventStats> {
  await ensureDataFile()
  const list = Array.from(memoryCache!.values())
  const total = list.length
  const arrived = list.filter((g) => g.arrived).length
  const pending = total - arrived
  const percentage = total > 0 ? Math.round((arrived / total) * 100) : 0

  return { total, arrived, pending, percentage }
}

export async function resetAllGuests(): Promise<number> {
  await ensureDataFile()
  const count = memoryCache!.size
  memoryCache!.clear()
  await persistToFile()

  if (hasMongo()) {
    try {
      await connectDB()
      await Guest.deleteMany({})
    } catch {
      // Ignore
    }
  }

  return count
}
