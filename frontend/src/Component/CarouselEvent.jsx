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

  return (
    <section className="w-full bg-black py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true, containScroll: false}}
          className="relative"
        >
          <CarouselContent className="-ml-6">
            {slides.map((slide, idx) => {
              const total = slides.length;

              const prevIndex = (current - 1 + total) % total;
              const nextIndex = (current + 1) % total;

              const isActive = idx === current;
              const isPrev = idx === prevIndex;
              const isNext = idx === nextIndex;

              return (
                <CarouselItem
                  key={slide.id}
                  className="pl-6 basis-[320px] flex justify-center"
                >
                  <Card
                    className={cn(
                      "relative h-[480px] w-[300px] overflow-hidden rounded-3xl transition-all duration-500",
                      "bg-black shadow-2xl",

                      isActive && "z-30 scale-100 rotate-y-0",
                      (isPrev || isNext) &&
                        "z-20 scale-90 blur-[1.5px] rotate-y-12 opacity-70",
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

                    <CardContent className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-semibold">
                        {slide.nameEvent}
                      </h3>

                      {slide.location && (
                        <p className="mt-1 text-sm text-gray-300">
                          {slide.location}
                        </p>
                      )}

                      <Link to={`/event/${slide.id}`} className="mt-4">
                        <Button
                          size="sm"
                          className="w-full bg-white/20 text-white hover:bg-white/30"
                        >
                          Info Detail
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="left-0 bg-white/10 text-white hover:bg-white/20" />
          <CarouselNext className="right-0 bg-white/10 text-white hover:bg-white/20" />
        </Carousel>

        {/* PROGRESS */}
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === current ? "w-8 bg-white" : "w-2 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
