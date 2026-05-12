// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ToastProvider } from '@/components/ui/Toast'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wafa-connect.attijariassurance.com.tn'),
  title: {
    default: 'Wafa Connect | Inauguration du Nouveau Siège — Attijari Assurance',
    template: '%s | Wafa Connect',
  },
  description:
    "Rejoignez Attijari Assurance pour l'inauguration de son nouveau siège. " +
    'Jeudi 21 Mai 2026 — Centre Urbain Nord, Tunis. ' +
    'Confirmez votre présence et recevez votre QR code d\'accès.',
  keywords: [
    'Wafa Connect', 'Attijari Assurance', 'inauguration siège',
    'Centre Urbain Nord', 'Tunis', 'événement corporate',
    'assurance Tunisie', '2K Events',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    title: 'Wafa Connect — Attijari Assurance',
    description: 'Inauguration du nouveau siège | 21 Mai 2026 | Tunis',
    siteName: 'Wafa Connect',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Wafa Connect Event' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wafa Connect — Attijari Assurance',
    description: '21 Mai 2026 | Centre Urbain Nord, Tunis',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/logof.png' },
      { url: '/logof.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/logof.png' },
    ],
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#003d2b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/*
         * Preload wafa.png at browser-highest priority so the splash logo
         * is already in cache when SplashScreen mounts — critical on slow connections.
         */}
        <link
          rel="preload"
          href="/logof.png"
          as="image"
          type="image/png"
          fetchPriority="high"
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
