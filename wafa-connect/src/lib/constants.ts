// src/lib/constants.ts
export const EVENT = {
  name: 'Wafa Connect',
  fullName: 'WAFA CONNECT — Inauguration du Nouveau Siège',
  organizer: 'Attijari Assurance',
  agency: '2K Events',
  date: new Date('2026-05-21T18:00:00+01:00'), // Africa/Tunis UTC+1
  dateLabel: 'Jeudi 21 Mai 2026',
  timeLabel: 'À partir de 18h00',
  venue: 'Centre Urbain Nord',
  city: 'Tunis, Tunisie',
  mapsUrl: 'https://www.google.com/maps/search/Centre+Urbain+Nord+Tunis',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.0!2d10.186!3d36.832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ5JzU1LjIiTiAxMMKwMTEnMDkuNiJF!5e0!3m2!1sen!2stn!4v1',
} as const

export const COLORS = {
  dark:       '#003d2b',
  green:      '#006633',
  lightGreen: '#7dc242',
  gold:       '#C9A84C',
  goldLight:  '#f5c518',
  cream:      '#f9f5ee',
  veryDark:   '#001a0f',
  white:      '#ffffff',
} as const

export const PROGRAM = [
  { time: '18h:00', label: 'Accueil invités',              icon: '👋', highlight: false },
  { time: '18h:30', label: 'Cocktail d\'accueil',          icon: '🍸', highlight: false },
  { time: '19h:30', label: 'Présentation et prise de paroles', icon: '🎤', highlight: true  },
  { time: '20h:30', label: 'Networking + Violoniste',      icon: '🎻', highlight: false },
  { time: '21h:00', label: 'Cocktail dinatoire',           icon: '🍽️', highlight: false },
  { time: '21h:30', label: 'Rana Zarrouk',                 icon: '🎤', highlight: true  },
  { time: '22h:00', label: 'Station Food',                 icon: '🍴', highlight: false },
  { time: '22h:30', label: 'Rana Zarrouk',                 icon: '🎤', highlight: true  },
  { time: '23h:15', label: 'Dj',                           icon: '🎧', highlight: false },
  { time: '00h:45', label: 'Clôture',                      icon: '✨', highlight: true  },
] as const

export const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'RECEVEZ',
    description: 'Recevez votre invitation digitale par e-mail',
    icon: 'Mail',
  },
  {
    number: '02',
    title: 'DÉCOUVREZ',
    description: 'Accédez au programme complet, à l\'invitation et à la localisation',
    icon: 'Search',
  },
  {
    number: '03',
    title: 'CONFIRMEZ',
    description: 'Remplissez le formulaire : Nom, Prénom et Fonction',
    icon: 'CheckCircle',
  },
  {
    number: '04',
    title: 'ACCÉDEZ',
    description: 'Votre QR code personnel d\'accès est instantanément généré',
    icon: 'QrCode',
  },
] as const

export const NAV_LINKS = [
  { label: 'Concept',      href: '#concept'      },
  { label: 'Programme',    href: '#programme'    },
  { label: 'Confirmer',    href: '#confirmer'    },
  { label: 'Localisation', href: '#localisation' },
] as const
