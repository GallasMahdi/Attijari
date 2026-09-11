import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PORSCHE NIGHT OF EXCELLENCE',
    short_name: 'PORSCHE VIP',
    description: "Événement exclusif Porsche — Driven by Dreams au Circuit Paul Ricard",
    start_url: '/',
    display: 'standalone',
    background_color: '#08090C',
    theme_color: '#D5001C',
    icons: [
      {
        src: '/logof.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/logof.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/logof.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
