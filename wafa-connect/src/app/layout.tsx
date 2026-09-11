// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ToastProvider } from '@/components/ui/Toast'
import './globals.css'

// Monospace fallback: Digital track instrument precision
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://porsche-experience.com'),
  title: {
    default: 'Porsche Cayenne Electric (E4) Launch Event | Heritage × Future',
    template: '%s | Porsche Cayenne E4 Launch · 2K Events',
  },
  description:
    'Lancement exclusif du Porsche Cayenne E4 Electric au Domaine Neferis par 2K Events × Porsche Middle East & Africa. ' +
    'Heritage × Future : Two worlds. One drive. Accréditation officielle, vagues d\'essais dynamiques et pass VIP.',
  keywords: [
    'Porsche', 'Cayenne E4', 'Cayenne Electric', 'Domaine Neferis', '2K Events',
    'Porsche Middle East & Africa', 'Heritage Future', 'World Premiere', 'VIP Accreditation'
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Porsche Cayenne Electric (E4) Launch Event | Heritage × Future',
    description: 'Lancement officiel du Cayenne E4 au Domaine Neferis. Two worlds. One drive.',
    siteName: 'Porsche × 2K Events',
    images: [{ url: '/porsche-cayenne-e4-hero.jpg', width: 1200, height: 675, alt: 'Porsche Cayenne E4 Electric Hero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Porsche Cayenne Electric (E4) Launch Event',
    description: 'Heritage × Future · Le Domaine Neferis · 2K Events × Porsche',
    images: ['/porsche-cayenne-e4-hero.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08090C',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jetbrainsMono.variable}`}>
      <head>
        {/* Preload Avenue — LCP hero (first image shown on mount) */}
        <link
          rel="preload"
          href="/domaine-neferis-entrance.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        {/* Prefetch Cayenne E4 hero — ready for instant mode switch */}
        <link
          rel="prefetch"
          href="/porsche-cayenne-e4-hero.jpg"
          as="image"
          type="image/jpeg"
        />
        {/* Preload Porsche Next TT — primary brand typeface (TTF) */}
        <link
          rel="preload"
          href="/fonts/porsche-next-tt.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/porsche-next-tt-bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/porsche-next-tt-italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/porsche-next-tt-bold-italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Porsche Next woff2 fallbacks */}
        <link
          rel="preload"
          href="/fonts/porsche-next-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/porsche-next-latin-bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
