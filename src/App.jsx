import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intent from './components/Intent'
import Marquee from './components/Marquee'
import AlexProfile from './components/AlexProfile'
import WhyPartner from './components/WhyPartner'
import Experiences from './components/Experiences'
import Benefits from './components/Benefits'
import Globe from './components/Globe'
import Testimonials from './components/Testimonials'
import ApplyForm from './components/ApplyForm'
import Closer from './components/Closer'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Intent />
        <Marquee />
        <AlexProfile />
        <WhyPartner />
        <Experiences />
        <Benefits />
        <Globe />
        {/* <Testimonials /> */}
        <ApplyForm />
        <Closer />
      </main>
      <Footer />
    </>
  )
}