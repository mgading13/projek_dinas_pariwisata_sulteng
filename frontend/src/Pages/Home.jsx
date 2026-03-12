import NavBar from "../Component/NavBar.jsx";
import usePageView from "../hook/usePageView";
import "../index.css";
import LukPanenteng from "../assets/Luk-Panenteng.jpg";
import CarouselWisataUnggulan from "../Component/CarouselWisataUnggulan.jsx";
import CarouselDesaWisata from "../Component/CarouselDesaWisata.jsx";
import CarouselEvent from "../Component/CarouselEvent.jsx";
import PetaDesaWisata from "../Component/PetaDesaWisata.jsx";
import Footer from "../Component/Footer.jsx";
import ScrollToTopButton from "../Component/ScrollToTopButton.jsx";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const letter = {
  hidden: {
    y: "120%",
    opacity: 0,
  },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1], // Apple easing
    },
  },
};

const Home = () => {
  usePageView("Home");
  const { t } = useTranslation();

  const translatedTitle = t("sulawesi_tengah");

  return (
    <>
      <NavBar />
      <Helmet>
        <title>
          Berani Kamaimo
        </title>

        <meta
          name="description"
          content="Jelajahi destinasi wisata terbaik di Sulawesi Tengah. Temukan paket wisata, desa wisata, kuliner khas, dan hotel dengan informasi lengkap."
        />

        <meta
          name="keywords"
          content="wisata sulawesi tengah, paket wisata palu, desa wisata sulteng, wisata banggai, wisata donggala"
        />

        <meta
          name="author"
          content="Dinas Pariwisata Provinsi Sulawesi Tengah"
        />

        <meta property="og:title" content="Wisata Sulawesi Tengah" />
        <meta
          property="og:description"
          content="Portal resmi destinasi wisata Sulawesi Tengah"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://beranikamaimo.sultengprov.go.id/"
        />

        <script type="application/ld+json">
          {`
        {
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": "Wisata Sulawesi Tengah",
          "description": "Portal resmi destinasi wisata Sulawesi Tengah",
          "url": "https://beranikamaimo.sultengprov.go.id/",
          "touristType": "Domestic",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-0.9000",
            "longitude": "119.8700"
          }
        }
        `}
        </script>
      </Helmet>

      {/* ===== HERO ===== */}
      <section
        id="home"
        style={{ backgroundImage: `url(${LukPanenteng})` }}
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            key={translatedTitle}
            className="text-white text-4xl md:text-6xl font-bold flex flex-wrap justify-center overflow-visible leading-[1.2] pb-2"
          >
            {translatedTitle.split("").map((char, i) => (
              <motion.span key={i} variants={letter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-white/90 text-lg md:text-xl mt-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {t("main_desc")}
          </motion.p>
        </div>
      </section>

      {/* ===== SECTION NORMAL ===== */}
      <section className="mx-auto">
        <PetaDesaWisata />
      </section>

      <section id="wisata-unggulan">
        <CarouselWisataUnggulan />
      </section>

      <section id="desa-wisata">
        <CarouselDesaWisata />
      </section>

      <section id="atraksi">
        <CarouselEvent />
      </section>
      <section>
        <Footer />
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default Home;
