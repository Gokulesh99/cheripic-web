import { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Above-the-fold (Navbar + Hero) ships in the initial bundle so the hero — and
// the LCP headline — paints as early as possible. Everything below the fold is
// code-split and streamed in afterwards, keeping the critical JS small.
const Cursor = lazy(() => import('./components/Cursor'))
const Intent = lazy(() => import('./components/Intent'))
const Marquee = lazy(() => import('./components/Marquee'))
const AlexProfile = lazy(() => import('./components/AlexProfile'))
const WhyPartner = lazy(() => import('./components/WhyPartner'))
const Experiences = lazy(() => import('./components/Experiences'))
const Benefits = lazy(() => import('./components/Benefits'))
const Globe = lazy(() => import('./components/Globe'))
const ApplyForm = lazy(() => import('./components/ApplyForm'))
const Closer = lazy(() => import('./components/Closer'))
const Footer = lazy(() => import('./components/Footer'))
const Legal = lazy(() => import('./components/Legal'))

// Tiny hash router: "#legal" (optionally "#legal:privacy") shows the legal page,
// anything else shows the landing page. Section anchors (#apply, #ben, ...) are
// handled by in-page smooth scrolling and never start with "#legal".
function readRoute() {
  const hash = window.location.hash
  if (hash.startsWith('#legal')) {
    return { name: 'legal', target: hash.includes(':') ? hash.split(':')[1] : '' }
  }
  return { name: 'home', target: '' }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route.name === 'legal')
    return (
      <Suspense fallback={null}>
        <Legal target={route.target} />
      </Suspense>
    )

  return (
    <>
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Intent />
          <Marquee />
          <AlexProfile />
          <WhyPartner />
          <Experiences />
          <Benefits />
          <Globe />
          <ApplyForm />
          <Closer />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}