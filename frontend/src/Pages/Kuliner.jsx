import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
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
import Navbar from "../Component/NavBar";
import Paisupok from "../assets/Luk-Panenteng.jpg";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import API_URL from "@/lib/api";

const Kuliner = () => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedKuliner, setSelectedKuliner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const [dataKuliner, setDataKuliner] = useState([]);
  const [dataRumahMakan, setDataRumahMakan] = useState([]);

  // ⭐ LIST rumah makan yang cocok
  const [rumahMakanTerkait, setRumahMakanTerkait] = useState([]);

  useEffect(() => {
    const fetchDataKuliner = async () => {
      try {
        const res = await API_URL.get("/kuliner");

        const formatted = res.data.map((item) => ({
          id: item.id,
          nama: item.nama_makanan,
          deskripsi:
            i18n.language === "en" ? item.deskripsi_en : item.deskripsi_id,
          lokasi: item.lokasi,
          foto:
            item.foto && item.foto !== ""
              ? `${import.meta.env.VITE_BASE_URL}${item.foto}`
              : item.link_video && item.link_video !== ""
                ? item.link_video
                : null,
        }));

        setDataKuliner(formatted);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data kuliner.");
      }
    };

    const fetchDataRumahMakan = async () => {
      try {
        const res = await API_URL.get("/rumahMakan");

        const formatted = res.data.map((item) => ({
          id: item.id,
          kulinerId: item.kulinerId,
          nama: item.resto,
          link_gmaps: item.link_gmaps,
        }));

        setDataRumahMakan(formatted);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data rumah makan.");
      }
    };

    fetchDataKuliner();
    fetchDataRumahMakan();
    setLoading(false);
  }, [i18n.language]);

  useEffect(() => {
    if (!selectedKuliner) return;

    const filtered = dataRumahMakan.filter(
      (rm) => rm.kulinerId === selectedKuliner.id,
    );

    setRumahMakanTerkait(filtered);
  }, [selectedKuliner, dataRumahMakan]);

  const filteredKuliner = dataKuliner.filter((p) =>
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
        style={{ backgroundImage: `url(${Paisupok})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center py-24 px-6">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            {t("title_kuliner")}
          </h1>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md mb-10 bg-white rounded-full shadow-md overflow-hidden">
            <Search className="ml-3 text-gray-500" />
            <Input
              type="text"
              placeholder="Kaledo, Onyop, dll..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-transparent focus-visible:ring-0 focus:outline-none text-gray-700 placeholder:text-gray-500"
            />
          </div>

          {/* Carousel / Grid Section — tidak diubah */}
          <AnimatePresence mode="wait">
            {!showAll && (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-6xl"
              >
                <Carousel
                  opts={{ align: "start", dragFree: true, loop: false }}
                  className="w-full"
                >
                  <CarouselContent>
                    {filteredKuliner.map((kuliner) => (
                      <CarouselItem
                        key={kuliner.id}
                        className="basis-full sm:basis-1/2 md:basis-1/3"
                      >
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -40 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        ></motion.div>
                        <Card
                          onClick={() => setSelectedKuliner(kuliner)}
                          className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                        >
                          {(() => {
                            const type = getMediaType(kuliner.foto);
                            const embedUrl = convertYoutubeLink(kuliner.foto);

                            if (type === "video") {
                              return (
                                <video
                                  src={kuliner.foto}
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
                                  src={kuliner.foto}
                                  className="w-full h-56 object-cover"
                                  alt={kuliner.nama}
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

                          <div className="p-4 space-y-2">
                            <h2 className="text-lg font-semibold">
                              {kuliner.nama}
                            </h2>
                            <p className="text-sm text-muted-foreground font-semibold">
                              {kuliner.lokasi}
                            </p>

                            <Badge
                              className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300 text-sm"
                              variant="secondary"
                            >
                              {t("lihat_rumah_makan")}
                            </Badge>
                          </div>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              </motion.div>
            )}

            {showAll && (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mt-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredKuliner.map((kuliner) => (
                    <motion.div
                      key={kuliner.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <Card
                        onClick={() => setSelectedKuliner(kuliner)}
                        className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                      >
                        {(() => {
                          const type = getMediaType(kuliner.foto);
                          const embedUrl = convertYoutubeLink(kuliner.foto);

                          if (type === "video") {
                            return (
                              <video
                                src={kuliner.foto}
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
                                src={kuliner.foto}
                                className="w-full h-56 object-cover"
                                alt={kuliner.nama}
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

                        <div className="p-4 space-y-2">
                          <h2 className="text-lg font-semibold">
                            {kuliner.nama}
                          </h2>
                          <p className="text-sm text-muted-foreground font-semibold">
                            {kuliner.lokasi}
                          </p>

                          <Badge
                            className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-900 text-sm"
                            variant="secondary"
                          >
                            {t("lihat_rumah_makan")}
                          </Badge>
                        </div>
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
              className="bg-white/80 rounded-full flex items-center gap-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <ChevronUp size={50} strokeWidth={3} color="black" />
              ) : (
                <ChevronDown size={50} strokeWidth={3} color="black" />
              )}
            </Button>
          </div>
        </div>

        {/* ⭐ MODAL DETAIL */}
        <AnimatePresence>
          <Dialog
            open={!!selectedKuliner}
            onOpenChange={() => setSelectedKuliner(null)}
          >
            {selectedKuliner && (
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                {/* HEADER IMAGE */}
                <div className="relative h-64">
                  {(() => {
                    const type = getMediaType(selectedKuliner.foto);
                    const embedUrl = convertYoutubeLink(selectedKuliner.foto);

                    if (type === "video") {
                      return (
                        <video
                          src={selectedKuliner.foto}
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
                          src={selectedKuliner.foto}
                          className="w-full h-56 object-cover"
                          alt={selectedKuliner.nama}
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
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">
                      {selectedKuliner.nama}
                    </h2>
                    <p className="text-sm">{selectedKuliner.lokasi}</p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">
                  <p className="text-justify">{selectedKuliner.deskripsi}</p>

                  <h3 className="font-semibold text-lg">{t("rumah_makan")}</h3>

                  <div className="max-h-[300px] overflow-y-auto space-y-3">
                    {rumahMakanTerkait.map((rm) => (
                      <div
                        key={rm.id}
                        className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                      >
                        <p className="font-medium">{rm.nama}</p>
                        <a
                          href={rm.link_gmaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                          Maps
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Kuliner;
