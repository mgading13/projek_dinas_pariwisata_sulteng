import { useState } from "react";
import { Star } from "lucide-react";

// Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {toast} from "sonner"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from 'react-i18next';

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [nama, setNama] = useState("");
  const [komentar, setKomentar] = useState("");
  const [rating, setRating] = useState(0);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  const handleSubmit = () => {
    if (!nama || !komentar || rating === 0) {
      toast.info("Harap isi nama, komentar, dan pilih rating!");
      return;
    }

    onSubmit({ nama, komentar, rating });
    setNama("");
    setKomentar("");
    setRating(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-md w-[92%]
          bg-blue-100 backdrop-blur-xl
          border border-white/60
          rounded-2xl
          shadow-xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {t('head_tambah_ulasan')}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{t('bagikan_pengalamanmu')}</p>
        </DialogHeader>

        {/* FORM */}
        <div className="space-y-5 mt-4">
          {/* Nama */}
          <Input
            placeholder="Nama Anda"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="
              bg-white/60
              border-gray-200
              focus:ring-2 focus:ring-blue-500
              rounded-lg
            "
          />

          {/* Komentar */}
          <Textarea
            placeholder="Tuliskan komentar Anda di sini..."
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className="
              h-28 resize-none
              bg-white/60
              border-gray-200
              focus:ring-2 focus:ring-blue-500
              rounded-lg
            "
          />

          {/* Rating */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">{t('penilaian')}</p>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="group"
                >
                  <Star
                    size={30}
                    strokeWidth={2}
                    className={`
    transition-all duration-200
    cursor-pointer
    ${
      i < rating
        ? "text-yellow-400 fill-yellow-400 scale-110"
        : "text-gray-400 fill-transparent hover:text-yellow-400"
    }
  `}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full"
            >
              Batal
            </Button>

            <Button
              onClick={handleSubmit}
              className="
                rounded-full
                text-white font-semibold
                bg-blue-600
                hover:bg-blue-700
                transition
              "
            >
              Kirim Ulasan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
