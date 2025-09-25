"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DanauLindu from "../assets/Event/FestivalDanauLindu.jpg";
import FestivalDanauPoso from "../assets/Event/FestivalDanauPoso.jpg";
import FestivalTelukTomini from "../assets/Event/FestivalTelukTomini.jpeg";
import FestivalTumbe from "../assets/Event/FestivalTumbe.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Festival Danau Lindu",
    location: "Kabupaten Sigi",
    description:
      "Festival Danau Lindu adalah perayaan budaya yang memadukan keindahan alam pegunungan dengan kearifan tradisi masyarakat sekitar. Di tengah danau yang tenang nan memukau, wisatawan dapat menyaksikan pertunjukan seni, lomba perahu, hingga ritual adat yang sarat makna. Festival ini bukan hanya pesta rakyat, melainkan juga perjalanan spiritual dan budaya yang mempertemukan alam, manusia, dan tradisi dalam satu harmoni.",
    image: DanauLindu,
  },

  {
    id: 2,
    title: "Festival Danau Poso",
    location: "Kabupaten Poso",
    description:
      "Festival Danau Poso adalah pesta budaya tahunan yang menampilkan keindahan seni, musik, tarian tradisional, serta olahraga air di salah satu danau terbesar di Indonesia. Dikelilingi panorama menakjubkan, festival ini mengajak wisatawan merasakan kehangatan masyarakat Poso sekaligus menjelajahi warisan budaya yang masih terjaga. Momen senja di tepian danau, diiringi nyanyian dan tarian, menjadikan pengalaman ini sulit dilupakan.",
    image: FestivalDanauPoso,
  },

  {
    id: 3,
    title: "Festival Teluk Tomini",
    location: "Kabupaten Parigi Moutong",
    description:
      "Festival Teluk Tomini adalah ajang spektakuler yang merayakan pesona laut tropis sekaligus kekayaan budaya pesisir. Dengan latar perairan biru nan luas, wisatawan dapat menyaksikan parade perahu hias, lomba perikanan tradisional, hingga sajian kuliner khas bahari. Festival ini menghadirkan kombinasi unik antara petualangan laut, hiburan rakyat, dan kehangatan budaya lokal yang membuat setiap pengunjung merasa menjadi bagian dari keluarga besar Tomini.",
    image: FestivalTelukTomini,
  },

  {
    id: 4,
    title: "Festival Malabot Tumbe",
    location: "Kabupaten Banggai Laut",
    description:
      "Festival Malabot Tumbe adalah tradisi sakral yang diwariskan turun-temurun oleh masyarakat Banggai Laut. Perayaan ini mengisahkan perjalanan sejarah migrasi leluhur melalui simbol pertukaran telur, yang melambangkan persaudaraan dan persatuan. Festival ini bukan sekadar upacara adat, tetapi juga atraksi budaya yang memikat dengan tarian, musik, dan prosesi penuh warna. Bagi wisatawan, Tumbe menjadi kesempatan langka untuk menyelami sejarah, tradisi, dan filosofi hidup masyarakat Banggai Laut.",
    image: FestivalTumbe,
  },
];

export default function Carousel() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  const [expanded, setExpanded] = useState({});

  // Auto slide setiap 5 detik
  useEffect(() => {
    if (!slider) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 300000);
    return () => clearInterval(interval);
  }, [slider]);

  const truncateText = (text, maxWords = 15) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="relative w-full h-[100vh]">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {slides.map((slide) => {
          const isExpanded = expanded[slide.id] || false;
          return (
            <>
              <div
                key={slide.id}
                className="keen-slider__slide relative flex items-center justify-end px-25"
              >
                {/* Background */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
                {/* Content */}
                <div className="relative z-10 max-w-2xl text-white p-6">
                  <h1>Wisata Unggulan</h1>
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <h3 className="text-lg text-blue-200 mb-4">
                    {slide.location}
                  </h3>

                  <p className="mb-4 text-justify">
                    {isExpanded
                      ? slide.description
                      : truncateText(slide.description)}
                  </p>

                  <button
                    className="text-blue-300 hover:underline mb-6"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [slide.id]: !isExpanded,
                      }))
                    }
                  >
                    {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                  </button>

                  <div>
                    {slide.id === 1 && (
                      <Link to="/danau-lindu">
                        <Button
                          variant="outline"
                          className="bg-gray-50/20 hover:bg-gray-50/30"
                        >
                          Info Detail
                        </Button>
                      </Link>
                    )}
                    {slide.id === 2 && (
                      <Link to="/danau-poso">
                        <Button
                          variant="outline"
                          className="bg-gray-50/20 hover:bg-gray-50/30"
                        >
                          Info Detail
                        </Button>
                      </Link>
                    )}
                    {slide.id === 3 && (
                      <Link to="/teluk-tomini">
                        <Button
                          variant="outline"
                          className="bg-gray-50/20 hover:bg-gray-50/30"
                        >
                          Info Detail
                        </Button>
                      </Link>
                    )}
                    {slide.id === 4 && (
                      <Link to="/tumbe">
                        <Button
                          variant="outline"
                          className="bg-gray-50/20 hover:bg-gray-50/30"
                        >
                          Info Detail
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => slider.current?.prev()}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => slider.current?.next()}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
