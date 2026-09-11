import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Porsche × 2K Events · Cayenne E4 Launch',
    short_name: 'Porsche × 2K',
    description: "Lancement officiel du Porsche Cayenne E4 au Domaine Neferis par 2K Events × Porsche Middle East & Africa",
    start_url: '/',
    display: 'standalone',
    background_color: '#08090C',
    theme_color: '#E0681C',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
