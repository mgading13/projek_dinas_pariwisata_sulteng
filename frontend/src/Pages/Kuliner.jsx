import { useState, useEffect } from "react";
import axios from "axios";
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
import Paisupok from "../assets/SiDewi/LukPanenteng1.png";
import { Badge } from "@/components/ui/badge";

const Kuliner = () => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedKuliner, setSelectedKuliner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dataKuliner, setDataKuliner] = useState([]);
  const [dataRumahMakan, setDataRumahMakan] = useState([]);

  // ⭐ LIST rumah makan yang cocok
  const [rumahMakanTerkait, setRumahMakanTerkait] = useState([]);

  useEffect(() => {
    const fetchDataKuliner = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/kuliner");

        const formatted = res.data.map((item) => ({
          id: item.id,
          nama: item.nama_makanan,
          deskripsi: item.deskripsi,
          foto: `http://localhost:3000${item.foto}`,
        }));

        setDataKuliner(formatted);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data kuliner.");
      }
    };

    const fetchDataRumahMakan = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/rumahMakan");

        const formatted = res.data.map((item) => ({
          id: item.id,
          kulinerId: item.kulinerId,
          nama: item.resto,
          lokasi: item.lokasi,
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
  }, []);

  // ⭐ Ketika pilih kuliner → tampilkan rumah makan berdasarkan nama
  useEffect(() => {
    if (!selectedKuliner) return;

    const filtered = dataRumahMakan.filter(
      (rm) => rm.kulinerId === selectedKuliner.id
    );

    setRumahMakanTerkait(filtered);
  }, [selectedKuliner, dataRumahMakan]);

  // Search filter
  const filteredKuliner = dataKuliner.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

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
            Kuliner
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
                          className="relative overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
                        >
                          <img
                            src={kuliner.foto}
                            alt={kuliner.nama}
                            className="w-full h-64 object-cover"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/60 group-hover:bg-opacity-70 transition duration-300"></div>
                          <div className="absolute bottom-0 p-4 text-white">
                            <Badge
                              variant="outline"
                              className="bg-green-600 text-white dark:bg-green-600 text-md"
                            >
                              {kuliner.nama}
                            </Badge>

                            {/* ⭐ DESKRIPSI DI LIST MODE (bisa panjang) */}
                            <p className="text-md mt-2 line-clamp-3 text-justify">
                              {kuliner.deskripsi}
                            </p>
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
                        key={kuliner.id}
                        onClick={() => setSelectedKuliner(kuliner)}
                        className="relative overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
                      >
                        <img
                          src={kuliner.foto}
                          alt={kuliner.nama}
                          className="w-full h-64 object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-opacity-70 transition duration-300"></div>
                        <div className="absolute bottom-0 p-4 text-white">
                          <Badge
                            variant="outline"
                            className="bg-green-600 text-white dark:bg-green-600 text-md"
                          >
                            {kuliner.nama}
                          </Badge>

                          {/* ⭐ DESKRIPSI DI LIST MODE (bisa panjang) */}
                          <p className="text-md mt-2 line-clamp-3 text-justify">
                            {kuliner.deskripsi}
                          </p>
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
        <Dialog
          open={!!selectedKuliner}
          onOpenChange={() => setSelectedKuliner(null)}
        >
          <DialogContent className="max-w-8xl">
            {selectedKuliner && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    <p>List Rumah Makan {selectedKuliner.nama}</p>
                  </DialogTitle>
                </DialogHeader>
                <p className="text-justify font-semibold">
                  {selectedKuliner.deskripsi}
                </p>
                {/* WRAPPER SCROLL */}
                <div className="mt-4 max-h-[450px] overflow-y-auto pr-2">
                  {rumahMakanTerkait.length === 0 ? (
                    <p className="text-gray-500">Tidak ada rumah makan.</p>
                  ) : (
                    <ul className="space-y-3">
                      {rumahMakanTerkait.map((rm) => (
                        <li
                          key={rm.id}
                          className="p-4 bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                        >
                          {/* Nama */}
                          <div>
                            <p className="font-semibold text-lg">{rm.nama}</p>
                          </div>

                          {/* Lokasi */}
                          <p className="text-gray-600 text-sm md:text-base">
                            {rm.lokasi}
                          </p>

                          {/* Tombol */}
                          <a
                            href={rm.link_gmaps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-lg w-full"
                          >
                            Buka Maps
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Kuliner;
