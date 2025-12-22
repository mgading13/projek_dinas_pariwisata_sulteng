import NavBar from '../Component/NavBar.jsx'
import usePageView from '../hook/usePageView'
import '../index.css'
import LukPanenteng from '../assets/LukPanenteng.png'
import CarouselWisataUnggulan from '../Component/CarouselWisataUnggulan.jsx'
import CarouselDesaWisata from '../Component/CarouselDesaWisata.jsx'
import CarouselEvent from '../Component/CarouselEvent.jsx'
import PetaDesaWisata from '../Component/PetaDesaWisata.jsx'
import Footer from '../Component/Footer.jsx'
import ScrollToTopButton from '../Component/ScrollToTopButton.jsx'
import { motion } from 'framer-motion'

const title = 'Sulawesi Tengah'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
}

const letter = {
  hidden: {
    y: '120%',
    opacity: 0
  },
  show: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] // Apple easing
    }
  }
}

const Home = () => {
  usePageView('Home')
  return (
    <>
      <NavBar />

      {/* ===== HERO ===== */}
      <section
        id='home'
        style={{ backgroundImage: `url(${LukPanenteng})` }}
        className='relative min-h-screen flex items-center justify-center bg-cover bg-center'
      >
        {/* OVERLAY */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90' />

        {/* CONTENT */}
        <div className='relative z-10 text-center px-4'>
          <motion.h1
            variants={container}
            initial='hidden'
            animate='show'
            className='text-white text-4xl md:text-6xl font-bold flex flex-wrap justify-center overflow-hidden'
          >
            {title.split('').map((char, i) => (
              <motion.span key={i} variants={letter} className='inline-block'>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className='text-white/90 text-lg md:text-xl mt-6 max-w-xl mx-auto'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Menunggu petualanganmu di jantung Indonesia
          </motion.p>
        </div>
      </section>

      {/* ===== SECTION NORMAL ===== */}
      <section className='mx-auto'>
        <PetaDesaWisata />
      </section>

      <section>
        <CarouselWisataUnggulan />
      </section>

      <section>
        <CarouselDesaWisata />
      </section>

      <section id='atraksi'>
        <CarouselEvent />
      </section>
      <section>
        <Footer />
      </section>
      <ScrollToTopButton />
    </>
  )
}

export default Home
