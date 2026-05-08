'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ShieldCheck, LogOut } from 'lucide-react'
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
      const result: ScanResult = await res.json()
      setScanResult(result)
      if (result.status === 'valid') {
        setRefreshTrigger((n) => n + 1)
      }
    } catch {
      setScanResult({ status: 'invalid', message: 'Erreur réseau. Veuillez réessayer.' })
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, scannerName])

  const dismissResult = useCallback(() => {
    setScanResult(null)
  }, [])

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-wafa-very-dark flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative w-44 h-14">
              <Image src="/logo.webp" alt="Attijari Assurance" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-2 text-wafa-gold">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-montserrat text-sm tracking-widest uppercase">Portail Réception</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <h1 className="font-playfair text-xl font-bold text-white text-center">Accès Réception</h1>
            <p className="font-montserrat text-xs text-white/40 text-center">
              Entrez le mot de passe fourni par l&apos;organisateur
            </p>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-wafa-gold/50 transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <p className="font-montserrat text-xs text-red-400 text-center">{authError}</p>
            )}

            <button
              type="submit"
              className="py-3 bg-wafa-gold hover:bg-wafa-gold-light text-wafa-dark font-montserrat font-bold rounded-xl transition-colors"
            >
              Accéder
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ─── Admin Portal ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-wafa-very-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-wafa-dark/95 backdrop-blur-md border-b border-wafa-gold/15 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-8">
              <Image src="/logo.webp" alt="Attijari Assurance" fill className="object-contain object-left" />
            </div>
            <div className="h-5 w-px bg-white/20" />
            <span className="font-montserrat text-xs text-wafa-gold tracking-widest uppercase">
              Portail Réception
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={scannerName}
              onChange={(e) => setScannerName(e.target.value)}
              className="font-montserrat text-xs bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1.5 focus:outline-none focus:border-wafa-gold/50"
            >
              {['Reception 1', 'Reception 2', 'Reception 3', 'Superviseur'].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button
              onClick={() => { 
                setAuthed(false); 
                setScanResult(null);
                localStorage.removeItem('wafa_admin_token');
              }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white font-montserrat text-xs transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Scanner */}
        <section className="flex flex-col gap-4">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="font-playfair text-lg font-bold text-white mb-4">
              Scanner QR Code
            </h2>
            <QRScanner onScan={handleScan} isProcessing={isProcessing} />
          </div>

          {/* Scan Result */}
          <AnimatePresence>
            {scanResult && (
              <ScanResultOverlay result={scanResult} onDismiss={dismissResult} />
            )}
          </AnimatePresence>
        </section>

        {/* Right: Guest List & Stats */}
        <section className="glass-card rounded-2xl p-5">
          <h2 className="font-playfair text-lg font-bold text-white mb-4">
            Liste des Invités
          </h2>
          <GuestTable
            adminToken={adminTokenRef.current}
            refreshTrigger={refreshTrigger}
          />
        </section>
      </main>
    </div>
  )
}
