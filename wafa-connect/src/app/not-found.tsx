import Link from 'next/link'
import { DiamondPattern } from '@/components/ui/DiamondPattern'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-wafa-very-dark flex flex-col items-center justify-center relative overflow-hidden px-4">
      <DiamondPattern opacity={0.05} color="#C9A84C" />
      <div className="z-10 text-center flex flex-col items-center">
        <h1 className="font-playfair text-6xl md:text-8xl font-bold text-wafa-gold mb-4">404</h1>
        <p className="font-montserrat text-white/80 text-lg md:text-xl mb-8 uppercase tracking-widest">Page introuvable</p>
        <Link 
          href="/" 
          className="px-8 py-3 bg-gradient-gold text-wafa-dark font-montserrat font-bold rounded-xl hover:shadow-gold-md transition-all active:scale-95"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
