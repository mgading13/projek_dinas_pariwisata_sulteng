import { useEffect, useState } from "react";
import NavBar from "./NavBar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Ulasan from "./Ulasan.jsx";
import { MapPin, Car, Ship, Plane } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import API_URL from "@/lib/api";
import { Helmet } from "react-helmet-async";

const DetailDesa = () => {
  const { slug } = useParams();
  const [desa, setDesa] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        const desaRes = await API_URL.get("/desaWisata");
        const found = desaRes.data.find(
          (d) => d.namaDesa_id.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        setDesa(found || null);

        // ambil jarak
        if (found) {
          const jarakRes = await API_URL.get("/jarak");

          const palu = jarakRes.data.find(
            (j) => j.desaId === found.id && j.titikKota === "PALU",
          );

          const luwuk = jarakRes.data.find(
            (j) => j.desaId === found.id && j.titikKota === "LUWUK",
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

  if (loading) {
    return (
      <>
        <NavBar />

        <section className="relative min-h-screen overflow-hidden">
          {/* background skeleton */}
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* card skeleton */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
              <div className="h-10 bg-gray-200/60 rounded animate-pulse w-2/3 mx-auto" />

              <div className="h-4 bg-gray-200/60 rounded animate-pulse w-1/3 mx-auto" />

              <div className="h-px bg-white/20" />

              <div className="space-y-3">
                <div className="h-4 bg-gray-200/60 rounded animate-pulse" />
                <div className="h-4 bg-gray-200/60 rounded animate-pulse" />
                <div className="h-4 bg-gray-200/60 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200/60 rounded animate-pulse w-4/6" />
                <div className="h-4 bg-gray-200/60 rounded animate-pulse w-3/6" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  if (!desa)
    return (
      <section className="relative min-h-screen bg-black flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-[url('/bg-error.jpg')] bg-cover opacity-40" />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">{t("title_skeleton_desa")}</h1>
          <p className="text-gray-300 mb-6">
            {t("desc_skeleton_desa")}
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:scale-105 transition"
          >
            {t("skeleton_button")}
          </button>
        </div>
      </section>
    );

  let mediaUrl = null;

  if (desa.foto) {
    mediaUrl = `${import.meta.env.VITE_BASE_URL}${desa.foto}`;
  } else if (desa.link_video) {
    mediaUrl = desa.link_video;
  }

  const mediaType = getMediaType(mediaUrl);
  const embedUrl = convertVideoLink(mediaUrl);

  const langSuffix = i18n.language === "en" ? "en" : "id";
  const namaDisplay = desa[`namaDesa_${langSuffix}`];
  const lokasiDisplay = desa[`lokasi_${langSuffix}`];
  const deskripsiDisplay = desa[`deskripsi_${langSuffix}`];

  function getMediaType(url) {
    if (!url) return "none";

    if (url.match(/\.(mp4|webm|ogg)$/i)) return "local-video";
    if (url.match(/\.(jpg|jpeg|png|webp|gif)$/i)) return "image";
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "youtube";
    if (url.includes("drive.google.com")) return "drive";

    return "unknown";
  }

  function convertVideoLink(url) {
    if (!url) return null;

    try {
      const urlObj = new URL(url);

      let videoId = null;

      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.replace("/", "");
      }

      if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v");
      }

      if (!videoId) return null;

      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${videoId}`;
    } catch {
      return null;
    }
  }

  return (
    <>
      <NavBar />
      <Helmet>
        <title>{namaDisplay} | Desa Wisata Sulawesi Tengah</title>

        <meta name="description" content={deskripsiDisplay?.slice(0, 160)} />

        <meta
          name="keywords"
          content={`${namaDisplay}, desa wisata ${lokasiDisplay}, wisata sulawesi tengah`}
        />

        <meta property="og:title" content={namaDisplay} />
        <meta
          property="og:description"
          content={deskripsiDisplay?.slice(0, 160)}
        />
        <meta property="og:image" content={mediaUrl} />
        <meta
          property="og:url"
          content={`https://beranikamaimo.sultengprov.go.id/desa-wisata/${slug}`}
        />

        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "${namaDisplay}",
  "description": "${deskripsiDisplay?.replace(/"/g, "'")}",
  "image": "${mediaUrl}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${lokasiDisplay}",
    "addressRegion": "Sulawesi Tengah",
    "addressCountry": "ID"
  },
  "url": "https://beranikamaimo.sultengprov.go.id/desa-wisata/${slug}",
  "touristType": ["Domestic", "International"]
}
`}
        </script>
      </Helmet>
      <section className="relative min-h-screen overflow-hidden">
        {mediaType === "local-video" && (
          <motion.video
            src={mediaUrl}
            style={{ y: bgY }}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}

        {mediaType === "image" && (
          <motion.div
            style={{
              y: bgY,
              backgroundImage: `url(${mediaUrl})`,
            }}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}

        {(mediaType === "youtube" || mediaType === "drive") && embedUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src={embedUrl}
              className="
        absolute
        top-1/2 left-1/2
        min-w-full min-h-full
        w-auto h-auto
        -translate-x-1/2 -translate-y-1/2
        scale-150
        pointer-events-none
      "
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        )}

        {mediaType === "none" && (
          <motion.div className="absolute inset-0 bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/30" />

        <motion.div
          style={{ y: contentY }}
          className="relative z-10 min-h-screen flex items-center justify-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <CardContent className="p-6 sm:p-8 md:p-10 text-white space-y-6">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {namaDisplay}
              </motion.h1>

              <motion.p
                className="flex items-center justify-center gap-2 text-gray-300 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <MapPin size={18} />
                {lokasiDisplay}
              </motion.p>

              <div className="h-px bg-white/20" />

              <motion.p
                className="
    text-gray-200 leading-relaxed text-justify
    text-sm sm:text-base
    max-h-[45vh]
    overflow-y-auto
    pr-2
  "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {deskripsiDisplay}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <div className="bg-gradient-to-b from-blue-200 to-white">
        <div className="max-w-7xl mx-auto px-4">
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
                <div>
                  <h3 className="font-semibold mb-4 text-center">
                    {t("dari_palu")}
                  </h3>
                  <div className="grid gap-4">
                    <TransportCard
                      icon={<Car />}
                      title={t("jalur_darat")}
                      text={palujalur?.jalur_darat}
                    />
                    <TransportCard
                      icon={<Ship />}
                      title={t("jalur_laut")}
                      text={palujalur?.jalur_laut}
                    />
                    <TransportCard
                      icon={<Plane />}
                      title={t("jalur_udara")}
                      text={palujalur?.jalur_udara}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-center">
                    {t("dari_luwuk")}
                  </h3>
                  <div className="grid gap-4">
                    <TransportCard
                      icon={<Car />}
                      title={t("jalur_darat")}
                      text={luwukjalur?.jalur_darat}
                    />
                    <TransportCard
                      icon={<Ship />}
                      title={t("jalur_laut")}
                      text={luwukjalur?.jalur_laut}
                    />
                    <TransportCard
                      icon={<Plane />}
                      title={t("jalur_udara")}
                      text={luwukjalur?.jalur_udara}
                    />
                  </div>
                </div>
              </div>
            </section>
          </motion.section>
          <motion.section
            className="py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-center text-xl font-bold mb-8">
              {t("ulasan_pengunjung")}
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
