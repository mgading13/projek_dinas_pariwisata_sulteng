import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import ReviewModal from "./ReviewModal";
import { useTranslation } from 'react-i18next';

const Ulasan = () => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ulasan")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
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
      console.error(err);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <section className="w-full py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t('apa_kata_mereka')}
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full
              bg-blue-600 text-white text-sm
              hover:bg-blue-700 transition"
          >
            {t('tambah_ulasan')}
          </button>
        </div>

        <ReviewModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onSubmit={handleAddReview}
        />

        {/* CAROUSEL */}
        <Carousel className="relative">
          <CarouselContent className="py-6">
            {reviews.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="
                    h-full
                    bg-white/60 backdrop-blur-md
                    border border-white/70
                    rounded-2xl
                    shadow-lg
                    p-6
                    flex flex-col
                  "
                >
                  {/* HEADER */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="
                        w-12 h-12 rounded-full
                        bg-gradient-to-br from-blue-500 to-cyan-400
                        text-white font-bold
                        flex items-center justify-center
                      "
                    >
                      {getInitials(item.nama)}
                    </div>

                    <h3 className="font-semibold text-gray-800">{item.nama}</h3>
                  </div>

                  {/* KOMENTAR */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
                    “{item.komentar}”
                  </p>

                  {/* RATING */}
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
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* NAVIGATION */}
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default Ulasan;
