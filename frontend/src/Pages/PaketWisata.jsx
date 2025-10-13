import { useState } from "react";
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
import Paisupok from "../assets/SiDewi/LukPanenteng1.png";

const PaketWisata = () => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState(null); // untuk modal detail

  const dataPaket = [
    {
      id: 1,
      nama: "Wisata Bahari Pulo Dua",
      deskripsi: [
        "Snorkeling di laut jernih",
        "Menikmati sunset di pantai",
        "Kuliner seafood lokal",
      ],
      detail:
        "Nikmati keindahan laut Pulo Dua dengan snorkeling, wisata pantai, dan kuliner khas Sulawesi Tengah. Cocok untuk pecinta alam dan laut.",
      harga: "Rp. 500.000",
      foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      wa: "https://wa.me/628123456789",
    },
    {
      id: 2,
      nama: "Eksplor Danau Lindu",
      deskripsi: [
        "Menjelajahi danau dan hutan tropis",
        "Menginap di rumah adat lokal",
        "Wisata budaya dan kuliner khas",
      ],
      detail:
        "Petualangan di Danau Lindu dengan panorama hutan tropis dan pengalaman budaya lokal. Termasuk penginapan tradisional.",
      harga: "Rp. 650.000",
      foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      wa: "https://wa.me/628123456789",
    },
    {
      id: 3,
      nama: "Geopark Poso Adventure",
      deskripsi: [
        "Melihat formasi batu unik",
        "Wisata air terjun dan gua alam",
        "Camping dan hiking",
      ],
      detail:
        "Paket wisata petualangan di Geopark Poso dengan aktivitas outdoor, pendakian, dan jelajah gua alami.",
      harga: "Rp. 700.000",
      foto: "https://images.unsplash.com/photo-1526481280695-3c720685208b?auto=format&fit=crop&w=800&q=60",
      wa: "https://wa.me/628123456789",
    },
    {
      id: 4,
      nama: "Pulau Togean Diving Trip",
      deskripsi: [
        "Diving di spot kelas dunia",
        "Menjelajahi pulau eksotis",
        "Relaksasi dan wisata kuliner",
      ],
      detail:
        "Eksplor keindahan bawah laut Pulau Togean dengan diving, snorkeling, dan kuliner khas laut.",
      harga: "Rp. 850.000",
      foto: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=800&q=60",
      wa: "https://wa.me/628123456789",
    },
    {
      id: 5,
      nama: "Pulau Togean Diving Trip",
      deskripsi: [
        "Diving di spot kelas dunia",
        "Menjelajahi pulau eksotis",
        "Relaksasi dan wisata kuliner",
      ],
      detail:
        "Eksplor keindahan bawah laut Pulau Togean dengan diving, snorkeling, dan kuliner khas laut.",
      harga: "Rp. 850.000",
      foto: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=800&q=60",
      wa: "https://wa.me/628123456789",
    },
  ];

  // Filter berdasarkan pencarian
  const filteredPaket = dataPaket.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${Paisupok})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center py-24 px-6">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            Paket Wisata
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
                              className="relative overflow-hidden group shadow-lg border-none cursor-pointer transform transition duration-300 hover:scale-105"
                            >
                              {/* Gambar */}
                              <img
                                src={paket.foto}
                                alt={paket.nama}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                              />

                              {/* Overlay */}
                              <div className="absolute inset-0 bg-black/60 group-hover:bg-opacity-70 transition duration-300"></div>

                              {/* Konten Card */}
                              <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10 flex flex-col">
                                <h2 className="text-lg font-semibold mb-2">
                                  {paket.nama}
                                </h2>
                                <ul className="text-sm text-gray-200 mb-2 list-disc pl-4 space-y-1">
                                  {paket.deskripsi.slice(0, 3).map((d, i) => (
                                    <li key={i}>{d}</li>
                                  ))}
                                </ul>
                                <span className="text-blue-400 text-sm hover:underline mb-3">
                                  Read More...
                                </span>
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold">
                                    {paket.harga}
                                  </span>
                                  <a
                                    href={paket.wa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <WhatsappLogo size={22} weight="fill" />
                                  </a>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </AnimatePresence>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
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
                        className="relative overflow-hidden group shadow-lg border-none cursor-pointer transform transition duration-300 hover:scale-105"
                      >
                        <img
                          src={paket.foto}
                          alt={paket.nama}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-opacity-70 transition duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10 flex flex-col">
                          <h2 className="text-lg font-semibold mb-2">
                            {paket.nama}
                          </h2>
                          <ul className="text-sm text-gray-200 mb-2 list-disc pl-4 space-y-1">
                            {paket.deskripsi.slice(0, 3).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                          <span className="text-blue-400 text-sm hover:underline mb-3">
                            Read More...
                          </span>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{paket.harga}</span>
                            <a
                              href={paket.wa}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <WhatsappLogo size={22} weight="fill" />
                            </a>
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
        <Dialog
          open={!!selectedPaket}
          onOpenChange={() => setSelectedPaket(null)}
        >
          <DialogContent className="max-w-3xl">
            {selectedPaket && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    {selectedPaket.nama}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <img
                    src={selectedPaket.foto}
                    alt={selectedPaket.nama}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-gray-700 mb-3">{selectedPaket.detail}</p>
                    <ul className="list-disc pl-5 mb-3 text-sm text-gray-600">
                      {selectedPaket.deskripsi.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-lg mb-2">
                      {selectedPaket.harga}
                    </p>
                    <a
                      href={selectedPaket.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      <WhatsappLogo size={20} weight="fill" /> Hubungi via
                      WhatsApp
                    </a>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PaketWisata;
