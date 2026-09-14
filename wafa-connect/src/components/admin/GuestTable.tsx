'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, RefreshCw, Users, CheckCircle2, Clock,
  ArrowUpDown, ArrowUp, ArrowDown, Download,
  Wifi, WifiOff, ShieldCheck
} from 'lucide-react'
import type { AdminGuest, EventStats } from '@/types/guest'

interface GuestTableProps {
  adminToken: string
  refreshTrigger: number
}

type FilterType = 'all' | 'arrived' | 'pending'
type SortKey = 'nom' | 'arrivedAt' | null
type SortDir = 'asc' | 'desc'

// ─── CSV Export ────────────────────────────────────────────────────────────────
function exportToCSV(guests: AdminGuest[]) {
  const header = ['Prénom', 'Nom', 'Email', 'Fonction', 'Formule d’Accès', 'Statut', "Heure d'arrivée"]
  const rows = guests.map(g => [
    g.prenom,
    g.nom,
    g.email,
    g.fonction,
    'Pass VIP Prestige · Accès Intégral',
    g.arrived ? 'Présent au Domaine' : 'En attente',
    g.arrivedAt
      ? new Date(g.arrivedAt).toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit' })
      : '',
  ])
  const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `porsche-vip-invites-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Sort helper ───────────────────────────────────────────────────────────────
function sortGuests(guests: AdminGuest[], key: SortKey, dir: SortDir): AdminGuest[] {
  if (!key) return guests
  return [...guests].sort((a, b) => {
    let av: string | number = '', bv: string | number = ''
    if (key === 'nom') {
      av = `${a.nom} ${a.prenom}`.toLowerCase()
      bv = `${b.nom} ${b.prenom}`.toLowerCase()
    }
    if (key === 'arrivedAt') {
      av = a.arrivedAt ? new Date(a.arrivedAt).getTime() : 0
      bv = b.arrivedAt ? new Date(b.arrivedAt).getTime() : 0
    }
    return dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
  })
}

const AUTO_REFRESH_INTERVAL = 30_000

export function GuestTable({ adminToken, refreshTrigger }: GuestTableProps) {
  const [guests, setGuests] = useState<AdminGuest[]>([])
  const [stats, setStats] = useState<EventStats | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // ─── Fetch with AbortController ───────────────────────────────────────────
  const fetchData = useCallback(async (q: string, f: FilterType, silent = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    if (!silent) setLoading(true)
    try {
      const [guestRes, statsRes] = await Promise.all([
        fetch(`/api/guests?q=${encodeURIComponent(q)}&filter=${f}`, {
          headers: { 'x-admin-token': adminToken },
          signal: controller.signal,
        }),
        fetch('/api/stats', {
          headers: { 'x-admin-token': adminToken },
          signal: controller.signal,
        }),
      ])
      if (guestRes.ok) setGuests((await guestRes.json()).guests)
      if (statsRes.ok) setStats(await statsRes.json())
      setLastRefreshed(new Date())
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error('Fetch error:', err)
      }
    } finally {
      if (!silent) setLoading(false)
    }
  }, [adminToken])

  // Debounced search + filter + external trigger
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchData(search, filter), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [search, filter, fetchData, refreshTrigger])

  // Auto-refresh
  useEffect(() => {
    if (autoRefreshRef.current) clearInterval(autoRefreshRef.current)
    if (autoRefresh) {
      autoRefreshRef.current = setInterval(
        () => fetchData(search, filter, true),
        AUTO_REFRESH_INTERVAL
      )
    }
    return () => { if (autoRefreshRef.current) clearInterval(autoRefreshRef.current) }
  }, [autoRefresh, search, filter, fetchData])

  // ─── Sort ──────────────────────────────────────────────────────────────────
  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 opacity-30" />
    return sortDir === 'asc'
      ? <ArrowUp className="w-3 h-3 text-[#E0681C]" />
      : <ArrowDown className="w-3 h-3 text-[#E0681C]" />
  }

  const displayedGuests = sortGuests(guests, sortKey, sortDir)

  const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Tous les Invités' },
    { key: 'arrived', label: 'Présents au Domaine' },
    { key: 'pending', label: 'En Attente' },
  ]

  return (
    <div className="flex flex-col gap-4">

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: 'Accréditations VIP', shortLabel: 'Accréditations', value: stats.total, icon: Users, color: 'text-white', bg: 'bg-white/5', border: 'border-white/10' },
            { label: 'Présents au Domaine', shortLabel: 'Présents', value: stats.arrived, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            { label: 'En Attente d’Arrivée', shortLabel: 'En Attente', value: stats.pending, icon: Clock, color: 'text-[#E0681C]', bg: 'bg-[#E0681C]/10', border: 'border-[#E0681C]/25' },
          ].map(({ label, shortLabel, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`rounded-xl sm:rounded-2xl ${bg} border ${border} p-2.5 sm:p-4 flex flex-col items-center text-center gap-1 shadow-sm backdrop-blur-sm`}>
              <Icon className={`w-3.5 sm:w-5 h-3.5 sm:h-5 ${color}`} />
              <p className={`font-outfit text-lg xs:text-xl sm:text-2xl font-black ${color}`}>{value}</p>
              <p className="font-mono text-[7.5px] xs:text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider line-clamp-1 sm:line-clamp-none">
                <span className="xs:hidden">{shortLabel}</span>
                <span className="hidden xs:inline">{label}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Progress Bar ───────────────────────────────────────────────────── */}
      {stats && (
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6D8080] via-[#E0681C] to-emerald-400"
            animate={{ width: `${stats.percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap items-center">

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-black/40 border border-white/10 rounded-xl font-sans text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E0681C] focus:ring-1 focus:ring-[#E0681C]/40 transition-all shadow-inner"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs transition-colors cursor-pointer"
            >✕</button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-black/40 border border-white/10 rounded-xl p-1">
          {FILTER_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-outfit text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${filter === key
                ? 'bg-[#E0681C] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Auto-refresh toggle */}
        <button
          onClick={() => setAutoRefresh(v => !v)}
          title={autoRefresh ? 'Synchronisation continue active' : 'Synchronisation en pause'}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${autoRefresh
            ? 'bg-[#E0681C]/15 border-[#E0681C]/35 text-[#E0681C] shadow-sm'
            : 'bg-black/30 border-white/10 text-gray-500 hover:text-gray-300'
            }`}
        >
          {autoRefresh ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        </button>

        {/* Manual refresh */}
        <button
          onClick={() => fetchData(search, filter)}
          className="p-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all shadow-sm cursor-pointer"
          title="Actualiser le registre"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>

        {/* Export CSV */}
        <button
          onClick={() => exportToCSV(displayedGuests)}
          disabled={displayedGuests.length === 0}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-white/10 border border-white/15 text-white rounded-xl font-outfit text-[10px] font-bold uppercase tracking-wider hover:bg-[#E0681C] hover:border-[#E0681C] transition-all disabled:opacity-30 disabled:grayscale shadow-sm cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* ── Last refreshed timestamp ────────────────────────────────────────── */}
      {lastRefreshed && (
        <p className="font-mono text-[10px] text-gray-400 text-right -mt-2">
          Synchronisé à : {lastRefreshed.toLocaleTimeString('fr-FR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          {autoRefresh && <span className="ml-1.5 text-[#E0681C] font-bold">· LIVE SYNC</span>}
        </p>
      )}

      {/* ── Column sort headers ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-3 pb-2 border-b border-white/10">
        <button
          onClick={() => handleSort('nom')}
          className="flex items-center gap-1 font-outfit text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-[#E0681C] transition-colors flex-1 cursor-pointer"
        >
          Invité VIP <SortIcon col="nom" />
        </button>
        <span className="font-outfit text-[10px] uppercase font-bold tracking-widest text-gray-400 flex-1 hidden sm:block">
          Fonction & Statut
        </span>
        <button
          onClick={() => handleSort('arrivedAt')}
          className="flex items-center gap-1 font-outfit text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-[#E0681C] transition-colors cursor-pointer"
        >
          Horodatage <SortIcon col="arrivedAt" />
        </button>
      </div>

      {/* ── Guest List ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {displayedGuests.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-white/40 font-sans text-xs"
            >
              {search
                ? `Aucun invité VIP trouvé pour "${search}".`
                : 'Aucune accréditation enregistrée pour le moment.'}
            </motion.div>
          )}

          {displayedGuests.map((g, i) => (
            <motion.div
              key={g.guestId}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-center gap-3 sm:gap-4 p-3.5 rounded-2xl border transition-all ${g.arrived
                ? 'bg-emerald-950/20 border-emerald-500/30 shadow-sm'
                : 'bg-black/30 border-white/5 hover:border-white/20'
                }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm ${g.arrived ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'
                }`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-outfit font-bold text-sm text-white truncate">
                    {g.prenom} {g.nom}
                  </p>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#6D8080] border border-white/10">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#E0681C]" />
                    Pass Intégral
                  </span>
                </div>
                <p className="font-sans text-[11px] text-gray-400 truncate mt-0.5">
                  {g.email} · <span className="font-semibold text-[#E0681C]">{g.fonction}</span>
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                {g.arrived && g.arrivedAt ? (
                  <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="font-mono text-[10px] font-bold text-emerald-400">
                      {new Date(g.arrivedAt).toLocaleTimeString('fr-FR', {
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    En attente
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Footer count ───────────────────────────────────────────────────── */}
      {displayedGuests.length > 0 && (
        <p className="font-mono text-[10px] text-white/40 text-center uppercase tracking-wider">
          {displayedGuests.length} invité{displayedGuests.length > 1 ? 's' : ''} VIP répertorié{displayedGuests.length > 1 ? 's' : ''}
          {search && ` · Recherche : "${search}"`}
        </p>
      )}
    </div>
  )
}