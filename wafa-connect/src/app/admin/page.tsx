'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ShieldCheck, LogOut, Clock } from 'lucide-react'
import type { ScanResult } from '@/types/guest'
const ScanResultOverlay = dynamic(() => import('@/components/admin/ScanResultOverlay').then(mod => mod.ScanResultOverlay))
const GuestTable = dynamic(() => import('@/components/admin/GuestTable').then(mod => mod.GuestTable))

// Lazy-load the camera scanner to avoid SSR issues
const QRScanner = dynamic(
  () => import('@/components/admin/QRScanner').then((m) => ({ default: m.QRScanner })),
  { ssr: false, loading: () => <div className="w-full aspect-square rounded-2xl bg-white/5 animate-pulse" /> }
)

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? ''

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [recentScans, setRecentScans] = useState<ScanResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [scannerName, setScannerName] = useState('Reception 1')
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

      if (!res.ok) throw new Error('API_ERROR')

      const result: ScanResult = await res.json()
      setScanResult(result)

      if (result.status === 'valid' || result.status === 'already_scanned') {
        // Update session history only if guest data exists
        if (result.guest) {
          setRecentScans(prev => {
            // Prevent duplicates in history if scanned multiple times
            if (prev.length > 0 && prev[0].guest?.guestId === result.guest?.guestId) return prev
            return [result, ...prev].slice(0, 3)
          })
        }

        if (result.status === 'valid') {
          setRefreshTrigger((n) => n + 1)
        }
      }
    } catch (err) {
      setScanResult({
        status: 'invalid',
        message: '⚠️ Problème de connexion. Veuillez vérifier votre réseau.'
      })
    } finally {
      // Cooldown to avoid double-scans if the camera isn't moved
      setTimeout(() => {
        setIsProcessing(false)
      }, 3000)
    }
  }, [isProcessing, scannerName])

  const dismissResult = useCallback(() => {
    setScanResult(null)
  }, [])

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-wafa-cream flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern4.jpeg')] bg-repeat bg-[length:300px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm relative z-10"
        >
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="relative w-56 h-16">
              <Image src="/logo2.png" alt="Attijari Assurance" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-2 text-wafa-gold">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-montserrat text-xs tracking-[0.3em] uppercase font-bold">Portail Réception</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 flex flex-col gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-wafa-gold/10">
            <div className="space-y-1 text-center">
              <h1 className="font-playfair text-2xl font-bold text-wafa-dark">Accès Réception</h1>
              <p className="font-montserrat text-[10px] text-gray-400 uppercase tracking-wider">
                Entrez le mot de passe organisateur
              </p>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-montserrat text-sm text-wafa-dark placeholder-gray-400 focus:outline-none focus:border-wafa-gold/50 focus:bg-white transition-all shadow-inner"
                autoFocus
              />
            </div>

            {authError && (
              <p className="font-montserrat text-xs text-red-500 text-center font-medium bg-red-50 py-2 rounded-lg">{authError}</p>
            )}

            <button
              type="submit"
              className="py-4 bg-wafa-gold hover:bg-wafa-dark text-white font-montserrat font-bold rounded-xl transition-all shadow-gold-sm hover:shadow-lg active:scale-[0.98]"
            >
              Accéder au Portail
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ─── Admin Portal ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-wafa-cream">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-wafa-gold/20 px-4 py-4 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative w-40 h-10 group">
              <Image
                src="/logo2.png"
                alt="Attijari Assurance"
                fill
                className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="h-8 w-px bg-wafa-gold/20 hidden md:block" />
            <div className="hidden md:flex flex-col">
              <span className="font-montserrat text-[10px] text-wafa-gold font-bold tracking-[0.2em] uppercase leading-none mb-1">
                Wafa Connect
              </span>
              <span className="font-montserrat text-[10px] text-wafa-dark font-medium tracking-widest uppercase leading-none opacity-60">
                Portail Réception
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Device Info */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-inner">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <select
                value={scannerName}
                onChange={(e) => setScannerName(e.target.value)}
                className="font-montserrat text-[11px] bg-transparent text-wafa-dark font-bold focus:outline-none cursor-pointer appearance-none pr-1 uppercase tracking-wider"
              >
                {['Reception 1', 'Reception 2', 'Reception 3', 'Superviseur'].map((n) => (
                  <option key={n} value={n}>{n}</option>
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
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-montserrat text-xs font-bold transition-all duration-300 shadow-sm"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Quitter</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Scanner */}
        <section className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-wafa-gold/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-xl font-bold text-wafa-dark">
                Scanner QR Code
              </h2>
              <div className="px-2 py-1 bg-wafa-gold/10 rounded-md">
                <span className="font-montserrat text-[10px] text-wafa-gold font-bold uppercase tracking-wider">Live Scanner</span>
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
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-wafa-gold/10">
            <h3 className="font-playfair text-lg font-bold text-wafa-dark mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-wafa-gold" />
              Activité Récente
            </h3>
            <div className="flex flex-col gap-3">
              {recentScans.length === 0 ? (
                <p className="font-montserrat text-xs text-gray-400 italic py-4 text-center">
                  Aucun scan effectué durant cette session.
                </p>
              ) : (
                recentScans.map((scan, idx) => (
                  <motion.div
                    key={`${scan.guest?.guestId}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="flex flex-col">
                      <span className="font-montserrat font-bold text-xs text-wafa-dark">
                        {scan.guest?.prenom} {scan.guest?.nom}
                      </span>
                      <span className="font-montserrat text-[10px] text-gray-400">
                        {scan.guest?.fonction}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-lg font-montserrat text-[9px] font-bold uppercase tracking-wider ${scan.status === 'valid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                      {scan.status === 'valid' ? 'Entrée' : 'Déjà vu'}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Right: Guest List & Stats */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-wafa-gold/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl font-bold text-wafa-dark">
              Liste des Invités
            </h2>
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
