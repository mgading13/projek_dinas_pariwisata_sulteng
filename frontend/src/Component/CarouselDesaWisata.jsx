"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Towale from "../assets/SiDewi/Towale1.jpg";
import Karosondaya from "../assets/SiDewi/Karosondaya1.jpg";
import LukPanenteng from "../assets/SiDewi/Paisupok.jpg";
import TamanAnggrek from "../assets/SiDewi/TamanAnggrek1.png";
import PuloDua from "../assets/SiDewi/PuloDua3.jpeg";
import Bonebaru from "../assets/SiDewi/Bonebaru1.jpeg";
import Pokekea from "../assets/SiDewi/Pokekea2.jpg";
import Malangga from "../assets/SiDewi/Malangga1.jpg";
import Mendaan from "../assets/SiDewi/Mendaan1.png";
import LabuanBelanda from "../assets/SiDewi/LabuanBelanda1.jpg";
import Bente from "../assets/SiDewi/Bente1.jpg";
import Ungkea from "../assets/SiDewi/Ungkea1.png";

const slides = [
  {
    id: 1,
    title: "Luk Panenteng",
    location: "Kabupaten Banggai Kepulauan",
    description:
      "Luk Panenteng adalah destinasi bahari yang menawan dengan panorama laut biru jernih dan hamparan pasir putih yang memikat hati. Di sini, wisatawan dapat menikmati ketenangan alam, menyelam untuk menjelajahi keindahan bawah laut, serta merasakan keramahan masyarakat pesisir yang masih menjaga tradisi leluhur. Tempat ini menjadi surga tersembunyi bagi pencinta petualangan laut sekaligus pecinta ketenangan.",
    image: LukPanenteng,
    route: "/luk-panenteng",
  },
  {
    id: 2,
    title: "Towale",
    location: "Kabupaten Donggala",
    description:
      "Towale memikat wisatawan dengan pesona pantai tropis yang masih alami, air laut berwarna biru toska, serta deburan ombak yang menenangkan. Desa wisata ini juga menyimpan kekayaan budaya lokal yang sarat akan nilai kearifan tradisional. Menikmati senja di Towale adalah pengalaman magis, seolah-olah waktu berhenti untuk memberi ruang bagi ketenangan batin dan refleksi diri.",
    image: Towale,
    route: "/towale",
  },
  {
    id: 3,
    title: "Karosondaya",
    location: "Kabupaten Parigi Moutong",
    description:
      "Karosondaya dikenal sebagai gerbang menuju keindahan alam Parigi Moutong. Pemandangan hijau perbukitan, udara sejuk pedesaan, hingga keramahan penduduknya membuat siapa pun betah berlama-lama. Wisatawan bisa menikmati panorama sawah yang asri, menjelajah alam, hingga mencicipi kuliner lokal yang autentik. Karosondaya menawarkan keseimbangan sempurna antara keindahan alam dan kekayaan budaya.",
    image: Karosondaya,
    route: "/karosondaya",
  },
  {
    id: 4,
    title: "Taman Anggrek",
    location: "Kabupaten Sigi",
    description:
      "Taman Anggrek di Kabupaten Sigi adalah rumah bagi berbagai spesies anggrek langka yang tumbuh subur di habitat alaminya. Tempat ini menghadirkan suasana sejuk, tenang, dan penuh warna dari bunga-bunga eksotis yang bermekaran. Tidak hanya sekadar wisata, Taman Anggrek juga menjadi pusat edukasi dan konservasi, menjadikannya destinasi ideal bagi pecinta flora maupun keluarga yang ingin berwisata sambil belajar.",
    image: TamanAnggrek,
    route: "/taman-anggrek",
  },
  {
    id: 5,
    title: "Pulo Dua",
    location: "Kabupaten Banggai",
    description:
      "Pulo Dua merupakan permata tersembunyi dengan dua pulau yang saling berhadapan, dikelilingi laut jernih dan biota laut yang menakjubkan. Destinasi ini cocok untuk aktivitas snorkeling, diving, atau sekadar menikmati panorama tropis yang memanjakan mata. Keindahan Pulo Dua menjadikannya salah satu spot bahari terbaik di Sulawesi Tengah, penuh dengan pesona alam yang masih terjaga keasliannya.",
    image: PuloDua,
    route: "/pulo-dua",
  },
  {
    id: 6,
    title: "Bone Baru",
    location: "Kabupaten Banggai Laut",
    description:
      "Bone Baru adalah desa wisata bahari yang menawarkan keindahan bawah laut kelas dunia. Air lautnya yang jernih memperlihatkan terumbu karang berwarna-warni dan ikan tropis yang menari bebas. Selain itu, budaya masyarakat pesisir yang ramah membuat pengalaman berkunjung semakin hangat dan berkesan. Tempat ini ideal untuk wisatawan yang mencari keindahan laut sekaligus keaslian budaya lokal.",
    image: Bonebaru,
    route: "/bonebaru",
  },
  {
    id: 7,
    title: "Pokekea",
    location: "Kabupaten Poso",
    description:
      "Pokekea dikenal sebagai situs megalitikum bersejarah yang menyimpan jejak peradaban kuno di tanah Sulawesi. Batu-batu megalit yang berdiri kokoh menghadirkan misteri sekaligus daya tarik arkeologis. Suasana pedesaan yang asri dan nuansa spiritual yang kental menjadikan Pokekea destinasi unik, di mana wisatawan bisa merasakan perjalanan lintas waktu antara alam dan sejarah.",
    image: Pokekea,
    route: "/pokekea",
  },
  {
    id: 8,
    title: "Malangga",
    location: "Kabupaten Toli-Toli",
    description:
      "Malangga adalah desa wisata dengan pesona pantai alami dan panorama alam tropis yang memanjakan mata. Udara segar, air laut yang biru, serta kehidupan nelayan yang sederhana menjadikan Malangga tempat ideal untuk melarikan diri dari hiruk-pikuk perkotaan. Wisatawan juga dapat menikmati kuliner laut segar yang diolah langsung oleh penduduk setempat, menambah keunikan pengalaman berwisata.",
    image: Malangga,
    route: "/malangga",
  },
  {
    id: 9,
    title: "Mendaan",
    location: "Kabupaten Buol",
    description:
      "Mendaan menawarkan keindahan alam pedesaan yang autentik, dikelilingi sawah hijau, pepohonan rimbun, dan udara yang sejuk. Desa ini menghadirkan suasana damai yang jarang ditemukan, cocok bagi wisatawan yang ingin beristirahat dari rutinitas. Kehidupan masyarakat yang masih memegang tradisi memberikan nilai tambah tersendiri, menjadikan Mendaan sebagai tempat wisata yang hangat dan penuh cerita.",
    image: Mendaan,
    route: "/mendaan",
  },
  {
    id: 10,
    title: "Labuan Belanda",
    location: "Kabupaten Tojo Una-Una",
    description:
      "Labuan Belanda merupakan surga bahari dengan pantai berpasir putih dan laut biru yang jernih. Nama uniknya menyimpan kisah sejarah yang menarik, menambah daya tarik destinasi ini. Wisatawan bisa berenang, snorkeling, atau sekadar menikmati keindahan pantai. Labuan Belanda adalah pilihan tepat untuk wisata bahari yang menawarkan ketenangan sekaligus keindahan alam tropis.",
    image: LabuanBelanda,
    route: "/labuan-belanda",
  },
  {
    id: 11,
    title: "Bente",
    location: "Kabupaten Morowali",
    description:
      "Bente dikenal dengan kekayaan alamnya yang masih perawan, berupa hutan hijau, sungai yang jernih, serta panorama pedesaan yang menenangkan. Desa ini cocok untuk ekowisata dan trekking, memberi kesempatan wisatawan menjelajahi alam sambil merasakan kehangatan masyarakat setempat. Bente adalah destinasi sempurna untuk merasakan harmoni antara manusia dan alam.",
    image: Bente,
    route: "/bente",
  },
  {
    id: 12,
    title: "Ungkea",
    location: "Kabupaten Morowali Utara",
    description:
      "Ungkea adalah desa wisata yang menawarkan panorama laut indah berpadu dengan perbukitan hijau di kejauhan. Wisatawan dapat menikmati suasana pesisir yang damai, menjelajahi kehidupan nelayan, hingga merasakan kuliner khas laut yang segar. Dengan alamnya yang menawan dan budaya yang masih terjaga, Ungkea memberikan pengalaman wisata yang autentik dan menyentuh hati.",
    image: Ungkea,
    route: "/ungkea",
  },
];

export default function Carousel() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  // Auto slide setiap 5 detik
  useEffect(() => {
    if (!slider) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 100000);
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
                className="keen-slider__slide relative flex items-start p-25"
              >
                {/* Background */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover "
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                {/* Content */}
                <div className="relative z-10 max-w-2xl text-white p-6 ">
                  <h1 className="font-semibold text-xl">Si Dewi (Desa Wisata)</h1>
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <h3 className="font-semibold text-xl text-blue-200 mb-4">
                    {slide.location}
                  </h3>

                  <p className="text-lg font-medium mb-4 text-justify">
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
                      onClick={() => navigate(slide.route)}
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
