"use client";

import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import LoadingCard from "@/components/ui/LoadingCard";
import EmptyCard from "@/components/ui/EmptyCard";
import ErrorCard from "@/components/ui/ErrorCard";
import { useTranslation } from "react-i18next";
import API_URL from "@/lib/api";

export default function CarouselEvent() {
  const [slides, setSlides] = useState([]);
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isEmpty = !loading && !error && slides.length === 0;

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await API_URL.get("/atraksi");
        setSlides(res.data.data || res.data);
      } catch (err) {
        console.error("Gagal fetch event:", err);
        setError(" ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function convertYoutubeLink(url) {
    if (!url) return null;

    try {
      const urlObj = new URL(url);

      let videoId = "";

      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.replace("/", "");
      }

      if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v");
      }

      if (!videoId) return null;

      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1`;
    } catch (err) {
      console.error("Error converting YouTube link:", err);
      return null;
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full py-28 overflow-hidden bg-gradient-to-b from-[#D1855C] to-[#F3E6DC]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div
        className="
  mx-auto 
  max-w-full 
  sm:max-w-5xl 
  lg:max-w-6xl 
  xl:max-w-[1400px] 
  px-4 sm:px-6
"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {t("atraksi")}
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto text-sm sm:text-base">
            {t("desc_atraksi")}
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true, containScroll: false }}
          className="relative"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {/* LOADING */}
            {loading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-3 sm:pl-4 flex justify-center"
                >
                  <LoadingCard
                    title="Memuat Atraksi..."
                    description="Sedang mengambil data Atraksi, mohon tunggu"
                  />
                </CarouselItem>
              ))}

            {/* EMPTY */}
            {isEmpty &&
              Array.from({ length: 3 }).map((_, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-3 sm:pl-4 flex justify-center"
                >
                  <EmptyCard
                    title="Belum ada Atraksi"
                    description="Atraksi akan ditampilkan jika sudah tersedia"
                  />
                </CarouselItem>
              ))}

            {/* ERROR */}
            {error && (
              <CarouselItem className="pl-3 sm:pl-4 flex justify-center">
                <ErrorCard
                  title={t("error_atraksi")}
                  message={error}
                  onRetry={() => window.location.reload()}
                />
              </CarouselItem>
            )}

            {/* SUCCESS */}
            {!loading &&
              !error &&
              slides.map((slide, idx) => {
                // Ambil data sesuai bahasa. Jika bahasa Inggris kosong, fallback ke ID
                const isEnglish = i18n.language === "en";

                const locationDisplay = isEnglish
                  ? slide.location_en || slide.location_id
                  : slide.location_id;
                const isSingle = slides.length === 1;

                const total = slides.length;

                const prevIndex = (current - 1 + total) % total;
                const nextIndex = (current + 1) % total;

                const isActive = idx === current;
                const isPrev = idx === prevIndex;
                const isNext = idx === nextIndex;

                return (
                  <CarouselItem
                    key={slide.id}
                    className="
    pl-3 sm:pl-4
    basis-[300px]
    sm:basis-[360px]
    lg:basis-[460px]
    xl:basis-[500px]
    flex justify-center
  "
                  >
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div variants={cardVariants}>
                        <Card
                          className={cn(
                            `
    relative overflow-hidden rounded-3xl
    transition-all duration-500 

    h-[380px] w-[260px]
    sm:h-[440px] sm:w-[320px]
    lg:h-[480px] lg:w-[400px]
    xl:h-[500px] xl:w-[450px]
    `,

                            isSingle && "z-30 scale-100 blur-0 opacity-100",

                            !isSingle && isActive && "z-30 scale-100",

                            !isSingle &&
                              (isPrev || isNext) &&
                              "z-20 scale-90 blur-[1.5px] opacity-70",

                            !isSingle &&
                              !isActive &&
                              !isPrev &&
                              !isNext &&
                              "z-10 scale-75 blur-[3px] opacity-40",
                          )}
                        >
                          {slide && (
                            <>
                              {/* PRIORITAS 1: Jika ada foto */}
                              {slide.foto ? (
                                slide.foto.match(/\.(mp4|webm|ogg)$/i) ? (
                                  <video
                                    src={`http://localhost:3000${slide.foto}`}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                  />
                                ) : (
                                  <img
                                    src={`http://localhost:3000${slide.foto}`}
                                    alt={slide.nameEvent}
                                    className="absolute inset-0 h-full w-full object-cover"
                                  />
                                )
                              ) : /* PRIORITAS 2: Jika tidak ada foto tapi ada link video */
                              slide.link_video ? (
                                <iframe
                                  src={convertYoutubeLink(slide.link_video)}
                                  className="
        absolute
        top-1/2 left-1/2
        min-w-full min-h-full
        w-auto h-auto
        -translate-x-1/2 -translate-y-1/2
        scale-150
      "
                                  allow="autoplay; fullscreen"
                                  allowFullScreen
                                  controls="0"
                                />
                              ) : (
                                /* PRIORITAS 3: Fallback */
                                <img
                                  src="/fallback.jpg"
                                  alt="fallback"
                                  className="absolute inset-0 h-full w-full object-cover"
                                />
                              )}

                              <div className="absolute inset-0 bg-black/40" />
                            </>
                          )}

                          <CardContent
                            className="
  relative z-10 flex h-full flex-col justify-end
  p-4 sm:p-5 lg:p-6 text-white
"
                          >
                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                              {slide.nameEvent}
                            </h3>

                            {locationDisplay && (
                              <p className="mt-1 text-xs sm:text-sm text-gray-300">
                                {locationDisplay}
                              </p>
                            )}

                            <Link
                              to={`/event/${slide.nameEvent
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="mt-3 sm:mt-4"
                            >
                              <Button
                                size="sm"
                                className="w-full bg-white/20 text-white hover:bg-white/30"
                              >
                                {t("info_detail")}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>

          {slides.length > 1 && (
            <CarouselPrevious className="left-0 bg-white/10 text-white hover:bg-white/20" />
          )}
          {slides.length > 1 && (
            <CarouselNext className="right-0 bg-white/10 text-white hover:bg-white/20" />
          )}
        </Carousel>

        {/* PROGRESS */}
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === current ? "w-8 bg-white" : "w-2 bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
