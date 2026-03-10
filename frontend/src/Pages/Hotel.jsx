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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Globe } from "lucide-react";
import Navbar from "../Component/NavBar";
import Paisupok from "../assets/Luk-Panenteng.jpg";
import { useTranslation } from "react-i18next";
import API_URL from "@/lib/api";
const Hotel = () => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [dataHotel, setDataHotel] = useState([]);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchDataHotel = async () => {
      try {
        const res = await API_URL.get("/hotel");

        const formatted = res.data.map((item) => ({
          id: item.id,
          namaHotel: item.nama_hotel,
          lokasi: item.lokasi,
          jumlahKamar: item.jumlah_kamar,
          jumlahTempatTidur: item.jumlah_tempatTidur,
          harga: item.harga,
          telepon: item.telepon,
          linkWebsite: item.website,
          linkGmaps: item.link_gmaps,
          foto:
            item.foto && item.foto !== ""
              ? `http://localhost:3000${item.foto}`
              : item.link_video && item.link_video !== ""
                ? item.link_video
                : null,
        }));
        setDataHotel(formatted);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data hotel");
      }
    };

    fetchDataHotel();
    setLoading(false);
  }, []);

  const filteredHotel = dataHotel.filter((p) =>
    p.namaHotel.toLowerCase().includes(search.toLowerCase()),
  );
  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

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
            {t("list_hotel")}
          </h1>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md mb-10 bg-white rounded-full shadow-md overflow-hidden">
            <Search className="ml-3 text-gray-500" />
            <Input
              type="text"
              placeholder="Cari nama hotel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-transparent focus-visible:ring-0 focus:outline-none text-gray-700 placeholder:text-gray-500"
            />
          </div>

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
                    {filteredHotel.map((hotel) => (
                      <CarouselItem
                        key={hotel.id}
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
                          className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
                          onClick={() => setSelectedHotel(hotel)}
                        >
                          {(() => {
                            const type = getMediaType(hotel.foto);
                            const embedUrl = convertYoutubeLink(hotel.foto);

                            if (type === "video") {
                              return (
                                <video
                                  src={hotel.foto}
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
                                  src={hotel.foto}
                                  className="w-full h-56 object-cover"
                                  alt={hotel.namaHotel}
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

                          <div className="p-4">
                            <h2 className="font-semibold text-lg">
                              {hotel.namaHotel}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {hotel.lokasi}
                            </p>

                            <div className="mt-3 flex j items-center">
                              <p className="text-primary font font-semibold">
                                Mulai dari{" "}
                                <span className="text-primary font-bold">
                                  Rp{" "}
                                  {Number(hotel.harga).toLocaleString("id-ID")}{" "}
                                  / malam
                                </span>
                              </p>

                              <span className="text-xs text-muted-foreground"></span>
                            </div>
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
                  {filteredHotel.map((hotel) => (
                    <motion.div
                      key={hotel.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <Card
                        className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
                        onClick={() => setSelectedHotel(hotel)}
                      >
                        {(() => {
                          const type = getMediaType(hotel.foto);
                          const embedUrl = convertYoutubeLink(hotel.foto);

                          if (type === "video") {
                            return (
                              <video
                                src={hotel.foto}
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
                                src={hotel.foto}
                                className="w-full h-56 object-cover"
                                alt={hotel.namaHotel}
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

                        <div className="p-4">
                          <h2 className="font-semibold text-lg">
                            {hotel.namaHotel}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {hotel.lokasi}
                          </p>

                          <div className="mt-3 flex j items-center">
                            <p className="text-primary font font-semibold">
                              Mulai dari{" "}
                              <span className="text-primary font-bold">
                                Rp {Number(hotel.harga).toLocaleString("id-ID")}{" "}
                                / malam
                              </span>
                            </p>

                            <span className="text-xs text-muted-foreground"></span>
                          </div>
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
          {selectedHotel && (
            <Dialog
              open={!!selectedHotel}
              onOpenChange={() => setSelectedHotel(null)}
            >
              <DialogContent
                className="
    w-[95vw]
    max-w-3xl
    max-h-[90vh]
    overflow-y-auto
    p-0
  "
              >
                {/* ANIMATED WRAPPER */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* FOTO */}
                  <div className="relative h-48 sm:h-64 md:h-72 w-full">
                    {(() => {
                      const type = getMediaType(selectedHotel.foto);
                      const embedUrl = convertYoutubeLink(selectedHotel.foto);

                      if (type === "video") {
                        return (
                          <video
                            src={selectedHotel.foto}
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
                            src={selectedHotel.foto}
                            className="w-full h-56 object-cover"
                            alt={selectedHotel.namaHotel}
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

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* TITLE */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-2xl font-bold">
                        {selectedHotel.namaHotel}
                      </h2>
                      <p className="flex items-center gap-1 text-sm text-gray-200">
                        <MapPin size={14} />
                        {selectedHotel.lokasi}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-6 space-y-4"
                  >
                    {/* HARGA */}
                    <p className="text-xl font-semibold text-primary">
                      Mulai dari Rp{" "}
                      {Number(selectedHotel.harga).toLocaleString("id-ID")} /
                      malam
                    </p>

                    {/* INFO GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="font-semibold">Jumlah Kamar</span>
                        <p>{selectedHotel.jumlahKamar}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Tempat Tidur</span>
                        <p>{selectedHotel.jumlahTempatTidur}</p>
                      </div>
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {/* TELEPON */}
                      {selectedHotel.telepon && (
                        <a
                          href={`tel:${selectedHotel.telepon}`}
                          className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition"
                        >
                          <Phone size={16} />
                          Telepon
                        </a>
                      )}

                      {/* MAPS */}
                      {selectedHotel.linkGmaps && (
                        <a
                          href={selectedHotel.linkGmaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
                        >
                          <MapPin size={16} />
                          Google Maps
                        </a>
                      )}

                      {/* WEBSITE */}
                      {selectedHotel.linkWebsite && (
                        <a
                          href={selectedHotel.linkWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 transition"
                        >
                          <Globe size={16} />
                          Website
                        </a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hotel;
