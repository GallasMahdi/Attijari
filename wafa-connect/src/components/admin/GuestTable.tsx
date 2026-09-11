'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, RefreshCw, Users, CheckCircle2, Clock,
  ArrowUpDown, ArrowUp, ArrowDown, Download,
  Wifi, WifiOff
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
  const header = ['Prénom', 'Nom', 'Email', 'Fonction', 'Statut', "Heure d'arrivée"]
  const rows = guests.map(g => [
    g.prenom, g.nom, g.email, g.fonction,
    g.arrived ? 'Arrivé' : 'En attente',
    g.arrivedAt
      ? new Date(g.arrivedAt).toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit' })
      : '',
  ])
  const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `invités-${new Date().toISOString().slice(0, 10)}.csv`
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
      ? <ArrowUp className="w-3 h-3 text-wafa-gold" />
      : <ArrowDown className="w-3 h-3 text-wafa-gold" />
  }

  const displayedGuests = sortGuests(guests, sortKey, sortDir)

  const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'arrived', label: 'Paddock Entré' },
    { key: 'pending', label: 'En Attente' },
  ]

  return (
    <div className="flex flex-col gap-4">

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Accrédités', value: stats.total, icon: Users, color: 'text-white', bg: 'bg-white/5', border: 'border-white/10' },
            { label: 'Au Paddock', value: stats.arrived, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            { label: 'En Route', value: stats.pending, icon: Clock, color: 'text-red-400', bg: 'bg-red-600/10', border: 'border-red-500/20' },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`rounded-2xl ${bg} border ${border} p-4 flex flex-col items-center gap-1 shadow-sm backdrop-blur-sm`}>
              <Icon className={`w-5 h-5 ${color}`} />
              <p className={`font-montserrat text-2xl font-black ${color}`}>{value}</p>
              <p className="font-montserrat text-[9px] text-gray-400 font-bold uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Progress Bar ───────────────────────────────────────────────────── */}
      {stats && (
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500"
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
            placeholder="Rechercher pilote, VIP..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-black/40 border border-white/10 rounded-xl font-montserrat text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all shadow-inner"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs transition-colors"
            >✕</button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-black/40 border border-white/10 rounded-xl p-1">
          {FILTER_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-lg font-montserrat text-[10px] uppercase font-bold tracking-wider transition-all ${filter === key
                ? 'bg-red-600 text-white shadow-sm'
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
          title={autoRefresh ? 'Télémétrie Live active' : 'Télémétrie en pause'}
          className={`p-2.5 rounded-xl border transition-all ${autoRefresh
            ? 'bg-red-600/10 border-red-500/30 text-red-400 shadow-sm'
            : 'bg-black/30 border-white/10 text-gray-500 hover:text-gray-300'
            }`}
        >
          {autoRefresh ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        </button>

        {/* Manual refresh */}
        <button
          onClick={() => fetchData(search, filter)}
          className="p-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all shadow-sm"
          title="Actualiser"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>

        {/* Export CSV */}
        <button
          onClick={() => exportToCSV(displayedGuests)}
          disabled={displayedGuests.length === 0}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-white/10 border border-white/15 text-white rounded-xl font-montserrat text-[10px] font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-500 transition-all disabled:opacity-30 disabled:grayscale shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* ── Last refreshed timestamp ────────────────────────────────────────── */}
      {lastRefreshed && (
        <p className="font-montserrat text-[10px] text-gray-400 text-right -mt-2 italic">
          Dernière synchronisation : {lastRefreshed.toLocaleTimeString('fr-FR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          {autoRefresh && <span className="ml-1 text-red-500 font-bold">· TELEMETRY SYNCED</span>}
        </p>
      )}

      {/* ── Column sort headers ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-3 pb-2 border-b border-white/10">
        <button
          onClick={() => handleSort('nom')}
          className="flex items-center gap-1 font-montserrat text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-red-400 transition-colors flex-1"
        >
          Pilote / Invité <SortIcon col="nom" />
        </button>
        <span className="font-montserrat text-[10px] uppercase font-bold tracking-widest text-gray-400 flex-1 hidden sm:block">
          Contact & Rôle
        </span>
        <button
          onClick={() => handleSort('arrivedAt')}
          className="flex items-center gap-1 font-montserrat text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-red-400 transition-colors"
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
              className="text-center py-10 text-white/40 font-montserrat text-xs"
            >
              {search
                ? `Aucun pilote ou invité trouvé pour "${search}".`
                : 'Aucune accréditation confirmée pour le moment.'}
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
              className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all ${g.arrived
                ? 'bg-emerald-950/20 border-emerald-500/30 shadow-sm'
                : 'bg-black/30 border-white/5 hover:border-white/20'
                }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm ${g.arrived ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'
                }`} />

              <div className="flex-1 min-w-0">
                <p className="font-montserrat font-bold text-sm text-white truncate">
                  {g.prenom} {g.nom}
                </p>
                <p className="font-montserrat text-[11px] text-gray-400 truncate mt-0.5">
                  {g.email} · <span className="font-semibold text-red-400">{g.fonction}</span>
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                {g.arrived && g.arrivedAt ? (
                  <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="font-montserrat text-[10px] font-bold text-emerald-400">
                      {new Date(g.arrivedAt).toLocaleTimeString('fr-FR', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                ) : (
                  <span className="px-2 py-1 rounded bg-white/5 font-montserrat text-[9px] font-bold text-gray-400 uppercase tracking-wider">
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
        <p className="font-montserrat text-[10px] text-white/30 text-center uppercase tracking-wider">
          {displayedGuests.length} accréditation{displayedGuests.length > 1 ? 's' : ''} répertoriée{displayedGuests.length > 1 ? 's' : ''}
          {search && ` · "${search}"`}
        </p>
      )}
    </div>
  )
}