import { useState } from "react";
import { Star } from "lucide-react";

// Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [nama, setNama] = useState("");
  const [komentar, setKomentar] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!nama || !komentar || rating === 0) {
      alert("Harap isi nama, komentar, dan pilih rating!");
      return;
    }

    onSubmit({ nama, komentar, rating }); // kirim data ke parent
    setNama("");
    setKomentar("");
    setRating(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Tambah Ulasan</DialogTitle>
        </DialogHeader>

        {/* Input Nama */}
        <div className="space-y-4 mt-2">
          <Input
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="font-semibold text-sm"
          />

          {/* Input Komentar */}
          <Textarea
            placeholder="Ulasan kamu..."
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className="font-semibold text-sm h-28 resize-none"
          />

          {/* Rating */}
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                <Star
                  size={28}
                  className={`cursor-pointer transition-all ${
                    i < rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>

            <Button onClick={handleSubmit}>Kirim</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
