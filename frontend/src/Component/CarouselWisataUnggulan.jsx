"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Geopark from "../assets/WisataUNggulan/GeoparkPoso.jpg";
import LoreLindu from "../assets/WisataUNggulan/LoreLindu.jpg";
import Togean from "../assets/WisataUNggulan/Togean.jpg";
const slides = [
  {
    id: 1,
    title: "Lore Lindu",
    location: "Kabupaten Sigi",
    description:
      "Lore Lindu bukan sekadar destinasi wisata, tetapi pengalaman menelusuri hutan pegunungan, menyaksikan satwa endemik, dan menemukan jejak megalitikum misterius peninggalan peradaban kuno. Di sini, alam liar, sejarah, dan budaya berpadu dalam satu perjalanan yang layak menjadi bagian dari hidupmu, bukan sekadar liburan.",
    image: LoreLindu,
  },

  {
    id: 2,
    title: "Geopark Poso",
    location: "Kabupaten Poso",
    description:
      "Geopark Poso bukan sekadar destinasi wisata, tetapi perjalanan memahami jejak geologi, panorama Danau Poso, dan budaya lokal yang menghormati alam. Menyusuri situs warisan bumi, menikmati keindahan danau, hingga merasakan harmoni antara ilmu pengetahuan, pelestarian, dan kehidupan masyarakat, menjadikannya pengalaman yang layak menjadi bagian dari perjalanan hidupmu, bukan sekadar liburan.",
    image: Geopark,
  },
  {
    id: 3,
    title: "Togean Islands",
    location: "Kabupaten Tojo Una-Una",
    description:
      "Kepulauan Togean adalah kepulauan terpencil di Teluk Tomini, Sulawesi Tengah, Indonesia, yang terkenal sebagai surga tropis dengan keindahan bawah laut kelas dunia dan keanekaragaman hayati yang kaya, menawarkan pantai berpasir putih, perairan biru jernih, hutan hujan, dan kesempatan untuk menyelam serta snorkeling di kawasan Taman Nasional Kepulauan Togean.",
    image: Togean,
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
                <h3 className="text-lg text-blue-200 mb-4">{slide.location}</h3>

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
                  <Button
                    variant="outline"
                    className="bg-gray-50/20 hover:bg-gray-50/30"
                  >
                    Info Detail
                  </Button>
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
