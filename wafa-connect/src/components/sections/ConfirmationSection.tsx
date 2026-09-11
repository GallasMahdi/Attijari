'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, ArrowRight, Zap, Calendar, Clock } from 'lucide-react'
import { guestSchema, GuestFormValues } from '@/lib/validations'
import { useGuestConfirmation } from '@/hooks/useGuestConfirmation'
import { GuestResponse } from '@/types/guest'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GuestQRCard } from '@/components/ui/GuestQRCard'
import { EVENT } from '@/lib/constants'

interface ConfirmationSectionProps {
  onSuccess: (data: GuestResponse) => void
  guestData?: GuestResponse | null
  onReset?: () => void
}

export function ConfirmationSection({ onSuccess, guestData: externalGuestData, onReset: externalOnReset }: ConfirmationSectionProps) {
  const { confirm, status, error, reset: resetHook } = useGuestConfirmation()
  const [internalGuest, setInternalGuest] = useState<GuestResponse | null>(null)

  const currentGuest = externalGuestData ?? internalGuest

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      fonction: 'Invité VIP — Dynamic Launch',
      sessionSlot: 'Pass VIP Prestige — Accès Intégral'
    }
  })

  const onSubmit = async (data: GuestFormValues) => {
    try {
      const result = await confirm(data)
      setInternalGuest(result)
      onSuccess(result)
    } catch (e) {
      // Handled by hook
    }
  }

  // Auto-restore cached VIP pass for instant offline access at Domaine Neferis
  useEffect(() => {
    try {
      const cached = localStorage.getItem('porsche_vip_pass')
      if (cached && !externalGuestData) {
        const parsed = JSON.parse(cached)
        if (parsed?.qrData) {
          setInternalGuest(parsed)
          onSuccess(parsed)
        }
      }
    } catch {}
  }, [])

  const handleReset = () => {
    try { localStorage.removeItem('porsche_vip_pass') } catch {}
    setInternalGuest(null)
    resetHook()
    if (externalOnReset) externalOnReset()
  }

  const inputClasses = "w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E0681C] focus:border-[#E0681C] transition-all font-sans text-sm"
  const labelClasses = "block text-xs font-semibold text-[#6D8080] mb-2 font-sans uppercase tracking-wider"

  return (
    <section id="confirmer" className="py-16 md:py-24 relative bg-[#08090C] overflow-hidden border-t border-white/5 z-10">
      {/* Background atmosphere */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-[#6D8080]/[0.05] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[400px] bg-[#E0681C]/[0.05] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 max-w-3xl relative z-10">
        <AnimatePresence mode="wait">
          {!currentGuest ? (
            /* RSVP Form View */
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 md:p-12 bg-[#0E1015] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden"
            >
              {/* Subtle top hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, #6D8080 30%, #ffffff 50%, #E0681C 70%, transparent)' }}
              />

              <div className="text-center mb-8 sm:mb-10 relative z-10">
                {/* Co-branding pill */}
                <div className="inline-flex items-center flex-wrap justify-center gap-2 xs:gap-3 px-3 xs:px-4 py-1.5 rounded-full border border-[#6D8080]/30 bg-[#6D8080]/10 backdrop-blur-md mb-5 max-w-full">
                  <div className="relative w-7 h-3.5 xs:w-8 xs:h-4 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/2k.png"
                      alt="2K Events"
                      width={32}
                      height={16}
                      className="object-contain brightness-125"
                      priority
                    />
                  </div>
                  <span className="text-gray-500 text-xs">×</span>
                  <span className="font-outfit font-black tracking-[0.2em] xs:tracking-[0.25em] text-white text-[10px] xs:text-[11px] uppercase">
                    PORSCHE
                  </span>
                  <div className="h-2.5 w-px bg-white/20" />
                  <span className="font-mono text-[8px] xs:text-[9px] font-bold uppercase tracking-[0.2em] xs:tracking-[0.25em] text-[#6D8080]">
                    CAYENNE E4 LAUNCH
                  </span>
                </div>

                <h2 className="font-outfit text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider mb-4 leading-tight">
                  Spaces Are{' '}
                  <span className="text-gradient-terracotta italic">Limited</span>
                </h2>
                <p className="font-outfit italic text-lg text-gray-300 mb-2">
                  &ldquo;The next chapter for Cayenne.&rdquo;
                </p>
                <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
                  RSVP now to secure your space at the Porsche Cayenne E4 Dynamic Launch. Complétez ce formulaire pour recevoir votre QR Pass d'accès officiel.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-950/60 border border-red-500/50 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-sans text-red-200">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prenom" className={labelClasses}>Prénom</label>
                    <input
                      id="prenom"
                      {...register('prenom')}
                      className={inputClasses}
                      placeholder="Ex: Marc"
                      autoComplete="given-name"
                    />
                    {errors.prenom && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.prenom.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="nom" className={labelClasses}>Nom</label>
                    <input
                      id="nom"
                      {...register('nom')}
                      className={inputClasses}
                      placeholder="Ex: De Neuville"
                      autoComplete="family-name"
                    />
                    {errors.nom && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.nom.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>Email Professionnel</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={inputClasses}
                    placeholder="contact@domaine.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.email.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fonction" className={labelClasses}>Profil Invité</label>
                    <select id="fonction" {...register('fonction')} className={`${inputClasses} cursor-pointer`}>
                      <option value="Invité VIP — Dynamic Launch" className="bg-[#0E1015] text-white">
                        Invité VIP — Dynamic Launch Experience
                      </option>
                      <option value="Partenaire Fleet & Business" className="bg-[#0E1015] text-white">
                        Partenaire Fleet & Business
                      </option>
                      <option value="Presse & Média Officiel" className="bg-[#0E1015] text-white">
                        Presse & Média — Test Drive & Conférence
                      </option>
                    </select>
                    {errors.fonction && <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.fonction.message}</p>}
                  </div>

                  <div>
                    <label className={labelClasses}>Formule d'Accès</label>
                    <input type="hidden" {...register('sessionSlot')} value="Pass VIP Prestige — Accès Intégral" />
                    <div className="w-full px-4 py-3.5 rounded-xl bg-[#0E1015] border border-[#E0681C]/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#E0681C] animate-pulse flex-shrink-0" />
                        <span className="font-outfit text-xs sm:text-sm font-bold text-white tracking-wide">
                          Pass VIP Prestige · Accès Intégral
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#E0681C]/15 border border-[#E0681C]/40 text-[#E0681C] font-mono text-[9px] font-bold uppercase tracking-wider flex-shrink-0">
                        Inclus
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Info Badge & Campaign ID */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#E0681C]" />
                    <span>{EVENT.dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6D8080]">
                    <Clock className="w-3.5 h-3.5 text-[#6D8080]" />
                    <span>{EVENT.timeLabel}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">
                    ID : {EVENT.campaignId}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-4 py-4 px-8 rounded-xl font-outfit font-black text-xs md:text-sm tracking-[0.2em] uppercase text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer bg-[#E0681C] hover:bg-[#ff7a26] shadow-[0_0_25px_rgba(224,104,28,0.35)]"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Génération du QR Pass...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Sécuriser Ma Place · RSVP Now
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* Pass Reveal View */
            <motion.div
              key="generated-pass"
              id="mon-acces"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-6">
                <h2 className="font-outfit text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-1">
                  Votre Place est{' '}
                  <span className="text-gradient-terracotta italic">Sécurisée</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                  Présentez ce QR Code à l'entrée du circuit le jour de l'événement.
                </p>
              </div>

              <GuestQRCard guest={currentGuest} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </SectionWrapper>
    </section>
  )
}
