import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wafa Connect | Attijari Assurance',
    short_name: 'Wafa Connect',
    description: "Inauguration du nouveau siège d'Attijari Assurance",
    start_url: '/',
    display: 'standalone',
    background_color: '#003d2b',
    theme_color: '#003d2b',
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
