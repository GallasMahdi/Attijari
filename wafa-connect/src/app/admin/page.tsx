'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ShieldCheck, LogOut, Clock, Eye, EyeOff } from 'lucide-react'
import type { ScanResult } from '@/types/guest'
const ScanResultOverlay = dynamic(() => import('@/components/admin/ScanResultOverlay').then(mod => mod.ScanResultOverlay))
const GuestTable = dynamic(() => import('@/components/admin/GuestTable').then(mod => mod.GuestTable))

// Lazy-load the camera scanner to avoid SSR issues
const QRScanner = dynamic(
  () => import('@/components/admin/QRScanner').then((m) => ({ default: m.QRScanner })),
  { ssr: false, loading: () => <div className="w-full aspect-square rounded-2xl bg-white/5 animate-pulse" /> }
)

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '2K-VIP-2026'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [recentScans, setRecentScans] = useState<ScanResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [scannerName, setScannerName] = useState('Accueil Principal VIP')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const adminTokenRef = useRef('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      adminTokenRef.current = password
      localStorage.setItem('wafa_admin_token', password)
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Mot de passe incorrect.')
    }
  }

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem('wafa_admin_token')
    if (saved && saved === ADMIN_PASSWORD) {
      adminTokenRef.current = saved
      setAuthed(true)
    }
  }, [])

  const handleScan = useCallback(async (qrData: string) => {
    if (isProcessing) return
    setIsProcessing(true)
    setScanResult(null)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminTokenRef.current,
        },
        body: JSON.stringify({ qrData, scannedBy: scannerName }),
      })

      if (res.status === 401) {
        setAuthed(false)
        localStorage.removeItem('wafa_admin_token')
        return
      }

      const result: ScanResult = await res.json()
      setScanResult(result)

      if (result.status === 'valid' || result.status === 'already_scanned') {
        setRecentScans((prev) => [result, ...prev.slice(0, 4)])
        if (result.status === 'valid') {
          setRefreshTrigger((n) => n + 1)
        }
      }
    } catch {
      setScanResult({
        status: 'invalid',
        message: '⚠️ Problème de connexion. Veuillez vérifier votre réseau.',
      })
    } finally {
      setTimeout(() => {
        setIsProcessing(false)
      }, 2500)
    }
  }, [isProcessing, scannerName])

  const dismissResult = useCallback(() => {
    setScanResult(null)
  }, [])

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 carbon-pattern opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/[0.08] blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Dual Brand: 2K Events first */}
          <div className="flex flex-col items-center gap-3 mb-8 text-center">
            <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <Image
                src="/2k.png"
                alt="2K Events"
                width={120}
                height={46}
                className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                priority
              />
              <span className="text-white/30 font-light text-base">×</span>
              <span className="font-outfit font-black text-xl tracking-[0.25em] text-white uppercase">
                PORSCHE
              </span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold text-red-400">
                Contrôle d'Accès VIP Gala
              </span>
            </div>
          </div>

          <div className="relative z-10 rounded-[2rem] p-[1px] bg-gradient-to-b from-red-600/30 via-white/10 to-transparent shadow-2xl">
            <form onSubmit={handleLogin} className="bg-[#0E1015] rounded-[calc(2rem-1px)] p-8 sm:p-10 flex flex-col gap-6 border border-white/10">
              <div className="space-y-1 text-center">
                <h1 className="font-outfit text-2xl font-bold text-white tracking-wider">Poste d'Accueil VIP</h1>
                <p className="font-sans text-xs text-gray-400 tracking-wide">
                  Entrez le code d'accès sécurité pour activer le scanner
                </p>
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/70 group-focus-within:text-red-500 transition-colors duration-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Code d'accès (ex: 2K-VIP-2026)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-black/60 border border-white/15 rounded-xl font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="font-sans text-xs text-red-400 text-center font-medium bg-red-950/40 py-2.5 rounded-xl border border-red-500/30"
                >
                  {authError}
                </motion.p>
              )}

              <button
                type="submit"
                className="py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white font-outfit font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(213,0,28,0.6)] transition-all duration-300"
              >
                Ouvrir le Scanner d'Accès
              </button>

              <div className="text-center">
                <span className="font-mono text-[11px] text-gray-500">
                  Accès par défaut : <code className="text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">2K-VIP-2026</code>
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  // ─── Admin Portal ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-b from-red-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              prefetch={true}
              className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95"
              title="Retour à l'expérience"
            >
              <Image
                src="/2k.png"
                alt="2K Events"
                width={90}
                height={34}
                className="h-7 w-auto object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
              />
              <span className="text-white/30 font-light">×</span>
              <div className="flex flex-col">
                <span className="font-outfit font-black text-lg tracking-[0.2em] text-white uppercase leading-none group-hover:text-red-400 transition-colors">
                  PORSCHE
                </span>
                <span className="font-mono text-[8px] text-red-400 font-bold tracking-[0.25em] uppercase mt-1">
                  ACCUEIL GALA VIP
                </span>
              </div>
            </Link>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-widest uppercase">
                Système En Ligne
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Device / Station Selector */}
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
              <select
                value={scannerName}
                onChange={(e) => setScannerName(e.target.value)}
                className="font-outfit text-[11px] bg-transparent text-gray-300 font-bold focus:outline-none cursor-pointer pr-1 tracking-wider"
              >
                {['Accueil Principal VIP', 'Salon Champagne 2K', 'Lounge Révélation', 'Superviseur VIP'].map((n) => (
                  <option key={n} value={n} className="bg-[#0B0C10] text-white">{n}</option>
                ))}
              </select>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                setAuthed(false);
                setScanResult(null);
                localStorage.removeItem('wafa_admin_token');
              }}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white font-montserrat text-xs font-bold transition-all duration-300 shadow-sm"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left: Scanner & Recent scans (5 cols) */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#0E1015]/90 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <h2 className="font-outfit text-lg font-bold text-white tracking-wider">
                  Scanner Invitation VIP Gala
                </h2>
              </div>
              <div className="px-2.5 py-1 bg-red-600/10 border border-red-500/20 rounded-md">
                <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider">Optique 2K Live</span>
              </div>
            </div>
            <QRScanner onScan={handleScan} isProcessing={isProcessing} />
          </div>

          {/* Scan Result */}
          <AnimatePresence mode="wait">
            {scanResult && (
              <ScanResultOverlay result={scanResult} onDismiss={dismissResult} />
            )}
          </AnimatePresence>

          {/* Session History */}
          <div className="bg-[#0E1015]/90 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl">
            <h3 className="font-outfit text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              Journal des Accès en Direct
            </h3>
            <div className="flex flex-col gap-2.5">
              {recentScans.length === 0 ? (
                <p className="font-sans text-xs text-gray-500 italic py-6 text-center">
                  En attente de la première arrivée d'invité VIP.
                </p>
              ) : (
                recentScans.map((scan, idx) => (
                  <motion.div
                    key={`${scan.guest?.guestId}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/5 hover:border-red-500/30 transition-all"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-montserrat font-bold text-xs text-white truncate">
                        {scan.guest?.prenom} {scan.guest?.nom}
                      </span>
                      <span className="font-montserrat text-[10px] text-gray-400 truncate">
                        {scan.guest?.fonction}
                      </span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md font-montserrat text-[9px] font-black uppercase tracking-wider flex-shrink-0 ${
                      scan.status === 'valid'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {scan.status === 'valid' ? 'Accès Autorisé' : 'Déjà Validé'}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Right: Guest List & Stats (7 cols) */}
        <section className="lg:col-span-7 bg-[#0E1015]/90 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-white/20 to-transparent" />
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-montserrat text-lg font-bold text-white uppercase tracking-wider">
              Registre des Pilotes & VIP
            </h2>
            <div className="text-[10px] font-montserrat text-gray-400 uppercase tracking-widest">
              Live Feed Synced
            </div>
          </div>
          <GuestTable
            adminToken={adminTokenRef.current}
            refreshTrigger={refreshTrigger}
          />
        </section>
      </main>
    </div>
  )
}
