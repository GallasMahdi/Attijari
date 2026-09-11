import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E0681C]/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>
      <div className="z-10 text-center flex flex-col items-center">
        <span className="font-outfit text-xs tracking-[0.3em] text-[#E0681C] uppercase font-black mb-2">
          PAGE INTROUVABLE · PORSCHE CAYENNE E4
        </span>
        <h1 className="font-outfit text-7xl md:text-9xl font-black text-white tracking-wider mb-2">
          404
        </h1>
        <p className="font-sans text-gray-400 text-sm md:text-base mb-8 uppercase tracking-widest max-w-md">
          Cette section n'existe pas ou l'accès a été restreint pour l'événement.
        </p>
        <Link 
          href="/" 
          className="px-8 py-3.5 bg-gradient-to-r from-[#E0681C] to-[#6D8080] text-white font-outfit font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(224, 104, 28,0.5)] transition-all active:scale-95"
        >
          Retour à l'Expérience Principale
        </Link>
      </div>
    </div>
  )
}
