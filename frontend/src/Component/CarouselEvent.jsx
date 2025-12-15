"use client";

import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import * as React from "react";
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

export default function CarouselEvent() {
  const [slides, setSlides] = useState([]);
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/atraksi/get");
        console.log("📦 Data dari backend:", res.data);
        setSlides(res.data.data || res.data);
      } catch (err) {
        console.error("Gagal fetch data event:", err);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

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
      className="relative w-full py-28 overflow-hidden bg-gradient-to-br from-[#0086CD] to-[#f9f2f2]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black/10"
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
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true, containScroll: false }}
          className="relative"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {slides.map((slide, idx) => {
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
    transition-all duration-500 bg-black shadow-2xl

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
                            "z-10 scale-75 blur-[3px] opacity-40"
                        )}
                      >
                        <img
                          src={`http://localhost:3000${slide.foto}`}
                          alt={slide.nameEvent}
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <CardContent
                          className="
  relative z-10 flex h-full flex-col justify-end
  p-4 sm:p-5 lg:p-6 text-white
"
                        >
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                            {slide.nameEvent}
                          </h3>

                          {slide.location && (
                            <p className="mt-1 text-xs sm:text-sm text-gray-300">
                              {slide.location}
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
                              Info Detail
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
                idx === current ? "w-8 bg-white" : "w-2 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
