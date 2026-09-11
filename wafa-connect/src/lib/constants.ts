// src/lib/constants.ts
export const EVENT = {
  name: 'Porsche Cayenne E4 — Launch Event',
  shortName: 'Cayenne Electric Era',
  fullName: 'THE FULLY ELECTRIC CAYENNE ERA — E4',
  organizer: '2K Events × Porsche Middle East & Africa',
  motto: 'Heritage × Future · Two Worlds. One Drive.',
  submotto: 'The next chapter for Cayenne.',
  invitationCallout: 'Experience the Cayenne in a new form.',
  conceptTagline: 'A museum of the past, activated by the technology of the future.',
  agency: '2K Events',
  date: new Date('2026-06-18T09:00:00+01:00'),
  dateLabel: '18 — 21 Juin 2026 (4 Jours)',
  timeLabel: 'Dès 18h30 · Soirée & Dévoilement Officiel',
  venue: 'Le Domaine Neferis',
  venueSubtitle: 'Avenue SUV & Salon d\'Honneur Heritage × Future',
  city: 'Grombalia / Tunis — Domaine Neferis',
  campaignId: 'PME-E4-NEFERIS-2026',
  totalParticipants: 290,
  wavesPerDay: 6,
  participantsPerDay: 73,
  launchVehiclesCount: 8,
  instructorVehiclesCount: 3,
  mapsUrl: 'https://maps.google.com/?q=Domaine+Neferis+Tunisia',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102540.23198579127!2d10.450125434444585!3d36.59850124890695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd5a864703a4ab%3A0xe546b38cbb0c7324!2sDomaine%20Neferis!5e0!3m2!1sfr!2stn!4v1715263445781!5m2!1sfr!2stn',
} as const

export const COLORS = {
  black: '#08090C',
  dark: '#0E1015',
  card: '#12151D',
  terracotta: '#E0681C',      // Official Porsche Cayenne Copper / Terracotta
  terracottaGlow: 'rgba(224, 104, 28, 0.25)',
  mysticGreen: '#6D8080',     // Mystic Slate (Terre / Domaine)
  slate: '#6D8080',           // Slate Grey-Green
  paleBlue: '#FFFFFF',
  electricCyan: '#E0681C',
  heritageStone: '#6D8080',
  heritageWarm: '#E0681C',
  heritageDark: '#0E1015',
  silver: '#FFFFFF',
  gray: '#6D8080',
  white: '#FFFFFF',
  red: '#E0681C',
  redBright: '#E0681C',
  yellow: '#E0681C',
  // Backwards compatibility aliases
  gold: '#E0681C',
  goldLight: '#E0681C',
  cream: '#08090C',
  veryDark: '#040507',
} as const

export interface ConceptPair {
  id: string
  label: string
  heritage: string
  future: string
  heritageDetail: string
  futureDetail: string
}

export const CONTRAST_PAIRS: ConceptPair[] = [
  {
    id: 'matiere',
    label: 'Matière',
    heritage: 'Pierre brute',
    future: 'Surfaces digitales',
    heritageDetail: 'L\'architecture ancienne du Domaine Neferis, les arches et les murs de taille ancestrale.',
    futureDetail: 'Écrans incurvés haute résolution, surfaces tactiles en verre noir et projections OLED.',
  },
  {
    id: 'mecanique',
    label: 'Objet',
    heritage: 'Pièces automobiles / archives',
    future: 'Projections lumineuses',
    heritageDetail: 'L\'histoire séculaire de l\'artisanat automobile, les codes du musée et les objets mécaniques.',
    futureDetail: 'Lignes de faisceaux laser, cinématiques LED 4 points et scénographies immersives.',
  },
  {
    id: 'elements',
    label: 'Éléments',
    heritage: 'Mystic Green (Terre)',
    future: 'Pale Blue (Énergie)',
    heritageDetail: 'Les oliviers, les vignes et le terroir préservé du domaine méditerranéen.',
    futureDetail: 'L\'énergie électrique pure à 800V, le flux d\'ions et l\'accélération instantanée.',
  },
  {
    id: 'graphisme',
    label: 'Graphique',
    heritage: 'Textures naturelles',
    future: 'Lignes précises',
    heritageDetail: 'Le grain du bois, la rugosité de la roche et la patine du cuir artisanal.',
    futureDetail: 'La précision aérodynamique au millimètre, les signatures graphiques épurées.',
  },
  {
    id: 'dynamique',
    label: 'Mouvement',
    heritage: 'Objets de musée',
    future: 'Projections dynamiques',
    heritageDetail: 'La mémoire figée des légendes du passé, respectueusement mises en valeur.',
    futureDetail: 'La Cayenne Electric en mouvement perpétuel, réveillant l\'histoire.',
  },
]

export interface PorscheModel {
  id: string
  name: string
  subtitle: string
  category: string
  power: string
  acceleration: string
  topSpeed: string
  engine: string
  torque: string
  highlight: string
  tag: string
  accentColor: string
  isElectric?: boolean
  range?: string
  eventUnits?: number
  chargingTime?: string
}

