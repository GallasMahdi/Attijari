// src/models/Guest.ts
import mongoose, { Schema, Document, Model } from 'mongoose'
import type { GuestFonction } from '@/types/guest'

export interface IGuestDocument extends Document {
  guestId: string
  nom: string
  prenom: string
  email: string
  fonction: GuestFonction
  token: string           // HMAC-signed token for QR verification
  confirmedAt: Date
  arrived: boolean
  arrivedAt: Date | null
  scannedBy: string | null  // receptionist who scanned
}

const GuestSchema = new Schema<IGuestDocument>(
  {
    guestId:    { type: String, required: true, unique: true, index: true },
    nom:        { type: String, required: true, trim: true },
    prenom:     { type: String, required: true, trim: true },
    email:      { type: String, required: true, trim: true, lowercase: true, index: true },
    fonction:   { type: String, required: true, enum: ['Invité', 'Journaliste'] },
    token:      { type: String, required: true },
    confirmedAt:{ type: Date, default: () => new Date() },
    arrived:    { type: Boolean, default: false },
    arrivedAt:  { type: Date, default: null },
    scannedBy:  { type: String, default: null },
  },
  {
    timestamps: true,
    collection: 'guests',
  }
)

// Compound text index for fast admin search
GuestSchema.index({ nom: 'text', prenom: 'text', email: 'text' })

const Guest: Model<IGuestDocument> =
  mongoose.models.Guest ??
  mongoose.model<IGuestDocument>('Guest', GuestSchema)

export default Guest
