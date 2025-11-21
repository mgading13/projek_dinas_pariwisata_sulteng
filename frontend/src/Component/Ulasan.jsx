import { useEffect, useState } from "react";
import axios from "axios";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import ReviewModal from "./ReviewModal";

const Ulasan = () => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ulasan")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("❌ Error:", err));
  }, []);

  const handleAddReview = async (newReview) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/ulasan/insert",
        newReview
      );
      setReviews((prev) => [...prev, res.data]);
      setOpen(false);
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  // 🍀 generate initial nama
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Ulasan</h2>

        <button
          className="text-blue-500 hover:underline font-bold"
          onClick={() => setOpen(true)}
        >
          + Tambah Ulasan
        </button>
      </div>

      {/* Modal */}
      <ReviewModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddReview}
      />

      {/* LIST MODE */}
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {reviews.map((item, i) => (
              <div key={i} className="bg-white border rounded-xl shadow p-4">
                {/* Avatar + Nama */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {getInitials(item.nama)}
                  </div>
                  <h3 className="font-semibold">{item.nama}</h3>
                </div>

                <p className="text-sm text-gray-700 mb-4">{item.komentar}</p>

                <div className="flex">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={
                        idx < item.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CAROUSEL MODE */}
      <AnimatePresence mode="wait">
        {!expanded && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            className="mt-4"
          >
            <Carousel className="w-full">
              <CarouselContent className="gap-x-4">
                {reviews.map((item, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col h-full">
                      {/* Avatar + Nama */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                          {getInitials(item.nama)}
                        </div>
                        <h3 className="text-sm font-semibold">{item.nama}</h3>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">
                        {item.komentar}
                      </p>

                      <div className="flex mt-auto">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={16}
                            className={
                              idx < item.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-0 -translate-y-1/2" />
              <CarouselNext className="right-0 -translate-y-1/2" />
            </Carousel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================
          CHEVRON DI BAGIAN BAWAH
      =========================*/}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          {expanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
      </div>
    </div>
  );
};

export default Ulasan;
