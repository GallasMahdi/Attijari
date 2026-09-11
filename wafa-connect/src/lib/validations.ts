// src/lib/validations.ts
import { z } from 'zod'

export const guestSchema = z.object({
  nom: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom est trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),
  prenom: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom est trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom contient des caractères invalides'),
  email: z
    .string()
    .email('Adresse email invalide')
    .toLowerCase()
    .trim(),
  fonction: z.enum([
    'Invité VIP — Dynamic Launch',
    'Partenaire Fleet & Business',
    'Presse & Média Officiel',
    // Legacy values kept for backwards compatibility
    'Invité d\'Honneur VIP',
    'Membre Club & Propriétaire',
    'Pilote VIP',
    'Invité Paddock',
    'Journaliste',
    'Invité'
  ], {
    errorMap: () => ({ message: 'Veuillez sélectionner votre profil' })
  }),
  sessionSlot: z.string().optional(),
})

export type GuestFormValues = z.infer<typeof guestSchema>
