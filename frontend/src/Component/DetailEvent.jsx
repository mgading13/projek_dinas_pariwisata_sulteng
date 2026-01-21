"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import CountDown from "./CountDown";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function DetailEvent() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  /* 🔥 PARALLAX */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], ["0%", "25%"]);
  const contentY = useTransform(scrollY, [0, 300], ["0%", "-10%"]);

  useEffect(() => {
    const getAtraksi = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/atraksi");

        // ✅ ambil array event
        const events = res.data.data;

        // ✅ cari berdasarkan slug
        const foundEvent = events.find(
          (item) => item.nameEvent.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        setEvent(foundEvent);
      } catch (error) {
        console.error("Error loading detail atraksi:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    getAtraksi();
  }, [slug]);

  if (loading || !event) {
    return (
      <div className="min-h-scr een flex flex-col">
        <Navbar />
        <div className="flex flex-col gap-6 p-10">
          <Skeleton className="w-full h-[350px]" />
          <Skeleton className="w-full h-[200px]" />
        </div>
      </div>
    );
  }

  const bgImage = `http://localhost:3000${event.foto}`;
  const locale = i18n.language === "en" ? "en-US" : "id-ID";

  const startDate = new Date(event.startdate).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endDate = new Date(event.enddate).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative min-h-screen overflow-hidden">
          {/* PARALLAX BACKGROUND */}
          {bgImage?.match(/\.(mp4|webm|ogg)$/i) ? (
            <motion.video
              src={bgImage}
              style={{ y: bgY }}
              autoPlay
              muted
              loop
              poster="/fallback.jpg"
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ) : (
            <motion.div
              style={{
                y: bgY,
                backgroundImage: `url(${bgImage})`,
              }}
              className="absolute inset-0 bg-cover bg-center"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

          {/* CONTENT */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 min-h-screen flex items-center justify-center px-4"
          >
            {/* GLASS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <Card className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                <CardContent className="p-6 sm:p-8 md:p-10 text-white space-y-6">
                  {/* TITLE */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
                  >
                    {event.nameEvent}
                  </motion.h1>

                  {/* LOCATION */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-center text-gray-300 text-sm sm:text-base"
                  >
                    {i18n.language === "en"
                      ? event.location_en
                      : event.location_id}
                  </motion.p>

                  {/* COUNTDOWN */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center"
                  >
                    <CountDown event={event} />
                  </motion.div>

                  {/* DATE */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75 }}
                    className="text-center text-gray-200 text-sm sm:text-base"
                  >
                    📅 {startDate} – {endDate}
                  </motion.p>

                  {/* DIVIDER */}
                  <div className="h-px bg-white/20" />

                  {/* DESCRIPTION */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-gray-200 leading-relaxed text-justify text-sm sm:text-base"
                  >
                    {i18n.language === "en"
                      ? event.description_en
                      : event.description_id}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </motion.main>
    </>
  );
}
