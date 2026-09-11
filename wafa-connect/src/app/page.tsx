// src/app/page.tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { EventExperienceClient } from '@/components/layout/EventExperienceClient'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <EventExperienceClient />
      <Footer />
    </>
  )
}
