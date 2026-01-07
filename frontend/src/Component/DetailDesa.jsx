import { useEffect, useState } from "react";
import NavBar from "./NavBar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Ulasan from "./Ulasan.jsx";
import { MapPin, Car, Ship, Plane } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from 'react-i18next';

const DetailDesa = () => {
  const { slug } = useParams();
  const [desa, setDesa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [palujalur, setPaluJalur] = useState(null);
  const [luwukjalur, setLuwukJalur] = useState(null);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], ["0%", "25%"]);
  const contentY = useTransform(scrollY, [0, 300], ["0%", "-10%"]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);

        // ambil desa
        const desaRes = await axios.get("http://localhost:3000/api/desaWisata");
        const found = desaRes.data.find(
          (d) => d.namaDesa.toLowerCase().replace(/\s+/g, "-") === slug
        );

        setDesa(found || null);

        // ambil jarak
        if (found) {
          const jarakRes = await axios.get("http://localhost:3000/api/jarak");

          const palu = jarakRes.data.find(
            (j) => j.desaId === found.id && j.titikKota === "PALU"
          );

          const luwuk = jarakRes.data.find(
            (j) => j.desaId === found.id && j.titikKota === "LUWUK"
          );

          setPaluJalur(palu || null);
          setLuwukJalur(luwuk || null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!desa) return <p className="p-10 text-center">Desa tidak ditemukan.</p>;

  const bgImage = `http://localhost:3000${desa.foto}`;

  return (
    <>
      <NavBar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen overflow-hidden">
        {/* PARALLAX BACKGROUND */}
        <motion.div
          style={{ y: bgY, backgroundImage: `url(${bgImage})` }}
          className="absolute inset-0 bg-cover bg-center"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        {/* CONTENT */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 min-h-screen flex items-center justify-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <CardContent className="p-6 sm:p-8 md:p-10 text-white space-y-6">
              {/* NAMA DESA */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {desa.namaDesa}
              </motion.h1>

              {/* LOKASI */}
              <motion.p
                className="flex items-center justify-center gap-2 text-gray-300 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <MapPin size={18} />
                {desa.lokasi}
              </motion.p>

              {/* DIVIDER */}
              <div className="h-px bg-white/20" />

              {/* DESKRIPSI */}
              <motion.p
                className="text-gray-200 leading-relaxed text-justify text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {desa.deskripsi}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ===== PAGE CONTENT (BOXED) ===== */}
      <div className="bg-gradient-to-b from-blue-200 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* ===== DESKRIPSI ===== */}

          {/* ===== HOW TO GET THERE ===== */}
          <motion.section
            className="py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <section className="py-14">
              <h2 className="text-center text-xl font-bold mb-10">
                How to Get There
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* PALU */}
                <div>
                  <h3 className="font-semibold mb-4 text-center">{t('dari_palu')}</h3>
                  <div className="grid gap-4">
                    <TransportCard
                      icon={<Car />}
                      title={t('jalur_darat')}
                      text={palujalur?.jalur_darat}
                    />
                    <TransportCard
                      icon={<Ship />}
                      title={t('jalur_laut')}
                      text={palujalur?.jalur_laut}
                    />
                    <TransportCard
                      icon={<Plane />}
                      title={t('jalur_udara')}
                      text={palujalur?.jalur_udara}
                    />
                  </div>
                </div>

                {/* LUWUK */}
                <div>
                  <h3 className="font-semibold mb-4 text-center">{t('dari_luwuk')}</h3>
                  <div className="grid gap-4">
                    <TransportCard
                      icon={<Car />}
                      title={t('jalur_darat')}
                      text={luwukjalur?.jalur_darat}
                    />
                    <TransportCard
                      icon={<Ship />}
                      title={t('jalur_laut')}
                      text={luwukjalur?.jalur_laut}
                    />
                    <TransportCard
                      icon={<Plane />}
                      title={t('jalur_udara')}
                      text={luwukjalur?.jalur_udara}
                    />
                  </div>
                </div>
              </div>
            </section>
          </motion.section>
          {/* ===== ULASAN ===== */}
          <motion.section
            className="py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-center text-xl font-bold mb-8">
              {t('ulasan_pengunjung')}
            </h2>
            <Ulasan />
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default DetailDesa;

/* ===== COMPONENT ===== */
const TransportCard = ({ icon, title, text }) => (
  <Card className="rounded-xl border shadow-sm hover:shadow-md transition">
    <CardHeader className="flex flex-row items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <CardTitle className="text-sm font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-900 leading-relaxed">
        {text}
      </div>
    </CardContent>
  </Card>
);
