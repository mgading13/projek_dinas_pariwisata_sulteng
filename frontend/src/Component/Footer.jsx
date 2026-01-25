import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <footer className="relative bg-gradient-to-b from-[#F3E6DC] to-[#e4ecf5]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true }}
        className="max-w-7xl 2xl:max-w-screen-xl mx-auto
        px-4 sm:px-6 lg:px-10 py-12 sm:py-16"
      >
        {/* GLASS CARD */}
        <div
          className="backdrop-blur-xl bg-white/60
          border border-white/40
          rounded-2xl sm:rounded-3xl
          p-6 sm:p-10 lg:p-12
          shadow-xl"
        >
          {/* ===== TOP ===== */}
          <div
            className="
              grid gap-10
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              items-start
              text-center
              lg:text-left
            "
          >
            {/* LEFT */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t('foot_heading')}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                {t('foot_desc')}
              </p>
            </div>

            {/* CENTER - SOCIAL */}
            <div className="flex justify-center">
              <div
                className="
                  flex gap-4
                  sm:gap-5
                  lg:grid lg:grid-cols-3
                "
              >
                {[
                  {
                    icon: Instagram,
                    color: "from-pink-500 to-purple-500",
                    url: "https://www.instagram.com/wonderfulindonesiatourism/",
                  },
                  {
                    icon: Youtube,
                    color: "from-red-500 to-red-600",
                    url: "https://www.youtube.com/@wonderfulindonesiatourism",
                  },
                  {
                    icon: Facebook,
                    color: "from-blue-500 to-blue-700",
                    url: "https://www.facebook.com/wonderfulindonesiatourism",
                  },
                  
                ].map(({ icon: Icon, color, url }, i) => (
                  <motion.a
                    key={i}
                    href={url}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-11 h-11 sm:w-12 sm:h-12
                      rounded-xl
                      bg-gradient-to-br ${color}
                      flex items-center justify-center
                      text-white shadow-lg
                    `}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:text-right">
              <ul className="space-y-3 text-gray-800 text-sm sm:text-base">
                <li>
                  <a
                    href="mailto:info@wonderfulindonesia.id"
                    className="hover:underline hover:text-blue-600 transition"
                  >
                    {t('foot_kontak_kami')}
                  </a>
                </li>

                <li>
                  <Link
                    to="/hotel"
                    className="hover:underline hover:text-blue-600 transition"
                  >
                    {t('nav_hotel')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/kuliner"
                    className="hover:underline hover:text-blue-600 transition"
                  >
                    {t('nav_kuliner')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/paket-wisata"
                    className="hover:underline hover:text-blue-600 transition"
                  >
                    {t('nav_paket_wisata')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-8 sm:my-10 border-t border-white/50" />

          {/* BOTTOM */}
          <div className="text-center text-xs sm:text-sm text-gray-700">
            <span className="font-semibold text-blue-600">
              Dinas Pariwisata Provinsi Sulawesi Tengah
            </span>{" "}
            © 2025. All Rights Reserved.
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
