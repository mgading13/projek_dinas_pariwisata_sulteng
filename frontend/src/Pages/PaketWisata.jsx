import { useState, useEffect } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import Navbar from "../Component/NavBar";
import Paisupok from "../assets/Luk-Panenteng.jpg";
import { useTranslation } from "react-i18next";

const PaketWisata = () => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState(null); // untuk modal detail
  const [dataPaket, setDataPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const langSuffix = i18n.language === "en" ? "en" : "id";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/tourPackage");

        const formatted = res.data.map((item) => ({
          id: item.id,
          nama: item[`nama_wisata_${langSuffix}`] || item.nama_wisata,
          deskripsi: item[`deskripsi_${langSuffix}`] || item.deskripsi_id,
          lokasi: item[`lokasi_${langSuffix}`] || item.lokasi_id,
          harga: `Rp. ${Number(item.harga).toLocaleString("id-ID")}`,
          media:
            item.media && item.media !== ""
              ? `http://localhost:3000${item.media}`
              : item.link_video && item.link_video !== ""
                ? item.link_video
                : null,
          wa: `https://wa.me/${item.kontak}`,
        }));

        setDataPaket(formatted);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data.");
      }
      setLoading(false);
    };

    fetchData();
  }, [langSuffix]);

  const filteredPaket = dataPaket.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()),
  );
 
  const getMediaType = (url) => {
    if (!url) return "none";

    if (url.match(/\.(mp4|webm|ogg)$/i)) return "video";
    if (url.match(/\.(jpg|jpeg|png|webp|gif)$/i)) return "image";
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "youtube";

    return "unknown";
  };

  const convertYoutubeLink = (url) => {
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
  };

  return (
    <>
      <Navbar />
      {loading && (
        <div className="w-full flex justify-center py-20 text-white text-2xl font-bold">
          Loading...
        </div>
      )}

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${Paisupok})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center py-24 px-6">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            {t("nav_paket_wisata")}
          </h1>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md mb-10 bg-white backdrop-blur-md rounded-full shadow-md overflow-hidden">
            <Search className="ml-3 text-gray-500" />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-transparent focus-visible:ring-0 focus:outline-none text-gray-700 placeholder:text-gray-500"
            />
          </div>

          {/* Card Section dengan Transisi Smooth */}
          <AnimatePresence mode="wait">
            {!showAll ? (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-6xl"
              >
                <Carousel
                  opts={{
                    align: "start",
                    dragFree: true,
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    <AnimatePresence mode="popLayout">
                      {filteredPaket.map((paket) => (
                        <CarouselItem
                          key={paket.id}
                          className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                        >
                          <motion.div
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <Card
                              onClick={() => setSelectedPaket(paket)}
                              className="
    overflow-hidden rounded-xl border
    hover:shadow-xl transition duration-300 cursor-pointer
    w-full max-w-[360px] mx-auto
  "
                            >
                              {(() => {
                                const type = getMediaType(paket.media);
                                const embedUrl = convertYoutubeLink(
                                  paket.media,
                                );

                                if (type === "video") {
                                  return (
                                    <video
                                      src={paket.media}
                                      className="w-full h-56 object-cover"
                                      muted
                                      loop
                                      autoPlay
                                      playsInline
                                    />
                                  );
                                }

                                if (type === "image") {
                                  return (
                                    <img
                                      src={paket.media}
                                      className="w-full h-56 object-cover"
                                      alt={paket.nama}
                                    />
                                  );
                                }

                                if (type === "youtube" && embedUrl) {
                                  return (
                                    <iframe
                                      src={embedUrl}
                                      className="w-full h-56 object-cover pointer-events-none"
                                      allow="autoplay; fullscreen"
                                    />
                                  );
                                }

                                return (
                                  <img
                                    src="/fallback.jpg"
                                    className="w-full h-56 object-cover"
                                    alt="fallback"
                                  />
                                );
                              })()}

                              <CardContent className="p-4 space-y-2">
                                <h2 className="font-semibold text-lg">
                                  {paket.nama}
                                </h2>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                  {paket.deskripsi}
                                </p>
                              </CardContent>

                              <CardFooter className="flex justify-between items-center px-4 pb-4">
                                <span className="font-bold text-green-600">
                                  {paket.harga}
                                </span>
                                <WhatsappLogo
                                  size={28}
                                  weight="fill"
                                  className="text-green-500"
                                />
                              </CardFooter>
                            </Card>
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </AnimatePresence>
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="
  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-6 place-items-center
  w-full max-w-10xl
"
              >
                <AnimatePresence mode="popLayout">
                  {filteredPaket.map((paket) => (
                    <motion.div
                      key={paket.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <Card
                        onClick={() => setSelectedPaket(paket)}
                        className="
    overflow-hidden rounded-xl border
    hover:shadow-xl transition duration-300 cursor-pointer
    w-full max-w-[360px] mx-auto
  "
                      >
                        {(() => {
                          const type = getMediaType(paket.media);
                          const embedUrl = convertYoutubeLink(paket.media);

                          if (type === "video") {
                            return (
                              <video
                                src={paket.media}
                                className="w-full h-56 object-cover"
                                muted
                                loop
                                autoPlay
                                playsInline
                              />
                            );
                          }

                          if (type === "image") {
                            return (
                              <img
                                src={paket.media}
                                className="w-full h-56 object-cover"
                                alt={paket.nama}
                              />
                            );
                          }

                          if (type === "youtube" && embedUrl) {
                            return (
                              <iframe
                                src={embedUrl}
                                className="w-full h-56 object-cover pointer-events-none"
                                allow="autoplay; fullscreen"
                              />
                            );
                          }

                          return (
                            <img
                              src="/fallback.jpg"
                              className="w-full h-56 object-cover"
                              alt="fallback"
                            />
                          );
                        })()}

                        <CardContent className="p-4 space-y-2">
                          <h2 className="font-semibold text-lg">
                            {paket.nama}
                          </h2>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {paket.deskripsi}
                          </p>
                        </CardContent>

                        <CardFooter className="flex justify-between items-center px-4 pb-4">
                          <span className="font-bold text-green-600">
                            {paket.harga}
                          </span>
                          <WhatsappLogo
                            size={22}
                            weight="fill"
                            className="text-green-500"
                          />
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tombol toggle */}
          <div className="mt-10">
            <Button
              variant="secondary"
              className="bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center gap-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  {/* <span>Tampilkan Carousel</span> */}
                  <ChevronUp size={50} strokeWidth={3} color="black" />
                </>
              ) : (
                <>
                  {/* <span>Lihat Semua Paket Wisata</span> */}
                  <ChevronDown size={50} strokeWidth={3} color="black" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* MODAL DETAIL */}
        <AnimatePresence>
          <Dialog
            open={!!selectedPaket}
            onOpenChange={() => setSelectedPaket(null)}
          >
            <DialogContent className="max-w-6xl w-full p-0 overflow-hidden rounded-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {selectedPaket && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* IMAGE */}
                    {(() => {
                      const type = getMediaType(selectedPaket.media);
                      const embedUrl = convertYoutubeLink(selectedPaket.media);

                      if (type === "video") {
                        return (
                          <video
                            src={selectedPaket.media}
                            className="w-full h-56 object-cover"
                            muted
                            loop
                            autoPlay
                            playsInline
                          />
                        );
                      }

                      if (type === "image") {
                        return (
                          <img
                            src={selectedPaket.media}
                            className="w-full h-56 object-cover"
                            alt={selectedPaket.nama}
                          />
                        );
                      }

                      if (type === "youtube" && embedUrl) {
                        return (
                          <iframe
                            src={embedUrl}
                            className="w-full h-56 object-cover pointer-events-none"
                            allow="autoplay; fullscreen"
                          />
                        );
                      }

                      return (
                        <img
                          src="/fallback.jpg"
                          className="w-full h-56 object-cover"
                          alt="fallback"
                        />
                      );
                    })()}

                    {/* CONTENT */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="p-6 space-y-4"
                    >
                      <div className="p-2 space-y-8">
                        <h2 className="text-2xl font-bold">
                          {selectedPaket.nama}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium -mt-6">
                          📍 {selectedPaket.lokasi}
                        </p>
                        <p className="text-gray-600 text-justify">
                          {selectedPaket.deskripsi}
                        </p>

                        <p className="text-xl font-semibold text-green-600">
                          {selectedPaket.harga}
                        </p>

                        <a
                          href={selectedPaket.wa}
                          target="_blank"
                          className="inline-flex items-center gap-2 bg-green-500
                          hover:bg-green-600 text-white px-5 py-2 rounded-full"
                        >
                          <WhatsappLogo size={28} weight="fill" />
                          {t("contact_via_wa")}
                        </a>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        </AnimatePresence>
      </div>
    </>
  );
};

export default PaketWisata;
