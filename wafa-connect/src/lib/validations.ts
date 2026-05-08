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
  fonction: z.enum(['Invité', 'Journaliste'], {
    errorMap: () => ({ message: 'Veuillez sélectionner votre fonction' })
  }),
})

export type GuestFormValues = z.infer<typeof guestSchema>
