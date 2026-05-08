'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { guestSchema, GuestFormValues } from '@/lib/validations'
import { useGuestConfirmation } from '@/hooks/useGuestConfirmation'
import { GuestResponse } from '@/types/guest'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GoldButton } from '@/components/ui/GoldButton'
import { TexturePattern } from '@/components/ui/TexturePattern'

interface ConfirmationSectionProps {
  onSuccess: (data: GuestResponse) => void
}

export function ConfirmationSection({ onSuccess }: ConfirmationSectionProps) {
  const { confirm, status, error } = useGuestConfirmation()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: { nom: '', prenom: '', email: '', fonction: 'Invité' }
  })

  const onSubmit = async (data: GuestFormValues) => {
    try {
      const result = await confirm(data)
      onSuccess(result)
      setTimeout(() => {
        const lenis = (window as any).lenis
        if (lenis) {
          lenis.scrollTo('#mon-acces', { offset: -100 })
        } else {
          document.querySelector('#mon-acces')?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    } catch (e) {
      // Error handled by hook
    }
  }

  const inputClasses = "w-full bg-wafa-very-dark/50 border border-wafa-gold/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-wafa-gold/50 focus:border-wafa-gold/50 transition-all font-montserrat"
  const labelClasses = "block text-sm font-medium text-white/80 mb-2 font-montserrat"

  return (
    <section id="confirmer" className="section-padding relative bg-wafa-very-dark overflow-hidden z-10">
      <TexturePattern opacity={0.15} blendMode="normal" />
      
      <SectionWrapper className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="glass rounded-3xl p-8 md:p-12 border border-wafa-gold/30 shadow-2xl relative overflow-hidden">
          {/* Deco */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-wafa-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="text-center mb-10 relative z-10">
            {/* Ornamental line + diamond */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-wafa-gold/60" />
              <svg width="10" height="10" viewBox="0 0 12 12" className="text-wafa-gold fill-current rotate-45">
                <rect x="1" y="1" width="10" height="10" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-wafa-gold/60" />
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Confirmez{' '}
              <span className="relative inline-block">
                <span className="text-wafa-gold">Votre Présence</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  height="8"
                >
                  <path
                    d="M0 6 Q50 0 100 4 Q150 8 200 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    className="text-wafa-gold/40"
                  />
                </svg>
              </span>
            </h2>
            <p className="font-montserrat text-white/70">
              Remplissez ce formulaire pour générer votre accès personnel.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-montserrat text-red-200">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="prenom" className={labelClasses}>Prénom</label>
                <input id="prenom" {...register('prenom')} className={inputClasses} placeholder="Votre prénom" />
                {errors.prenom && <p className="mt-2 text-xs text-red-400 font-montserrat">{errors.prenom.message}</p>}
              </div>
              
              <div>
                <label htmlFor="nom" className={labelClasses}>Nom</label>
                <input id="nom" {...register('nom')} className={inputClasses} placeholder="Votre nom" />
                {errors.nom && <p className="mt-2 text-xs text-red-400 font-montserrat">{errors.nom.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>Email Professionnel</label>
              <input id="email" type="email" {...register('email')} className={inputClasses} placeholder="prenom.nom@entreprise.com" />
              {errors.email && <p className="mt-2 text-xs text-red-400 font-montserrat">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="fonction" className={labelClasses}>Fonction / Statut</label>
              <select id="fonction" {...register('fonction')} className={inputClasses}>
                <option value="Invité" className="bg-wafa-dark">Invité</option>
                <option value="Journaliste" className="bg-wafa-dark">Journaliste</option>
              </select>
              {errors.fonction && <p className="mt-2 text-xs text-red-400 font-montserrat">{errors.fonction.message}</p>}
            </div>

            <GoldButton
              type="submit"
              size="lg"
              className="w-full mt-4"
              isLoading={status === 'loading'}
            >
              Générer Mon Accès
            </GoldButton>
          </form>
        </div>
      </SectionWrapper>
    </section>
  )
}