export const PORSCHE_FLEET: PorscheModel[] = [
  {
    id: 'cayenne-e4',
    name: 'Cayenne Electric (E4)',
    subtitle: 'The fully electric Cayenne era. Two worlds. One drive.',
    category: 'World Premiere · Fully Electric SUV',
    power: '517 CH (380 kW)',
    acceleration: '4.0 s (0-100 km/h)',
    topSpeed: '225 km/h',
    engine: 'Double moteur électrique synchrone — Architecture 800 Volts',
    torque: '830 Nm (instantané)',
    highlight: 'Autonomie 500+ km WLTP · Recharge 270 kW DC (10-80% en 21 min)',
    tag: 'Vedette de Lancement',
    accentColor: '#E0681C',
    isElectric: true,
    range: '500+ km WLTP',
    eventUnits: 8,
    chargingTime: '21 min (10-80%)',
  },
  {
    id: 'cayenne-turbo-ehybrid',
    name: 'Cayenne Turbo E-Hybrid',
    subtitle: 'Performance hybride extrême. La passerelle vers le futur.',
    category: 'E-Hybrid Performance',
    power: '739 CH (544 kW)',
    acceleration: '3.6 s (0-100 km/h)',
    topSpeed: '295 km/h',
    engine: 'V8 4.0L bi-turbo + Moteur électrique 130 kW',
    torque: '950 Nm combiné',
    highlight: 'Mode E-Power 90 km · Châssis actif PASM & Torque Vectoring Plus',
    tag: 'Performance E-Hybrid',
    accentColor: '#6D8080',
    isElectric: false,
    range: '90 km électrique',
    eventUnits: 3,
  },
  {
    id: 'cayenne-instructor',
    name: 'Cayenne E4 Pace & Instructor',
    subtitle: 'Véhicule de tête & encadrement dynamique certifié Porsche.',
    category: 'Instructor Fleet · Lead Vehicle',
    power: '517 CH (380 kW)',
    acceleration: '4.0 s (0-100 km/h)',
    topSpeed: '225 km/h',
    engine: 'Double moteur synchrone à aimants permanents 800V',
    torque: '830 Nm',
    highlight: 'Équipement télémétrie embarquée · Liaison radio instructeur instructeur',
    tag: 'Instructeur Officiel',
    accentColor: '#E0681C',
    isElectric: true,
    range: '500 km',
    eventUnits: 3,
  },
]

export const FLEET_CALCULATOR_DEFAULT = {
  annualOrderIntakeTarget: 29,
  experientialSharePercent: 30,
  targetOrdersFromEvent: 9,
  leadToOrderConversionPercent: 12,
  targetLeads: 73,
  participantToLeadConversionPercent: 25,
  targetParticipants: 290,
  eventDays: 4,
  wavesPerDay: 6,
  participantsPerDay: 73,
  participantsPerWave: 12,
  launchVehicles: 8,
  instructorCars: 3,
}

export const PROGRAM = [
  {
    time: '18h30',
    label: 'Accueil d\'Honneur & Tapis Rouge',
    sublabel: 'Arrivée au Domaine Neferis sous l\'Arche Porsche · Service Voiturier VIP & Enregistrement',
    icon: '🏛️',
    highlight: false,
  },
  {
    time: '19h15',
    label: 'Dévoilement Officiel & Révélation E4',
    sublabel: 'Révélation mondiale du nouveau Cayenne E4 Electric par la direction Porsche & 2K Events',
    icon: '✨',
    highlight: true,
  },
  {
    time: '20h00',
    label: 'Essais Dynamiques Privés & Exposition',
    sublabel: 'Prise en main sur piste privée & visite du musée vivant Heritage × Future',
    icon: '⚡',
    highlight: true,
  },
  {
    time: '21h00',
    label: 'Cocktail Dînatoire Gastronomique',
    sublabel: 'Hospitalité d\'exception dans le Salon d\'Honneur avec gastronomie fine et accords mets-vins',
    icon: '🍽️',
    highlight: false,
  },
  {
    time: '22h30',
    label: 'Remise du Coffret Collector & Clôture',
    sublabel: 'Remise du cadeau exclusif numéroté, shooting photo officiel et départ privilégié',
    icon: '📸',
    highlight: false,
  },
] as const

export const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'INVITATION EXCLUSIVE',
    description: 'Notification VIP via WhatsApp & Email — "The next chapter for Cayenne."',
    icon: 'Mail',
  },
  {
    number: '02',
    title: 'ACCRÉDITATION EN LIGNE',
    description: 'Sélection de votre jour et de votre vague de conduite sur le portail officiel',
    icon: 'ClipboardList',
  },
  {
    number: '03',
    title: 'QR PASS NOMINATIF',
    description: 'Délivrance instantanée de votre badge numérique synchronisé avec le système C@P',
    icon: 'QrCode',
  },
  {
    number: '04',
    title: 'EXPÉRIENCE DOMAINE NEFERIS',
    description: 'Accueil sous l\'arche Porsche et prise en main des 8 Cayenne E4 de lancement',
    icon: 'Flag',
  },
] as const

export const NAV_LINKS = [
  { label: 'Dévoilement', href: '#teaser' },
  { label: 'Collection E4', href: '#flotte' },
  { label: 'Heritage × Future', href: '#concept' },
  { label: 'Programme VIP', href: '#programme' },
  { label: 'Domaine Neferis', href: '#domaine' },
] as const
